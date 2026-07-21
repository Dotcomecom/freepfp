"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/lib/AuthContext";
import { getSupabaseClient } from "@/lib/supabase";
import AdSenseAd from "@/components/AdSenseAd";

const STYLES = [
  {
    id: "linkedin",
    name: "LinkedIn Profile",
    description: "Professional headshot",
    gradient: "from-blue-600 to-blue-800",
    emoji: "💼",
    prompt: "professional LinkedIn profile headshot, corporate portrait, clean neutral background, soft studio lighting, business attire",
  },
  {
    id: "alt-goth",
    name: "Alt / Goth",
    description: "Dark alternative style",
    gradient: "from-gray-900 to-red-950",
    emoji: "🖤",
    prompt: "gothic alternative portrait, dark aesthetic, moody lighting, edgy style, dramatic shadows",
  },
  {
    id: "anime",
    name: "Anime",
    description: "Japanese animation style",
    gradient: "from-pink-500 to-purple-600",
    emoji: "✨",
    prompt: "anime portrait style, Japanese animation aesthetic, vibrant colors, cel shading, manga inspired",
  },
  {
    id: "fairycore",
    name: "Fairycore",
    description: "Whimsical fairy aesthetic",
    gradient: "from-green-300 to-pink-300",
    emoji: "",
    prompt: "fairycore portrait, whimsical fairy aesthetic, soft pastel colors, dreamy ethereal glow, magical sparkle",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Futuristic neon style",
    gradient: "from-fuchsia-600 to-cyan-500",
    emoji: "⚡",
    prompt: "cyberpunk portrait, neon-lit futuristic style, vibrant pink and cyan neon, dark urban background, sci-fi aesthetic",
  },
  {
    id: "cottagecore",
    name: "Cottagecore",
    description: "Rural pastoral charm",
    gradient: "from-green-400 to-yellow-300",
    emoji: "🌸",
    prompt: "cottagecore portrait, rustic rural aesthetic, soft natural lighting, vintage countryside charm, pastoral setting",
  },
  {
    id: "indie-sleaze",
    name: "Indie Sleaze",
    description: "2000s indie rock vibe",
    gradient: "from-orange-600 to-red-700",
    emoji: "",
    prompt: "indie sleaze portrait, 2000s indie rock aesthetic, grainy film filter, flash photography, downtown party vibe",
  },
  {
    id: "dark-academia",
    name: "Dark Academia",
    description: "Literary intellectual",
    gradient: "from-amber-900 to-yellow-700",
    emoji: "📚",
    prompt: "dark academia portrait, literary aesthetic, moody scholarly atmosphere, warm vintage tones, classical intellectual vibe",
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    description: "80s retro aesthetic",
    gradient: "from-purple-500 to-cyan-400",
    emoji: "💾",
    prompt: "vaporwave portrait, 80s retro aesthetic, pastel pink and purple gradient, glitch effects, nostalgic digital art",
  },
  {
    id: "maximalist",
    name: "Maximalist",
    description: "Bold & vibrant",
    gradient: "from-red-500 via-yellow-500 to-blue-500",
    emoji: "",
    prompt: "maximalist portrait, bold patterns, vibrant colors, artistic editorial photography, colorful statement fashion, layered textures",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean & simple",
    gradient: "from-white via-gray-200 to-gray-300",
    emoji: "⚪",
    prompt: "minimalist clean portrait, pure white background, elegant understated, soft even lighting, modern professional photography",
  },
  {
    id: "grunge",
    name: "Grunge",
    description: "90s rock and roll",
    gradient: "from-gray-800 to-red-900",
    emoji: "🎭",
    prompt: "grunge portrait, 90s rock and roll aesthetic, edgy texture, dark moody lighting, alternative rebellion",
  },
];

const VIBES = ["soft", "moody", "vibrant", "natural"];
const PALETTES = ["warm", "cool", "neutral", "bold"];

