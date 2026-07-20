import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Fixed header spacer */}
      <div className="h-24 md:h-28" />

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            About <span className="gradient-text">FreePFP.ai</span>
          </h1>
          <p className="text-xl text-gray-400 text-center mb-16">
            Free AI-powered profile pictures for everyone
          </p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Our Mission</h2>
              <p className="text-gray-400">
                FreePFP.ai was built to solve a simple problem: everyone deserves a great profile picture, but professional photoshoots are expensive and time-consuming. We use cutting-edge AI technology to transform your existing photos into stunning, professional-quality portraits in seconds — completely free.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">How It Works</h2>
              <p className="text-gray-400">
                We use InstantID, a state-of-the-art face-preserving AI model, to maintain your unique facial features while applying artistic style transformations. Whether you need a polished LinkedIn headshot, an anime avatar, or something more creative like Cyberpunk or Fairycore, our AI adapts your photo to match your vision.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Why Free?</h2>
              <p className="text-gray-400">
                We believe in giving everyone access to professional-quality AI tools. Every registered user gets 1 free transformation per day — no credit card required. We sustain the service through optional credit packs for power users who want more transformations, and through non-intrusive advertising.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Privacy First</h2>
              <p className="text-gray-400">
                Your privacy matters. Uploaded photos are processed in real-time and never stored on our servers. We don't sell your data, and we don't use your photos for anything other than generating your requested transformations. All processing happens through our trusted AI partner, Replicate, which meets enterprise-grade security standards.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Built by The AI Barn</h2>
              <p className="text-gray-400">
                FreePFP.ai is part of The AI Barn's suite of AI-powered tools. We're passionate about making artificial intelligence accessible and useful for everyday tasks. Our team specializes in computer vision, generative AI, and user-friendly interfaces that put powerful technology in everyone's hands.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">Questions or Feedback?</h2>
              <p className="text-gray-400">
                We'd love to hear from you. Whether you have questions, suggestions for new styles, or just want to say hello, reach out at{' '}
                <a href="mailto:hello@theaibarn.com" className="text-purple-400 hover:text-purple-300 transition">
                  hello@theaibarn.com
                </a>.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/transform"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition font-semibold shadow-lg hover:shadow-xl hover:scale-105"
            >
              Try It Free Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
