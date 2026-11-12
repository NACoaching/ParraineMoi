import { Referral } from "./ReferralCard";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";

interface QuickConditionsProps {
  referral: Referral;
}

const BRAND_CONDITIONS: Record<
  string,
  { action: string; delay: string; caution: string }
> = {
  fortuneo: {
    action: "Ouvrir un compte avec carte bancaire (Gold CB recommandée) et effectuer un premier versement de 300€.",
    delay: "Prime créditée sous 15 jours sur votre compte bancaire.",
    caution: "Conserver le compte ouvert pendant au moins 1 an pour ne pas perdre la prime.",
  },
  revolut: {
    action: "Valider votre identité (KYC rapide), recharger le compte et effectuer 3 paiements d'au moins 5€ par carte (physique ou virtuelle).",
    delay: "Prime libérée automatiquement dès la prise en compte des 3 paiements.",
    caution: "Finaliser les 3 transactions avant la date limite affichée dans votre application.",
  },
  boursobank: {
    action: "Ouvrir un compte avec carte Ultim ou Welcome et réaliser un premier versement (dès 50€).",
    delay: "Prime versée immédiatement le jour de l'activation officielle du compte.",
    caution: "Garder le compte bancaire actif au moins 12 mois.",
  },
  winamax: {
    action: "Créer votre compte joueur et effectuer un premier dépôt d'argent réel en renseignant le code.",
    delay: "Freebets (paris gratuits) crédités instantanément sur votre solde joueur.",
    caution: "Réservé aux personnes majeures (18+). Valider ses documents sous 30 jours.",
  },
  sumeria: {
    action: "Créer votre compte gratuit, vérifier votre profil et réaliser au moins 3 paiements avec la carte Sumeria.",
    delay: "30€ crédités sous 72h après confirmation des transactions.",
    caution: "Réservé aux nouveaux clients n'ayant jamais possédé de compte Lydia ou Sumeria.",
  },
  coinhouse: {
    action: "Ouvrir votre compte investisseur, certifier votre identité et effectuer un premier achat ou transfert crypto éligible.",
    delay: "Bonus en Bitcoin directement crédité sur votre compte Coinhouse.",
    caution: "Respecter le montant minimum de transaction indiqué pour déclencher le palier de prime.",
  },
  swissborg: {
    action: "Télécharger l'application via le lien partenaire et déposer au moins 50€ en euros ou équivalent crypto.",
    delay: "Ticket à gratter crédité immédiatement (prime aléatoire en BORG ou BTC jusqu'à 100€).",
    caution: "Pensez à gratter votre ticket dans les 30 jours avant son expiration.",
  },
  n26: {
    action: "Ouvrir votre compte courant N26 (Standard gratuit) et effectuer un premier paiement par carte.",
    delay: "Prime versée directement sur votre compte dans les jours suivant le paiement.",
    caution: "Vérifier que votre pièce d'identité est bien acceptée lors de la visioconférence rapide.",
  },
  "trade-republic": {
    action: "Ouvrir un compte d'investissement, valider le profil et réaliser un premier versement + 1 à 2 ordres d'achat d'actions.",
    delay: "Action fractionnée ou bonus en cash crédité sous quelques jours.",
    caution: "Offre soumise aux conditions du courtier, réservée aux résidents fiscaux éligibles.",
  },
  igraal: {
    action: "Créer votre compte gratuit via le lien et effectuer votre premier achat chez un marchand partenaire.",
    delay: "Bonus de bienvenue crédité immédiatement dans votre cagnotte iGraal.",
    caution: "Désactiver votre bloqueur de publicité (AdBlock) pour que le cashback soit bien enregistré.",
  },
  poulpeo: {
    action: "S'inscrire avec le code parrain et activer votre premier cashback chez un commerçant éligible.",
    delay: "5€ crédités dès l'inscription, déblocables dès 10€ cumulés.",
    caution: "Pensez à accepter les cookies sur le site marchand pour valider le suivi.",
  },
  vinted: {
    action: "Créer votre compte Vinted via le lien parrain et publier vos premiers articles dans les délais impartis.",
    delay: "Bons d'achat crédités sur votre porte-monnaie Vinted après vos premières ventes.",
    caution: "Offre réservée aux nouveaux membres qui créent un profil pour la première fois.",
  },
  "uber-eats": {
    action: "Télécharger l'application Uber Eats et entrer le code promo dans la section Promotions avant de payer.",
    delay: "Réduction appliquée instantanément sur le total de votre commande.",
    caution: "Valable uniquement sur la toute première commande avec un panier minimum requis.",
  },
};

export function QuickConditions({ referral }: QuickConditionsProps) {
  const brand = BRAND_CONDITIONS[referral.slug];

  const actionText =
    brand?.action ||
    (referral.steps && referral.steps.length > 0
      ? `${referral.steps[0].title} : ${referral.steps[0].description.replace(/\*\*/g, "")}`
      : `Créer votre compte sur ${referral.name} et compléter les étapes de bienvenue.`);

  const delayText =
    brand?.delay ||
    "Prime créditée généralement sous quelques jours après validation complète des conditions.";

  const cautionText =
    brand?.caution ||
    (referral.review?.cons && referral.review.cons.length > 0
      ? referral.review.cons[0].replace(/\*\*/g, "")
      : "Offre réservée aux nouveaux clients. Pensez à vérifier que vous remplissez les critères d'éligibilité.");

  return (
    <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 mb-8 shadow-xs">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <span className="text-base sm:text-lg">📋</span>
        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight">
          L&apos;essentiel en 30 secondes (Conditions sans jargon)
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {/* Action */}
        <div className="flex flex-col p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 mb-1.5">
            <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
            <span>Ce qu&apos;il faut faire :</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {actionText}
          </p>
        </div>

        {/* Delay */}
        <div className="flex flex-col p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 mb-1.5">
            <Clock size={14} className="text-blue-600 shrink-0" />
            <span>Délai de versement :</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {delayText}
          </p>
        </div>

        {/* Caution */}
        <div className="flex flex-col p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70">
          <div className="flex items-center gap-1.5 font-bold text-xs text-amber-950 mb-1.5">
            <AlertTriangle size={14} className="text-amber-600 shrink-0" />
            <span>Le point de vigilance :</span>
          </div>
          <p className="text-xs text-amber-900 leading-relaxed">
            {cautionText}
          </p>
        </div>
      </div>
    </section>
  );
}
