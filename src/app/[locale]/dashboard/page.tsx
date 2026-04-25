"use client";

import { ArrowLeft, Coins, PhoneCall, ShieldCheck, Activity, Users, Settings } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useState } from "react";

export default function DashboardPage() {
  const [balance] = useState(5400.00);
  const [calls] = useState([
    { id: "1", date: "Today, 14:30", number: "+1 (555) 019-8234", duration: "14m 20s", status: "Encrypted", cost: "$0.00" },
    { id: "2", date: "Yesterday, 09:15", number: "+44 20 7946 0958", duration: "45m 05s", status: "Encrypted", cost: "$0.00" },
    { id: "3", date: "Apr 22, 18:45", number: "+971 50 123 4567", duration: "08m 10s", status: "Encrypted", cost: "$0.00" },
    { id: "4", date: "Apr 20, 11:00", number: "+81 90 1234 5678", duration: "1h 12m", status: "Encrypted", cost: "$0.00" }
  ]);

  return (
    <main className="flex w-full min-h-screen font-sans bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#222] hidden md:flex flex-col p-6 bg-[#0A0A0A]">
        <Link href="/" className="flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity">
          <span className="font-bold text-lg">
            <span className="text-[#cca900]">M</span>Power Space
          </span>
        </Link>

        <nav className="flex flex-col gap-2 flex-grow">
          <div className="px-4 py-3 rounded-lg bg-[#cca900]/10 text-[#cca900] font-semibold flex items-center gap-3 cursor-pointer">
            <Activity size={20} />
            Overview
          </div>
          <div className="px-4 py-3 rounded-lg text-gray-400 hover:bg-[#111] hover:text-white font-medium flex items-center gap-3 transition-colors cursor-pointer">
            <PhoneCall size={20} />
            Call History
          </div>
          <Link href="/recharge" className="px-4 py-3 rounded-lg text-gray-400 hover:bg-[#111] hover:text-white font-medium flex items-center gap-3 transition-colors cursor-pointer">
            <Coins size={20} />
            Wallet & Billing
          </Link>
          <div className="px-4 py-3 rounded-lg text-gray-400 hover:bg-[#111] hover:text-white font-medium flex items-center gap-3 transition-colors cursor-pointer">
            <Users size={20} />
            Team Members
          </div>
          <div className="px-4 py-3 rounded-lg text-gray-400 hover:bg-[#111] hover:text-white font-medium flex items-center gap-3 transition-colors cursor-pointer">
            <Settings size={20} />
            Security Settings
          </div>
        </nav>

        <div className="mt-auto pt-6 border-t border-[#222]">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-10 h-10 rounded-full bg-[#111] border border-[#cca900] flex items-center justify-center text-[#cca900]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Dr. Belal</p>
              <p className="text-xs text-[#cca900] font-medium">Secured Connection</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-6 border-b border-[#222] bg-[#0A0A0A]">
          <Link href="/" className="text-[#cca900]"><ArrowLeft size={24} /></Link>
          <span className="font-bold text-lg">Dashboard</span>
          <div className="w-8 h-8 rounded-full bg-[#111] border border-[#cca900]" />
        </div>

        <div className="p-6 md:p-12 flex-grow max-w-5xl">
          <h1 className="text-3xl font-bold mb-8">Executive Overview</h1>

          {/* Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Balance Card */}
            <div className="bg-[#0A0A0A] border border-[#222] p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Coins size={64} className="text-[#cca900]" />
              </div>
              <p className="text-gray-400 font-medium mb-2">Available Balance</p>
              <h2 className="text-4xl font-bold text-white mb-4">${balance.toFixed(2)}</h2>
              <Link href="/recharge" className="text-sm font-semibold text-[#cca900] hover:text-white transition-colors">
                + Top Up Wallet
              </Link>
            </div>

            {/* Security Status */}
            <div className="bg-[#0A0A0A] border border-[#cca900]/30 p-6 rounded-2xl relative overflow-hidden group shadow-[0_0_15px_rgba(204,169,0,0.05)]">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck size={64} className="text-[#cca900]" />
              </div>
              <p className="text-gray-400 font-medium mb-2">Security Status</p>
              <h2 className="text-2xl font-bold text-[#cca900] mb-4 flex items-center gap-2">
                100% Encrypted
              </h2>
              <p className="text-sm text-gray-500">Zero-Compute active.</p>
            </div>

            {/* Monthly Minutes */}
            <div className="bg-[#0A0A0A] border border-[#222] p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <PhoneCall size={64} className="text-gray-500" />
              </div>
              <p className="text-gray-400 font-medium mb-2">Encrypted Minutes</p>
              <h2 className="text-4xl font-bold text-white mb-4">4,250</h2>
              <p className="text-sm text-gray-500">Remaining this month</p>
            </div>
          </div>

          {/* Call History Table */}
          <div className="bg-[#0A0A0A] border border-[#222] rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-[#222] flex items-center justify-between">
              <h3 className="text-xl font-bold">Recent Secure Connections</h3>
              <button className="text-sm font-semibold text-gray-400 hover:text-white">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#111] text-gray-400 text-sm">
                    <th className="p-4 font-medium">Date / Time</th>
                    <th className="p-4 font-medium">Destination</th>
                    <th className="p-4 font-medium">Duration</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222]">
                  {calls.map((call) => (
                    <tr key={call.id} className="hover:bg-[#111]/50 transition-colors">
                      <td className="p-4 text-gray-300">{call.date}</td>
                      <td className="p-4 font-medium">{call.number}</td>
                      <td className="p-4 text-gray-400">{call.duration}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#cca900]/10 text-[#cca900] text-xs font-semibold">
                          <ShieldCheck size={12} />
                          {call.status}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-gray-300">{call.cost}</td>
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