import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - FreePFP.ai",
  description: "FreePFP.ai Privacy Policy - How we handle your data and use cookies",
  robots: {
    index: true,
    follow: true,
  },
};

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
          <p className="text-xl text-gray-400 text-center mb-16">
            Last updated: July 2026
          </p>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                When you use FreePFP.ai, we collect:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• <strong className="text-white">Account information:</strong> Email address when you register</li>
                <li>• <strong className="text-white">Uploaded photos:</strong> Temporarily processed for transformation (not permanently stored)</li>
                <li>• <strong className="text-white">Usage data:</strong> Pages visited, features used, generation counts</li>
                <li>• <strong className="text-white">Cookies:</strong> Essential cookies for authentication and service functionality</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                We use your information to:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>• Create and manage your account</li>
                <li>• Process your photo transformations</li>
                <li>• Track your daily credit allocation</li>
                <li>• Improve our service and user experience</li>
                <li>• Display relevant advertisements</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Sharing</h2>
              <p className="text-gray-300 leading-relaxed">
                We share data with:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mt-3">
                <li>• <strong className="text-white">Replicate:</strong> Our AI processing partner, for image transformation (photos are deleted after processing)</li>
                <li>• <strong className="text-white">Google AdSense:</strong> We display third-party ads that may use cookies to serve relevant advertisements based on your prior visits. Google uses the DoubleClick DART cookie to serve ads based on your visit to our site and other sites. You may opt out of DART cookie use by visiting the <a href="https://www.google.com/privacy_ads.html" className="text-purple-400 hover:text-purple-300 underline">Google Ad Settings</a>.</li>
                <li>• <strong className="text-white">Supabase:</strong> Our database and authentication provider</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Storage & Security</h2>
              <p className="text-gray-300 leading-relaxed">
                Your uploaded photos are processed immediately and not permanently stored on our servers. Account data is stored securely in our EU-based Supabase database with encryption at rest and in transit. We implement industry-standard security measures to protect your data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">5. Cookies & Advertising</h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                We use cookies for:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-3">
                <li>• <strong className="text-white">Essential cookies:</strong> Authentication, session management, and service functionality</li>
                <li>• <strong className="text-white">Advertising cookies:</strong> Google AdSense and its partners may use cookies to serve ads based on your prior visits to our site or other sites. These cookies allow Google and its partners to serve ads based on your visit to freepfp.ai and/or other sites on the Internet.</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-purple-400 hover:text-purple-300 underline">Google Ads Settings</a> or by visiting <a href="https://www.aboutads.info" className="text-purple-400 hover:text-purple-300 underline">www.aboutads.info</a>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights (GDPR/CCPA)</h2>
              <p className="text-gray-300 leading-relaxed">
                You have the right to: access your personal data, request correction or deletion of your data, object to data processing, and request data portability. To exercise these rights, contact us at hello@theaibarn.com. We will respond within 30 days.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">7. Children's Privacy</h2>
              <p className="text-gray-300 leading-relaxed">
                FreePFP.ai is not intended for users under 13 years of age. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this privacy policy or our data practices, please contact us at: <a href="mailto:hello@theaibarn.com" className="text-purple-400 hover:text-purple-300 underline">hello@theaibarn.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
