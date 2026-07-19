import { createClient } from "@supabase/supabase-js";

// Hardcoded values — safe because:
// 1. The anon key is PUBLIC by design (security is in RLS, not the key)
// 2. Vercel's "senstive" flag blocks build-time env injection
// 3. These are the same values that would come from env vars
const SUPABASE_URL = "https://jctyrstktxwbclrzfupu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_qBbZ43o_bVEv5jYGI8jAlA_-Nr5srrn";

let supabaseInstance: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseInstance;
}
