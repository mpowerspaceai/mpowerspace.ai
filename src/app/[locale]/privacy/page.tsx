import { ShieldCheck, Lock, EyeOff, ServerOff } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col w-full min-h-screen font-sans bg-black text-white pt-32 px-6 pb-32">
      <div className="max-w-4xl mx-auto w-full">
        
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-[#cca900]/30 bg-[#cca900]/10 text-[#cca900] text-sm font-semibold mb-8">
          <ShieldCheck size={16} />
          <span>Enterprise Grade Privacy</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Privacy <span className="text-[#cca900]">Policy</span>
        </h1>
        <p className="text-gray-400 mb-16">Last Updated: April 25, 2026</p>

        <div className="space-y-12 text-gray-300 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <ServerOff className="text-[#cca900]" size={24} />
              1. Our Zero-Compute Philosophy
            </h2>
            <p>
              At MPower Space, our foundational architecture is designed around one core principle: <strong>We cannot spy on you even if we wanted to.</strong> Our Zero-Compute local architecture means that your voice data is encrypted and decrypted locally on your device. We do not store, process, or analyze your audio streams on our central servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <EyeOff className="text-[#cca900]" size={24} />
              2. Information We Collect
            </h2>
            <p className="mb-4">Because our system is built for absolute privacy, we collect the absolute minimum data required to facilitate a connection:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> Your phone number (used strictly for authentication via OTP).</li>
              <li><strong>Billing Information:</strong> Transaction IDs and encrypted payment tokens (processed securely by Stripe or PayPal). We do not store full credit card details.</li>
              <li><strong>Connection Metadata:</strong> Temporary signaling data (SDP/ICE candidates) required to establish the WebRTC peer-to-peer connection. This data is volatile and discarded immediately after the call is established.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Lock className="text-[#cca900]" size={24} />
              3. Information We Do NOT Collect
            </h2>
            <p className="mb-4">To be absolutely clear, MPower Space <strong>never</strong> collects, records, or has access to:</p>
            <ul className="list-disc pl-6 space-y-2 text-[#cca900] font-medium">
              <li>The content of your voice or video calls.</li>
              <li>The transcription or summary of your calls (all AI processing is done 100% locally on your hardware).</li>
              <li>Your GPS location or physical tracking data.</li>
              <li>Your device's address book or contact lists (unless explicitly granted for local-only use).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Services</h2>
            <p>
              We integrate with select third-party services strictly for billing and SMS delivery (e.g., Twilio for OTP, PayPal/Stripe for payments). These services are bound by strict enterprise confidentiality agreements. We do not sell, rent, or share your personal data with marketing agencies, data brokers, or advertising networks (including Google or Meta/Facebook).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Law Enforcement & Compliance</h2>
            <p>
              MPower Space operates under the strict legal framework of our jurisdiction. However, due to our Zero-Compute mathematical encryption model, we do not possess the cryptographic keys required to decrypt user communications. Therefore, even under a legal subpoena, we cannot provide the content of your calls to any government or law enforcement agency, because that data simply does not exist on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, our encryption standards, or our data handling practices, please contact our security team at:
              <br />
              <a href="mailto:security@mpowerspace.ai" className="text-[#cca900] hover:underline font-bold mt-2 inline-block">security@mpowerspace.ai</a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}