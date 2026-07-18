export default function Hero() {
  const styles = [
    {
      name: "Professional",
      image: "/IMG_2718.jpeg",
      accent: "from-blue-600 to-cyan-500",
      border: "border-blue-500/40 hover:border-blue-400/60",
      description: "Studio-ready LinkedIn headshot",
    },
    {
      name: "Goth",
      image: "/grok-image-93cf2e6a-8925-4db8-a85b-8c85e943ceac.jpg",
      accent: "from-purple-600 to-pink-600",
      border: "border-purple-500/40 hover:border-purple-400/60",
      description: "Dark aesthetic portrait",
    },
    {
      name: "Anime",
      image: "/grok-image-a70ca765-3f27-4c9b-94e2-645bbc1e70e1.jpg",
      accent: "from-pink-500 to-rose-500",
      border: "border-pink-500/40 hover:border-pink-400/60",
      description: "Illustrated anime character",
    },
  ];

  return (
    <section className="relative pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Transform Your Photo Into
            <span className="block mt-2 gradient-text">Any Style You Want</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Upload your photo and let AI transform it into professional headshots, goth aesthetics, anime characters, and hundreds more styles. Free daily credits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {styles.map((style) => (
            <div key={style.name} className="relative group">
              <div className={`relative aspect-square rounded-2xl overflow-hidden border ${style.border} transition shadow-2xl`}>
                <img
                  src={style.image}
                  alt={`${style.name} style transformation`}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Style badge */}
              <div className="mt-4 flex justify-center">
                <span className={`bg-gradient-to-r ${style.accent} rounded-full px-5 py-2 shadow-lg whitespace-nowrap text-white font-semibold text-sm`}>
                  {style.name}
                </span>
              </div>

              {/* Description */}
              <div className="text-center mt-3">
                <span className="text-gray-300 text-sm">{style.description}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 text-gray-400 text-sm">
          ✨ 3 free transformations daily • No credit card required
        </div>
      </div>
    </section>
  );
}