export default function TransformPage() {
  const { user, credits } = useAuth();
  const [photo, setPhoto] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [gender, setGender] = useState("female");
  const [vibe, setVibe] = useState("soft");
  const [palette, setPalette] = useState("warm");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!photo || !style) {
      setError("Please upload a photo and select a style");
      return;
    }
    if (!user) {
      setError("Please sign in to generate images");
      return;
    }

    setGenerating(true);
    setError("");

    try {
      const selectedStyle = STYLES.find(s => s.id === style);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: photo,
          style: style,
          prompt: selectedStyle?.prompt || "",
          gender,
          vibe,
          palette,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed");
      }

      const { error: creditError } = await getSupabaseClient().rpc("use_credit");
      if (creditError) console.error("Credit deduction error:", creditError);

    } catch (err) {
      console.error("Generation error:", err);
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Transform Your Photo
        </h1>
        <p className="text-center text-gray-400 mb-8">
          You have <span className="text-purple-400 font-semibold">{credits}</span> free credit{credits !== 1 ? "s" : ""} remaining today
        </p>

        <AdSenseAd />

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {/* Photo Upload */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">1. Upload Your Photo</h2>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-purple-500/50 hover:border-purple-400 rounded-xl p-12 transition-all"
          >
            {photo ? (
              <img src={photo} alt="Selected" className="max-h-64 mx-auto rounded-lg" />
            ) : (
              <div className="text-gray-400">
                <div className="text-6xl mb-4">📸</div>
                <div className="text-xl">Click to upload your photo</div>
                <div className="text-sm mt-2">PNG, JPG, or WEBP (max 10MB)</div>
              </div>
            )}
          </button>
        </div>

        {/* Style Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. Choose a Style</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {STYLES.map((s) => {
              const isSelected = style === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={
                    "relative rounded-xl overflow-hidden aspect-square transition-all bg-gradient-to-br " +
                    s.gradient + " " +
                    (isSelected
                      ? "ring-4 ring-purple-500 scale-95"
                      : "hover:scale-95 opacity-70 hover:opacity-100")
                  }
                >
                  {/* Emoji badge */}
                  <div className="absolute top-3 right-3 text-4xl">{s.emoji}</div>
                  {/* Gradient scrim for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Style label */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-xl font-bold text-white text-center px-2 drop-shadow-lg">
                      {s.name}
                    </div>
                  </div>
                  {/* Description */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                    <div className="text-xs text-gray-300">{s.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div>
            <h3 className="text-lg font-semibold mb-3">Gender</h3>
            <div className="flex gap-2">
              {["female", "male", "non-binary"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={
                    "flex-1 py-2 rounded-lg transition-all " +
                    (gender === g
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700")
                  }
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Vibe</h3>
            <div className="flex gap-2">
              {VIBES.map((v) => (
                <button
                  key={v}
                  onClick={() => setVibe(v)}
                  className={
                    "flex-1 py-2 rounded-lg capitalize transition-all " +
                    (vibe === v
                      ? "bg-pink-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700")
                  }
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Color Palette</h3>
            <div className="flex gap-2">
              {PALETTES.map((p) => (
                <button
                  key={p}
                  onClick={() => setPalette(p)}
                  className={
                    "flex-1 py-2 rounded-lg capitalize transition-all " +
                    (palette === p
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700")
                  }
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate */}
        <div className="text-center">
          <button
            onClick={handleGenerate}
            disabled={generating || !photo || !style}
            className={
              "px-12 py-4 rounded-xl text-lg font-bold transition-all " +
              (generating || !photo || !style
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 hover:scale-105 shadow-lg shadow-purple-500/30")
            }
          >
            {generating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Profile Picture"
            )}
          </button>
          {!photo && <p className="text-gray-500 text-sm mt-2">Upload a photo to continue</p>}
        </div>

        <AdSenseAd />
      </div>
    </div>
  );
}
