import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#0a0a0a] border-t border-purple-900/20 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 via-pink-500 to-amber-500 flex items-center justify-center text-lg font-black text-white shadow-lg shadow-purple-500/20">
                F
              </div>
              <span className="text-lg font-bold">
                <span className="text-white">Free</span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">PFP.ai</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Create stunning profile pictures in any style with AI. LinkedIn, anime, goth, and more — all in seconds.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/transform" className="text-gray-400 hover:text-white transition">
                  Transform Now
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" className="text-gray-400 hover:text-white transition block">
                  How it Works
                </a>
              </li>
              <li>
                <a href="/#styles" className="text-gray-400 hover:text-white transition block">
                  Styles
                </a>
              </li>
              <li>
                <a href="/#footer" className="text-gray-400 hover:text-white transition block">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:hello@theaibarn.com" className="text-gray-400 hover:text-white transition block">
                  hello@theaibarn.com
                </a>
              </li>
              <li>
                <a href="https://discord.gg/your-invite" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition block">
                  Discord Community
                </a>
              </li>
              <li>
                <a href="mailto:support@theaibarn.com" className="text-gray-400 hover:text-white transition block">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-purple-900/20 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} FreePFP.ai — Free AI Profile Picture Generator</p>
          <p className="mt-2 text-xs">Powered by The AI Barn</p>
        </div>
      </div>
    </footer>
  );
}
