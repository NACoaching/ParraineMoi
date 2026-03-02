import { MetadataRoute } from 'next';
import referralsData from '@/data/referrals.json';
import { Referral } from '@/components/ReferralCard';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://codes-de-parrainages.com';
    const referrals = referralsData as Referral[];

    // Home page
    const homeSitemap: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
    ];

    // Dynamic offer pages
    const referralsSitemap: MetadataRoute.Sitemap = referrals.map((referral) => ({
        url: `${baseUrl}/parrainage-${referral.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    // Legal mentions page
    const staticPagesSitemap: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/mentions-legales`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        }
    ];

    return [...homeSitemap, ...referralsSitemap, ...staticPagesSitemap];
}
