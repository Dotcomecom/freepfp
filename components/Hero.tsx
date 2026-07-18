"use client";

const styles = [
  {
    img: "/pro-result.jpg",
    label: "LinkedIn Profile",
    gradient: "from-blue-500/40 via-purple-500/40 to-cyan-500/40",
    glow: "hover:shadow-blue-500/40",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  {
    img: "/goth-result.jpg",
    label: "Alt / Goth",
    gradient: "from-red-500/40 via-purple-500/40 to-pink-500/40",
    glow: "hover:shadow-pink-500/40",
    badge: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  },
  {
    img: "/anime-result.jpg",
    label: "Anime",
    gradient: "from-amber-500/40 via-rose-500/40 to-fuchsia-500/40",
    glow: "hover:shadow-amber-500/40",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
];

export default function Hero() {
  return (
    <div className="container mx-auto px-6 pt-4 pb-16">
      {/* 3 big hero boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {styles.map((s, i) => (
          <div
            key={i}
            className={`group relative rounded-3xl overflow-hidden border-2 border-white/5 bg-gradient-to-br ${s.gradient} 
              hover:border-white/20 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:${s.glow} hover:shadow-2xl`}
          >
            {/* Main image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={s.img}
                alt={`${s.label} style`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Subtle dark overlay at bottom to make label readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Floating badge top-left */}
              <span
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${s.badge}`}
              >
                {i + 1}/{styles.length}
              </span>
            </div>

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <p className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
