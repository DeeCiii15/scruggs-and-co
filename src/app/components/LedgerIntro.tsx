import Image from 'next/image';
import Link from 'next/link';
import { SITE_IMAGES } from '@/lib/siteImages';

/**
 * Ledger intro — quiet paper, one strong image + manifesto (no scrub).
 */
export default function LedgerIntro() {
  return (
    <section
      className="bg-paper px-5 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-32"
      aria-label="Introduction"
    >
      <div className="mx-auto grid max-w-6xl items-end gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep lg:col-span-6 lg:aspect-[3/4]">
          <Image
            src={SITE_IMAGES.moodArch}
            alt="Couple under a floral ceremony arch"
            fill
            className="object-cover object-[center_40%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="lg:col-span-6 lg:pb-4">
          <p className="font-script text-4xl text-moss md:text-5xl">since 2019</p>
          <h2 className="mt-4 max-w-md font-display text-3xl leading-[1.15] text-ink sm:text-4xl md:text-[2.85rem]">
            Intimate, sweet, and a little wild.
          </h2>
          <p className="mt-6 max-w-md font-sans text-[1rem] font-light leading-[1.85] text-ink-soft">
            Documentary wedding and lifestyle photography for the cuddly,
            effortless, and perfectly imperfect. Liv stays present for the
            golden moments—and the quiet ones in between.
          </p>
          <Link href="/#about" className="fl-link mt-10 inline-flex text-moss">
            Meet Liv
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
