import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - FreePFP.ai | How We Handle Your Data",
  description: "FreePFP.ai Privacy Policy. Learn how we handle your uploaded photos, account data, and cookies. GDPR and CCPA compliant. No photo storage. hello@theaibarn.com for data requests.",
  alternates: {
    canonical: "https://freepfp.ai/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
