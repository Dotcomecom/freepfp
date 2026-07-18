'use client'

import Image from 'next/image'

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
            Upload your photo and let AI transform it into professional headshots, goth aesthetics, anime characters, and hundreds more styles. Free daily credits.
          </p>
        </div>

        {/* Hero Image Cards - Before/After transformation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-10">

          {/* Professional - warm studio lighting, blue-cyan color grade, heavy vignette */}
          <div className="relative group">
            <div className="relative aspect-square rounded-2xl overflow-hidden border bg-purple-950/20 border-blue-700/30 hover:border-blue-500/50 transition shadow-2xl">
              {/* Before (left half) - original */}
              <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden z-10">
                <Image
                  src="/base.jpg"
                  alt="Original photo"
                  fill
                  className="object-cover object-center transition duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 16vw"
                />
              </div>

              {/* After (right half) - Professional */}
              <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
                <Image
                  src="/base.jpg"
                  alt="Professional style result"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    transform: 'scale(1.1)',
                    filter: 'brightness(1.2) contrast(1.4) saturate(1.1)'
                  }}
                  sizes="(max-width: 768px) 100vw, 16vw"
                />
                {/* Warm golden light from top-left */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse at 30% 20%, rgba(255,220,150,0.45), transparent 65%)'
                }}></div>
                {/* Cool blue shadow on edges */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse at center, transparent 20%, rgba(20,50,100,0.55))',
                  mixBlendMode: 'multiply'
                }}></div>
                {/* Teal-cyan color grade */}
                <div className="absolute inset-0 mix-blend-overlay" style={{
                  background: 'linear-gradient(180deg, rgba(40,180,200,0.25), rgba(20,60,80,0.15))'
                }}></div>
                {/* Studio vignette */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.65))',
                  mixBlendMode: 'multiply'
                }}></div>
                {/* Highlight glow */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(circle at 45% 35%, rgba(255,255,255,0.2), transparent 35%)',
                  mixBlendMode: 'screen'
                }}></div>
              </div>

              {/* Divider line */}
              <div className="absolute inset-y-0 left-1/2 w-[2px] bg-white/80 z-20 transform -translate-x-1/2">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-purple-900 flex items-center justify-center shadow-lg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                <span className="text-white text-xs font-medium">Before</span>
              </div>
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                <span className="text-white text-xs font-medium">After</span>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full px-5 py-2 shadow-lg whitespace-nowrap">
              <span className="text-white font-semibold text-sm">Professional</span>
            </div>
            <div className="text-center mt-6">
              <span className="text-gray-400 text-sm">Studio-ready headshot</span>
            </div>
          </div>

          {/* Goth - very dark, high contrast, heavy black/purple/blue-black */}
          <div className="relative group">
            <div className="relative aspect-square rounded-2xl overflow-hidden border bg-purple-950/20 border-purple-700/40 hover:border-purple-400/60 transition shadow-2xl">
              {/* Before (left half) - original */}
              <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden z-10">
                <Image
                  src="/base.jpg"
                  alt="Original photo"
                  fill
                  className="object-cover object-center transition duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 16vw"
                />
              </div>

              {/* After (right half) - Goth */}
              <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
                <Image
                  src="/base.jpg"
                  alt="Goth style result"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    transform: 'scale(1.1)',
                    filter: 'brightness(0.4) contrast(2.5) saturate(0.3)'
                  }}
                  sizes="(max-width: 768px) 100vw, 16vw"
                />
                {/* Deep purple-black wash - multiply makes everything much darker */}
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(180deg, rgba(40,0,60,0.7), rgba(0,0,0,0.85))',
                  mixBlendMode: 'multiply'
                }}></div>
                {/* Purple color cast */}
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(160deg, #1a0025, #0a0010, #050008)',
                  mixBlendMode: 'overlay'
                }}></div>
                {/* Red/violet glow from behind subject */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(circle at 50% 45%, rgba(140,0,60,0.3), transparent 50%)',
                  mixBlendMode: 'screen'
                }}></div>
                {/* Near-total blackout at edges */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.95) 55%)',
                  mixBlendMode: 'multiply'
                }}></div>
                {/* Cold blue tint */}
                <div className="absolute inset-0" style={{
                  background: 'rgba(10,0,30,0.4)',
                  mixBlendMode: 'color'
                }}></div>
              </div>

              {/* Divider line */}
              <div className="absolute inset-y-0 left-1/2 w-[2px] bg-white/80 z-20 transform -translate-x-1/2">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-purple-900 flex items-center justify-center shadow-lg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                <span className="text-white text-xs font-medium">Before</span>
              </div>
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                <span className="text-white text-xs font-medium">After</span>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-5 py-2 shadow-lg whitespace-nowrap">
              <span className="text-white font-semibold text-sm">Goth</span>
            </div>
            <div className="text-center mt-6">
              <span className="text-gray-400 text-sm">Dark aesthetic portrait</span>
            </div>
          </div>

          {/* Anime - pastel, saturated, dreamy, posterized */}
          <div className="relative group">
            <div className="relative aspect-square rounded-2xl overflow-hidden border bg-purple-950/20 border-pink-700/30 hover:border-pink-500/50 transition shadow-2xl">
              {/* Before (left half) - original */}
              <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden z-10">
                <Image
                  src="/base.jpg"
                  alt="Original photo"
                  fill
                  className="object-cover object-center transition duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, 16vw"
                />
              </div>

              {/* After (right half) - Anime */}
              <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden">
                <Image
                  src="/base.jpg"
                  alt="Anime style result"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    transform: 'scale(1.1)',
                    filter: 'brightness(1.4) contrast(1.3) saturate(2.0) blur(0.8px)'
                  }}
                  sizes="(max-width: 768px) 100vw, 16vw"
                />
                {/* Pastel pink-blue wash */}
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(135deg, rgba(255,180,220,0.5), rgba(180,200,255,0.5), rgba(255,200,180,0.4))',
                  mixBlendMode: 'screen'
                }}></div>
                {/* Bright color pop overlay */}
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(to bottom right, rgba(255,150,200,0.3), rgba(150,200,255,0.3))',
                  mixBlendMode: 'color'
                }}></div>
                {/* Dreamy soft light */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.25), rgba(255,200,255,0.15))',
                  mixBlendMode: 'soft-light'
                }}></div>
                {/* Anime-style flat light edges */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse at center, transparent 30%, rgba(255,180,220,0.35) 70%)',
                  mixBlendMode: 'overlay'
                }}></div>
              </div>

              {/* Divider line */}
              <div className="absolute inset-y-0 left-1/2 w-[2px] bg-white/80 z-20 transform -translate-x-1/2">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-purple-900 flex items-center justify-center shadow-lg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                <span className="text-white text-xs font-medium">Before</span>
              </div>
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                <span className="text-white text-xs font-medium">After</span>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full px-5 py-2 shadow-lg whitespace-nowrap">
              <span className="text-white font-semibold text-sm">Anime</span>
            </div>
            <div className="text-center mt-6">
              <span className="text-gray-400 text-sm">Illustrated anime character</span>
            </div>
          </div>
        </div>

        {/* Subtitle text */}
        <div className="text-center mt-14 text-gray-500 text-sm">
          ✨ 3 free transformations daily • No credit card required
        </div>
      </div>
    </section>
  )
}
