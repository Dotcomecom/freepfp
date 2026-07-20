export default function Features() {
  const features = [
    {
      title: "InstantID Face-Preserving AI",
      description: "Our AI profile picture generator uses InstantID technology — not generic img2img — so every generated portrait retains your real facial features and identity.",
      icon: "✨"
    },
    {
      title: "12+ Curated AI Styles",
      description: "From LinkedIn professional headshots to Alt/Goth, Anime, Fairycore, Cyberpunk, Cottagecore, Vaporwave, and Dark Academia — find your perfect AI avatar look.",
      icon: "🎨"
    },
    {
      title: "Free Profile Picture Every Day",
      description: "Get 1 free AI profile picture transformation every day — no credit card, no payment required. Perfect for testing multiple styles before buying more credits.",
      icon: "🎁"
    },
    {
      title: "AI LinkedIn Headshots in Seconds",
      description: "Generate polished corporate headshots optimized for LinkedIn profiles. No expensive photographer needed — upload a selfie and get a professional headshot in 30 seconds.",
      icon: "💼"
    },
    {
      title: "High-Resolution Download",
      description: "Every AI-generated profile picture is delivered in high resolution, perfect for LinkedIn, Instagram, Discord, X (Twitter), dating apps, or any social platform.",
      icon: "📸"
    },
    {
      title: "Privacy-First: No Photo Storage",
      description: "Your uploaded photos are processed in real-time and immediately discarded. FreePFP.ai never stores your images — processed via trusted AI partner Replicate.",
      icon: "🔒"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a1f] scroll-mt-32" aria-labelledby="features-heading">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="features-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
            FreePFP.ai Features: Why Choose Our AI Profile Picture Generator
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built on face-preserving InstantID technology with 12+ curated styles. Free daily credits, privacy-first design, and high-resolution output ready for any platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {features.map((feature, index) => (
            <article
              key={index}
              className="bg-purple-900/20 rounded-2xl p-8 border border-purple-800/30 hover:border-purple-700/50 transition-all hover:transform hover:scale-105"
              role="listitem"
            >
              <div className="text-5xl mb-4" aria-hidden="true">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
