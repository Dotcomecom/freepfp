import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    {
      question: "How does the free daily credit work?",
      answer: "Every registered user receives 1 free transformation credit per day. Credits reset every 24 hours and cannot be accumulated or transferred. Simply log in and use your free credit anytime."
    },
    {
      question: "What photo types work best?",
      answer: "Clear, well-lit photos of your face work best. Selfies, passport-style photos, and professional headshots all work well. Avoid photos with heavy filters, extreme angles, or multiple people."
    },
    {
      question: "How long does generation take?",
      answer: "Most transformations complete in 10-30 seconds, depending on server load and the selected style."
    },
    {
      question: "Can I use the generated images commercially?",
      answer: "Yes, you can use generated images for personal and commercial purposes. However, you are responsible for ensuring you have the right to use the source photo you upload."
    },
    {
      question: "What happens to my uploaded photos?",
      answer: "Uploaded photos are processed immediately to generate transformations and are not stored long-term. We do not use your photos for training or any other purposes."
    },
    {
      question: "How do I purchase more credits?",
      answer: "Credit packs are available on the homepage: 100 credits for $7.99, 500 credits for $29.99, or 1000 credits for $79.99. Credits are one-time purchases and do not expire."
    },
    {
      question: "Can I get a refund?",
      answer: "Digital credits are non-refundable once purchased. If you experience technical issues, please contact us at hello@theaibarn.com and we'll work to resolve them."
    },
    {
      question: "What styles are available?",
      answer: "We offer 12 styles including LinkedIn Professional, Alt/Goth, Anime, Cyberpunk, Vaporwave, Fairycore, Cottagecore, Dark Academia, Indie Sleaze, and more. New styles are added regularly."
    },
    {
      question: "Something went wrong. How do I get help?",
      answer: "Email us at hello@theaibarn.com with details about the issue and we'll respond as soon as possible."
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link href="/" className="text-purple-400 hover:text-purple-300 transition mb-8 inline-block">← Back to Home</Link>
        
        <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-400 mb-12">Everything you need to know about FreePFP.ai</p>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-purple-900/20 border border-purple-800/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
              <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a href="mailto:hello@theaibarn.com" className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
