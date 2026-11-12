import { ReferralGrid } from "@/components/ReferralGrid";
import { referrals, guides } from "@/lib/data";
import { Referral } from "@/components/ReferralCard";
import { FaqAccordion } from "@/components/FaqAccordion";
import Link from "next/link";
import { ArrowRight, Search, Gift, Wallet, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

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
    answer: "Ce répertoire indépendant teste et contrôle les offres de bienvenue. Nous vérifions manuellement et régulièrement que chaque offre et code promo est toujours valide en 2026 afin de vous garantir que la prime sera bien versée sur votre profil."
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


const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Codes de parrainage et offres de bienvenue",
  "numberOfItems": referrals.length,
  "itemListElement": referrals.map((ref, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": `Code parrainage ${ref.name} : ${ref.advantage}`,
    "url": `https://codes-de-parrainages.com/parrainage-${ref.slug}`
  }))
};
export default function Home() {

  return (
    <main className="flex flex-col items-center min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <section className="w-full max-w-7xl px-4 sm:px-6 pt-5 pb-6 flex flex-col items-center text-center">
        {/* Compact Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-1.5 leading-tight max-w-2xl">
          Gagnez jusqu’à <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">200€ par inscription</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mb-3 leading-normal font-normal">
          Les meilleurs codes promo et liens bonus vérifiés (banques, cryptos, cashback).
        </p>

        {/* Stats bar - Ultra sleek mini bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] font-medium text-slate-600 mb-4 bg-white/80 border border-slate-200/80 py-1 px-3.5 rounded-full shadow-2xs">
          <span className="flex items-center gap-1">💰 <strong className="text-blue-600 font-bold">+1 500 €</strong> cumulables</span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="flex items-center gap-1">⚡ <strong className="text-slate-900 font-bold">50+</strong> offres</span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="flex items-center gap-1">🛡️ <strong className="text-emerald-600 font-bold">100%</strong> gratuit</span>
          <span className="text-slate-300 hidden sm:inline">•</span>
          <span className="flex items-center gap-1">⏱️ <strong className="text-indigo-600 font-bold">5 min</strong></span>
        </div>

        {/* Grille d'offres directement accessible */}
        <div id="grid-offres" className="w-full">
            <ReferralGrid referrals={referrals} />
        </div>

      </section>

      {/* Guides Section */}
      <section className="w-full max-w-5xl px-4 sm:px-6 pb-14 mt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Guides & Astuces Bancaires
            </h2>
            <p className="text-sm text-slate-500 mt-1">Nos comparatifs pour maximiser vos gains et éviter les pièges</p>
          </div>
          <Link href="/guides" className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 hover:bg-blue-100/60 transition-all">
            Tous les guides <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(() => {
            const featuredSlugs = ["comparatif-meilleure-banque-en-ligne-2026"];
            const featured = guides.filter((g) => featuredSlugs.includes(g.slug));
            const others = guides.filter((g) => !featuredSlugs.includes(g.slug));
            return [...featured, ...others].slice(0, 3);
          })().map((guide) => (
            <Link key={guide.id} href={`/guides/${guide.slug}`} className="group flex flex-col h-full bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-lg hover:border-blue-400 hover:-translate-y-1 transition-all duration-300">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full">{guide.category}</span>
                  <span className="text-xs text-slate-400 font-medium">{guide.readingTime}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow leading-relaxed">
                  {guide.excerpt}
                </p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Lire le guide</span>
                  <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FaqAccordion faqs={generalFaqs} />

      <section className="w-full max-w-5xl px-4 sm:px-6 pb-20 mt-12">
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm text-left">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-md shadow-blue-500/20">
              👋
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Qui suis-je et pourquoi ces codes vérifiés ?</h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                L&apos;idée de ce répertoire est très simple : plutôt que de laisser expirer mes invitations pour les excellents services que j&apos;utilise au quotidien, je centralise ici les meilleurs bons plans. <br className="hidden sm:block" />
                Je <strong>teste personnellement</strong> chaque plateforme (banque en ligne, application crypto, shopping) pendant plusieurs mois avant de la lister ici. Mes avis partagés reflètent une expérience utilisateur 100% authentique. Si vous gagnez de l&apos;argent de bienvenue grâce à ces affiliations, je touche également une petite prime transparente pour financer l&apos;hébergement du site. Gagnant-gagnant ! 🤝
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
