import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-purple-900/20">
      <div className="container mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-amber-500 flex items-center justify-center text-lg font-black text-white shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all group-hover:scale-105">
            F
          </div>
          <span className="text-lg md:text-xl font-bold">
            <span className="text-white">Free</span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">PFP.ai</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-5">
          <a href="/#how-it-works" className="text-sm text-gray-400 hover:text-white transition">How it Works</a>
          <a href="/#styles" className="text-sm text-gray-400 hover:text-white transition">Styles</a>
          <a href="/#features" className="text-sm text-gray-400 hover:text-white transition">Features</a>
          <a href="/#pricing" className="text-sm text-gray-400 hover:text-white transition">Pricing</a>
        </nav>

        {/* CTA */}
        <Link
          href="/transform"
          className="px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105"
        >
          Create PFP
        </Link>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex justify-center gap-6 pb-3 text-sm">
        <a href="/#how-it-works" className="text-gray-400 hover:text-white transition">How it Works</a>
        <a href="/#styles" className="text-gray-400 hover:text-white transition">Styles</a>
        <a href="/#features" className="text-gray-400 hover:text-white transition">Features</a>
      </div>
    </header>
  );
}
