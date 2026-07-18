import Image from "next/image";

const styles = [
  {
    name: "Professional",
    note: "Studio-ready headshot",
    borderColor: "border-blue-700/30 hover:border-blue-500/50",
    accent: "from-blue-600 to-cyan-500",
    // Warm, sunny, high-contrast studio headshot look
    afterFilters: "brightness(1.15) contrast(1.2) saturate(1.3) hue-rotate(-8deg)",
    afterOverlay: "linear-gradient(135deg, rgba(255,220,170,0.22), rgba(255,178,102,0.18), rgba(135,206,250,0.15))",
  },
  {
    name: "Goth",
    note: "Dark aesthetic portrait",
    borderColor: "border-purple-700/40 hover:border-purple-400/60",
    accent: "from-purple-600 to-pink-600",
    // Deep, moody, dark purple-tinted portrait
    afterFilters: "brightness(0.5) contrast(1.8) saturate(0.4) hue-rotate(250deg)",
    afterOverlay:
      "radial-gradient(ellipse at center, transparent 25%, rgba(40,0,60,0.85)), linear-gradient(180deg, rgba(150,0,200,0.25), rgba(0,0,0,0.55))",
  },
  {
    name: "Anime",
    note: "Illustrated anime character",
    borderColor: "border-pink-700/30 hover:border-pink-500/50",
    accent: "from-pink-500 to-rose-500",
    // Bright, ultra-saturated + slight blur = painted/illustrated look
    afterFilters: "brightness(1.35) contrast(1.4) saturate(2.6) hue-rotate(18deg) blur(1.5px)",
    afterOverlay:
      "linear-gradient(45deg, rgba(255,182,193,0.5), rgba(176,224,230,0.48), rgba(255,192,203,0.5))",
  },
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent"></div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your Photo Into
            <span className="block mt-2 gradient-text">Any Style You Want</span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Upload your photo and let AI transform it into professional headshots,
            goth aesthetics, anime characters, and hundreds more styles. Free daily credits.
          </p>
        </div>

        {/* 3 transformation boxes: SAME base photo left and right — the right side gets a
            distinct CSS filter + color overlay to clearly read as a different "style". */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">
          {styles.map((s) => (
            <div key={s.name} className="relative group">
              <div
                className={`relative aspect-square rounded-2xl overflow-hidden border bg-purple-950/20 ${s.borderColor} transition shadow-2xl`}
              >
                {/* LEFT — Original */}
                <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden z-10">
                  <Image
                    src="/base.jpg"
                    alt="Original photo"
                    fill
                    className="object-cover object-center transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 16vw"
                    priority
                  />
                </div>

                {/* RIGHT — Same base photo, transformed with filter + overlay */}
                <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
                  <Image
                    src="/base.jpg"
                    alt={`${s.name} style result`}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: s.afterFilters, transform: "scale(1.08)" }}
                    sizes="(max-width: 768px) 100vw, 16vw"
                  />
                </div>

                {/* Color/texture overlay on the "after" side */}
                <div
                  className="absolute inset-y-0 right-0 w-1/2 z-[5] pointer-events-none"
                  style={{ background: s.afterOverlay }}
                />

                {/* Vertical divider with arrow icon */}
                <div className="absolute inset-y-0 left-1/2 w-[2px] bg-white/80 z-20 transform -translate-x-1/2">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-purple-900 flex items-center justify-center shadow-lg">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>

                {/* Labels */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                  <span className="text-white text-xs font-medium">Before</span>
                </div>
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                  <span className="text-white text-xs font-medium">After</span>
                </div>
              </div>

              {/* Style badge */}
              <div
                className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${s.accent} rounded-full px-5 py-2 shadow-lg whitespace-nowrap`}
              >
                <span className="text-white font-semibold text-sm">{s.name}</span>
              </div>
              <div className="text-center mt-6">
                <span className="text-gray-400 text-sm">{s.note}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14 text-gray-500 text-sm">
          ✨ 3 free transformations daily • No credit card required
        </div>
      </div>
    </section>
  );
}
