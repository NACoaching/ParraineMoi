import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Search, Award } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Méthodologie & Indépendance - Codes de Parrainages',
    description: 'Découvrez ma méthode de test sur 30 jours et pourquoi vous pouvez avoir confiance dans ces offres de bienvenue.',
    alternates: {
        canonical: "/a-propos",
    },
};

const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nolwen Albanesi",
    "jobTitle": "Créateur & Testeur indépendant",
    "url": "https://codes-de-parrainages.com/a-propos",
    "sameAs": [
        "https://www.linkedin.com/in/nolwen-albanesi"
    ],
    "worksFor": {
        "@type": "Organization",
        "name": "Codes de Parrainages"
    },
    "knowsAbout": ["Banques en ligne", "Finances personnelles", "Cryptomonnaies", "Programmes de parrainage"]
};

export default function AboutPage() {
    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-16 max-w-4xl mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
            />
            <div className="text-center mb-12">

                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
                    Ma Méthodologie
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Parce que la confiance ne s&apos;achète pas, elle se prouve. Voici comment je sélectionne et vérifie chaque offre.
                </p>
            </div>

            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">

                <section className="mb-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <Search size={24} />
                        </div>
                        <h2 className="text-2xl font-bold m-0 text-slate-900 dark:text-white">Qui suis-je ?</h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        Je suis avant tout un consommateur malin. J&apos;en avais assez de tomber sur des sites de codes promo remplis de liens expirés ou de fausses promesses juste là pour attirer des clics.
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                        Mon but est très simple : proposer un site clair et honnête où chaque offre a été réellement vérifiée. Je mets un point d&apos;honneur à ouvrir moi-même les comptes, tester les applications au quotidien, et m&apos;assurer que les primes existent bel et bien avant de les partager avec vous.
                    </p>
                </section>

                <section className="mb-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 flex items-center justify-center">
                            <ShieldCheck size={24} />
                        </div>
                        <h2 className="text-2xl font-bold m-0 text-slate-900 dark:text-white">Mon processus de Test (La Règle des 30 Jours)</h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Afin de garantir que les primes sont bien versées, et qu&apos;aucun frais caché (inactivité, gestion) ne vient piéger mes lecteurs, j&apos;applique une sélection stricte :
                    </p>
                    <ul className="space-y-4 text-slate-600 dark:text-slate-400 list-none pl-0">
                        <li className="flex gap-3">
                            <span className="text-blue-500 font-bold">1.</span>
                            <span><strong>Ouverture réelle :</strong> Je télécharge l&apos;application sur mon vrai téléphone, passe le KYC (vérification d&apos;identité) et dépose les fonds minimums requis pour valider le parrainage.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-blue-500 font-bold">2.</span>
                            <span><strong>Période de quarantaine (30 jours) :</strong> J&apos;utilise l&apos;application pendant un mois pour mes propres achats. Si la prime est versée sans condition cachée, l&apos;offre passe à l&apos;étape suivante.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-blue-500 font-bold">3.</span>
                            <span><strong>Vérification continue :</strong> Des vérifications mensuelles sont effectuées pour m&apos;assurer que les conditions générales (montant de l&apos;offre, validité du code, introduction de nouveaux frais) n&apos;ont pas muté discrètement.</span>
                        </li>
                    </ul>
                </section>

                <section className="mb-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/50 flex items-center justify-center">
                            <Award size={24} />
                        </div>
                        <h2 className="text-2xl font-bold m-0 text-slate-900 dark:text-white">Affiliation et Transparence totale</h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        Ce site est un projet personnel 100% gratuit, sans publicité intrusive et sans inscription obligatoire. De plus, la plateforme ne collecte aucune de vos données personnelles (voir la <Link href="/politique-de-confidentialite" className="text-primary hover:underline">Politique de Confidentialité</Link>).
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        Pour payer l&apos;hébergement et le nom de domaine, j&apos;utilise tout simplement le principe du parrainage, sur un modèle totalement &quot;<strong>Gagnant - Gagnant</strong>&quot; :
                    </p>
                    <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                        <li>De votre côté, vous obtenez votre <strong>prime de bienvenue</strong> (souvent boostée grâce au lien d&apos;invitation que je partage).</li>
                        <li>Du mien, je reçois une petite récompense de la part de l&apos;application, sans que cela ne change quoi que ce soit pour vous (c&apos;est l&apos;appli qui paie la prime).</li>
                    </ul>
                    <p className="text-sm italic text-slate-500 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
                        *Une précision importante : je reste totalement libre de mes choix. Si une banque ou une appli ajoute des frais cachés ou modifie ses conditions à votre désavantage par la suite, je la retire immédiatement de mes recommandations, même si elle me rapporte de l&apos;argent.
                    </p>
                </section>

                <div className="mt-12 text-center">
                    <Link href="/" className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg">
                        Retourner aux bons plans
                    </Link>
                </div>
            </div>
        </main>
    );
}
