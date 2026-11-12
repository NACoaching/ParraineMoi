"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareOfferButtonProps {
  name: string;
  advantage: string;
  slug: string;
  code?: string;
}

export function ShareOfferButton({ name, advantage, slug, code }: ShareOfferButtonProps) {
  const [copied, setCopied] = useState(false);

  const url = `https://codes-de-parrainages.com/parrainage-${slug}`;
  const codeText = code && !code.startsWith("http") ? ` (Code : ${code})` : "";
  const shareText = `Regarde, il y a ${advantage} chez ${name}${codeText} en ce moment ! Découvre l'offre vérifiée ici : ${url}`;

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Prime ${advantage} chez ${name}`,
          text: `Regarde, il y a ${advantage} chez ${name}${codeText} en ce moment !`,
          url: url,
        });
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to copy
      }
    }
    // Fallback: copy link
    handleCopyLink();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="inline-flex items-center gap-1.5">
      {/* WhatsApp direct button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Partager l'offre ${name} sur WhatsApp`}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 text-xs font-bold transition-all active:scale-95 shadow-2xs"
      >
        <span className="text-sm">💬</span>
        <span>WhatsApp</span>
      </a>

      {/* Native Share button */}
      <button
        type="button"
        onClick={handleNativeShare}
        aria-label="Partager ce bon plan"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all active:scale-95 shadow-2xs cursor-pointer select-none"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[2.5]" />
            <span className="text-emerald-700">Lien copié !</span>
          </>
        ) : (
          <>
            <Share2 className="h-3.5 w-3.5 text-slate-500" />
            <span>Partager</span>
          </>
        )}
      </button>
    </div>
  );
}
