"use client";

import { useState, useEffect } from "react";
import { Download, ShieldCheck, Share, PlusSquare, X } from "lucide-react";

export default function IOSInstallModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Detect if user is on an iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);
  }, []);

  const handleInstallClick = () => {
    if (isIOS) {
      setIsOpen(true);
    } else {
      // If not on iOS (e.g. desktop Chrome), just redirect directly to the PWA app link
      window.location.href = "/app/";
    }
  };

  if (!isMounted) {
    return (
      <button 
        disabled
        className="w-full py-4 rounded-xl bg-[#cca900] text-black font-bold text-lg opacity-50 transition-colors flex items-center justify-center gap-2 mt-auto shadow-[0_0_20px_rgba(204,169,0,0.2)]"
      >
        <Download size={20} />
        Loading...
      </button>
    );
  }

  return (
    <>
      <button 
        onClick={handleInstallClick}
        className="w-full py-4 rounded-xl bg-[#cca900] text-black font-bold text-lg hover:bg-[#b39500] transition-colors flex items-center justify-center gap-2 mt-auto shadow-[0_0_20px_rgba(204,169,0,0.2)]"
      >
        <Download size={20} />
        {isIOS ? "Secure Install" : "Open / Install PWA"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="bg-[#0A0A0A] border border-[#333] rounded-3xl max-w-md w-full p-6 text-left relative shadow-[0_0_50px_rgba(204,169,0,0.1)]">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-[#111] rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#cca900]/10 border border-[#cca900]/30 rounded-xl flex items-center justify-center">
                <ShieldCheck size={24} className="text-[#cca900]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Encrypted Install</h3>
                <p className="text-xs text-[#cca900]">Bypassing App Store Tracking</p>
              </div>
            </div>

            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              To guarantee 100% voice encryption and prevent Apple from tracking your calls, Mpower Space must be installed directly via Safari's secure layer.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 bg-[#111] p-4 rounded-2xl border border-[#222]">
                <div className="w-8 h-8 rounded-full bg-[#cca900] text-black font-bold flex items-center justify-center shrink-0">1</div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Open Safari & Tap Share</p>
                  <p className="text-gray-500 text-xs">Open the app link in Safari and tap the Share icon <Share size={14} className="inline mx-1" /> at the bottom of the screen.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-[#111] p-4 rounded-2xl border border-[#222]">
                <div className="w-8 h-8 rounded-full bg-[#cca900] text-black font-bold flex items-center justify-center shrink-0">2</div>
                <div>
                  <p className="text-white font-medium text-sm mb-1">Add to Home Screen</p>
                  <p className="text-gray-500 text-xs">Scroll down the share menu and select "Add to Home Screen" <PlusSquare size={14} className="inline mx-1" /> to install the encrypted app.</p>
                </div>
              </div>
            </div>

            <a 
              href="/app/" 
              target="_blank"
              className="w-full py-4 rounded-xl bg-white text-black font-bold text-center block hover:bg-gray-200 transition-colors"
            >
              Open Secure Link Now
            </a>
          </div>
        </div>
      )}
    </>
  );
}