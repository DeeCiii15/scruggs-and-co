'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { PortfolioPhoto } from '@/lib/portfolioData';
import { polaroidImageFrameClass } from '@/lib/scrapbookGalleryStyles';
import PortfolioPolaroidLightbox from './PortfolioPolaroidLightbox';

type PortfolioPhotoGridProps = {
  photos: PortfolioPhoto[];
};

export default function PortfolioPhotoGrid({ photos }: PortfolioPhotoGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="rounded-sm border border-gray-200 bg-white py-24 text-center">
        <p className="text-lg text-gray-900">
          I&apos;m still curating this little gallery
        </p>
        <p className="mt-3 text-gray-600">
          Check back soon—I&apos;m always adding new favorites.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 gap-x-6 gap-y-4 overflow-x-clip sm:columns-2 md:columns-3 md:gap-x-8">
        {photos.map((photo, i) => (
          <div
            key={photo.id}
            className="group mb-6 w-full max-w-full break-inside-avoid"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`block w-full cursor-zoom-in fl-print text-left ${i % 2 === 0 ? 'fl-print-tilt-left' : 'fl-print-tilt-right'}`}
              aria-label={`View larger: ${photo.alt}`}
            >
              <div className={polaroidImageFrameClass(i)}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-center fl-photo-earth transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </button>
          </div>
        ))}
      </div>

      {activeIndex !== null ? (
        <PortfolioPolaroidLightbox
          photos={photos}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      ) : null}
    </>
  );
}
