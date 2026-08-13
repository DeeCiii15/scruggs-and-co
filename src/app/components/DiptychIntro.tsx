import Image from 'next/image';
import Link from 'next/link';
import { SITE_IMAGES } from '@/lib/siteImages';

/**
 * Diptych intro — image | manifesto (echoes the curtain seam).
 */
export default function DiptychIntro() {
  return (
    <section
      className="bg-paper"
      aria-label="Introduction"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[22rem] bg-paper-deep sm:min-h-[28rem] lg:min-h-[min(78vh,42rem)]">
          <Image
            src={SITE_IMAGES.moodArch}
            alt="Couple under a floral ceremony arch"
            fill
            className="object-cover object-[center_40%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-14 sm:px-12 sm:py-20 lg:px-16 xl:px-20">
          <p className="font-script text-4xl text-moss md:text-5xl">since 2019</p>
          <h2 className="mt-4 max-w-md font-display text-3xl leading-[1.15] text-ink sm:text-4xl md:text-[2.65rem]">
            Intimate, sweet, and a little wild.
          </h2>
          <p className="mt-6 max-w-md font-sans text-[0.98rem] font-light leading-[1.85] text-ink-soft">
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
