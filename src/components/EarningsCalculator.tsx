"use client";

import { useState, useEffect } from "react";
import { CompanyLogo } from "./CompanyLogo";
import { Check, Banknote, Sparkles } from "lucide-react";

import referralsData from "@/data/referrals.json";

const extractValue = (advantage: string) => {
    // Normalise les espaces entre les chiffres (ex: "2 500" -> "2500")
    const cleaned = advantage.replace(/(\d)\s+(?=\d)/g, '$1');
    // Cherche tous les nombres suivis d'une devise
    const matches = cleaned.match(/(\d+)\s*(?:€|\$|USDC|£)/g);
    
    if (matches) {
        const values = matches.map(m => parseInt(m.replace(/\D/g, ''), 10));
        return Math.max(...values);
    }
    return 0;
};

const dynamicOffers = referralsData.map((ref) => ({
    slug: ref.slug,
    name: ref.name,
    value: extractValue(ref.advantage),
    logoUrl: ref.logoUrl,
    desc: ref.category
})).sort((a, b) => b.value - a.value);

export function EarningsCalculator() {
    // By default, assume the user has none of them, so all are checked
    const [checkedState, setCheckedState] = useState<boolean[]>(new Array(dynamicOffers.length).fill(true));
    const [total, setTotal] = useState(0);
    const [animatedTotal, setAnimatedTotal] = useState(0);

    const handleOnChange = (position: number) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
    };

    useEffect(() => {
        const newTotal = checkedState.reduce(
            (sum, currentState, index) => {
                if (currentState === true) {
                    return sum + dynamicOffers[index].value;
                }
                return sum;
            },
            0
        );
        setTotal(newTotal);
    }, [checkedState]);

    // Animate the total number
    useEffect(() => {
        const duration = 500;
        const steps = 20;
        const stepTime = Math.abs(Math.floor(duration / steps));
        let tempTotal = animatedTotal;
        const difference = total - animatedTotal;
        const increment = difference / steps;

        if (difference === 0) return;

        const timer = setInterval(() => {
            tempTotal += increment;
            if ((increment > 0 && tempTotal >= total) || (increment < 0 && tempTotal <= total)) {
                setAnimatedTotal(total);
                clearInterval(timer);
            } else {
                setAnimatedTotal(Math.round(tempTotal));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [total, animatedTotal]);

    return (
        <section className="w-full relative overflow-hidden my-16 glass-card rounded-[2rem] p-6 sm:p-10 border-2 border-primary/20 shadow-xl shadow-primary/5">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center">
                
                {/* Left side: Checklist */}
                <div className="flex-1 w-full">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 text-primary rounded-xl">
                            <Sparkles size={24} />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                            Simulateur de gains
                        </h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        Cochez les applications que vous <strong>n&apos;utilisez pas encore</strong> pour découvrir combien vous pourriez gagner en cumulé aujourd&apos;hui.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {dynamicOffers.map((offer, index) => (
                            <label
                                key={index}
                                className={`flex items-center p-3 rounded-2xl cursor-pointer transition-all border-2 ${
                                    checkedState[index] 
                                    ? "bg-white dark:bg-slate-800 border-primary/50 shadow-sm" 
                                    : "bg-slate-50 dark:bg-slate-900 border-transparent opacity-60 grayscale"
                                } hover:border-primary/30 group`}
                            >
                                <div className="h-10 w-10 shrink-0 bg-white dark:bg-slate-950 rounded-xl p-2 mr-3 border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden">
                                    <CompanyLogo url={offer.logoUrl || ""} name={offer.name} />
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-primary transition-colors">{offer.name}</div>
                                    <div className="text-xs text-slate-500">{offer.desc}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">+{offer.value}€</span>
                                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                                        checkedState[index] ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-700 text-transparent"
                                    }`}>
                                        <Check size={14} />
                                    </div>
                                </div>
                                {/* Hidden checkbox for accessibility */}
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={checkedState[index]}
                                    onChange={() => handleOnChange(index)}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                {/* Right side: Total Display */}
                <div className="flex-shrink-0 w-full lg:w-80 bg-slate-900 dark:bg-slate-950 rounded-[2rem] p-8 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-primary to-emerald-400"></div>
                    <div className="mb-2 opacity-80 text-sm font-medium uppercase tracking-widest text-slate-300 flex items-center justify-center gap-2">
                        <Banknote size={16} /> Total potentiel
                    </div>
                    <div className="text-6xl sm:text-7xl font-black mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">
                        {animatedTotal}€
                    </div>
                    
                    <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                        Ce montant n&apos;attend que vous ! Parcourez notre catalogue et utilisez nos codes certifiés pour récupérer ces primes.
                    </p>
                    
                    <button 
                        onClick={() => {
                            if (window.location.pathname === '/') {
                                document.getElementById('grid-offres')?.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                window.location.href = '/#grid-offres';
                            }
                        }}
                        className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold flex justify-center items-center gap-2 transition-all active:scale-95"
                    >
                        Récupérer mes primes
                    </button>
                </div>
            </div>
        </section>
    );
}
