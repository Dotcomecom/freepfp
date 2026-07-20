import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Upload Your Photo",
      description: "Upload any clear, front-facing photo of yourself to FreePFP.ai. Selfies, passport-style photos, LinkedIn photos, or casual shots all work. For best results, use a well-lit image without heavy filters or extreme angles."
    },
    {
      number: "2",
      title: "Choose Your AI Style",
      description: "Select from 12+ unique AI styles: LinkedIn Professional for corporate headshots, Anime for Japanese animation avatars, Alt/Goth for dark aesthetics, Cyberpunk for neon-lit futuristic looks, Fairycore, Cottagecore, Vaporwave, Dark Academia, and more."
    },
    {
      number: "3",
      title: "Generate & Download Your AI Profile Picture",
      description: "Our InstantID face-preserving AI transforms your photo in under 30 seconds. Download your high-resolution AI-generated profile picture — perfect for LinkedIn, Instagram, Discord, X, or any social platform."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 scroll-mt-32" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="how-it-works-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
            How to Create AI Profile Pictures on FreePFP.ai
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Three simple steps to generate a free AI profile picture — no signup required to preview styles. Our InstantID face-preserving AI produces results in under 30 seconds.
          </p>
        </div>
        
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto list-none p-0">
          {steps.map((step, index) => (
            <li key={index} className="relative">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-700/50 rounded-2xl p-8 text-center h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white" aria-hidden="true">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-purple-500 text-4xl" aria-hidden="true">
                  →
                </div>
              )}
            </li>
          ))}
        </ol>
        
        <div className="text-center mt-12">
          <Link href="/transform" aria-label="Start generating AI profile pictures on FreePFP.ai">
            <span className="inline-block cursor-pointer px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold text-lg">
              Start Generating — 1 Free Profile Picture Per Day
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
