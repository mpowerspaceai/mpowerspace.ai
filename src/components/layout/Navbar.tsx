"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';

const locales = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
  { code: 'he', name: 'עבריت' },
  { code: 'es', name: 'Español' },
  { code: 'ro', name: 'Română' },
  { code: 'pt', name: 'Português' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'zh', name: '中文' }
];

export default function Navbar() {
  const tNav = useTranslations('Navigation');
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide navbar on admin dashboard to prevent overlapping and provide a clean workspace
  if (pathname && pathname.includes('/admin')) {
    return null;
  }

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full flex items-center justify-between px-6 py-4 border-b border-[#222] bg-black/80 backdrop-blur-md z-50">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <span className="text-xl font-semibold tracking-tight hidden sm:block">
            <span className="text-[#cca900]">M</span>Power Space
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          <Link href="/#features" prefetch={false} className="hover:text-[#FFD400] transition-colors">{tNav('features')}</Link>
          <Link href="/#architecture" prefetch={false} className="hover:text-[#FFD400] transition-colors">{tNav('architecture')}</Link>
          <Link href="/about" prefetch={false} className="hover:text-[#FFD400] transition-colors">{tNav('about')}</Link>
          <Link href="/pricing" prefetch={false} className="hover:text-[#FFD400] transition-colors">{tNav('pricing')}</Link>
          <Link href="/contact" prefetch={false} className="hover:text-[#FFD400] transition-colors">{tNav('contact')}</Link>
          <Link href="/blog" prefetch={false} className="hover:text-[#FFD400] transition-colors">{tNav('blog')}</Link>
          <Link href="/recharge" prefetch={false} className="text-[#cca900] hover:text-[#FFD400] transition-colors font-bold">{tNav('recharge')}</Link>
          <a href="/app/" className="bg-[#cca900] text-black px-4 py-2 rounded-md font-semibold hover:bg-[#FFD400] transition-colors">
            {tNav('downloadApp')}
          </a>
          
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              🌐 <span className="uppercase">{locale}</span>
            </button>
            <div className="absolute right-0 top-full mt-2 w-32 bg-[#111] border border-[#333] rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col">
              {locales.map(l => (
                <Link key={l.code} href="/" locale={l.code as any} prefetch={false} className="px-4 py-2 hover:bg-[#222] text-white text-left transition-colors">
                  {l.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden flex items-center justify-center text-white p-2 z-50 bg-[#111] rounded-lg border border-[#333] hover:border-[#cca900] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[73px] bg-black z-40 flex flex-col p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="flex flex-col gap-6 text-lg font-medium">
            <Link href="/#features" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="border-b border-[#222] pb-4">{tNav('features')}</Link>
            <Link href="/#architecture" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="border-b border-[#222] pb-4">{tNav('architecture')}</Link>
            <Link href="/about" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="border-b border-[#222] pb-4">{tNav('about')}</Link>
            <Link href="/pricing" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="border-b border-[#222] pb-4">{tNav('pricing')}</Link>
            <Link href="/contact" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="border-b border-[#222] pb-4">{tNav('contact')}</Link>
            <Link href="/blog" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="border-b border-[#222] pb-4">{tNav('blog')}</Link>
            <Link href="/recharge" prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className="text-[#cca900] font-bold border-b border-[#222] pb-4">{tNav('recharge')}</Link>
            
            <div className="border-b border-[#222] pb-4">
              <p className="text-sm text-gray-500 mb-4">Select Language</p>
              <div className="grid grid-cols-2 gap-4">
                {locales.map(l => (
                  <Link key={l.code} href="/" locale={l.code as any} prefetch={false} onClick={() => setIsMobileMenuOpen(false)} className={`px-4 py-3 rounded-lg text-sm ${locale === l.code ? 'bg-[#cca900] text-black font-bold' : 'bg-[#111] text-white'}`}>
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>

            <a href="/app/" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#cca900] text-black px-6 py-4 rounded-lg font-bold text-center mt-4">
              {tNav('downloadApp')}
            </a>
          </div>
        </div>
      )}
    </>
  );
}