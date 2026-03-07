import { MetadataRoute } from 'next';
import referralsData from '@/data/referrals.json';
import guidesData from '@/data/guides.json';
import { slugifyCategory } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://codes-de-parrainages.com';
    const lastModified = new Date('2026-03-05'); // Fixed date for static content

    // Home page
    const homeSitemap: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: lastModified,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
    ];

    // Static pages
    const staticPagesSitemap: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/mentions-legales`,
            lastModified: lastModified,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/politique-de-confidentialite`,
            lastModified: lastModified,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/guides`,
            lastModified: lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    // Dynamic pages (referrals)
    const referralsSitemap: MetadataRoute.Sitemap = referralsData.map((referral) => ({
        url: `${baseUrl}/parrainage-${referral.slug}`,
        lastModified: referral.lastVerified ? new Date(referral.lastVerified) : lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    // Dynamic guide pages
    const guidesSitemap: MetadataRoute.Sitemap = guidesData.map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: new Date(guide.date),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // Dynamic category pages
    const categories = Array.from(new Set(referralsData.map(r => r.category)));
    const categoriesSitemap: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${baseUrl}/categorie/${slugifyCategory(cat)}`,
        lastModified: lastModified,
        changeFrequency: 'weekly',
        priority: 0.9,
    }));

    return [...homeSitemap, ...staticPagesSitemap, ...referralsSitemap, ...guidesSitemap, ...categoriesSitemap];
}
