import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Spacer so content sits below fixed header */}
      <div className="h-24 md:h-28" />

      {/* Hero component - includes headline, subtitle, and 3 image boxes */}
      <Hero />

      {/* Credit purchase banner - below hero images */}
      <section id="pricing" className="py-6 scroll-mt-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-purple-900/30 border border-purple-500/20 rounded-2xl p-4">
            <Link
              href="/transform"
              className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/50 hover:scale-105 text-white font-semibold"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>1 Free Per Day</span>
              </span>
            </Link>

            <Link
              href="/checkout?credits=100"
              className="group px-4 py-2 rounded-lg bg-purple-600/80 hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 text-white font-medium"
            >
              <span className="flex flex-col items-center text-xs">
                <span className="opacity-80">100 Credits</span>
                <span className="font-bold text-base">$7.99</span>
              </span>
            </Link>

            <Link
              href="/checkout?credits=500"
              className="group px-4 py-2 rounded-lg bg-pink-600/80 hover:bg-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-pink-500/30 hover:scale-105 text-white font-medium"
            >
              <span className="flex flex-col items-center text-xs">
                <span className="opacity-80">500 Credits</span>
                <span className="font-bold text-base">$29.99</span>
              </span>
            </Link>

            <Link
              href="/checkout?credits=1000"
              className="group px-4 py-2 rounded-lg bg-amber-600/80 hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/30 hover:scale-105 text-white font-medium"
            >
              <span className="flex flex-col items-center text-xs">
                <span className="opacity-80">1000 Credits</span>
                <span className="font-bold text-base">$79.99</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <HowItWorks />
      <Features />
      <Footer />
    </main>
  );
}
