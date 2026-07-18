import Image from "next/image";

const styles = [
  {
    name: "Professional",
    filter: "contrast(1.1) saturate(0.9) brightness(1.05)",
    borderColor: "border-blue-700/30 hover:border-blue-500/50",
  },
  {
    name: "Goth",
    filter: "contrast(1.3) saturate(0.7) brightness(0.85) hue-rotate(-10deg)",
    borderColor: "border-purple-700/40 hover:border-purple-400/60",
  },
  {
    name: "Anime",
    filter: "contrast(1.2) saturate(1.6) brightness(1.1)",
    borderColor: "border-pink-700/30 hover:border-pink-500/50",
  },
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent"></div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your Photo Into
            <span className="block mt-2 gradient-text">Any Style You Want</span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Upload your photo and let AI transform it into professional headshots,
            goth aesthetics, anime characters, and hundreds more styles. Free daily credits.
          </p>
        </div>

        {/* 3 transformations - before/after split view */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {styles.map((s) => (
            <div key={s.name} className="relative group">
              <div className={`aspect-square rounded-2xl overflow-hidden border bg-purple-950/20 ${s.borderColor} transition relative`}>
                {/* Original photo - left half */}
                <div className="absolute inset-0 w-1/2 overflow-hidden z-10">
                  <Image
                    src="/base.jpg"
                    alt="Original"
                    fill
                    className="object-cover object-left"
                    sizes="(max-width: 768px) 50vw, 16vw"
                    priority
                  />
                </div>

                {/* Transformed photo - right half */}
                <div className="absolute inset-0 w-1/2 right-0 left-auto overflow-hidden">
                  <Image
                    src="/base.jpg"
                    alt={`${s.name} transformation`}
                    fill
                    className="object-cover object-right transition duration-500 group-hover:scale-110"
                    style={{ filter: s.filter }}
                    sizes="(max-width: 768px) 50vw, 16vw"
                  />
                </div>

                {/* Vertical divider line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/80 z-20 transform -translate-x-1/2"></div>

                {/* Labels */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                  <span className="text-white text-xs font-medium">Before</span>
                </div>
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                  <span className="text-white text-xs font-medium">After</span>
                </div>
              </div>

              {/* Style name label */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-4 py-1.5 shadow-lg">
                <span className="text-white font-semibold text-sm">{s.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-gray-500 text-sm">
          ✨ 3 free transformations daily • No credit card required
        </div>
      </div>
    </section>
  );
}
