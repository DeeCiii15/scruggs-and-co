import Image from 'next/image';
import Link from 'next/link';
import { SITE_IMAGES } from '@/lib/siteImages';
import { BRAND_IMAGE_ALT } from '@/lib/siteConfig';

/**
 * Ledger about — edge-to-edge editorial split, calm type on paper.
 */
export default function LedgerAbout() {
  return (
    <section id="about" className="scroll-mt-24 bg-paper">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[28rem] bg-paper-deep sm:min-h-[36rem] lg:min-h-[min(88vh,48rem)]">
          <Image
            src={SITE_IMAGES.photographer}
            alt={BRAND_IMAGE_ALT}
            fill
            className="object-cover object-[center_18%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 xl:px-20">
          <p className="font-script text-4xl text-moss md:text-5xl">hello,</p>
          <h2 className="mt-2 font-display text-4xl leading-none text-ink sm:text-5xl md:text-6xl">
            I&apos;m Liv
          </h2>
          <p className="mt-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
            Wedding & lifestyle photographer
          </p>

          <div className="mt-8 max-w-md space-y-4 font-sans text-[0.98rem] font-light leading-[1.85] text-ink-soft">
            <p>
              First off—hey. I am so happy you are here. There is nothing I love
              more than capturing life&apos;s golden, happy, wild moments while
              paying attention to the small details that make them uniquely
              yours.
            </p>
            <p>
              I am a lover of all things romantic, sweet, and laugh-inducing.
              Based in gorgeous South Carolina and glad to travel anywhere—I
              will gladly be your third wheel for the forever moments.
            </p>
          </div>

          <p className="mt-10 max-w-md font-display text-xl italic leading-snug text-ink/80 md:text-[1.35rem]">
            Photography started as a college student looking to connect—and
            became a love for art that evolves with every couple who trusts me
            with their day.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/contact" className="fl-btn">
              Let&apos;s connect
            </Link>
            <Link href="/services/weddings" className="fl-link text-moss">
              Wedding collections
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
