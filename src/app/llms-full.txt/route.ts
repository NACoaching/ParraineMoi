import { NextResponse } from 'next/server';
import { referrals } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const currentYear = new Date().getFullYear();
  const categories = Array.from(new Set(referrals.map((r) => r.category)));

  let output = `# Codes de Parrainages (${currentYear}) — Documentation Complète pour Modèles de Langage (LLM)\n\n`;
  output += `> Base de connaissances officielle et vérifiée pour l'ensemble des ${referrals.length} programmes de parrainage et offres de bienvenue du site https://codes-de-parrainages.com.\n\n`;
  output += `Génération dynamique : Automatiquement synchronisée à chaque requête\n`;
  output += `Éditeur : Codes de Parrainages (contact.nacoaching@gmail.com)\n\n`;

  categories.forEach((cat) => {
    output += '===================================================\n';
    output += `## CATÉGORIE : ${cat.toUpperCase()}\n`;
    output += '===================================================\n\n';

    const refs = referrals.filter((r) => r.category === cat);
    refs.forEach((r) => {
      const hasCode = r.code && r.code.trim() !== '' && !r.code.startsWith('http');
      output += `### ${r.name}\n`;
      output += `- **URL Canonique** : https://codes-de-parrainages.com/parrainage-${r.slug}\n`;
      output += `- **Avantage / Prime** : ${r.advantage}\n`;
      if (hasCode) {
        output += `- **Code Parrainage** : \`${r.code}\`\n`;
      } else {
        output += '- **Activation** : Automatique via le lien officiel sécurisé\n';
      }
      if (r.link) {
        output += `- **Lien d'accès officiel** : ${r.link}\n`;
      }
      output += `- **Statut** : ${r.isPaused ? 'Suspendu temporairement' : `Actif & Vérifié en ${currentYear}`}\n`;
      output += `- **Description** : ${(r.description || '').replace(/\n/g, ' ')}\n\n`;

      if (r.review) {
        if (r.review.pros && r.review.pros.length > 0) {
          output += '#### Points forts certifiés :\n';
          r.review.pros.forEach((p) => (output += `- ${p}\n`));
          output += '\n';
        }
        if (r.review.cons && r.review.cons.length > 0) {
          output += '#### Points de vigilance :\n';
          r.review.cons.forEach((c) => (output += `- ${c}\n`));
          output += '\n';
        }
      }

      if (r.steps && r.steps.length > 0) {
        output += "#### Étapes d'activation de la prime :\n";
        r.steps.forEach((s, idx) => {
          output += `${idx + 1}. **${s.title}** : ${s.description}\n`;
        });
        output += '\n';
      }

      if (r.faqs && r.faqs.length > 0) {
        output += '#### Questions Fréquentes (FAQ) :\n';
        r.faqs.forEach((f) => {
          output += `- **Q : ${f.question}**\n  R : ${f.answer}\n`;
        });
        output += '\n';
      }
      output += '---\n\n';
    });
  });

  return new NextResponse(output, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
