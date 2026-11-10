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

    const handleCopy = async () => {
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
            onClick={handleCopy}
            data-action="copy"
            data-code={code}
            className={`flex items-center justify-center gap-2 h-10 px-4 rounded-xl font-semibold text-sm transition-all active:scale-95 ${copied
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-primary text-white hover:bg-blue-700"
                } ${className}`}
            aria-label={label}
        >
            {copied ? (
                <>
                    <Check size={16} />
                    {showText && <span className="truncate">{successLabel}</span>}
                </>
            ) : (
                <>
                    <Copy size={16} />
                    {showText && <span className="truncate">{label}</span>}
                </>
            )}
        </button>
    );
}
