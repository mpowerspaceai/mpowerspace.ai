import { ArrowRight, Building2, Cloud, Cpu, Globe, MessageSquare, Rocket, Server, ShieldCheck, Sparkles, Workflow, Zap } from "lucide-react";
import { Link } from "@/i18n/routing";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type UseCase = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "AI-Powered Workflows",
    description: "Automate repetitive tasks and decisions with adaptive AI layers built for business operations.",
    icon: <Sparkles className="w-5 h-5 text-[#cca900]" />
  },
  {
    title: "Reliable Cloud Foundation",
    description: "Deploy on resilient cloud patterns with secure, scalable architecture and clear observability.",
    icon: <Cloud className="w-5 h-5 text-[#cca900]" />
  },
  {
    title: "Unified Communication Stack",
    description: "Bring voice, messaging, and communication intelligence into one streamlined platform.",
    icon: <MessageSquare className="w-5 h-5 text-[#cca900]" />
  },
  {
    title: "Enterprise-Grade Security",
    description: "Protect workloads, APIs, and user traffic with modern perimeter and application-layer controls.",
    icon: <ShieldCheck className="w-5 h-5 text-[#cca900]" />
  },
  {
    title: "Low-Latency Global Reach",
    description: "Deliver fast experiences across regions with edge-aware architecture and optimized routing.",
    icon: <Globe className="w-5 h-5 text-[#cca900]" />
  },
  {
    title: "Composable Integrations",
    description: "Connect existing systems quickly through modular services and extensible APIs.",
    icon: <Workflow className="w-5 h-5 text-[#cca900]" />
  }
];

const useCases: UseCase[] = [
  {
    title: "Enterprises",
    description: "Modernize communication and operations with secure automation across distributed teams.",
    icon: <Building2 className="w-5 h-5 text-[#cca900]" />
  },
  {
    title: "Startups",
    description: "Launch faster with cloud-native infrastructure, flexible APIs, and scalable architecture.",
    icon: <Rocket className="w-5 h-5 text-[#cca900]" />
  },
  {
    title: "Telecom / VoIP",
    description: "Build robust voice systems, provisioning flows, and carrier-ready routing capabilities.",
    icon: <Server className="w-5 h-5 text-[#cca900]" />
  },
  {
    title: "AI Automation",
    description: "Deploy assistants and intelligent workflows to improve support, sales, and internal operations.",
    icon: <Cpu className="w-5 h-5 text-[#cca900]" />
  }
];

