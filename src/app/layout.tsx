import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CopyToast } from "@/components/CopyToast";
import { Analytics } from "@vercel/analytics/react";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import type { Metadata, Viewport } from "next";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codes-de-parrainages.com"),
  title: {
    default: "Codes de Parrainages 2026 🎁 Jusqu'à 200€ Offerts",
    template: "%s"
  },
  description: "Les meilleurs codes de parrainage vérifiés en 2026 : Fortuneo, Revolut, BoursoBank, N26, Coinhouse... Profitez de vos primes de bienvenue en 5 min !",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://codes-de-parrainages.com",
    siteName: "Codes de Parrainages",
    title: "Codes de Parrainages 🎁 Jusqu’à 200€ Offerts — Vérifiés 2026",
    description: "Comparez les meilleurs codes de parrainage 2026 : banques en ligne, crypto, cashback. Jusqu’à 200€ de bonus offerts — offres testées et vérifiées chaque semaine.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Codes de Parrainages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codes de Parrainages 2026 : Meilleurs Bons Plans ✓",
    description: "🎁 Les meilleurs codes de parrainage vérifiés en 2026. Profitez de bonus à l'inscription !",
    images: ["/og-image.png"],
  },
  verification: {
    google: "jhAld53ZzNbHKFOdtQiZ9bbwe6NyJkbUucGBcSHUkvc",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Codes de Parrainages",
    "alternateName": [
      "Codes de parrainages",
      "Codes de Parrainage",
      "Codes de parrainage",
      "codes-de-parrainages.com"
    ],
    "url": "https://codes-de-parrainages.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://codes-de-parrainages.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Codes de Parrainages",
    "url": "https://codes-de-parrainages.com",
    "logo": "https://codes-de-parrainages.com/favicon.png"
  }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${ibmPlexSans.className} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Subtle ambient lighting / Mesh gradient - Fintech Lumineuse */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-blue-400/12 via-indigo-300/10 to-emerald-400/10 blur-[130px] rounded-full" />
          <div className="absolute top-[650px] -left-48 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/6 to-cyan-300/6 blur-[120px] rounded-full" />
          <div className="absolute top-[1400px] -right-48 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-400/6 to-emerald-300/6 blur-[120px] rounded-full" />
        </div>

        <Navbar />
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6">
          {children}
        </div>
        <ScrollToTop />
        <CopyToast />
        <Footer />
        <Analytics />
        {/* Referral Pulse Tracker */}
        <script
          defer
          src="https://affiliate-tracker-nacoachings-projects.vercel.app/tracker.js"
          data-site="codes-de-parrainages.com"
        />
      </body>
    </html>
  );
}
