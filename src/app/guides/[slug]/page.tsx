import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, BookOpen, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { referrals, guides } from '@/lib/data';
import { ReferralCard, Referral } from '@/components/ReferralCard';
import { slugifyCategory } from '@/lib/utils';

export async function generateStaticParams() {
    return guides.map((guide) => ({
        slug: guide.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const guide = guides.find((g) => g.slug === slug);

    if (!guide) {
        return {
            title: 'Guide Introuvable - Codes de Parrainages',
        };
    }

    const currentYear = new Date().getFullYear();
    // @ts-ignore
    const rawTitle = guide.seoTitle || `${guide.title} — Guide ${currentYear}`;
    const title = rawTitle.length <= 60 ? rawTitle : rawTitle.slice(0, 59).trim() + '…';

    // @ts-ignore
    const rawDesc = guide.seoDescription || guide.excerpt;
    const description = rawDesc.length <= 150 ? rawDesc : rawDesc.slice(0, 149).trim() + '…';

    return {
        title,
        description,
        alternates: {
            canonical: `/guides/${guide.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `https://codes-de-parrainages.com/guides/${guide.slug}`,
            images: ["/og-image.png"],
        },
        twitter: {
            title,
            description,
            images: ["/og-image.png"],
        },
    };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const guide = guides.find((g) => g.slug === slug);

    if (!guide) {
        notFound();
    }

    // Get associated referrals for internal linking and offer cards
    const contentMatches = Array.from(
        new Set([...guide.content.matchAll(/\/parrainage-([a-z0-9-]+)/g)].map(m => m[1]))
    );
    const combinedSlugs = Array.from(
        new Set([...(guide.referralSlugs || []), ...contentMatches])
    );
    const guideReferrals = combinedSlugs
        .map(refSlug => referrals.find(r => r.slug === refSlug))
        .filter((r): r is Referral => Boolean(r));

    // Custom Markdown parser supporting H2, Lists, Bold, Links, and Images
    const renderContent = (content: string) => {
        const blocks = content.split('\n\n');
        
        // Helper to parse inline elements (bold, links, images)
        const parseInline = (text: string) => {
            // First parse images: ![alt](url)
            const parts = text.split(/(!\[.*?\]\(.*?\)|\[.*?\]\(.*?\))/g);
            return parts.map((part, i) => {
                if (part.startsWith('![')) {
                    const match = part.match(/!\[(.*?)\]\((.*?)\)/);
                    if (match) {
                        return <Image key={i} src={match[2]} alt={match[1]} width={800} height={450} className="rounded-2xl w-full h-auto my-6 shadow-md border border-slate-200 dark:border-slate-800" />;
                    }
                } else if (part.startsWith('[')) {
                    const match = part.match(/\[(.*?)\]\((.*?)\)/);
                    if (match) {
                        return <a key={i} href={match[2]} className="text-primary hover:underline font-medium" target={match[2].startsWith('http') ? '_blank' : '_self'} rel={match[2].startsWith('http') ? 'noopener noreferrer' : ''}>{match[1]}</a>;
                    }
                }
                
                // Parse bold: **text** within the remaining text
                const boldParts = part.split(/\*\*(.*?)\*\*/g);
                return boldParts.map((bPart, j) => 
                    j % 2 === 1 ? <strong key={`${i}-${j}`} className="text-slate-900 dark:text-white font-bold">{bPart}</strong> : bPart
                );
            });
        };

        return blocks.map((block, index) => {
            if (block.startsWith('## ')) {
                return (
                    <h2 key={index} className="text-3xl font-bold text-slate-900 dark:text-white mt-16 mb-8 tracking-tight border-l-4 border-primary pl-6">
                        {block.replace('## ', '')}
                    </h2>
                );
            }
            if (block.startsWith('- ')) {
                const listItems = block.split('\n').map(item => item.replace('- ', ''));
                return (
                    <ul key={index} className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        {listItems.map((li, i) => (
                            <li key={i}>{parseInline(li)}</li>
                        ))}
                    </ul>
                );
            }
            // Paragraph
            return (
                <p key={index} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-lg">
                    {parseInline(block)}
                </p>
            );
        });
    };

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://codes-de-parrainages.com/guides/${guide.slug}`
        },
        "headline": guide.title,
        "description": guide.excerpt,
        "datePublished": guide.date,
        "dateModified": guide.date,
        "wordCount": guide.content.split(/\s+/).length,
        "author": {
            "@type": "Organization",
            "name": "La Rédaction Codes de Parrainages",
            "url": "https://codes-de-parrainages.com/a-propos"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Codes de Parrainages",
            "logo": {
                "@type": "ImageObject",
                "url": "https://codes-de-parrainages.com/favicon.png"
            }
        },
        "image": "https://codes-de-parrainages.com/og-image.png"
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
                "name": "Guides & Astuces",
                "item": "https://codes-de-parrainages.com/guides"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": guide.title,
                "item": `https://codes-de-parrainages.com/guides/${guide.slug}`
            }
        ]
    };

    return (
        <main className="min-h-screen py-10 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <article className="max-w-4xl mx-auto">
                <nav className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 mb-6 sm:mb-10 overflow-x-auto whitespace-nowrap">
                    <Link href="/guides" className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <ArrowLeft size={16} />
                        <span>Retour aux guides</span>
                    </Link>
                    <ChevronRight size={14} className="text-slate-300 dark:text-slate-700 flex-shrink-0" />
                    <span className="text-slate-900 dark:text-slate-300 font-bold uppercase tracking-widest text-xs">
                        {guide.category}
                    </span>
                </nav>

                <header className="mb-10 sm:mb-14 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1.5 rounded-2xl">
                            <BookOpen size={16} />
                            {guide.category}
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar size={16} className="text-primary" />
                            {new Date(guide.date).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock size={16} className="text-primary" />
                            {guide.readingTime}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 sm:mb-8 leading-tight">
                        {guide.title}
                    </h1>

                    <div className="glass-card p-5 sm:p-7 bg-white/70 dark:bg-slate-900/70 mb-8 sm:mb-10 border-l-4 border-l-primary rounded-2xl text-left">
                        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed italic">
                            {guide.excerpt}
                        </p>
                    </div>

                    {/* BLOC PETITES ANNONCES EN HAUT DU GUIDE */}
                    {guideReferrals.length > 0 && (
                        <div className="text-left bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-white dark:from-slate-900/60 dark:to-slate-900/40 border border-blue-200/80 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-2xs mb-6 sm:mb-8">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
                                <div className="flex items-center gap-2">
                                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                                        {guideReferrals.length > 1
                                            ? `Offres & codes promo cités dans ce guide (${guideReferrals.length})`
                                            : `Offre & code promo cité dans ce guide`
                                        }
                                    </h2>
                                </div>
                                <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                                    ✓ Codes & Liens vérifiés 2026
                                </span>
                            </div>

                            {/* Grille d'annonces de taille strictement identique à la page principale */}
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3.5">
                                {guideReferrals.map((ref, index) => (
                                    <ReferralCard
                                        key={`top-${ref.slug}`}
                                        referral={ref}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </header>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    {renderContent(guide.content)}
                </div>

                {guideReferrals.length > 0 && (
                    <section className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            Codes de parrainage et offres vérifiées cités dans ce guide :
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3.5">
                            {guideReferrals.map((ref, index) => (
                                <ReferralCard key={`bottom-${ref.slug}`} referral={ref} index={index} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Related Guides / Internal Linking */}
                <section className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Guides et comparatifs associés ({guide.category})
                        </h2>
                        <Link
                            href={`/categorie/${slugifyCategory(guide.category)}`}
                            className="text-sm font-bold text-primary hover:underline"
                        >
                            Tous les parrainages {guide.category} →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {guides
                            .filter(g => g.slug !== guide.slug && (g.category === guide.category))
                            .slice(0, 2)
                            .map((relatedGuide) => (
                                <Link
                                    key={relatedGuide.id}
                                    href={`/guides/${relatedGuide.slug}`}
                                    className="group flex flex-col p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl hover:border-primary/50 transition-all"
                                >
                                    <span className="text-xs font-bold text-primary mb-2 uppercase tracking-wide">
                                        {relatedGuide.category}
                                    </span>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                        {relatedGuide.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                                        {relatedGuide.excerpt}
                                    </p>
                                    <span className="text-xs font-bold text-primary group-hover:underline mt-auto">
                                        Lire le comparatif complet →
                                    </span>
                                </Link>
                            ))}
                    </div>
                </section>
            </article>
        </main>
    );
}
