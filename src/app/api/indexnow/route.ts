import { NextResponse } from 'next/server';
import { referrals, guides } from '@/lib/data';
import { slugifyCategory } from '@/lib/utils';

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');
        // Simple security check via secret or IndexNow key query
        const urlObj = new URL(request.url);
        const secret = urlObj.searchParams.get('secret') || authHeader?.replace('Bearer ', '');
        
        const INDEXNOW_KEY = 'a21b0fa6745cc4ce713029b242da3bfb';
        const HOST = 'codes-de-parrainages.com';
        const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

        if (secret !== INDEXNOW_KEY && process.env.NODE_ENV === 'production' && secret !== process.env.INDEXNOW_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const baseUrl = `https://${HOST}`;
        const categories = Array.from(new Set(referrals.map(r => r.category)));

        const urls: string[] = [
            baseUrl,
            `${baseUrl}/guides`,
            `${baseUrl}/simulateur`,
            ...referrals.map(r => `${baseUrl}/parrainage-${r.slug}`),
            ...guides.map(g => `${baseUrl}/guides/${g.slug}`),
            ...categories.map(c => `${baseUrl}/categorie/${slugifyCategory(c)}`),
        ];

        const payload = {
            host: HOST,
            key: INDEXNOW_KEY,
            keyLocation: KEY_LOCATION,
            urlList: urls,
        };

        const res = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(payload),
        });

        return NextResponse.json({
            success: true,
            status: res.status,
            message: `Submitted ${urls.length} URLs to IndexNow`,
            urlsCount: urls.length,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({
        endpoint: 'IndexNow Instant Search Indexing',
        documentation: 'https://www.indexnow.org',
        keyLocation: 'https://codes-de-parrainages.com/a21b0fa6745cc4ce713029b242da3bfb.txt',
    });
}
