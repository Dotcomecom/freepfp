import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Free AI Profile Picture Generator Questions | FreePFP.ai",
  description: "Answers to common questions about FreePFP.ai: Is it really free? How do credits work? Will the AI output look like me? What styles are available? Privacy, photo storage, and more.",
  keywords: [
    "FreePFP FAQ",
    "AI profile picture questions",
    "free AI headshot FAQ",
    "are AI profile pictures free",
    "does AI profile picture look like me",
  ],
  alternates: {
    canonical: "https://freepfp.ai/faq",
  },
  openGraph: {
    title: "FAQ - FreePFP.ai Profile Picture Generator",
    description: "Everything you need to know about FreePFP.ai: free credits, styles, privacy, and AI output quality.",
    url: "https://freepfp.ai/faq",
    type: "website",
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
        text: "Yes! Every registered user gets 1 free transformation per day — no credit card required. If you want more, you can purchase credit packs.",
      },
    },
    {
      "@type": "Question",
      name: "How do the daily credits work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each day at midnight (UTC) your account is topped up to 1 free credit. Unused credits do not roll over. Credit packs you purchase never expire.",
      },
    },
    {
      "@type": "Question",
      name: "What styles are available on FreePFP.ai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FreePFP.ai offers 12 unique styles including LinkedIn Professional, Alt/Goth, Anime, Fairycore, Cyberpunk, Cottagecore, Indie Sleaze, Dark Academia, Vaporwave, Old Money, Grunge, and Fantasy.",
      },
    },
    {
      "@type": "Question",
      name: "Will the AI output actually look like me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FreePFP.ai uses InstantID face-preserving AI technology to maintain your facial identity while applying the chosen style transformation. Upload a clear, well-lit photo for best results.",
      },
    },
    {
      "@type": "Question",
      name: "What kind of photo works best for AI profile pictures?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload a clear, front-facing photo with good lighting. Selfies, passport-style photos, and casual shots all work well. Avoid blurry, extreme-angle, or heavily-filtered images.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use the generated AI images commercially?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Generated images are licensed for personal use. For commercial licensing inquiries, contact FreePFP.ai at hello@theaibarn.com.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get more credits on FreePFP.ai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can use your free daily credit, or purchase credit packs ranging from 100 credits ($7.99) to 1,000 credits ($79.99). Purchased credits never expire.",
      },
    },
    {
      "@type": "Question",
      name: "Is my uploaded photo stored on FreePFP.ai servers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Uploaded photos are sent to the AI processing partner Replicate for transformation and are not stored permanently on FreePFP.ai servers. Generated images are available for download immediately.",
      },
    },
  ],
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
