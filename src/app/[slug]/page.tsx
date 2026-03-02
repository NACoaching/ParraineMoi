import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { CopyButton } from '@/components/CopyButton';
import { CompanyLogo } from '@/components/CompanyLogo';
import referralsData from '@/data/referrals.json';
import { Referral } from '@/components/ReferralCard';

export async function generateStaticParams() {
    const referrals = referralsData as Referral[];
    return referrals.map((referral) => ({
        slug: `parrainage-${referral.slug}`,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;

    if (!slug.startsWith('parrainage-')) {
        return {};
    }

    const brandSlug = slug.replace('parrainage-', '');
    const referrals = referralsData as Referral[];
    const referral = referrals.find((r) => r.slug === brandSlug);

    if (!referral) {
        return {};
    }

    const currentYear = new Date().getFullYear();

    return {
        title: `Code parrainage ${referral.name} : ${referral.advantage} en ${currentYear}`,
        description: `Profitez de ${referral.advantage} de bonus sur ${referral.name} avec mon code de parrainage ${referral.code} vérifié en ${currentYear}.`,
    };
}

export default async function ReferralPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    if (!slug.startsWith('parrainage-')) {
        notFound();
    }

    const brandSlug = slug.replace('parrainage-', '');
    const referrals = referralsData as Referral[];
    const referral = referrals.find((r) => r.slug === brandSlug);

    if (!referral) {
        notFound();
    }

    return (
        <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-16">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-8 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Retour aux codes
            </Link>

            <article className="max-w-2xl mx-auto">
                <header className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white shadow-sm ring-1 ring-slate-900/5 dark:ring-white/5 relative flex items-center justify-center p-4">
                        <CompanyLogo url={referral.logoUrl} name={referral.name} />
                    </div>
                    <div>
                        <div className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 mb-3">
                            {referral.category}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                            Avis et code parrainage {referral.name}
                        </h1>
                        <p className="text-lg font-medium text-primary bg-blue-50 dark:bg-blue-500/10 px-4 py-2 rounded-xl inline-block mt-2">
                            🎁 Bonus d'inscription : {referral.advantage}
                        </p>
                    </div>
                </header>

                <section className="mb-12">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                        Mon retour d'expérience
                    </h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
                        <p>{referral.description}</p>
                    </div>
                </section>

                <section className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-center">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        Comment profiter de l'offre ?
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
                        Copiez le code ci-dessous et collez-le dans le champ "Code de parrainage" lors de votre inscription.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch max-w-lg mx-auto">
                        {/* Promo Code Box */}
                        <div className="flex-1 flex items-center justify-between gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-xl p-2 pl-3">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="h-10 w-10 shrink-0 rounded-lg bg-white border border-slate-100 dark:border-slate-700 p-1.5 flex items-center justify-center overflow-hidden">
                                    <CompanyLogo url={referral.logoUrl} name={referral.name} />
                                </div>
                                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200 text-base lg:text-lg truncate select-all">
                                    {referral.code}
                                </span>
                            </div>
                            <CopyButton code={referral.code} className="shrink-0 h-10 px-4 text-sm" />
                        </div>

                        <a
                            href={referral.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 h-[60px] sm:h-auto px-8 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-sm active:scale-95"
                        >
                            S'inscrire
                            <ExternalLink size={18} />
                        </a>
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-6 max-w-md mx-auto">
                        En utilisant ce lien/code, je pourrais percevoir une commission de la part de {referral.name}. Merci à vous ! 🙏
                    </p>
                </section>
            </article>
        </main>
    );
}
