import Link from "next/link";

const topStyles = [
  { name: "LinkedIn Profile", img: "/pro-result.jpg" },
  { name: "Alt / Goth", img: "/goth-result.jpg" },
  { name: "Anime", img: "/anime-result.jpg" },
];

const bottomStyles = [
  { name: "Fairycore", img: "/style-fairycore.jpg" },
  { name: "Cyberpunk", img: "/style-cyber.jpg" },
  { name: "Cottagecore", img: "/style-cottage.jpg" },
];

export default function Hero() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Headline - ALL IN SECONDS is biggest */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          12 STUNNING, BOLD, & EYE-CATCHING
        </h1>
        <div className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-4">
          FROM LINKEDIN TO VAPORWAVE
        </div>
        <div className="text-7xl md:text-9xl font-black text-white tracking-tight leading-none">
          ALL IN SECONDS
        </div>
      </div>

      {/* Top 3 showcase boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
        {topStyles.map((style, i) => (
          <div key={i} className="group relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden border-4 border-purple-500/30 hover:border-purple-400 shadow-2xl transition-all duration-300 hover:scale-105">
              <img
                src={style.img}
                alt={style.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xl md:text-2xl font-bold text-white text-center drop-shadow-lg">
                  {style.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom 3 different boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
        {bottomStyles.map((style, i) => (
          <div key={i} className="group relative">
            <div className="aspect-[4/5] rounded-xl overflow-hidden border-4 border-pink-500/30 hover:border-pink-400 shadow-2xl transition-all duration-300 hover:scale-105">
              <img
                src={style.img}
                alt={style.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xl md:text-2xl font-bold text-white text-center drop-shadow-lg">
                  {style.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <Link href="/transform">
          <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl rounded-xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300">
            TRY IT NOW - 1 FREE PER DAY
          </button>
        </Link>
      </div>
    </div>
  );
}
