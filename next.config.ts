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
    return [
      {
        source: '/guides/voyager-sans-frais-bancaires',
        destination: '/guides/guide-voyage-revolut-frais-bancaires-etranger',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
