"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
    code: string;
    className?: string;
    showText?: boolean;
    label?: string;
    successLabel?: string;
    referralName?: string;
    advantage?: string;
}

export function CopyButton({ 
    code, 
    className = "", 
    showText = true,
    label = "Copier",
    successLabel = "Copié !",
    referralName,
    advantage,
}: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);

            // Track referral copy event
            if (typeof window !== "undefined" && (window as any).trackReferral) {
                (window as any).trackReferral({
                    action: "copy_code",
                    referralCode: code,
                    referralName: referralName,
                    advantage: advantage,
                    sourceComponent: label === "Lien" ? "link_box" : "copy_button",
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
            data-action="copy"
            data-code={code}
            title={copied ? successLabel : label}
            aria-label={label}
            className={`inline-flex items-center justify-center font-semibold transition-all active:scale-90 cursor-pointer select-none ${
                showText 
                    ? `h-10 px-4 rounded-xl gap-2 text-sm ${copied ? "bg-emerald-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white shadow-xs"}`
                    : `h-6 w-6 sm:h-7 sm:w-7 rounded-md shrink-0 ${copied ? "bg-emerald-600 text-white shadow-xs" : "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200/80 shadow-2xs"}`
            } ${className}`}
        >
            {copied ? (
                <>
                    <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 stroke-[2.5]" />
                    {showText && <span className="truncate">{successLabel}</span>}
                </>
            ) : (
                <>
                    <Copy className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0 stroke-[2.2]" />
                    {showText && <span className="truncate">{label}</span>}
                </>
            )}
        </button>
    );
}
