"use client";

import { useState, useEffect, useMemo } from "react";
import { CompanyLogo } from "./CompanyLogo";
import { 
    Check, 
    Banknote, 
    Sparkles, 
    Share2, 
    Code2, 
    Copy, 
    RotateCcw, 
    Search,
    CheckSquare,
    ExternalLink
} from "lucide-react";
import { referrals } from "@/lib/data";

const extractValue = (advantage: string) => {
    const cleaned = advantage.replace(/(\d)\s+(?=\d)/g, '$1');
    const matches = cleaned.match(/(\d+)\s*(?:€|\$|USDC|£)/g);
    
    if (matches) {
        const values = matches.map(m => parseInt(m.replace(/\D/g, ''), 10));
        return Math.max(...values);
    }
    return 0;
};

interface OfferItem {
    id: string;
    slug: string;
    name: string;
    value: number;
    logoUrl?: string;
    category: string;
}

const allOffers: OfferItem[] = referrals.map((ref) => ({
    id: ref.slug,
    slug: ref.slug,
    name: ref.name,
    value: extractValue(ref.advantage),
    logoUrl: ref.logoUrl,
    category: ref.category
})).sort((a, b) => b.value - a.value);

const CATEGORIES = [
    { label: "Toutes les offres", value: "all" },
    { label: "💳 Banques", value: "Banque & Finance" },
    { label: "🪙 Crypto", value: "Crypto" },
    { label: "🛍️ Shopping & Cashback", value: "Shopping" },
    { label: "🎮 Jeux & Paris", value: "Jeux & Gains|Paris Sportifs & Poker" },
];

