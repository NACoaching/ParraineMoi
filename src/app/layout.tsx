import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "ParraineMoi - Codes de Parrainage, Bons Plans & Crédits Offerts",
  description: "Découvrez mes codes promo et liens de parrainage validés pour bénéficier des meilleures offres de bienvenue sur les banques, la crypto, le shopping et plus encore.",
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
      </body>
    </html>
  );
}
