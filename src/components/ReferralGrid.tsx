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

export function ReferralGrid({ referrals, activeCategoryName: initialCategory = "Toutes" }: { referrals: Referral[], activeCategoryName?: string }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [selectedOfferSlug, setSelectedOfferSlug] = useState("");

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

    const allOfferNames = useMemo(() => {
        return referrals
            .map(r => ({ name: r.name, slug: r.slug }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [referrals]);

    const filteredOffers = useMemo(() => {
        const uniqueReferrals = Array.from(new Map(referrals.map(item => [item.id, item])).values());
        let result = uniqueReferrals;

        // Filter by category
        if (activeCategory !== "Toutes") {
            result = result.filter(ref => ref.category === activeCategory);
        }

        // Filter by dropdown selection
        if (selectedOfferSlug) {
            result = result.filter(ref => ref.slug === selectedOfferSlug);
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

        return result;
    }, [searchTerm, activeCategory, selectedOfferSlug, referrals]);

    const isFiltered = searchTerm !== "" || activeCategory !== "Toutes" || selectedOfferSlug !== "";

    return (
        <div className="w-full">
            {/* Search & All-Offers Dropdown Bar */}
            <div className="mb-3 max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-2.5 items-stretch">
                    {/* Search Input */}
                    <div className="relative flex-grow group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <label htmlFor="search-input" className="sr-only">Rechercher une marque</label>
                        <input
                            id="search-input"
                            type="text"
                            className="block w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200/90 text-slate-900 placeholder-slate-400 rounded-xl shadow-2xs focus:outline-none focus:ring-3 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-xs sm:text-sm"
                            placeholder="Rechercher une banque, crypto, app (ex: Fortuneo, Revolut)..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setSelectedOfferSlug("");
                            }}
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm("")}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                                aria-label="Effacer la recherche"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </div>

                    {/* All Offers Dropdown (replaced Trier) */}
                    <div className="relative sm:min-w-[210px] shrink-0">
                        <select
                            aria-label="Toutes les offres"
                            className="appearance-none block w-full h-full px-3.5 pr-8 py-2.5 bg-white border border-slate-200/90 text-slate-700 rounded-xl shadow-2xs focus:outline-none focus:ring-3 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer font-medium text-xs truncate"
                            value={selectedOfferSlug}
                            onChange={(e) => {
                                setSelectedOfferSlug(e.target.value);
                                setSearchTerm("");
                            }}
                        >
                            <option value="">Toutes les offres ({allOfferNames.length})</option>
                            {allOfferNames.map(offer => (
                                <option key={offer.slug} value={offer.slug}>{offer.name}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-5 mt-2">
                {allCategories.map(cat => {
                    const isActive = activeCategory === cat;
                    const icon = CATEGORY_ICONS[cat] || "🏷️";
                    return (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveCategory(cat);
                                setSelectedOfferSlug("");
                            }}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 border ${isActive
                                ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                                : "bg-white text-slate-600 border-slate-200/90 hover:border-slate-300 hover:bg-slate-50 shadow-2xs"
                                }`}
                        >
                            <span className="text-xs">{icon}</span>
                            <span>{cat}</span>
                        </button>
                    );
                })}
            </div>

            {/* Filter feedback / reset */}
            {isFiltered && (
                <div className="flex items-center justify-between max-w-5xl mx-auto mb-4 px-2 text-xs text-slate-500">
                    <span>
                        <strong>{filteredOffers.length}</strong> offre{filteredOffers.length > 1 ? "s" : ""} trouvée{filteredOffers.length > 1 ? "s" : ""}
                        {activeCategory !== "Toutes" && <> dans <strong>{activeCategory}</strong></>}
                        {selectedOfferSlug && <> pour <strong>{allOfferNames.find(o => o.slug === selectedOfferSlug)?.name}</strong></>}
                        {searchTerm && <> pour &ldquo;<strong>{searchTerm}</strong>&rdquo;</>}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedOfferSlug("");
                            setActiveCategory("Toutes");
                        }}
                        className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
                    >
                        <X className="h-3 w-3" />
                        Réinitialiser
                    </button>
                </div>
            )}

            {/* Grid of Offers - 2 colonnes sur mobile, 3 sur tablette, 4 sur desktop */}
            {filteredOffers.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3.5">
                    {filteredOffers.map((referral, index) => {
                        const isFortuneoSpotlight = referral.slug === "fortuneo" && !isFiltered;
                        const val = extractValue(referral.advantage);
                        const forceTopOffers = ["trade-republic", "robinhood", "sumeria"];
                        const excludeTopOffers = ["winamax", "finary"];
                        
                        const isTopOffer = (
                            (val >= 50 && !excludeTopOffers.includes(referral.slug)) || 
                            forceTopOffers.includes(referral.slug)
                        ) && !isFortuneoSpotlight;

                        return (
                            <div key={referral.slug} className="relative">
                                {isFortuneoSpotlight && (
                                    <div className="absolute -top-2 -right-1 sm:-top-2.5 sm:-right-2 z-10 bg-amber-400 text-amber-950 text-[8px] sm:text-[10px] uppercase font-black tracking-wider px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full shadow-xs flex items-center gap-0.5 sm:gap-1 pointer-events-none">
                                        <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-amber-950" /> Star
                                    </div>
                                )}
                                {isTopOffer && (
                                    <div className="absolute -top-2 -right-1 sm:-top-2.5 sm:-right-2 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[8px] sm:text-[10px] uppercase font-black tracking-wider px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full shadow-xs pointer-events-none">
                                        🔥 Top
                                    </div>
                                )}
                                <ReferralCard referral={referral} index={index} />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-12 px-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs max-w-md mx-auto">
                    <div className="text-2xl mb-2">🔍</div>
                    <p className="text-slate-700 font-bold text-sm mb-1">
                        Aucun parrainage ne correspond à votre sélection
                    </p>
                    <p className="text-xs text-slate-500 mb-4">
                        Essayez un autre mot-clé ou réinitialisez les filtres.
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedOfferSlug("");
                            setActiveCategory("Toutes");
                        }}
                        className="text-xs text-blue-600 font-bold hover:underline bg-blue-50 border border-blue-200/60 px-3.5 py-1.5 rounded-xl"
                    >
                        Afficher toutes les offres
                    </button>
                </div>
            )}

            {activeCategory !== "Toutes" && !searchTerm && !selectedOfferSlug && filteredOffers.length > 0 && (
                <div className="mt-10 text-center">
                    <Link
                        href={`/categorie/${slugifyCategory(activeCategory)}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-md"
                    >
                        Voir tous nos conseils {activeCategory}
                        <ArrowRight size={15} />
                    </Link>
                </div>
            )}
        </div>
    );
}
