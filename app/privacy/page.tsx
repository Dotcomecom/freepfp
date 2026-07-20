import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="h-24 md:h-28" />

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl prose prose-invert prose-purple">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-gray-500 mb-12">Last updated: July 2026</p>

          <div className="space-y-8 text-gray-400">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly, including your email address when you create an account, and photos you upload for processing. We also collect basic usage data such as IP address, browser type, and access times.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Process your uploaded photos and generate AI profile pictures</li>
                <li>Manage your account and credits</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our services and develop new features</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">3. Photo Processing</h2>
              <p>Your uploaded photos are sent to our AI processing partners (Replicate) to generate your profile pictures. Photos are processed securely and are not shared with third parties beyond what is necessary to provide our service.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">4. Data Retention</h2>
              <p>We retain your account information for as long as your account is active. Uploaded photos are processed and then deleted from our servers. Generated images are stored temporarily for delivery and then removed.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">5. Third-Party Services</h2>
              <p>We use third-party services including Vercel (hosting), Supabase (authentication and database), and Replicate (AI image generation). Each service has their own privacy policies governing their use of data.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">6. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal information. You can delete your account at any time by contacting us. To exercise these rights, email hello@theaibarn.com.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">7. Cookies</h2>
              <p>We use essential cookies to maintain your session and authentication. We do not use tracking or advertising cookies.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">8. Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">9. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@theaibarn.com" className="text-purple-400 hover:text-purple-300">hello@theaibarn.com</a>.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
