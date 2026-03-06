import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Search, Award } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Notre Méthodologie - Transparence & Indépendance',
    description: 'Découvrez comment notre équipe déniche, teste et valide rigoureusement chaque code promo et offre de parrainage.',
    alternates: {
        canonical: "/notre-methodologie",
    },
};

export default function MethodologiePage() {
    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-16 max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-medium text-sm mb-4 border border-emerald-200 dark:border-emerald-800/50">
                    E-E-A-T : Notre Engagement
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">
                    Notre Méthodologie
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    Parce que la confiance ne s'achète pas, elle se prouve. Voici comment nous sélectionnons et vérifions nos offres.
                </p>
            </div>

            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">

                <section className="mb-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <Search size={24} />
                        </div>
                        <h2 className="text-2xl font-bold m-0 text-slate-900 dark:text-white">Qui sommes-nous (L'Équipe Bons Plans) ?</h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        Nous sommes un collectif de passionnés d'optimisation budgétaire, d'experts en finance personnelle et de "hackers" du pouvoir d'achat. Notre identité réelle importe moins que la qualité et la véracité des codes que nous dénichons.
                    </p>
                    <p className="text-slate-600 dark:text-slate-400">
                        Sur Internet, la majorité des sites de codes promo utilisent des robots pour scrapper des coupons souvent expirés depuis des mois. <strong>Ce n'est pas notre cas.</strong> Notre équipe s'inscrit, ouvre les comptes, et teste physiquement et financièrement 100% des produits répertoriés sur ce site.
                    </p>
                </section>

                <section className="mb-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 flex items-center justify-center">
                            <ShieldCheck size={24} />
                        </div>
                        <h2 className="text-2xl font-bold m-0 text-slate-900 dark:text-white">Notre processus de Test (La Règle des 30 Jours)</h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Afin de garantir que les primes sont bien versées, et qu'aucun frais caché (inactivité, gestion) ne vient piéger nos lecteurs, nous appliquons une sélection stricte :
                    </p>
                    <ul className="space-y-4 text-slate-600 dark:text-slate-400 list-none pl-0">
                        <li className="flex gap-3">
                            <span className="text-blue-500 font-bold">1.</span>
                            <span><strong>Ouverture réelle :</strong> Nous téléchargeons l'application, faisons le KYC (vérification d'identité) et déposons les fonds minimums requis pour valider le parrainage.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-blue-500 font-bold">2.</span>
                            <span><strong>Période de quarantaine (30 jours) :</strong> Nous utilisons l'application pendant un mois. Si la prime est versée sans condition cachée, l'offre passe à l'étape suivante.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-blue-500 font-bold">3.</span>
                            <span><strong>Vérification continue :</strong> Une alerte hebdomadaire est programmée par notre équipe pour s'assurer que les conditions générales (Montant de l'offre, validité du code) n'ont pas muté frauduleusement.</span>
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
                        L'intégrité est notre moteur (et le SEO notre outil pour vous trouver). Ce site est 100% gratuit, sans publicité pop-up, sans inscription obligatoire, et il ne collecte aucune de vos données (voir notre <Link href="/politique-de-confidentialite" className="text-primary hover:underline">Politique de Confidentialité</Link>).
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        Alors, comment payons-nous l'hébergement de ce site ? C'est le principe même du parrainage : notre modèle est basé sur une situation "<strong>Gagnant - Gagnant</strong>".
                    </p>
                    <ul className="list-disc pl-5 text-slate-600 dark:text-slate-400 space-y-2 mb-4">
                        <li>Vous récupérez la <strong>prime de bienvenue</strong> intégrale (ex: 80€ offerts).</li>
                        <li>Nous récupérons une petite commission en tant que "Parrain", financée directement par l'application (et non déduite de votre budget).</li>
                    </ul>
                    <p className="text-sm italic text-slate-500 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80">
                        *Attention : Notre indépendance passe avant notre rémunération. Si un établissement bancaire ou crypto modifie violemment ses frais cachés en notre connaissance (Exemple : facturation injustifiée pour non-utilisation de carte), le partenaire est immédiatement <strong>banni</strong> de notre grille, même s'il s'avérait lucratif à l'instant T.
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
