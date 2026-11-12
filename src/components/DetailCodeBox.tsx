"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface DetailCodeBoxProps {
  code: string;
  name: string;
  advantage: string;
  link?: string;
}

export function DetailCodeBox({ code, name, advantage, link }: DetailCodeBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("referral-code-copied", {
            detail: { name, code, link },
          })
        );
        if ((window as any).trackReferral) {
          (window as any).trackReferral({
            action: "copy_code",
            referralCode: code,
            referralName: name,
            advantage,
            sourceComponent: "detail_code_box",
          });
        }
      }
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mb-5 w-full">
      <button
        type="button"
        onClick={handleCopy}
        title="Cliquer pour copier le code promo"
        className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer group text-left select-none ${
          copied
            ? "bg-emerald-50 border-emerald-300 text-emerald-800"
            : "bg-slate-50 hover:bg-blue-50/70 border-slate-200/90 hover:border-blue-300 text-slate-800 shadow-2xs"
        }`}
      >
        <div className="flex flex-col min-w-0 pr-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
            Code Parrainage Officiel
          </span>
          <span className="font-mono font-bold text-base sm:text-xl text-slate-900 tracking-wider group-hover:text-blue-700 transition-colors truncate">
            {code}
          </span>
        </div>
        <div
          className={`px-3.5 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-blue-600 group-hover:bg-blue-700 text-white shadow-xs"
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Copié !</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 stroke-[2]" />
              <span>Copier</span>
            </>
          )}
        </div>
      </button>
    </div>
  );
}
