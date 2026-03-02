import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "ParraineMoi - Mes meilleurs codes de parrainage",
  description: "Découvrez mes codes de parrainage pour bénéficier des meilleures offres de bienvenue sur les banques, applications d'investissement et plus.",
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
