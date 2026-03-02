"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
    code: string;
    className?: string;
}

export function CopyButton({ code, className = "" }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code: ", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`flex items-center justify-center gap-2 h-10 px-4 rounded-xl font-semibold text-sm transition-all active:scale-95 ${copied
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-primary text-white hover:bg-blue-700"
                } ${className}`}
            aria-label="Copier le code"
        >
            {copied ? (
                <>
                    <Check size={16} />
                    <span className="truncate">Copié !</span>
                </>
            ) : (
                <>
                    <Copy size={16} />
                    <span className="truncate">Copier : {code}</span>
                </>
            )}
        </button>
    );
}
