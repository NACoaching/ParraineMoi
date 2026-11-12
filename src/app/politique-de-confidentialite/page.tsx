import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, Lock, Activity, ShieldCheck, Database, Cookie, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Politique de Confidentialité — Codes de Parrainages',
    description: 'Politique de confidentialité et protection des données personnelles : mesure d audience, outil de tracking des clics de parrainage et conformité RGPD.',
    alternates: {
        canonical: "/politique-de-confidentialite",
    },
};

export default function PolitiqueConfidentialitePage() {
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
                    Politique de Confidentialité
                </span>
            </nav>

            {/* Header */}
            <header className="mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold mb-3">
                    <Lock size={13} />
                    <span>Protection RGPD & Vie Privée</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
                    Politique de <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Confidentialité & Tracking</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                    Transparence totale sur la collecte des données, les outils de mesure d&apos;audience et le suivi des performances de parrainage (Conformité RGPD & directives CNIL).
                </p>
            </header>

            <div className="space-y-6">
                {/* 1. Responsable */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                        1. Responsable du traitement
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Le site <strong>codes-de-parrainages.com</strong> est édité à titre personnel. Le responsable du traitement des données est l&apos;éditeur du site, joignable à l&apos;adresse : <strong className="text-blue-600">contact@codes-de-parrainages.com</strong>.
                    </p>
                </section>

                {/* 2. Données personnelles */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                        2. Données personnelles collectées
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2">
                        Ce site est accessible librement et gratuitement. <strong>Aucune création de compte utilisateur, aucun nom, prénom, numéro de téléphone, mot de passe ou coordonnée bancaire n&apos;est collecté sur ce site.</strong> La consultation de nos codes de parrainage et avis ne requiert aucune inscription préalable.
                    </p>
                </section>

                {/* 3. Outil de tracking des parrainages & Analytics */}
                <section className="bg-white border border-blue-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <div className="flex items-center gap-2 mb-3">
                        <Activity size={18} className="text-blue-600" />
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">
                            3. Outils de mesure d&apos;audience & Tracking des clics de parrainage
                        </h2>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                        <p>
                            Afin d&apos;assurer le suivi technique de notre activité et d&apos;optimiser la pertinence des offres proposées, notre site utilise deux outils d&apos;analyse respectueux de votre anonymat :
                        </p>
                        
                        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-2">
                            <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                                📊 Outil de suivi des parrainages (Affiliate Pulse Tracker) :
                            </h3>
                            <p>
                                Ce script interne enregistre les interactions clés effectuées sur le site : <strong>la copie d&apos;un code promo</strong> et <strong>le clic sur un bouton d&apos;activation d&apos;offre</strong>.
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-slate-700 text-[11px] sm:text-xs">
                                <li><strong>Données mesurées :</strong> nom de l&apos;offre sélectionnée, code copié, heure de l&apos;interaction, composant cliqué (carte, bannière, bouton sticky) et type d&apos;appareil.</li>
                                <li><strong>Anonymat absolu :</strong> aucune donnée nominative n&apos;est enregistrée. Aucune adresse IP n&apos;est stockée en clair. Les données sont agrégées sous forme de statistiques de volume.</li>
                                <li><strong>Finalité légale :</strong> s&apos;assurer du bon fonctionnement des liens affiliés, mesurer quelles primes sont les plus demandées pour les renouveler, et justifier des volumes auprès de nos marques partenaires.</li>
                            </ul>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                            <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                                📈 Vercel Analytics :
                            </h3>
                            <p className="text-slate-600 text-[11px] sm:text-xs">
                                Solution d&apos;audience sans cookie (cookieless) mesurant le trafic global (pages vues, pays d&apos;origine, type de navigateur). Conforme par défaut aux recommandations de la CNIL sans nécessiter de bandeau cookie intrusif.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. Liens d'affiliation & Cookies des plateformes tierces */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                        4. Redirection vers les partenaires & Cookies tiers
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                        Lorsque vous cliquez sur un lien partenaire pour profiter d&apos;une prime (Revolut, Fortuneo, BoursoBank, Winamax, etc.), vous êtes redirigé vers l&apos;infrastructure sécurisée de la marque concernée.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Ces plateformes tierces ou leurs régies d&apos;affiliation (Awin, Kwanko, etc.) peuvent déposer un cookie technique de traçage sur votre terminal. Ce cookie sert exclusivement à attribuer votre inscription au code parrain ou lien d&apos;invitation pour que votre prime de bienvenue soit correctement créditée. Ces cookies sont régis par les politiques de confidentialité respectives de chaque établissement partenaire.
                    </p>
                </section>

                {/* 5. Hébergement & Sécurité */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                        5. Hébergement & Sécurité des flux
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Le site est hébergé par <strong>Vercel Inc.</strong> (États-Unis) avec certification SSL complète (chiffrement HTTPS 256 bits). Toutes les connexions sont chiffrées de bout en bout pour empêcher toute interception des flux de navigation.
                    </p>
                </section>

                {/* 6. Vos droits RGPD */}
                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                        6. Vos droits (RGPD & Informatique et Libertés)
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;opposition. Dans la mesure où notre site ne conserve aucun profil nominatif d&apos;utilisateur, ces demandes s&apos;appliquent à vos correspondances par email avec la rédaction.
                    </p>
                    <p className="text-xs text-slate-500 mt-3">
                        Pour toute question relative à vos données : <strong>contact@codes-de-parrainages.com</strong>.
                    </p>
                    <p className="text-[11px] text-slate-400 mt-4">
                        Dernière mise à jour : Novembre 2026.
                    </p>
                </section>
            </div>
        </main>
    );
}
