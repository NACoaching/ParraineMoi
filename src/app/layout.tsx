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
    default: "Codes de Parrainages - Bons Plans & Crédits Offerts",
    template: "%s | Codes de Parrainages"
  },
  description: "Découvrez ma sélection des meilleurs codes de parrainage et offres de bienvenue pour Fortuneo, Revolut, Binance et bien d'autres (banques, shopping, crypto). Profitez de réductions immédiates et de crédits offerts à l'inscription en utilisant mes invitations exclusives.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://codes-de-parrainages.com",
    siteName: "Codes de Parrainages",
    title: "Codes de Parrainages - Bons Plans & Crédits Offerts",
    description: "Les meilleurs codes de parrainage vérifiés en 2026 pour vos banques, crypto et shopping.",
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
    title: "Codes de Parrainages - Bons Plans & Crédits Offerts",
    description: "Les meilleurs codes de parrainage vérifiés en 2026.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "jhAld53ZzNbHKFOdtQiZ9bbwe6NyJkbUucGBcSHUkvc",
  },

  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
      <body className={`${ibmPlexSans.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground`}>
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
