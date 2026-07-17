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
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold text-lg shadow-lg shadow-purple-500/25">
              Start Transforming - It's Free
            </button>
            <button className="px-8 py-4 bg-purple-900/30 border border-purple-700/50 text-white rounded-lg hover:bg-purple-900/50 transition font-semibold text-lg">
              See Examples
            </button>
          </div>
        </div>
        
        {/* Hero Images - 3 transformations side by side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Professional */}
          <div className="relative group">
            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-purple-900/30 group-hover:border-purple-700/50 transition">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-4"></div>
                  <div className="text-gray-400 text-sm">Professional</div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
              <span className="text-white font-medium text-sm">Professional</span>
              <span className="text-purple-400 text-xs ml-2">1 credit</span>
            </div>
          </div>
          
          {/* Goth */}
          <div className="relative group">
            <div className="aspect-square bg-gradient-to-br from-purple-900 to-pink-900 rounded-2xl overflow-hidden border border-purple-700/30 group-hover:border-purple-500/50 transition">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-600 to-pink-700 rounded-full mb-4"></div>
                  <div className="text-gray-400 text-sm">Goth</div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
              <span className="text-white font-medium text-sm">Goth</span>
              <span className="text-purple-400 text-xs ml-2">1 credit</span>
            </div>
          </div>
          
          {/* Anime */}
          <div className="relative group">
            <div className="aspect-square bg-gradient-to-br from-pink-900 to-orange-900 rounded-2xl overflow-hidden border border-pink-700/30 group-hover:border-pink-500/50 transition">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-500 to-orange-500 rounded-full mb-4"></div>
                  <div className="text-gray-400 text-sm">Anime</div>
                </div>
              </div>
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
