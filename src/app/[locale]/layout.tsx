import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mpower Space | 100% Anti-Spy Call Encryption",
  description: "Call freely from anywhere in the world using your own phone number under total encryption. Mpower Space offers military-grade voice encryption and zero-compute architecture.",
  keywords: ["Mpower Space", "call encryption", "secure calls", "anti-spy phone calls", "WebRTC calls", "enterprise communication", "crypto wallet", "zero-compute architecture", "VPN for voice"],
  openGraph: {
    title: "Mpower Space | 100% Anti-Spy Call Encryption",
    description: "Call freely from anywhere in the world using your own phone number under total encryption. Mpower Space offers military-grade voice encryption.",
    url: "https://mpowerspace.ai",
    siteName: "Mpower Space",
    images: [
      {
        url: "https://mpowerspace.ai/logo.png",
        width: 800,
        height: 600,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mpower Space | 100% Anti-Spy Call Encryption",
    description: "Make international calls under total encryption. Like a VPN for your voice.",
    images: ["https://mpowerspace.ai/logo.png"],
  },
  alternates: {
    canonical: "https://mpowerspace.ai",
    languages: {
      'en': 'https://mpowerspace.ai/en',
      'ar': 'https://mpowerspace.ai/ar',
      'es': 'https://mpowerspace.ai/es',
      'ro': 'https://mpowerspace.ai/ro',
      'pt': 'https://mpowerspace.ai/pt',
      'fr': 'https://mpowerspace.ai/fr',
      'de': 'https://mpowerspace.ai/de',
      'zh': 'https://mpowerspace.ai/zh'
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = (locale === 'ar' || locale === 'he') ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-[#cca900] selection:text-black">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for(let registration of registrations) {
                    registration.unregister();
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
