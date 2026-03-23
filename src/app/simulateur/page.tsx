import { Metadata } from 'next';
import { EarningsCalculator } from '@/components/EarningsCalculator';
import { FaqAccordion } from '@/components/FaqAccordion';
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

    const simulateurFaqs = [
        {
            question: "Le simulateur de gains de parrainage est-il gratuit ?",
            answer: "Oui, l'utilisation de notre simulateur est 100% gratuite et sans inscription. Il est mis à jour en temps réel pour refléter les véritables primes de bienvenue offertes par les banques en ligne, les courtiers crypto et les sites spécialisés dans le cashback."
        },
        {
            question: "Est-il vraiment possible de cumuler toutes ces primes ?",
            answer: "Absolument ! C'est ce que l'on appelle le cumul des astuces financières ou la stratégie des primes de bienvenue. Chaque établissement considère votre ouverture de compte comme unique à son service. Vous pouvez donc tout à fait ouvrir plusieurs comptes différents ou utiliser plusieurs applications en parallèle et encaisser chaque bonus indépendamment pour maximiser votre rentabilité globale."
        },
        {
            question: "Dois-je déclarer l'argent gagné via les primes de bienvenue ?",
            answer: "En France, de manière générale, les primes d'ouverture de compte ponctuelle (par exemple la réception de 130€ d'une banque en ligne à la création du profil) ne sont pas imposables tant qu'elles restent exceptionnelles. Toutefois, pour des montants importants ou si la plateforme d'affiliation devient une source de revenus régulière (parrainage professionnel, jeux vidéo rémunérés constants), il est fortement recommandé de vous rapprocher de l'administration fiscale."
        },
        {
            question: "Comment activer les codes pour obtenir la somme totale du simulateur ?",
            answer: "La marche à suivre est ultra simple ! Une fois le montant visé, descendez sur la liste des offres disponibles dans le menu de notre site. Pour chaque service que vous ne possédez pas encore, cliquez sur notre lien ou copiez minutieusement le code promotionnel. Suivez les étapes de l'inscription (la plupart requièrent une simple identité et un petit dépôt) pour déclencher le versement de l'argent quasi instantanément."
        }
    ];

    const faqJsonLdSimulator = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": simulateurFaqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLdSimulator) }}
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
                    <h2 className="mb-8">Pourquoi utiliser notre simulateur de gains de parrainage manuel ?</h2>
                    
                    <p className="mb-6 text-slate-700 dark:text-slate-300">
                        Il est souvent extrêmement complexe d'avoir une vision claire du potentiel financier <strong>net</strong> des offres de bienvenue.
                    </p>
                    
                    <p className="mb-8 text-slate-700 dark:text-slate-300">
                        Entre les banques en ligne (avec leurs lucratives primes d'ouverture), les plateformes d'échange crypto, et les applications mobiles de cashback : les montants s'accumulent incroyablement vite au fil de l'année. 
                    </p>
                    
                    <blockquote className="border-l-4 border-primary/50 pl-6 my-8 italic text-slate-600 dark:text-slate-400">
                        Notre simulateur agit comme un puissant outil d'agrégation gratuit. Son rôle est de vous permettre de calculer le montant exact des primes d'affiliation déblocables <strong>immédiatement</strong>.
                    </blockquote>
                    
                    <h3 className="mt-12 mb-6">L'effet multiplicateur du cumul des codes promos</h3>
                    
                    <p className="mb-6 text-slate-700 dark:text-slate-300">
                        Ce calculateur gratuit a été spécifiquement pensé pour démontrer d'un coup d'œil la puissance de <strong>l'effet cumulé</strong>. 
                    </p>
                    
                    <p className="mb-8 text-slate-700 dark:text-slate-300">
                        En validant habilement une à deux inscriptions par semaine via nos <strong>codes vérifiés</strong>, vous générez un revenu qui se chiffre très rapidement en plusieurs centaines d'euros net.
                    </p>
                    
                    <ul className="space-y-4 mb-10 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/50 list-none pl-6">
                        <li className="flex gap-3 items-start"><span className="text-primary mt-1">✓</span> <span><strong>Identifiez les opportunités :</strong> Scannez la liste des services disponibles dans le calculateur.</span></li>
                        <li className="flex gap-3 items-start"><span className="text-primary mt-1">✓</span> <span><strong>Ciblez les fortes rentabilités :</strong> Priorisez "Banque" et "Crypto" qui dépassent souvent les 100€ de prime unitaire.</span></li>
                        <li className="flex gap-3 items-start"><span className="text-primary mt-1">✓</span> <span><strong>Actionnez le cashback quotidien :</strong> Complétez ces sommes d'argent avec des plateformes d'achat rémunéré pérennes.</span></li>
                    </ul>
                    
                    <p className="mb-12 text-slate-700 dark:text-slate-300">
                        L'astuce en maîtrise d'affiliation consiste à souscrire aux fameuses applications que vous n'utilisez pas encore. Vous activez la prime de bienvenue, puis vous récupérez le cash directement sur votre compte bancaire principal sous quelques jours.
                    </p>
                    
                    <h3 className="mt-12 mb-6">Une liste des primes parfaitement synchronisée en temps réel</h3>
                    
                    <p className="mb-6 text-slate-700 dark:text-slate-300">
                        À la nette différence des simulateurs statiques existants sur le net, notre puissant algorithme de rentabilité lit en direct l'intégralité des offres disponibles sur notre répertoire en 2026.
                    </p>
                    
                    <p className="mb-8 text-slate-700 dark:text-slate-300">
                        Si un nouveau bonus de bienvenue exceptionnel fait son apparition (comme une hausse de prime temporaire de +150€), le simulateur est automatiquement mis à jour.
                    </p>
                    
                    <div className="bg-emerald-50 dark:bg-emerald-900/10 border-l-4 border-emerald-500 p-6 rounded-r-xl">
                        <p className="font-semibold text-emerald-800 dark:text-emerald-300 m-0">
                            <strong>Mode d'emploi express :</strong> Décochez les services dont vous êtes déjà client dans l'encart ci-dessus. Le solde du grand panneau interactif s'ajustera instantanément à la seconde près.
                        </p>
                    </div>
                </section>

                {/* Section FAQ */}
                <div className="mt-16 mb-20">
                    <FaqAccordion faqs={simulateurFaqs} title="Questions fréquentes sur le Simulateur" />
                </div>
            </article>
        </main>
    );
}
