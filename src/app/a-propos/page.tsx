import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Search, Award, Home, ChevronRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Notre Méthodologie — Codes Parrainages Testés & Vérifiés',
    description: 'Pourquoi ces codes de parrainage sont-ils fiables ? Découvrez la règle des 30 jours : je teste personnellement chaque offre avant de la publier. 100% indépendant et transparent.',
    alternates: {
        canonical: "/a-propos",
    },
};

const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Codes de Parrainages",
    "url": "https://codes-de-parrainages.com/a-propos",
    "logo": "https://codes-de-parrainages.com/favicon.png",
    "description": "Répertoire indépendant et vérifié de codes de parrainage et offres de bienvenue.",
    "knowsAbout": ["Banques en ligne", "Finances personnelles", "Cryptomonnaies", "Programmes de parrainage"]
};

export default function AboutPage() {
    return (
        <main className="min-h-screen px-4 py-5 sm:px-6 sm:py-10 max-w-4xl mx-auto">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-6 overflow-x-auto whitespace-nowrap">
                <Link href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <Home size={13} />
                    <span>Accueil</span>
                </Link>
                <ChevronRight size={12} className="text-slate-300 shrink-0" />
                <span className="text-slate-900 font-semibold truncate">
                    Notre Méthodologie
                </span>
            </nav>

            <header className="mb-8 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold mb-3">
                    <ShieldCheck size={13} />
                    <span>Transparence & Indépendance</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2">
                    Notre <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Méthodologie</span> de Test
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    Parce que la confiance ne s&apos;achète pas, elle se prouve. Découvrez comment chaque offre est rigoureusement testée avant d&apos;être recommandée.
                </p>
            </header>

            <div className="space-y-6">
                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <Search size={20} />
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">
                            La genèse du projet
                        </h2>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                        <p>
                            Comme beaucoup d&apos;internautes, j&apos;en avais assez de perdre mon temps sur des plateformes de coupons truffées de codes périmés, de liens d&apos;affiliation déguisés et de primes fantômes destinées uniquement à générer des clics.
                        </p>
                        <p>
                            <strong>Codes de Parrainages</strong> a été créé avec une obsession : proposer un répertoire clair, ergonomique et 100% fiable, où chaque offre est vérifiée et maintenue à jour semaine après semaine.
                        </p>
                    </div>
                </section>

                <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                            <ShieldCheck size={20} />
                        </div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">
                            Le protocole de vérification des 30 jours
                        </h2>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                        <p>
                            Pour figurer sur ce comparateur, chaque service doit satisfaire 3 critères stricts :
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                                <div className="font-bold text-slate-900 text-xs mb-1 flex items-center gap-1">
                                    <CheckCircle2 size={13} className="text-emerald-600" />
                                    1. Test Réel
                                </div>
                                <p className="text-[11px] text-slate-500">Ouverture de compte et versement effectif de la prime testés en conditions réelles.</p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                                <div className="font-bold text-slate-900 text-xs mb-1 flex items-center gap-1">
                                    <CheckCircle2 size={13} className="text-emerald-600" />
                                    2. Veille Continue
                                </div>
                                <p className="text-[11px] text-slate-500">Mise à jour mensuelle des montants promotionnels et des conditions d&apos;éligibilité.</p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                                <div className="font-bold text-slate-900 text-xs mb-1 flex items-center gap-1">
                                    <CheckCircle2 size={13} className="text-emerald-600" />
                                    3. Zéro Coût Caché
                                </div>
                                <p className="text-[11px] text-slate-500">Vérification de l&apos;absence de frais cachés ou de conditions d&apos;engagement abusives.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
