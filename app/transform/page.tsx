"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/lib/AuthContext";
import { getSupabaseClient } from "@/lib/supabase";
import AdSenseAd from "@/components/AdSenseAd";

// Local images are in /style-previews/*.jpg (copied from user reference photos).
// Styles without a confirmed photo use a CSS gradient + emoji so the card is still meaningful.
const STYLE_BACKGROUNDS: Record<string, { gradient: string; emoji: string }> = {
  linkedin:        { gradient: "linear-gradient(135deg, #0077B5 0%, #00A0DC 100%)",      emoji: "💼" },
  "alt-goth":      { gradient: "linear-gradient(135deg, #1a0011 0%, #4a0000 60%, #0a0a0a 100%)", emoji: "🖤" },
  anime:           { gradient: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 40%, #a18cd1 100%)", emoji: "✨" },
  fairycore:       { gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 30%, #a8e0a0 100%)", emoji: "🧚" },
  cyberpunk:       { gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 100%)", emoji: "" },
  cottagecore:     { gradient: "linear-gradient(135deg, #6a994e 0%, #a7c957 50%, #faedcd 100%)", emoji: "🌸" },
  "indie-sleaze":  { gradient: "linear-gradient(135deg, #ee9ca7 0%, #ffdde1 40%, #2b2b2b 100%)", emoji: "" },
  "dark-academia": { gradient: "linear-gradient(135deg, #3e2723 0%, #5d4037 50%, #b8860b 100%)", emoji: "📚" },
  vaporwave:       { gradient: "linear-gradient(135deg, #7b2ff7 0%, #f107a3 50%, #00d2ff 100%)", emoji: "💾" },
  maximalist:      { gradient: "linear-gradient(135deg, #f5af19 0%, #f12711 30%, #c471ed 60%, #12c2e9 100%)", emoji: "🌈" },
  minimalist:      { gradient: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 50%, #f5f5f5 100%)", emoji: "" },
  grunge:          { gradient: "linear-gradient(135deg, #434343 0%, #2c2c2c 40%, #ff4757 100%)", emoji: "🎭" },
};

// Image filename in /style-previews/ — leave undefined to show gradient+emoji fallback
const STYLE_IMAGE: Record<string, string | undefined> = {
  linkedin:   "linkedin.jpg",
  "alt-goth": "goth.jpg",
  fairycore:  "fairycore.jpg",
  cyberpunk:  "cyberpunk.jpg",
  cottagecore:"cottagecore.jpg",
  // anime, indie-sleaze, dark-academia, vaporwave, maximalist, minimalist, grunge
  // => gradient fallback until a reference photo is provided
};

const STYLES = [
  { id: "linkedin",      name: "LinkedIn Profile", description: "Professional headshot",
    prompt: "professional LinkedIn profile headshot, corporate portrait, clean neutral background, soft studio lighting, business attire" },
  { id: "alt-goth",      name: "Alt / Goth",      description: "Dark alternative style",
    prompt: "gothic alternative portrait, dark aesthetic, moody lighting, edgy style, dramatic shadows" },
  { id: "anime",         name: "Anime",           description: "Japanese animation style",
    prompt: "anime portrait style, Japanese animation aesthetic, vibrant colors, cel shading, manga inspired" },
  { id: "fairycore",     name: "Fairycore",       description: "Whimsical fairy aesthetic",
    prompt: "fairycore portrait, whimsical fairy aesthetic, soft pastel colors, dreamy ethereal glow, magical sparkle" },
  { id: "cyberpunk",     name: "Cyberpunk",       description: "Futuristic neon style",
    prompt: "cyberpunk portrait, neon-lit futuristic style, vibrant pink and cyan neon, dark urban background, sci-fi aesthetic" },
  { id: "cottagecore",   name: "Cottagecore",     description: "Rural pastoral charm",
    prompt: "cottagecore portrait, rustic rural aesthetic, soft natural lighting, vintage countryside charm, pastoral setting" },
  { id: "indie-sleaze",  name: "Indie Sleaze",    description: "2000s indie rock vibe",
    prompt: "indie sleaze portrait, 2000s indie rock aesthetic, grainy film filter, flash photography, downtown party vibe" },
  { id: "dark-academia", name: "Dark Academia",   description: "Literary intellectual",
    prompt: "dark academia portrait, literary aesthetic, moody scholarly atmosphere, warm vintage tones, classical intellectual vibe" },
  { id: "vaporwave",     name: "Vaporwave",       description: "80s retro aesthetic",
    prompt: "vaporwave portrait, 80s retro aesthetic, pastel pink and purple gradient, glitch effects, nostalgic digital art" },
  { id: "maximalist",    name: "Maximalist",      description: "Bold & vibrant",
    prompt: "maximalist portrait, bold patterns, vibrant colors, artistic editorial photography, colorful statement fashion, layered textures" },
  { id: "minimalist",    name: "Minimalist",      description: "Clean & simple",
    prompt: "minimalist clean portrait, pure white background, elegant understated, soft even lighting, modern professional photography" },
  { id: "grunge",        name: "Grunge",          description: "90s rock and roll",
    prompt: "grunge portrait, 90s rock and roll aesthetic, edgy texture, dark moody lighting, alternative rebellion" },
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
              const bg = STYLE_BACKGROUNDS[s.id] || STYLE_BACKGROUNDS.minimalist;
              const imgFilename = STYLE_IMAGE[s.id];
              const isSelected = style === s.id;
              const imgSrc = imgFilename ? `/style-previews/${imgFilename}` : null;

              return (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={
                    "relative rounded-xl overflow-hidden aspect-square transition-all " +
                    (isSelected
                      ? "ring-4 ring-purple-500 scale-95"
                      : "hover:scale-95 opacity-70 hover:opacity-100")
                  }
                >
                  {/* CSS gradient background (always visible behind image) */}
                  <div
                    className="absolute inset-0"
                    style={{ background: bg.gradient }}
                  />
                  {/* Local photo overlay if we have one */}
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt={s.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  {/* Gradient scrim so text is always readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {/* Emoji badge (always visible — gives a visual cue even with a photo) */}
                  <div className="absolute top-2 right-2 text-2xl">{bg.emoji}</div>
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

        {/* Ad placement - bottom */}
        <AdSenseAd />
      </div>
    </div>
  );
}
