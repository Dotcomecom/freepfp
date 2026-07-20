"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    router.push("/");
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <footer className="border-t border-purple-900/20 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
              <span className="text-xl font-bold text-white">FreePFP<span className="text-purple-400">.ai</span></span>
            </div>
            <p className="text-gray-400 text-sm">
              Transform your photos into any style with AI. Free daily credits.
            </p>
            <p className="text-gray-400 text-sm mt-3">
              Contact us: <a href="mailto:hello@theaibarn.com" className="text-purple-400 hover:text-purple-300 transition">hello@theaibarn.com</a>
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/transform" className="text-gray-400 hover:text-white transition">Create</Link></li>
              <li><Link href="/transform" className="text-gray-400 hover:text-white transition">Styles</Link></li>
              <li><button onClick={() => scrollToSection("features")} className="text-gray-400 hover:text-white transition">Features</button></li>
              <li><button onClick={() => scrollToSection("how-it-works")} className="text-gray-400 hover:text-white transition">How It Works</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:hello@theaibarn.com?subject=Help%20Request" className="text-gray-400 hover:text-white transition">Help Center</a></li>
              <li><a href="mailto:hello@theaibarn.com" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-purple-900/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2026 FreePFP.ai. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Questions? <a href="mailto:hello@theaibarn.com" className="text-purple-400 hover:text-purple-300 transition">hello@theaibarn.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
