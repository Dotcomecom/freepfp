import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import AdSenseAd from "@/components/AdSenseAd";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      
      {/* Ad placement */}
      <section className="container mx-auto px-6 py-8">
        <AdSenseAd slot="1234567890" className="min-h-[90px]" />
      </section>
      
      <HowItWorks />
      <Pricing />
      
      {/* Ad placement */}
      <section className="container mx-auto px-6 py-8 mb-16">
        <AdSenseAd slot="0987654321" className="min-h-[250px]" />
      </section>
      
      <Footer />
    </main>
  );
}
