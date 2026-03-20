import Link from "next/link";
import { Gift, ShieldCheck, Zap, ChevronRight, ExternalLink } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full relative mt-32 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-950/50 backdrop-blur-2xl">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

            <div className="w-full max-w-6xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                    <div className="space-y-8 md:col-span-5">
                        <Link href="/" className="inline-flex items-center gap-3 font-bold text-2xl tracking-tighter text-slate-900 dark:text-white">
                            <span className="p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl shadow-md">
                                <Gift size={24} />
                            </span>
                            Codes de Parrainages
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm max-w-sm">
                            La plateforme de référence pour optimiser vos inscriptions. Tous les codes sont vérifiés manuellement par notre équipe pour vous garantir les meilleurs bonus.
                        </p>
                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2 rounded-full w-fit border border-emerald-100 dark:border-emerald-900/30">
                            <ShieldCheck size={14} />
                            <span>100% Vérifié & Sécurisé</span>
                        </div>
                    </div>

                    <div className="space-y-6 md:col-span-3">
                        <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-[0.2em]">
                            Univers
                        </h3>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            {[
                                { name: "Néobanques", href: "/categorie/banque-finance" },
                                { name: "Crypto", href: "/categorie/crypto" },
                                { name: "Shopping", href: "/categorie/shopping" },
                                { name: "Énergie", href: "/categorie/energie-internet" },
                                { name: "Jeux & Gains", href: "/categorie/jeux-gains" },
                                { name: "Outils Numériques", href: "/categorie/outils-numeriques" },
                                { name: "Paris Sportifs", href: "/categorie/paris-sportifs-poker" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-primary transition-colors flex items-center gap-2">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6 md:col-span-4">
                        <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-[0.2em]">
                            Navigation
                        </h3>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                            {[
                                { name: "Tous les Guides", href: "/guides" },
                                { name: "Plan du site", href: "/plan-du-site" },
                                { name: "Méthodologie", href: "/a-propos" },
                                { name: "Cadre Légal", href: "/mentions-legales" },
                                { name: "Confidentialité", href: "/politique-de-confidentialite" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-primary transition-colors flex items-center gap-2">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-10 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed md:max-w-xl text-center md:text-left uppercase tracking-wider font-medium">
                        Disclaimer: Codes Parrainage 2026. Nous ne sommes pas une institution financière. Les offres sont soumises aux conditions des partenaires.
                    </p>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 whitespace-nowrap tracking-tighter">
                        &copy; {new Date().getFullYear()} CODES DE PARRAINAGES. STUDIO.
                    </p>
                </div>
            </div>
        </footer>
    );
}
