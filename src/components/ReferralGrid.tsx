"use client";

import { Search, Star } from "lucide-react";
import { useState, useMemo } from "react";
import { ReferralCard, Referral } from "./ReferralCard";
import Link from "next/link";
import { slugifyCategory } from "@/lib/utils";
import referralsData from "@/data/referrals.json";

export function ReferralGrid({ referrals, activeCategoryName: initialCategory = "Toutes" }: { referrals: Referral[], activeCategoryName?: string }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [selectedOfferSlug, setSelectedOfferSlug] = useState("");
    const [sortBy, setSortBy] = useState<"relevance" | "amount_desc" | "alpha">("relevance");

    const extractValue = (advantage: string) => {
        const numbers = advantage.replace(/\s/g, '').match(/\d+/g);
        if (!numbers) return 0;
        return Math.max(...numbers.map(Number));
    };

    const allCategories = useMemo(() => {
        // If we are given a limited list and an initial category, prioritize that
        const sourceData = initialCategory !== "Toutes" ? referrals : referralsData as Referral[];
        const cats = Array.from(new Set(sourceData.map(r => r.category)));
        return ["Toutes", ...cats];
    }, [referrals, initialCategory]);

    const allOfferNames = useMemo(() => {
        // Build the dropdown from the provided referrals to avoid showing options that aren't in the list
        return referrals.map(r => ({ name: r.name, slug: r.slug })).sort((a, b) => a.name.localeCompare(b.name));
    }, [referrals]);

    // Only show spotlight on "Toutes" and when no search/specific offer is active
    const isDefaultView = !searchTerm && activeCategory === "Toutes" && !selectedOfferSlug;
    const spotlightIndex = referrals.findIndex(r => r.slug === 'fortuneo');
    const spotlightOfferRaw = (spotlightIndex !== -1 && isDefaultView) ? referrals[spotlightIndex] : null;

    const { filteredGridOffers, spotlightOffer } = useMemo(() => {
        const uniqueReferrals = Array.from(new Map(referrals.map(item => [item.id, item])).values());
        let result = uniqueReferrals;

        // Filter by category
        if (activeCategory !== "Toutes") {
            result = result.filter(ref => ref.category === activeCategory);
        }

        // Filter by specific offer selection
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

        // Sort the results
        if (sortBy === "alpha") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "amount_desc") {
            result.sort((a, b) => extractValue(b.advantage) - extractValue(a.advantage));
        }
        // "relevance" is the default order from JSON

        const isDefault = !searchTerm && activeCategory === "Toutes" && !selectedOfferSlug && sortBy === "relevance";
        const currentSpotlight = isDefault ? spotlightOfferRaw : null;

        // Final grid offers: exclude spotlight if it's being shown separately
        const gridResults = currentSpotlight
            ? result.filter(ref => ref.id !== currentSpotlight.id)
            : result;

        return { filteredGridOffers: gridResults, spotlightOffer: currentSpotlight };
    }, [searchTerm, activeCategory, selectedOfferSlug, sortBy, referrals, spotlightOfferRaw]);

    return (
        <div className="w-full">
            <div className="mb-12 flex flex-col sm:flex-row gap-6 max-w-4xl mx-auto">
                {/* Search Bar - Premium Glass */}
                <div className="relative flex-grow group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-primary group-focus-within:scale-110 transition-transform" />
                    </div>
                    <label htmlFor="search-input" className="sr-only">Rechercher une marque</label>
                    <input
                        id="search-input"
                        type="text"
                        className="glass-card block w-full pl-12 pr-6 py-4 bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-base"
                        placeholder="Rechercher une marque..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setSelectedOfferSlug("");
                        }}
                    />
                </div>

                {/* Offer Dropdown - Premium Glass */}
                <div className="relative min-w-[240px]">
                    <select
                        aria-label="Toutes les offres"
                        className="glass-card appearance-none block w-full px-6 pr-12 py-4 bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all cursor-pointer font-bold text-sm uppercase tracking-wide"
                        value={selectedOfferSlug}
                        onChange={(e) => {
                            setSelectedOfferSlug(e.target.value);
                            setSearchTerm("");
                        }}
                    >
                        <option value="">Toutes les offres</option>
                        {allOfferNames.map(offer => (
                            <option key={offer.slug} value={offer.slug}>{offer.name}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none text-primary">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Sort Dropdown - Premium Glass */}
                <div className="relative min-w-[200px]">
                    <select
                        aria-label="Trier par"
                        className="glass-card appearance-none block w-full px-6 pr-12 py-4 bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all cursor-pointer font-bold text-sm uppercase tracking-wide"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as "relevance" | "amount_desc" | "alpha")}
                    >
                        <option value="relevance">Trier : Recommandé</option>
                        <option value="amount_desc">Trier : + Rentable</option>
                        <option value="alpha">Trier : A-Z</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none text-primary">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Categories Buttons - Premium Glass pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
                {allCategories.map(cat => {
                    const isActive = activeCategory === cat;
                    return (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveCategory(cat);
                                setSelectedOfferSlug("");
                            }}
                            className={`px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 border-2 ${isActive
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105"
                                : "glass-card bg-white/30 dark:bg-slate-900/30 text-slate-500 border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                                }`}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {spotlightOffer && (
                <div className="mb-12 w-full lg:w-3/4 mx-auto relative">
                    <div className="absolute -top-3 -right-3 z-10 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg transform rotate-3">
                        <Star className="h-4 w-4 fill-yellow-900" /> L&apos;offre du mois
                    </div>
                    <ReferralCard referral={spotlightOffer} isPriority={true} />
                </div>
            )}

            {filteredGridOffers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGridOffers.map((referral, index) => {
                        const val = extractValue(referral.advantage);
                        const isTopOffer = val >= 50 && sortBy !== "alpha"; // Mark as top offer if > 50€

                        return (
                            <div key={referral.slug} className="relative">
                                {isTopOffer && (
                                    <div className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-orange-400 to-red-500 text-white text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-full shadow-lg transform rotate-3 border-2 border-white dark:border-slate-900 pointer-events-none">
                                        🔥 Top Offre
                                    </div>
                                )}
                                <ReferralCard referral={referral} index={index} />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16 px-4 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 border-dashed">
                    <div className="text-4xl mb-4 text-slate-300">🔍</div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Aucun parrainage trouvé pour vos critères.
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setActiveCategory("Toutes");
                            setSelectedOfferSlug("");
                        }}
                        className="mt-6 text-primary font-bold hover:underline bg-primary/10 px-6 py-2 rounded-full"
                    >
                        Réinitialiser tous les filtres
                    </button>
                </div>
            )}
        </div>
    );
}
