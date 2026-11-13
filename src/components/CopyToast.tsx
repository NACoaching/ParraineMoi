"use client";

import { useState, useEffect } from "react";
import { ExternalLink, X, Check } from "lucide-react";

interface ToastData {
  name: string;
  code: string;
  link?: string;
}

export function CopyToast() {
  const [toast, setToast] = useState<ToastData | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleCopied = (e: Event) => {
      const customEvent = e as CustomEvent<ToastData>;
      if (customEvent.detail) {
        setToast(customEvent.detail);

        clearTimeout(timer);
        timer = setTimeout(() => {
          setToast(null);
        }, 6000);
      }
    };

    window.addEventListener("referral-code-copied", handleCopied);
    return () => {
      window.removeEventListener("referral-code-copied", handleCopied);
      clearTimeout(timer);
    };
  }, []);

  if (!toast) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94vw] max-w-md animate-fadeIn"
    >
      <div className="bg-slate-900/95 text-white backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-2xl border border-slate-700/80 flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <Check size={14} className="stroke-[2.5]" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-bold text-white truncate leading-tight">
              {toast.code.startsWith("http") ? `Lien ${toast.name} copié !` : `Code ${toast.name} copié !`}
            </span>
            <span className="text-[10px] text-slate-400 font-mono truncate">
              {toast.code}
            </span>
          </div>
        </div>

        {toast.link && (
          <a
            href={toast.link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            data-referral-link="true"
            onClick={() => {
              if (typeof window !== "undefined" && (window as any).trackReferral) {
                (window as any).trackReferral({
                  action: "click_link",
                  referralName: toast.name,
                  referralCode: toast.code,
                  sourceComponent: "copy_toast",
                });
              }
              setToast(null);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <span>Ouvrir {toast.name}</span>
            <ExternalLink size={12} />
          </a>
        )}

        <button
          type="button"
          onClick={() => setToast(null)}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
          aria-label="Fermer la notification"
        >
          <X size={14} />
        </button>
      </div>
    </aside>
  );
}
