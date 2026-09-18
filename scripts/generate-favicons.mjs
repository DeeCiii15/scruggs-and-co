/**
 * Favicon set from the sage oval S mark.
 * Site logos are left untouched — size and stroke live only in these icons.
 * Source: public/images/brand/scruggs-co-hero-mark-sage.svg
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const sourceSvg = path.join(
  root,
  'public/images/brand/scruggs-co-hero-mark-sage.svg',
);
const publicDir = path.join(root, 'public');
const PAPER = { r: 244, g: 236, b: 225, alpha: 1 };

const source = fs.readFileSync(sourceSvg, 'utf8');
const pathMatch = source.match(/<path[\s\S]*?\/>/);
if (!pathMatch) {
  throw new Error('Could not find the logo path in the sage mark SVG');
}

const boldPath = pathMatch[0].replace(
  '<path ',
  '<path stroke="#929c7c" stroke-width="36" stroke-linejoin="round" stroke-linecap="round" ',
);

const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img">
  <rect width="100" height="100" fill="#F4ECE1"/>
  <svg x="1" y="1" width="98" height="98" viewBox="0 0 1024 892" preserveAspectRatio="xMidYMid meet">
    ${boldPath}
  </svg>
</svg>
`;

const faviconSvgPath = path.join(publicDir, 'favicon.svg');
fs.writeFileSync(faviconSvgPath, faviconSvg);

const master = await sharp(Buffer.from(faviconSvg), { density: 480 })
  .resize(1024, 1024, {
    fit: 'cover',
    background: PAPER,
  })
  .png()
  .toBuffer();

function iconPipeline(size) {
  return sharp(master)
    .resize(size, size, {
      fit: 'cover',
      kernel: sharp.kernel.lanczos3,
    })
    .png({ compressionLevel: 9, effort: 10 });
}

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'favicon-96x96.png', size: 96 },
  { name: 'favicon-144x144.png', size: 144 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

for (const { name, size } of sizes) {
  await iconPipeline(size).toFile(path.join(publicDir, name));
}

await iconPipeline(180).toFile(path.join(publicDir, 'apple-touch-icon.png'));
await iconPipeline(48).toFile(path.join(publicDir, 'favicon.ico'));

console.log('Generated larger, bolder favicons from the sage oval S logo');
