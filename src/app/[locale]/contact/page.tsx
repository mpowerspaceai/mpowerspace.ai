import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function ContactPage() {
  return (
    <main className="flex flex-col w-full min-h-screen font-sans bg-black text-white pt-32 px-6 pb-32">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Contact <span className="text-[#cca900]">Us</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Reach out to our secure support team. We value your privacy and respond with uncompromising confidentiality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-10">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[#cca900]/10 border border-[#cca900]/20 flex items-center justify-center shrink-0">
                <Mail size={24} className="text-[#cca900]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Encrypted Support</h3>
                <p className="text-gray-400 leading-relaxed">contact@mpowerspace.ai</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[#cca900]/10 border border-[#cca900]/20 flex items-center justify-center shrink-0">
                <Phone size={24} className="text-[#cca900]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">VIP Sales</h3>
                <p className="text-gray-400 leading-relaxed">+44 757 756 3300</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[#cca900]/10 border border-[#cca900]/20 flex items-center justify-center shrink-0">
                <MapPin size={24} className="text-[#cca900]" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Global Headquarters</h3>
                <a 
                  href="https://maps.app.goo.gl/oxw8jrGZiSWh2p6h8" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#cca900] transition-colors leading-relaxed underline decoration-[#cca900]/50 underline-offset-4"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-[#0A0A0A] border border-[#222] p-8 md:p-10 rounded-3xl flex flex-col gap-6 relative overflow-hidden shadow-[0_0_30px_rgba(204,169,0,0.02)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#cca900]/5 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">Send an Inquiry</h3>
              <p className="text-sm text-gray-400 mb-6">Our team will respond via secure channels.</p>
              
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-300">Secure Identifier / Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-black border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cca900] transition-colors"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-300">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-black border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cca900] transition-colors"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-300">Message</label>
                  <textarea 
                    placeholder="How can we assist you securely?" 
                    rows={4}
                    className="w-full bg-black border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#cca900] transition-colors resize-none"
                  />
                </div>
                
                <button type="button" className="w-full bg-[#cca900] text-black font-bold text-lg py-4 rounded-lg hover:bg-[#b39500] transition-colors mt-2 shadow-[0_0_20px_rgba(204,169,0,0.2)]">
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}