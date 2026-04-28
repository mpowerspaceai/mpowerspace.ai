"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { usePathname } from 'next/navigation';

export default function Footer() {
  const tFooter = useTranslations('Footer');
  const pathname = usePathname();

  // Hide footer on admin dashboard to provide a clean full-screen workspace
  if (pathname && pathname.includes('/admin')) {
    return null;
  }

  return (
    <footer className="w-full mt-auto border-t border-[#222] bg-gradient-to-b from-black to-[#080808] text-sm">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-[#cca900] text-black font-bold flex items-center justify-center shadow-[0_0_18px_rgba(204,169,0,0.25)]">
              M
            </div>
            <div className="space-y-1">
              <p className="text-white font-semibold tracking-tight">Mpower Space</p>
              <p className="text-gray-400 max-w-md leading-relaxed">
                Encrypted global calling platform built for secure business communication.
              </p>
            </div>
          </div>

          <nav aria-label="Footer links" className="grid grid-cols-2 gap-x-6 gap-y-3 text-gray-400 sm:grid-cols-3 md:flex md:flex-wrap md:justify-end md:gap-5">
            <Link href="/affiliate" prefetch={false} className="text-[#cca900] font-semibold hover:text-[#FFD400] transition-colors">Affiliate Program</Link>
            <Link href="/contact" prefetch={false} className="hover:text-[#FFD400] transition-colors">Contact</Link>
            <Link href="/blog" prefetch={false} className="hover:text-[#FFD400] transition-colors">Blog</Link>
            <Link href="/privacy" prefetch={false} className="hover:text-[#FFD400] transition-colors">{tFooter('privacy')}</Link>
            <Link href="/privacy" prefetch={false} className="hover:text-[#FFD400] transition-colors">{tFooter('terms')}</Link>
            <a href="mailto:security@mpowerspace.ai" className="hover:text-[#FFD400] transition-colors">{tFooter('support')}</a>
          </nav>
        </div>

        <div className="mt-8 border-t border-[#1e1e1e] pt-5 text-gray-500 text-xs sm:text-sm flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>{tFooter('copyright')}</span>
          <span className="text-gray-600">Built for privacy-first communication.</span>
        </div>
      </div>
    </footer>
  );
}
