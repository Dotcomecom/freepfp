"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { createCheckoutSession } from "@/lib/stripe";

const plans = [
  {
    id: "pro_monthly",
    name: "Pro Monthly",
    price: "$9.99/month",
    credits: "Unlimited transformations",
    priceId: "price_1234567890_pro_monthly",
    mode: "subscription" as const,
  },
  {
    id: "credits_50",
    name: "50 Credits",
    price: "$4.99",
    credits: "50 transformations (no expiration)",
    priceId: "price_1234567890_credits_50",
    mode: "payment" as const,
  },
];

export default function Checkout() {
  const { user, refreshCredits } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (planId: string, priceId: string, mode: "subscription" | "payment") => {
    if (!user) {
      alert("Please sign in first");
      return;
    }

    setLoading(planId);
    try {
      const session = await createCheckoutSession(priceId, user.id, mode);
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-2 gradient-text">
        Upgrade Your Plan
      </h1>
      <p className="text-center text-gray-400 mb-12">
        Get unlimited transformations or buy credits as needed
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-purple-900/10 border border-purple-900/30 rounded-2xl p-8 hover:border-purple-700/50 transition"
          >
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <p className="text-3xl font-bold gradient-text mb-4">{plan.price}</p>
            <p className="text-gray-400 mb-6">{plan.credits}</p>
            <button
              onClick={() => handleCheckout(plan.id, plan.priceId, plan.mode)}
              disabled={loading === plan.id}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold disabled:opacity-50 hover:from-purple-700 hover:to-pink-700 transition"
            >
              {loading === plan.id ? "Processing..." : "Checkout"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-purple-900/10 border border-purple-900/30 rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">Why Go Pro?</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">✓</span>
            <span>Unlimited AI transformations</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">✓</span>
            <span>Priority processing (faster results)</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">✓</span>
            <span>HD quality downloads (4K)</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">✓</span>
            <span>Access to premium styles</span>
          </li>
          <li className="flex items-start">
            <span className="text-purple-400 mr-3">✓</span>
            <span>No watermarks</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
