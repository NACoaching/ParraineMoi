import { MetadataRoute } from 'next';
import { referrals, guides } from '@/lib/data';
import { slugifyCategory } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://codes-de-parrainages.com';
    
    // Find the latest verification date across all referrals for global freshness
    const lastModified = referrals.reduce((latest, referral) => {
        if (!referral.lastVerified) return latest;
        const refDate = new Date(referral.lastVerified);
        return refDate > latest ? refDate : latest;
    }, new Date('2024-01-01'));

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
        {
            url: `${baseUrl}/simulateur`,
            lastModified: lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/a-propos`,
            lastModified: lastModified,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/plan-du-site`,
            lastModified: lastModified,
            changeFrequency: 'monthly',
            priority: 0.4,
        },
    ];

    // Dynamic pages (referrals)
    const referralsSitemap: MetadataRoute.Sitemap = referrals.map((referral) => ({
        url: `${baseUrl}/parrainage-${referral.slug}`,
        lastModified: referral.lastVerified ? new Date(referral.lastVerified) : lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
    }));

    // Dynamic guide pages
    const guidesSitemap: MetadataRoute.Sitemap = guides.map((guide) => ({
        url: `${baseUrl}/guides/${guide.slug}`,
        lastModified: new Date(guide.date),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    // Dynamic category pages
    const categories = Array.from(new Set(referrals.map(r => r.category)));
    const categoriesSitemap: MetadataRoute.Sitemap = categories.map((cat) => ({
        url: `${baseUrl}/categorie/${slugifyCategory(cat)}`,
        lastModified: lastModified,
        changeFrequency: 'weekly',
        priority: 0.9,
    }));

    return [...homeSitemap, ...staticPagesSitemap, ...referralsSitemap, ...guidesSitemap, ...categoriesSitemap];
}
