import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import CookieConsent from "./cookie-consent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://freepfp.ai"),
  title: "FreePFP AI - Free AI Profile Picture Generator",
  description: "Transform your LinkedIn photo into 12+ stunning AI-generated profile pictures. 100% free daily credits, no signup required. Professional headshots, anime, goth & more.",
  keywords: ["AI profile picture", "free pfp", "LinkedIn photo", "AI headshot", "profile picture generator", "free ai avatar", "AI portrait maker"],
  authors: [{ name: "FreePFP.ai", url: "https://freepfp.ai" }],
  creator: "FreePFP.ai",
  publisher: "The AI Barn",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://freepfp.ai",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://freepfp.ai",
    title: "FreePFP AI - Free AI Profile Picture Generator",
    description: "Transform your LinkedIn photo into 12+ stunning AI-generated profile pictures. Free daily credits, no signup required.",
    siteName: "FreePFP.ai",
    images: [
      {
        url: "https://freepfp.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "FreePFP AI - Free AI Profile Picture Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FreePFP AI - Free AI Profile Picture Generator",
    description: "Transform your LinkedIn photo into 12+ stunning AI-generated profile pictures. Free daily credits.",
    images: ["https://freepfp.ai/og-image.png"],
  },
  other: {
    "google-adsense-account": "ca-pub-2378599294878032",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FreePFP.ai",
  description: "Free AI-powered profile picture generator. Transform your photo into LinkedIn headshots, anime avatars, goth styles, and more.",
  url: "https://freepfp.ai",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "1 free transformation per day, no credit card required",
  },
  featureList: [
    "AI profile picture generation",
    "12+ unique styles (LinkedIn, Anime, Goth, Cyberpunk, etc.)",
    "Face-preserving InstantID technology",
    "1 free daily credit",
    "No signup required to preview styles",
  ],
  publisher: {
    "@type": "Organization",
    name: "The AI Barn",
    url: "https://theaibarn.com",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is FreePFP.ai really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! Every registered user gets 1 free transformation per day — no credit card required.",
      },
    },
    {
      "@type": "Question",
      name: "What styles are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer 12 unique styles including LinkedIn Professional, Alt/Goth, Anime, Fairycore, Cyberpunk, Cottagecore, and more.",
      },
    },
    {
      "@type": "Question",
      name: "Will the AI output look like me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our AI uses InstantID technology to maintain your facial identity while applying the chosen style transformation.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2378599294878032"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <CookieConsent />
      </body>
    </html>
  );
}
