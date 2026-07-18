import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your Photo Into
            <span className="block mt-2 gradient-text">Any Style You Want</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Upload your LinkedIn photo and let AI transform it into professional headshots, 
            goth aesthetics, anime characters, and hundreds more styles. Free daily credits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/transform">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold text-lg shadow-lg shadow-purple-500/25">
                Start Transforming - It&apos;s Free
              </button>
            </Link>
            <a href="#features">
              <button className="px-8 py-4 bg-purple-900/30 border border-purple-700/50 text-white rounded-lg hover:bg-purple-900/50 transition font-semibold text-lg">
                See Examples
              </button>
            </a>
          </div>
        </div>
        
        {/* Hero Images - 3 transformations side by side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Professional */}
          <div className="relative group">
            <div className="aspect-square rounded-2xl overflow-hidden border border-purple-900/30 group-hover:border-purple-700/50 transition">
              <Image
                src="/professional.jpg"
                alt="Professional headshot style"
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
              <span className="text-white font-medium text-sm">Professional</span>
              <span className="text-purple-400 text-xs ml-2">1 credit</span>
            </div>
          </div>
          
          {/* Goth */}
          <div className="relative group">
            <div className="aspect-square rounded-2xl overflow-hidden border border-purple-700/30 group-hover:border-purple-500/50 transition">
              <Image
                src="/goth.jpg"
                alt="Goth aesthetic style"
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
              <span className="text-white font-medium text-sm">Goth</span>
              <span className="text-purple-400 text-xs ml-2">1 credit</span>
            </div>
          </div>
          
          {/* Anime */}
          <div className="relative group">
            <div className="aspect-square rounded-2xl overflow-hidden border border-pink-700/30 group-hover:border-pink-500/50 transition">
              <Image
                src="/anime.jpg"
                alt="Anime style"
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
              <span className="text-white font-medium text-sm">Anime</span>
              <span className="text-purple-400 text-xs ml-2">1 credit</span>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-gray-500 text-sm">
          ✨ 3 free transformations daily • No credit card required
        </div>
      </div>
    </section>
  );
}
