"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect users to the secure WebRTC PWA Application
    // We use window.location.href instead of router.push because it's a completely different sub-domain (app.mpowerspace.ai)
    const timeout = setTimeout(() => {
      window.location.href = "https://app.mpowerspace.ai";
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <main className="flex flex-col w-full min-h-screen font-sans bg-black text-white items-center justify-center p-6">
      <div className="flex flex-col items-center text-center animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-[#cca900]/10 rounded-full border border-[#cca900]/30 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(204,169,0,0.15)] relative">
          <ShieldCheck size={40} className="text-[#cca900]" />
          <div className="absolute inset-0 border border-[#cca900]/50 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 tracking-tight">
          Establishing Secure Connection
        </h1>
        
        <p className="text-gray-400 mb-8 max-w-md">
          Redirecting you to the MPower Space secure web application (app.mpowerspace.ai)...
        </p>

        <div className="flex items-center gap-3 text-[#cca900] font-semibold bg-[#111] px-6 py-3 rounded-full border border-[#333]">
          <Loader2 size={18} className="animate-spin" />
          Authenticating Route
        </div>
      </div>
    </main>
  );
}