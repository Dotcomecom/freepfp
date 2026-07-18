"use client";

interface TransformResultsProps {
  transformed: boolean;
  selectedStyle: string;
}

const styleLabels: Record<string, string> = {
  professional: "Professional Headshot",
  goth: "Goth Transformation",
  anime: "Anime Style",
  cyberpunk: "Cyberpunk Look",
  fantasy: "Fantasy Portrait",
  cartoon: "Cartoon Style",
};

export default function TransformResults({ transformed, selectedStyle }: TransformResultsProps) {
  const styleName = styleLabels[selectedStyle] || "Transformation";

  return (
    <div className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">3. Get Your Results</h2>

      {!transformed ? (
        <div className="aspect-square rounded-xl bg-gray-900/50 border-2 border-dashed border-purple-700/30 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4 opacity-50">✨</div>
            <p className="text-gray-400 font-medium">
              Your transformation will appear here
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Upload a photo, pick a style, and hit Transform
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="aspect-square rounded-xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4">✨</div>
              <p className="text-white font-bold text-lg">{styleName}</p>
              <p className="text-gray-300 text-sm mt-2">Generated successfully!</p>
            </div>
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition">
            Download
          </button>
          <button className="w-full py-2 bg-purple-900/30 border border-purple-700/50 text-gray-300 rounded-lg text-sm hover:bg-purple-900/50 transition">
            Try Another Style
          </button>
        </div>
      )}
    </div>
  );
}
