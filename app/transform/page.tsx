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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face", // Professional man
    prompt: "professional LinkedIn profile headshot, corporate portrait, clean neutral background, soft studio lighting, business attire",
  },
  {
    id: "alt-goth",
    name: "Alt / Goth",
    description: "Dark alternative style",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face", // Edgy woman
    prompt: "gothic alternative portrait, dark aesthetic, moody lighting, edgy style, dramatic shadows",
  },
  {
    id: "anime",
    name: "Anime",
    description: "Japanese animation style",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop", // Anime illustration
    prompt: "anime portrait style, Japanese animation aesthetic, vibrant colors, cel shading, manga inspired",
  },
  {
    id: "fairycore",
    name: "Fairycore",
    description: "Whimsical fairy aesthetic",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face", // Ethereal woman
    prompt: "fairycore portrait, whimsical fairy aesthetic, soft pastel colors, dreamy ethereal glow, magical sparkle",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Futuristic neon style",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face&con=120&sat=150", // High contrast portrait
    prompt: "cyberpunk portrait, neon-lit futuristic style, vibrant pink and cyan neon, dark urban background, sci-fi aesthetic",
  },
  {
    id: "cottagecore",
    name: "Cottagecore",
    description: "Rural pastoral charm",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop&crop=face&sat=50", // Soft natural portrait
    prompt: "cottagecore portrait, rustic rural aesthetic, soft natural lighting, vintage countryside charm, pastoral setting",
  },
  {
    id: "indie-sleaze",
    name: "Indie Sleaze",
    description: "2000s indie rock vibe",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face&con=110", // Grungy portrait
    prompt: "indie sleaze portrait, 2000s indie rock aesthetic, grainy film filter, flash photography, downtown party vibe",
  },
  {
    id: "dark-academia",
    name: "Dark Academia",
    description: "Literary intellectual",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face&sat=-50", // Moody portrait
    prompt: "dark academia portrait, literary aesthetic, moody scholarly atmosphere, warm vintage tones, classical intellectual vibe",
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    description: "80s retro aesthetic",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face&blend=ff6fff&blend-mode=overlay&blend-alpha=30", // Pink tinted
    prompt: "vaporwave portrait, 80s retro aesthetic, pastel pink and purple gradient, glitch effects, nostalgic digital art",
  },
  {
    id: "maximalist",
    name: "Maximalist",
    description: "Bold & vibrant",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop&crop=face&sat=150", // Vibrant colorful
    prompt: "maximalist portrait, bold patterns, vibrant colors, artistic editorial photography, colorful statement fashion, layered textures",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean & simple",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face&bg=ffffff", // Clean white background
    prompt: "minimalist clean portrait, pure white background, elegant understated, soft even lighting, modern professional photography",
  },
  {
    id: "grunge",
    name: "Grunge",
    description: "90s rock and roll",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face&con=80&sat=-30", // Desaturated grungy
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
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-lg text-gray-300">Click to upload your photo</p>
                <p className="text-sm text-gray-500 mt-2">JPG, PNG up to 10MB</p>
              </div>
            )}
          </button>
        </div>

        {/* Style Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. Choose a Style</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {STYLES.map(s => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`relative group rounded-xl overflow-hidden transition-all ${
                  style === s.id ? "ring-4 ring-purple-500 scale-105" : "ring-0"
                }`}
              >
                <img 
                  src={s.image} 
                  alt={s.name} 
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    console.error(`Failed to load image: ${s.image}`);
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-4">
                  <div className="text-left">
                    <h3 className="text-white font-semibold">{s.name}</h3>
                    <p className="text-gray-300 text-sm">{s.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Hidden fields - keeping for compatibility */}
        <div className="hidden">
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">3. Additional Options</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Gender</label>
                <select 
                  value={gender} 
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="non-binary">Non-binary</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Vibe</label>
                <select 
                  value={vibe} 
                  onChange={(e) => setVibe(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
                >
                  {VIBES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Palette</label>
                <select 
                  value={palette} 
                  onChange={(e) => setPalette(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
                >
                  {PALETTES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="text-center">
          <button
            onClick={handleGenerate}
            disabled={generating || !photo || !style}
            className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-xl font-semibold transition-all text-lg"
          >
            {generating ? "Generating..." : "Generate PFP"}
          </button>
        </div>

        {/* Ad placement - before results */}
        <AdSenseAd />
      </div>
    </div>
  );
}
