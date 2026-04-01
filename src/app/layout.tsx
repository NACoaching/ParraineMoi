import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
    default: "Codes de Parrainage 🎁 Jusqu’à 200€ Offerts — Vérifiés 2026",
    template: "%s | Codes de Parrainages"
  },
  description: "Trouvez le meilleur code de parrainage pour votre banque en ligne, néo-banque ou appli crypto. Offres vérifiées en mars 2026 : Revolut, Fortuneo, N26, Sumeria... Jusqu’à 200€ de bonus !",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://codes-de-parrainages.com",
    siteName: "Codes de Parrainages",
    title: "Codes de Parrainage 🎁 Jusqu’à 200€ Offerts — Vérifiés 2026",
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
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.png",
        color: "#2563eb",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Codes de Parrainages",
  "url": "https://codes-de-parrainages.com",
  "logo": "https://codes-de-parrainages.com/favicon.png",
  "sameAs": [
    "https://www.linkedin.com/in/nolwen-albanesi"
  ],
};

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
        <Navbar />
        <div className="flex-1 w-full max-w-5xl mx-auto">
          {children}
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
