import { ReferralGrid } from "@/components/ReferralGrid";
import referralsData from "@/data/referrals.json";
import { Referral } from "@/components/ReferralCard";
import { FaqAccordion } from "@/components/FaqAccordion";

export default function Home() {
  const referrals = referralsData as Referral[];

  const generalFaqs = [
    {
      question: "Comment fonctionnent ces codes de parrainage et réductions ?",
      answer: "Les codes et liens de parrainage listés sur ce site vous permettent de bénéficier d'avantages exclusifs (crédit offert, prime en euros, réductions) lors de l'ouverture d'un nouveau compte sur des applications partenaires (banque en ligne, applications crypto, shopping). Il vous suffit de cliquer sur nos liens ou de renseigner le code indiqué à l'inscription pour que le bonus s'applique automatiquement."
    },
    {
      question: "Les offres de bienvenue sont-elles cumulables ?",
      answer: "Oui, la magie du parrainage est que vous pouvez cumuler les offres de différents services ! Par exemple, vous pouvez obtenir une prime d'ouverture de compte chez Fortuneo, tout en profitant le même jour d'une offre cash chez PayPal ou d'un bonus d'inscription en crypto chez Bitstack. Seule règle : être un nouveau client de l'application."
    },
    {
      question: "Pourquoi ces codes de parrainage sont-ils fiables et vérifiés ?",
      answer: "Ce site agit comme un répertoire personnel. Je ne mets en ligne que les codes de parrainage des services que j'utilise activement au quotidien (pour payer, investir ou faire mes achats). Je vérifie manuellement chaque semaine que l'offre est toujours valide en 2026 afin de vous garantir que la prime sera bien versée sur votre profil."
    }
  ];

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

      <FaqAccordion faqs={generalFaqs} />

      <section className="w-full max-w-5xl px-4 sm:px-6 pb-20 mt-12">
        <div className="max-w-3xl mx-auto px-6 py-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-800 text-left">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="h-20 w-20 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
              👋
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Qui suis-je et pourquoi ces codes vérifiés ?</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                L'idée de ce répertoire est très simple : plutôt que de laisser expirer mes invitations pour les excellents services que j'utilise au quotidien, je centralise ici les meilleurs bons plans. <br className="hidden sm:block" />
                Je vous rassure, je <strong>teste personnellement</strong> chaque plateforme (banque en ligne, application crypto, shopping) pendant plusieurs mois avant de la lister ici. Mes avis partagés reflètent une expérience utilisateur 100% authentique. Si vous gagnez de l'argent de bienvenue grâce à ces affiliations, dites-vous que je touche également une petite prime transparente pour payer l'hébergement du site. Gagnant-gagnant ! 🤝
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
