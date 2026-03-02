"use client";

import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { ReferralCard, Referral } from "./ReferralCard";

export function ReferralGrid({ referrals }: { referrals: Referral[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredReferrals = useMemo(() => {
        if (!searchTerm) return referrals;
        const lowerSearch = searchTerm.toLowerCase();
        return referrals.filter(
            (ref) =>
                ref.name.toLowerCase().includes(lowerSearch) ||
                ref.category.toLowerCase().includes(lowerSearch) ||
                ref.description.toLowerCase().includes(lowerSearch)
        );
    }, [searchTerm, referrals]);

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

            {filteredReferrals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReferrals.map((referral) => (
                        <ReferralCard key={referral.id} referral={referral} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 px-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-dashed">
                    <p className="text-slate-500 dark:text-slate-400">
                        Aucun parrainage trouvé pour "{searchTerm}".
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
