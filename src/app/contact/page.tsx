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
  image: SITE_IMAGES.contactPhoto,
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
          <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] lg:items-stretch lg:[grid-template-areas:'intro_.'_'fields_photo'_'footer_.']">
            <div className="order-2 bg-paper px-6 pt-12 sm:px-12 sm:pt-16 lg:order-none lg:px-16 lg:pr-5 lg:pt-20 lg:[grid-area:intro] xl:px-20 xl:pr-6 2xl:pl-24 2xl:pr-8">
              <div className="mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
                <p className="font-script text-4xl text-moss md:text-5xl">
                  say hello
                </p>
                <p className="mt-2 font-display text-4xl leading-none text-ink sm:text-5xl md:text-6xl">
                  Ready to connect?
                </p>
                <p className="mt-5 font-sans text-sm font-light leading-[1.8] text-ink-soft md:text-base">
                  Share your date, location, and the kind of day you are
                  dreaming up—wedding, engagement, family, maternity, portraits,
                  or seniors. Liv reads every message.
                </p>
              </div>
            </div>

            <BookingForm
              beforeFields={
                <h1 className="font-display text-2xl text-ink">
                  Send a message
                </h1>
              }
              fieldsClassName="order-3 mx-auto w-full max-w-lg bg-paper px-6 pb-0 pt-10 sm:px-12 lg:order-none lg:mx-0 lg:max-w-none lg:px-16 lg:pr-5 lg:pt-10 lg:[grid-area:fields] xl:px-20 xl:pr-6 2xl:pl-24 2xl:pr-8"
              actionsClassName="order-4 mx-auto w-full max-w-lg bg-paper px-6 pb-12 pt-8 sm:px-12 sm:pb-16 lg:order-none lg:mx-0 lg:max-w-none lg:px-16 lg:pr-5 lg:pb-20 xl:px-20 xl:pr-6 2xl:pl-24 2xl:pr-8 lg:[grid-area:footer]"
              photo={
                <div className="relative order-1 min-h-[62svh] bg-paper lg:order-none lg:min-h-0 lg:[grid-area:photo]">
                  <div className="fl-print fl-print-tilt-right absolute inset-5 sm:inset-8 lg:inset-y-0 lg:top-10 lg:right-8 lg:left-4 xl:right-10">
                    <div className="relative h-full min-h-[20rem] w-full">
                      <Image
                        src={SITE_IMAGES.contactPhoto}
                        alt={BRAND_IMAGE_ALT}
                        fill
                        className="object-cover object-[68%_62%] fl-photo-earth"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        quality={75}
                        priority
                      />
                    </div>
                  </div>
                </div>
              }
              afterActions={
                <div className="mx-auto mt-12 w-full max-w-lg border-t border-ink/10 pt-8 lg:mx-0 lg:max-w-none">
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
              }
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
