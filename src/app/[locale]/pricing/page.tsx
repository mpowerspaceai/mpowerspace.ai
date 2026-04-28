"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Shield, X } from "lucide-react";
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/business-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone, companyWebsite: website }),
      });
      
      if (res.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setIsPopupOpen(false);
          setSubmitSuccess(false);
          setEmail("");
          setPhone("");
          setWebsite("");
        }, 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error submitting request.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              
              {plan.name === "Business Plan" ? (
                <button 
                  onClick={() => setIsPopupOpen(true)}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center ${
                    plan.popular 
                      ? 'bg-[#cca900] text-black hover:bg-[#b39500] shadow-[0_0_20px_rgba(204,169,0,0.2)]' 
                      : 'bg-transparent text-white border border-[#333] hover:border-[#cca900] hover:text-[#cca900]'
                  }`}
                >
                  {plan.cta}
                </button>
              ) : plan.name === "Executive" ? (
                <button 
                  onClick={async () => {
                    const res = await fetch('/api/payment/mollie', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ amount: 22, coupon: '' })
                    });
                    const data = await res.json();
                    if (data.checkoutUrl) window.location.href = data.checkoutUrl;
                  }}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center ${
                    plan.popular 
                      ? 'bg-[#cca900] text-black hover:bg-[#b39500] shadow-[0_0_20px_rgba(204,169,0,0.2)]' 
                      : 'bg-transparent text-white border border-[#333] hover:border-[#cca900] hover:text-[#cca900]'
                  }`}
                >
                  {plan.cta}
                </button>
              ) : (
                <a 
                  href="mailto:admin@mpowerspace.ai"
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center ${
                    plan.popular 
                      ? 'bg-[#cca900] text-black hover:bg-[#b39500] shadow-[0_0_20px_rgba(204,169,0,0.2)]' 
                      : 'bg-transparent text-white border border-[#333] hover:border-[#cca900] hover:text-[#cca900]'
                  }`}
                >
                  {plan.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Business Plan Request Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0A0A] border border-[#333] rounded-2xl p-8 max-w-md w-full relative shadow-2xl shadow-black/50">
            <button 
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Request Business Plan</h2>
              <p className="text-gray-400 text-sm">Enter your details and our team will provision your dedicated business environment.</p>
            </div>

            {submitSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Request Received</h3>
                <p className="text-gray-400">We will contact you shortly to complete the setup.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Company Website</label>
                  <input 
                    type="text" 
                    required
                    placeholder="https://example.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cca900] focus:ring-1 focus:ring-[#cca900] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Work Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="ceo@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cca900] focus:ring-1 focus:ring-[#cca900] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cca900] focus:ring-1 focus:ring-[#cca900] transition-colors"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#cca900] text-black hover:bg-[#b39500] font-bold py-3 rounded-lg mt-4 transition-colors flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}