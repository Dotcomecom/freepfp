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
    setTimeout(() => {
      useCredit();
      setTransformed(true);
      setProcessing(false);
    }, 2000);
  };

  const handleReset = () => {
    setTransformed(false);
    setSelectedStyle(null);
    setSelectedGender(null);
    setSelectedVibe(null);
    setSelectedPalette(null);
  };

  const selectedStyleObj = STYLES.find(s => s.id === selectedStyle);
  const selectedPaletteObj = PALETTES.find(p => p.id === selectedPalette);

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: Photo + Results */}
            <div className="lg:col-span-1 space-y-6">
              <PhotoUploader onImageUpload={(img) => setUploadedImage(img)} />
              <TransformResults transformed={transformed} selectedStyle={selectedStyle || ""} />
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
                  {STYLES.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        selectedStyle === style.id
                          ? "border-purple-400 bg-purple-900/40 shadow-lg shadow-purple-500/20"
                          : "border-purple-900/40 hover:border-purple-700/60 bg-purple-900/5"
                      }`}
                    >
                      <div className="text-3xl mb-1">{style.emoji}</div>
                      <div className="text-white font-medium text-sm">{style.name}</div>
                    </button>
                  ))}
                </div>
              </section>

              {/* STEP 2: GENDER */}
              <section className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center text-sm">2</div>
                  <h2 className="text-2xl font-bold text-white">Gender</h2>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {GENDERS.map(g => (
                    <button
                      key={g.id}
                      onClick={() => setSelectedGender(g.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedGender === g.id
                          ? "border-purple-400 bg-purple-900/40 shadow-lg shadow-purple-500/20"
                          : "border-purple-900/40 hover:border-purple-700/60 bg-purple-900/5"
                      }`}
                    >
                      <div className="text-3xl mb-1">{g.emoji}</div>
                      <div className="text-white font-medium">{g.name}</div>
                    </button>
                  ))}
                </div>
              </section>

              {/* STEP 3: VIBE */}
              <section className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center text-sm">3</div>
                  <h2 className="text-2xl font-bold text-white">Vibe</h2>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {VIBES.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVibe(v.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedVibe === v.id
                          ? "border-purple-400 bg-purple-900/40 shadow-lg shadow-purple-500/20"
                          : "border-purple-900/40 hover:border-purple-700/60 bg-purple-900/5"
                      }`}
                    >
                      <div className="text-3xl mb-1">{v.emoji}</div>
                      <div className="text-white font-medium">{v.name}</div>
                    </button>
                  ))}
                </div>
              </section>

              {/* STEP 4: COLOR PALETTE */}
              <section className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold flex items-center justify-center text-sm">4</div>
                  <h2 className="text-2xl font-bold text-white">Colour Palette</h2>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {PALETTES.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPalette(p.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedPalette === p.id
                          ? "border-purple-400 bg-purple-900/40 shadow-lg shadow-purple-500/20"
                          : "border-purple-900/40 hover:border-purple-700/60 bg-purple-900/5"
                      }`}
                    >
                      <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${p.swatch} mb-2`}></div>
                      <div className="text-white font-medium text-sm">{p.name}</div>
                    </button>
                  ))}
                </div>
              </section>

              {/* SUMMARY + GENERATE */}
              <section className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/40 rounded-2xl p-6">
                <div className="text-center mb-4">
                  <p className="text-gray-300 text-sm uppercase tracking-wider mb-2">Your Recipe</p>
                  <div className="flex flex-wrap gap-2 justify-center min-h-[28px]">
                    {selectedStyleObj && <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-sm text-white">{selectedStyleObj.emoji} {selectedStyleObj.name}</span>}
                    {selectedGender && <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-sm text-white">{GENDERS.find(g => g.id === selectedGender)?.emoji} {GENDERS.find(g => g.id === selectedGender)?.name}</span>}
                    {selectedVibe && <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-sm text-white">{VIBES.find(v => v.id === selectedVibe)?.emoji} {VIBES.find(v => v.id === selectedVibe)?.name}</span>}
                    {selectedPaletteObj && <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-sm text-white">{selectedPaletteObj.emoji} {selectedPaletteObj.name}</span>}
                    {!selectedStyleObj && !selectedGender && !selectedVibe && !selectedPaletteObj && (
                      <span className="text-gray-500 text-sm italic">Pick your options above...</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!selectionsComplete || processing}
                  className="w-full py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white rounded-xl font-bold text-xl tracking-wide hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-pink-500/20 disabled:shadow-none"
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                      </svg>
                      Generating your masterpiece...
                    </span>
                  ) : (
                    <>✨ Generate Masterpiece ✨</>
                  )}
                </button>

                {!selectionsComplete && (
                  <p className="text-center text-gray-500 text-xs mt-3">
                    Upload a photo and pick all 4 options to unlock
                  </p>
                )}
              </section>

            </div>
          </div>
        </div>

        {/* Auth modal */}
        {authModalOpen && (
          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            mode="signup"
            onSwitchMode={() => {}}
          />
        )}

        {/* Credit modal */}
        {creditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0a0010] border border-purple-900/30 rounded-2xl max-w-md w-full p-8 relative">
              <button
                onClick={() => setCreditModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mx-auto mb-4"></div>
                <h2 className="text-2xl font-bold text-white mb-2">Out of Credits</h2>
                <p className="text-gray-400 mb-6">You've used your free daily credit. Pick up a pack to keep creating.</p>
                <a
                  href="/checkout"
                  className="block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition"
                >
                  Get More Credits
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
