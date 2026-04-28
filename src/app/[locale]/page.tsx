import { ArrowRight, ShieldCheck, Zap, Globe, Smartphone, Lock, Coins, Building } from "lucide-react";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function Home() {
  const tHero = useTranslations('Hero');
  const tArch = useTranslations('Architecture');
  const tFeatures = useTranslations('Features');
  const tCta = useTranslations('CTA');
  
  return (
    <main className="flex flex-col w-full min-h-screen font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-24 md:pt-48 md:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden min-h-[90vh]">
        {/* Lightweight background to avoid loading a heavy hero video on first paint */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(204,169,0,0.20),_rgba(0,0,0,0.95)_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0A0A0A]" />
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
            <a href="/app/" className="flex items-center justify-center gap-2 bg-[#cca900] text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#b39500] transition-colors border border-[#cca900]">
              <Smartphone size={20} />
              {tHero('ctaPrimary')}
            </a>
            <Link href="#features" prefetch={false} className="flex items-center justify-center gap-2 bg-black text-[#cca900] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#111] transition-colors border border-[#cca900]">
              {tHero('ctaSecondary')} <ArrowRight size={20} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="w-full px-6 py-24 bg-black border-t border-[#222]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#cca900]/30 bg-[#cca900]/10 text-[#cca900] text-sm font-medium mb-6">
              <Zap size={16} />
              <span>{tArch('badge')}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              {tArch('titlePart1')} <br/>
              <span className="text-[#cca900]">{tArch('titlePart2')}</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {tArch('desc1')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center overflow-hidden">
            {/* Animated Visualization (Smart/Hacker Edition) */}
            <div className="relative w-full max-w-[300px] sm:max-w-md lg:max-w-lg mx-auto aspect-square flex items-center justify-center group overflow-visible">
              {/* Radar Sweep Effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
                <div className="absolute top-1/2 left-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-[#cca900] to-transparent origin-left animate-spin" style={{ animationDuration: '6s' }}></div>
              </div>
              
              {/* Galaxy Effect */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#cca900]/20 via-black to-black opacity-60"></div>
              
              {/* Pulsing Core Aura */}
              <div className="absolute inset-0 rounded-full border border-[#cca900]/20 shadow-[0_0_120px_rgba(204,169,0,0.2)] animate-ping" style={{ animationDuration: '3s' }}></div>
              
              {/* Orbit Rings with glowing dots */}
              <div className="absolute inset-4 rounded-full border border-[#cca900]/20 border-dashed animate-spin" style={{ animationDuration: '30s' }}></div>
              <div className="absolute inset-16 rounded-full border border-[#cca900]/30 border-dotted animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse' }}></div>
              <div className="absolute inset-32 rounded-full border border-[#cca900]/10 animate-spin" style={{ animationDuration: '50s' }}></div>

              {/* Data Streams (Static Lines) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#cca900]/20 to-transparent rotate-45"></div>
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#cca900]/20 to-transparent -rotate-45"></div>
              </div>

              {/* Core / Sun */}
              <div className="w-32 h-32 bg-black border-2 border-[#cca900] rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(204,169,0,0.8)] z-10 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-[#cca900]/10 animate-pulse"></div>
                <ShieldCheck size={50} className="text-[#cca900]" />
              </div>
              
              {/* Orbiting Planets / Nodes (Enhanced) */}
              <div className="absolute w-12 h-12 bg-[#0A0A0A] rounded-full border border-[#cca900]/50 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(204,169,0,0.5)] animate-orbit-1 backdrop-blur-md group-hover:border-[#cca900] transition-colors duration-500">
                <Smartphone size={20} className="text-[#cca900]" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              
              <div className="absolute w-14 h-14 bg-[#0A0A0A] rounded-full border border-[#cca900]/50 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(204,169,0,0.5)] animate-orbit-2 backdrop-blur-md group-hover:border-[#cca900] transition-colors duration-500">
                <Globe size={24} className="text-[#cca900]" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              
              <div className="absolute w-10 h-10 bg-[#0A0A0A] rounded-full border border-[#cca900]/50 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(204,169,0,0.5)] animate-orbit-3 backdrop-blur-md group-hover:border-[#cca900] transition-colors duration-500">
                <Lock size={16} className="text-[#cca900]" />
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>

            {/* Explanation Text */}
            <div className="space-y-10">
              <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-[#222]">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Globe className="text-[#cca900]" size={28} />
                  {tArch('noServerTitle')}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {tArch('noServerDesc')}
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-[#222]">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Zap className="text-[#cca900]" size={28} />
                  {tArch('localKeyTitle')}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {tArch('localKeyDesc')}
                </p>
              </div>
            </div>
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
        <a href="/app/" className="bg-[#cca900] text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#b39500] transition-colors border border-[#cca900]">
          {tCta('button')}
        </a>
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
