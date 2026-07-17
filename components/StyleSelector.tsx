'use client';

import { useState } from 'react';

const styles = [
  { id: 'professional', name: 'Professional', emoji: '💼', credits: 1, description: 'LinkedIn-ready headshot' },
  { id: 'goth', name: 'Goth', emoji: '🖤', credits: 1, description: 'Dark aesthetic transformation' },
  { id: 'anime', name: 'Anime', emoji: '🎌', credits: 1, description: 'Japanese animation style' },
  { id: 'cyberpunk', name: 'Cyberpunk', emoji: '🤖', credits: 2, description: 'Futuristic neon look' },
  { id: 'fantasy', name: 'Fantasy', emoji: '🧙', credits: 2, description: 'Epic character portrait' },
  { id: 'cartoon', name: 'Cartoon', emoji: '🎨', credits: 1, description: 'Playful cartoon style' },
];

export default function StyleSelector() {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  return (
    <div className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">2. Pick a Style</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {styles.map(style => (
          <button
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              selectedStyle === style.id
                ? 'border-purple-500 bg-purple-900/30'
                : 'border-purple-900/30 hover:border-purple-700/50 bg-purple-900/5'
            }`}
          >
            <div className="text-3xl mb-2">{style.emoji}</div>
            <div className="text-white font-medium">{style.name}</div>
            <div className="text-gray-400 text-xs mt-1">{style.description}</div>
            <div className="text-purple-400 text-xs mt-2">{style.credits} credit{style.credits > 1 ? 's' : ''}</div>
          </button>
        ))}
      </div>

      <button
        disabled={!selectedStyle}
        className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-pink-700 transition"
      >
        Transform Photo
      </button>
    </div>
  );
}
