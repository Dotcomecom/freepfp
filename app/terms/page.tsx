import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="h-24 md:h-28" />

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl prose prose-invert prose-purple">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-gray-500 mb-12">Last updated: July 2026</p>

          <div className="space-y-8 text-gray-400">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using FreePFP.ai, you agree to be bound by these Terms of Service. If you do not agree, do not use our service.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">2. Service Description</h2>
              <p>FreePFP.ai provides AI-generated profile pictures based on photos you upload. We offer 1 free daily generation, with additional credits available for purchase.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">3. User Accounts</h2>
              <p>You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials. You must be at least 13 years old to use this service.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">4. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Upload photos of individuals without their consent</li>
                <li>Use the service to generate harmful, illegal, or misleading content</li>
                <li>Attempt to circumvent credit limits or abuse the free daily allowance</li>
                <li>Reverse engineer or copy our AI models or output algorithms</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">5. Intellectual Property</h2>
              <p>Generated images are provided for your personal use. You may use them as profile pictures on social media and other platforms. The FreePFP.ai brand, website, and underlying technology remain our intellectual property.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">6. Payments and Credits</h2>
              <p>Credit purchases are non-refundable. Credits do not expire. We reserve the right to change pricing with reasonable notice. Free daily credits reset every 24 hours and cannot be accumulated.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">7. Limitation of Liability</h2>
              <p>The service is provided "as is" without warranties. FreePFP.ai is not liable for any damages arising from use of the service or AI-generated outputs. Results may vary and we do not guarantee specific outcomes.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">8. Termination</h2>
              <p>We may terminate or suspend your account if you violate these terms. You may delete your account at any time by contacting us.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">9. Changes to Terms</h2>
              <p>We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">10. Contact</h2>
              <p>For questions about these Terms, contact us at <a href="mailto:hello@theaibarn.com" className="text-purple-400 hover:text-purple-300">hello@theaibarn.com</a>.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
