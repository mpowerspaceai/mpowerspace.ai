"use client";

import Image from "next/image";
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
    <footer className="w-full py-12 px-6 border-t border-[#222] bg-black text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4 mt-auto">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded bg-[#cca900] flex items-center justify-center text-black font-bold text-xs opacity-70">M</div>
        <span>{tFooter('copyright')}</span>
      </div>
      <div className="flex gap-6">
        <Link href="/affiliate" prefetch={false} className="text-[#cca900] font-bold hover:text-[#FFD400] transition-colors">Affiliate Program</Link>
        <Link href="/contact" prefetch={false} className="hover:text-[#FFD400] transition-colors">Contact</Link>
        <Link href="/blog" prefetch={false} className="hover:text-[#FFD400] transition-colors">Blog</Link>
        <Link href="/privacy" prefetch={false} className="hover:text-[#FFD400] transition-colors">{tFooter('privacy')}</Link>
        <Link href="/privacy" prefetch={false} className="hover:text-[#FFD400] transition-colors">{tFooter('terms')}</Link>
        <a href="mailto:security@mpowerspace.ai" className="hover:text-[#FFD400] transition-colors">{tFooter('support')}</a>
      </div>
    </footer>
  );
}