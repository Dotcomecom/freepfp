"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setTimeout(() => setShow(true), 1000);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
    // Initialize ads after consent
    if (typeof window !== "undefined" && window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {}
    }
  };

  const decline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#0a0a0a] border-t border-purple-900/30 shadow-2xl">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <p className="text-sm text-gray-300 flex-1">
            We use cookies to enhance your experience and serve ads. By continuing, you agree to our{" "}
            <a href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
              Privacy Policy
            </a>.
          </p>
          <div className="flex gap-3">
            <button
              onClick={decline}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="px-6 py-2 text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
