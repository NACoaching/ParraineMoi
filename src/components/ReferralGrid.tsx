"use client";

import { Search, Star, ArrowRight, X } from "lucide-react";
import { useState, useMemo } from "react";
import { ReferralCard, Referral } from "./ReferralCard";
import Link from "next/link";
import { slugifyCategory } from "@/lib/utils";
import { referrals as allReferrals } from "@/lib/data";

const CATEGORY_ICONS: Record<string, string> = {
    "Toutes": "🌟",
    "Banque & Finance": "💳",
    "Crypto": "🪙",
    "Shopping": "🛍️",
    "Paris Sportifs & Poker": "⚽",
    "Jeux & Gains": "🎮",
    "Sport & Santé": "🏃",
    "Énergie & Internet": "⚡",
    "Outils Numériques": "💻",
};

const POPULAR_SEARCHES = [
    { name: "Fortuneo", query: "Fortuneo" },
    { name: "BoursoBank", query: "BoursoBank" },
    { name: "Revolut", query: "Revolut" },
    { name: "Trade Republic", query: "Trade Republic" },
    { name: "Bitstack", query: "Bitstack" },
];

export function ReferralGrid({ referrals, activeCategoryName: initialCategory = "Toutes" }: { referrals: Referral[], activeCategoryName?: string }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [sortBy, setSortBy] = useState<"relevance" | "amount_desc" | "alpha">("relevance");

    const extractValue = (advantage: string) => {
        const lowerAdvantage = advantage.toLowerCase();
        const isVirtualCurrency = /(coin|pièce|piece|ward|sb|point|%|pourcent)/i.test(lowerAdvantage);
        const numbers = advantage.replace(/\s/g, '').match(/\d+/g);
        if (!numbers) return 0;
        const maxValue = Math.max(...numbers.map(Number));
        return isVirtualCurrency ? maxValue / 10000 : maxValue;
    };

    const allCategories = useMemo(() => {
        const sourceData = initialCategory !== "Toutes" ? referrals : allReferrals;
        const cats = Array.from(new Set(sourceData.map(r => r.category)));
        return ["Toutes", ...cats];
    }, [referrals, initialCategory]);

    const filteredOffers = useMemo(() => {
        const uniqueReferrals = Array.from(new Map(referrals.map(item => [item.id, item])).values());
        let result = uniqueReferrals;

        // Filter by category
        if (activeCategory !== "Toutes") {
            result = result.filter(ref => ref.category === activeCategory);
        }

        // Filter by search term
        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(
                (ref) =>
                    ref.name.toLowerCase().includes(lowerSearch) ||
                    ref.category.toLowerCase().includes(lowerSearch) ||
                    ref.description.toLowerCase().includes(lowerSearch)
            );
        }

        // Sort the results
        if (sortBy === "alpha") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "amount_desc") {
            result.sort((a, b) => extractValue(b.advantage) - extractValue(a.advantage));
        }

        return result;
    }, [searchTerm, activeCategory, sortBy, referrals]);

    const isFiltered = searchTerm !== "" || activeCategory !== "Toutes";

    return (
        <div className="w-full">
            {/* Search & Sort Bar */}
            <div className="mb-3 max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                    {/* Search Input */}
                    <div className="relative flex-grow group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <label htmlFor="search-input" className="sr-only">Rechercher une marque</label>
                        <input
                            id="search-input"
                            type="text"
                            className="block w-full pl-11 pr-10 py-3.5 bg-white border border-slate-200/90 text-slate-900 placeholder-slate-400 rounded-2xl shadow-xs focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm sm:text-base"
                            placeholder="Rechercher une banque, crypto, app (ex: Fortuneo, Revolut)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm("")}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                                aria-label="Effacer la recherche"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative shrink-0">
                        <select
                            aria-label="Trier par"
                            className="appearance-none block w-full sm:w-auto h-full px-4 pr-9 py-3 sm:py-0 bg-white border border-slate-200/90 text-slate-700 rounded-2xl shadow-xs focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer font-semibold text-xs uppercase tracking-wider"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as "relevance" | "amount_desc" | "alpha")}
                        >
                            <option value="relevance">Trier : Recommandé</option>
                            <option value="amount_desc">Trier : + Rentable</option>
                            <option value="alpha">Trier : A-Z</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Quick suggestions */}
                <div className="flex items-center gap-2 mt-3 px-1 text-xs text-slate-500 flex-wrap justify-center sm:justify-start">
                    <span className="font-semibold text-slate-400">Populaires :</span>
                    {POPULAR_SEARCHES.map((item) => (
                        <button
                            key={item.name}
                            type="button"
                            onClick={() => setSearchTerm(item.query)}
                            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-700 transition-colors text-slate-700 font-medium shadow-2xs"
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 mt-5">
                {allCategories.map(cat => {
                    const isActive = activeCategory === cat;
                    const icon = CATEGORY_ICONS[cat] || "🏷️";
                    return (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 border ${isActive
                                ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20"
                                : "bg-white text-slate-600 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 shadow-xs"
                                }`}
                        >
                            <span>{icon}</span>
                            <span>{cat}</span>
                        </button>
                    );
                })}
            </div>

            {/* Filter feedback / reset */}
            {isFiltered && (
                <div className="flex items-center justify-between max-w-5xl mx-auto mb-6 px-2 text-xs text-slate-500">
                    <span>
                        <strong>{filteredOffers.length}</strong> offre{filteredOffers.length > 1 ? "s" : ""} trouvée{filteredOffers.length > 1 ? "s" : ""}
                        {activeCategory !== "Toutes" && <> dans <strong>{activeCategory}</strong></>}
                        {searchTerm && <> pour &ldquo;<strong>{searchTerm}</strong>&rdquo;</>}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchTerm("");
                            setActiveCategory("Toutes");
                        }}
                        className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
                    >
                        <X className="h-3 w-3" />
                        Réinitialiser
                    </button>
                </div>
            )}

            {/* Grid of Offers - 4 colonnes sur desktop pour compacité maximale */}
            {filteredOffers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
                    {filteredOffers.map((referral, index) => {
                        const isFortuneoSpotlight = referral.slug === "fortuneo" && !isFiltered;
                        const val = extractValue(referral.advantage);
                        const forceTopOffers = ["trade-republic", "robinhood", "sumeria"];
                        const excludeTopOffers = ["winamax", "finary"];
                        
                        const isTopOffer = (
                            (val >= 50 && !excludeTopOffers.includes(referral.slug)) || 
                            forceTopOffers.includes(referral.slug)
                        ) && sortBy !== "alpha" && !isFortuneoSpotlight;

                        return (
                            <div key={referral.slug} className="relative">
                                {isFortuneoSpotlight && (
                                    <div className="absolute -top-2.5 -right-2 z-10 bg-amber-400 text-amber-950 text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 pointer-events-none">
                                        <Star className="h-3 w-3 fill-amber-950" /> Star du mois
                                    </div>
                                )}
                                {isTopOffer && (
                                    <div className="absolute -top-2.5 -right-2 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-full shadow-md pointer-events-none">
                                        🔥 Top Offre
                                    </div>
                                )}
                                <ReferralCard referral={referral} index={index} />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16 px-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs max-w-lg mx-auto">
                    <div className="text-3xl mb-3">🔍</div>
                    <p className="text-slate-700 font-bold mb-1">
                        Aucun parrainage ne correspond à votre recherche
                    </p>
                    <p className="text-xs text-slate-500 mb-5">
                        Essayez un autre mot-clé ou réinitialisez les filtres.
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setActiveCategory("Toutes");
                        }}
                        className="text-xs text-blue-600 font-bold hover:underline bg-blue-50 border border-blue-200/60 px-4 py-2 rounded-xl"
                    >
                        Afficher toutes les offres
                    </button>
                </div>
            )}

            {activeCategory !== "Toutes" && !searchTerm && filteredOffers.length > 0 && (
                <div className="mt-12 text-center">
                    <Link
                        href={`/categorie/${slugifyCategory(activeCategory)}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-md"
                    >
                        Voir tous nos conseils {activeCategory}
                        <ArrowRight size={16} />
                    </Link>
                </div>
            )}
        </div>
    );
}
