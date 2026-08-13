/**
 * Regenerate favicon set from the generic demo mark.
 * Source: public/images/demo-mark.png
 */
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const sourcePng = path.join(root, 'public/images/demo-mark.png');
const publicDir = path.join(root, 'public');

const source = sharp(sourcePng).ensureAlpha();

function iconPipeline(size) {
  return source.clone().resize(size, size, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
    kernel: sharp.kernel.lanczos3,
  }).png({ compressionLevel: 9, effort: 10 });
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

console.log('Generated favicons from public/images/demo-mark.png');
