"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getSupabaseClient } from "./supabase";

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

  // Supabase is always configured now (hardcoded defaults in lib/supabase.ts)
  const hasSupabase = () => true;

  const getSb = () => getSupabaseClient();

  const refreshCredits = async () => {
    if (!user) return;

    try {
      const db = getSb();
      const { data, error } = await db
        .from("profiles")
        .select("credits")
        .eq("id", user.id)
        .single();
      if (!error && data) setCredits(data.credits);
    } catch {
      // Fallback: read from localStorage
      const stored = localStorage.getItem(FALLBACK_CREDITS_KEY);
      if (stored) {
        try {
          const data = JSON.parse(stored);
          const today = new Date().toDateString();
          if (data.lastReset !== today) {
            const newCredits = FREE_DAILY_CREDITS;
            localStorage.setItem(
              FALLBACK_CREDITS_KEY,
              JSON.stringify({ credits: newCredits, lastReset: today })
            );
            setCredits(newCredits);
          } else {
            setCredits(data.credits || 0);
          }
        } catch {
          setCredits(FREE_DAILY_CREDITS);
        }
      } else {
        const today = new Date().toDateString();
        localStorage.setItem(
          FALLBACK_CREDITS_KEY,
          JSON.stringify({ credits: FREE_DAILY_CREDITS, lastReset: today })
        );
        setCredits(FREE_DAILY_CREDITS);
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const db = getSb();
        const { data } = await db.auth.getUser();
        setUser(data.user);
        setLoading(false);

        const { data: listener } = db.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
        });

        return () => {
          if (listener?.subscription) listener.subscription.unsubscribe();
        };
      } catch {
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
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (user) refreshCredits();
  }, [user]);

  const signIn = async (email: string, password: string) => {
    try {
      const db = getSb();
      const { error } = await db.auth.signInWithPassword({ email, password });
      return { error: error?.message };
    } catch (err: any) {
      return { error: err?.message || "Sign in failed" };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const db = getSb();
      const { data, error } = await db.auth.signUp({ email, password });
      if (!error && data.user) {
        await db.from("profiles").upsert({
          id: data.user.id,
          email: data.user.email,
          credits: FREE_DAILY_CREDITS,
          subscription_tier: "free",
        });
      }
      return { error: error?.message };
    } catch (err: any) {
      return { error: err?.message || "Sign up failed" };
    }
  };

  const signOut = async () => {
    try {
      const db = getSb();
      await db.auth.signOut();
    } catch {}
    localStorage.removeItem(FALLBACK_USER_KEY);
    setUser(null);
    setCredits(0);
  };

  const useCredit = async () => {
    if (!user) return { success: false, error: "Not signed in" };
    if (credits <= 0) return { success: false, error: "No credits available" };

    try {
      const db = getSb();
      const { data: profile } = await db
        .from("profiles")
        .select("credits")
        .eq("id", user.id)
        .single();

      if (!profile || profile.credits <= 0) {
        return { success: false, error: "No credits available" };
      }

      await db
        .from("profiles")
        .update({ credits: profile.credits - 1 })
        .eq("id", user.id);

      setCredits(profile.credits - 1);
      return { success: true };
    } catch {
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
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, credits, signIn, signUp, signOut, refreshCredits, useCredit }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Re-export for backward compatibility
export { getSb as getSupabaseClient };
