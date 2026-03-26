import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, BookOpen, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import guidesData from '@/data/guides.json';
import referralsData from '@/data/referrals.json';
import { ReferralCard, Referral } from '@/components/ReferralCard';

export async function generateStaticParams() {
    return guidesData.map((guide) => ({
        slug: guide.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const guide = guidesData.find((g) => g.slug === slug);

    if (!guide) {
        return {
            title: 'Guide Introuvable - Codes de Parrainages',
        };
    }

    const currentYear = new Date().getFullYear();

    return {
        title: `${guide.title} — Guide Complet ${currentYear}`,
        description: `${guide.excerpt.length > 140 ? guide.excerpt.slice(0, 137) + '...' : guide.excerpt} → Téléchargez le guide gratuit, vérifié en ${currentYear}.`,
        alternates: {
            canonical: `/guides/${guide.slug}`,
        },
        openGraph: {
            title: `${guide.title} — Guide ${currentYear}`,
            description: guide.excerpt,
            url: `https://codes-de-parrainages.com/guides/${guide.slug}`,
            images: ["/og-image.png"],
        },
        twitter: {
            title: `${guide.title} — Guide ${currentYear}`,
            description: guide.excerpt,
            images: ["/og-image.png"],
        },
    };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const guide = guidesData.find((g) => g.slug === slug);

    if (!guide) {
        notFound();
    }

    // Get associated referrals for internal linking
    const guideReferrals = (referralsData as Referral[]).filter(ref =>
        guide.referralSlugs.includes(ref.slug)
    );

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
            "@type": "Person",
            "name": "L'Équipe Bons Plans",
            "url": "https://codes-de-parrainages.com/notre-methodologie"
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
                <nav className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 mb-12 overflow-x-auto whitespace-nowrap">
                    <Link href="/guides" className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <ArrowLeft size={16} />
                        <span>Retour aux guides</span>
                    </Link>
                    <ChevronRight size={14} className="text-slate-300 dark:text-slate-700 flex-shrink-0" />
                    <span className="text-slate-900 dark:text-slate-300 font-bold uppercase tracking-widest text-xs">
                        {guide.category}
                    </span>
                </nav>

                <header className="mb-16 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-2xl">
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

                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white mb-10 leading-[1.1]">
                        {guide.title}
                    </h1>

                    <div className="glass-card p-8 bg-white/50 dark:bg-slate-900/50 mb-12 border-l-8 border-l-primary">
                        <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed italic">
                            {guide.excerpt}
                        </p>
                    </div>
                </header>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                    {renderContent(guide.content)}
                </div>

                {guideReferrals.length > 0 && (
                    <section className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            Les offres mentionnées dans ce guide :
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {guideReferrals.map(ref => (
                                <ReferralCard key={ref.id} referral={ref} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Related Guides / Internal Linking */}
                <section className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                        À lire aussi sur le même sujet
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {guidesData
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
                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                        {relatedGuide.title}
                                    </h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                                        {relatedGuide.excerpt}
                                    </p>
                                </Link>
                            ))}
                    </div>
                </section>
            </article>
        </main>
    );
}
