import Link from "next/link";
import { Gift } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-xl flex justify-center border-b border-slate-200/50 dark:border-slate-800/50 bg-white/75 dark:bg-slate-950/75">
            <div className="flex h-16 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 dark:text-white hover:opacity-80 transition-opacity">
                    <span className="p-1.5 bg-primary/10 rounded-lg text-primary">
                        <Gift size={20} />
                    </span>
                    ParraineMoi
                </Link>
                <div className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/mentions-legales" className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                        Mentions Légales
                    </Link>
                </div>
            </div>
        </nav>
    );
}
