import Link from "next/link";
import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-purple-900/20">
      <div className="container mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-48 md:w-52 h-8 flex items-center">
            <img
              src="/logo.svg"
              alt="FreePFP.ai"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="/#styles" className="text-sm text-gray-300 hover:text-white transition">
            Styles
          </a>
          <a href="/#how-to-use" className="text-sm text-gray-300 hover:text-white transition">
            How to Use
          </a>
          <a href="/#features" className="text-sm text-gray-300 hover:text-white transition">
            Features
          </a>
          <a href="/pricing" className="text-sm text-gray-300 hover:text-white transition">
            Pricing
          </a>
          <Link
            href="/transform"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium transition"
          >
            Transform
          </Link>
          <AuthButton />
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-3">
          <AuthButton />
        </div>
      </div>

      {/* Mobile nav */}
      <div className="lg:hidden flex justify-center gap-6 pb-3">
        <a href="/#styles" className="text-sm text-gray-300 hover:text-white transition">
          Styles
        </a>
        <a href="/#how-to-use" className="text-sm text-gray-300 hover:text-white transition">
          How to Use
        </a>
        <a href="/#features" className="text-sm text-gray-300 hover:text-white transition">
          Features
        </a>
        <Link
          href="/transform"
          className="text-sm text-gray-300 hover:text-white transition"
        >
          Transform
        </Link>
      </div>
    </header>
  );
}
