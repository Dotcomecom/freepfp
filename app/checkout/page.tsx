"use client";

import { useState, Suspense } from "react";
import { useAuth } from "@/lib/AuthContext";
import Header from "@/components/Header";
import Link from "next/link";

const plans = [
  {
    credits: 100,
    price: 7.99,
    name: "Starter",
    color: "purple",
  },
  {
    credits: 500,
    price: 29.99,
    name: "Popular",
    color: "pink",
    recommended: true,
  },
  {
    credits: 1000,
    price: 79.99,
    name: "Best Value",
    color: "amber",
  },
];

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0010] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState(500);

  const handleCheckout = async (credits: number, price: number) => {
    if (!user) {
      // Will show a message - user should sign in first
      return;
    }

    setLoading(`credits_${credits}`);
    try {
      // Stripe placeholder - would create real checkout session
      alert(`Checkout for ${credits} credits at $${price.toFixed(2)} - Stripe integration required. This will be wired when you add your Stripe API keys.`);
    } catch (err) {
      console.error(err);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-24 pt-28">
        <h1 className="text-4xl font-bold text-center mb-2 gradient-text">
          Get More Credits
        </h1>
        <p className="text-center text-gray-400 mb-4">
          You get 1 free transformation per day — or buy credits for more
        </p>
        
        {!user && (
          <div className="mt-6 mb-2 p-4 bg-amber-900/20 border border-amber-700/30 rounded-xl text-center">
            <p className="text-amber-300">
              Please <Link href="/transform" className="text-amber-400 underline font-medium">visit the transform page</Link> and sign in first to purchase credits.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {plans.map((plan) => (
            <div
              key={plan.credits}
              className={`bg-purple-900/10 border rounded-2xl p-8 relative transition cursor-pointer hover:scale-105 ${
                plan.recommended
                  ? "border-pink-500/50 shadow-lg shadow-pink-500/20"
                  : selectedPlan === plan.credits
                  ? `border-${plan.color}-500/50 shadow-lg`
                  : "border-purple-900/30 hover:border-purple-700/50"
              }`}
              onClick={() => setSelectedPlan(plan.credits)}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-xs font-bold text-white">
                  MOST POPULAR
                </div>
              )}
              <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
              <p className="text-4xl font-bold gradient-text mb-1">${plan.price.toFixed(2)}</p>
              <p className="text-gray-400 mb-6">{plan.credits} transformations</p>
              <p className="text-sm text-gray-500 mb-6">
                ${(plan.price / plan.credits).toFixed(3)} per transformation
              </p>
              <button
                onClick={() => handleCheckout(plan.credits, plan.price)}
                disabled={loading === `credits_${plan.credits}` || !user}
                className={`w-full py-3 rounded-xl font-semibold transition ${
                  plan.recommended
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700"
                    : "bg-purple-900/30 border border-purple-700/30 text-purple-300 hover:bg-purple-900/50"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === `credits_${plan.credits}` ? "Processing..." : "Buy Now"}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-purple-900/10 border border-purple-900/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Why Buy Credits?</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-purple-400 mr-3">✓</span>
              <span>Credits never expire</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-3">✓</span>
              <span>Use them anytime, any style</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-3">✓</span>
              <span>Stack with your free daily transformation</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-3">✓</span>
              <span>HD quality downloads</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-400 mr-3">✓</span>
              <span>6+ AI styles to choose from</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
