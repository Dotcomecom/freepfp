"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import AuthModal from "@/components/AuthModal";

export default function AuthButton() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  if (user) {
    const email = user.email || "Account";
    const initial = email.charAt(0).toUpperCase();
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
          {initial}
        </div>
        <button
          onClick={signOut}
          className="text-sm text-gray-400 hover:text-white transition"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          setMode("signin");
          setIsOpen(true);
        }}
        className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105"
      >
        Sign In
      </button>

      <AuthModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode={mode}
        onSwitchMode={() => setMode(m => m === "signin" ? "signup" : "signin")}
      />
    </>
  );
}
