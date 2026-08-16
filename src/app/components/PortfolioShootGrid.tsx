import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioShootCard } from '@/lib/portfolioData';
import { polaroidImageFrameClass } from '@/lib/scrapbookGalleryStyles';

type PortfolioShootGridProps = {
  shoots: PortfolioShootCard[];
  categoryName: string;
};

function ShootCard({
  shoot,
  index,
}: {
  shoot: PortfolioShootCard;
  index: number;
}) {
  return (
    <div className="w-full min-w-0">
      <Link
        href={shoot.href}
        className={`group block w-full fl-print ${index % 2 === 0 ? 'fl-print-tilt-left' : 'fl-print-tilt-right'}`}
      >
        <div className="flex flex-col overflow-hidden">
          <div className={polaroidImageFrameClass(index)}>
            <Image
              src={shoot.image}
              alt={shoot.title}
              fill
              className="object-cover object-center fl-photo-earth transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 33vw, 33vw"
            />
          </div>
          <div className="mt-2 mb-2 shrink-0 px-2 text-center sm:mt-3 sm:mb-3">
            <h3 className="font-sans text-[0.8rem] leading-snug text-gray-900 sm:text-xl">
              {shoot.label}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function PortfolioShootGrid({
  shoots,
}: PortfolioShootGridProps) {
  if (shoots.length === 0) {
    return (
      <div className="rounded-sm border border-gray-200 bg-white py-24 text-center">
        <p className="text-lg text-gray-900">Sessions coming soon</p>
        <p className="mt-3 text-gray-600">
          New shoots are on the way—check back shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-x-2 gap-y-4 overflow-x-clip sm:gap-x-6 sm:gap-y-8 lg:gap-x-10">
      {shoots.map((shoot, i) => (
        <ShootCard key={shoot.slug} shoot={shoot} index={i} />
      ))}
    </div>
  );
}
