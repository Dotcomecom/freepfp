import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Transform Your Photo - Free AI Profile Picture Generator | FreePFP.ai",
  description:
    "Upload your photo and transform it into LinkedIn headshots, anime avatars, goth styles, cyberpunk, fairycore and more. 1 free transformation per day with face-preserving InstantID AI.",
  keywords: [
    "AI photo transformer",
    "free AI headshot generator",
    "LinkedIn AI profile picture",
    "anime avatar generator",
    "AI style transfer",
    "face-preserving AI",
    "InstantID AI",
    "profile picture maker",
  ],
  alternates: { canonical: "https://freepfp.ai/transform" },
  openGraph: {
    title: "Transform Your Photo - Free AI Profile Picture Generator",
    description:
      "Upload your photo. Pick from 12+ styles. Get stunning AI-generated profile pictures in seconds. 1 free transformation per day.",
    url: "https://freepfp.ai/transform",
    type: "website",
    images: [
      {
        url: "https://freepfp.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "FreePFP.ai Transform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transform Your Photo - Free AI PFP Generator",
    description:
      "Upload a photo, pick a style, get stunning AI-generated profile pictures. 1 free per day.",
    images: ["https://freepfp.ai/og-image.png"],
  },
};

export default function TransformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
