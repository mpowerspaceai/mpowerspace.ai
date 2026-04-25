"use client";

import { ArrowRight, Link as LinkIcon, LogIn, ShieldCheck, Target } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function AffiliatePage() {
  return (
    <main className="flex flex-col w-full min-h-screen font-sans bg-black text-white pt-32 px-6 pb-32">
      <div className="max-w-4xl mx-auto w-full text-center">
        {/* Hero Section */}
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-[#cca900]/30 bg-[#cca900]/10 text-[#cca900] text-sm font-semibold mb-6">
          <Target size={16} />
          <span>Mpower Partners Program</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Earn With <span className="text-[#cca900]">Privacy</span>
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
          Join our official FirstPromoter affiliate program. Track your referrals in real-time, get lifetime attribution, and earn recurring commissions on every secure call plan you sell.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-[#222] text-left">
            <ShieldCheck size={32} className="text-[#cca900] mb-4" />
            <h3 className="text-2xl font-bold mb-2">Lifetime Tracking</h3>
            <p className="text-gray-400">We don't rely on cookies alone. When a user registers using your link, their ID is permanently tied to your affiliate account in our database.</p>
          </div>
          <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-[#222] text-left">
            <LinkIcon size={32} className="text-[#cca900] mb-4" />
            <h3 className="text-2xl font-bold mb-2">Official Portal</h3>
            <p className="text-gray-400">Access your links, track conversions, and set up your PayPal or Bank payouts directly via our secure FirstPromoter dashboard.</p>
          </div>
        </div>

        {/* Real Integration Link - Using FirstPromoter Portal */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://mpowerspace.firstpromoter.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#cca900] text-black px-10 py-5 rounded-xl font-bold text-lg hover:bg-[#b39500] transition-colors border border-[#cca900] w-full sm:w-auto shadow-[0_0_30px_rgba(204,169,0,0.2)]">
            <LogIn size={20} />
            Login to Affiliate Portal
          </a>
          <a href="https://mpowerspace.firstpromoter.com/join" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-black text-[#cca900] px-10 py-5 rounded-xl font-bold text-lg hover:bg-[#111] transition-colors border border-[#cca900] w-full sm:w-auto">
            Become a Partner <ArrowRight size={20} className="rtl:rotate-180" />
          </a>
        </div>
      </div>
    </main>
  );
}