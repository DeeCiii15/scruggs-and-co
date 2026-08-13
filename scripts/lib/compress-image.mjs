import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const IMAGE_RE = /\.(jpe?g|png|webp|gif)$/i;

/** Long edge cap — plenty for blog heroes and inline images */
export const COMPRESS_MAX_EDGE = 2400;
export const COMPRESS_QUALITY = 85;
/** Skip re-encoding when already web-sized (avoids quality loss on repeat syncs) */
export const SKIP_IF_UNDER_BYTES = 1.5 * 1024 * 1024;

export function formatMb(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Resize & JPEG-encode images. Skips files already under size/dimension limits.
 */
export async function optimizeImage(filePath) {
  const stat = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const meta = await sharp(filePath).metadata();
  const maxDim = Math.max(meta.width || 0, meta.height || 0);
  const isJpeg = ext === '.jpg' || ext === '.jpeg';

  if (
    stat.size < SKIP_IF_UNDER_BYTES &&
    maxDim <= COMPRESS_MAX_EDGE &&
    isJpeg
  ) {
    return { skipped: true, before: stat.size, after: stat.size };
  }

  const before = stat.size;
  const tempPath = `${filePath}.compressing`;
  let pipeline = sharp(filePath).rotate();

  if (maxDim > COMPRESS_MAX_EDGE) {
    pipeline = pipeline.resize(COMPRESS_MAX_EDGE, COMPRESS_MAX_EDGE, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  const jpegOpts = { quality: COMPRESS_QUALITY, mozjpeg: true };
  const outputPath =
    ext === '.jpeg' ? filePath : filePath.replace(/\.[^.]+$/i, '.jpg');

  await pipeline.jpeg(jpegOpts).toFile(tempPath);

  if (outputPath !== filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  fs.renameSync(tempPath, outputPath);

  const after = fs.statSync(outputPath).size;
  return { optimized: true, before, after, path: outputPath };
}
