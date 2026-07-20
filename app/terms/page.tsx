import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link href="/" className="text-purple-400 hover:text-purple-300 transition mb-8 inline-block">← Back to Home</Link>
        
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed">
          <p className="text-sm text-gray-500">Last updated: July 20, 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using FreePFP.ai, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Service Description</h2>
            <p>FreePFP.ai provides AI-powered image transformation services. Users can upload photos and generate stylized profile pictures using artificial intelligence models.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate and complete information when creating an account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Acceptable Use</h2>
            <p>You agree not to use the service to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Upload images of individuals without their consent</li>
              <li>Create content that is illegal, harmful, or violates any laws</li>
              <li>Use the service for any commercial purposes without proper licensing</li>
              <li>Attempt to reverse engineer or exploit our systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Credits and Payments</h2>
            <p>Free credits are provided daily and do not accumulate or transfer. Paid credits are non-refundable except as required by law. We reserve the right to modify pricing with notice.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Limitation of Liability</h2>
            <p>FreePFP.ai is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the service or the quality of generated images.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Contact</h2>
            <p>For questions about these Terms, contact us at <a href="mailto:hello@theaibarn.com" className="text-purple-400 hover:text-purple-300 transition">hello@theaibarn.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
