"use client";

import { Search, ArrowRight, X, ChevronDown } from "lucide-react";
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
    const [sortBy, setSortBy] = useState<"recommended" | "highest_reward" | "alphabetical">("recommended");

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

        // Sort
        if (sortBy === "highest_reward") {
            result = [...result].sort((a, b) => extractValue(b.advantage) - extractValue(a.advantage));
        } else if (sortBy === "alphabetical") {
            result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }, [searchTerm, activeCategory, selectedOfferSlug, sortBy, referrals]);

    const isFiltered = searchTerm !== "" || activeCategory !== "Toutes" || selectedOfferSlug !== "" || sortBy !== "recommended";

    return (
        <div className="w-full">
            {/* Search & Filters Bar */}
            <div className="mb-3 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-2.5 items-stretch">
                    {/* Search Input */}
                    <div className="relative group sm:col-span-6">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        </div>
                        <label htmlFor="search-input" className="sr-only">Rechercher une marque</label>
                        <input
                            id="search-input"
                            type="text"
                            className="block w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200/90 text-slate-900 placeholder-slate-400 rounded-xl shadow-2xs focus:outline-none focus:ring-3 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-xs sm:text-sm"
                            placeholder="Rechercher une banque, crypto, app..."
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

                    {/* All Offers Dropdown */}
                    <div className="relative sm:col-span-3">
                        <select
                            aria-label="Toutes les marques"
                            className="appearance-none block w-full h-full px-3 pr-8 py-2.5 bg-white border border-slate-200/90 text-slate-700 rounded-xl shadow-2xs focus:outline-none focus:ring-3 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer font-medium text-xs truncate"
                            value={selectedOfferSlug}
                            onChange={(e) => {
                                setSelectedOfferSlug(e.target.value);
                                setSearchTerm("");
                            }}
                        >
                            <option value="">Toutes les marques ({allOfferNames.length})</option>
                            {allOfferNames.map(offer => (
                                <option key={offer.slug} value={offer.slug}>{offer.name}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
                            <ChevronDown className="h-4 w-4" />
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="relative sm:col-span-3">
                        <select
                            aria-label="Trier les offres"
                            className="appearance-none block w-full h-full px-3 pr-8 py-2.5 bg-white border border-slate-200/90 text-slate-700 rounded-xl shadow-2xs focus:outline-none focus:ring-3 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer font-medium text-xs truncate"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as "recommended" | "highest_reward" | "alphabetical")}
                        >
                            <option value="recommended">⭐ Recommandés</option>
                            <option value="highest_reward">💰 Plus grosse prime (€)</option>
                            <option value="alphabetical">🔤 De A à Z</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-slate-400">
                            <ChevronDown className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-4 mt-2">
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
                <div className="flex items-center justify-between max-w-5xl mx-auto mb-3 px-2 text-xs text-slate-500">
                    <span>
                        <strong>{filteredOffers.length}</strong> offre{filteredOffers.length > 1 ? "s" : ""} trouvée{filteredOffers.length > 1 ? "s" : ""}
                        {activeCategory !== "Toutes" && <> dans <strong>{activeCategory}</strong></>}
                        {selectedOfferSlug && <> pour <strong>{allOfferNames.find(o => o.slug === selectedOfferSlug)?.name}</strong></>}
                        {searchTerm && <> pour &ldquo;<strong>{searchTerm}</strong>&rdquo;</>}
                        {sortBy === "highest_reward" && <> • triées par <strong>prime (€ décroissant)</strong></>}
                        {sortBy === "alphabetical" && <> • triées <strong>de A à Z</strong></>}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedOfferSlug("");
                            setActiveCategory("Toutes");
                            setSortBy("recommended");
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

                        const badge = isFortuneoSpotlight ? "star" : isTopOffer ? "top" : undefined;

                        return (
                            <ReferralCard
                                key={referral.slug}
                                referral={referral}
                                index={index}
                                badge={badge}
                            />
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
                            setSortBy("recommended");
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
