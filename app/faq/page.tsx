import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      q: "How does FreePFP.ai work?",
      a: "Upload a clear photo of yourself, choose your preferred style (LinkedIn, Goth, Anime, Cyberpunk, and more), and our AI transforms your photo in seconds. You can also customize gender presentation, vibe, and color palette."
    },
    {
      q: "Is it really free?",
      a: "Yes! You get 1 free transformation every day, no payment required. If you need more, credit packs start at $7.99 for 100 credits."
    },
    {
      q: "What photo should I upload?",
      a: "Any clear photo of yourself works great — selfies, LinkedIn headshots, or casual photos. The better the quality and lighting of your original photo, the better the result."
    },
    {
      q: "What styles are available?",
      a: "We offer 12 unique styles including LinkedIn Professional, Alt/Goth, Anime, Cyberpunk, Vaporwave, Fairycore, Cottagecore, Dark Academia, Indie Sleaze, and more."
    },
    {
      q: "Can I use the generated images for my LinkedIn or social media?",
      a: "Absolutely! All generated images are yours to use on any platform — LinkedIn, Twitter, Instagram, Discord, gaming profiles, etc."
    },
    {
      q: "How is my data handled?",
      a: "Your uploaded photos are processed securely and used only to generate your image. We don't store your photos long-term or share them with third parties. See our Privacy Policy for details."
    },
    {
      q: "What if I'm not happy with the result?",
      a: "Try generating again with a different style, vibe, or palette. Each generation can produce different results. If you run out of free daily credits, you can always grab a credit pack."
    },
    {
      q: "Who do I contact for help?",
      a: "Email us at hello@theaibarn.com and we'll get back to you as soon as possible."
    }
  ];

  return (
    <main className="min-h-screen">
      <Header />
      <div className="h-24 md:h-28" />
      
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-gray-400 text-center mb-12 text-lg">
            Everything you need to know about FreePFP.ai
          </p>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-purple-900/20 border border-purple-800/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <a href="mailto:hello@theaibarn.com" className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
