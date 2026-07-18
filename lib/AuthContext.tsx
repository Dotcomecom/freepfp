"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  user: any;
  loading: boolean;
  credits: number;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshCredits: () => Promise<void>;
  useCredit: () => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FREE_DAILY_CREDITS = 1;

// Storage keys for fallback auth (when Supabase isn't configured)
const FALLBACK_USER_KEY = "freepfp_user";
const FALLBACK_CREDITS_KEY = "freepfp_credits";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [credits, setCredits] = useState(0);

  const hasSupabase = () =>
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const getSupabaseClient = async () => {
    if (!hasSupabase()) return null;
    const { getSupabase } = await import("@/lib/supabase");
    try {
      return getSupabase();
    } catch {
      return null;
    }
  };

  const refreshCredits = async () => {
    if (!user) return;
    
    if (!hasSupabase()) {
      // Fallback: read from localStorage
      const stored = localStorage.getItem(FALLBACK_CREDITS_KEY);
      if (stored) {
        try {
          const data = JSON.parse(stored);
          const today = new Date().toDateString();
          
          // If different day, reset to 1 free credit
          if (data.lastReset !== today) {
            const newCredits = FREE_DAILY_CREDITS;
            localStorage.setItem(FALLBACK_CREDITS_KEY, JSON.stringify({
              credits: newCredits,
              lastReset: today
            }));
            setCredits(newCredits);
          } else {
            setCredits(data.credits || 0);
          }
        } catch {
          setCredits(FREE_DAILY_CREDITS);
        }
      } else {
        // First time: give 1 free credit
        const today = new Date().toDateString();
        localStorage.setItem(FALLBACK_CREDITS_KEY, JSON.stringify({
          credits: FREE_DAILY_CREDITS,
          lastReset: today
        }));
        setCredits(FREE_DAILY_CREDITS);
      }
      return;
    }

    // Supabase path
    const supabase = await getSupabaseClient();
    if (!supabase) return;
    const { data, error } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single();
    if (!error && data) setCredits(data.credits);
  };

  useEffect(() => {
    if (!hasSupabase()) {
      // Fallback: check localStorage for user
      const storedUser = localStorage.getItem(FALLBACK_USER_KEY);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem(FALLBACK_USER_KEY);
        }
      }
      setLoading(false);
      return;
    }

    getSupabaseClient().then(async (supabase) => {
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });

      return () => { if (listener?.subscription) listener.subscription.unsubscribe(); };
    });
  }, []);

  useEffect(() => {
    if (user) refreshCredits();
  }, [user]);

  const signIn = async (email: string, password: string) => {
    if (!hasSupabase()) {
      // Fallback: simple mock auth
      const stored = localStorage.getItem(FALLBACK_USER_KEY);
      let foundUser = null;
      
      if (stored) {
        try {
          const u = JSON.parse(stored);
          if (u.email === email) {
            foundUser = u;
          }
        } catch {}
      }
      
      if (!foundUser) {
        // Check if user exists in a simple way
        const usersKey = "freepfp_users";
        const usersStr = localStorage.getItem(usersKey);
        if (usersStr) {
          try {
            const users = JSON.parse(usersStr);
            const existing = users.find((u: any) => u.email === email);
            if (existing) {
              // User exists - sign them in
              const user = { id: existing.id, email: existing.email, created_at: existing.created_at };
              localStorage.setItem(FALLBACK_USER_KEY, JSON.stringify(user));
              setUser(user);
              return {};
            }
          } catch {}
        }
        return { error: "No account found with that email. Please sign up first." };
      }
      
      localStorage.setItem(FALLBACK_USER_KEY, JSON.stringify(foundUser));
      setUser(foundUser);
      return {};
    }

    const supabase = await getSupabaseClient();
    if (!supabase) return { error: "Auth not configured" };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message };
  };

  const signUp = async (email: string, password: string) => {
    if (!hasSupabase()) {
      // Fallback: store user in localStorage
      const usersKey = "freepfp_users";
      const usersStr = localStorage.getItem(usersKey);
      let users: any[] = [];
      
      if (usersStr) {
        try {
          users = JSON.parse(usersStr);
        } catch {}
      }
      
      // Check if email already exists
      if (users.some(u => u.email === email)) {
        return { error: "An account with that email already exists. Please sign in." };
      }
      
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        password, // In production, this would be hashed
        created_at: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem(usersKey, JSON.stringify(users));
      
      // Set as current user
      const user = { id: newUser.id, email: newUser.email, created_at: newUser.created_at };
      localStorage.setItem(FALLBACK_USER_KEY, JSON.stringify(user));
      setUser(user);
      
      // Initialize credits with today's date
      const today = new Date().toDateString();
      localStorage.setItem(FALLBACK_CREDITS_KEY, JSON.stringify({
        credits: FREE_DAILY_CREDITS,
        lastReset: today
      }));
      setCredits(FREE_DAILY_CREDITS);
      
      return {};
    }

    const supabase = await getSupabaseClient();
    if (!supabase) return { error: "Auth not configured" };
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (!error && data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        email: data.user.email,
        credits: FREE_DAILY_CREDITS,
        subscription_tier: "free",
      });
    }
    return { error: error?.message };
  };

  const signOut = async () => {
    if (hasSupabase()) {
      const supabase = await getSupabaseClient();
      if (supabase) await supabase.auth.signOut();
    }
    // Also clear fallback storage
    localStorage.removeItem(FALLBACK_USER_KEY);
    setUser(null);
    setCredits(0);
  };

  const useCredit = async () => {
    if (!user) return { success: false, error: "Not signed in" };
    if (credits <= 0) return { success: false, error: "No credits available" };

    if (!hasSupabase()) {
      // Fallback: decrement in localStorage
      const newCredits = credits - 1;
      const stored = localStorage.getItem(FALLBACK_CREDITS_KEY);
      let data = { credits: FREE_DAILY_CREDITS, lastReset: new Date().toDateString() };
      if (stored) {
        try {
          data = JSON.parse(stored);
        } catch {}
      }
      data.credits = newCredits;
      localStorage.setItem(FALLBACK_CREDITS_KEY, JSON.stringify(data));
      setCredits(newCredits);
      return { success: true };
    }

    // Supabase path - would need a server function to deduct credits
    const supabase = await getSupabaseClient();
    if (!supabase) return { success: false, error: "Auth not configured" };
    
    const { error } = await supabase
      .from("profiles")
      .update({ credits: credits - 1 })
      .eq("id", user.id);
    
    if (error) return { success: false, error: error.message };
    
    setCredits(credits - 1);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, loading, credits, signIn, signUp, signOut, refreshCredits, useCredit }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
