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
                    <h2>Pourquoi utiliser notre simulateur de gains de parrainage manuel ?</h2>
                    <p>
                        Il est souvent extrêmement complexe d'avoir une réelle vision claire du potentiel financier net des offres de bienvenue. Entre les banques en ligne qui proposent des primes d'ouverture de compte très alléchantes, les plateformes d'échange crypto qui distribuent des bonus en Bitcoin gratuits, et les applications mobiles de cashback quotidien, les montants s'accumulent incroyablement vite au cours d'une année. 
                    </p>
                    <p>
                        Notre <strong>simulateur de gains de parrainage</strong> agit techniquement comme un puissant outil d'agrégation. Il vous permet de calculer avec précision, en toute transparence et en temps réel, le total exact des primes d'affiliation et des bonus d'inscription que vous pouvez débloquer aujourd'hui sans avancer de frais lourds. L'objectif premier est de vous aider à mesurer la rentabilité pure de la création de nouveaux comptes sur internet.
                    </p>
                    
                    <h3>L'effet multiplicateur du cumul des codes promos</h3>
                    <p>
                        Ce calculateur gratuit a été spécifiquement codé pour vous démontrer d'un coup d'œil la puissance de l'effet cumulé. En validant vos diverses inscriptions quotidiennes via nos <strong>codes de parrainage certifiés de manière stratégique</strong>, vous générez un revenu d'appoint qui se chiffre très souvent en plusieurs certaines d'euros net. 
                    </p>
                    <ul>
                        <li><strong>Identifiez les opportunités :</strong> Scannez attentivement la liste des services disponibles dans le calculateur.</li>
                        <li><strong>Ciblez les fortes rentabilités :</strong> Les catégories comme "Banque & Finance" et "Cryptomonnaie" offrent historiquement les primes les plus élevées (souvent bien au-delà de 100€ pour une simple souscription rapide et la vérification d'un profil).</li>
                        <li><strong>Actionnez le cashback quotidien :</strong> Complétez ces gros montants avec des plateformes d'achat rémunéré pérennes pour générer de l'argent de poche sur tout le long terme.</li>
                    </ul>
                    <p>
                        L'astuce en maitrise d'affiliation consiste à souscrire aux meilleures applications financières ou plateformes e-commerce que vous n'utilisez pas encore. Vous activez la prime de bienvenue (souvent très facile, nécessitant parfois simplement un micro-dépôt ou la réception d'une carte gratuite), puis vous récupérez l'argent directement sur votre solde bancaire principal sous quelques jours.
                    </p>
                    
                    <h3>Une liste des primes parfaitement synchronisée en temps réel</h3>
                    <p>
                        À la nette différence de certains simulateurs statiques que l'on trouve sur le net, notre puissant algorithme de rentabilité extrait en direct <strong>l'intégralité des offres disponibles</strong> sur la plateforme. Dès lors, si un nouveau bonus de bienvenue exceptionnel fait son apparition sur un service (comme une promotion accélérée limitée dans le temps pour le Black Friday ou les Soldes), l'outil interactif de simulation est automatiquement rafraîchi avec l'annonce de ce nouveau record.
                    </p>
                    <p>
                        <strong>Mode d'emploi express :</strong> N'attendez plus ! Dans l'encart ergonomique situé en haut de page, nous vous conseillons de décocher unitairement les services dont vous êtes déjà client. Le solde du grand panneau noir interactif s'ajustera instantanément à la seconde près afin d'afficher la somme nette finale de vos futurs gains.
                    </p>
                </section>

                {/* Section FAQ */}
                <div className="mt-16 mb-20">
                    <FaqAccordion faqs={simulateurFaqs} title="Questions fréquentes sur le Simulateur" />
                </div>
            </article>
        </main>
    );
}
