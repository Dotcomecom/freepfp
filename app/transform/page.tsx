"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import Header from "@/components/Header";
import PhotoUploader from "@/components/PhotoUploader";
import TransformResults from "@/components/TransformResults";
import AuthModal from "@/components/AuthModal";

const STYLES = [
  { id: "linkedin", name: "LinkedIn Profile", emoji: "💼" },
  { id: "alt-goth", name: "Alt / Goth", emoji: "🖤" },
  { id: "anime", name: "Anime", emoji: "🎌" },
  { id: "fairycore", name: "Fairycore", emoji: "🧚" },
  { id: "grunge", name: "Grunge", emoji: "🎸" },
  { id: "indie-sleaze", name: "Indie Sleaze", emoji: "🎞️" },
  { id: "cottagecore", name: "Cottagecore", emoji: "🌸" },
  { id: "cyberpunk", name: "Cyberpunk", emoji: "🤖" },
  { id: "dark-academia", name: "Dark Academia", emoji: "📚" },
  { id: "maximalist", name: "Maximalist", emoji: "🎭" },
  { id: "minimalist", name: "Minimalist", emoji: "◽" },
  { id: "vaporwave", name: "Vaporwave", emoji: "🌴" },
];

const GENDERS = [
  { id: "male", name: "Male", emoji: "♂" },
  { id: "female", name: "Female", emoji: "♀" },
  { id: "neutral", name: "Neutral", emoji: "✦" },
];

const VIBES = [
  { id: "dreamy", name: "Dreamy", emoji: "💭" },
  { id: "edgy", name: "Edgy", emoji: "⚡" },
  { id: "soft", name: "Soft", emoji: "🌷" },
  { id: "bold", name: "Bold", emoji: "🔥" },
  { id: "mysterious", name: "Mysterious", emoji: "🌙" },
  { id: "playful", name: "Playful", emoji: "🎈" },
];

const PALETTES = [
  { id: "warm", name: "Warm", emoji: "🔆", swatch: "from-orange-400 to-red-500" },
  { id: "cool", name: "Cool", emoji: "❄️", swatch: "from-cyan-400 to-blue-500" },
  { id: "pastel", name: "Pastel", emoji: "🎀", swatch: "from-pink-200 to-purple-200" },
  { id: "vibrant", name: "Vibrant", emoji: "🌈", swatch: "from-fuchsia-500 to-yellow-400" },
  { id: "monochrome", name: "Monochrome", emoji: "⚪", swatch: "from-gray-300 to-gray-600" },
  { id: "neon", name: "Neon", emoji: "💫", swatch: "from-green-400 to-pink-500" },
];

