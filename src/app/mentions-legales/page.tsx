import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, ShieldCheck, Scale, Handshake, AlertTriangle, FileText, Globe } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Mentions Légales & Transparence Affiliation — Codes de Parrainages',
    description: 'Mentions légales de codes-de-parrainages.com : éditeur, hébergeur, transparence sur les liens et programmes d affiliation commerciale (Loi 2023-451).',
    alternates: {
        canonical: "/mentions-legales",
    },
};

export default function MentionsLegalesPage() {
    return (
        <main className="min-h-screen px-4 py-5 sm:px-6 sm:py-10 max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-6 overflow-x-auto whitespace-nowrap">
                <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <Home size={13} />
                    <span>Accueil</span>
                </Link>
                <ChevronRight size={12} className="text-slate-300 shrink-0" />
                <span className="text-slate-900 font-semibold truncate">
                    Mentions Légales & Affiliation
                </span>
            </nav>

            {/* Header */}
            <header className="mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold mb-3">
                    <Scale size={13} />
                    <span>Cadre Légal & Déontologie</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
                    Mentions Légales & <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Transparence Affiliation</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                    Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l&apos;Économie Numérique (LCEN), ainsi qu&apos;aux exigences de la Loi n° 2023-451 du 9 juin 2023 encadrant l&apos;influence commerciale et l&apos;affiliation.
                </p>
            </header>

            <div className="space-y-6">
                {/* 1. Éditeur */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <FileText size={16} />
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">
                            1. Éditeur du site
                        </h2>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
                        <p>
                            Le site internet <strong>codes-de-parrainages.com</strong> est un service d&apos;information et de comparaison indépendant édité à titre personnel par son auteur.
                        </p>
                        <p>
                            <strong>Contact :</strong> Pour toute question, demande de partenariat, proposition d&apos;offre ou signalement d&apos;un code expiré, vous pouvez contacter l&apos;éditeur via le formulaire de contact ou à l&apos;adresse de support du site.
                        </p>
                    </div>
                </section>

                {/* 2. Hébergement */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                            <Globe size={16} />
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">
                            2. Hébergement
                        </h2>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        <p>
                            Le site est hébergé sur l&apos;infrastructure sécurisée de :<br />
                            <strong>Vercel Inc.</strong><br />
                            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
                            Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">https://vercel.com</a>
                        </p>
                    </div>
                </section>

                {/* 3. Transparence Affiliation & Parrainage (Loi 2023) */}
                <section className="bg-white border border-blue-200/90 rounded-2xl p-5 sm:p-7 shadow-xs relative overflow-hidden">
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                            <Handshake size={16} />
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">
                            3. Politique de Transparence, Affiliation & Liens Partenaires
                        </h2>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                        <p className="bg-blue-50/70 border border-blue-100 text-slate-800 p-3.5 rounded-xl font-medium">
                            ⚖️ <strong>Information légale sur l&apos;affiliation :</strong> Conformément à la Loi n° 2023-451 du 9 juin 2023 et aux recommandations de la DGCCRF, nous informons nos utilisateurs que ce site contient des <strong>liens d&apos;affiliation</strong> et des <strong>codes de parrainage</strong>.
                        </p>
                        <p>
                            En cliquant sur un lien de redirection ou en utilisant un code promo lors de votre inscription auprès de nos partenaires (banques, plateformes cryptos, courtiers, e-commerçants), une commission ou une prime de parrainage peut être reversée à l&apos;éditeur du site.
                        </p>
                        <p>
                            <strong>Ce modèle garantit deux engagements fondamentaux pour vous :</strong>
                        </p>
                        <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                            <li>
                                <strong>Gratuité absolue et zéro surcoût :</strong> L&apos;utilisation d&apos;un code de parrainage ou d&apos;un lien affilié n&apos;augmente jamais le prix du service souscrit. Au contraire, elle débloque systématiquement un bonus exclusif (prime en euros, réduction immédiate, freebets, cashback).
                            </li>
                            <li>
                                <strong>Indépendance éditoriale :</strong> Les avis, tutoriels et comparatifs publiés sur ce site sont rédigés en toute indépendance. La présence d&apos;une prime d&apos;affiliation ne dicte pas nos avis : nous testons les plateformes et mettons en avant les offres les plus avantageuses et fiables pour nos visiteurs.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* 4. Proposer un programme d'affiliation / Partenariat */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                            <ShieldCheck size={16} />
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">
                            4. Marques & Annonceurs : Proposer une offre ou un partenariat
                        </h2>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2.5">
                        <p>
                            Vous représentez une fintech, une néobanque, une plateforme crypto, une marque e-commerce ou une régie d&apos;affiliation et vous souhaitez intégrer votre programme de parrainage ou d&apos;affiliation sur <strong>codes-de-parrainages.com</strong> ?
                        </p>
                        <p>
                            Nous collaborons régulièrement avec des annonceurs et plateformes d&apos;affiliation reconnues (Awin, Kwanko, Affilae, programmes directs). Pour être référencée, votre offre doit respecter notre charte de qualité :
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-slate-700">
                            <li>Prime de bienvenue réelle et vérifiable pour le filleul.</li>
                            <li>Conditions d&apos;obtention claires et transparentes.</li>
                            <li>Fiabilité légale de la structure (agrément ACPR, AMF, PSAN ou conformité européenne selon le secteur).</li>
                        </ul>
                        <p className="pt-1">
                            Pour soumettre un programme d&apos;affiliation ou une proposition de sponsoring, contactez la rédaction à : <strong className="text-blue-600">contact@codes-de-parrainages.com</strong>.
                        </p>
                    </div>
                </section>

                {/* 5. Avertissement Risques Financiers & Absence de Conseil */}
                <section className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                            <AlertTriangle size={16} />
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">
                            5. Avertissement sur les Risques Financiers (ACPR / AMF)
                        </h2>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                        <p>
                            Les articles, guides et avis publiés sur <strong>codes-de-parrainages.com</strong> ont une finalité exclusivement informative et pédagogique. Ils ne constituent en aucun cas des conseils en investissement financier, juridique ou fiscal.
                        </p>
                        <p>
                            <strong>Investissements et Cryptomonnaies :</strong> L&apos;investissement en actifs financiers, actions ou cryptomonnaies comporte un risque élevé de perte en capital. Les performances passées ne préjugent pas des performances futures. Ne misez que des montants que vous êtes en mesure de perdre. Renseignez-vous auprès de conseillers financiers certifiés.
                        </p>
                    </div>
                </section>

                {/* 6. Propriété intellectuelle */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                        6. Propriété intellectuelle
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        L&apos;ensemble des textes, graphismes, ergonomie et structure éditoriale du site sont protégés par le droit d&apos;auteur. Les marques, logos et noms commerciaux cités (Revolut, Fortuneo, BoursoBank, Winamax, etc.) demeurent la propriété exclusive de leurs détenteurs légitimes et ne sont mentionnés qu&apos;à des fins d&apos;identification factuelle des programmes de parrainage.
                    </p>
                </section>

                {/* 7. Données personnelles */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                        7. Protection des Données Personnelles
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Pour connaître les détails relatifs à la gestion de vos données et à la navigation sur notre site, veuillez consulter notre <Link href="/politique-de-confidentialite" className="text-blue-600 hover:underline font-semibold">Politique de Confidentialité</Link>.
                    </p>
                    <p className="text-[11px] text-slate-400 mt-4">
                        Dernière mise à jour : Novembre 2026.
                    </p>
                </section>
            </div>
        </main>
    );
}
