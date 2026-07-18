'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent"></div>

      {/* SVG Filters for dramatic transformations */}
      <svg className="absolute w-0 h-0">
        <defs>
          {/* Anime/Painterly effect - posterize + edge detection look */}
          <filter id="anime-filter">
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 0.4 0.8 1"/>
              <feFuncG type="discrete" tableValues="0 0.3 0.7 1"/>
              <feFuncB type="discrete" tableValues="0.2 0.5 0.9 1"/>
            </feComponentTransfer>
            <feColorMatrix type="saturate" values="3"/>
            <feGaussianBlur stdDeviation="0.8"/>
          </filter>
          {/* Goth effect - high contrast dark */}
          <filter id="goth-filter">
            <feComponentTransfer>
              <feFuncR type="linear" slope="2.5" intercept="-0.8"/>
              <feFuncG type="linear" slope="1.5" intercept="-0.3"/>
              <feFuncB type="linear" slope="3" intercept="-0.5"/>
            </feComponentTransfer>
            <feColorMatrix type="saturate" values="0.3"/>
          </filter>
        </defs>
      </svg>

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
          {/* Professional - warm, polished, studio lighting feel */}
          <div className="relative group">
            <div className="relative aspect-square rounded-2xl overflow-hidden border bg-purple-950/20 border-blue-700/30 hover:border-blue-500/50 transition shadow-2xl">
              {/* Before (left half) */}
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
                  style={{ transform: 'scale(1.1)' }}
                  sizes="(max-width: 768px) 100vw, 16vw"
                />
                {/* Warm studio lighting overlay */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse at 60% 40%, rgba(255,240,200,0.3), transparent 70%), radial-gradient(ellipse at 80% 80%, rgba(0,0,0,0.4), transparent 60%)'
                }}></div>
                {/* Blue-cyan color grade + heavy contrast */}
                <div className="absolute inset-0 mix-blend-color" style={{
                  background: 'linear-gradient(135deg, #e8d5b7, #4a90c4)'
                }}></div>
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(circle at 40% 30%, rgba(255,255,255,0.15), transparent 40%)'
                }}></div>
                {/* Dark edges for studio vignette */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5))',
                  mixBlendMode: 'multiply'
                }}></div>
                {/* Overall warmth + contrast boost */}
                <div className="absolute inset-0 bg-[#1a0a00]/20 mix-blend-overlay"></div>
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

              {/* Labels */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                <span className="text-white text-xs font-medium">Before</span>
              </div>
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                <span className="text-white text-xs font-medium">After</span>
              </div>
            </div>

            {/* Label pill */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full px-5 py-2 shadow-lg whitespace-nowrap">
              <span className="text-white font-semibold text-sm">Professional</span>
            </div>

            {/* Description */}
            <div className="text-center mt-6">
              <span className="text-gray-400 text-sm">Studio-ready headshot</span>
            </div>
          </div>

          {/* Goth - dark, high contrast, heavy black/purple tint */}
          <div className="relative group">
            <div className="relative aspect-square rounded-2xl overflow-hidden border bg-purple-950/20 border-purple-700/40 hover:border-purple-400/60 transition shadow-2xl">
              {/* Before (left half) */}
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
                    filter: 'url(#goth-filter) contrast(2) brightness(0.6)'
                  }}
                  sizes="(max-width: 768px) 100vw, 16vw"
                />
                {/* Dark purple-black wash */}
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(180deg, rgba(30,0,50,0.5), rgba(0,0,0,0.8))',
                  mixBlendMode: 'multiply'
                }}></div>
                {/* Purple/red accent glow */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(120,0,80,0.4), transparent 70%)',
                  mixBlendMode: 'screen'
                }}></div>
                {/* Red-violet color overlay */}
                <div className="absolute inset-0 mix-blend-overlay" style={{
                  background: 'linear-gradient(180deg, #2a0030, #0a0015, #1a0020)'
                }}></div>
                {/* Heavy vignette - almost black edges */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.9))',
                  mixBlendMode: 'multiply'
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

              {/* Labels */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                <span className="text-white text-xs font-medium">Before</span>
              </div>
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                <span className="text-white text-xs font-medium">After</span>
              </div>
            </div>

            {/* Label pill */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full px-5 py-2 shadow-lg whitespace-nowrap">
              <span className="text-white font-semibold text-sm">Goth</span>
            </div>

            {/* Description */}
            <div className="text-center mt-6">
              <span className="text-gray-400 text-sm">Dark aesthetic portrait</span>
            </div>
          </div>

          {/* Anime - vibrant, flat-looking, saturated */}
          <div className="relative group">
            <div className="relative aspect-square rounded-2xl overflow-hidden border bg-purple-950/20 border-pink-700/30 hover:border-pink-500/50 transition shadow-2xl">
              {/* Before (left half) */}
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
                    filter: 'url(#anime-filter) saturate(2.5) brightness(1.3) contrast(1.3)'
                  }}
                  sizes="(max-width: 768px) 100vw, 16vw"
                />
                {/* Bright pastel overlay */}
                <div className="absolute inset-0" style={{
                  background: 'linear-gradient(135deg, rgba(255,180,220,0.35), rgba(180,220,255,0.3), rgba(255,200,150,0.2))',
                  mixBlendMode: 'screen'
                }}></div>
                {/* Anime-style color bands */}
                <div className="absolute inset-0 mix-blend-soft-light" style={{
                  background: 'repeating-linear-gradient(0deg, rgba(255,200,255,0.1) 0px, transparent 2px, transparent 4px)'
                }}></div>
                {/* Soft glow edges */}
                <div className="absolute inset-0" style={{
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.1), rgba(200,180,255,0.2))',
                  mixBlendMode: 'overlay'
                }}></div>
                {/* Pink-blue anime color cast */}
                <div className="absolute inset-0 mix-blend-color" style={{
                  background: 'linear-gradient(to bottom right, #ffb6d9, #b6d9ff, #ffe0b6)'
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

              {/* Labels */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                <span className="text-white text-xs font-medium">Before</span>
              </div>
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded px-2 py-1 z-30">
                <span className="text-white text-xs font-medium">After</span>
              </div>
            </div>

            {/* Label pill */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full px-5 py-2 shadow-lg whitespace-nowrap">
              <span className="text-white font-semibold text-sm">Anime</span>
            </div>

            {/* Description */}
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
