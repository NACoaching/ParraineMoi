"use client";

import { useState, useEffect } from "react";
import { CopyButton } from "./CopyButton";
import { CompanyLogo } from "./CompanyLogo";
import Link from "next/link";
import { Copy, ExternalLink, Gift } from "lucide-react";

interface StickyCopyBarProps {
    name: string;
    code: string;
    link: string;
    advantage: string;
    logoUrl: string;
}

export function StickyCopyBar({ name, code, link, advantage, logoUrl }: StickyCopyBarProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        // Initial check
        toggleVisibility();
        
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className={`fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 transition-all duration-500 transform ${
            isVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-10 opacity-0 pointer-events-none"
        }`}>
            <div className="bg-slate-900/95 dark:bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-3 flex items-center justify-between gap-4 border border-slate-700/50 dark:border-slate-200/50 w-full max-w-lg mx-auto">
                <div className="flex items-center gap-3 pl-1">
                    <div className="h-10 w-10 shrink-0 bg-white rounded-xl p-1.5 flex items-center justify-center">
                        <CompanyLogo url={logoUrl} name={name} />
                    </div>
                    <div className="flex flex-col hidden sm:flex">
                        <span className="text-white dark:text-slate-900 font-bold text-sm leading-tight">{name}</span>
                        <span className="text-emerald-400 dark:text-emerald-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Gift size={12} /> {advantage}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-1 sm:flex-none justify-end">
                    {/* Copy Box */}
                    <div className="flex bg-slate-800 dark:bg-slate-100 rounded-xl overflow-hidden border border-slate-700 dark:border-slate-300">
                        <div className="px-3 py-2 flex items-center justify-center max-w-[120px] overflow-hidden">
                            <span className="text-slate-200 dark:text-slate-800 font-mono font-bold text-sm truncate">
                                {code}
                            </span>
                        </div>
                        <CopyButton code={code} showText={false} className="rounded-none h-full bg-primary hover:bg-primary/90 text-white border-l border-slate-700 dark:border-slate-300 px-4" />
                    </div>

                    {link && link !== code && (
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="h-10 w-10 flex shrink-0 items-center justify-center bg-slate-800 dark:bg-slate-100 text-slate-300 dark:text-slate-600 rounded-xl hover:text-white dark:hover:text-slate-900 transition-colors"
                            aria-label="Ouvrir le lien"
                        >
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
