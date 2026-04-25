import { ArrowLeft, Calendar, User, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Why Modern VoIP is Broken (And How We Fixed It)",
    excerpt: "Discover the critical vulnerabilities in standard VoIP services and learn how our Zero-Compute Architecture creates a mathematical impossibility for surveillance.",
    date: "April 24, 2026",
    author: "Dr. Belal",
  },
  {
    id: 2,
    title: "The Illusion of End-to-End Encryption in Mainstream Apps",
    excerpt: "Many popular communication apps claim E2E encryption, but metadata and centralized servers betray your privacy. Here is the truth.",
    date: "April 20, 2026",
    author: "Mpower Security Team",
  },
  {
    id: 3,
    title: "How to Keep Your Identity While Calling Internationally",
    excerpt: "Learn how Mpower Space allows you to use your exact phone number globally while shielding it under our impenetrable VPN for voice.",
    date: "April 15, 2026",
    author: "Dr. Belal",
  }
];

export default function BlogPage() {
  return (
    <main className="flex flex-col w-full min-h-screen font-sans bg-black text-white pt-32 px-6 pb-32">
      <div className="max-w-5xl mx-auto w-full">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          The <span className="text-[#FFD400]">Blog</span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mb-16 leading-relaxed">
          Insights, technical deep-dives, and updates on how Mpower Space is rewriting the rules of global communication privacy.
        </p>

        <div className="grid grid-cols-1 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link key={post.id} href={`/blog`} className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#222] hover:border-[#FFD400]/50 transition-colors group cursor-pointer block">
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#FFD400]" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-[#FFD400]" />
                  <span>{post.author}</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-[#FFD400] transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <div className="flex items-center text-[#FFD400] font-semibold text-sm">
                Read Full Article <ChevronRight size={16} className="ml-1 rtl:rotate-180 rtl:mr-1 rtl:ml-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}