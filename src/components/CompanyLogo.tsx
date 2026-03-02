"use client";

import { useState } from "react";

interface CompanyLogoProps {
    url: string;
    name: string;
}

export function CompanyLogo({ url, name }: CompanyLogoProps) {
    const [error, setError] = useState(false);

    if (!url || error || !url.startsWith("http")) {
        return (
            <span className="text-lg font-bold text-slate-400 select-none uppercase">
                {name.charAt(0)}
            </span>
        );
    }

    return (
        <img
            src={url}
            alt={`Logo ${name}`}
            className="h-full w-full object-contain"
            onError={() => setError(true)}
        />
    );
}
