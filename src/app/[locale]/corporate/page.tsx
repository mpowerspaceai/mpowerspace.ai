import type { Metadata } from "next";
import {
  AboutSection,
  CeoMessageSection,
  CorporateHeroSection,
  CorporatePageFooter,
  FeaturesSection,
  FinalCtaSection,
  TechnologySection,
  UseCasesSection,
  WhatWeDoSection
} from "@/components/corporate/CorporateSections";

export const metadata: Metadata = {
  title: "Corporate | MPowerspace.ai",
  description: "Premium corporate overview for MPowerspace.ai: AI, cloud infrastructure, and communication systems."
};

export default function CorporatePage() {
  return (
    <main className="w-full min-h-screen bg-black text-white">
      <CorporateHeroSection />
      <WhatWeDoSection />
      <FeaturesSection />
      <TechnologySection />
      <UseCasesSection />
      <AboutSection />
      <CeoMessageSection />
      <FinalCtaSection />
      <CorporatePageFooter />
    </main>
  );
}
