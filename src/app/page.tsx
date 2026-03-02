import { ReferralGrid } from "@/components/ReferralGrid";
import referralsData from "@/data/referrals.json";
import { Referral } from "@/components/ReferralCard";

export default function Home() {
  const referrals = referralsData as Referral[];

  return (
    <main className="flex flex-col items-center min-h-screen pb-20">
      <section className="w-full max-w-5xl px-4 sm:px-6 pt-16 pb-12 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
          Mes codes de <span className="text-primary">parrainage</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-12">
          Des offres testées et approuvées. Utilisez mes codes pour bénéficier d'avantages exclusifs lors de votre inscription.
        </p>

        <ReferralGrid referrals={referrals} />
      </section>
    </main>
  );
}
