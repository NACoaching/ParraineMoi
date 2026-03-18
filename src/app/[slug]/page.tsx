import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, TrendingUp, Clock, ExternalLink, Info, ChevronRight, Home, Gift, ArrowRight } from 'lucide-react';
import { CopyButton } from '@/components/CopyButton';
import { CompanyLogo } from '@/components/CompanyLogo';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ReferralGrid } from '@/components/ReferralGrid';
import referralsData from '@/data/referrals.json';
import guidesData from '@/data/guides.json';
import { Referral, ReferralCard } from '@/components/ReferralCard';
import { slugifyCategory } from '@/lib/utils';

export async function generateStaticParams() {
    const referrals = referralsData as Referral[];
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
    const referrals = referralsData as Referral[];
    const referral = referrals.find((r) => r.slug === brandSlug);

    if (!referral) {
        return {};
    }

    const currentYear = new Date().getFullYear();

    return {
        title: `Code parrainage ${referral.name} en ${currentYear} : ${referral.advantage} ✓`,
        description: `🎁 Profitez de ${referral.advantage} de bonus sur ${referral.name} avec le meilleur code de parrainage ${referral.code} vérifié en ${currentYear}. ★ Avis, test et tutoriel complet.`,
        alternates: {
            canonical: `/parrainage-${referral.slug}`,
        },
        openGraph: {
            title: `Code parrainage ${referral.name} : ${referral.advantage} ✓`,
            description: `🎁 ${referral.advantage} offerts sur ${referral.name} avec le code ${referral.code}. Avis et tutoriel complet vérifié en ${currentYear}.`,
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
            title: `Code parrainage ${referral.name} : ${referral.advantage} ✓`,
            description: `🎁 ${referral.advantage} offerts sur ${referral.name} avec le code ${referral.code}. Avis et tutoriel complet vérifié en ${currentYear}.`,
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
    const referrals = referralsData as Referral[];
    const referral = referrals.find((r) => r.slug === brandSlug);

    if (!referral) {
        notFound();
    }

    const currentYear = new Date().getFullYear();

    // Determine related offers based on the same category
    const relatedReferrals = referrals
        .filter((r) => r.category === referral.category && r.slug !== referral.slug)
        .slice(0, 3); // Get top 3

    // Find guides that talk about this referral
    const relatedGuides = guidesData.filter((g) => g.referralSlugs?.includes(referral.slug));

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
        "@type": "Product",
        "name": referral.name,
        "description": referral.description,
        "image": `https://codes-de-parrainages.com${referral.logoUrl}`,
        "brand": {
            "@type": "Brand",
            "name": referral.name
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock"
        }
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
                "name": `Parrainage ${referral.name}`,
                "item": `https://codes-de-parrainages.com/parrainage-${referral.slug}`
            }
        ]
    };

    const howToJsonLd = referral.steps && referral.steps.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `Comment profiter du code parrainage ${referral.name}`,
        "description": `Tutoriel pour utiliser le code de parrainage ${referral.code} et obtenir ${referral.advantage} sur ${referral.name}.`,
        "step": referral.steps.map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.title,
            "text": step.description
        }))
    } : null;

    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-16">
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
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
                <Link href="/" className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <Home size={16} />
                    <span>Accueil</span>
                </Link>
                <ChevronRight size={14} className="text-slate-300 dark:text-slate-700 flex-shrink-0" />
                <Link href={`/categorie/${slugifyCategory(referral.category)}`} className="hover:text-slate-900 dark:hover:text-white transition-colors">
                    {referral.category}
                </Link>
                <ChevronRight size={14} className="text-slate-300 dark:text-slate-700 flex-shrink-0" />
                <span className="text-slate-900 dark:text-slate-300 font-semibold truncate max-w-[150px] sm:max-w-none">
                    {referral.name}
                </span>
            </nav>

            <article className="max-w-4xl mx-auto">
                {/* Header with Visual Badges */}
                <header className="flex flex-col sm:flex-row gap-8 items-start sm:items-center mb-16 pb-12 border-b border-slate-200/50 dark:border-slate-800/50">
                    <div className="glass-card h-32 w-32 shrink-0 relative flex items-center justify-center p-6 bg-white dark:bg-white">
                        <CompanyLogo url={referral.logoUrl} name={referral.name} priority={true} />
                    </div>
                    <div>
                        <Link
                            href={`/categorie/${slugifyCategory(referral.category)}`}
                            className="inline-flex items-center rounded-2xl bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary mb-4 hover:bg-primary/20 transition-colors"
                        >
                            {referral.category}
                        </Link>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white mb-4 leading-tight">
                            Avis <span className="text-primary">{referral.name}</span>
                        </h1>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-3 mt-6">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
                                <ShieldCheck size={16} />
                                Vérifié {referral.lastVerified ? new Date(referral.lastVerified).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : currentYear}
                            </span>
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-500/20">
                                <Clock size={16} />
                                Offre Active
                            </span>
                        </div>
                    </div>
                </header>

                {/* Call to Action Sticky/Centered Block */}
                <section className="glass-card p-8 sm:p-12 mb-20 relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Gift size={200} />
                    </div>
                    <div className="relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-emerald-500/20">
                            🎁 Offre exclusive : {referral.advantage}
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                            Récupérez votre bonus maintenant
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                            Utilisez le {referral.code.startsWith('http') ? 'lien' : 'code'} vérifié ci-dessous lors de votre inscription pour débloquer vos avantages.
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-2xl mx-auto">
                            {/* Promo Code Box */}
                            <div className="flex-1 flex items-center justify-between gap-4 bg-white/50 dark:bg-slate-950/50 border-2 border-primary/20 hover:border-primary/50 transition-all rounded-3xl p-4 pl-6">
                                <span className="font-mono font-bold text-slate-900 dark:text-white text-xl lg:text-2xl truncate select-all tracking-wider">
                                    {referral.code}
                                </span>
                                <CopyButton code={referral.code} className="shrink-0 h-14 px-8 font-bold rounded-2xl shadow-lg shadow-primary/20" showText={true} />
                            </div>
                        </div>

                        {referral.link && referral.link !== "" && (
                            <div className="mt-8">
                                <a
                                    href={referral.link}
                                    target="_blank"
                                    rel="noopener noreferrer sponsored"
                                    className="inline-flex items-center justify-center gap-3 px-12 py-5 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:opacity-90 transition-all shadow-xl"
                                >
                                    Ouvrir {referral.name}
                                    <ExternalLink size={20} />
                                </a>
                            </div>
                        )}

                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-10 opacity-50">
                            Soutenez le site en parrainant via nos liens certifiés
                        </p>
                    </div>
                </section>

                {/* Structured Avis & Guide Section */}
                <section className="mb-16 space-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <TrendingUp className="text-primary" size={28} />
                            Notre avis détaillé sur {referral.name}
                        </h2>

                        <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 shadow-sm mb-8">
                            {referral.review ? (
                                <div
                                    className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: referral.review.longReview }}
                                />
                            ) : (
                                <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
                                    <p className="leading-relaxed">{referral.description}</p>
                                </div>
                            )}
                        </div>

                        {/* Avantages du parrainage */}
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className="flex items-center justify-center p-2 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                </span>
                                Les avantages du parrainage {referral.name}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl p-5 flex items-start gap-4">
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-100 dark:bg-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl">
                                        💰
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white mb-1">Bonus immédiat</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Recevez {referral.advantage} dès votre inscription validée</p>
                                    </div>
                                </div>
                                <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl p-5 flex items-start gap-4">
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-100 dark:bg-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl">
                                        ✅
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white mb-1">Code vérifié</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Mis à jour et testé en {currentYear}</p>
                                    </div>
                                </div>
                                <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl p-5 flex items-start gap-4">
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-100 dark:bg-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl">
                                        ⚡
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white mb-1">Activation rapide</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Simple à utiliser, bonus crédité rapidement</p>
                                    </div>
                                </div>
                                <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-2xl p-5 flex items-start gap-4">
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-100 dark:bg-emerald-800/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xl">
                                        🔓
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white mb-1">Sans engagement</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Profitez du bonus en testant simplement le service</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Pourquoi mon code parrainage {referral.name} fonctionne-t-il ?</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    Tous nos codes de parrainage sont vérifiés régulièrement pour garantir leur validité. Le code <strong className="text-slate-900 dark:text-white">{referral.code}</strong> a été testé {referral.lastVerified ? `le ${new Date(referral.lastVerified).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}` : `récemment en ${currentYear}`} et fonctionne parfaitement. Si vous rencontrez un problème, vérifiez que vous remplissez bien toutes les conditions d&apos;éligibilité mentionnées dans la FAQ ci-dessous.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Step by step guide */}
                    {referral.steps && referral.steps.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary/10 text-primary">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </span>
                                Comment ça marche ? (Tutoriel)
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6 relative">
                                <div className="hidden md:block absolute top-8 left-10 right-10 h-0.5 bg-slate-200 dark:bg-slate-800 z-0"></div>
                                {referral.steps.map((step, index) => (
                                    <div key={index} className="relative z-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col pt-8 mt-4 md:mt-0">
                                        <div className="absolute -top-5 left-6 w-10 h-10 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm border border-slate-100 dark:border-slate-800">
                                            {index + 1}
                                        </div>
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{step.title}</h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Related Guides Section */}
                    {relatedGuides.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 mt-12">
                                <span className="flex items-center justify-center p-2 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                                    <Info className="w-5 h-5" />
                                </span>
                                Lisez nos guides sur {referral.name}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {relatedGuides.map((guide) => (
                                    <Link
                                        key={guide.slug}
                                        href={`/guides/${guide.slug}`}
                                        className="group block p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all hover:shadow-md"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                                {guide.readingTime}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-primary transition-colors mb-2 line-clamp-2">
                                            {guide.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                                            {guide.excerpt}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                {/* FAQ SEO */}
                {referral.faqs && referral.faqs.length > 0 && (
                    <div className="mb-20">
                        <FaqAccordion faqs={referral.faqs} title={`Questions fréquentes - ${referral.name}`} />
                    </div>
                )}

                {/* Related Referrals / Cross-selling */}
                {relatedReferrals.length > 0 && (
                    <section className="pt-16 border-t font-semibold border-slate-200 dark:border-slate-800">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                                D&apos;autres offres <span className="text-primary">{referral.category}</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400">
                                Poursuivez vos économies avec ces codes promotionnels triés sur le volet.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedReferrals.map((relatedOffer, index) => (
                                <ReferralCard key={relatedOffer.slug} referral={relatedOffer} index={index} />
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </main>
    );
}

