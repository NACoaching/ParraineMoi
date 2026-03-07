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
            <div className="w-full max-w-5xl text-center mb-12 relative">
                <nav className="absolute top-0 left-0 -translate-y-12 flex items-center gap-2 text-sm font-medium text-slate-500 overflow-x-auto whitespace-nowrap hidden md:flex">
                    <Link href="/" className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <Home size={16} />
                        <span>Accueil</span>
                    </Link>
                    <ChevronRight size={14} className="text-slate-300 dark:text-slate-700 flex-shrink-0" />
                    <span className="text-slate-900 dark:text-slate-300 font-semibold">
                        {originalCategory}
                    </span>
                </nav>
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                    Catégorie
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                    Parrainages <span className="text-primary">{originalCategory}</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Découvrez ma sélection des meilleures offres et primes de bienvenue pour la thématique {originalCategory}.
                </p>
            </div>

            <div className="w-full max-w-5xl">
                <ReferralGrid
                    referrals={categoryReferrals}
                    activeCategoryName={originalCategory}
                />
            </div>

            {/* Texte SEO pour enrichir la page catégorie */}
            <div className="w-full max-w-4xl mx-auto mt-16 p-8 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem]">
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        Pourquoi utiliser un code de parrainage {originalCategory} ?
                    </h2>
                    <p>
                        Le secteur de la thématique <strong>{originalCategory}</strong> est très concurrentiel. Pour se démarquer et attirer de nouveaux utilisateurs, la grande majorité des applications et plateformes proposent des programmes de parrainage très avantageux ou des codes promos de bienvenue exclusifs.
                    </p>
                    <p>
                        Notre catalogue liste les meilleures offres testées, mises à jour et vérifiées en temps réel pour l&apos;année {new Date().getFullYear()}. En utilisant ces liens de redirection ou en appliquant nos codes d&apos;invitation lors de votre inscription, vous pouvez bénéficier de :
                    </p>
                    <ul>
                        <li><strong>Primes d&apos;ouverture de compte :</strong> De l&apos;argent directement crédité sur votre nouveau compte.</li>
                        <li><strong>Réductions immédiates :</strong> Un pourcentage de remise sur vos premiers achats ou abonnements.</li>
                        <li><strong>Frais offerts :</strong> Gratuité sur des opérations normalement payantes (livraison, transactions, etc.).</li>
                    </ul>
                    <p className="text-sm italic mt-6">
                        Attention : vérifiez toujours les conditions générales de chaque offre. Les primes {originalCategory} nécessitent souvent l&apos;activation d&apos;un compte, un premier dépôt minimum, ou la réalisation d&apos;un premier achat pour être débloquées.
                    </p>
                </div>
            </div>
        </main>
    );
}
