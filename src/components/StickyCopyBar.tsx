"use client";

import { useState, useEffect } from "react";
import { CopyButton } from "./CopyButton";
import { CompanyLogo } from "./CompanyLogo";
import { ExternalLink, Gift } from "lucide-react";

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
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });
        toggleVisibility();
        
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const hasRealCode = Boolean(code && code.trim() !== "" && !code.startsWith("http"));

    return (
        <div className={`fixed bottom-4 left-3 right-3 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 transition-all duration-300 transform ${
            isVisible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-10 opacity-0 pointer-events-none"
        }`}>
            <div className="bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-2.5 sm:p-3 flex items-center justify-between gap-3 border border-slate-200/90 w-full max-w-lg mx-auto">
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 shrink-0 bg-white border border-slate-200 rounded-xl p-1 flex items-center justify-center overflow-hidden">
                        <CompanyLogo url={logoUrl} name={name} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-slate-900 font-bold text-xs sm:text-sm truncate leading-tight">{name}</span>
                        <span className="text-emerald-700 text-[10px] sm:text-[11px] font-bold truncate flex items-center gap-1">
                            <Gift size={11} className="shrink-0" /> {advantage}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {/* Copy Box for code or link */}
                    {hasRealCode ? (
                        <div className="flex h-9 bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                            <div className="px-2.5 flex items-center justify-center max-w-[110px] overflow-hidden">
                                <span className="text-slate-900 font-mono font-bold text-xs truncate">
                                    {code}
                                </span>
                            </div>
                            <CopyButton 
                                code={code} 
                                referralName={name} 
                                advantage={advantage} 
                                showText={false} 
                                className="!h-full !rounded-none bg-blue-600 hover:bg-blue-700 text-white border-none px-3" 
                            />
                        </div>
                    ) : link ? (
                        <div className="flex h-9 bg-slate-50 rounded-xl overflow-hidden border border-slate-200">
                            <div className="px-2.5 flex items-center justify-center max-w-[100px] sm:max-w-[130px] overflow-hidden">
                                <span className="text-slate-700 font-mono text-[11px] truncate">
                                    {link}
                                </span>
                            </div>
                            <CopyButton 
                                code={link} 
                                referralName={name} 
                                advantage={advantage} 
                                showText={false} 
                                label="Lien"
                                className="!h-full !rounded-none bg-blue-600 hover:bg-blue-700 text-white border-none px-3" 
                            />
                        </div>
                    ) : null}

                    {/* Direct button */}
                    {hasRealCode && link && (
                        <CopyButton 
                            code={link} 
                            referralName={name} 
                            advantage={advantage} 
                            showText={false} 
                            label="Copier le lien"
                            className="!h-9 !w-9 !rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200 hidden sm:inline-flex" 
                        />
                    )}
                    {link && (
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer sponsored" 
                            data-referral-link="true"
                            onClick={() => {
                                if (typeof window !== "undefined" && (window as any).trackReferral) {
                                    (window as any).trackReferral({
                                        action: "click_link",
                                        referralName: name,
                                        referralCode: code,
                                        advantage: advantage,
                                        sourceComponent: "sticky_bar",
                                    });
                                }
                            }}
                            className="h-9 px-3.5 sm:px-4 flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition-all active:scale-95"
                        >
                            <span>Profiter de l&apos;offre</span>
                            <ExternalLink size={13} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
