import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/site.webmanifest'],
        },
        sitemap: 'https://codes-de-parrainages.com/sitemap.xml',
    };
}
