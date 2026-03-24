import { Metadata } from 'next';
import Link from 'next/link';
import guidesData from '@/data/guides.json';
import { GuidesGrid } from '@/components/GuidesGrid';
import { BookOpen, Calendar, Clock, ArrowRight, Home, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Guides Bons Plans 📚 : Astuces Parrainage, Banque & Crypto 2026',
    description: 'Tutoriels et guides pratiques pour maximiser vos bonus de parrainage en 2026. Comment ouvrir un compte Revolut, Fortuneo ou Sumeria — et toucher jusqu’à 200€ offerts.',
    alternates: {
        canonical: "/guides",
    },
};

export default function GuidesPage() {
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://codes-de-parrainages.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Guides & Astuces",
                "item": "https://codes-de-parrainages.com/guides"
            }
        ]
    };

    return (
        <main className="flex flex-col items-center min-h-screen pb-20 pt-16 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-12 overflow-x-auto whitespace-nowrap pb-2 w-full max-w-4xl">
                <Link href="/" className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <Home size={16} />
                    <span>Accueil</span>
                </Link>
                <ChevronRight size={14} className="text-slate-300 dark:text-slate-700 flex-shrink-0" />
                <span className="text-slate-900 dark:text-slate-300 font-semibold truncate">
                    Guides & Astuces
                </span>
            </nav>
            <section className="w-full max-w-4xl">
                <div className="text-center mb-20">
                    <div className="inline-block py-2 px-4 rounded-2xl bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6">
                        Expertise & Stratégie
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8 leading-tight">
                        Guides & <span className="text-primary">Bons Plans</span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Toutes les astuces détaillées pour maximiser vos gains et optimiser votre budget au quotidien.
                    </p>
                </div>

                <GuidesGrid guides={guidesData} />
            </section>
        </main>
    );
}
