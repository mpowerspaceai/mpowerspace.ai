"use client";

import { ArrowRight, ShieldCheck, Zap, Globe, Smartphone, Lock, Coins, Building, Menu, X } from "lucide-react";
import Image from "next/image";
import {useTranslations, useLocale} from 'next-intl';
import {Link} from '@/i18n/routing';
import { useState } from "react";

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

export default function Home() {
  const tHero = useTranslations('Hero');
  const tArch = useTranslations('Architecture');
  const tFeatures = useTranslations('Features');
  const tCta = useTranslations('CTA');
  
  return (
    <main className="flex flex-col w-full min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-24 md:pt-48 md:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden min-h-[90vh]">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="object-cover w-full h-full opacity-40 mix-blend-screen"
          >
            <source src="/banner-bg.mp4" type="video/mp4" />
          </video>
          {/* Gradient Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#0A0A0A]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFD400]/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFD400]/30 bg-[#FFD400]/10 text-[#FFD400] text-sm font-medium mb-8">
            <ShieldCheck size={16} />
            <span>{tHero('badge')}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-4xl leading-[1.1] mb-6">
            {tHero('titlePart1')} <br className="hidden md:block" />
            <span className="text-[#FFD400] drop-shadow-[0_0_15px_rgba(255,212,0,0.5)]">{tHero('titlePart2')}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            {tHero('description')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/download" className="flex items-center justify-center gap-2 bg-[#cca900] text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#b39500] transition-colors border border-[#cca900]">
              <Smartphone size={20} />
              {tHero('ctaPrimary')}
            </Link>
            <Link href="#features" className="flex items-center justify-center gap-2 bg-black text-[#cca900] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#111] transition-colors border border-[#cca900]">
              {tHero('ctaSecondary')} <ArrowRight size={20} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="w-full px-6 py-24 bg-[#0A0A0A] border-t border-[#222]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{tFeatures('title')}</h2>
            <p className="text-gray-400 max-w-2xl">{tFeatures('description')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="text-[#FFD400]" size={32} />}
              title={tFeatures('f1Title')}
              description={tFeatures('f1Desc')}
            />
            <FeatureCard 
              icon={<Globe className="text-[#FFD400]" size={32} />}
              title={tFeatures('f2Title')}
              description={tFeatures('f2Desc')}
            />
            <FeatureCard 
              icon={<Lock className="text-[#FFD400]" size={32} />}
              title={tFeatures('f3Title')}
              description={tFeatures('f3Desc')}
            />
            <FeatureCard 
              icon={<Coins className="text-[#FFD400]" size={32} />}
              title={tFeatures('f4Title')}
              description={tFeatures('f4Desc')}
            />
            <FeatureCard 
              icon={<ShieldCheck className="text-[#FFD400]" size={32} />}
              title={tFeatures('f5Title')}
              description={tFeatures('f5Desc')}
            />
            <FeatureCard 
              icon={<Building className="text-[#FFD400]" size={32} />}
              title={tFeatures('f6Title')}
              description={tFeatures('f6Desc')}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-32 px-6 flex flex-col items-center text-center border-t border-[#222]">
        <h2 className="text-4xl font-bold tracking-tight mb-6">{tCta('title')}</h2>
        <p className="text-gray-400 max-w-xl mb-10 text-lg">
          {tCta('description')}
        </p>
        <Link href="/download" className="bg-[#cca900] text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#b39500] transition-colors border border-[#cca900]">
          {tCta('button')}
        </Link>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col p-8 rounded-2xl bg-black border border-[#222] hover:border-[#FFD400]/50 transition-colors group">
      <div className="w-14 h-14 rounded-lg bg-[#111] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
