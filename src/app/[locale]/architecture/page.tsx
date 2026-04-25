import { ShieldCheck, Smartphone, Globe, Lock, Zap, Cpu, ServerOff } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ArchitecturePage() {
  const tArch = useTranslations('Architecture');

  return (
    <main className="flex flex-col w-full min-h-screen font-sans bg-black text-white pt-32 px-6 pb-32">
      <div className="max-w-6xl mx-auto w-full">
        
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#cca900]/30 bg-[#cca900]/10 text-[#cca900] text-sm font-medium mb-6">
            <Zap size={16} />
            <span>{tArch('badge')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            {tArch('titlePart1')} <br/>
            <span className="text-[#cca900]">{tArch('titlePart2')}</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {tArch('desc1')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          {/* Animated Visualization */}
          <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center">
            {/* Galaxy Effect */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#cca900]/20 via-black to-black opacity-60"></div>
            <div className="absolute inset-0 rounded-full border border-[#cca900]/10 shadow-[0_0_100px_rgba(204,169,0,0.15)] animate-pulse" style={{ animationDuration: '4s' }}></div>
            
            {/* Orbit Rings */}
            <div className="absolute inset-4 rounded-full border border-[#cca900]/20 border-dashed animate-spin" style={{ animationDuration: '25s' }}></div>
            <div className="absolute inset-16 rounded-full border border-[#cca900]/30 border-dotted animate-spin" style={{ animationDuration: '35s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-32 rounded-full border border-[#cca900]/10 animate-spin" style={{ animationDuration: '45s' }}></div>

            {/* Core / Sun */}
            <div className="w-32 h-32 bg-[#cca900] rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(204,169,0,0.8)] z-10 relative">
              <ShieldCheck size={56} className="text-black" />
            </div>
            
            {/* Orbiting Planets / Nodes */}
            <div className="absolute w-12 h-12 bg-black rounded-full border border-[#cca900] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(204,169,0,0.4)] animate-orbit-1">
              <Smartphone size={20} className="text-[#cca900]" />
            </div>
            <div className="absolute w-14 h-14 bg-black rounded-full border border-[#cca900] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(204,169,0,0.4)] animate-orbit-2">
              <Globe size={24} className="text-[#cca900]" />
            </div>
            <div className="absolute w-10 h-10 bg-black rounded-full border border-[#cca900] flex items-center justify-center z-10 shadow-[0_0_15px_rgba(204,169,0,0.4)] animate-orbit-3">
              <Lock size={16} className="text-[#cca900]" />
            </div>
          </div>

          {/* Explanation Text */}
          <div className="space-y-10">
            <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-[#222]">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <ServerOff className="text-[#cca900]" size={28} />
                {tArch('noServerTitle')}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {tArch('noServerDesc')}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-[#222]">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Cpu className="text-[#cca900]" size={28} />
                {tArch('localKeyTitle')}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {tArch('localKeyDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}