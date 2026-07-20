import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Upload Your Photo",
      description: "Upload any clear photo of yourself. Selfies, LinkedIn photos, or casual shots all work great."
    },
    {
      number: "2",
      title: "Choose a Style",
      description: "Pick from hundreds of styles: professional, goth, anime, cyberpunk, fantasy, and more."
    },
    {
      number: "3",
      title: "Get Your Results",
      description: "Our AI transforms your photo in seconds. Download in perfect dimensions for any platform."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-gray-400">
            Three simple steps to your perfect profile picture.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-700/50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-purple-500 text-4xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/transform">
            <span className="inline-block cursor-pointer px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold text-lg">
              Try It Now - 1 Free Per Day
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
