export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#0a0010]/80 backdrop-blur-md border-b border-purple-900/20">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
          <span className="text-xl font-bold text-white">FreePFP<span className="text-purple-400">.ai</span></span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How It Works</a>
          <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white transition">Sign In</button>
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-medium">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}
