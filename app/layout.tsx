import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreePFP AI - Free AI Profile Picture Generator",
  description: "Transform your LinkedIn photo into stunning AI-generated profile pictures. Free daily credits, no signup required to start.",
  keywords: ["AI profile picture", "free pfp", "LinkedIn photo", "AI headshot", "profile picture generator"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
