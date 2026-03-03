import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react';
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
            title: 'Guide Imrouvable - Codes de Parrainages',
        };
    }

    return {
        title: `${guide.title} - Astuces & Bons Plans`,
        description: guide.excerpt,
        alternates: {
            canonical: `/guides/${guide.slug}`,
        }
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

    // Naive Markdown parser for our specific use case (H2 and Paragraphs)
    const renderContent = (content: string) => {
        const blocks = content.split('\n\n');
        return blocks.map((block, index) => {
            if (block.startsWith('## ')) {
                return (
                    <h2 key={index} className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4">
                        {block.replace('## ', '')}
                    </h2>
                );
            }
            if (block.startsWith('- ')) {
                const listItems = block.split('\n').map(item => item.replace('- ', ''));
                return (
                    <ul key={index} className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                        {listItems.map((li, i) => {
                            // Bold parser
                            const parts = li.split(/\*\*(.*?)\*\*/g);
                            return (
                                <li key={i}>
                                    {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-slate-900 dark:text-white">{part}</strong> : part)}
                                </li>
                            );
                        })}
                    </ul>
                );
            }
            // Paragraph with bold parsing
            const parts = block.split(/\*\*(.*?)\*\*/g);
            return (
                <p key={index} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-lg">
                    {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-slate-900 dark:text-white">{part}</strong> : part)}
                </p>
            );
        });
    };

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": guide.title,
        "description": guide.excerpt,
        "datePublished": guide.date,
        "author": {
            "@type": "Person",
            "name": "Nolwen Albanesi",
            "url": "https://codes-de-parrainages.com"
        },
        "image": "https://codes-de-parrainages.com/og-image.png"
    };

    return (
        <main className="min-h-screen py-10 px-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <article className="max-w-3xl mx-auto">
                <Link
                    href="/guides"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-10"
                >
                    <ArrowLeft size={16} />
                    Retour aux guides
                </Link>

                <header className="mb-12">
                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full">
                            <BookOpen size={16} />
                            {guide.category}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar size={16} />
                            {new Date(guide.date).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock size={16} />
                            {guide.readingTime}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
                        {guide.title}
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed border-l-4 border-primary pl-6 py-2 italic bg-slate-50 dark:bg-slate-800/50 rounded-r-xl">
                        {guide.excerpt}
                    </p>
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
            </article>
        </main>
    );
}
