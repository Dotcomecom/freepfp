import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import CookieConsent from "./cookie-consent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://freepfp.ai"),
  title: {
    default: "FreePFP.ai - Free AI Profile Picture Generator | LinkedIn, Anime, Goth & More",
    template: "%s | FreePFP.ai",
  },
  description:
    "Transform your photo into professional LinkedIn headshots, anime avatars, goth, cyberpunk, vaporwave & more — 12 AI styles. 1 free transformation per day. Face-preserving InstantID technology. No signup required to preview.",
  keywords: [
    "free AI profile picture generator",
    "AI LinkedIn headshot",
    "AI profile picture",
    "free pfp maker",
    "AI avatar generator",
    "AI headshot generator free",
    "profile picture maker",
    "InstantID AI",
    "anime avatar maker",
    "cyberpunk profile picture",
    "goth profile picture generator",
    "AI portrait generator",
    "free profile photo editor",
    "LinkedIn AI photo",
  ],
  authors: [{ name: "FreePFP.ai", url: "https://freepfp.ai" }],
  creator: "FreePFP.ai",
  publisher: "The AI Barn",
  category: "technology",
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
    title: "FreePFP.ai - Free AI Profile Picture Generator",
    description:
      "Transform your photo into 12+ stunning AI profile pictures — LinkedIn, anime, goth, cyberpunk & more. 1 free per day with face-preserving AI.",
    siteName: "FreePFP.ai",
    images: [
      {
        url: "https://freepfp.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "FreePFP.ai - Free AI Profile Picture Generator showing 12+ unique styles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FreePFP.ai - Free AI Profile Picture Generator",
    description:
      "Transform your photo into 12+ stunning AI profile pictures. LinkedIn, anime, goth, cyberpunk & more. 1 free per day.",
    images: ["https://freepfp.ai/og-image.png"],
  },
  other: {
    "google-adsense-account": "ca-pub-2378599294878032",
  },
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FreePFP.ai",
  alternateName: "Free PFP AI - Profile Picture Generator",
  url: "https://freepfp.ai",
  description:
    "Free AI-powered profile picture generator. Transform your photo into 12+ stunning styles — LinkedIn, anime, goth, cyberpunk, vaporwave and more. Face-preserving InstantID technology.",
  publisher: {
    "@type": "Organization",
    name: "The AI Barn",
    url: "https://theaibarn.com",
    email: "hello@theaibarn.com",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://freepfp.ai/transform?style={style}",
    },
    "query-input": "required name=style",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The AI Barn",
  alternateName: "AI Barn",
  url: "https://theaibarn.com",
  description: "The AI Barn builds accessible AI tools including FreePFP.ai, a free AI profile picture generator.",
  brand: {
    "@type": "Brand",
    name: "FreePFP.ai",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@theaibarn.com",
    contactType: "customer support",
    availableLanguage: ["English"],
  },
  sameAs: [],
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FreePFP.ai",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  url: "https://freepfp.ai",
  description:
    "FreePFP.ai is a free AI profile picture generator that uses InstantID face-preserving technology to transform your uploaded photo into 12+ unique styles including LinkedIn professional headshots, anime avatars, goth, cyberpunk, fairycore, cottagecore, vaporwave and more. One free transformation per day, no credit card required.",
  screenshot: "https://freepfp.ai/og-image.png",
  featureList: [
    "Free AI profile picture generation",
    "12+ unique artistic styles",
    "InstantID face-preserving technology",
    "1 free daily transformation",
    "No signup required to preview styles",
    "Professional LinkedIn headshots",
    "High-resolution output",
    "Privacy-first — no photo storage",
  ],
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "1 free transformation per day, no credit card required",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "100 Credits Pack",
      price: "7.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "500 Credits Pack",
      price: "29.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "1000 Credits Pack",
      price: "79.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "247",
    bestRating: "5",
    worstRating: "1",
  },
  author: {
    "@type": "Organization",
    name: "The AI Barn",
    url: "https://theaibarn.com",
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Create an AI Profile Picture with FreePFP.ai",
  description:
    "Generate a free AI profile picture in 3 simple steps: upload your photo, choose from 12+ styles including LinkedIn, anime, goth, and cyberpunk, then download your AI-generated portrait.",
  totalTime: "PT30S",
  estimatedCost: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Upload Your Photo",
      text: "Go to freepfp.ai/transform and upload a clear, front-facing photo of yourself. Selfies, LinkedIn photos, or casual shots all work well. For best results, use a well-lit image without heavy filters.",
      url: "https://freepfp.ai/transform",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose a Style",
      text: "Select from 12+ unique AI styles: LinkedIn Professional for corporate headshots, Anime for Japanese animation style, Alt/Goth for dark aesthetic, Cyberpunk for futuristic neon, Fairycore for whimsical fairy vibes, Cottagecore, Vaporwave, Dark Academia, and more.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Generate and Download",
      text: "Click generate. Our InstantID AI transforms your photo in seconds, preserving your facial features while applying the chosen style. Download your high-resolution profile picture ready for LinkedIn, Instagram, Discord, or any platform.",
    },
  ],
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
        text: "Yes! Every registered user gets 1 free transformation per day — no credit card required. You can also purchase credit packs for more transformations.",
      },
    },
    {
      "@type": "Question",
      name: "What profile picture styles are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FreePFP.ai offers 12 unique styles: LinkedIn Professional, Alt/Goth, Anime, Fairycore, Grunge, Indie Sleaze, Cottagecore, Cyberpunk, Dark Academia, Maximalist, Minimalist, and Vaporwave.",
      },
    },
    {
      "@type": "Question",
      name: "Will the AI output look like me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FreePFP.ai uses InstantID face-preserving technology to maintain your facial identity while applying the chosen style transformation. Upload a clear, well-lit photo for the best results.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use AI-generated profile pictures on LinkedIn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The LinkedIn Professional style generates polished corporate headshots optimized for LinkedIn profiles. The output is high-resolution and suitable for any professional or social platform.",
      },
    },
    {
      "@type": "Question",
      name: "Is my photo stored or shared?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Uploaded photos are processed in real-time for transformation and are not permanently stored on FreePFP.ai servers. Processing happens through trusted AI partner Replicate with enterprise-grade security.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://freepfp.ai",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Transform",
      item: "https://freepfp.ai/transform",
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
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <CookieConsent />
      </body>
    </html>
  );
}
