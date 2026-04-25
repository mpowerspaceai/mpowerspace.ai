"use client";

import { ArrowLeft, Users, Coins, Gift, Link as LinkIcon, Copy, CheckCircle2, TrendingUp } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useState } from "react";

export default function ResellerDashboard() {
  const [copied, setCopied] = useState(false);
  
  const resellerData = {
    name: "Lara",
    promoCode: "LARA2026",
    inviteLink: "https://app.mpowerspace.ai/register?ref=LARA2026",
    commissionRate: "20%",
    totalEarnings: 645.00,
    availableBalance: 120.00,
    totalInvites: 42,
    activeUsers: 38
  };

  const recentReferrals = [
    { id: 1, user: "Alex M.", plan: "Executive ($99)", date: "Today", commission: "+$19.80" },
    { id: 2, user: "Sarah K.", plan: "Enterprise ($499)", date: "Yesterday", commission: "+$99.80" },
    { id: 3, user: "John D.", plan: "Top-up ($50)", date: "Apr 22", commission: "+$10.00" },
    { id: 4, user: "Mike R.", plan: "Executive ($99)", date: "Apr 20", commission: "+$19.80" },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resellerData.inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex w-full min-h-screen font-sans bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#222] hidden md:flex flex-col p-6 bg-[#0A0A0A]">
        <Link href="/" className="flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded bg-[#FFD400] flex items-center justify-center text-black font-bold">M</div>
          <span className="font-bold text-lg">Mpower Space</span>
        </Link>

        <nav className="flex flex-col gap-2 flex-grow">
          <div className="px-4 py-3 rounded-lg bg-[#FFD400]/10 text-[#FFD400] font-semibold flex items-center gap-3 cursor-pointer">
            <TrendingUp size={20} />
            Partner Overview
          </div>
          <div className="px-4 py-3 rounded-lg text-gray-400 hover:bg-[#111] hover:text-white font-medium flex items-center gap-3 transition-colors cursor-pointer">
            <Users size={20} />
            My Referrals
          </div>
          <div className="px-4 py-3 rounded-lg text-gray-400 hover:bg-[#111] hover:text-white font-medium flex items-center gap-3 transition-colors cursor-pointer">
            <Coins size={20} />
            Payouts
          </div>
        </nav>

        <div className="mt-auto pt-6 border-t border-[#222]">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-[#111] border border-[#FFD400] flex items-center justify-center text-[#FFD400] font-bold">
              L
            </div>
            <div>
              <p className="text-sm font-bold text-white">{resellerData.name}</p>
              <p className="text-xs text-[#FFD400] font-medium">VIP Reseller</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-6 border-b border-[#222] bg-[#0A0A0A]">
          <Link href="/" className="text-[#FFD400]"><ArrowLeft size={24} /></Link>
          <span className="font-bold text-lg">Partner Portal</span>
          <div className="w-8 h-8 rounded-full bg-[#111] border border-[#FFD400] flex items-center justify-center text-xs font-bold">L</div>
        </div>

        <div className="p-6 md:p-12 flex-grow max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {resellerData.name}</h1>
              <p className="text-gray-400">Here is your reseller performance and commission status.</p>
            </div>
            <button className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
              Withdraw Funds
            </button>
          </div>

          {/* Invitation Link Card */}
          <div className="bg-[#0A0A0A] border border-[#FFD400]/30 p-6 rounded-2xl mb-8 shadow-[0_0_15px_rgba(255,212,0,0.05)]">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="text-[#FFD400]" size={24} />
              <h3 className="text-xl font-bold">Your Unique Promo Code</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="bg-[#111] border border-[#333] rounded-lg px-6 py-4 flex-grow w-full flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <LinkIcon size={18} className="text-gray-500 shrink-0" />
                  <span className="text-[#FFD400] font-mono font-bold truncate">{resellerData.inviteLink}</span>
                </div>
              </div>
              <button 
                onClick={copyToClipboard}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#FFD400] text-black px-8 py-4 rounded-lg font-bold hover:bg-[#e6bf00] transition-colors shrink-0"
              >
                {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Share this link. Anyone who registers and pays will earn you a <strong className="text-white">{resellerData.commissionRate} commission</strong> instantly.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-[#0A0A0A] border border-[#222] p-6 rounded-2xl">
              <p className="text-gray-400 font-medium mb-2">Total Earnings</p>
              <h2 className="text-3xl font-bold text-white">${resellerData.totalEarnings.toFixed(2)}</h2>
            </div>
            <div className="bg-[#0A0A0A] border border-[#222] p-6 rounded-2xl">
              <p className="text-gray-400 font-medium mb-2">Available Balance</p>
              <h2 className="text-3xl font-bold text-green-500">${resellerData.availableBalance.toFixed(2)}</h2>
            </div>
            <div className="bg-[#0A0A0A] border border-[#222] p-6 rounded-2xl">
              <p className="text-gray-400 font-medium mb-2">Total Invites</p>
              <h2 className="text-3xl font-bold text-white">{resellerData.totalInvites}</h2>
            </div>
            <div className="bg-[#0A0A0A] border border-[#222] p-6 rounded-2xl">
              <p className="text-gray-400 font-medium mb-2">Commission Rate</p>
              <h2 className="text-3xl font-bold text-[#FFD400]">{resellerData.commissionRate}</h2>
            </div>
          </div>

          {/* Recent Referrals Table */}
          <div className="bg-[#0A0A0A] border border-[#222] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#222]">
              <h3 className="text-xl font-bold">Recent Commission Activity</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#111] text-gray-400 text-sm">
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Referred User</th>
                    <th className="p-4 font-medium">Purchase / Plan</th>
                    <th className="p-4 font-medium text-right">Your Commission</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222]">
                  {recentReferrals.map((ref) => (
                    <tr key={ref.id} className="hover:bg-[#111]/50 transition-colors">
                      <td className="p-4 text-gray-400">{ref.date}</td>
                      <td className="p-4 font-medium flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#222] flex items-center justify-center text-xs">{ref.user.charAt(0)}</div>
                        {ref.user}
                      </td>
                      <td className="p-4 text-gray-300">{ref.plan}</td>
                      <td className="p-4 font-bold text-green-500 text-right">{ref.commission}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}