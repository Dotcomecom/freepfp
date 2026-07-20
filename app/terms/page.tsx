export default function TermsPage() {
  return (
    <main className="min-h-screen">
      {/* Fixed header spacer */}
      <div className="h-24 md:h-28" />

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-lg text-gray-400 text-center mb-12">
            Last updated: July 2026
          </p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-400">
                By accessing and using FreePFP.ai ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">2. Description of Service</h2>
              <p className="text-gray-400">
                FreePFP.ai is an AI-powered tool that transforms uploaded photos into stylized profile pictures. Users receive 1 free transformation per day, and can purchase additional credits for more transformations.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">3. User Accounts</h2>
              <p className="text-gray-400">
                You must create an account using a valid email address. You are responsible for maintaining the confidentiality of your account credentials and all activities that occur under your account.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">4. Acceptable Use</h2>
              <p className="text-gray-400">
                You agree to use the Service only for lawful purposes. Specifically, you must not:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li>Upload photos of individuals without their consent</li>
                <li>Use generated images for identity theft, fraud, or impersonation</li>
                <li>Attempt to reverse-engineer, scrape, or abuse the Service</li>
                <li>Share content that is illegal, hateful, or harmful</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">5. Intellectual Property</h2>
              <p className="text-gray-400">
                You retain ownership of photos you upload. Generated images are provided for personal use only. Commercial licensing inquiries should be directed to hello@theaibarn.com.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">6. Payments and Refunds</h2>
              <p className="text-gray-400">
                Credit pack purchases are non-refundable. Credits purchased do not expire but free daily credits reset every 24 hours and do not roll over.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">7. Disclaimer of Warranties</h2>
              <p className="text-gray-400">
                The Service is provided "as is" without warranties of any kind. AI-generated results may vary and are not guaranteed. We do not warrant that the Service will be uninterrupted or error-free.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">8. Limitation of Liability</h2>
              <p className="text-gray-400">
                In no event shall FreePFP.ai be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">9. Changes to Terms</h2>
              <p className="text-gray-400">
                We reserve the right to modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the updated Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">10. Contact</h2>
              <p className="text-gray-400">
                Questions about these Terms should be directed to{' '}
                <a href="mailto:hello@theaibarn.com" className="text-purple-400 hover:text-purple-300 transition">
                  hello@theaibarn.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
