import { ReferralGrid } from "@/components/ReferralGrid";
import referralsData from "@/data/referrals.json";
import { Referral } from "@/components/ReferralCard";
import { slugifyCategory } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
    const categories = Array.from(new Set(referralsData.map(r => r.category)));
    return categories.map((category) => ({
        slug: slugifyCategory(category),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const categories = Array.from(new Set(referralsData.map(r => r.category)));
    const originalCategory = categories.find(c => slugifyCategory(c) === slug);

    if (!originalCategory) {
        return {};
    }

    return {
        title: `Codes Promo et Parrainages ${originalCategory} - 2026`,
        description: `Comparez les meilleures offres de bienvenue et codes promos de la catégorie ${originalCategory}. Des crédits offerts et primes vérifiées en 2026.`,
        alternates: {
            canonical: `/categorie/${slug}`
        }
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const categories = Array.from(new Set(referralsData.map(r => r.category)));
    const originalCategory = categories.find(c => slugifyCategory(c) === slug);

    if (!originalCategory) {
        notFound();
    }

    const categoryReferrals = (referralsData as Referral[]).filter(r => r.category === originalCategory);

    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `Offres de parrainage ${originalCategory}`,
        "numberOfItems": categoryReferrals.length,
        "itemListElement": categoryReferrals.map((ref, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": `Code parrainage ${ref.name} : ${ref.advantage}`,
            "url": `https://codes-de-parrainages.com/parrainage-${ref.slug}`
        }))
    };

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
                "name": `Catégorie ${originalCategory}`,
                "item": `https://codes-de-parrainages.com/categorie/${slug}`
            }
        ]
    };

    return (
        <main className="flex flex-col items-center min-h-screen pb-20 pt-16 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <div className="w-full max-w-6xl text-center mb-16 relative">
                <nav className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 mb-12 overflow-x-auto whitespace-nowrap">
                    <Link href="/" className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Home size={16} />
                        <span>Accueil</span>
                    </Link>
                    <ChevronRight size={14} className="text-slate-300 dark:text-slate-700 flex-shrink-0" />
                    <span className="text-slate-900 dark:text-slate-300 font-bold uppercase tracking-widest text-xs">
                        {originalCategory}
                    </span>
                </nav>
                <div className="inline-block py-2 px-4 rounded-2xl bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6">
                    Explorer la catégorie
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8 leading-tight">
                    Parrainages <span className="text-primary">{originalCategory}</span>
                </h1>
                <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Comparez les meilleures offres et primes de bienvenue vérifiées par nos experts pour la thématique {originalCategory}.
                </p>
            </div>

            <div className="w-full max-w-5xl">
                <ReferralGrid
                    referrals={categoryReferrals}
                    activeCategoryName={originalCategory}
                />
            </div>

            {/* Texte SEO pour enrichir la page catégorie */}
            <div className="w-full max-w-4xl mx-auto mt-24 p-10 glass-card bg-white/50 dark:bg-slate-900/50">
                <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight border-l-4 border-primary pl-6">
                        Expertise & Conseils : {originalCategory}
                    </h2>
                    <p>
                        Le secteur de la thématique <strong>{originalCategory}</strong> est en pleine mutation en 2026. Pour récompenser votre fidélité, les meilleures plateformes proposent des programmes de parrainage exclusifs.
                    </p>
                    <p>
                        Notre catalogue liste les offres testées et vérifiées. En utilisant nos codes d&apos;invitation, vous profitez de :
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10 not-prose">
                        <div className="p-6 rounded-2xl bg-white/50 dark:bg-slate-950/50 border border-slate-200/50 dark:border-slate-800/50">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">💰 Primes de cash</h3>
                            <p className="text-sm">Argent crédité immédiatement sur votre compte.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/50 dark:bg-slate-950/50 border border-slate-200/50 dark:border-slate-800/50">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2">🛡️ Sécurité garantie</h3>
                            <p className="text-sm">Toutes nos offres sont validées manuellement.</p>
                        </div>
                    </div>
                    <p className="text-sm font-bold opacity-60 uppercase tracking-widest mt-12 bg-slate-100 dark:bg-slate-800 py-2 px-4 rounded-xl inline-block">
                        ⚠️ Important : Offres limitées dans le temps
                    </p>
                </div>
            </div>
        </main>
    );
}
