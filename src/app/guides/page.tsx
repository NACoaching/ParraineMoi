import { Metadata } from 'next';
import Link from 'next/link';
import guidesData from '@/data/guides.json';
import { BookOpen, Calendar, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Guides & Bons Plans - Codes de Parrainages',
    description: 'Découvrez nos astuces, tutoriels et guides pratiques pour maximiser vos gains de parrainage, voyager sans frais et investir facilement.',
    alternates: {
        canonical: "/guides",
    },
};

export default function GuidesPage() {
    return (
        <main className="flex flex-col items-center min-h-screen pb-20 pt-16 px-4">
            <section className="w-full max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
                        Guides & <span className="text-primary">Bons Plans</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Toutes les astuces et stratégies détaillées pour exploiter au mieux les offres de nos partenaires et optimiser votre budget.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {guidesData.map((guide) => (
                        <Link
                            href={`/guides/${guide.slug}`}
                            key={guide.id}
                            className="group flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 hover:shadow-lg transition-all hover:-translate-y-1"
                        >
                            <div>
                                <div className="flex items-center gap-4 mb-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full text-slate-700 dark:text-slate-300">
                                        <BookOpen size={16} />
                                        {guide.category}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Clock size={16} />
                                        {guide.readingTime}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                                    {guide.title}
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                                    {guide.excerpt}
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                                <span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 font-medium">
                                    <Calendar size={16} />
                                    {new Date(guide.date).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                                <span className="text-primary font-bold text-sm">Lire l'article →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
