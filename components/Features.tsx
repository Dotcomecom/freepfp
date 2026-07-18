export default function Features() {
  const features = [
    {
      title: "AI-Powered Magic",
      description: "State-of-the-art AI transforms your photos into any style you imagine",
      icon: "✨"
    },
    {
      title: "Multiple Styles",
      description: "From LinkedIn pro to Alt/Goth, Anime, and more - find your perfect look",
      icon: "🎨"
    },
    {
      title: "Gender & Style Options",
      description: "Choose your gender presentation and aesthetic for personalized results",
      icon: "👤"
    },
    {
      title: "Free Daily Credit",
      description: "Get 1 free transformation every day - no payment required to start",
      icon: "🎁"
    },
    {
      title: "High-Quality Output",
      description: "Download high-resolution images ready for any platform",
      icon: "📸"
    },
    {
      title: "Instant Results",
      description: "Generate your new profile picture in seconds, not hours",
      icon: "⚡"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a1f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-gray-400 text-lg">
            Powerful features to create the perfect profile picture
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-purple-900/20 rounded-2xl p-8 border border-purple-800/30 hover:border-purple-700/50 transition-all hover:transform hover:scale-105"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
