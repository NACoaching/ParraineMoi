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

        <div className="max-w-3xl mx-auto mb-16 px-6 py-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-800 text-left">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="h-20 w-20 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
              👋
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Qui suis-je et pourquoi ces codes ?</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                L'idée de ce site est très simple : plutôt que de laisser expirer mes invitations pour les supers services que j'utilise au quotidien, je les centralise ici. <br className="hidden sm:block" />
                Je vous rassure, je **teste personnellement** chaque plateforme (banque, shopping, utilitaire) pendant plusieurs mois avant de la lister ici. Les encarts "Mon avis / Expérience" reflètent mon usage réel. Si vous gagnez de l'argent grâce à ces bons plans, dites-vous que j'y gagne un pourcentage symbolique aussi pour payer l'hébergement du site ! Gagnant-gagnant. 🤝
              </p>
            </div>
          </div>
        </div>

        <ReferralGrid referrals={referrals} />
      </section>
    </main>
  );
}
