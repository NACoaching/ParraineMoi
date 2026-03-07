import Link from 'next/link';
import { ArrowLeft, Gift, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-8">
                <Gift size={48} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
                Page introuvable
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mb-10">
                Oups ! Cette page n&apos;existe pas ou a été déplacée. Pas de panique, nos meilleurs codes de parrainage vous attendent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-md"
                >
                    <Home size={20} />
                    Voir tous les codes
                </Link>
                <Link
                    href="/guides"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Guides & Bons Plans
                </Link>
            </div>
        </main>
    );
}
