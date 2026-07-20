"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import Header from "@/components/Header";
import PhotoUploader from "@/components/PhotoUploader";
import TransformResults from "@/components/TransformResults";
import AuthModal from "@/components/AuthModal";
import { STYLES } from "@/lib/constants";

export default function TransformPage() {
  const { user } = useAuth();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("male");
  const [selectedVibe, setSelectedVibe] = useState<string>("neutral");
  const [selectedPalette, setSelectedPalette] = useState<string>("natural");
  const [transformed, setTransformed] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    if (!uploadedImage || !selectedStyle) {
      setErrorMessage("Please upload an image and select a style");
      return;
    }

    setProcessing(true);
    setErrorMessage(null);
    setTransformed(false);
    setGeneratedImageUrl(null);

    try {
      const response = await fetch("/api/generate", {
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

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Generation failed");
      }

      const data = await response.json();
      setGeneratedImageUrl(data.imageUrl);
      setTransformed(true);
    } catch (error) {
      console.error("Generation error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setTransformed(false);
    setGeneratedImageUrl(null);
    setErrorMessage(null);
    setSelectedStyle("");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-purple-950 via-black to-purple-950 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black gradient-text mb-4">
              Transform Your Photo
            </h1>
            <p className="text-xl text-gray-300">
              Upload your photo and AI will reimagine it in any aesthetic style
            </p>
          </div>

          {errorMessage && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-300">
              {errorMessage}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left side: Upload */}
            <div className="space-y-6">
              <PhotoUploader
                image={uploadedImage}
                setImage={setUploadedImage}
              />

              {uploadedImage && (
                <>
                  {/* Style Selection */}
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">
                      Choose Your Style
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {STYLES.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setSelectedStyle(style.id)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            selectedStyle === style.id
                              ? "border-purple-500 bg-purple-500/20"
                              : "border-gray-700 bg-gray-900/50 hover:border-gray-600"
                          }`}
                        >
                          <div className="text-3xl mb-2">{style.emoji}</div>
                          <div className="text-sm font-semibold text-white">
                            {style.name}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <h2 className="text-lg font-bold text-white mb-3">
                      Gender (optional)
                    </h2>
                    <div className="grid grid-cols-3 gap-2">
                      {["male", "female", "neutral"].map((g) => (
                        <button
                          key={g}
                          onClick={() => setSelectedGender(g)}
                          className={`p-3 rounded-lg border-2 transition-all capitalize ${
                            selectedGender === g
                              ? "border-purple-500 bg-purple-500/20"
                              : "border-gray-700 bg-gray-900/50 hover:border-gray-600"
                          }`}
                        >
                          <span className="text-white font-medium">{g}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vibe */}
                  <div>
                    <h2 className="text-lg font-bold text-white mb-3">
                      Vibe (optional)
                    </h2>
                    <div className="grid grid-cols-3 gap-2">
                      {["neutral", "dreamy", "dark", "vibrant", "minimal", "bold"].map((v) => (
                        <button
                          key={v}
                          onClick={() => setSelectedVibe(v)}
                          className={`p-3 rounded-lg border-2 transition-all capitalize ${
                            selectedVibe === v
                              ? "border-purple-500 bg-purple-500/20"
                              : "border-gray-700 bg-gray-900/50 hover:border-gray-600"
                          }`}
                        >
                          <span className="text-white font-medium">{v}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Palette */}
                  <div>
                    <h2 className="text-lg font-bold text-white mb-3">
                      Palette (optional)
                    </h2>
                    <div className="grid grid-cols-3 gap-2">
                      {["natural", "warm", "cool", "pastel", "vivid", "monochrome"].map((p) => (
                        <button
                          key={p}
                          onClick={() => setSelectedPalette(p)}
                          className={`p-3 rounded-lg border-2 transition-all capitalize ${
                            selectedPalette === p
                              ? "border-purple-500 bg-purple-500/20"
                              : "border-gray-700 bg-gray-900/50 hover:border-gray-600"
                          }`}
                        >
                          <span className="text-white font-medium">{p}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={handleGenerate}
                    disabled={processing || !selectedStyle}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {processing ? "Generating..." : "✨ Generate Image (1 credit)"}
                  </button>
                </>
              )}
            </div>

            {/* Right side: Results */}
            <div>
              <TransformResults
                originalImage={uploadedImage}
                transformedImage={generatedImageUrl}
                selectedStyle={selectedStyle}
                transformed={transformed}
                processing={processing}
                onReset={handleReset}
              />
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode="signup"
        onSwitchMode={() => {}}
      />

      {creditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-gray-900 p-8 rounded-lg max-w-md border border-purple-500/50">
            <h2 className="text-2xl font-bold text-white mb-4">Buy Credits</h2>
            <p className="text-gray-300 mb-6">
              Need more generations? Purchase credit packs to continue transforming your photos.
            </p>
            <div className="space-y-3 mb-6">
              <button className="w-full p-4 bg-purple-900/50 border border-purple-500/50 rounded-lg hover:bg-purple-900/70 transition">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">5 Credits</span>
                  <span className="text-purple-300">$2.99</span>
                </div>
              </button>
              <button className="w-full p-4 bg-purple-900/50 border border-purple-500/50 rounded-lg hover:bg-purple-900/70 transition">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">15 Credits</span>
                  <span className="text-purple-300">$7.99</span>
                </div>
              </button>
              <button className="w-full p-4 bg-purple-900/50 border border-purple-500/50 rounded-lg hover:bg-purple-900/70 transition">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold">50 Credits</span>
                  <span className="text-purple-300">$19.99</span>
                </div>
              </button>
            </div>
            <button
              onClick={() => setCreditModalOpen(false)}
              className="w-full py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
