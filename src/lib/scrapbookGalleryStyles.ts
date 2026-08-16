/**
 * Flat gallery frame helpers (no tilt / polaroid chrome).
 * Kept for API compatibility with portfolio grid components.
 */

export type ScrapbookTiltSide = 'left' | 'right' | 'center';

export type ScrapbookStyle = {
  rotate: string;
  push: string;
  lip: string;
};

const FLAT: ScrapbookStyle = {
  rotate: '',
  push: '',
  lip: '',
};

export function getScrapbookStyle(
  _side: ScrapbookTiltSide,
  _rowIndex = 0,
): ScrapbookStyle {
  return FLAT;
}

/** Row-major CSS grid column → side (unused for tilt; kept for callers) */
export function getGridTiltPosition(
  index: number,
  columnCount = 3,
): { side: ScrapbookTiltSide; row: number } {
  const col = index % columnCount;
  const row = Math.floor(index / columnCount);
  if (col === 0) return { side: 'left', row };
  if (col === columnCount - 1) return { side: 'right', row };
  return { side: 'center', row };
}

export function getMasonryTiltPosition(
  index: number,
  totalItems: number,
  columnCount: number,
): { side: ScrapbookTiltSide; row: number } {
  if (columnCount <= 1) {
    return {
      side: index % 2 === 0 ? 'left' : 'right',
      row: Math.floor(index / 2),
    };
  }

  const rowsPerColumn = Math.ceil(totalItems / columnCount);
  const col = Math.floor(index / rowsPerColumn);
  const row = index % rowsPerColumn;

  if (col === 0) return { side: 'left', row };
  if (col === columnCount - 1) return { side: 'right', row };
  return { side: 'center', row };
}

export function getScrapbookStyleForMasonryIndex(
  index: number,
  totalItems: number,
  columnCount: number,
): ScrapbookStyle {
  const { side, row } = getMasonryTiltPosition(index, totalItems, columnCount);
  return getScrapbookStyle(side, row);
}

/** Simple image frame — consistent aspect, no mat chrome */
export function polaroidImageFrameClass(_index: number): string {
  return 'relative isolate w-full max-w-full overflow-hidden bg-paper-deep aspect-[4/5]';
}
