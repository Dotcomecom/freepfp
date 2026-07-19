import Link from 'next/link'

const topStyles = [
  {
    name: 'LinkedIn Profile',
    image: '/pro-result.jpg',
    border: 'border-purple-500/30',
    glow: 'hover:border-purple-400',
  },
  {
    name: 'Alt / Goth',
    image: '/goth-result.jpg',
    border: 'border-pink-500/30',
    glow: 'hover:border-pink-400',
  },
  {
    name: 'Anime',
    image: '/anime-result.jpg',
    border: 'border-green-500/30',
    glow: 'hover:border-green-400',
  },
]

const allStyles = [
  'LinkedIn Profile', 'Alt / Goth', 'Anime', 'Fairycore', 'Grunge', 'Indie Sleaze',
  'Cottagecore', 'Cyberpunk', 'Dark Academia', 'Maximalist', 'Minimalist', 'Vaporwave',
]

const badgeColors = [
  'from-purple-600 to-purple-400',
  'from-pink-600 to-pink-400',
  'from-green-600 to-green-400',
]

export default function Hero() {
  return (
    <section className="relative pb-8 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        {/* Hero headline */}
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
          LinkedIn, Goth, Anime, Cyberpunk, Vaporwave
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> &amp; 7 More Styles</span>
        </h1>
        <p className="text-lg text-gray-400 mb-2">
          Upload a photo, pick your aesthetic, and generate a stunning AI profile picture in seconds.
        </p>
        <p className="text-sm text-gray-500 mb-2">
          12 styles: {allStyles.join(', ')}
        </p>

        {/* Main showcase */}
        <div className="max-w-6xl mx-auto text-center mb-12 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            12 STUNNING, BOLD, &amp; EYE-CATCHING
          </h1>
          <div className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mb-4">
            FROM LINKEDIN TO VAPORWAVE
          </div>
          <div className="text-7xl md:text-9xl font-black text-white tracking-tight leading-none">
            ALL IN SECONDS
          </div>

          {/* Featured image grid - 3 big boxes only, NO second row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
            {topStyles.map((style, i) => (
              <div key={style.name} className="group relative">
                <span className={`bg-gradient-to-r ${badgeColors[i]} px-3 py-1 rounded-full text-xs font-bold shadow-lg absolute -top-3 -left-3 z-10`}>
                  0{i + 1}
                </span>
                <div className={`relative aspect-[4/5] rounded-2xl overflow-hidden border-4 ${style.border} ${style.glow} shadow-2xl transition-all duration-500 group-hover:shadow-3xl group-hover:-translate-y-2`}>
                  <img
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
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
          <Link href="/transform">
            <button className="mt-16 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl rounded-xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-300">
              TRY IT NOW - 1 FREE PER DAY
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
