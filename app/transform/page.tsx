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
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
    fallback: "/style-previews/linkedin.jpg",
    prompt: "professional LinkedIn profile headshot, corporate portrait, clean neutral background, soft studio lighting, business attire",
  },
  {
    id: "alt-goth",
    name: "Alt / Goth",
    description: "Dark alternative style",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=400&h=400&fit=crop",
    fallback: "/style-previews/goth.jpg",
    prompt: "gothic alternative portrait, dark aesthetic, moody lighting, edgy style, dramatic shadows",
  },
  {
    id: "anime",
    name: "Anime",
    description: "Japanese animation style",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop",
    fallback: "/style-previews/anime.jpg",
    prompt: "anime portrait style, Japanese animation aesthetic, vibrant colors, cel shading, manga inspired",
  },
  {
    id: "fairycore",
    name: "Fairycore",
    description: "Whimsical fairy aesthetic",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400&h=400&fit=crop",
    fallback: "/style-previews/fairycore.jpg",
    prompt: "fairycore portrait, whimsical fairy aesthetic, soft pastel colors, dreamy ethereal glow, magical sparkle",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Futuristic neon style",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&h=400&fit=crop",
    fallback: "/style-previews/cyberpunk.jpg",
    prompt: "cyberpunk portrait, neon-lit futuristic style, vibrant pink and cyan neon, dark urban background, sci-fi aesthetic",
  },
  {
    id: "cottagecore",
    name: "Cottagecore",
    description: "Rural pastoral charm",
    image: "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=400&h=400&fit=crop",
    fallback: "/style-previews/cottagecore.jpg",
    prompt: "cottagecore portrait, rustic rural aesthetic, soft natural lighting, vintage countryside charm, pastoral setting",
  },
  {
    id: "indie-sleaze",
    name: "Indie Sleaze",
    description: "2000s indie rock vibe",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
    fallback: "/style-previews/indie.jpg",
    prompt: "indie sleaze portrait, 2000s indie rock aesthetic, grainy film filter, flash photography, downtown party vibe",
  },
  {
    id: "dark-academia",
    name: "Dark Academia",
    description: "Literary intellectual",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop",
    fallback: "/style-previews/academia.jpg",
    prompt: "dark academia portrait, literary aesthetic, moody scholarly atmosphere, warm vintage tones, classical intellectual vibe",
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    description: "80s retro aesthetic",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop",
    fallback: "/style-previews/vaporwave.jpg",
    prompt: "vaporwave portrait, 80s retro aesthetic, pastel pink and purple gradient, glitch effects, nostalgic digital art",
  },
  {
    id: "maximalist",
    name: "Maximalist",
    description: "Bold & vibrant",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop",
    fallback: "/style-previews/maximalist.jpg",
    prompt: "maximalist portrait, bold patterns, vibrant colors, artistic editorial photography, colorful statement fashion, layered textures",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean & simple",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    fallback: "/style-previews/minimalist.jpg",
    prompt: "minimalist clean portrait, pure white background, elegant understated, soft even lighting, modern professional photography",
  },
  {
    id: "grunge",
    name: "Grunge",
    description: "90s rock and roll",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop",
    fallback: "/style-previews/grunge.jpg",
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
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());
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

      // Deduct credit
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

        {/* Ad placement - below header */}
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
              const hasError = imgErrors.has(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={
                    "relative rounded-xl overflow-hidden aspect-square transition-all " +
                    (style === s.id
                      ? "ring-4 ring-purple-500 scale-95"
                      : "hover:scale-95 opacity-70 hover:opacity-100")
                  }
                >
                  {!hasError && (
                    <img
                      src={s.image}
                      alt={s.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={() => setImgErrors(prev => new Set(prev).add(s.id))}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-purple-900/50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold text-white/90 text-center px-2">
                      {s.name}
                    </div>
                  </div>
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
                      ? "bg-amber-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700")
                  }
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center mb-12">
          <button
            onClick={handleGenerate}
            disabled={generating || (!photo || !style)}
            className={
              "px-12 py-4 rounded-xl font-semibold text-lg transition-all " +
              (generating || !photo || !style
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:scale-105 shadow-lg shadow-purple-500/50")
            }
          >
            {generating ? "Generating..." : "Generate Image"}
          </button>
          {(!photo || !style) && (
            <p className="text-gray-500 text-sm mt-2">
              {!photo && !style ? "Upload a photo and choose a style" : !photo ? "Upload a photo first" : "Choose a style"}
            </p>
          )}
        </div>

        {/* Ad placement - bottom of page */}
        <AdSenseAd />
      </div>
    </div>
  );
}
