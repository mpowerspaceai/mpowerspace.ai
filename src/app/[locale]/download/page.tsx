import { Smartphone, Download, ShieldCheck, Apple, CheckCircle2, Monitor, Tablet, Laptop } from "lucide-react";
import Image from "next/image";

export default function DownloadPage() {
  return (
    <main className="flex flex-col w-full min-h-screen font-sans bg-black text-white pt-32 px-6 pb-32">
      <div className="max-w-6xl mx-auto w-full text-center">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-[#cca900]/30 bg-[#cca900]/10 text-[#cca900] text-sm font-semibold mb-6">
          <ShieldCheck size={16} />
          <span>100% Encrypted Communication</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Download <span className="text-[#cca900]">M</span>Power Space
        </h1>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16">
          Get the ultimate secure communication app for your device. Military-grade encryption, zero-compute architecture, and high-quality voice & video calls.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Android Download */}
          <div className="flex flex-col p-8 rounded-3xl bg-[#0A0A0A] border border-[#222] hover:border-[#cca900]/50 transition-colors items-center text-center group">
            <div className="w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Smartphone size={40} className="text-[#cca900]" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Android</h2>
            <p className="text-gray-400 mb-8">Direct download for maximum privacy, bypassing Google Play Store tracking.</p>
            
            <ul className="text-left space-y-3 mb-8 w-full">
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-[#cca900]"/> No Google Services required</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-[#cca900]"/> Direct updates</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-[#cca900]"/> Full encryption support</li>
            </ul>

            <a href="/downloads/mpower-app.apk" download="mpower-app.apk" className="w-full py-4 rounded-xl bg-[#cca900] text-black font-bold text-lg hover:bg-[#b39500] transition-colors flex items-center justify-center gap-2 mt-auto shadow-[0_0_20px_rgba(204,169,0,0.2)]">
              <Download size={20} />
              Download APK
            </a>
          </div>

          {/* iOS Download */}
          <div className="flex flex-col p-8 rounded-3xl bg-[#0A0A0A] border border-[#222] hover:border-[#cca900]/50 transition-colors items-center text-center group">
            <div className="w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Apple size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">iPhone</h2>
            <p className="text-gray-400 mb-8">Secure installation through the official Apple App Store.</p>
            
            <ul className="text-left space-y-3 mb-8 w-full">
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-[#cca900]"/> Verified by Apple</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-[#cca900]"/> Automatic updates</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-[#cca900]"/> Optimized for iOS</li>
            </ul>

            <button className="w-full py-4 rounded-xl bg-[#111] border border-[#333] text-white font-bold text-lg hover:bg-[#222] transition-colors flex items-center justify-center gap-2 mt-auto">
              Coming Soon
            </button>
          </div>

          {/* iPad Download */}
          <div className="flex flex-col p-8 rounded-3xl bg-[#0A0A0A] border border-[#222] hover:border-[#cca900]/50 transition-colors items-center text-center group">
            <div className="w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Tablet size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">iPad</h2>
            <p className="text-gray-400 mb-8">Tablet-optimized experience with split-screen multi-tasking support.</p>
            
            <ul className="text-left space-y-3 mb-8 w-full">
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-[#cca900]"/> Large screen layout</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-[#cca900]"/> Multi-tasking ready</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-[#cca900]"/> Secure HD video calls</li>
            </ul>

            <button className="w-full py-4 rounded-xl bg-[#111] border border-[#333] text-white font-bold text-lg hover:bg-[#222] transition-colors flex items-center justify-center gap-2 mt-auto">
              Coming Soon
            </button>
          </div>

          {/* macOS Download */}
          <div className="flex flex-col p-8 rounded-3xl bg-[#0A0A0A] border border-[#222] hover:border-[#cca900]/50 transition-colors items-center text-center group">
            <div className="w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Laptop size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">macOS</h2>
            <p className="text-gray-400 mb-8">Native desktop application for Apple Silicon and Intel Macs.</p>
            
            <ul className="text-left space-y-3 mb-8 w-full">
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-[#cca900]"/> Native performance</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-[#cca900]"/> End-to-end encrypted</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-[#cca900]"/> Enterprise deployment</li>
            </ul>

            <button className="w-full py-4 rounded-xl bg-[#111] border border-[#333] text-white font-bold text-lg hover:bg-[#222] transition-colors flex items-center justify-center gap-2 mt-auto">
              Coming Soon
            </button>
          </div>

          {/* Windows/PC Download */}
          <div className="flex flex-col p-8 rounded-3xl bg-[#0A0A0A] border border-[#222] hover:border-[#cca900]/50 transition-colors items-center text-center group">
            <div className="w-20 h-20 bg-[#111] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Monitor size={40} className="text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Windows PC</h2>
            <p className="text-gray-400 mb-8">Robust desktop client for Windows 10 and 11 environments.</p>
            
            <ul className="text-left space-y-3 mb-8 w-full">
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-[#cca900]"/> Hardware accelerated</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-[#cca900]"/> Background secure sync</li>
              <li className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-[#cca900]"/> Screen sharing capable</li>
            </ul>

            <button className="w-full py-4 rounded-xl bg-[#111] border border-[#333] text-white font-bold text-lg hover:bg-[#222] transition-colors flex items-center justify-center gap-2 mt-auto">
              Coming Soon
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}