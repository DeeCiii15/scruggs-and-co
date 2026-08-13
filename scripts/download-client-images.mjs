/**
 * Download photography from the live Scruggs & Co Pixieset CDN into public/.
 * Run: node scripts/download-client-images.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const images = path.join(root, 'public', 'images');

const downloads = [
  {
    url: 'https://images-pw.pixieset.com/profile/306809/50a138b884ca273964a0090e3acb84ea65eab9c7e2f2d5f7f2f76c2ae7da2d5b.png',
    file: 'logo.png',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/l38v94/me-3ac8dc0e-2500.jpeg',
    file: 'about.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/0dw0mO/caitdavis-17-6f98d4e3-2500.jpg',
    file: 'contact.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/WWz5xw/weddingportfolio-3-dee0efe9-2500.jpg',
    file: 'hero_1.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/MXaWeR/weddingportfolio-6-8d922b0a-2500.jpg',
    file: 'hero_2.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/lDp6j5/scp20251060June0526-6bcd9971-2500.jpg',
    file: 'hero_3.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/yvKkjb/weddingportfolio-1-bef5ac3c-2500.jpg',
    file: 'hero_4.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/P0wyXj/weddingportfolio-11-0984304b-2500.jpg',
    file: 'hero_5.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/8Lv7XK/pk-74-a5274ef2-2500.jpg',
    file: 'inspiration_1.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/6w76Xk/pk-42-80f413a3-2500.jpg',
    file: 'inspiration_2.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/xZ3xWW/scp2025323August2325-Copy1-a5f7de7e-2500.jpg',
    file: 'inspiration_3.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/7XzkwO/weddingportfolio-5-2c576d1a-2500.jpg',
    file: 'wedding_1.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/abEeDd/weddingcontent-5-03f544fd-2500.jpg',
    file: 'engagement_1.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/3a8lXK/pk-70-5790cc01-2500.jpg',
    file: 'portrait_1.jpg',
  },
  // Wedding gallery: forever-moments
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/RQMpOM/weddingcontent-3-2-3bbede9e-2500.jpg',
    file: 'galleries/weddings/forever-moments/cover.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/vDxRq1/weddingcontent-6-c9379a89-2500.jpg',
    file: 'galleries/weddings/forever-moments/01.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/wDxOom/weddingcontent-8-b62e11f1-2500.jpg',
    file: 'galleries/weddings/forever-moments/02.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/Ov37wG/weddingcontent-1-2-745c5c95-2500.jpg',
    file: 'galleries/weddings/forever-moments/03.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/ERE4ve/weddingcontent-2-7a590508-2500.jpg',
    file: 'galleries/weddings/forever-moments/04.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/XLQp8Z/weddingcontent-1-d1ce7326-2500.jpg',
    file: 'galleries/weddings/forever-moments/05.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/Z1Yp5W/weddingcontent-4-f86b98d2-2500.jpg',
    file: 'galleries/weddings/forever-moments/06.jpg',
  },
  // Wedding gallery: golden-hour
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/3X9Lob/weddingportfolio2-4-3dae24d9-2500.jpg',
    file: 'galleries/weddings/golden-hour/cover.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/8Xjzdb/weddingportfolio2-1-cf19a62a-2500.jpg',
    file: 'galleries/weddings/golden-hour/01.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/l4QGEm/weddingportfolio2-5-9c6b62c9-2500.jpg',
    file: 'galleries/weddings/golden-hour/02.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/6XOLVl/weddingportfolio2-11-7f25a9f9-2500.jpg',
    file: 'galleries/weddings/golden-hour/03.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/vMkd91/weddingportfolio-9-fb33b2b8-2500.jpg',
    file: 'galleries/weddings/golden-hour/04.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/VwPoaA/weddingcontent-7-98ef9711-2500.jpg',
    file: 'galleries/weddings/golden-hour/05.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/pDbY7X/weddingcontent-2-2-338796ab-2500.jpg',
    file: 'galleries/weddings/golden-hour/06.jpg',
  },
  // Portraits / lifestyle
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/oM7Qqk/otp-2107-5ca90b1b-2500.jpg',
    file: 'galleries/portraits/lifestyle-sessions/cover.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/rvPVK3/otp-2134-22e5da74-2500.jpg',
    file: 'galleries/portraits/lifestyle-sessions/01.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/X8JxrV/otp-2161-38a1c2f4-2500.jpg',
    file: 'galleries/portraits/lifestyle-sessions/02.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/bYJxvz/otp-3867-f351579d-2500.jpg',
    file: 'galleries/portraits/lifestyle-sessions/03.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/EMverW/otp-0408-331c93b7-2500.jpg',
    file: 'galleries/portraits/lifestyle-sessions/04.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/R9OxrO/otp-2157-ca164007-2500.jpg',
    file: 'galleries/portraits/lifestyle-sessions/05.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/enJlQZ/otp-7042-bcb7d9b5-2500.jpg',
    file: 'galleries/portraits/lifestyle-sessions/06.jpg',
  },
  {
    url: 'https://images-pw.pixieset.com/site/ByOny4/vDx011/Ck-96-e2977cf7-2500.jpg',
    file: 'galleries/portraits/lifestyle-sessions/07.jpg',
  },
];

async function downloadOne({ url, file }) {
  const dest = path.join(images, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  console.log(`OK ${file} (${(buf.length / 1024).toFixed(0)} KB)`);
}

// Remove placeholder sample galleries
for (const sample of [
  'galleries/weddings/sample-wedding',
  'galleries/portraits/sample-portrait',
]) {
  const dir = path.join(images, sample);
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

// Drop old inspiration png if present
const oldPng = path.join(images, 'inspiration_1.png');
if (fs.existsSync(oldPng)) fs.unlinkSync(oldPng);

for (const item of downloads) {
  await downloadOne(item);
}

console.log(`Downloaded ${downloads.length} assets.`);
