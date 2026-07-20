export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      {/* Fixed header spacer */}
      <div className="h-24 md:h-28" />

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-lg text-gray-400 text-center mb-12">
            Last updated: July 2026
          </p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">1. Information We Collect</h2>
              <p>
                We collect the following information when you use FreePFP.ai:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li>Email address (for account creation)</li>
                <li>Photos you upload for transformation</li>
                <li>Usage data such as page views and generations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
              <p className="text-gray-400">
                Your uploaded photos are processed by our AI partner (Replicate) to generate transformed images. We do not store uploaded photos on our servers. Generated images are available for immediate download. Email addresses are used solely for account management and service communications.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">3. Data Sharing</h2>
              <p className="text-gray-400">
                We share uploaded photos with our AI processing partner (Replicate) solely for the purpose of generating your transformed images. We do not sell, trade, or share your personal information with third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">4. Data Retention</h2>
              <p className="text-gray-400">
                Uploaded photos are not stored on our servers. Account information (email, credit balance) is retained for as long as your account is active. You may request account deletion at any time by contacting hello@theaibarn.com.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">5. Cookies</h2>
              <p className="text-gray-400">
                We use essential cookies to maintain your login session. We do not use third-party advertising cookies or tracking pixels.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">6. Your Rights</h2>
              <p className="text-gray-400">
                You have the right to access, correct, or delete your personal data at any time. Contact us at hello@theaibarn.com to exercise these rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-3">7. Contact</h2>
              <p className="text-gray-400">
                For privacy concerns or requests, email us at{' '}
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
