"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Gift, Menu, X, Calculator, BookOpen, ShieldCheck, FileText, Sparkles } from "lucide-react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Close menu on route change or resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-md flex flex-col items-center border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80 transition-colors">
            <div className="flex h-20 w-full max-w-6xl items-center justify-between px-6">
                <Link 
                    href="/" 
                    className="flex items-center gap-3 font-bold text-xl sm:text-2xl tracking-tighter text-slate-900 dark:text-white group"
                    onClick={() => setIsOpen(false)}
                >
                    <span className="p-2 bg-slate-900 dark:bg-slate-950 text-amber-400 rounded-xl shadow-lg ring-4 ring-cyan-500/20 dark:ring-cyan-400/10 border border-cyan-500/30 dark:border-cyan-400/20 group-hover:scale-110 transition-transform">
                        <Gift size={22} />
                    </span>
                    <span className="group-hover:text-primary transition-colors">Codes de Parrainages</span>
                </Link>

                {/* Desktop navigation */}
                <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
                    <Link href="/simulateur" className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-all hover:translate-y-[-1px]">
                        💰 Simulateur
                    </Link>
                    <Link href="/guides" className="hover:text-primary transition-all hover:translate-y-[-1px]">
                        Guides
                    </Link>
                    <Link href="/a-propos" className="hover:text-primary transition-all hover:translate-y-[-1px]">
                        Méthodologie
                    </Link>
                    <Link href="/mentions-legales" className="hover:text-primary transition-all hover:translate-y-[-1px]">
                        Légal
                    </Link>
                </div>

                {/* Mobile hamburger button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-expanded={isOpen}
                    className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile dropdown menu */}
            {isOpen && (
                <div className="md:hidden w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-2xl animate-in slide-in-from-top-2 duration-200">
                    <div className="px-6 py-6 flex flex-col gap-3 max-w-md mx-auto">
                        <Link
                            href="/simulateur"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-base transition-transform active:scale-[0.98]"
                        >
                            <span className="flex items-center gap-3">
                                <Calculator className="h-5 w-5 text-emerald-500" />
                                💰 Simulateur de primes
                            </span>
                            <span className="text-xs bg-emerald-500 text-white font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Top
                            </span>
                        </Link>

                        <Link
                            href="/guides"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-base transition-colors hover:text-primary active:scale-[0.98]"
                        >
                            <BookOpen className="h-5 w-5 text-primary" />
                            Guides & Comparatifs
                        </Link>

                        <Link
                            href="/a-propos"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-base transition-colors hover:text-primary active:scale-[0.98]"
                        >
                            <ShieldCheck className="h-5 w-5 text-amber-500" />
                            Méthodologie & Vérification
                        </Link>

                        <Link
                            href="/mentions-legales"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-base transition-colors hover:text-primary active:scale-[0.98]"
                        >
                            <FileText className="h-5 w-5 text-slate-400" />
                            Mentions Légales & Confidentialité
                        </Link>

                        <div className="pt-2">
                            <Link
                                href="/#grid-offres"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-primary text-white font-bold text-sm shadow-md shadow-primary/20 active:scale-[0.98]"
                            >
                                <Sparkles className="h-4 w-4" />
                                Voir les 50 offres vérifiées
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
