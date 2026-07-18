"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import Header from "@/components/Header";
import PhotoUploader from "@/components/PhotoUploader";
import StyleSelector from "@/components/StyleSelector";
import TransformResults from "@/components/TransformResults";
import AuthModal from "@/components/AuthModal";

export default function TransformPage() {
  const { user, credits, useCredit } = useAuth();
  const [selectedStyle, setSelectedStyle] = useState<string>("professional");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [transformed, setTransformed] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleTransform = async () => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    if (credits <= 0) {
      setCreditModalOpen(true);
      return;
    }

    if (!uploadedImage) {
      alert("Please upload a photo first");
      return;
    }

    setProcessing(true);

    // Simulate transformation (in production, this would call your AI API)
    setTimeout(() => {
      // Deduct credit
      useCredit();
      setTransformed(true);
      setProcessing(false);
    }, 2000);
  };

  if (!user) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-20 pb-12">
          <div className="container mx-auto px-6 max-w-2xl">
            <div className="text-center mt-20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-6"></div>
              <h1 className="text-4xl font-bold mb-4 gradient-text">
                Transform Your Photo
              </h1>
              <p className="text-xl text-gray-400 mb-2">
                Create stunning AI-generated profile pictures
              </p>
              <p className="text-gray-500 mb-8">
                Sign up to get 1 free transformation per day
              </p>

              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition text-lg"
              >
                Sign Up Free
              </button>

              <div className="mt-12 bg-purple-900/10 border border-purple-900/30 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4 text-white">How It Works</h2>
                <div className="text-left space-y-3 text-gray-300">
                  <div className="flex items-start">
                    <span className="text-purple-400 mr-3 font-bold">1.</span>
                    <span>Sign up with your email (1 free transformation per day)</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-purple-400 mr-3 font-bold">2.</span>
                    <span>Upload a photo of yourself</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-purple-400 mr-3 font-bold">3.</span>
                    <span>Choose a style: Professional, Goth, or Anime</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-purple-400 mr-3 font-bold">4.</span>
                    <span>Download your AI-generated profile picture</span>
                  </div>
                </div>
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
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Transform Your Photo
            </h1>
            <p className="text-xl text-gray-400">
              Upload a photo, pick a style, get your new PFP
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Upload */}
            <div className="lg:col-span-1">
              <PhotoUploader onImageUpload={(img) => setUploadedImage(img)} />
            </div>

            {/* Middle: Style Selection */}
            <div className="lg:col-span-1">
              <StyleSelector
                selectedStyle={selectedStyle}
                onStyleSelect={setSelectedStyle}
              />

              {/* Transform button */}
              <button
                onClick={handleTransform}
                disabled={!uploadedImage || processing}
                className="mt-6 w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? "Transforming..." : "Transform Photo"}
              </button>

              {/* Credits display */}
              <div className="mt-4 p-4 bg-purple-900/20 border border-purple-900/30 rounded-xl text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm font-medium text-purple-300">
                    Credits remaining
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{credits}</div>
                <div className="text-xs text-gray-400 mb-3">
                  {credits === 0 ? "No credits available" : "1 free credit resetsets daily"}
                </div>
                {credits === 0 && (
                  <a
                    href="/checkout"
                    className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition"
                  >
                    Get More Credits
                  </a>
                )}
              </div>
            </div>

            {/* Right: Results */}
            <div className="lg:col-span-1">
              <TransformResults
                transformed={transformed}
                selectedStyle={selectedStyle}
              />
            </div>
          </div>
        </div>

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
                <h2 className="text-2xl font-bold text-white mb-2">
                  Out of Credits
                </h2>
                <p className="text-gray-400 mb-6">
                  You've used your 1 free transformation for today. Get more credits or wait until tomorrow.
                </p>

                <div className="space-y-3">
                  <a
                    href="/checkout"
                    className="block w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition"
                  >
                    Buy More Credits
                  </a>
                  <button
                    onClick={() => setCreditModalOpen(false)}
                    className="block w-full px-4 py-3 bg-purple-900/20 border border-purple-900/30 text-white rounded-lg font-medium hover:bg-purple-900/30 transition"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
