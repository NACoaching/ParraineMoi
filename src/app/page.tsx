import { ReferralGrid } from "@/components/ReferralGrid";
import referralsData from "@/data/referrals.json";
import { Referral } from "@/components/ReferralCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import guidesData from "@/data/guides.json";
import Link from "next/link";
import { ArrowRight, Search, Gift, Wallet } from "lucide-react";

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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": generalFaqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Codes de Parrainages",
  "url": "https://codes-de-parrainages.com"
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Codes de parrainage et offres de bienvenue",
  "numberOfItems": referralsData.length,
  "itemListElement": referralsData.map((ref, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": `Code parrainage ${ref.name} : ${ref.advantage}`,
    "url": `https://codes-de-parrainages.com/parrainage-${ref.slug}`
  }))
};
export default function Home() {
  const referrals = referralsData as Referral[];

  return (
    <main className="flex flex-col items-center min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <section className="w-full max-w-5xl px-4 sm:px-6 pt-16 pb-12 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
          Mes codes de <span className="text-primary">parrainage</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-12">
          Des offres testées et approuvées. Utilisez mes codes pour bénéficier d'avantages exclusifs lors de votre inscription.
        </p>

        {/* Comment ça marche */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full max-w-4xl mx-auto text-left">
          <div className="flex flex-col items-center md:items-start text-center md:text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">1. Cherchez une offre</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Parcourez notre catalogue et filtrez par catégorie (Banque, Shopping...) pour trouver le bon plan idéal.</p>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Gift className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">2. Utilisez le code</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Copiez le code promo ou cliquez sur le lien de parrainage lors de votre inscription sur l'application.</p>
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
              <Wallet className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">3. Gagnez votre prime</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Une fois votre compte validé, la prime de bienvenue ou la réduction s'applique automatiquement.</p>
          </div>
        </div>

        <ReferralGrid referrals={referrals} />

      </section>

      {/* Guides Section */}
      <section className="w-full max-w-5xl px-4 sm:px-6 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Guides & Astuces
          </h2>
          <Link href="/guides" className="text-primary hover:text-primary/80 font-medium flex items-center gap-1">
            Tous les guides <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guidesData.slice(0, 3).map((guide) => (
            <Link key={guide.id} href={`/guides/${guide.slug}`} className="group flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{guide.category}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{guide.readingTime}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-grow">
                  {guide.excerpt}
                </p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Lire la suite</span>
                  <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
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
