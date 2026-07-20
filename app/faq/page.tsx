export default function FAQPage() {
  const faqs = [
    {
      question: "Is FreePFP.ai really free?",
      answer: "Yes! Every registered user gets 1 free transformation per day — no credit card required. If you want more, you can purchase credit packs."
    },
    {
      question: "How do the daily credits work?",
      answer: "Each day at midnight (UTC) your account is topped up to 1 free credit. Unused credits don't roll over — use it or lose it! Credit packs you purchase never expire."
    },
    {
      question: "What styles are available?",
      answer: "We currently offer 12 unique styles including LinkedIn Professional, Alt/Goth, Anime, Fairycore, Cyberpunk, Cottagecore, and more. New styles are added regularly."
    },
    {
      question: "Will the output look like me?",
      answer: "Our AI uses advanced face-preserving technology (InstantID) to maintain your facial identity while applying the chosen style transformation. Upload a clear, well-lit photo for best results."
    },
    {
      question: "What photo works best?",
      answer: "Upload a clear, front-facing photo with good lighting. Selfies, passport-style photos, and casual shots all work well. Avoid blurry, extreme-angle, or heavily-filtered images."
    },
    {
      question: "Can I use the generated images commercially?",
      answer: "Generated images are for personal use. For commercial licensing inquiries, contact us at hello@theaibarn.com."
    },
    {
      question: "How do I get more credits?",
      answer: "Purchase a credit pack from the pricing section on the homepage, or simply wait for your free daily credit to refresh. Packs range from 100 credits ($7.99) to 1,000 credits ($79.99)."
    },
    {
      question: "Is my photo stored?",
      answer: "Uploaded photos are sent to our AI processing partner (Replicate) for transformation and are not stored on our servers. Generated images are available for you to download immediately."
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Fixed header spacer */}
      <div className="h-24 md:h-28" />

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-xl text-gray-400 text-center mb-16">
            Everything you need to know about FreePFP.ai
          </p>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-purple-900/20 border border-purple-800/30 rounded-2xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <a
              href="mailto:hello@theaibarn.com"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
