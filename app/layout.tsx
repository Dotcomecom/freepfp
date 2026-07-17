import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreePFP AI - Free AI Profile Picture Generator",
  description: "Transform your LinkedIn photo into stunning AI-generated profile pictures. Free daily credits, no signup required to start.",
  keywords: ["AI profile picture", "free pfp", "LinkedIn photo", "AI headshot", "profile picture generator"],
  other: {
    "google-adsense-account": "ca-pub-XXXXXXXXXXXXXXXX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID || "ca-pub-XXXXXXXXXXXXXXXX";

  return (
    <html lang="en">
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