export default function TransformPage() {
  const { user, credits, useCredit } = useAuth();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null);
  const [selectedPalette, setSelectedPalette] = useState<string | null>(null);
  const [transformed, setTransformed] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const selectionsComplete = uploadedImage && selectedStyle && selectedGender && selectedVibe && selectedPalette;

  const handleGenerate = async () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    if (credits <= 0) {
      setCreditModalOpen(true);
      return;
    }
    if (!selectionsComplete) return;

    setProcessing(true);
    setErrorMessage(null);
    setTransformed(false);
    setGeneratedImageUrl(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: uploadedImage,
          style: selectedStyle,
          gender: selectedGender,
          vibe: selectedVibe,
          palette: selectedPalette,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      // Deduct the credit
      await useCredit();

      setGeneratedImageUrl(data.imageUrl);
      setTransformed(true);
    } catch (err: any) {
      console.error("Generation error:", err);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setTransformed(false);
    setGeneratedImageUrl(null);
    setErrorMessage(null);
    setSelectedStyle(null);
    setSelectedGender(null);
    setSelectedVibe(null);
    setSelectedPalette(null);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-[#0a0015] via-[#120020] to-[#0a0015]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 gradient-text">
              Create Your Masterpiece
            </h1>
            <p className="text-lg text-gray-400">
              Pick your style, set the mood, and let AI do the magic ✨
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-900/40 rounded-xl text-red-300 text-center">
              <p className="font-medium">{errorMessage}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: Photo + Results */}
            <div className="lg:col-span-1 space-y-6">
              <PhotoUploader onImageUpload={(img) => setUploadedImage(img)} />
              <TransformResults
                transformed={transformed}
                selectedStyle={selectedStyle || ""}
                imageUrl={generatedImageUrl}
                processing={processing}
              />
              {transformed && (
                <button
                  onClick={handleReset}
                  className="w-full py-3 bg-purple-900/30 border border-purple-700/50 text-gray-200 rounded-xl hover:bg-purple-900/50 transition"
                >
                  ↻ Create Another
                </button>
              )}

              {/* Credits display */}
              <div className="p-4 bg-purple-900/20 border border-purple-900/30 rounded-xl text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm font-medium text-purple-300">Credits remaining</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{credits}</div>
                <div className="text-xs text-gray-400 mb-3">
                  1 free credit resets daily
                </div>
                {credits === 0 && (
                  <a href="/checkout" className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition">
                    Get More Credits
                  </a>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Selection flow */}
            <div className="lg:col-span-2 space-y-6">

              {/* STEP 1: STYLE */}
              <section className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center text-sm">1</div>
                  <h2 className="text-2xl font-bold text-white">Choose Your Style</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {STYLES.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedStyle === style.id
                          ? "border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20"
                          : "border-purple-900/30 bg-purple-900/10 hover:border-purple-700/50 hover:bg-purple-900/20"
                      }`}
                    >
                      <span className="text-2xl mb-1 block">{style.emoji}</span>
                      <span className={`text-sm font-medium ${selectedStyle === style.id ? "text-white" : "text-gray-300"}`}>
                        {style.name}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              {/* STEP 2: GENDER */}
              <section className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center text-sm">2</div>
                  <h2 className="text-2xl font-bold text-white">Gender Presentation</h2>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {GENDERS.map((gender) => (
                    <button
                      key={gender.id}
                      onClick={() => setSelectedGender(gender.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        selectedGender === gender.id
                          ? "border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20"
                          : "border-purple-900/30 bg-purple-900/10 hover:border-purple-700/50 hover:bg-purple-900/20"
                      }`}
                    >
                      <span className="text-2xl mb-1 block">{gender.emoji}</span>
                      <span className={`text-sm font-medium ${selectedGender === gender.id ? "text-white" : "text-gray-300"}`}>
                        {gender.name}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              {/* STEP 3: VIBE */}
              <section className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center text-sm">3</div>
                  <h2 className="text-2xl font-bold text-white">Vibe Check</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {VIBES.map((vibe) => (
                    <button
                      key={vibe.id}
                      onClick={() => setSelectedVibe(vibe.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        selectedVibe === vibe.id
                          ? "border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20"
                          : "border-purple-900/30 bg-purple-900/10 hover:border-purple-700/50 hover:bg-purple-900/20"
                      }`}
                    >
                      <span className="text-2xl mb-1 block">{vibe.emoji}</span>
                      <span className={`text-sm font-medium ${selectedVibe === vibe.id ? "text-white" : "text-gray-300"}`}>
                        {vibe.name}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              {/* STEP 4: COLOR PALETTE */}
              <section className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center text-sm">4</div>
                  <h2 className="text-2xl font-bold text-white">Color Palette</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PALETTES.map((palette) => (
                    <button
                      key={palette.id}
                      onClick={() => setSelectedPalette(palette.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        selectedPalette === palette.id
                          ? "border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20"
                          : "border-purple-900/30 bg-purple-900/10 hover:border-purple-700/50 hover:bg-purple-900/20"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${palette.swatch} mx-auto mb-2`}></div>
                      <span className={`text-sm font-medium ${selectedPalette === palette.id ? "text-white" : "text-gray-300"}`}>
                        {palette.name}
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              {/* GENERATE BUTTON */}
              <button
                onClick={handleGenerate}
                disabled={!selectionsComplete || processing}
                className={`w-full py-5 rounded-2xl text-xl font-bold transition-all ${
                  selectionsComplete && !processing
                    ? "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Magic...
                  </span>
                ) : selectionsComplete ? (
                  "✨ Generate My PFP"
                ) : (
                  "Complete All Steps to Generate"
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode="signup"
        onSwitchMode={() => {}}
      />
      {creditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1a0030] border border-purple-900/50 rounded-2xl p-8 max-w-md text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-white mb-2">No Credits Left</h3>
            <p className="text-gray-400 mb-6">You&apos;ve used your free credit for today. Purchase more to keep creating!</p>
            <div className="flex gap-3">
              <button onClick={() => setCreditModalOpen(false)} className="flex-1 py-3 border border-purple-700/50 text-gray-300 rounded-xl hover:bg-purple-900/30 transition">
                Cancel
              </button>
              <a href="/checkout" className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition">
                Get Credits
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
