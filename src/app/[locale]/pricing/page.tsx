import { ArrowLeft, CheckCircle2, Shield } from "lucide-react";
import { Link } from "@/i18n/routing";

const PLANS = [
  {
    name: "Executive",
    price: "$22",
    period: "/month",
    description: "For visionary leaders who need uncompromising daily privacy.",
    features: [
      "Military-Grade Call Encryption",
      "Keep Your Existing Number",
      "Zero-Compute Routing",
      "Biometric App Access",
      "Up to 5,000 Encrypted Minutes"
    ],
    popular: false,
    cta: "Start Secure Trial"
  },
  {
    name: "Business Plan",
    price: "$55",
    period: "/month",
    description: "The ultimate privacy fortress for entire executive boards.",
    features: [
      "Everything in Executive",
      "Unlimited Encrypted Minutes",
      "Global Anti-Spy Protection",
      "Dedicated CEO Dashboard",
      "Priority 24/7 VIP Support",
      "Custom Enterprise Wallet"
    ],
    popular: true,
    cta: "Deploy Business Plan"
  },
  {
    name: "Custom",
    price: "Custom",
    period: "",
    description: "Bespoke, decentralized architecture for state-level security.",
    features: [
      "Private Decentralized Node",
      "On-Premises Key Management",
      "Custom API Integrations",
      "White-labeled Solution",
      "Dedicated Security Architect"
    ],
    popular: false,
    cta: "Contact Architecture Team"
  }
];

export default function PricingPage() {
  return (
    <main className="flex flex-col w-full min-h-screen font-sans bg-black text-white pt-32 px-6 pb-32">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Pay for <span className="text-[#cca900]">Privacy</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your voice is your most valuable asset. Protect it with our impenetrable, anti-spy call encryption plans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PLANS.map((plan, i) => (
            <div 
              key={i} 
              className={`relative flex flex-col p-8 rounded-3xl bg-[#0A0A0A] border ${
                plan.popular ? 'border-[#cca900] shadow-[0_0_30px_rgba(204,169,0,0.15)]' : 'border-[#222]'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#cca900] text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Recommended
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6 min-h-[48px]">{plan.description}</p>
              
              <div className="mb-8">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-gray-500 font-medium">{plan.period}</span>
              </div>
              
              <ul className="flex flex-col gap-4 mb-10 flex-grow">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="text-[#cca900] shrink-0 mt-0.5">•</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="https://app.mpowerspace.ai"
                className={`w-full py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center ${
                  plan.popular 
                    ? 'bg-[#cca900] text-black hover:bg-[#b39500]' 
                    : 'bg-transparent text-white border border-[#333] hover:border-[#cca900] hover:text-[#cca900]'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}