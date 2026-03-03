"use client";

import { Search, Star } from "lucide-react";
import { useState, useMemo } from "react";
import { ReferralCard, Referral } from "./ReferralCard";

export function ReferralGrid({ referrals }: { referrals: Referral[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("Toutes");

    const categories = useMemo(() => {
        const cats = Array.from(new Set(referrals.map(r => r.category)));
        return ["Toutes", ...cats];
    }, [referrals]);

    const filteredReferrals = useMemo(() => {
        let result = referrals;

        if (activeCategory !== "Toutes") {
            result = result.filter(ref => ref.category === activeCategory);
        }

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
    }, [searchTerm, activeCategory, referrals]);

    const spotlightIndex = referrals.findIndex(r => r.slug === 'fortuneo');
    const spotlightOfferRaw = spotlightIndex !== -1 ? referrals[spotlightIndex] : null;

    const { filteredGridOffers, spotlightOffer } = useMemo(() => {
        // First, ensure uniqueness by ID to prevent any data-side duplication issues
        const uniqueReferrals = Array.from(new Map(referrals.map(item => [item.id, item])).values());
        let result = uniqueReferrals;

        if (activeCategory !== "Toutes") {
            result = result.filter(ref => ref.category === activeCategory);
        }

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
            <div className="mb-8 relative max-w-md mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-sm"
                    placeholder="Rechercher une marque, une catégorie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat
                            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900/50 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {spotlightOffer && (
                <div className="mb-10 w-full lg:w-2/3 mx-auto relative">
                    <div className="absolute -top-3 -right-3 z-10 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg transform rotate-3">
                        <Star className="h-4 w-4 fill-yellow-900" /> L'offre du mois
                    </div>
                    <ReferralCard referral={spotlightOffer} />
                </div>
            )}

            {filteredGridOffers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGridOffers.map((referral) => (
                        <ReferralCard key={referral.slug} referral={referral} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 px-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-dashed">
                    <p className="text-slate-500 dark:text-slate-400">
                        Aucun parrainage trouvé pour vos critères.
                    </p>
                    <button
                        onClick={() => { setSearchTerm(""); setActiveCategory("Toutes"); }}
                        className="mt-4 text-primary font-medium hover:underline"
                    >
                        Réinitialiser les filtres
                    </button>
                </div>
            )}
        </div>
    );
}
