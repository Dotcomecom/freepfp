"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import AuthModal from "./AuthModal";

export default function Header() {
  const { user, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup");
  const router = useRouter();

  const handleSignIn = () => {
    setAuthMode("signin");
    setAuthModalOpen(true);
  };

  const handleGetStarted = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  const switchMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const scrollToSection = (sectionId: string) => {
    router.push("/");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#0a0010]/80 backdrop-blur-md border-b border-purple-900/20">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
            <span className="text-xl font-bold text-white">FreePFP<span className="text-purple-400">.ai</span></span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("features")} className="text-gray-300 hover:text-white transition">Features</button>
            <button onClick={() => scrollToSection("how-it-works")} className="text-gray-300 hover:text-white transition">How It Works</button>
            <button onClick={() => scrollToSection("pricing")} className="text-gray-300 hover:text-white transition">Pricing</button>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center space-x-2 bg-purple-900/30 px-4 py-2 rounded-lg border border-purple-700/30">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm font-medium text-purple-300">1 free/day</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-gray-300 hover:text-white transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSignIn}
                  className="text-gray-300 hover:text-white transition"
                >
                  Sign In
                </button>
                <button
                  onClick={handleGetStarted}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-medium"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={switchMode}
      />
    </>
  );
}
