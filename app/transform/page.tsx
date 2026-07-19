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
              <p className="text-sm text-red-400 mt-1">If image generation isn&apos;t configured yet, add REPLICATE_API_TOKEN to your Vercel env vars.</p>
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
                  {STYLES.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      disabled={processing}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        selectedStyle === style.id
                          ? "border-purple-400 bg-purple-900/40 shadow-lg shadow-purple-500/20"
                          : "border-purple-900/40 hover:border-purple-700/60 bg-purple-900/5"
                      } ${processing ? "opacity-50 cursor-not-allowed" : ""}`}
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
                      disabled={processing}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        selectedGender === g.id
                          ? "border-purple-400 bg-purple-900/40 shadow-lg shadow-purple-500/20"
                          : "border-purple-900/40 hover:border-purple-700/60 bg-purple-900/5"
                      } ${processing ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <div className="text-2xl mb-1">{g.emoji}</div>
                      <div className="text-white font-medium text-sm">{g.name}</div>
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
                      disabled={processing}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        selectedVibe === v.id
                          ? "border-purple-400 bg-purple-900/40 shadow-lg shadow-purple-500/20"
                          : "border-purple-900/40 hover:border-purple-700/60 bg-purple-900/5"
                      } ${processing ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <div className="text-2xl mb-1">{v.emoji}</div>
                      <div className="text-white font-medium text-sm">{v.name}</div>
                    </button>
                  ))}
                </div>
              </section>

              {/* STEP 4: COLOUR PALETTE */}
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
                      disabled={processing}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        selectedPalette === p.id
                          ? "border-purple-400 bg-purple-900/40 shadow-lg shadow-purple-500/20"
                          : "border-purple-900/40 hover:border-purple-700/60 bg-purple-900/5"
                      } ${processing ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <div className={`w-8 h-8 rounded-full mx-auto mb-2 bg-gradient-to-r ${p.swatch}`} />
                      <div className="text-white font-medium text-sm">{p.name}</div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Your Recipe summary */}
              {(selectedStyle || selectedGender || selectedVibe || selectedPalette) && (
                <section className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Your Recipe</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStyle && (
                      <span className="px-3 py-1 bg-purple-600/30 border border-purple-600/40 rounded-full text-sm text-purple-200">
                        {STYLES.find(s => s.id === selectedStyle)?.emoji} {STYLES.find(s => s.id === selectedStyle)?.name}
                      </span>
                    )}
                    {selectedGender && (
                      <span className="px-3 py-1 bg-purple-600/30 border border-purple-600/40 rounded-full text-sm text-purple-200">
                        {GENDERS.find(g => g.id === selectedGender)?.emoji} {GENDERS.find(g => g.id === selectedGender)?.name}
                      </span>
                    )}
                    {selectedVibe && (
                      <span className="px-3 py-1 bg-purple-600/30 border border-purple-600/40 rounded-full text-sm text-purple-200">
                        {VIBES.find(v => v.id === selectedVibe)?.emoji} {VIBES.find(v => v.id === selectedVibe)?.name}
                      </span>
                    )}
                    {selectedPalette && (
                      <span className="px-3 py-1 bg-purple-600/30 border border-purple-600/40 rounded-full text-sm text-purple-200">
                        {PALETTES.find(p => p.id === selectedPalette)?.emoji} {PALETTES.find(p => p.id === selectedPalette)?.name}
                      </span>
                    )}
                  </div>
                </section>
              )}

              {/* GENERATE BUTTON */}
              <button
                onClick={handleGenerate}
                disabled={!selectionsComplete || processing}
                className={`w-full py-5 rounded-2xl text-xl font-bold transition-all duration-300 ${
                  selectionsComplete && !processing
                    ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                {processing ? "✨ Generating..." : "✨ Generate Masterpiece ✨"}
              </button>

              {/* Step 5 is implicit - Generate button */}
              <p className="text-center text-sm text-gray-500">
                Costs 1 credit • Results appear in about 10-15 seconds
              </p>
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

      {/* Credit Modal */}
      {creditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0010] border border-purple-900/30 rounded-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setCreditModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Out of Credits</h2>
              <p className="text-gray-400">Your free daily credit will reset tomorrow. Upgrade for more!</p>
            </div>
            <a
              href="/checkout"
              className="block w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition"
            >
              Get Credits
            </a>
          </div>
        </div>
      )}
    </>
  );
}
