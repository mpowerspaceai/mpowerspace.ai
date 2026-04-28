"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Share2, X } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function InstallAppPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  const storageKey = "mpowerspace_install_prompt_dismissed";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(ua);
    const standalone = window.matchMedia("(display-mode: standalone)").matches || (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    setIsIOS(ios);
    setIsStandalone(standalone);

    const dismissed = window.localStorage.getItem(storageKey) === "1";
    if (!standalone && !dismissed) {
      setIsVisible(true);
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      const closed = window.localStorage.getItem(storageKey) === "1";
      if (!closed && !standalone) {
        setIsVisible(true);
      }
    };

    const handleAppInstalled = () => {
      setIsVisible(false);
      setDeferredPrompt(null);
      window.localStorage.setItem(storageKey, "1");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const message = useMemo(() => {
    if (isIOS) return "Install the app from Safari: tap Share, then Add to Home Screen.";
    if (deferredPrompt) return "Install MPowerspace as a real app on desktop or mobile.";
    return "Open the install page to add MPowerspace as an app.";
  }, [deferredPrompt, isIOS]);

  const closePrompt = () => {
    setIsVisible(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, "1");
    }
  };

  const handleInstall = async () => {
    if (isIOS) {
      window.location.href = "/download";
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setIsVisible(false);
        setDeferredPrompt(null);
        window.localStorage.setItem(storageKey, "1");
      }
      return;
    }

    window.location.href = "/download";
  };

  if (!isVisible || isStandalone) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[90] w-[calc(100%-2rem)] max-w-xl rounded-2xl border border-[#222] bg-[#0a0a0a]/95 backdrop-blur px-4 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.55)]">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#111] border border-[#2a2a2a] flex items-center justify-center text-[#cca900] shrink-0">
          {isIOS ? <Share2 className="w-5 h-5" /> : <Download className="w-5 h-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white text-sm font-semibold">Install MPowerspace App</p>
          <p className="text-gray-400 text-xs md:text-sm mt-1 leading-relaxed">{message}</p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleInstall}
              className="inline-flex items-center justify-center rounded-lg bg-[#cca900] text-black text-sm font-semibold px-4 py-2 hover:bg-[#FFD400] transition-colors"
            >
              {isIOS ? "Install Guide" : "Install Now"}
            </button>
            <button
              onClick={closePrompt}
              className="inline-flex items-center justify-center rounded-lg border border-[#333] text-gray-300 text-sm font-medium px-4 py-2 hover:bg-[#111] transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          aria-label="Close install prompt"
          onClick={closePrompt}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
