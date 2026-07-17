export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "3 free transformations daily",
        "All styles available",
        "Standard quality",
        "Watermark removed",
        "Basic support"
      ],
      cta: "Get Started",
      highlight: false
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      features: [
        "Unlimited transformations",
        "All styles available",
        "HD quality downloads",
        "Priority processing",
        "No watermark",
        "Priority support"
      ],
      cta: "Start Pro Trial",
      highlight: true,
      badge: "Most Popular"
    },
    {
      name: "Credit Pack",
      price: "$4.99",
      period: "/50 credits",
      features: [
        "50 transformations",
        "All styles available",
        "HD quality downloads",
        "No expiration",
        "No watermark"
      ],
      cta: "Buy Credits",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-purple-900/5 to-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-400">
            Start free. Upgrade when you need more.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative card-hover rounded-2xl p-8 ${
                plan.highlight 
                  ? 'bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-500' 
                  : 'bg-purple-900/10 border border-purple-900/30'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {plan.badge}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-purple-400 mr-3">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 rounded-lg font-semibold transition ${
                plan.highlight
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                  : 'bg-purple-900/30 border border-purple-700/50 text-white hover:bg-purple-900/50'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 text-gray-500 text-sm">
          💳 Secure payments via Stripe • Cancel anytime • 7-day money-back guarantee
        </div>
      </div>
    </section>
  );
}
