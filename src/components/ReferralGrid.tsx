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

    const allCategories = useMemo(() => {
        const cats = Array.from(new Set((referralsData as Referral[]).map(r => r.category)));
        return ["Toutes", ...cats];
    }, []);

    const spotlightIndex = referrals.findIndex(r => r.slug === 'fortuneo');
    const spotlightOfferRaw = spotlightIndex !== -1 ? referrals[spotlightIndex] : null;

    const { filteredGridOffers, spotlightOffer } = useMemo(() => {
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

        const isDefault = !searchTerm && activeCategory === "Toutes";
        const currentSpotlight = isDefault ? spotlightOfferRaw : null;

        // Final grid offers: exclude spotlight if it's being shown separately
        const gridResults = currentSpotlight
            ? result.filter(ref => ref.id !== currentSpotlight.id)
            : result;

        return { filteredGridOffers: gridResults, spotlightOffer: currentSpotlight };
    }, [searchTerm, activeCategory, referrals, spotlightOfferRaw]);

    return (
        <div className="w-full">
            <div className="mb-10 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                {/* Search Bar */}
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <label htmlFor="search-input" className="sr-only">Rechercher une marque</label>
                    <input
                        id="search-input"
                        type="text"
                        className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                        placeholder="Rechercher une marque..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Category Dropdown */}
                <div className="relative min-w-[180px]">
                    <select
                        aria-label="Filtrer par catégorie"
                        className="appearance-none block w-full px-4 pr-10 py-3.5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm cursor-pointer font-medium"
                        value={activeCategory}
                        onChange={(e) => setActiveCategory(e.target.value)}
                    >
                        {allCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
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
                    {filteredGridOffers.map((referral, index) => (
                        <ReferralCard key={referral.slug} referral={referral} index={index} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 px-4 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 border-dashed">
                    <div className="text-4xl mb-4 text-slate-300">🔍</div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Aucun parrainage trouvé pour &quot;{searchTerm}&quot; dans la catégorie {activeCategory}.
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setActiveCategory("Toutes");
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
