import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - FreePFP.ai",
  description: "Terms of Service for FreePFP.ai, a free AI profile picture generator. Learn about acceptable use, payments, intellectual property, and privacy.",
  alternates: {
    canonical: "https://freepfp.ai/terms",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
