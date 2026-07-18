export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Get your transformed photos in seconds, not hours. Our AI processes your images instantly."
    },
    {
      icon: "🎨",
      title: "Hundreds of Styles",
      description: "From professional headshots to fantasy characters, anime, goth, cyberpunk, and everything in between."
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description: "Your photos are encrypted and automatically deleted after 24 hours. We never store or share your images."
    },
    {
      icon: "💎",
      title: "Free Daily Credit",
      description: "Get 1 free transformation every day. No credit card required to start."
    },
    {
      icon: "📱",
      title: "Perfect for Social Media",
      description: "Optimized dimensions for LinkedIn, Instagram, Twitter, Discord, and all major platforms."
    },
    {
      icon: "🎯",
      title: "High Quality Output",
      description: "Professional-grade AI models deliver stunning, photorealistic results every time."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-transparent to-purple-900/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">FreePFP.ai</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The fastest, most versatile AI profile picture generator on the web.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card-hover bg-purple-900/10 border border-purple-900/30 rounded-2xl p-8">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
