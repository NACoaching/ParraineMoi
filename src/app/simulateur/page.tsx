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
                "name": "Simulateur de gains",
                "item": "https://codes-de-parrainages.com/simulateur"
            }
        ]
    };

    const calculatorJsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Simulateur de Gains ParraineMoi",
        "operatingSystem": "All",
        "applicationCategory": "FinanceApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR"
        },
        "description": "Calculateur gratuit pour estimer vos gains potentiels avec les meilleures offres de parrainage du moment."
    };

    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-16">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorJsonLd) }}
            />
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
                        Il est souvent complexe d'avoir une réelle vision claire du potentiel financier des offres de bienvenue. Entre les banques en ligne avec des primes d'ouverture de compte conséquentes, les plateformes d'échange crypto qui distribuent des bonus en Bitcoin, et les applications de cashback quotidien, les montants s'accumulent extrêmement vite. Notre <strong>simulateur de gains parrainage</strong> vous permet de calculer avec précision et en temps réel le total des primes d'affiliation que vous pouvez obtenir.
                    </p>
                    
                    <h3>L'effet multiplicateur du cumul des codes promos</h3>
                    <p>
                        Ce calculateur gratuit a été conçu pour vous démontrer la puissance du cumul. En validant vos inscriptions via nos <strong>codes de parrainage vérifiés de manière stratégique</strong>, vous générez un revenu complémentaire qui se chiffre très souvent en plusieurs centaines d'euros. L'astuce consiste à souscrire aux applications financières ou e-commerce que vous n'utilisez pas encore, activer la prime de bienvenue, et récupérer l'argent directement sur votre compte.
                    </p>
                    
                    <h3>Une liste des primes parfaitement synchronisée</h3>
                    <p>
                        À la différence de certains simulateurs, notre calcul de rentabilité prend en compte <strong>l'intégralité des offres disponibles</strong> sur le site en 2026. Dès lors, si un nouveau bonus exceptionnel apparaît (comme par exemple l'offre de 500€ de Coinhouse), la liste d'intégration est automatiquement rafraîchie avec ce nouveau montant maximal. N'attendez plus : décochez les services que vous possédez déjà, et le solde s'ajustera pour afficher vos gains nets potentiels aujourd'hui.
                    </p>
                </section>
            </article>
        </main>
    );
}