function SectionContainer({
  id,
  eyebrow,
  title,
  description,
  children
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className="relative w-full px-6 py-20 md:py-28 border-t border-[#222]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(204,169,0,0.09),transparent_45%)]" />
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-12 md:mb-16">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#cca900] mb-4 font-medium">{eyebrow}</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-white">{title}</h2>
          {description ? (
            <p className="text-base md:text-lg text-gray-400 mt-6 leading-relaxed max-w-2xl">{description}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

export function CorporateHeroSection() {
  return (
    <section id="home" className="relative w-full px-6 pt-28 md:pt-36 pb-20 md:pb-30 overflow-hidden">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[55rem] h-[55rem] rounded-full bg-[#cca900]/12 blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(204,169,0,0.07),transparent_32%)]" />
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl relative">
          <p className="inline-flex items-center gap-2 text-[11px] tracking-[0.26em] uppercase text-[#cca900] border border-[#cca900]/35 rounded-full px-4 py-2 bg-[#cca900]/10 font-medium">
            <Zap className="w-4 h-4" />
            MPowerspace.ai
          </p>
          <h1 className="mt-7 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.02] text-white">
            Intelligent AI, resilient cloud, and modern communication infrastructure.
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-xl text-gray-300 leading-relaxed">
            We design and operate secure digital systems that help companies scale faster, communicate better, and automate with confidence.
          </p>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Link href="/contact" prefetch={false} className="inline-flex items-center justify-center gap-2 bg-[#cca900] text-black font-semibold px-7 py-3.5 rounded-xl hover:bg-[#FFD400] transition-colors shadow-[0_0_0_1px_rgba(204,169,0,0.8),0_12px_40px_rgba(204,169,0,0.28)]">
              Request Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/pricing" prefetch={false} className="inline-flex items-center justify-center border border-[#cca900]/70 text-[#cca900] font-semibold px-7 py-3.5 rounded-xl hover:bg-[#111] transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhatWeDoSection() {
  return (
    <SectionContainer
      id="what-we-do"
      eyebrow="What We Do"
      title="Technology solutions across AI, cloud infrastructure, and communication systems."
      description="MPowerspace.ai delivers integrated products and engineering services that connect intelligent automation with secure, high-performance digital infrastructure."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-3xl border border-[#2a2a2a] bg-[#0a0a0a] p-7">
          <h3 className="text-white text-xl font-medium mb-3">AI Solutions</h3>
          <p className="text-gray-400 leading-relaxed">Applied AI systems for workflows, customer engagement, and operations optimization.</p>
        </div>
        <div className="rounded-3xl border border-[#2a2a2a] bg-[#0a0a0a] p-7">
          <h3 className="text-white text-xl font-medium mb-3">Cloud Infrastructure</h3>
          <p className="text-gray-400 leading-relaxed">Scalable cloud architecture, resilient deployment patterns, and platform reliability design.</p>
        </div>
        <div className="rounded-3xl border border-[#2a2a2a] bg-[#0a0a0a] p-7">
          <h3 className="text-white text-xl font-medium mb-3">Communication Systems</h3>
          <p className="text-gray-400 leading-relaxed">Voice and messaging infrastructure for mission-critical communication experiences.</p>
        </div>
      </div>
    </SectionContainer>
  );
}

export function FeaturesSection() {
  return (
    <SectionContainer
      id="features"
      eyebrow="Features"
      title="Built for premium performance and operational clarity."
      description="A concise platform focused on speed, reliability, and intelligent automation."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-3xl border border-[#222] bg-black/95 p-7 hover:border-[#cca900]/45 transition-all duration-300 hover:-translate-y-0.5">
            <div className="w-11 h-11 rounded-xl bg-[#111] border border-[#2a2a2a] flex items-center justify-center mb-5">
              {feature.icon}
            </div>
            <h3 className="text-white text-lg font-medium mb-2">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}

export function TechnologySection() {
  return (
    <SectionContainer
      id="technology"
      eyebrow="Technology"
      title="Technologies we leverage."
      description="We build with proven platforms to deliver secure, high-performance, and intelligent outcomes."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <article className="rounded-3xl border border-[#2a2a2a] bg-[#0a0a0a] p-7">
          <h3 className="text-white text-xl font-medium">Cloudflare</h3>
          <p className="text-gray-400 mt-2 leading-relaxed">Supports security and performance through global edge connectivity, traffic protection, and acceleration.</p>
          <a href="https://www.cloudflare.com/" target="_blank" rel="noreferrer noopener" className="inline-flex mt-4 text-[#cca900] hover:text-[#FFD400] transition-colors">
            Official website
          </a>
        </article>
        <article className="rounded-3xl border border-[#2a2a2a] bg-[#0a0a0a] p-7">
          <h3 className="text-white text-xl font-medium">Twilio</h3>
          <p className="text-gray-400 mt-2 leading-relaxed">Enables communication APIs for programmable voice, messaging, and customer engagement workflows.</p>
          <a href="https://www.twilio.com/" target="_blank" rel="noreferrer noopener" className="inline-flex mt-4 text-[#cca900] hover:text-[#FFD400] transition-colors">
            Official website
          </a>
        </article>
        <article className="rounded-3xl border border-[#2a2a2a] bg-[#0a0a0a] p-7">
          <h3 className="text-white text-xl font-medium">FusionPBX</h3>
          <p className="text-gray-400 mt-2 leading-relaxed">Provides VoIP infrastructure capabilities including multi-tenant PBX operations and enterprise telephony control.</p>
          <a href="https://www.fusionpbx.com/" target="_blank" rel="noreferrer noopener" className="inline-flex mt-4 text-[#cca900] hover:text-[#FFD400] transition-colors">
            Official website
          </a>
        </article>
        <article className="rounded-3xl border border-[#2a2a2a] bg-[#0a0a0a] p-7">
          <h3 className="text-white text-xl font-medium">OpenAI</h3>
          <p className="text-gray-400 mt-2 leading-relaxed">Adds advanced AI capabilities for natural language interfaces, automation, and intelligent decision support.</p>
          <a href="https://openai.com/" target="_blank" rel="noreferrer noopener" className="inline-flex mt-4 text-[#cca900] hover:text-[#FFD400] transition-colors">
            Official website
          </a>
        </article>
      </div>
    </SectionContainer>
  );
}

export function UseCasesSection() {
  return (
    <SectionContainer
      id="use-cases"
      eyebrow="Use Cases"
      title="Practical outcomes for different business profiles."
      description="Designed to support operational scale, communication reliability, and AI transformation."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {useCases.map((useCase) => (
          <article key={useCase.title} className="rounded-3xl border border-[#222] bg-black p-7">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#111] border border-[#2a2a2a] flex items-center justify-center">
                {useCase.icon}
              </div>
              <h3 className="text-white text-lg font-medium">{useCase.title}</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">{useCase.description}</p>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}

export function AboutSection() {
  return (
    <SectionContainer
      id="about"
      eyebrow="About Us"
      title="A focused technology company building future-ready digital systems."
      description="MPowerspace.ai combines engineering depth with practical product thinking to deliver business impact."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <article className="rounded-3xl border border-[#2a2a2a] bg-[#0a0a0a] p-7">
          <h3 className="text-white text-lg font-medium mb-3">Our Mission</h3>
          <p className="text-gray-400 leading-relaxed">To build secure, scalable, and intelligent digital infrastructure that improves how organizations operate and communicate.</p>
        </article>
        <article className="rounded-3xl border border-[#2a2a2a] bg-[#0a0a0a] p-7">
          <h3 className="text-white text-lg font-medium mb-3">Our Vision</h3>
          <p className="text-gray-400 leading-relaxed">To become a trusted technology reference for businesses adopting AI and modern communication at global scale.</p>
        </article>
        <article className="rounded-3xl border border-[#2a2a2a] bg-[#0a0a0a] p-7">
          <h3 className="text-white text-lg font-medium mb-3">What Makes Us Different</h3>
          <p className="text-gray-400 leading-relaxed">We bridge AI, cloud, and communication into one coherent architecture with measurable business outcomes.</p>
        </article>
      </div>
    </SectionContainer>
  );
}

export function CeoMessageSection() {
  return (
    <SectionContainer
      id="ceo-message"
      eyebrow="Message From The CEO"
      title="Leadership statement"
      description="A commitment to innovation, security, and long-term technology value."
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <aside className="lg:col-span-2 rounded-3xl border border-[#2a2a2a] bg-black p-8">
          <div className="w-28 h-28 rounded-2xl border border-[#333] bg-[#111] flex items-center justify-center text-[#cca900]">
            CEO
          </div>
          <h3 className="mt-5 text-white text-2xl font-semibold">Dr. Belal Maher Alkhudari</h3>
          <p className="text-gray-400 mt-1">CEO, MPowerspace.ai</p>
        </aside>
        <article className="lg:col-span-3 rounded-3xl border border-[#2a2a2a] bg-[#0a0a0a] p-8">
          <blockquote className="text-gray-200 leading-relaxed whitespace-pre-line text-[15px] md:text-base">
            {`At MPowerspace.ai, we are committed to building advanced, scalable, and intelligent digital solutions.

As CEO, I extend my appreciation to the teams behind Cloudflare, Twilio, FusionPBX, and OpenAI for developing the powerful technologies that support modern innovation.

By leveraging these world-class platforms, we have been able to deliver secure, high-performance, and forward-looking services that reflect our vision for the future of technology.

Dr. Belal Maher Alkhudari
CEO, MPowerspace.ai`}
          </blockquote>
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <a href="https://www.cloudflare.com/" target="_blank" rel="noreferrer noopener" className="text-[#cca900] hover:text-[#FFD400] transition-colors">Cloudflare</a>
            <a href="https://www.twilio.com/" target="_blank" rel="noreferrer noopener" className="text-[#cca900] hover:text-[#FFD400] transition-colors">Twilio</a>
            <a href="https://www.fusionpbx.com/" target="_blank" rel="noreferrer noopener" className="text-[#cca900] hover:text-[#FFD400] transition-colors">FusionPBX</a>
            <a href="https://openai.com/" target="_blank" rel="noreferrer noopener" className="text-[#cca900] hover:text-[#FFD400] transition-colors">OpenAI</a>
          </div>
        </article>
      </div>
    </SectionContainer>
  );
}

export function FinalCtaSection() {
  return (
    <section id="cta" className="w-full px-6 py-20 md:py-28 border-t border-[#222]">
      <div className="max-w-6xl mx-auto rounded-[2rem] border border-[#cca900]/45 bg-[linear-gradient(135deg,rgba(204,169,0,0.2),rgba(204,169,0,0.08))] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-white max-w-3xl">
          Ready to build secure, intelligent, and scalable digital infrastructure?
        </h2>
        <p className="mt-5 text-gray-300 max-w-2xl text-base md:text-lg">
          Connect with MPowerspace.ai to discuss your architecture goals and request a tailored product demo.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/contact" prefetch={false} className="inline-flex items-center justify-center gap-2 bg-[#cca900] text-black font-semibold px-7 py-3.5 rounded-xl hover:bg-[#FFD400] transition-colors">
            Request Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/contact" prefetch={false} className="inline-flex items-center justify-center border border-[#cca900]/70 text-[#cca900] font-semibold px-7 py-3.5 rounded-xl hover:bg-black transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CorporatePageFooter() {
  return (
    <footer id="footer" className="w-full px-6 py-14 border-t border-[#222] bg-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="text-2xl font-semibold text-white tracking-tight">
            <span className="text-[#cca900]">M</span>Powerspace.ai
          </p>
          <p className="text-gray-400 mt-2 text-sm">Advanced AI, cloud, and communication systems for modern businesses.</p>
        </div>
        <nav className="flex flex-wrap gap-5 text-sm">
          <a href="#home" className="text-gray-400 hover:text-[#FFD400] transition-colors">Home</a>
          <a href="#features" className="text-gray-400 hover:text-[#FFD400] transition-colors">Features</a>
          <a href="#technology" className="text-gray-400 hover:text-[#FFD400] transition-colors">Technology</a>
          <a href="#about" className="text-gray-400 hover:text-[#FFD400] transition-colors">About</a>
          <Link href="/contact" prefetch={false} className="text-gray-400 hover:text-[#FFD400] transition-colors">Contact</Link>
        </nav>
        <div className="text-sm text-gray-400">
          <p>contact@mpowerspace.ai</p>
          <p className="mt-1">+1 (000) 000-0000</p>
        </div>
      </div>
    </footer>
  );
}
