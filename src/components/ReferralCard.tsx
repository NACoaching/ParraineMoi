import Link from "next/link";
import { CopyButton } from "./CopyButton";
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
    longReview: string;
  };
  steps?: { title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
}

export function ReferralCard({ referral, isPriority = false, index }: { referral: Referral, isPriority?: boolean, index?: number }) {
  const shouldPrioritize = isPriority || (index !== undefined && index < 4);

  return (
    <div className="glass-card flex flex-col justify-between h-full group">
      <div className="p-6 pb-4">
        <div className="flex items-center gap-4 mb-5">
          <Link href={`/parrainage-${referral.slug}`} className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white shadow-sm ring-1 ring-slate-900/5 dark:ring-white/5 relative p-2 flex items-center justify-center hover:scale-105 transition-transform">
            <CompanyLogo url={referral.logoUrl} name={referral.name} priority={shouldPrioritize} />
          </Link>
          <div>
            <Link href={`/parrainage-${referral.slug}`}>
              <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 hover:text-primary transition-colors text-lg tracking-tight">{referral.name}</h3>
            </Link>
            <Link
              href={`/categorie/${slugifyCategory(referral.category)}`}
              className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {referral.category}
            </Link>
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-primary/5 dark:bg-primary/10 border border-primary/10 text-primary px-3 py-2 rounded-xl inline-flex items-center gap-2">
            <span className="text-xl">🎁</span>
            <span className="text-sm font-bold tracking-tight">{referral.advantage}</span>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {referral.description}
        </p>
      </div>

      <div className="p-6 pt-0 mt-auto flex flex-col gap-3">
        {/* Code Box */}
        <div className="flex items-center justify-between gap-2 bg-slate-50/50 dark:bg-slate-800/20 border border-slate-200/50 dark:border-slate-700/30 rounded-2xl p-2 pl-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="font-mono font-bold text-slate-700 dark:text-slate-200 text-base tracking-wider truncate select-all">
              {referral.code}
            </span>
          </div>
          <CopyButton code={referral.code} showText={false} className="shrink-0 h-10 w-10 p-0 rounded-[14px]" />
        </div>

        <Link
          href={`/parrainage-${referral.slug}`}
          className="w-full flex items-center justify-center h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-all text-sm shadow-sm active:scale-[0.98]"
        >
          Profiter de l&apos;offre
        </Link>
      </div>
    </div>
  );
}
