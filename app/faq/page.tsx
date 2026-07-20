import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      question: "Is FreePFP.ai really free?",
      answer: "Yes! Every registered user gets 1 free AI profile picture transformation per day — no credit card required. FreePFP.ai is one of the few free AI profile picture generators available. If you want more transformations, you can purchase credit packs starting at $7.99 for 100 credits."
    },
    {
      question: "How do the daily credits work?",
      answer: "Each day at midnight (UTC) your FreePFP.ai account is topped up to 1 free credit. Unused credits don't roll over — use it or lose it! Credit packs you purchase never expire, so you can stock up when you need extra AI profile picture generations."
    },
    {
      question: "What AI profile picture styles are available on FreePFP.ai?",
      answer: "FreePFP.ai currently offers 12 unique AI styles: LinkedIn Professional, Alt/Goth, Anime, Fairycore, Cyberpunk, Cottagecore, Indie Sleaze, Dark Academia, Maximalist, Minimalist, Vaporwave, and Fantasy. New styles are added regularly. Each style is optimized for different use cases — from corporate LinkedIn headshots to creative social media avatars."
    },
    {
      question: "Will the AI-generated profile picture actually look like me?",
      answer: "Yes — and this is what sets FreePFP.ai apart from generic AI image generators. Our AI uses InstantID face-preserving technology, which maintains your unique facial identity while applying the chosen style transformation. Unlike DALL-E or Midjourney (which generate from text prompts), FreePFP.ai is specifically designed to keep your face recognizable in any style. Upload a clear, well-lit, front-facing photo for best results."
    },
    {
      question: "What type of photo works best for AI profile picture generation?",
      answer: "Upload a clear, front-facing photo with good, even lighting. Selfies, passport-style photos, and casual headshots all work well. Avoid blurry images, extreme angles, heavily-filtered photos, sunglasses, or photos where your face is partially obscured. The better the input photo, the better the AI-generated profile picture will look."
    },
    {
      question: "Can I use AI-generated images from FreePFP.ai commercially?",
      answer: "Generated images from FreePFP.ai are licensed for personal use — social media profiles, personal websites, dating apps, and messaging platforms. For commercial licensing (e.g., brand campaigns, marketing materials), please contact us at hello@theaibarn.com to discuss commercial terms."
    },
    {
      question: "How do I get more credits on FreePFP.ai?",
      answer: "You have three options: (1) Use your free daily credit — 1 free AI profile picture every 24 hours, refreshed at midnight UTC. (2) Purchase a credit pack: 100 credits for $7.99, 500 credits for $29.99, or 1,000 credits for $79.99. Purchased credits never expire. (3) Simply wait — your free daily credit resets automatically."
    },
    {
      question: "Is my uploaded photo stored on FreePFP.ai servers?",
      answer: "No. FreePFP.ai is privacy-first by design. Your uploaded photos are sent to our AI processing partner (Replicate) for real-time transformation and are immediately discarded — they are never permanently stored on any server. Generated images are available for you to download immediately. We do not sell your data or use your photos for training AI models."
    },
    {
      question: "How does FreePFP.ai compare to paid AI headshot generators like HeadshotPro or Aragon?",
      answer: "The key differences: (1) FreePFP.ai gives you 1 free transformation daily — HeadshotPro and Aragon charge $29-99+ upfront with no free tier. (2) FreePFP.ai uses InstantID face-preserving AI for accurate likenesses — similar technology to the paid services. (3) FreePFP.ai doesn't require uploading 50-100 photos or waiting hours — you upload one photo and get instant results. (4) FreePFP.ai stores none of your photos; many competitors retain them indefinitely."
    },
    {
      question: "Can I use my FreePFP.ai-generated headshot on LinkedIn?",
      answer: "Absolutely. The LinkedIn Professional style is specifically designed for business headshots optimized for LinkedIn profiles. The AI-generated output is high-resolution and suitable for professional profiles, job applications, networking, and any corporate setting."
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Fixed header spacer */}
      <div className="h-24 md:h-28" />

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            FreePFP.ai FAQ: Your Questions About AI Profile Pictures, <span className="gradient-text">Answered</span>
          </h1>
          <p className="text-xl text-gray-400 text-center mb-6">
            Everything you need to know about FreePFP.ai — our free AI profile picture generator, 12+ styles, face-preserving InstantID technology, pricing, and privacy.
          </p>

          <nav className="text-center mb-16" aria-label="FAQ page links">
            <p className="text-gray-400">
              <Link href="/transform" className="text-purple-400 hover:text-purple-300 transition">Try FreePFP.ai now</Link>
              {' · '}
              <Link href="/about" className="text-purple-400 hover:text-purple-300 transition">Learn more about us</Link>
              {' · '}
              <a href="mailto:hello@theaibarn.com" className="text-purple-400 hover:text-purple-300 transition">Contact support</a>
            </p>
          </nav>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <article
                key={index}
                className="bg-purple-900/20 border border-purple-800/30 rounded-2xl p-6"
              >
                <h2 className="text-lg font-semibold text-white mb-2">
                  {faq.question}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>

          <div className="text-center mt-16 p-8 bg-purple-900/20 border border-purple-800/30 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-3">Still Have Questions?</h2>
            <p className="text-gray-400 mb-6">
              Our team at The AI Barn is happy to help. Reach out and we'll get back to you within 24 hours.
            </p>
            <a
              href="mailto:hello@theaibarn.com"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-medium"
            >
              Contact hello@theaibarn.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
