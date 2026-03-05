import { ReferralGrid } from "@/components/ReferralGrid";
import referralsData from "@/data/referrals.json";
import { Referral } from "@/components/ReferralCard";
import { slugifyCategory } from "@/lib/utils";
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

    return (
        <main className="flex flex-col items-center min-h-screen pb-20 pt-16 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
            />
            <div className="w-full max-w-5xl text-center mb-12">
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
        </main>
    );
}
