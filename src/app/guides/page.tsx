import { Metadata } from 'next';
import Link from 'next/link';
import guidesData from '@/data/guides.json';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';

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
                <div className="text-center mb-20">
                    <div className="inline-block py-2 px-4 rounded-2xl bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6">
                        Expertise & Stratégie
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white mb-8 leading-tight">
                        Guides & <span className="text-primary">Bons Plans</span>
                    </h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Toutes les astuces détaillées pour maximiser vos gains et optimiser votre budget au quotidien.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {guidesData.map((guide) => (
                        <Link
                            href={`/guides/${guide.slug}`}
                            key={guide.id}
                            className="glass-card flex flex-col justify-between p-8 md:p-10 group bg-white/50 dark:bg-slate-900/50"
                        >
                            <div className="mb-8">
                                <div className="flex items-center gap-4 mb-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                    <span className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-xl">
                                        <BookOpen size={14} />
                                        {guide.category}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Clock size={14} className="text-primary" />
                                        {guide.readingTime}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                                    {guide.title}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-3 text-sm leading-relaxed">
                                    {guide.excerpt}
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
                                <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <Calendar size={14} />
                                    {new Date(guide.date).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long'
                                    })}
                                </span>
                                <span className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                    <ArrowRight size={18} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
