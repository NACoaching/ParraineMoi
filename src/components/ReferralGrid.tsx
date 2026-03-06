"use client";

import { Search, Star } from "lucide-react";
import { useState, useMemo } from "react";
import { ReferralCard, Referral } from "./ReferralCard";
import Link from "next/link";
import { slugifyCategory } from "@/lib/utils";
import referralsData from "@/data/referrals.json";

export function ReferralGrid({ referrals, activeCategoryName = "Toutes" }: { referrals: Referral[], activeCategoryName?: string }) {
    const [searchTerm, setSearchTerm] = useState("");

    const allCategories = useMemo(() => {
        const cats = Array.from(new Set((referralsData as Referral[]).map(r => r.category)));
        return ["Toutes", ...cats];
    }, []);



    const spotlightIndex = referrals.findIndex(r => r.slug === 'fortuneo');
    const spotlightOfferRaw = spotlightIndex !== -1 ? referrals[spotlightIndex] : null;

    const { filteredGridOffers, spotlightOffer } = useMemo(() => {
        const uniqueReferrals = Array.from(new Map(referrals.map(item => [item.id, item])).values());
        let result = uniqueReferrals;

        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(
                (ref) =>
                    ref.name.toLowerCase().includes(lowerSearch) ||
                    ref.category.toLowerCase().includes(lowerSearch) ||
                    ref.description.toLowerCase().includes(lowerSearch)
            );
        }

        const isDefault = !searchTerm && activeCategoryName === "Toutes";
        const currentSpotlight = isDefault ? spotlightOfferRaw : null;

        // Final grid offers: exclude spotlight if it's being shown separately
        const gridResults = currentSpotlight
            ? result.filter(ref => ref.id !== currentSpotlight.id)
            : result;

        return { filteredGridOffers: gridResults, spotlightOffer: currentSpotlight };
    }, [searchTerm, activeCategoryName, referrals, spotlightOfferRaw]);

    return (
        <div className="w-full">
            <div className="mb-8 relative max-w-md mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                </div>
                <label htmlFor="search-input" className="sr-only">Rechercher une marque ou une catégorie</label>
                <input
                    id="search-input"
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow shadow-sm"
                    placeholder="Rechercher une marque, une catégorie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
                {allCategories.map(cat => {
                    const isActive = activeCategoryName === cat;
                    const href = cat === "Toutes" ? "/" : `/categorie/${slugifyCategory(cat)}`;

                    return (
                        <Link
                            key={cat}
                            href={href}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive
                                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900/50 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800"
                                }`}
                        >
                            {cat}
                        </Link>
                    );
                })}
            </div>

            {spotlightOffer && (
                <div className="mb-10 w-full lg:w-2/3 mx-auto relative">
                    <div className="absolute -top-3 -right-3 z-10 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg transform rotate-3">
                        <Star className="h-4 w-4 fill-yellow-900" /> L'offre du mois
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
                <div className="text-center py-12 px-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-dashed">
                    <p className="text-slate-500 dark:text-slate-400">
                        Aucun parrainage trouvé pour vos critères.
                    </p>
                    <button
                        onClick={() => setSearchTerm("")}
                        className="mt-4 text-primary font-medium hover:underline"
                    >
                        Réinitialiser la recherche
                    </button>
                </div>
            )}
        </div>
    );
}
