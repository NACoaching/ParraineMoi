import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, ShieldCheck, Lock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Politique de Confidentialité — Codes de Parrainages',
    description: 'Politique de confidentialité et de protection des données personnelles du site Codes de Parrainages.',
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
                    Politique de <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Confidentialité</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                    Nous accordons une importance primordiale au respect de votre vie privée et à la sécurité de vos données de navigation.
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">1. Responsable du traitement</h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Le site <strong>codes-de-parrainages.com</strong> est édité à titre personnel. Le responsable du traitement des données personnelles est l&apos;éditeur du site.
                    </p>
                </section>

                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">2. Données collectées</h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Ce site ne collecte <strong>aucune donnée personnelle directement</strong>. Aucun formulaire d&apos;inscription obligatoire n&apos;est imposé pour consulter les codes. Aucun cookie publicitaire intrusif n&apos;est déposé à votre insu.
                    </p>
                </section>

                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">3. Statistiques & Analytics</h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Ce site utilise <strong>Vercel Analytics</strong>, une solution d&apos;analyse de trafic respectueuse de la vie privée qui ne dépose aucun cookie traceur et anonymise les adresses IP. Les statistiques recueillies sont strictement globales (nombre de visites, pages consultées, pays d&apos;origine).
                    </p>
                </section>

                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">4. Liens d&apos;affiliation & Cookies Partenaires</h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Lorsque vous cliquez sur un lien de parrainage ou d&apos;affiliation, vous quittez notre site pour être redirigé vers la plateforme officielle de la marque partenaire (Revolut, Fortuneo, etc.). Ces services tiers appliquent leur propre politique de cookies techniques pour valider l&apos;attribution de votre bonus de bienvenue.
                    </p>
                </section>

                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">5. Hébergement & Sécurité</h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Le site est hébergé par <strong>Vercel Inc.</strong> avec chiffrement HTTPS / SSL systématique de l&apos;ensemble des échanges.
                    </p>
                </section>

                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">6. Vos droits (RGPD)</h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;effacement. Étant donné qu&apos;aucune base de données d&apos;utilisateurs nominatifs n&apos;est constituée, ces droits s&apos;appliquent à vos éventuelles correspondances directes avec l&apos;éditeur.
                    </p>
                    <p className="text-[11px] text-slate-400 mt-4">
                        Dernière mise à jour : Novembre 2026.
                    </p>
                </section>
            </div>
        </main>
    );
}
