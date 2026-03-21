import { Metadata } from 'next';
import { EarningsCalculator } from '@/components/EarningsCalculator';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Simulateur de Gains - Calculez vos primes de parrainage | ParraineMoi',
    description: 'Découvrez combien vous pourriez gagner en cumulant les meilleures offres de parrainage (Banques, Crypto, Cashback). Calculez vos primes potentielles en quelques clics.',
    alternates: {
        canonical: 'https://codes-de-parrainages.com/simulateur',
    },
};

export default function SimulateurPage() {
    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-16">
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 max-w-4xl mx-auto">
                <Link href="/" className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <Home size={16} />
                    <span>Accueil</span>
                </Link>
                <ChevronRight size={14} className="text-slate-300 dark:text-slate-700 flex-shrink-0" />
                <span className="text-slate-900 dark:text-slate-300 font-semibold truncate">
                    Simulateur de gains
                </span>
            </nav>

            <article className="max-w-4xl mx-auto">
                <header className="mb-8 text-center sm:text-left">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white mb-4">
                        Calculez vos <span className="text-primary">gains potentiels</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                        Le marché de l'affiliation offre de multiples opportunités. Utilisez cet outil gratuit pour estimer précisément combien d'argent vous pourriez récupérer en souscrivant aux services numériques les plus rentables du moment.
                    </p>
                </header>

                {/* Integration of the Calculator */}
                <EarningsCalculator />

                {/* Additional SEO text below */}
                <section className="mt-16 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 sm:p-12 shadow-sm prose prose-lg prose-slate dark:prose-invert max-w-none">
                    <h2>Pourquoi utiliser un simulateur de gains de parrainage ?</h2>
                    <p>
                        Il est souvent difficile d'avoir une vision claire du potentiel financier des offres de bienvenue. Entre les banques en ligne qui offrent jusqu'à 130€, les applications cryptos qui distribuent des bonus en Bitcoin, et les plateformes de cashback, les sommes s'accumulent vite.
                    </p>
                    <p>
                        Ce simulateur de gains est conçu pour vous montrer <strong>le pouvoir du cumul</strong>. En utilisant nos codes de parrainage vérifiés de manière stratégique (par exemple, ouvrir un compte BoursoBank puis le coupler à Revolut), vous générez un revenu complémentaire rapide et net d'impôts. N'attendez plus pour optimiser vos finances !
                    </p>
                </section>
            </article>
        </main>
    );
}
