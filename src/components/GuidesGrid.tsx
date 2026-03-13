"use client";

import { Search, BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";

interface Guide {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readingTime: string;
    content: string;
    referralSlugs?: string[];
    category: string;
}

export function GuidesGrid({ guides }: { guides: Guide[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("Toutes");
    const [selectedGuideSlug, setSelectedGuideSlug] = useState("");

    const allCategories = useMemo(() => {
        const cats = Array.from(new Set(guides.map(g => g.category)));
        return ["Toutes", ...cats];
    }, [guides]);

    const allGuideNames = useMemo(() => {
        return guides.map(g => ({ title: g.title, slug: g.slug })).sort((a, b) => a.title.localeCompare(b.title));
    }, [guides]);

    const filteredGuides = useMemo(() => {
        let result = guides;

        // Filter by category
        if (activeCategory !== "Toutes") {
            result = result.filter(guide => guide.category === activeCategory);
        }

        // Filter by specific guide selection
        if (selectedGuideSlug) {
            result = result.filter(guide => guide.slug === selectedGuideSlug);
        }

        // Filter by search term (keywords based)
        if (searchTerm) {
            const keywords = searchTerm.toLowerCase().split(/\s+/).filter(k => k.length > 0);
            result = result.filter((guide) => {
                const searchStr = `${guide.title} ${guide.category} ${guide.excerpt} ${guide.content} ${guide.referralSlugs?.join(" ")}`.toLowerCase();
                return keywords.every(keyword => searchStr.includes(keyword));
            });
        }

        return result;
    }, [searchTerm, activeCategory, selectedGuideSlug, guides]);

    return (
        <div className="w-full">
            <div className="mb-12 flex flex-col sm:flex-row gap-6 max-w-4xl mx-auto">
                {/* Search Bar - Premium Glass */}
                <div className="relative flex-grow group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-primary group-focus-within:scale-110 transition-transform" />
                    </div>
                    <label htmlFor="search-guides" className="sr-only">Rechercher un guide</label>
                    <input
                        id="search-guides"
                        type="text"
                        className="glass-card block w-full pl-12 pr-6 py-4 bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-base"
                        placeholder="Rechercher un guide, une astuce..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setSelectedGuideSlug("");
                        }}
                    />
                </div>

                {/* Guide Dropdown - Premium Glass */}
                <div className="relative min-w-[240px]">
                    <select
                        aria-label="Tous les guides"
                        className="glass-card appearance-none block w-full px-6 pr-12 py-4 bg-white/50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all cursor-pointer font-bold text-sm uppercase tracking-wide"
                        value={selectedGuideSlug}
                        onChange={(e) => {
                            setSelectedGuideSlug(e.target.value);
                            setSearchTerm("");
                        }}
                    >
                        <option value="">Tous les articles</option>
                        {allGuideNames.map(guide => (
                            <option key={guide.slug} value={guide.slug}>{guide.title}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none text-primary">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
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
                                setSelectedGuideSlug("");
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

            {filteredGuides.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredGuides.map((guide) => (
                        <Link
                            href={`/guides/${guide.slug}`}
                            key={guide.id}
                            className="glass-card flex flex-col justify-between p-8 md:p-10 group bg-white/50 dark:bg-slate-900/50 hover:border-primary/30 transition-all duration-300"
                        >
                            <div className="mb-8">
                                <div className="flex items-center gap-4 mb-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                    <span className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-xl">
                                        <BookOpen size={14} />
                                        {guide.category}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Clock size={14} className="text-primary" />
                                        {guide.readingTime}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-primary transition-colors leading-tight">
                                    {guide.title}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-3 text-sm leading-relaxed">
                                    {guide.excerpt}
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-200/50 dark:border-slate-800/50">
                                <span className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <Calendar size={14} />
                                    {new Date(guide.date).toLocaleDateString("fr-FR", {
                                        year: "numeric",
                                        month: "long"
                                    })}
                                </span>
                                <span className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                    <ArrowRight size={18} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 px-4 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 border-dashed">
                    <div className="text-4xl mb-4 text-slate-300">🔍</div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Aucun guide trouvé pour vos critères.
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setActiveCategory("Toutes");
                            setSelectedGuideSlug("");
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
