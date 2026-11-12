import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function pingIndexNow() {
  try {
    const referralsPath = path.join(__dirname, '../src/data/referrals.json');
    const guidesPath = path.join(__dirname, '../src/data/guides.json');

    const referrals = JSON.parse(fs.readFileSync(referralsPath, 'utf8'));
    const guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));

    const HOST = 'codes-de-parrainages.com';
    const INDEXNOW_KEY = 'a21b0fa6745cc4ce713029b242da3bfb';
    const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
    const baseUrl = `https://${HOST}`;

    const slugifyCategory = (cat) =>
      cat
        .toLowerCase()
        .replace(/&/g, 'et')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');

    const categories = Array.from(new Set(referrals.map((r) => r.category)));

    const urls = [
      baseUrl,
      `${baseUrl}/guides`,
      `${baseUrl}/simulateur`,
      ...referrals.map((r) => `${baseUrl}/parrainage-${r.slug}`),
      ...guides.map((g) => `${baseUrl}/guides/${g.slug}`),
      ...categories.map((c) => `${baseUrl}/categorie/${slugifyCategory(c)}`),
    ];

    console.log(`[IndexNow] Submitting ${urls.length} URLs to Bing & IndexNow...`);

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

    console.log(`[IndexNow] Done! Status: ${res.status} (${urls.length} URLs submitted)`);
  } catch (err) {
    console.warn(`[IndexNow] Warning: Could not ping IndexNow during build:`, err.message);
  }
}

pingIndexNow();
