import Link from 'next/link';

export default function Hero() {
  return (
    <div className="container mx-auto px-6 pt-12 pb-20">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left side - Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your Photos into
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Any Style</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Generate the perfect AI profile picture in seconds. No design skills needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/transform" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl">
              Start Creating - 1 Free Per Day
            </Link>
            <Link href="/#pricing" className="bg-purple-800/30 hover:bg-purple-800/50 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all border border-purple-700">
              View Pricing
            </Link>
          </div>
        </div>

        {/* Right side - Image grid */}
        <div className="flex-1 grid grid-cols-1 gap-4 max-w-xl">
          {/* Professional */}
          <div className="rounded-2xl overflow-hidden bg-purple-900/30 p-1 group relative">
            <div className="flex items-center justify-center aspect-square relative rounded-xl overflow-hidden bg-purple-900/50">
              <div className="w-full h-full flex items-center justify-center relative">
                {/* Before side */}
                <div className="w-1/2 h-full overflow-hidden">
                  <img src="/base.jpg" alt="Before" className="w-full h-full object-cover" />
                </div>
                {/* Divider */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30 z-10"></div>
                {/* After side */}
                <div className="w-1/2 h-full overflow-hidden">
                  <img src="/pro-result.jpg" alt="Professional result" className="w-full h-full object-cover" />
                </div>
                {/* Labels */}
                <div className="absolute bottom-2 left-4 bg-black/60 px-2 py-1 rounded text-xs text-white z-10">Before</div>
                <div className="absolute bottom-2 right-4 bg-black/60 px-2 py-1 rounded text-xs text-white z-10">After</div>
                {/* Blend overlay at seam */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-white/5 to-transparent z-5"></div>
              </div>
            </div>
            <div className="p-3 text-center">
              <p className="text-sm text-gray-300 font-semibold">LinkedIn Profile</p>
            </div>
          </div>

          {/* Goths */}
          <div className="rounded-2xl overflow-hidden bg-purple-900/30 p-1 group relative">
            <div className="flex items-center justify-center aspect-square relative rounded-xl overflow-hidden bg-purple-900/50">
              <div className="w-full h-full flex items-center justify-center relative">
                {/* Before side */}
                <div className="w-1/2 h-full overflow-hidden">
                  <img src="/base.jpg" alt="Before" className="w-full h-full object-cover" />
                </div>
                {/* Divider */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30 z-10"></div>
                {/* After side */}
                <div className="w-1/2 h-full overflow-hidden">
                  <img src="/goth-result.jpg" alt="Goth result" className="w-full h-full object-cover" />
                </div>
                {/* Labels */}
                <div className="absolute bottom-2 left-4 bg-black/60 px-2 py-1 rounded text-xs text-white z-10">Before</div>
                <div className="absolute bottom-2 right-4 bg-black/60 px-2 py-1 rounded text-xs text-white z-10">After</div>
                {/* Blend overlay at seam */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-white/5 to-transparent z-5"></div>
              </div>
            </div>
            <div className="p-3 text-center">
              <p className="text-sm text-gray-300 font-semibold">Alt / Goth</p>
            </div>
          </div>

          {/* Anime */}
          <div className="rounded-2xl overflow-hidden bg-purple-900/30 p-1 group relative">
            <div className="flex items-center justify-center aspect-square relative rounded-xl overflow-hidden bg-purple-900/50">
              <div className="w-full h-full flex items-center justify-center relative">
                {/* Before side */}
                <div className="w-1/2 h-full overflow-hidden">
                  <img src="/base.jpg" alt="Before" className="w-full h-full object-cover" />
                </div>
                {/* Divider */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30 z-10"></div>
                {/* After side */}
                <div className="w-1/2 h-full overflow-hidden">
                  <img src="/anime-result.jpg" alt="Anime result" className="w-full h-full object-cover" />
                </div>
                {/* Labels */}
                <div className="absolute bottom-2 left-4 bg-black/60 px-2 py-1 rounded text-xs text-white z-10">Before</div>
                <div className="absolute bottom-2 right-4 bg-black/60 px-2 py-1 rounded text-xs text-white z-10">After</div>
                {/* Blend overlay at seam */}
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-transparent via-white/5 to-transparent z-5"></div>
              </div>
            </div>
            <div className="p-3 text-center">
              <p className="text-sm text-gray-300 font-semibold">Anime</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/transform" className="text-purple-400 hover:text-purple-300 transition text-sm font-medium">
          Try It Now → 1 Free Per Day
        </Link>
      </div>
    </div>
  );
}
