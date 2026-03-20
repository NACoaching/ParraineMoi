"use client";

import { useState } from "react";
import Image from "next/image";

interface CompanyLogoProps {
    url: string;
    name: string;
    priority?: boolean;
}

export function CompanyLogo({ url, name, priority = false }: CompanyLogoProps) {
    const [error, setError] = useState(false);

    if (!url || error) {
        return (
            <span
                className="text-lg font-bold text-slate-400 select-none uppercase"
                aria-hidden="true"
            >
                {name.charAt(0)}
            </span>
        );
    }

    return (
        <Image
            src={url}
            alt={`Logo de ${name}`}
            width={128}
            height={128}
            className="h-full w-full object-contain"
            priority={priority}
            onError={() => setError(true)}
        />
    );
}
