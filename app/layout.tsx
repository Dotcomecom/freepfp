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
    "google-adsense-account": "ca-pub-2378599294878032",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2378599294878032"
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
