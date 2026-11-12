import Link from "next/link";
import { CopyButton } from "./CopyButton";
import { CompanyLogo } from "./CompanyLogo";
import { slugifyCategory, formatVerifiedDate } from "@/lib/utils";

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
    longReview: string;
  };
  steps?: { title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
  isPaused?: boolean;
  isPartner?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export function ReferralCard({ referral, isPriority = false, index }: { referral: Referral, isPriority?: boolean, index?: number }) {
  const shouldPrioritize = isPriority || (index !== undefined && index < 6);

  return (
    <div className="flex flex-col justify-between h-full group bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div>
        {/* Brand & Category Header */}
        <div className="flex items-center gap-3 mb-3">
          <Link href={`/parrainage-${referral.slug}`} className="h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-2xs relative p-1.5 flex items-center justify-center group-hover:scale-105 transition-transform">
            <CompanyLogo url={referral.logoUrl} name={referral.name} priority={shouldPrioritize} />
          </Link>
          <div className="min-w-0 flex-1">
            <Link href={`/parrainage-${referral.slug}`}>
              <h3 className="font-bold text-slate-900 truncate hover:text-blue-600 transition-colors text-base tracking-tight leading-tight">{referral.name}</h3>
            </Link>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <Link
                href={`/categorie/${slugifyCategory(referral.category)}`}
                className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                {referral.category}
              </Link>
              {referral.lastVerified && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Vérifié
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Advantage Badge */}
        <div className="mb-2.5">
          {referral.isPaused ? (
            <div className="w-full bg-amber-50 border border-amber-200 text-amber-800 px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1.5 text-xs font-bold">
              <span>⚠️</span>
              <span className="truncate">Suspendu</span>
            </div>
          ) : (
            <div className="w-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 px-2.5 py-1.5 rounded-lg inline-flex items-center gap-1.5">
              <span className="text-sm">🎁</span>
              <span className="text-xs font-black tracking-tight truncate">{referral.advantage}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
          {referral.description}
        </p>
      </div>

      <div className="pt-2 mt-auto flex flex-col gap-2 border-t border-slate-100">
        {/* Code Box */}
        {referral.code && (
          <div className="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200/90 rounded-xl py-1 px-2.5">
            <span className="font-mono font-bold text-slate-800 text-xs tracking-wider truncate select-all">
              {referral.code}
            </span>
            <CopyButton 
              code={referral.code} 
              referralName={referral.name}
              advantage={referral.advantage}
              showText={false} 
              label="Copier le code"
              successLabel="Copié !"
            />
          </div>
        )}

        {/* Link Box */}
        {referral.link && referral.link !== referral.code && (
          <div className="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200/90 rounded-xl py-1 px-2.5">
            <span className="font-mono text-slate-500 text-[10px] truncate select-all">
              {referral.link}
            </span>
            <CopyButton 
              code={referral.link} 
              referralName={referral.name}
              advantage={referral.advantage}
              showText={false} 
              label="Copier le lien"
              successLabel="Copié !"
            />
          </div>
        )}

        {referral.isPaused ? (
          <div className="w-full flex items-center justify-center h-9 rounded-lg bg-slate-100 text-slate-400 font-bold text-xs cursor-not-allowed">
            Offre Suspendue
          </div>
        ) : (
          <Link
            href={`/parrainage-${referral.slug}`}
            className="w-full flex items-center justify-center h-9 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-xs hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.98] transition-all"
          >
            Profiter de l&apos;offre
          </Link>
        )}
      </div>
    </div>
  );
}
