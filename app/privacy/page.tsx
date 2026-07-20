import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link href="/" className="text-purple-400 hover:text-purple-300 transition mb-8 inline-block">← Back to Home</Link>
        
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300 leading-relaxed">
          <p className="text-sm text-gray-500">Last updated: July 20, 2026</p>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
            <p>We collect information you provide when you create an account, including your email address. We also collect usage data related to your interactions with our service, such as image uploads and generation preferences.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your image transformations</li>
              <li>Send you technical notices and updates</li>
              <li>Respond to your comments and questions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Image Data</h2>
            <p>Images you upload are processed to generate transformed versions. We do not store your uploaded images longer than necessary to provide the service. Generated images are available for download and are not retained on our servers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Cookies</h2>
            <p>We use cookies and similar technologies to maintain your session and preferences. These are essential for the functioning of our service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Third-Party Services</h2>
            <p>We use third-party services for image processing and authentication. These services are bound by their own privacy policies and are used only to deliver our core functionality.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:hello@theaibarn.com" className="text-purple-400 hover:text-purple-300 transition">hello@theaibarn.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
