import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import AdSenseAd from "@/components/AdSenseAd";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

      {/* Compact credit banner */}
      <section className="py-6 border-y border-purple-800/30 bg-gradient-to-r from-purple-950/40 via-purple-900/30 to-pink-950/40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <a href="/transform" className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-green-500 hover:to-emerald-500 transition">
              <span className="text-lg">✨</span> Get 3 Free Credits
            </a>
            <a href="/checkout?credits=100" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-purple-500 hover:to-indigo-500 transition">
              <span className="text-lg">🎨</span> 100 Credits — $7.99
            </a>
            <a href="/checkout?credits=500" className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-pink-500 hover:to-rose-500 transition">
              <span className="text-lg">🔥</span> 500 Credits — $29.99
            </a>
            <a href="/checkout?credits=1000" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-amber-400 hover:to-orange-500 transition">
              <span className="text-lg">💎</span> 1000 Credits — $79.99
            </a>
          </div>
        </div>
      </section>

      <Features />
      
      {/* Ad placement */}
      <section className="container mx-auto px-6 py-8">
        <AdSenseAd slot="1234567890" className="min-h-[90px]" />
      </section>
      
      <HowItWorks />
      
      {/* Ad placement */}
      <section className="container mx-auto px-6 py-8 mb-16">
        <AdSenseAd slot="0987654321" className="min-h-[250px]" />
      </section>
      
      <Footer />
    </main>
  );
}
