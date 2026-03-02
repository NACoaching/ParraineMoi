import { Navbar } from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Codes de Parrainages - Bons Plans & Crédits Offerts",
  description: "Découvrez ma sélection des meilleurs codes de parrainage et offres de bienvenue pour Fortuneo, Revolut, Binance et bien d'autres (banques, shopping, crypto). Profitez de réductions immédiates et de crédits offerts à l'inscription en utilisant mes invitations exclusives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 w-full max-w-5xl mx-auto">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
