"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Copy, Star } from "lucide-react";
import { CompanyLogo } from "./CompanyLogo";
import { slugifyCategory } from "@/lib/utils";

export interface Referral {
  id: string;
  name: string;
  slug: string;
  category: string;
  code: string;
  link: string;
  advantage: string;
  description: string;
  logoUrl: string;
  lastVerified?: string;
  review?: {
    pros: string[];
    cons?: string[];
    longReview: string;
  };
  steps?: { title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
  isPaused?: boolean;
  isPartner?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

function CodeSlot({
  code,
  referralName,
  advantage,
}: {
  code: string;
  referralName: string;
  advantage: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      if (typeof window !== "undefined" && (window as any).trackReferral) {
        (window as any).trackReferral({
          action: "copy_code",
          referralCode: code,
          referralName,
          advantage,
          sourceComponent: "card_code_slot",
        });
      }
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Cliquer pour copier le code"
      aria-label={`Copier le code ${code}`}
      className={`w-full h-7 sm:h-8 px-2 sm:px-2.5 rounded-lg border flex items-center justify-between gap-1.5 transition-all text-left cursor-pointer group/code select-none ${
        copied
          ? "bg-emerald-50 border-emerald-300 text-emerald-800"
          : "bg-slate-50 hover:bg-blue-50/80 border-slate-200/90 hover:border-blue-300 text-slate-800"
      }`}
    >
      <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 flex-1">
        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400 group-hover/code:text-blue-600 transition-colors shrink-0">
          Code :
        </span>
        <span className="font-mono font-bold text-[10px] sm:text-xs tracking-wider truncate text-slate-900 group-hover/code:text-blue-700 transition-colors">
          {code}
        </span>
      </div>
      <span
        className={`inline-flex items-center gap-1 text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded transition-all shrink-0 ${
          copied
            ? "bg-emerald-600 text-white"
            : "bg-white text-slate-500 group-hover/code:bg-blue-600 group-hover/code:text-white border border-slate-200 group-hover/code:border-blue-600 shadow-2xs"
        }`}
      >
        {copied ? (
          <>
            <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[2.5]" />
            <span>Copié</span>
          </>
        ) : (
          <>
            <Copy className="h-2.5 w-2.5 sm:h-3 sm:w-3 stroke-[2]" />
            <span className="hidden sm:inline">Copier</span>
          </>
        )}
      </span>
    </button>
  );
}

export function ReferralCard({
  referral,
  isPriority = false,
  index,
  badge,
}: {
  referral: Referral;
  isPriority?: boolean;
  index?: number;
  badge?: "star" | "top";
}) {
  const shouldPrioritize = isPriority || (index !== undefined && index < 6);

  return (
    <div className="flex flex-col justify-between h-full group bg-white border border-slate-200/90 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 shadow-xs hover:border-blue-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 relative">
      <div>
        {/* Brand & Category Header */}
        <div className="flex items-start justify-between gap-1.5 mb-2 sm:mb-2.5">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
            <Link
              href={`/parrainage-${referral.slug}`}
              className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-lg sm:rounded-xl border border-slate-200/90 bg-white shadow-2xs relative p-1 flex items-center justify-center group-hover:scale-105 transition-transform"
            >
              <CompanyLogo url={referral.logoUrl} name={referral.name} priority={shouldPrioritize} />
            </Link>
            <div className="min-w-0 flex-1">
              <Link href={`/parrainage-${referral.slug}`}>
                <h3 className="font-bold text-slate-900 truncate hover:text-blue-600 transition-colors text-xs sm:text-sm tracking-tight leading-tight">
                  {referral.name}
                </h3>
              </Link>
              <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5">
                <Link
                  href={`/categorie/${slugifyCategory(referral.category)}`}
                  className="inline-flex items-center rounded-md bg-slate-100 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors truncate max-w-[85px] sm:max-w-none"
                >
                  {referral.category}
                </Link>
                {referral.lastVerified && (
                  <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-semibold text-emerald-700 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="hidden sm:inline">Vérifié</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Integrated Badge (STAR / TOP) */}
          {badge === "star" && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wide shrink-0">
              <Star className="h-2.5 w-2.5 fill-amber-500 text-amber-500" />
              <span>Star</span>
            </span>
          )}
          {badge === "top" && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full bg-orange-50 text-orange-900 border border-orange-200 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wide shrink-0">
              <span>🔥</span>
              <span>Top</span>
            </span>
          )}
        </div>

        {/* Advantage Badge */}
        <div className="mb-2 sm:mb-2.5">
          {referral.isPaused ? (
            <div className="w-full bg-amber-50 border border-amber-200 text-amber-800 px-2 py-1 sm:py-1.5 rounded-lg inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold">
              <span>⚠️</span>
              <span className="truncate">Suspendu</span>
            </div>
          ) : (
            <div className="w-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 px-2 py-1 sm:py-1.5 rounded-lg inline-flex items-center gap-1">
              <span className="text-xs sm:text-sm">🎁</span>
              <span className="text-[10px] sm:text-xs font-black tracking-tight truncate">
                {referral.advantage}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-tight sm:leading-relaxed mb-2 min-h-[26px] sm:min-h-[32px]">
          {referral.description}
        </p>
      </div>

      <div className="pt-2 mt-auto flex flex-col gap-1.5 sm:gap-2 border-t border-slate-100">
        {/* Slot 1: Code promo cliquable OU Badge Lien Direct (Hauteur strictement identique) */}
        {referral.code && referral.code !== referral.link ? (
          <CodeSlot
            code={referral.code}
            referralName={referral.name}
            advantage={referral.advantage}
          />
        ) : (
          <div className="w-full h-7 sm:h-8 px-2 rounded-lg border border-slate-200/80 bg-slate-50/80 flex items-center justify-center gap-1 text-slate-500 select-none">
            <span className="text-[10px] sm:text-xs">✨</span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-slate-600 truncate">
              Lien direct • Pas de code requis
            </span>
          </div>
        )}

        {/* Slot 2: Action Button */}
        {referral.isPaused ? (
          <div className="w-full flex items-center justify-center h-7 sm:h-8 rounded-lg bg-slate-100 text-slate-400 font-bold text-[10px] sm:text-xs cursor-not-allowed">
            Offre Suspendue
          </div>
        ) : (
          <Link
            href={`/parrainage-${referral.slug}`}
            className="w-full flex items-center justify-center h-7 sm:h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-[10px] sm:text-xs shadow-2xs hover:shadow-sm active:scale-[0.98] transition-all"
          >
            Profiter de l&apos;offre
          </Link>
        )}
      </div>
    </div>
  );
}
