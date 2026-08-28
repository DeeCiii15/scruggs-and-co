import type { Metadata } from 'next';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import HomeStylePageIntro from '../components/HomeStylePageIntro';
import BookingForm from '../components/BookingForm';
import { pageShareMeta } from '@/lib/shareMeta';
import {
  BRAND_IMAGE_ALT,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_NAME,
} from '@/lib/siteConfig';
import { SITE_IMAGES } from '@/lib/siteImages';

const CONTACT_TITLE = `Contact a ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} Photographer | ${SITE_NAME}`;
const CONTACT_DESCRIPTION = `Book wedding, portrait, engagement, family, maternity & senior photography in ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} & the Upstate. Share your date or vision—Liv reads every message.`;
const contactShare = pageShareMeta({
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  url: '/contact',
  image: SITE_IMAGES.photographer,
  imageAlt: BRAND_IMAGE_ALT,
});

export const metadata: Metadata = {
  title: {
    absolute: CONTACT_TITLE,
  },
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: '/contact' },
  ...contactShare,
};

/**
 * Contact — option A: About-style split (copy + form | tall portrait).
 */
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-paper">
      <Navigation />
      <HomeStylePageIntro />

      <main>
        <section className="scroll-mt-24 bg-paper">
          <div className="grid lg:grid-cols-2">
            <div className="order-2 flex flex-col justify-center bg-paper px-6 py-12 sm:px-12 sm:py-16 lg:order-1 lg:px-16 lg:py-20 xl:px-20 2xl:px-24">
              <div className="mx-auto w-full max-w-lg">
                <p className="font-script text-4xl text-moss md:text-5xl">
                  say hello
                </p>
                <h1 className="mt-2 font-display text-4xl leading-none text-ink sm:text-5xl md:text-6xl">
                  Ready to connect?
                </h1>
                <p className="mt-5 font-sans text-sm font-light leading-[1.8] text-ink-soft md:text-base">
                  Share your date, location, and the kind of day you are
                  dreaming up—wedding, engagement, family, maternity, portraits,
                  or seniors. Liv reads every message.
                </p>

                <h2 className="mt-10 font-display text-2xl text-ink">
                  Send a message
                </h2>
                <div className="mt-6">
                  <BookingForm className="mx-0 max-w-lg" />
                </div>

                <div className="mt-12 border-t border-ink/10 pt-8">
                  <p className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
                    Write directly
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=Inquiry%20from%20${encodeURIComponent(SITE_NAME)}`}
                    className="fl-link mt-3 block text-moss"
                  >
                    {CONTACT_EMAIL}
                  </a>
                  {CONTACT_PHONE_TEL ? (
                    <>
                      <p className="mt-6 font-sans text-[0.6rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
                        Call
                      </p>
                      <a
                        href={`tel:${CONTACT_PHONE_TEL}`}
                        className="fl-link mt-3 block text-moss"
                      >
                        {CONTACT_PHONE}
                      </a>
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="order-1 bg-paper lg:sticky lg:top-0 lg:order-2 lg:flex lg:h-svh lg:flex-col">
              <div className="fl-print fl-print-tilt-right m-5 ml-4 sm:m-8 sm:ml-6 lg:my-10 lg:mr-12 lg:ml-6 lg:min-h-0 lg:flex-1 xl:mr-16">
                <Image
                  src={SITE_IMAGES.photographer}
                  alt={BRAND_IMAGE_ALT}
                  width={1600}
                  height={2000}
                  className="h-[62svh] w-full object-cover object-[center_38%] fl-photo-earth lg:h-full"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={95}
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
