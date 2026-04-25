import { ArrowLeft, Calendar, User, ShieldCheck, ServerOff, Cpu } from "lucide-react";
import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";

// This simulates a database or CMS for the blog posts
const BLOG_POSTS = {
  "1": {
    title: "Why Modern VoIP is Broken (And How We Fixed It)",
    date: "April 24, 2026",
    author: "Dr. Belal",
    content: `
      The traditional telecommunications infrastructure is fundamentally broken. When you make a call using standard VoIP applications, your voice data is routed through centralized servers. These servers act as massive honey-pots, collecting metadata, IP addresses, and often the unencrypted audio streams themselves.

      At MPower Space, we realized that adding layers of encryption over a broken foundation was not enough. The server itself had to be eliminated from the trust equation.

      ### Enter Zero-Compute Architecture
      Our proprietary Zero-Compute architecture ensures that your encrypted calls are routed directly from peer to peer. We store nothing. We track nothing. Your device does the heavy lifting, acting as an impenetrable VPN for your voice.

      By removing the central processing node, we have made it mathematically and physically impossible for any third party—including ourselves—to intercept, record, or analyze your conversations. Privacy is no longer a feature; it is the physical law of our network.
    `
  },
  "2": {
    title: "The Illusion of End-to-End Encryption in Mainstream Apps",
    date: "April 20, 2026",
    author: "Mpower Security Team",
    content: `
      Many popular communication applications loudly market their "End-to-End Encryption" (E2EE). However, what they fail to disclose in their marketing material is the vast amount of metadata they still collect and monetize.

      Who you call, when you call them, from what IP address, and for how long—this metadata is often more valuable to data brokers and surveillance agencies than the actual content of the conversation.

      ### The MPower Space Difference
      True privacy requires absolute anonymity at the metadata level. MPower Space does not log your connection history on our servers. Our decentralized nodes facilitate the handshake between you and your recipient and immediately discard the routing information. 

      When you use MPower Space, you aren't just encrypting your words; you are erasing your digital footprints.
    `
  },
  "3": {
    title: "Introducing Biometric Application Access",
    date: "April 15, 2026",
    author: "Engineering Team",
    content: `
      Network encryption is useless if the device itself is compromised. Recognizing this, the MPower Space engineering team has rolled out next-generation Biometric Application Access.

      ### Hardware-Level Security
      Before the MPower Space app even initializes its decryption keys, it requires hardware-level biometric authentication (Face ID or Fingerprint) directly from your device's secure enclave. 

      This ensures that even if your physical device is seized, unlocked, or cloned, your communication hub remains an impenetrable fortress. Your voice is yours alone.
    `
  }
};

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = BLOG_POSTS[id as keyof typeof BLOG_POSTS];

  if (!post) {
    notFound();
  }

  // Convert markdown-like text to HTML paragraphs
  const formattedContent = post.content.split('\n\n').map((paragraph, index) => {
    if (paragraph.trim().startsWith('###')) {
      return <h3 key={index} className="text-2xl font-bold text-white mt-10 mb-4">{paragraph.replace('###', '').trim()}</h3>;
    }
    return <p key={index} className="text-gray-400 leading-relaxed mb-6 text-lg">{paragraph.trim()}</p>;
  });

  return (
    <main className="flex flex-col w-full min-h-screen font-sans bg-black text-white pt-32 px-6 pb-32">
      <article className="max-w-3xl mx-auto w-full">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#cca900] hover:text-white transition-colors mb-12 font-semibold">
          <ArrowLeft size={20} className="rtl:rotate-180" />
          Back to Blog
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-[#222] pb-8">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#cca900]" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-[#cca900]" />
              {post.author}
            </div>
            <div className="flex items-center gap-2 bg-[#cca900]/10 text-[#cca900] px-3 py-1 rounded-full font-semibold border border-[#cca900]/20 ml-auto">
              <ShieldCheck size={14} />
              Verified Architecture
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          {formattedContent}
        </div>

        <div className="mt-20 p-8 rounded-3xl bg-[#0A0A0A] border border-[#222] text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to reclaim your privacy?</h3>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Join visionary leaders who trust MPower Space to make free, un-spyable international calls.</p>
          <Link href="/download" className="inline-flex items-center justify-center gap-2 bg-[#cca900] text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#b39500] transition-colors shadow-[0_0_20px_rgba(204,169,0,0.2)]">
            Download App
          </Link>
        </div>
      </article>
    </main>
  );
}