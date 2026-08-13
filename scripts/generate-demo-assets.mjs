/**
 * Generate neutral demo images + favicon set for the photography template.
 * Overwrites client leftover assets with abstract placeholders (no photos).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const imagesDir = path.join(root, 'public', 'images');
const publicDir = path.join(root, 'public');

const PALETTES = [
  ['#f5f5f5', '#e5e5e5', '#171717'],
  ['#fafafa', '#d4d4d4', '#262626'],
  ['#f5f5f5', '#a3a3a3', '#171717'],
  ['#e5e5e5', '#737373', '#171717'],
  ['#fafafa', '#525252', '#0a0a0a'],
  ['#f5f5f5', '#404040', '#171717'],
];

function gradientSvg(width, height, [c1, c2, c3], label) {
  const safe = label.replace(/[<>&]/g, '');
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="55%" stop-color="${c2}"/>
      <stop offset="100%" stop-color="${c3}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <circle cx="${Math.round(width * 0.72)}" cy="${Math.round(height * 0.28)}" r="${Math.round(Math.min(width, height) * 0.18)}" fill="${c1}" opacity="0.35"/>
  <circle cx="${Math.round(width * 0.22)}" cy="${Math.round(height * 0.7)}" r="${Math.round(Math.min(width, height) * 0.12)}" fill="${c3}" opacity="0.2"/>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
    font-family="system-ui, -apple-system, sans-serif" font-size="${Math.max(18, Math.round(width * 0.045))}"
    fill="${c3}" opacity="0.55">${safe}</text>
</svg>`);
}

async function writeRaster(relPath, width, height, paletteIndex, label, format = 'jpeg') {
  const out = path.join(imagesDir, relPath);
  await fs.mkdir(path.dirname(out), { recursive: true });
  const svg = gradientSvg(width, height, PALETTES[paletteIndex % PALETTES.length], label);
  let pipeline = sharp(svg).resize(width, height);
  if (format === 'png') {
    await pipeline.png({ compressionLevel: 8 }).toFile(out);
  } else {
    await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  }
  console.log('wrote', path.relative(root, out));
}

/** Simple geometric mark — black/gray square, not client branding */
function demoMarkSvg(size = 512) {
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#171717"/>
  <rect x="96" y="96" width="320" height="320" fill="none" stroke="#f5f5f5" stroke-width="28"/>
  <rect x="176" y="176" width="160" height="160" fill="#737373"/>
</svg>`);
}

async function generateFavicons(markPngPath) {
  const source = sharp(markPngPath).ensureAlpha();
  const sizes = [
    ['favicon-16x16.png', 16],
    ['favicon-32x32.png', 32],
    ['favicon-48x48.png', 48],
    ['favicon-96x96.png', 96],
    ['favicon-144x144.png', 144],
    ['icon-192.png', 192],
    ['icon-512.png', 512],
    ['apple-touch-icon.png', 180],
  ];
  for (const [name, size] of sizes) {
    await source
      .clone()
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, name));
    console.log('wrote public/' + name);
  }
  // ICO as 48px PNG bytes is acceptable for modern browsers via link tags; also write png-as-ico
  await source
    .clone()
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('wrote public/favicon.ico');
}

const REMOVE = [
  'rose-favicon.png',
  '1_exp.JPEG',
  '2_exp.JPEG',
  '3_exp.JPG',
  '4_exp.JPEG',
  '20260410_142202140_iOS.jpg',
  'bridal_1.jpg',
  'business_1.jpg',
  'maternity_1.jpg',
  'events_1.jpg',
  'unused.jpg',
  'inspiration/moodboard-arch-evergreen.png',
  'inspiration/moodboard-field-gold.png',
  'inspiration/moodboard-film-monochrome.png',
];

// --- generate demo images ---
await writeRaster('hero_1.jpg', 1920, 1280, 0, 'Demo hero 1');
await writeRaster('hero_2.jpg', 1920, 1280, 1, 'Demo hero 2');
await writeRaster('hero_3.jpg', 1920, 1280, 2, 'Demo hero 3');
await writeRaster('hero_4.jpg', 1920, 1280, 3, 'Demo hero 4');
await writeRaster('hero_5.jpg', 1920, 1280, 4, 'Demo hero 5');
await writeRaster('inspiration_1.png', 1200, 1500, 1, 'Mood 1', 'png');
await writeRaster('inspiration_2.jpg', 1200, 1500, 2, 'Mood 2');
await writeRaster('inspiration_3.jpg', 1200, 1500, 3, 'Mood 3');
await writeRaster('about.jpg', 1200, 1500, 0, 'About');
await writeRaster('contact.jpg', 1200, 1500, 5, 'Contact');
await writeRaster('wedding_1.jpg', 1200, 900, 0, 'Weddings');
await writeRaster('portrait_1.jpg', 1200, 900, 1, 'Portraits');
await writeRaster('engagement_1.jpg', 1200, 900, 2, 'Engagement');

await writeRaster('galleries/weddings/sample-wedding/cover.jpg', 1200, 1500, 0, 'Sample wedding');
await writeRaster('galleries/weddings/sample-wedding/01.jpg', 1600, 1067, 2, 'Sample wedding');
await writeRaster('galleries/portraits/sample-portrait/cover.jpg', 1200, 1500, 1, 'Sample portrait');
await writeRaster('galleries/portraits/sample-portrait/01.jpg', 1600, 1067, 4, 'Sample portrait');

const markPath = path.join(imagesDir, 'demo-mark.png');
await sharp(demoMarkSvg(512)).png().toFile(markPath);
console.log('wrote', path.relative(root, markPath));

await generateFavicons(markPath);

for (const rel of REMOVE) {
  const full = path.join(imagesDir, rel);
  try {
    await fs.unlink(full);
    console.log('removed', rel);
  } catch {
    /* already gone */
  }
}

// Remove empty inspiration folder if empty
try {
  await fs.rmdir(path.join(imagesDir, 'inspiration'));
  console.log('removed inspiration/');
} catch {
  /* not empty or missing */
}

console.log('Demo assets ready.');
