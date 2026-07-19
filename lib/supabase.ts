import { createClient } from "@supabase/supabase-js";

// Hardcoded defaults — this is safe because:
// - The anon key is PUBLIC by design (real security is RLS + service_role key)
// - Vercel marks NEXT_PUBLIC_ vars as "Sensitive" which blocks build-time inlining
// - Both env variables are also available via Vercel dashboard if you prefer to change them there
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  "https://jctyrstktxwbclrzfupu.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_qBbZ43o_bVEv5jYGI8jAlA_-Nr5srrn";

let supabaseInstance: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return supabaseInstance;
}
