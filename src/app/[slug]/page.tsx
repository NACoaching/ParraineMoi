import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, TrendingUp, Clock, ArrowLeft, ExternalLink, Info } from 'lucide-react';
import { CopyButton } from '@/components/CopyButton';
import { CompanyLogo } from '@/components/CompanyLogo';
import { FaqAccordion } from '@/components/FaqAccordion';
import { ReferralGrid } from '@/components/ReferralGrid';
import referralsData from '@/data/referrals.json';
import guidesData from '@/data/guides.json';
import { Referral } from '@/components/ReferralCard';

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
        title: `Code parrainage ${referral.name} : ${referral.advantage} en ${currentYear}`,
        description: `Profitez de ${referral.advantage} de bonus sur ${referral.name} avec mon code de parrainage ${referral.code} vérifié en ${currentYear}. Avis complet et tutoriel d'inscription.`,
        alternates: {
            canonical: `/parrainage-${referral.slug}`,
        },
        openGraph: {
            title: `Code parrainage ${referral.name} : ${referral.advantage}`,
            description: `${referral.advantage} offerts sur ${referral.name} avec le code ${referral.code}. Avis complet et tutoriel.`,
            url: `https://codes-de-parrainages.com/parrainage-${referral.slug}`,
            images: ["/og-image.png"],
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

    const reviewJsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": referral.name,
        "operatingSystem": "iOS, Android, Web",
        "applicationCategory": appCategory,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
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
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Retour aux codes
            </Link>

            <article className="max-w-3xl mx-auto">
                {/* Header with Visual Badges */}
                <header className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-10 pb-10 border-b border-slate-200 dark:border-slate-800">
                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white shadow-sm ring-1 ring-slate-900/5 dark:ring-white/5 relative flex items-center justify-center p-5">
                        <CompanyLogo url={referral.logoUrl} name={referral.name} />
                    </div>
                    <div>
                        <div className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 mb-4">
                            {referral.category}
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-3">
                            Avis et code parrainage <span className="text-primary">{referral.name}</span>
                        </h1>
                        <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-5 py-2.5 rounded-xl inline-flex items-center gap-2 mt-2 shadow-sm">
                            🎁 Avantage : {referral.advantage}
                        </p>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-2 sm:gap-4 mt-6">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs sm:text-sm font-medium border border-green-200 dark:border-green-500/20">
                                <ShieldCheck size={16} />
                                Vérifié le {referral.lastVerified
                                    ? new Date(referral.lastVerified).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                                    : currentYear}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs sm:text-sm font-medium border border-blue-200 dark:border-blue-500/20">
                                <Clock size={16} />
                                Actif immédiatement
                            </span>
                        </div>
                    </div>
                </header>

                {/* Call to Action Sticky/Centered Block */}
                <section className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/80 dark:to-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 sm:p-10 text-center mb-12 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <TrendingUp size={100} />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                            Comment profiter de l'offre ?
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-lg mx-auto text-lg">
                            C'est très simple ! Copiez le code ci-dessous et collez-le dans le champ "Code de parrainage / Promo" lors de votre inscription.
                        </p>

                        <div className="flex flex-col md:flex-row gap-5 justify-center items-stretch max-w-2xl mx-auto">
                            {/* Promo Code Box */}
                            <div className="flex-1 flex items-center justify-between gap-4 bg-white dark:bg-slate-950 border-2 border-primary/20 hover:border-primary/50 transition-colors shadow-sm rounded-2xl p-3 pl-4">
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-50 border border-slate-100 dark:border-slate-800 p-2 flex items-center justify-center overflow-hidden">
                                        <CompanyLogo url={referral.logoUrl} name={referral.name} />
                                    </div>
                                    <span className="font-mono font-bold text-slate-900 dark:text-white text-lg lg:text-xl truncate select-all tracking-tight">
                                        {referral.code}
                                    </span>
                                </div>
                                <CopyButton code={referral.code} className="shrink-0 h-12 px-6 font-semibold" showText={true} />
                            </div>

                            {referral.link && referral.link !== "" && (
                                <a
                                    href={referral.link}
                                    target="_blank"
                                    rel="noopener noreferrer sponsored"
                                    className="flex items-center justify-center gap-3 h-[72px] md:h-auto px-10 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg active:scale-95"
                                >
                                    Ouvrir {referral.name}
                                    <ExternalLink size={20} />
                                </a>
                            )}
                        </div>
                        <p className="text-sm text-slate-400 dark:text-slate-500 mt-8 max-w-md mx-auto italic">
                            En utilisant ce lien/code, je pourrais percevoir une petite commission de la part de {referral.name} pour entretenir le site. Merci pour votre soutien ! 🙏
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

                        {/* Pros */}
                        {referral.review && referral.review.pros && referral.review.pros.length > 0 && (
                            <div className="mb-8">
                                <div className="bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-[1.5rem] p-6 shadow-sm">
                                    <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2">
                                        <span className="flex items-center justify-center p-1 bg-emerald-100 dark:bg-emerald-800/50 rounded-full">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                        </span>
                                        Les points forts
                                    </h3>
                                    <ul className="space-y-3">
                                        {referral.review.pros.map((pro, index) => (
                                            <li key={index} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                                                <span className="text-emerald-500 mt-1 shrink-0">•</span>
                                                <span>{pro}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
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
                                D'autres offres <span className="text-primary">{referral.category}</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400">
                                Poursuivez vos économies avec ces codes promotionnels triés sur le volet.
                            </p>
                        </div>
                        <ReferralGrid referrals={relatedReferrals} />
                    </section>
                )}
            </article>
        </main>
    );
}

