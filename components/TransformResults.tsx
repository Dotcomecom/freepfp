'use client';

export default function TransformResults() {
  // This will eventually show AI-generated results
  // For now, showing the empty state
  
  return (
    <div className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">3. Get Your Results</h2>
      
      <div className="aspect-square rounded-xl bg-gray-900/50 border-2 border-dashed border-purple-700/30 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 opacity-50">✨</div>
          <p className="text-gray-400 font-medium">Your transformation will appear here</p>
          <p className="text-gray-500 text-sm mt-2">Upload a photo and select a style to get started</p>
        </div>
      </div>

      {/* This section will show when results are ready */}
      <div className="hidden mt-4 space-y-3">
        <button className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition">
          Download HD
        </button>
        <div className="flex gap-2">
          <button className="flex-1 py-2 bg-purple-900/30 border border-purple-700/50 text-gray-300 rounded-lg text-sm hover:bg-purple-900/50 transition">
            Share
          </button>
          <button className="flex-1 py-2 bg-purple-900/30 border border-purple-700/50 text-gray-300 rounded-lg text-sm hover:bg-purple-900/50 transition">
            Try Another Style
          </button>
        </div>
      </div>
    </div>
  );
}
