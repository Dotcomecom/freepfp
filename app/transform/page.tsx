import PhotoUploader from "@/components/PhotoUploader";
import StyleSelector from "@/components/StyleSelector";
import TransformResults from "@/components/TransformResults";
import Header from "@/components/Header";

export default function TransformPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Transform Your Photo
            </h1>
            <p className="text-xl text-gray-400">
              Upload a photo, pick a style, get your new PFP
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Upload */}
            <div className="lg:col-span-1">
              <PhotoUploader />
            </div>

            {/* Middle: Style Selection */}
            <div className="lg:col-span-1">
              <StyleSelector />
            </div>

            {/* Right: Results */}
            <div className="lg:col-span-1">
              <TransformResults />
            </div>
          </div>

          {/* Credits Display */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-purple-900/30 border border-purple-700/50 rounded-lg px-6 py-3">
              <span className="text-gray-400 mr-2">Credits remaining:</span>
              <span className="text-2xl font-bold text-purple-400">3</span>
              <span className="text-gray-400 ml-4 text-sm">
                <a href="/pricing" className="text-purple-400 hover:text-purple-300 underline">
                  Get more credits
                </a>
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
