import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, TrendingUp, Clock, ExternalLink, Info, ChevronRight, Home, Gift, CheckCircle2 } from 'lucide-react';
import { CompanyLogo } from '@/components/CompanyLogo';
import { StickyCopyBar } from '@/components/StickyCopyBar';
import { FaqAccordion } from '@/components/FaqAccordion';
import { DetailCodeBox } from '@/components/DetailCodeBox';
import { referrals, guides } from '@/lib/data';
import { Referral, ReferralCard } from '@/components/ReferralCard';
import { slugifyCategory, formatVerifiedDate } from '@/lib/utils';

export async function generateStaticParams() {
    return referrals.map((referral) => ({
        slug: `parrainage-${referral.slug}`,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;

    if (!slug.startsWith('parrainage-')) {
        return {};
    }

    const brandSlug = slug.replace('parrainage-', '');
    const referral = referrals.find((r) => r.slug === brandSlug);

    if (!referral) {
        return {};
    }

    const currentYear = new Date().getFullYear();

    const rawTitle = referral.seoTitle || (
        referral.code && referral.code.length <= 10 && !referral.code.startsWith('http')
            ? `Code Parrainage ${referral.name} 2026 (${referral.code}) : ${referral.advantage}`
            : `Code Parrainage ${referral.name} 2026 : ${referral.advantage} ✓`
    );

    const title = rawTitle.length <= 72 ? rawTitle : rawTitle.slice(0, 71).trim() + '…';

    const rawDesc = referral.seoDescription || (
        referral.code && !referral.code.startsWith('http')
            ? `Utilisez le code promo et parrainage ${referral.name} ${referral.code} vérifié en ${currentYear}. Obtenez ${referral.advantage} à l'inscription. Tuto simple en 5 min !`
            : `Profitez de l'offre de parrainage et code promo ${referral.name} vérifiés en ${currentYear}. Obtenez ${referral.advantage} lors de votre inscription rapide !`
    );

    const description = rawDesc.length <= 160 ? rawDesc : rawDesc.slice(0, 159).trim() + '…';

    return {
        title,
        description,
        alternates: {
            canonical: `/parrainage-${referral.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://codes-de-parrainages.com/parrainage-${referral.slug}`,
            images: [
                {
                    url: referral.logoUrl,
                    width: 400,
                    height: 400,
                    alt: referral.name,
                }
            ],
        },
        twitter: {
            card: "summary",
            title,
            description,
            images: [referral.logoUrl],
        },
    };
}

export default async function ReferralPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    if (!slug.startsWith('parrainage-')) {
        notFound();
    }

    const brandSlug = slug.replace('parrainage-', '');
    const referral = referrals.find((r) => r.slug === brandSlug);

    if (!referral) {
        notFound();
    }

    const currentYear = new Date().getFullYear();

    // Determine related offers based on the same category
    const relatedReferrals = referrals
        .filter((r) => r.category === referral.category && r.slug !== referral.slug)
        .slice(0, 3);

    // Find guides that talk about this referral, fill with category guides if not enough
    const explicitGuides = guides.filter((g) => g.referralSlugs?.includes(referral.slug));
    const fallbackGuides = guides.filter(
        (g) => g.category === referral.category && !g.referralSlugs?.includes(referral.slug)
    );
    const relatedGuides = [...explicitGuides, ...fallbackGuides].slice(0, 4);

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": referral.faqs?.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        })) || []
    };

    const categoryToAppType: Record<string, string> = {
        "Banque & Finance": "FinanceApplication",
        "Crypto": "FinanceApplication",
        "Shopping": "ShoppingApplication",
        "Jeux & Gains": "GameApplication",
        "Sport & Santé": "HealthApplication",
    };

    const appCategory = categoryToAppType[referral.category] || "BusinessApplication";

    const reviewJsonLd = referral.category === "Banque & Finance" || referral.category === "Crypto" ? {
        "@context": "https://schema.org",
        "@type": "FinancialService",
        "name": referral.name,
        "description": referral.description,
        "image": `https://codes-de-parrainages.com${referral.logoUrl}`,
        "url": `https://codes-de-parrainages.com/parrainage-${referral.slug}`,
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR"
        }
    } : {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": referral.name,
        "description": referral.description,
        "image": `https://codes-de-parrainages.com${referral.logoUrl}`,
        "url": `https://codes-de-parrainages.com/parrainage-${referral.slug}`
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
                "name": referral.category,
                "item": `https://codes-de-parrainages.com/categorie/${slugifyCategory(referral.category)}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": `Parrainage ${referral.name}`,
                "item": `https://codes-de-parrainages.com/parrainage-${referral.slug}`
            }
        ]
    };

    const howToJsonLd = referral.steps && referral.steps.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": referral.code ? `Comment profiter du code parrainage ${referral.name}` : `Comment profiter de l'offre ${referral.name}`,
        "description": referral.code
            ? `Tutoriel pour utiliser le code de parrainage ${referral.code} et obtenir ${referral.advantage} sur ${referral.name}.`
            : `Guide étape par étape pour profiter de l'offre ${referral.advantage} sur ${referral.name}.`,
        "step": referral.steps.map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.title,
            "text": step.description
        }))
    } : null;

    const hasRealCode = Boolean(referral.code && referral.code.trim() !== "" && !referral.code.startsWith("http"));

    return (
        <main className="min-h-screen px-4 py-4 sm:px-6 sm:py-8 max-w-4xl mx-auto">
            {referral.faqs && referral.faqs.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {howToJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
                />
            )}

            {/* Breadcrumb Visual */}
            <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-6 overflow-x-auto whitespace-nowrap">
                <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <Home size={13} />
                    <span>Accueil</span>
                </Link>
                <ChevronRight size={12} className="text-slate-300 shrink-0" />
                <Link href={`/categorie/${slugifyCategory(referral.category)}`} className="hover:text-blue-600 transition-colors">
                    {referral.category}
                </Link>
                <ChevronRight size={12} className="text-slate-300 shrink-0" />
                <span className="text-slate-900 font-semibold truncate max-w-[150px] sm:max-w-none">
                    {referral.name}
                </span>
            </nav>

            {/* Header Brand Card */}
            <header className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 mb-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="h-14 w-14 sm:h-18 sm:w-18 shrink-0 rounded-xl border border-slate-200 bg-white shadow-2xs p-1.5 flex items-center justify-center overflow-hidden">
                    <CompanyLogo url={referral.logoUrl} name={referral.name} priority={true} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <Link
                            href={`/categorie/${slugifyCategory(referral.category)}`}
                            className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                            {referral.category}
                        </Link>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Vérifié en Novembre {currentYear}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                            ⚡ Offre Active
                        </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Avis & Code Parrainage <span className="text-blue-600">{referral.name}</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                        {referral.description}
                    </p>
                </div>
            </header>

            {/* Main Conversion CTA Card */}
            <section className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-10 shadow-xs text-center relative overflow-hidden">
                <div className="relative z-10 max-w-xl mx-auto">
                    {referral.isPaused ? (
                        <>
                            <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-bold mb-4">
                                ⚠️ Programme Suspendu
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                                Le parrainage {referral.name} est temporairement en pause
                            </h2>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                Le programme de parrainage de cette marque n&apos;accepte pas de nouveaux inscrits pour le moment.
                            </p>
                        </>
                    ) : (
                        <>
                            {/* Advantage Banner */}
                            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 shadow-2xs">
                                <span>🎁</span>
                                <span>Prime garantie : <strong>{referral.advantage}</strong></span>
                            </div>

                            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                                {hasRealCode 
                                    ? `Votre code parrainage ${referral.name}`
                                    : `Activez votre bonus de bienvenue ${referral.name}`}
                            </h2>

                            <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-md mx-auto leading-relaxed">
                                {hasRealCode 
                                    ? "Copiez le code promo vérifié ci-dessous et collez-le lors de votre inscription pour débloquer votre prime."
                                    : "Aucun code manuel n'est requis : votre prime est automatiquement activée en passant par notre lien officiel ci-dessous."}
                            </p>

                            {/* Promo Code Slot if applicable */}
                            {hasRealCode && (
                                <DetailCodeBox 
                                    code={referral.code}
                                    name={referral.name}
                                    advantage={referral.advantage}
                                />
                            )}

                            {/* Reassurance pill if no code */}
                            {!hasRealCode && (
                                <div className="max-w-md mx-auto mb-6 p-3 rounded-xl border border-blue-100 bg-blue-50/70 text-slate-700 text-xs sm:text-sm flex items-center justify-center gap-2">
                                    <span className="text-base">✨</span>
                                    <span><strong>Lien d&apos;invitation certifié</strong> • Réduction appliquée automatiquement</span>
                                </div>
                            )}

                            {/* Main CTA Button */}
                            {referral.link && (
                                <div>
                                    <a
                                        href={referral.link}
                                        target="_blank"
                                        rel="noopener noreferrer sponsored"
                                        className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        <span>{referral.isPartner ? `Profiter de l'offre ${referral.name}` : `Ouvrir ${referral.name} & Encaisser`}</span>
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            )}

                            <p className="text-[11px] text-slate-400 font-medium mt-4">
                                ✓ Inscription directe et sécurisée sur le site officiel {referral.name}
                            </p>
                        </>
                    )}
                </div>
            </section>

            {/* Step-by-step guide */}
            {referral.steps && referral.steps.length > 0 && (
                <section className="mb-10">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-blue-100 text-blue-600 font-bold text-xs">
                            ✓
                        </span>
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                            Comment obtenir le bonus de parrainage (Étape par étape)
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                        {referral.steps.map((step, index) => (
                            <div key={index} className="bg-white border border-slate-200/90 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                                        {index + 1}
                                    </span>
                                    <h3 className="font-bold text-sm text-slate-900 leading-tight">
                                        {step.title}
                                    </h3>
                                </div>
                                <p 
                                    className="text-slate-600 text-xs sm:text-sm leading-relaxed" 
                                    dangerouslySetInnerHTML={{ __html: step.description.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} 
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Avis détaillé */}
            <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-blue-600 h-5 w-5" />
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                        Notre avis d&apos;expert sur {referral.name}
                    </h2>
                </div>

                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs mb-6">
                    {referral.review ? (
                        <div
                            className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-xs sm:text-sm"
                            dangerouslySetInnerHTML={{ __html: referral.review.longReview }}
                        />
                    ) : (
                        <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">{referral.description}</p>
                    )}
                </div>

                {/* 4 Avantages Clés */}
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span>✨</span>
                    <span>Les points forts du parrainage {referral.name}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
                        <span className="text-xl shrink-0">💰</span>
                        <div>
                            <h4 className="font-bold text-xs sm:text-sm text-slate-900">Prime immédiate</h4>
                            <p className="text-xs text-slate-500">Recevez {referral.advantage} dès votre compte validé.</p>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
                        <span className="text-xl shrink-0">✅</span>
                        <div>
                            <h4 className="font-bold text-xs sm:text-sm text-slate-900">Offre vérifiée</h4>
                            <p className="text-xs text-slate-500">Testée et garantie valide en {currentYear}.</p>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
                        <span className="text-xl shrink-0">⚡</span>
                        <div>
                            <h4 className="font-bold text-xs sm:text-sm text-slate-900">Activation rapide</h4>
                            <p className="text-xs text-slate-500">Inscription fluide en moins de 5 minutes.</p>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 flex items-start gap-3 shadow-2xs">
                        <span className="text-xl shrink-0">🛡️</span>
                        <div>
                            <h4 className="font-bold text-xs sm:text-sm text-slate-900">100% sans engagement</h4>
                            <p className="text-xs text-slate-500">Profitez du bonus pour tester le service en toute liberté.</p>
                        </div>
                    </div>
                </div>

                {/* FAQ de réassurance */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 sm:p-5 text-xs text-slate-600 leading-relaxed">
                    <p className="font-bold text-slate-800 mb-1">
                        🔒 Pourquoi notre parrainage {referral.name} est garanti 100% valide ?
                    </p>
                    <p>
                        Tous nos codes et liens de parrainage sont testés manuellement chaque semaine. Le lien et le code pour {referral.name} ont été contrôlés et sont parfaitement actifs en {currentYear}. En cas de question, consultez la foire aux questions ci-dessous.
                    </p>
                </div>
            </section>

            {/* FAQs */}
            {referral.faqs && referral.faqs.length > 0 && (
                <div className="mb-10">
                    <FaqAccordion faqs={referral.faqs} title={`Foire aux questions — ${referral.name}`} />
                </div>
            )}

            {/* Alternatives Recommandées */}
            {relatedReferrals.length > 0 && (
                <section className="pt-8 border-t border-slate-200/90">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                                D&apos;autres offres recommandées dans {referral.category}
                            </h2>
                            <p className="text-xs text-slate-500">Comparez et cumulez les primes de bienvenue</p>
                        </div>
                        <Link 
                            href={`/categorie/${slugifyCategory(referral.category)}`}
                            className="text-xs font-bold text-blue-600 hover:underline"
                        >
                            Voir tout →
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
                        {relatedReferrals.map((relatedOffer, index) => (
                            <ReferralCard key={relatedOffer.slug} referral={relatedOffer} index={index} />
                        ))}
                    </div>
                </section>
            )}

            {/* Sticky Copy Bar for Mobile and Desktop conversion */}
            {!referral.isPaused && (
                <StickyCopyBar 
                    name={referral.name}
                    code={referral.code}
                    link={referral.link}
                    advantage={referral.advantage}
                    logoUrl={referral.logoUrl}
                />
            )}
        </main>
    );
}
