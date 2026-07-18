"use client";

const styles = [
  { id: "professional", name: "Professional", emoji: "💼", credits: 1, description: "LinkedIn-ready headshot" },
  { id: "goth", name: "Goth", emoji: "🖤", credits: 1, description: "Dark aesthetic transformation" },
  { id: "anime", name: "Anime", emoji: "🎌", credits: 1, description: "Japanese animation style" },
  { id: "cyberpunk", name: "Cyberpunk", emoji: "🤖", credits: 1, description: "Futuristic neon look" },
  { id: "fantasy", name: "Fantasy", emoji: "🧙", credits: 1, description: "Epic character portrait" },
  { id: "cartoon", name: "Cartoon", emoji: "🎨", credits: 1, description: "Playful cartoon style" },
];

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
}

export default function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  return (
    <div className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">2. Pick a Style</h2>

      <div className="grid grid-cols-2 gap-3">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleSelect(style.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              selectedStyle === style.id
                ? "border-purple-500 bg-purple-900/30"
                : "border-purple-900/30 hover:border-purple-700/50 bg-purple-900/5"
            }`}
          >
            <div className="text-3xl mb-2">{style.emoji}</div>
            <div className="text-white font-medium">{style.name}</div>
            <div className="text-gray-400 text-xs mt-1">{style.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
