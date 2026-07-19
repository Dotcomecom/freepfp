"use client";

interface TransformResultsProps {
  transformed: boolean;
  selectedStyle: string;
  imageUrl?: string | null;
  processing?: boolean;
}

const styleLabels: Record<string, string> = {
  linkedin: "LinkedIn Profile",
  "alt-goth": "Alt / Goth",
  anime: "Anime Style",
  fairycore: "Fairycore",
  grunge: "Grunge",
  "indie-sleaze": "Indie Sleaze",
  cottagecore: "Cottagecore",
  cyberpunk: "Cyberpunk",
  "dark-academia": "Dark Academia",
  maximalist: "Maximalist",
  minimalist: "Minimalist",
  vaporwave: "Vaporwave",
};

export default function TransformResults({ transformed, selectedStyle, imageUrl, processing }: TransformResultsProps) {
  const styleName = styleLabels[selectedStyle] || "Transformation";

  const handleDownload = async () => {
    if (!imageUrl) return;
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `freepfp-${selectedStyle}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <div className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Result</h2>

      {processing ? (
        <div className="aspect-square rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4 animate-pulse">✨</div>
            <p className="text-white font-bold text-lg">Generating your masterpiece...</p>
            <p className="text-gray-400 text-sm mt-2">This takes about 10-15 seconds</p>
            <div className="mt-4 w-48 h-1 bg-purple-900/30 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse rounded-full" />
            </div>
          </div>
        </div>
      ) : !transformed || !imageUrl ? (
        <div className="aspect-square rounded-xl bg-gray-900/50 border-2 border-dashed border-purple-700/30 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4 opacity-50">✨</div>
            <p className="text-gray-400 font-medium">
              Your transformation will appear here
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Upload a photo, pick your style, and hit Generate
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden bg-black border border-purple-900/30">
            <img
              src={imageUrl}
              alt={styleName}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "";
                (e.target as HTMLImageElement).alt = "Failed to load image";
              }}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="px-2 py-1 bg-purple-900/30 rounded border border-purple-900/40">{styleName}</span>
          </div>
          <button
            onClick={handleDownload}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
          >
            ⬇ Download
          </button>
        </div>
      )}
    </div>
  );
}
