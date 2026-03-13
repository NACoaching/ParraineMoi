import { Metadata } from 'next';
import Link from 'next/link';
import guidesData from '@/data/guides.json';
import { GuidesGrid } from '@/components/GuidesGrid';
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

                <GuidesGrid guides={guidesData} />
            </section>
        </main>
    );
}
