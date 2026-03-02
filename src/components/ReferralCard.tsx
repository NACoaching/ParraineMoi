import Link from "next/link";
import { CopyButton } from "./CopyButton";
import { CompanyLogo } from "./CompanyLogo";

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
  faqs?: { question: string; answer: string }[];
}

export function ReferralCard({ referral }: { referral: Referral }) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      <div className="p-5 flex-1 flex flex-col items-start text-left">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800 bg-white shadow-sm ring-1 ring-slate-900/5 dark:ring-white/5 relative p-2 flex items-center justify-center">
            <CompanyLogo url={referral.logoUrl} name={referral.name} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">{referral.name}</h3>
            <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
              {referral.category}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-primary bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-lg inline-block">
            🎁 {referral.advantage}
          </p>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
          {referral.description}
        </p>
      </div>

      <div className="p-4 pt-0 mt-auto flex flex-col gap-3">
        {/* Code Box */}
        <div className="flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-1.5 pl-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-8 w-8 shrink-0 rounded-lg bg-white border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center overflow-hidden">
              <CompanyLogo url={referral.logoUrl} name={referral.name} />
            </div>
            <span className="font-mono font-medium text-slate-700 dark:text-slate-300 text-sm truncate select-all">
              {referral.code}
            </span>
          </div>
          <CopyButton code={referral.code} className="shrink-0 h-8 w-8 !p-0" />
        </div>

        <Link
          href={`/parrainage-${referral.slug}`}
          className="w-full flex items-center justify-center h-10 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
        >
          Voir l'offre
        </Link>
      </div>
    </div>
  );
}
