import Link from "next/link";
import { Gift, ShieldCheck, Zap, ChevronRight, ExternalLink } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full relative mt-24 border-t border-slate-200/80 bg-white/80 backdrop-blur-xl">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

            <div className="w-full max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="space-y-6 md:col-span-4">
                        <Link href="/" className="inline-flex items-center gap-3 font-bold text-2xl tracking-tight text-slate-900">
                            <span className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl shadow-md shadow-blue-500/20">
                                <Gift size={22} />
                            </span>
                            Codes de Parrainages
                        </Link>
                        <p className="text-slate-600 leading-relaxed text-sm max-w-sm">
                            La plateforme indépendante pour optimiser vos ouvertures de comptes. Tous les codes et liens de parrainage sont testés et vérifiés chaque semaine.
                        </p>
                        <div className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 rounded-full w-fit">
                            <ShieldCheck size={15} className="text-emerald-600" />
                            <span>100% Vérifié & Sécurisé</span>
                        </div>
                    </div>

                    <div className="space-y-5 md:col-span-3">
                        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                            Offres Stars
                        </h3>
                        <ul className="space-y-2.5 text-sm text-slate-600">
                            {[
                                { name: "Fortuneo Banque", href: "/parrainage-fortuneo" },
                                { name: "BoursoBank", href: "/parrainage-boursobank" },
                                { name: "Revolut", href: "/parrainage-revolut" },
                                { name: "N26", href: "/parrainage-n26" },
                                { name: "Sumeria (ex-Lydia)", href: "/parrainage-sumeria" },
                                { name: "Trade Republic", href: "/parrainage-trade-republic" },
                                { name: "Robinhood Crypto", href: "/parrainage-robinhood" },
                                { name: "Kraken", href: "/parrainage-kraken" },
                                { name: "Winamax", href: "/parrainage-winamax" },
                                { name: "Unibet", href: "/parrainage-unibet" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-blue-600 transition-colors flex items-center gap-2">
                                        <ChevronRight size={12} className="text-slate-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-5 md:col-span-2">
                        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                            Catégories
                        </h3>
                        <ul className="space-y-2.5 text-sm text-slate-600">
                            {[
                                { name: "Néobanques", href: "/categorie/banque-finance" },
                                { name: "Crypto", href: "/categorie/crypto" },
                                { name: "Sport & Santé", href: "/categorie/sport-sante" },
                                { name: "Shopping", href: "/categorie/shopping" },
                                { name: "Jeux & Gains", href: "/categorie/jeux-gains" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-blue-600 transition-colors flex items-center gap-2">
                                        <ChevronRight size={12} className="text-slate-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-5 md:col-span-3">
                        <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                            Navigation
                        </h3>
                        <ul className="space-y-2.5 text-sm text-slate-600">
                            {[
                                { name: "Simulateur de primes", href: "/simulateur" },
                                { name: "Tous les Guides", href: "/guides" },
                                { name: "Plan du site", href: "/plan-du-site" },
                                { name: "Méthodologie", href: "/a-propos" },
                                { name: "Cadre Légal", href: "/mentions-legales" },
                                { name: "Confidentialité", href: "/politique-de-confidentialite" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-blue-600 transition-colors flex items-center gap-2">
                                        <ChevronRight size={12} className="text-slate-300" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[11px] text-slate-500 leading-relaxed md:max-w-xl text-center md:text-left">
                        Codes Parrainages 2026. Répertoire indépendant de bons plans. Les marques citées appartiennent à leurs propriétaires respectifs.
                    </p>
                    <p className="text-xs font-semibold text-slate-400 whitespace-nowrap">
                        &copy; {new Date().getFullYear()} Codes de Parrainages
                    </p>
                </div>
            </div>
        </footer>
    );
}