export function EarningsCalculator() {
    // Selected offer IDs (set of slugs)
    const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(allOffers.map(o => o.id)));
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [animatedTotal, setAnimatedTotal] = useState(0);
    const [copiedShare, setCopiedShare] = useState(false);
    const [copiedEmbed, setCopiedEmbed] = useState(false);
    const [showEmbedCode, setShowEmbedCode] = useState(false);

    // Filtered offers by category and search
    const filteredOffers = useMemo(() => {
        return allOffers.filter(offer => {
            const matchesSearch = offer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                offer.category.toLowerCase().includes(searchQuery.toLowerCase());
            
            if (!matchesSearch) return false;

            if (selectedCategory === "all") return true;
            if (selectedCategory.includes("|")) {
                const cats = selectedCategory.split("|");
                return cats.includes(offer.category);
            }
            return offer.category === selectedCategory;
        });
    }, [searchQuery, selectedCategory]);

    // Calculate real total from selected IDs
    const total = useMemo(() => {
        let sum = 0;
        allOffers.forEach(o => {
            if (selectedIds.has(o.id)) {
                sum += o.value;
            }
        });
        return sum;
    }, [selectedIds]);

    const selectedCount = selectedIds.size;

    const toggleOffer = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const selectAllCurrent = () => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            filteredOffers.forEach(o => next.add(o.id));
            return next;
        });
    };

    const deselectAllCurrent = () => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            filteredOffers.forEach(o => next.delete(o.id));
            return next;
        });
    };

    const resetAll = () => {
        setSelectedIds(new Set(allOffers.map(o => o.id)));
        setSearchQuery("");
        setSelectedCategory("all");
    };

    // Animate total counter
    useEffect(() => {
        const duration = 400;
        const steps = 15;
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

    const handleShare = async () => {
        const text = `💰 J'ai calculé ${animatedTotal}€ de primes cumulables en ouvrant des comptes gratuits sur le Simulateur Codes de Parrainages ! Calculez vos gains réels :`;
        const url = "https://codes-de-parrainages.com/simulateur";

        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({
                    title: "Simulateur de Gains de Parrainage",
                    text,
                    url,
                });
                return;
            } catch {
                // Fallback to clipboard
            }
        }

        if (typeof navigator !== "undefined" && navigator.clipboard) {
            await navigator.clipboard.writeText(`${text}\n${url}`);
            setCopiedShare(true);
            setTimeout(() => setCopiedShare(false), 2500);
        }
    };

    const embedSnippet = `<iframe src="https://codes-de-parrainages.com/simulateur" width="100%" height="700" style="border:none;border-radius:16px;" title="Simulateur de Parrainage 2026"></iframe>\n<p style="font-size:12px;color:#64748b;margin-top:8px;">Outil fourni par <a href="https://codes-de-parrainages.com/simulateur" target="_blank" rel="noopener" style="color:#0284c7;font-weight:bold;">Codes de Parrainages</a></p>`;

    const handleCopyEmbed = async () => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            await navigator.clipboard.writeText(embedSnippet);
            setCopiedEmbed(true);
            setTimeout(() => setCopiedEmbed(false), 2500);
        }
    };

    return (
        <section className="w-full relative overflow-hidden my-12 glass-card rounded-[2.5rem] p-6 sm:p-10 border-2 border-primary/20 shadow-2xl shadow-primary/5">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-start">
                
                {/* Left side: Checklist & Controls */}
                <div className="flex-1 w-full min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-primary/10 text-primary rounded-2xl">
                                <Sparkles size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                                    Simulateur de gains
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500">
                                    Sélectionnez les services que vous <strong>n&apos;utilisez pas encore</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Reset button */}
                        <button
                            type="button"
                            onClick={resetAll}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-primary transition-colors self-start sm:self-center"
                        >
                            <RotateCcw size={14} />
                            Réinitialiser
                        </button>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.value}
                                type="button"
                                onClick={() => setSelectedCategory(cat.value)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                    selectedCategory === cat.value
                                        ? "bg-primary text-white shadow-md shadow-primary/25"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Search & Bulk Selection Toolbar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-slate-50/70 dark:bg-slate-900/40 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800/60">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Rechercher une marque (Revolut, Fortuneo...)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40"
                            />
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                                type="button"
                                onClick={selectAllCurrent}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 hover:text-primary border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                            >
                                Tout cocher
                            </button>
                            <button
                                type="button"
                                onClick={deselectAllCurrent}
                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 hover:text-rose-500 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                            >
                                Tout décocher
                            </button>
                        </div>
                    </div>

                    {/* List of Offers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[520px] overflow-y-auto pr-1">
                        {filteredOffers.length === 0 ? (
                            <div className="col-span-2 py-8 text-center text-slate-400 text-sm">
                                Aucune offre ne correspond à votre recherche.
                            </div>
                        ) : (
                            filteredOffers.map((offer) => {
                                const isChecked = selectedIds.has(offer.id);
                                return (
                                    <div
                                        key={offer.id}
                                        onClick={() => toggleOffer(offer.id)}
                                        className={`flex items-center p-3 rounded-2xl cursor-pointer transition-all border-2 select-none ${
                                            isChecked 
                                            ? "bg-white dark:bg-slate-800/90 border-primary/50 shadow-sm" 
                                            : "bg-slate-50 dark:bg-slate-900/60 border-transparent opacity-60 grayscale"
                                        } hover:border-primary/40 group`}
                                    >
                                        <div className="h-10 w-10 shrink-0 bg-white dark:bg-slate-950 rounded-xl p-1.5 mr-3 border border-slate-100 dark:border-slate-800 flex items-center justify-center overflow-hidden">
                                            <CompanyLogo url={offer.logoUrl || ""} name={offer.name} />
                                        </div>
                                        <div className="flex-1 min-w-0 pr-2">
                                            <div className="font-bold text-slate-900 dark:text-white text-sm truncate group-hover:text-primary transition-colors">
                                                {offer.name}
                                            </div>
                                            <div className="text-[11px] text-slate-400 truncate">
                                                {offer.category}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2.5 shrink-0">
                                            <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
                                                +{offer.value}€
                                            </span>
                                            <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                                                isChecked ? "bg-primary text-white" : "bg-slate-200 dark:bg-slate-700 text-transparent"
                                            }`}>
                                                <Check size={13} strokeWidth={3} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Right side: Total Display & Viral Linkable Actions */}
                <div className="flex-shrink-0 w-full lg:w-84 bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] p-7 text-center text-white relative overflow-hidden shadow-2xl border border-slate-800">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-primary to-cyan-400" />
                    
                    <div className="mb-2 opacity-80 text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center justify-center gap-1.5">
                        <Banknote size={15} /> Total maximum estimé
                    </div>
                    
                    <div className="text-5xl sm:text-6xl font-black mb-3 tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-100 to-slate-400">
                        {animatedTotal}€
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-bold mb-5">
                        <CheckSquare size={13} />
                        {selectedCount} offre{selectedCount > 1 ? "s" : ""} sélectionnée{selectedCount > 1 ? "s" : ""}
                    </div>
                    
                    <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                        Ce montant correspond au cumul des primes de bienvenue vérifiées. Les montants peuvent varier selon les conditions propres à chaque plateforme.
                    </p>
                    
                    {/* Primary CTA */}
                    <button 
                        type="button"
                        onClick={() => {
                            if (window.location.pathname === '/') {
                                document.getElementById('grid-offres')?.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                window.location.href = '/#grid-offres';
                            }
                        }}
                        className="w-full py-3.5 px-5 mb-3 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-sm flex justify-center items-center gap-2 shadow-lg shadow-primary/25 transition-all active:scale-95"
                    >
                        <Sparkles size={16} />
                        Récupérer mes primes
                    </button>

                    {/* Secondary Share Button (Linkable asset) */}
                    <button
                        type="button"
                        onClick={handleShare}
                        className="w-full py-3 px-5 mb-3 bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white rounded-2xl font-semibold text-xs flex justify-center items-center gap-2 border border-white/10 transition-all active:scale-95"
                    >
                        <Share2 size={14} />
                        {copiedShare ? "Lien copié dans le presse-papier !" : "Partager mon estimation"}
                    </button>

                    {/* Embed Widget trigger for Backlinks */}
                    <div className="pt-2 border-t border-slate-800">
                        <button
                            type="button"
                            onClick={() => setShowEmbedCode(!showEmbedCode)}
                            className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-primary transition-colors"
                        >
                            <Code2 size={13} />
                            {showEmbedCode ? "Masquer le code d'intégration" : "Intégrer ce widget sur votre blog / site"}
                        </button>

                        {showEmbedCode && (
                            <div className="mt-3 p-3 bg-slate-800/80 rounded-xl text-left border border-slate-700 animate-in fade-in duration-150">
                                <p className="text-[11px] text-slate-300 font-semibold mb-2">
                                    Code HTML à copier sur votre site :
                                </p>
                                <textarea
                                    readOnly
                                    rows={3}
                                    value={embedSnippet}
                                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-[10px] font-mono text-slate-300 focus:outline-none resize-none mb-2"
                                />
                                <button
                                    type="button"
                                    onClick={handleCopyEmbed}
                                    className="w-full py-1.5 px-3 bg-primary text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-colors"
                                >
                                    <Copy size={12} />
                                    {copiedEmbed ? "Copié !" : "Copier le code widget"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
