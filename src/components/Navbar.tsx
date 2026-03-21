import Link from "next/link";
import { Gift } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-md flex justify-center border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70">
            <div className="flex h-20 w-full max-w-6xl items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-3 font-bold text-2xl tracking-tighter text-slate-900 dark:text-white group">
                    <span className="p-2 bg-primary dark:bg-primary text-white rounded-xl shadow-lg ring-4 ring-primary/10 group-hover:scale-110 transition-transform">
                        <Gift size={24} />
                    </span>
                    <span className="group-hover:text-primary transition-colors">Codes de Parrainages</span>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
                    <Link href="/simulateur" className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-all hover:translate-y-[-1px]">
                        💰 Simulateur
                    </Link>
                    <Link href="/guides" className="hover:text-primary transition-all hover:translate-y-[-1px]">
                        Guides
                    </Link>
                    <Link href="/a-propos" className="hover:text-primary transition-all hover:translate-y-[-1px]">
                        Méthodologie
                    </Link>
                    <Link href="/mentions-legales" className="hover:text-primary transition-all hover:translate-y-[-1px]">
                        Légal
                    </Link>
                </div>
            </div>
        </nav >
    );
}
