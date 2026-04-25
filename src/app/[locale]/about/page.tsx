import { ArrowLeft, ShieldCheck, Globe, Lock, Cpu } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function AboutPage() {
  return (
    <main className="flex flex-col w-full min-h-screen font-sans bg-black text-white pt-32 px-6 pb-32">
      <div className="max-w-5xl mx-auto w-full">
        {/* Hero Section */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-[#cca900]/30 bg-[#cca900]/10 text-[#cca900] text-sm font-semibold mb-6">
            <Globe size={16} />
            <span>Global Operations</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            We Don't Make Calls.<br />
            <span className="text-[#cca900]">We Encrypt Them.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Mpower Space is a pioneer in decentralized telecommunications, engineered specifically for visionary leaders, executives, and organizations that demand absolute privacy.
          </p>
        </div>

        {/* The Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="p-10 rounded-3xl bg-[#0A0A0A] border border-[#222]">
            <h3 className="text-2xl font-bold mb-4 text-white">The Status Quo</h3>
            <p className="text-gray-400 leading-relaxed">
              Traditional VoIP services and telecommunication networks are fundamentally broken by design. They route your voice through centralized servers, storing metadata, logging connections, and creating massive vulnerabilities for surveillance and corporate espionage.
            </p>
          </div>
          <div className="p-10 rounded-3xl bg-[#111] border border-[#cca900]/20 shadow-[0_0_30px_rgba(204,169,0,0.05)] relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-4 text-[#cca900]">The MPower Paradigm</h3>
            <p className="text-gray-300 leading-relaxed relative z-10">
              We rebuilt communication from the ground up. By utilizing a Zero-Compute Local Architecture, your voice acts like it's inside an impenetrable VPN. You use your exact same phone number, but your connection is shielded mathematically end-to-end.
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Architectural Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-[#111] border border-[#222] flex items-center justify-center mb-6">
                <Lock size={28} className="text-[#cca900]" />
              </div>
              <h4 className="text-xl font-bold mb-3">Absolute Anonymity</h4>
              <p className="text-gray-400">No social logins. No tracking cookies. Your identity is verified purely via strict telephonic protocols.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-[#111] border border-[#222] flex items-center justify-center mb-6">
                <Cpu size={28} className="text-[#cca900]" />
              </div>
              <h4 className="text-xl font-bold mb-3">Zero-Compute</h4>
              <p className="text-gray-400">Our servers don't process your voice. They simply facilitate the secure handshake. Your device does the heavy lifting.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-[#111] border border-[#222] flex items-center justify-center mb-6">
                <ShieldCheck size={28} className="text-[#cca900]" />
              </div>
              <h4 className="text-xl font-bold mb-3">Anti-Spy Guarantee</h4>
              <p className="text-gray-400">Built to withstand state-level surveillance attempts, ensuring your business secrets remain strictly yours.</p>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="p-12 rounded-3xl bg-black border border-[#333] text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">A Message to Visionaries</h2>
          <p className="text-lg text-gray-400 leading-relaxed mb-8 italic">
            "In an era where data is the new oil, your voice is the most unrefined, valuable asset you possess. We built Mpower Space not as an app, but as a digital fortress. When you make a call through our network, you are stepping into a sanctuary where only you and your recipient exist."
          </p>
          <div className="text-[#cca900] font-bold">
            — Dr. Belal, Architect & CEO
          </div>
        </div>
      </div>
    </main>
  );
}