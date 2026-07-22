"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { getSupabaseClient } from "@/lib/supabase";
import ImageGrid from "@/components/ImageGrid";
import AdSenseAd from "@/components/AdSenseAd";
import GenerateGuard from "@/components/GenerateGuard";

const STYLES = [
  {
    id: "linkedin",
    name: "LinkedIn Profile",
    description: "Professional headshot",
    image: "/style-previews/linkedin.jpg",
    prompt: "professional LinkedIn profile headshot, corporate portrait, clean neutral background, soft studio lighting, business attire",
  },
  {
    id: "alt-goth",
    name: "Alt / Goth",
    description: "Dark alternative style",
    image: "/style-previews/goth.jpg",
    prompt: "gothic alternative portrait, dark aesthetic, moody lighting, edgy style, dramatic shadows",
  },
  {
    id: "anime",
    name: "Anime",
    description: "Japanese animation style",
    image: "/style-previews/anime.jpg",
    prompt: "anime portrait style, Japanese animation aesthetic, vibrant colors, cel shading, manga inspired",
  },
  {
    id: "fairycore",
    name: "Fairycore",
    description: "Whimsical fairy aesthetic",
    image: "/style-previews/fairycore.jpg",
    prompt: "fairycore portrait, whimsical fairy aesthetic, soft pastel colors, dreamy ethereal glow, magical sparkle",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Futuristic neon style",
    image: "/style-previews/cyberpunk.jpg",
    prompt: "cyberpunk portrait, neon-lit futuristic style, vibrant pink and cyan neon, dark urban background, sci-fi aesthetic",
  },
  {
    id: "cottagecore",
    name: "Cottagecore",
    description: "Rural pastoral charm",
    image: "/style-previews/cottagecore.jpg",
    prompt: "cottagecore portrait, rustic rural aesthetic, soft natural lighting, vintage countryside charm, pastoral setting",
  },
  {
    id: "indie-sleaze",
    name: "Indie Sleaze",
    description: "2000s indie rock vibe",
    image: "/style-previews/indie-sleaze.jpg",
    prompt: "indie sleaze portrait, 2000s indie rock aesthetic, grainy film filter, flash photography, downtown party vibe",
  },
  {
    id: "dark-academia",
    name: "Dark Academia",
    description: "Literary intellectual",
    image: "/style-previews/dark-academia.jpg",
    prompt: "dark academia portrait, literary aesthetic, moody scholarly atmosphere, warm vintage tones, classical intellectual vibe",
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    description: "80s retro aesthetic",
    image: "/style-previews/vaporwave.jpg",
    prompt: "vaporwave portrait, 80s retro aesthetic, pastel pink and purple gradient, glitch effects, nostalgic digital art",
  },
  {
    id: "maximalist",
    name: "Maximalist",
    description: "Bold & vibrant",
    image: "/style-previews/maximalist.jpg",
    prompt: "maximalist portrait, bold patterns, vibrant colors, artistic editorial photography, colorful statement fashion, layered textures",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Clean & simple",
    image: "/style-previews/minimalist.jpg",
    prompt: "minimalist clean portrait, pure white background, elegant understated, soft even lighting, modern professional photography",
  },
  {
    id: "grunge",
    name: "Grunge",
    description: "90s rock and roll",
    image: "/style-previews/grunge.jpg",
    prompt: "grunge portrait, 90s rock and roll aesthetic, edgy texture, dark moody lighting, alternative rebellion",
  },
];

const VIBES = ["soft", "moody", "vibrant", "natural"];
const PALETTES = ["warm", "cool", "neutral", "bold"];

let generationCounter = 0;

export default function TransformPage() {
  const { user, credits, useCredit } = useAuth();
  const [photo, setPhoto] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [gender, setGender] = useState("female");
  const [vibe, setVibe] = useState("soft");
  const [palette, setPalette] = useState("warm");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [galleryKey, setGalleryKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async (openSignIn: () => void) => {
    if (!photo || !style) {
      setError("Please upload a photo and select a style");
      return;
    }
    if (!user) {
      openSignIn();
      return;
    }

    setGenerating(true);
    setError("");
    setResultUrl(null);
    setSaveSuccess(false);

    try {
      const selectedStyle = STYLES.find((s) => s.id === style);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: photo,
          style,
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

      const imageUrl = data.imageUrl || data.url;
      setResultUrl(imageUrl || null);

      if (imageUrl && user) {
        try {
          const db = getSupabaseClient();
          await (db.from("generations") as any).insert({
            user_id: user.id,
            style,
            gender,
            vibe,
            palette,
            image_url: imageUrl,
          });
          setGalleryKey((k) => k + 1);
        } catch (dbErr) {
          console.error("Failed to save generation to DB:", dbErr);
        }
      }

      await useCredit();
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
          You have <span className="text-purple-400 font-semibold">{credits}</span> free credit
          {credits !== 1 ? "s" : ""} remaining today
        </p>

        <AdSenseAd />

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300">
            {error}
          </div>
        )}

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

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">2. Choose a Style</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`group relative rounded-xl overflow-hidden transition-all aspect-square ${
                  style === s.id
                    ? "ring-4 ring-purple-500 scale-[1.02]"
                    : "ring-1 ring-white/10 hover:ring-purple-400/50"
                }`}
              >
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-white font-semibold text-sm">{s.name}</div>
                  <div className="text-gray-300 text-xs">{s.description}</div>
                </div>
                {style === s.id && (
                  <div className="absolute top-2 right-2 bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">3. Fine-Tune (optional)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Gender</label>
              <div className="flex gap-2">
                {["female", "male"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`px-4 py-2 rounded-lg text-sm capitalize transition-all ${
                      gender === g
                        ? "bg-purple-500 text-white"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Vibe</label>
              <div className="flex flex-wrap gap-2">
                {VIBES.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVibe(v)}
                    className={`px-3 py-2 rounded-lg text-sm capitalize transition-all ${
                      vibe === v
                        ? "bg-purple-500 text-white"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Palette</label>
              <div className="flex flex-wrap gap-2">
                {PALETTES.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPalette(p)}
                    className={`px-3 py-2 rounded-lg text-sm capitalize transition-all ${
                      palette === p
                        ? "bg-purple-500 text-white"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <GenerateGuard>
          {(openSignIn) => (
            <div className="text-center mb-12">
              <button
                onClick={() => handleGenerate(openSignIn)}
                disabled={generating || !photo || !style}
                className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition-all transform hover:scale-105"
              >
                {generating ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  "✨ Generate PFP"
                )}
              </button>
              <p className="text-gray-500 text-sm mt-3">
                Uses AI (Replicate PhotoMaker V2) • 1 credit per generation
              </p>
            </div>
          )}
        </GenerateGuard>

        {/* Result */}
        {resultUrl && (
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold mb-4">Your New PFP</h2>
            <img
              src={resultUrl}
              alt="Generated PFP"
              className="max-w-md mx-auto rounded-xl shadow-2xl mb-4"
            />
            <div className="flex justify-center gap-4">
              <a
                href={resultUrl}
                download
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-all"
              >
                Download
              </a>
              <button
                onClick={() => {
                  setResultUrl(null);
                  setPhoto(null);
                  setStyle(null);
                }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-all"
              >
                Generate Another
              </button>
            </div>
          </div>
        )}

        {/* User's Generation Gallery */}
        {user && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Your Gallery</h2>
            <ImageGrid key={galleryKey} userId={user.id} />
          </div>
        )}

        <AdSenseAd />
      </div>
    </div>
  );
}
