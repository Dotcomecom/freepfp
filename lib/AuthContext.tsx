"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  credits: number;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshCredits: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const FREE_DAILY_CREDITS = 3;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
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

      // Cleanup handled by listener
      return () => { if (listener?.subscription) listener.subscription.unsubscribe(); };
    });
  }, []);

  useEffect(() => {
    if (user) refreshCredits();
  }, [user]);

  const signIn = async (email: string, password: string) => {
    const supabase = await getSupabaseClient();
    if (!supabase) return { error: "Auth not configured" };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message };
  };

  const signUp = async (email: string, password: string) => {
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
    const supabase = await getSupabaseClient();
    if (supabase) await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, credits, signIn, signUp, signOut, refreshCredits }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
