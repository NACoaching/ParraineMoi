import Link from "next/link";
import { Gift, ShieldCheck, Zap, Mail, ChevronRight, ExternalLink } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full relative mt-16 border-t border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-950/40 backdrop-blur-3xl">
            {/* Decorative top gradient line */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
                    {/* Colonne 1 : À propos (prend plus de place) */}
                    <div className="space-y-6 md:col-span-5 relative">
                        <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-2xl tracking-tight text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
                            <span className="p-2 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl text-primary shadow-sm border border-primary/10">
                                <Gift size={24} className="animate-pulse" style={{ animationDuration: '3s' }} />
                            </span>
                            Codes Parrainage
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm pr-4">
                            Découvrez notre sélection rigoureuse des meilleurs codes de parrainage et offres de bienvenue. Profitez de réductions immédiates et de crédits offerts sur vos banques, cryptos, et applications du quotidien.
                        </p>
                        <div className="flex items-center gap-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-full w-fit border border-emerald-100 dark:border-emerald-900/50">
                            <ShieldCheck size={14} />
                            <span>100% Offres Vérifiées & Mises à jour</span>
                        </div>
                    </div>

                    {/* Colonne 2 : Offres populaires */}
                    <div className="space-y-5 md:col-span-3">
                        <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wider">
                            <Zap size={16} className="text-amber-500" />
                            Catégories Populaires
                        </h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            {[
                                { name: "Banque & Finance", href: "/categorie/banque-finance" },
                                { name: "Crypto & Investissement", href: "/categorie/crypto" },
                                { name: "Shopping & Cashback", href: "/categorie/shopping" },
                                { name: "Énergie & Internet", href: "/categorie/energie-internet" },
                                { name: "Transports & Mobilité", href: "/categorie/transports" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="group flex items-center gap-1.5 hover:text-primary transition-colors">
                                        <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne 3 : Liens utiles & Légal */}
                    <div className="space-y-5 md:col-span-4">
                        <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wider">
                            <ExternalLink size={16} className="text-slate-400" />
                            Liens utiles
                        </h3>
                        <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                            {[
                                { name: "Notre Méthodologie", href: "/notre-methodologie" },
                                { name: "Guides & Bons Plans", href: "/guides" },
                                { name: "Mentions légales", href: "/mentions-legales" },
                                { name: "Politique de confidentialité", href: "/politique-de-confidentialite" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="group flex items-center gap-1.5 hover:text-primary transition-colors">
                                        <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Disclaimer et Copyright */}
                <div className="mt-16 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed md:max-w-2xl text-center md:text-left">
                        <strong className="font-medium text-slate-500 dark:text-slate-400">Disclaimer:</strong> Les codes de parrainage sont fournis à titre informatif. Les offres peuvent changer sans préavis. Nous pouvons recevoir une commission si vous utilisez nos liens affiliés, ce qui nous aide à maintenir ce site gratuit et sans publicité intrusive.
                    </p>
                    <p className="text-xs font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap">
                        &copy; {new Date().getFullYear()} Codes de Parrainage.
                    </p>
                </div>
            </div>
        </footer>
    );
}
