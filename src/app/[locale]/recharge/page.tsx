"use client";

import { useState } from "react";
import { Coins, ShieldCheck, CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";

export default function RechargePage() {
  const t = useTranslations('Recharge');
  const [amount, setAmount] = useState<string>("50");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [coupon, setCoupon] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/payment/mollie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, coupon: coupon.trim() })
      });
      const data = await res.json();
      
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || 'Payment initiation failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while processing your payment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col w-full min-h-screen font-sans bg-black text-white pt-32 px-6 pb-24">
      <div className="max-w-xl mx-auto w-full">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t('title1')} <span className="text-[#cca900]">{t('title2')}</span>
        </h1>
        <p className="text-gray-400 mb-12">
          {t('desc')}
        </p>

        <div className="bg-[#0A0A0A] border border-[#222] p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#cca900]/5 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6">{t('select')}</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {["20", "50", "100", "250"].map((val) => (
                <button
                  key={val}
                  onClick={() => { setAmount(val); setCustomAmount(""); }}
                  className={`py-4 rounded-xl font-bold text-lg border transition-all ${
                    amount === val && !customAmount
                      ? 'bg-[#cca900] text-black border-[#cca900] shadow-[0_0_20px_rgba(204,169,0,0.3)]'
                      : 'bg-[#111] text-white border-[#333] hover:border-[#cca900]/50'
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-400 mb-2">{t('custom')}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                <input 
                  type="number" 
                  placeholder={t('customPlaceholder')}
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount(e.target.value);
                  }}
                  className="w-full bg-[#111] border border-[#333] rounded-xl pl-10 pr-4 py-4 text-white focus:outline-none focus:border-[#cca900] transition-colors font-bold text-lg"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-400 mb-2">Coupon Code (Optional)</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Enter VIP Coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                  className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-4 text-[#cca900] focus:outline-none focus:border-[#cca900] transition-colors font-bold text-lg tracking-widest uppercase"
                />
              </div>
              {coupon && (
                <p className="text-xs text-gray-500 mt-2">
                  If valid, free trial will be applied at checkout.
                </p>
              )}
            </div>

            <button 
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full bg-[#cca900] text-black font-bold text-xl py-5 rounded-xl hover:bg-[#b39500] transition-colors flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(204,169,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CreditCard size={24} />
              {isLoading ? "Processing..." : t('button')}
            </button>

            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-500">
              <ShieldCheck size={14} className="text-[#cca900]" />
              <span>{t('secure')}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}