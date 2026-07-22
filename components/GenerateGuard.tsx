"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import AuthModal from "@/components/AuthModal";

interface GenerateGuardProps {
  children: (openSignIn: () => void) => React.ReactNode;
}

export default function GenerateGuard({ children }: GenerateGuardProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const openSignIn = () => {
    setMode("signin");
    setIsOpen(true);
  };

  return (
    <>
      {children(openSignIn)}
      <AuthModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mode={mode}
        onSwitchMode={() => setMode(m => (m === "signin" ? "signup" : "signin"))}
      />
    </>
  );
}
