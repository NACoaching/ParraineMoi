import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/s2/favicons/**',
      },
    ],
  },
  async redirects() {
    const guideSlugs = [
      'comparatif-meilleure-banque-en-ligne-2026',
      'investir-bitcoin-arrondis',
      'achat-cartes-pokemon-encheres-live',
      'comparatif-applications-marche-remuneree',
      'revenu-passif-partage-connexion-internet',
      'debuter-en-bourse-petit-budget',
      'guide-cashback-economiser-achats-igraal',
      'guide-crypto-debutant-acheter-premier-bitcoin-coinbase',
      'guide-voyage-revolut-frais-bancaires-etranger',
      'pourquoi-choisir-boursobank-meilleure-banque-en-ligne',
      'top-parrainage-prime-immediate-2026',
      'avis-coinpayu-code-promo-crypto-gratuit',
      'avis-coinhouse-bonus-500-euros-bitcoin',
      'code-parrainage-sumeria-lydia-2026',
      'voyager-sans-frais-bancaires',
    ];

    return [
      {
        source: '/guides/voyager-sans-frais-bancaires',
        destination: '/guides/guide-voyage-revolut-frais-bancaires-etranger',
        permanent: true,
      },
      ...guideSlugs.map((slug) => ({
        source: `/${slug}`,
        destination: `/guides/${slug === 'voyager-sans-frais-bancaires' ? 'guide-voyage-revolut-frais-bancaires-etranger' : slug}`,
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
