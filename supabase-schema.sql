-- Supabase SQL Schema for freepfp.ai
-- Run this in your Supabase SQL Editor after creating the project

-- ============================================================================
-- PROFILES TABLE
-- Stores user account information and credit balances
-- ============================================================================

CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  credits INTEGER DEFAULT 1 NOT NULL,
  subscription_tier TEXT DEFAULT 'free' NOT NULL,
  last_credit_reset TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: System can insert profiles (for new signups)
CREATE POLICY "Service role can insert profiles"
  ON public.profiles
  FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- GENERATION LOG TABLE
-- Tracks all image generations for analytics and rate limiting
-- ============================================================================

CREATE TABLE public.generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  style TEXT NOT NULL,
  gender TEXT,
  vibe TEXT,
  palette TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own generations
CREATE POLICY "Users can view own generations"
  ON public.generations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: System can insert generations
CREATE POLICY "Service role can insert generations"
  ON public.generations
  FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_created_at ON public.profiles(created_at DESC);
CREATE INDEX idx_generations_user_id ON public.generations(user_id);
CREATE INDEX idx_generations_created_at ON public.generations(created_at DESC);

-- ============================================================================
-- FUNCTION: Reset daily free credits
-- Call this via a cron job or edge function to reset credits daily
-- ============================================================================

CREATE OR REPLACE FUNCTION public.reset_daily_credits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.profiles
  SET 
    credits = 1,
    last_credit_reset = NOW(),
    updated_at = NOW()
  WHERE 
    subscription_tier = 'free'
    AND last_credit_reset < CURRENT_DATE;
END;
$$;

-- ============================================================================
-- FUNCTION: Use a credit
-- Called when a user generates an image
-- ============================================================================

CREATE OR REPLACE FUNCTION public.use_credit(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  SELECT credits INTO current_credits FROM public.profiles WHERE id = user_uuid;
  
  IF current_credits <= 0 THEN
    RETURN FALSE;
  END IF;
  
  UPDATE public.profiles
  SET 
    credits = credits - 1,
    updated_at = NOW()
  WHERE id = user_uuid;
  
  RETURN TRUE;
END;
$$;

-- ============================================================================
-- TRIGGER: Auto-create profile when a new user signs up
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, credits, subscription_tier, last_credit_reset)
  VALUES (
    NEW.id,
    NEW.email,
    1,
    'free',
    NOW()
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- DONE! Your database is ready.
-- ============================================================================

-- Next steps:
-- 1. Get your Project URL and anon key from Settings → API in Supabase dashboard
-- 2. Add them to Vercel as environment variables:
--    - NEXT_PUBLIC_SUPABASE_URL
--    - NEXT_PUBLIC_SUPABASE_ANON_KEY
-- 3. Deploy and test signup flow
