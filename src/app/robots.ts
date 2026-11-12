import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/'],
            },
            {
                // Explicitly welcome AI Search Bots (ChatGPT Search, Perplexity, Claude, Apple Intelligence)
                userAgent: [
                    'GPTBot',
                    'OAI-SearchBot',
                    'ChatGPT-User',
                    'PerplexityBot',
                    'ClaudeBot',
                    'Applebot-Extended',
                    'Google-Extended',
                    'Bingbot'
                ],
                allow: ['/', '/llms.txt', '/llms-full.txt'],
                disallow: ['/api/'],
            }
        ],
        sitemap: 'https://codes-de-parrainages.com/sitemap.xml',
    };
}

