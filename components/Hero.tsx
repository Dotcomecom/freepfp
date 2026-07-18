export default function Hero() {
  return (
    <div className="container mx-auto px-6 pb-8">
      {/* 3 image boxes in a row - each showing ONE complete transformation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* Professional/LinkedIn */}
        <div className="rounded-2xl overflow-hidden bg-purple-900/30 p-1 hover:bg-purple-800/50 transition-all duration-300">
          <div className="aspect-square rounded-xl overflow-hidden bg-purple-900/50">
            <img
              src="/pro-result.jpg"
              alt="Professional LinkedIn style"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 text-center">
            <p className="text-sm text-gray-300 font-semibold">LinkedIn Profile</p>
          </div>
        </div>

        {/* Alt/Goth */}
        <div className="rounded-2xl overflow-hidden bg-purple-900/30 p-1 hover:bg-purple-800/50 transition-all duration-300">
          <div className="aspect-square rounded-xl overflow-hidden bg-purple-900/50">
            <img
              src="/goth-result.jpg"
              alt="Alt/Goth style"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 text-center">
            <p className="text-sm text-gray-300 font-semibold">Alt / Goth</p>
          </div>
        </div>

        {/* Anime */}
        <div className="rounded-2xl overflow-hidden bg-purple-900/30 p-1 hover:bg-purple-800/50 transition-all duration-300">
          <div className="aspect-square rounded-xl overflow-hidden bg-purple-900/50">
            <img
              src="/anime-result.jpg"
              alt="Anime style"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 text-center">
            <p className="text-sm text-gray-300 font-semibold">Anime</p>
          </div>
        </div>
      </div>
    </div>
  );
}
