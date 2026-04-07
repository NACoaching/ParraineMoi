import { ReferralGrid } from "@/components/ReferralGrid";
import referralsData from "@/data/referrals.json";
import guidesData from "@/data/guides.json";
import { Referral } from "@/components/ReferralCard";
import { slugifyCategory } from "@/lib/utils";
import { ChevronRight, Home, BookOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
    const categories = Array.from(new Set(referralsData.map(r => r.category)));
    return categories.map((category) => ({
        slug: slugifyCategory(category),
    }));
}

const categorySeoContent: Record<string, { intro: string, subtitle: string }> = {
    "Banque & Finance": {
        intro: "Les banques en ligne et néobanques mènent une guerre féroce pour attirer de nouveaux clients professionnels comme particuliers. Pour se démarquer, des établissements comme Fortuneo, Boursorama ou Revolut proposent d'importantes primes d'ouverture de compte crédités directement sur votre nouveau solde.",
        subtitle: "L'avantage de la finance numérique"
    },
    "Crypto": {
        intro: "Les plateformes d'échange de cryptomonnaies (exchanges) et les courtiers (brokers) offrent des bonus d'inscription très attractifs. Souvent versés en Bitcoin ou en stablecoins lors de votre premier dépôt qualifiant, ces bonus en cashback ou crédits offerts sont un excellent tremplin pour lisser vos frais de trading initiaux.",
        subtitle: "Boostez votre portefeuille crypto"
    },
    "Shopping": {
        intro: "Le cashback et les bons plans d'affiliation e-commerce explosent. Les applications de shopping en ligne encouragent massivement les programmes de parrainage pour vous faire découvrir des marchands partenaires (Rakuten, eBuyClub, Poulpeo) ou vous offrir des réductions en cagnotte lors de votre première commande.",
        subtitle: "Votre pouvoir d'achat optimisé"
    },
    "Énergie & Internet": {
        intro: "Changer de fournisseur d'accès à Internet ou de contrat d'électricité est devenu le meilleur moyen de faire des économies mensuelles. Les fournisseurs récompensent systématiquement le bouche-à-oreille avec de généreuses réductions sur factures ou virements bancaires lors de la souscription avec un code parrain.",
        subtitle: "Réduisez vos factures fixes"
    },
    "Jeux & Gains": {
        intro: "Le secteur des jeux rémunérateurs, sondages et applications ludiques récompense très bien l'acquisition. Les offres d'inscription pour de nouveaux utilisateurs vous permettent souvent de recevoir des jetons, des tickets ou même de la monnaie fiat pour démarrer votre progression dans l'écosystème du jeu.",
        subtitle: "Démarrage ludique accéléré"
    }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const categories = Array.from(new Set(referralsData.map(r => r.category)));
    const originalCategory = categories.find(c => slugifyCategory(c) === slug);

    if (!originalCategory) {
        return {};
    }

    const currentYear = new Date().getFullYear();

    const categoryTitles: Record<string, string> = {
        "Banque & Finance": `Codes Parrainage Banque en Ligne ${currentYear} → Jusqu’à 200€ Offerts`,
        "Crypto": `Codes Parrainage Crypto ${currentYear} → Bonus Vérifiés BTC & Stablecoins`,
        "Shopping": `Codes Parrainage Cashback ${currentYear} → Réductions & Cagnotte`,
        "Énergie & Internet": `Codes Parrainage Énergie & Internet ${currentYear} → Factures Réduites`,
        "Jeux & Gains": `Codes Parrainage Jeux ${currentYear} → Bonus et Gains Réels`,
    };

    const categoryDescs: Record<string, string> = {
        "Banque & Finance": `Comparez les meilleures offres de parrainage pour banques en ligne et néobanques en ${currentYear} : Fortuneo, Revolut, N26, Sumeria, Boursorama. Jusqu’à 200€ de prime !`,
        "Crypto": `Les meilleurs codes parrainage crypto en ${currentYear} : Binance, Bybit, Coinbase, Kraken, Bitstack. Bonus BTC, stablecoins et réductions de frais vérifiés.`,
        "Shopping": `Codes parrainage cashback et e-commerce vérifiés en ${currentYear} : iGraal, eBuyClub, Poulpeo, Joko. Réductions immédiates sur vos achats.`,
        "Énergie & Internet": `Codes parrainage énergie et fournisseurs internet ${currentYear} : économisez sur vos factures avec des primes de bienvenue vérifiées.`,
        "Jeux & Gains": `Codes parrainage jeux et applications rémunératrices en ${currentYear} : bonus de démarrage vérifiés pour maximiser vos gains réels.`,
    };

    const title = categoryTitles[originalCategory] || `Parrainages ${originalCategory} ${currentYear} → Offres Vérifiées`;
    const desc = categoryDescs[originalCategory] || `Meilleures offres de parrainage et codes promo ${originalCategory} en ${currentYear}. Primes de bienvenue testées et vérifiées.`;

    return {
        title,
        description: desc,
        alternates: {
            canonical: `/categorie/${slug}`
        },
        openGraph: {
            title,
            description: desc,
            url: `https://codes-de-parrainages.com/categorie/${slug}`,
            images: ["/og-image.png"],
        },
        twitter: {
            title,
            description: desc,
            images: ["/og-image.png"],
        },
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const originalCategory = Array.from(new Set(referralsData.map(r => r.category))).find(
        cat => slugifyCategory(cat) === slug
    );

    if (!originalCategory) {
        notFound();
    }

    const categoryReferrals = (referralsData as Referral[]).filter((r) => r.category === originalCategory);
    const categoryGuides = guidesData.filter((g) => g.category === originalCategory);

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

            <div className="w-full max-w-5xl mt-24">
                <ReferralGrid
                    referrals={categoryReferrals}
                    activeCategoryName={originalCategory}
                />
            </div>

            {/* Guides Section */}
            {categoryGuides.length > 0 && (
                <div className="w-full max-w-5xl mt-24 px-4 lg:px-0">
                    <h2 className="text-3xl flex items-center gap-3 font-bold text-slate-900 dark:text-white mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
                        <BookOpen className="text-primary" size={32} />
                        Nos guides et astuces {originalCategory}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {categoryGuides.map((g) => (
                            <Link href={`/${g.slug}`} key={g.slug} className="group glass-card bg-white/50 dark:bg-slate-900/50 p-8 rounded-[2rem] hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all block h-full border border-slate-200 dark:border-slate-800">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-primary mb-3">
                                    {g.title}
                                </h3>
                                <p className="text-sm text-slate-500 mb-6 line-clamp-2">
                                    {g.excerpt}
                                </p>
                                <div className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                                    Lire le guide <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Texte SEO pour enrichir la page catégorie */}
            <div className="w-full max-w-4xl mx-auto mt-24 p-10 glass-card bg-white/50 dark:bg-slate-900/50">
                <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight border-l-4 border-primary pl-6">
                        Expertise & Conseils : {originalCategory}
                    </h2>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-4 mb-2">
                        {categorySeoContent[originalCategory]?.subtitle || `Les opportunités en ${originalCategory}`}
                    </h3>
                    <p>
                        {categorySeoContent[originalCategory]?.intro || `Le secteur de la thématique ${originalCategory} est en pleine mutation en 2026. Pour récompenser votre fidélité, les meilleures plateformes proposent des programmes de parrainage exclusifs.`}
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
