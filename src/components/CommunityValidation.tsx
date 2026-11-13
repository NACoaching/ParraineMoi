"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, AlertCircle, CheckCircle2 } from "lucide-react";

interface CommunityValidationProps {
  name: string;
  slug: string;
}

export function CommunityValidation({ name, slug }: CommunityValidationProps) {
  const [voted, setVoted] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`referral_vote_${slug}`);
      if (stored === "up" || stored === "down") {
        setVoted(stored);
      }
    }
  }, [slug]);

  const handleVote = (type: "up" | "down") => {
    setVoted(type);
    if (typeof window !== "undefined") {
      localStorage.setItem(`referral_vote_${slug}`, type);
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs mt-3 flex-wrap">
      <span className="text-slate-600 font-medium flex items-center gap-1.5">
        <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
        <span>Cette offre a-t-elle fonctionné pour vous ?</span>
      </span>

      {voted === null ? (
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => handleVote("up")}
            aria-label="Voter oui, ce code a fonctionné"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all active:scale-95 shadow-2xs cursor-pointer"
          >
            <ThumbsUp size={12} className="text-emerald-600" />
            <span>Oui</span>
          </button>
          <button
            type="button"
            onClick={() => handleVote("down")}
            aria-label="Signaler un problème avec ce code"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-500 font-semibold hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300 transition-all active:scale-95 shadow-2xs cursor-pointer"
          >
            <AlertCircle size={12} className="text-amber-500" />
            <span>Signaler un souci</span>
          </button>
        </div>
      ) : voted === "up" ? (
        <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px] animate-fadeIn">
          ✓ Merci ! Votre confirmation aide les prochains visiteurs.
        </span>
      ) : (
        <span className="text-amber-800 font-medium text-[11px] animate-fadeIn">
          Merci du signalement ! <a href="mailto:contact.nacoaching@gmail.com" className="underline font-bold">Prévenez-nous par email</a> pour mise à jour rapide.
        </span>
      )}
    </div>
  );
}
