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
    image: "https://source.unsplash.com/400x400/?professional,headshot,business",
    prompt: "professional LinkedIn profile headshot, corporate portrait, clean neutral background, soft studio lighting, business attire",
  },
  {
    id: "alt-goth",
    name: "Alt / Goth",
    description: "Dark alternative style",
    image: "https://source.unsplash.com/400x400/?gothic,dark,alternative",
    prompt: "gothic alternative portrait, dark aesthetic, moody lighting, edgy style, dramatic shadows",
  },
  {
    id: "anime",
    name: "Anime",
    description: "Japanese animation style",
    image: "https://source.unsplash.com/400x400/?anime,manga,japanese",
    prompt: "anime portrait style, Japanese animation aesthetic, vibrant colors, cel shading, manga inspired",
  },
  {
    id: "fairycore",
    name: "Fairycore",
    description: "Whimsical fairy aesthetic",
    image: "https://source.unsplash.com/400x400/?fairy,ethereal,magical",
    prompt: "fairycore portrait, whimsical fairy aesthetic, soft pastel colors, dreamy ethereal glow, magical sparkle",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Futuristic neon style",
    image: "https://source.unsplash.com/400x400/?cyberpunk,neon,futuristic",
    prompt: "cyberpunk portrait, neon-lit futuristic style, vibrant pink and cyan neon, dark urban background, sci-fi aesthetic",
  },
  {
    id: "cottagecore",
    name: "Cottagecore",
    description: "Rural pastoral charm",
    image: "https://source.unsplash.com/400x400/?cottagecore,vintage,rural",
    prompt: "cottagecore portrait, rustic rural aesthetic, soft natural lighting, vintage countryside charm, pastoral setting",
  },
  {
    id: "indie-sleaze",
    name: "Indie Sleaze",
    description: "2000s indie rock vibe",
    image: "https://source.unsplash.com/400x400/?indie,grunge,2000s",
    prompt: "indie sleaze portrait, 2000s indie rock aesthetic, grainy film filter, flash photography, downtown party vibe",
  },
  {
    id: "dark-academia",
    name: "Dark Academia",
    description: "Literary intellectual",
    image: "https://source.unsplash.com/400x400/?dark-academia,books,intellectual",
    prompt: "dark academia portrait, literary aesthetic, moody scholarly atmosphere, warm vintage tones, classical intellectual vibe",
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    description: "80s retro aesthetic",
    image: "https://source.unsplash.com/400x400/?vaporwave,retro,80s",
    prompt: "vaporwave portrait, 80s retro aesthetic, pastel pink and purple gradient, glitch effects, nostalgic digital art",
  },
  {
    id: "maximalist",
    name: "Maximalist",
    description: "Bold & vibrant",
    image: "https://source.unsplash.com/400x400/?maximalist,colorful,bold",
    prompt: "maximalist portrait, bold patterns, vibrant colors, artistic editorial photography, colorful statement fashion, layered textures",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean & simple",
    image: "https://source.unsplash.com/400x400/?minimalist,clean,simple",
    prompt: "minimalist clean portrait, pure white background, elegant understated, soft even lighting, modern professional photography",
  },
  {
    id: "grunge",
    name: "Grunge",
    description: "90s rock and roll",
    image: "https://source.unsplash.com/400x400/?grunge,90s,rock",
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
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`relative rounded-xl overflow-hidden aspect-square transition-all ${
                  style === s.id
                    ? "ring-4 ring-purple-500 scale-105"
                    : "ring-1 ring-gray-700 hover:ring-gray-500"
                }`}
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-white font-semibold text-left">{s.name}</div>
                  <div className="text-gray-300 text-xs text-left">{s.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="mb-12 grid md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">3. Gender</h2>
            <div className="flex gap-3">
              {["female", "male", "neutral"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 py-3 rounded-lg transition-all ${
                    gender === g
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">4. Vibe</h2>
            <div className="grid grid-cols-2 gap-2">
              {VIBES.map((v) => (
                <button
                  key={v}
                  onClick={() => setVibe(v)}
                  className={`py-2 rounded-lg transition-all ${
                    vibe === v
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">5. Palette</h2>
            <div className="grid grid-cols-2 gap-2">
              {PALETTES.map((p) => (
                <button
                  key={p}
                  onClick={() => setPalette(p)}
                  className={`py-2 rounded-lg transition-all ${
                    palette === p
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center">
          <button
            onClick={handleGenerate}
            disabled={!photo || !style || generating}
            className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xl rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
}
