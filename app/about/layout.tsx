import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About FreePFP.ai - Free AI Profile Picture Generator by The AI Barn",
  description: "Learn about FreePFP.ai, the free AI-powered profile picture generator built by The AI Barn. We use InstantID face-preserving AI to transform your photos into LinkedIn headshots, anime avatars, and 10+ artistic styles.",
  alternates: {
    canonical: "https://freepfp.ai/about",
  },
  openGraph: {
    title: "About FreePFP.ai - Free AI Profile Picture Generator",
    description: "Built by The AI Barn. FreePFP.ai uses InstantID AI to transform your photos into stunning profile pictures in 12+ styles.",
    url: "https://freepfp.ai/about",
    type: "website",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
