import Link from 'next/link';
import referralsData from '@/data/referrals.json';
import guidesData from '@/data/guides.json';
import { slugifyCategory } from '@/lib/utils';
import { Home, ChevronRight, List, BookOpen, Tag } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Plan du Site | Codes de Parrainages',
    description: 'Retrouvez l\'intégralité de nos offres de parrainage, guides et catégories sur une seule page.',
};

export default function SitemapPage() {
    const categories = Array.from(new Set(referralsData.map((r) => r.category))).sort();

    return (
        <main className="min-h-screen px-4 py-12 sm:px-6 sm:py-20 max-w-4xl mx-auto">
            {/* Breadcrumb Visual */}
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-12">
                <Link href="/" className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                    <Home size={16} />
                    <span>Accueil</span>
                </Link>
                <ChevronRight size={14} className="text-slate-300" />
                <span className="text-slate-900 font-semibold">Plan du site</span>
            </nav>

            <header className="mb-16">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                    Plan du site
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed">
                    Explorez l'intégralité de notre répertoire d'offres et de guides. Cette page regroupe tous les liens internes pour une navigation simplifiée.
                </p>
            </header>

            <div className="space-y-16">
                {/* Parrainages par Catégorie */}
                <section>
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
                        <Tag className="text-primary" size={24} />
                        <h2 className="text-2xl font-bold text-slate-900">Offres de Parrainage</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {categories.map((cat) => (
                            <div key={cat} className="space-y-4">
                                <Link 
                                    href={`/categorie/${slugifyCategory(cat)}`}
                                    className="inline-block text-lg font-bold text-primary hover:underline"
                                >
                                    {cat}
                                </Link>
                                <ul className="space-y-2 border-l-2 border-slate-100 pl-4 ml-1">
                                    {referralsData
                                        .filter((r) => r.category === cat)
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map((ref) => (
                                            <li key={ref.slug}>
                                                <Link 
                                                    href={`/parrainage-${ref.slug}`}
                                                    className="text-slate-600 hover:text-slate-900 transition-colors text-sm py-1 inline-block"
                                                >
                                                    {ref.name} — {ref.advantage}
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Guides */}
                <section>
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
                        <BookOpen className="text-primary" size={24} />
                        <h2 className="text-2xl font-bold text-slate-900">Guides & Astuces</h2>
                    </div>
                    
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                        {guidesData.map((guide) => (
                            <li key={guide.slug}>
                                <Link 
                                    href={`/guides/${guide.slug}`}
                                    className="text-slate-600 hover:text-slate-900 transition-colors text-sm py-1 inline-block"
                                >
                                    {guide.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Pages Statiques */}
                <section>
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
                        <List className="text-primary" size={24} />
                        <h2 className="text-2xl font-bold text-slate-900">Informations</h2>
                    </div>
                    
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                        <li>
                            <Link href="/" className="text-slate-600 hover:text-slate-900 text-sm">
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link href="/guides" className="text-slate-600 hover:text-slate-900 text-sm">
                                Tous les guides
                            </Link>
                        </li>
                        <li>
                            <Link href="/mentions-legales" className="text-slate-600 hover:text-slate-900 text-sm">
                                Mentions Légales
                            </Link>
                        </li>
                        <li>
                            <Link href="/politique-de-confidentialite" className="text-slate-600 hover:text-slate-900 text-sm">
                                Politique de Confidentialité
                            </Link>
                        </li>
                        <li>
                            <Link href="/a-propos" className="text-slate-600 hover:text-slate-900 text-sm">
                                À propos
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
        </main>
    );
}
