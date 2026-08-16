'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioShootCard } from '@/lib/portfolioData';
import {
  getServiceChapterImages,
  type ServiceDef,
} from '@/lib/servicesData';
import { SITE_NAME } from '@/lib/siteConfig';
import { smoothstep, useScrollOpen } from '../hooks/useScrollOpen';
import ServiceFaqSection from './ServiceFaqSection';

type ServiceProcessionProps = {
  service: ServiceDef;
  shoots: PortfolioShootCard[];
  portfolioHref: string;
};

/**
 * Desktop: left column from the left, right from the right.
 * Mobile: photo stacked above copy with a tight gap (no sticky theater).
 */
function TheaterSplit({
  photo,
  copy,
  photoOnLeft,
  id,
  labelledBy,
  lockViewport = true,
  lined = false,
  roomyTop = false,
}: {
  photo: ReactNode;
  copy: ReactNode;
  photoOnLeft: boolean;
  id?: string;
  labelledBy?: string;
  lockViewport?: boolean;
  lined?: boolean;
  roomyTop?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  const onOpen = useCallback(
    (open: number) => {
      const desktop =
        typeof window !== 'undefined' &&
        window.matchMedia('(min-width: 1024px)').matches;
      if (!desktop) return;

      const t = smoothstep(Math.min(open / 0.55, 1));
      const from = (1 - t) * 100;
      const photoEl = photoRef.current;
      const copyEl = copyRef.current;
      if (photoEl) {
        photoEl.style.transform = photoOnLeft
          ? `translate3d(-${from}%, 0, 0)`
          : `translate3d(${from}%, 0, 0)`;
      }
      if (copyEl) {
        copyEl.style.transform = photoOnLeft
          ? `translate3d(${from}%, 0, 0)`
          : `translate3d(-${from}%, 0, 0)`;
      }
    },
    [photoOnLeft],
  );

  useScrollOpen(sectionRef, onOpen, { trigger: 'visible' });

  const photoFrame = photoOnLeft
    ? `mx-4 lg:mx-6 lg:mb-10 lg:ml-12 xl:ml-16 ${roomyTop ? 'mt-10 lg:mt-20' : 'mt-4 lg:my-10'}`
    : `mx-4 lg:mx-6 lg:mb-10 lg:mr-12 xl:mr-16 ${roomyTop ? 'mt-10 lg:mt-20' : 'mt-4 lg:my-10'}`;

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative w-full scroll-mt-24 bg-paper ${
        lined ? 'fl-letters' : ''
      } ${lockViewport ? 'lg:h-[calc(100svh+32vh)]' : ''}`}
      aria-labelledby={labelledBy}
    >
      <div
        className={`grid bg-paper ${lined ? 'fl-letters' : ''} ${
          lockViewport
            ? 'lg:sticky lg:top-0 lg:h-svh lg:grid-cols-2 lg:overflow-hidden'
            : 'lg:grid-cols-2'
        }`}
      >
        <div
          ref={photoRef}
          className={`order-1 ${
            photoOnLeft ? 'lg:order-1 fl-theater-from-left' : 'lg:order-2 fl-theater-from-right'
          } lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:will-change-transform`}
        >
          <div
            className={`relative lg:flex-1 lg:min-h-0 ${photoFrame}`}
          >
            <div className="fl-print h-full">
              <div
                className="relative aspect-[4/5] overflow-hidden sm:max-h-[52svh] sm:aspect-[5/6] lg:aspect-auto lg:h-full lg:min-h-0 lg:max-h-none"
              >
                {photo}
              </div>
            </div>
          </div>
        </div>

        <div
          ref={copyRef}
          className={`order-2 px-6 pb-12 sm:px-10 sm:pb-16 lg:flex lg:flex-col lg:justify-center lg:px-16 xl:px-20 2xl:px-24 ${
            roomyTop
              ? 'pt-12 sm:pt-16 lg:pt-24 lg:pb-20'
              : 'pt-4 sm:pt-5 lg:py-14'
          } ${
            lockViewport
              ? 'lg:h-full lg:min-h-0 lg:overflow-y-auto lg:will-change-transform'
              : roomyTop
                ? ''
                : 'lg:py-16'
          } ${
            photoOnLeft ? 'lg:order-2 fl-theater-from-right' : 'lg:order-1 fl-theater-from-left'
          }`}
        >
          <div
            className={`mx-auto w-full max-w-xl xl:max-w-2xl ${
              photoOnLeft ? 'lg:mx-0' : 'lg:ml-auto lg:mr-0'
            }`}
          >
            {copy}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChapterStill({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-center fl-photo-earth"
      sizes="(max-width: 1024px) 100vw, 50vw"
      quality={90}
      priority={priority}
    />
  );
}

function GalleryChapter({
  service,
  shoots,
  portfolioHref,
  fallbackImage,
}: {
  service: ServiceDef;
  shoots: PortfolioShootCard[];
  portfolioHref: string;
  fallbackImage: string;
}) {
  const [activeSlug, setActiveSlug] = useState(shoots[0]?.slug ?? '');
  const active = shoots.find((s) => s.slug === activeSlug) ?? shoots[0];

  return (
    <TheaterSplit
      id="galleries"
      labelledBy="service-galleries-heading"
      photoOnLeft={false}
      lockViewport={false}
      photo={
        active ? (
          <Link href={active.href} className="absolute inset-0 block">
            {shoots.map((shoot) => (
              <Image
                key={shoot.slug}
                src={shoot.image}
                alt={shoot.title}
                fill
                className={`object-cover object-center fl-photo-earth transition-opacity duration-500 ${
                  shoot.slug === active.slug ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />
            ))}
          </Link>
        ) : (
          <ChapterStill
            src={fallbackImage}
            alt={`${service.name} galleries`}
          />
        )
      }
      copy={
        <>
          <p className="font-script text-4xl text-moss md:text-5xl">
            {service.galleryEyebrow}
          </p>
          <h2
            id="service-galleries-heading"
            className="mt-2 font-display text-4xl leading-none text-ink sm:text-5xl"
          >
            {service.galleryHeading}
          </h2>
          <p className="mt-6 font-sans text-[0.95rem] font-light leading-[1.85] text-ink-soft">
            Linger in recent work—then browse the full collection when you are
            ready.
          </p>

          {shoots.length > 0 ? (
            <ul className="mt-8 grid w-full grid-cols-2 gap-4 sm:gap-5">
              {shoots.map((shoot) => {
                const isActive = shoot.slug === active?.slug;
                return (
                  <li key={shoot.slug}>
                    <Link
                      href={shoot.href}
                      onMouseEnter={() => setActiveSlug(shoot.slug)}
                      onFocus={() => setActiveSlug(shoot.slug)}
                      className={`group block ${isActive ? '' : 'opacity-70 hover:opacity-100'}`}
                    >
                      <div
                        className={`fl-print ${
                          isActive ? 'fl-print-tilt-left' : 'fl-print-tilt-right'
                        }`}
                      >
                        <div className="relative aspect-[3/4] overflow-hidden bg-paper-deep">
                        <Image
                          src={shoot.image}
                          alt=""
                          fill
                          className="object-cover fl-photo-earth"
                          sizes="(max-width: 1024px) 42vw, 16vw"
                          quality={90}
                        />
                        </div>
                      </div>
                      <p className="mt-2.5 text-center font-sans text-[0.65rem] font-medium uppercase leading-tight tracking-[0.12em] text-ink">
                        {shoot.label}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}

          <Link href={portfolioHref} className="fl-link mt-10 text-moss">
            View all {service.navLabel.toLowerCase()} galleries
            <span aria-hidden>→</span>
          </Link>
        </>
      }
    />
  );
}

/**
 * Option E — Procession down the day; sides theater in like the homepage.
 */
export default function ServiceProcession({
  service,
  shoots,
  portfolioHref,
}: ServiceProcessionProps) {
  const images = getServiceChapterImages(service);

  return (
    <>
      <TheaterSplit
        labelledBy="service-intro-heading"
        photoOnLeft
        lined
        photo={
          <ChapterStill
            src={images.intro}
            alt={`${service.name} by ${SITE_NAME}`}
            priority
          />
        }
        copy={
          <>
            <p className="font-script text-4xl text-moss md:text-5xl">
              {service.eyebrow}
            </p>
            <h1
              id="service-intro-heading"
              className="mt-2 font-display text-4xl leading-none text-ink sm:text-5xl md:text-[3.15rem] md:leading-[1.05]"
            >
              {service.headline}{' '}
              <span className="italic text-moss">{service.headlineAccent}</span>
            </h1>
            <p className="mt-7 font-sans text-[0.95rem] font-light leading-[1.85] text-ink-soft">
              {service.intro}
            </p>
            <p className="mt-4 font-sans text-[0.95rem] font-light leading-[1.85] text-ink-soft">
              {service.body}
            </p>
            <Link href="/contact" className="fl-btn mt-9">
              {service.ctaButton}
              <span aria-hidden>→</span>
            </Link>
          </>
        }
      />

      <GalleryChapter
        service={service}
        shoots={shoots}
        portfolioHref={portfolioHref}
        fallbackImage={images.galleryPrimary}
      />

      <TheaterSplit
        id="collections"
        labelledBy="service-pricing-heading"
        photoOnLeft
        lined
        lockViewport={false}
        roomyTop
        photo={
          <ChapterStill
            src={images.pricing}
            alt={`${service.pricingHeading} — ${SITE_NAME}`}
          />
        }
        copy={
          <>
            <p className="font-script text-4xl text-moss md:text-5xl">
              {service.pricingEyebrow}
            </p>
            <h2
              id="service-pricing-heading"
              className="mt-2 font-display text-4xl leading-none text-ink sm:text-5xl"
            >
              {service.pricingHeading}
            </h2>
            {service.pricingIntro ? (
              <p className="mt-6 font-sans text-[0.95rem] font-light leading-[1.85] text-ink-soft">
                {service.pricingIntro}
              </p>
            ) : null}
            <ol className="mt-10 divide-y divide-ink/10">
              {service.collections.map((collection) => (
                <li key={collection.name} className="py-7 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl text-ink sm:text-[1.65rem]">
                      {collection.name}
                    </h3>
                    <p className="font-script text-2xl text-moss">
                      {collection.price}
                    </p>
                  </div>
                  <p className="mt-3 font-sans text-[0.92rem] font-light leading-[1.8] text-ink-soft">
                    {collection.detail}
                  </p>
                </li>
              ))}
            </ol>
            <Link href="/contact" className="fl-btn mt-10">
              {service.ctaButton}
              <span aria-hidden>→</span>
            </Link>
          </>
        }
      />

      <TheaterSplit
        id="faq"
        labelledBy="faq-heading"
        photoOnLeft={false}
        photo={
          <ChapterStill
            src={images.faq}
            alt={`${service.name} by ${SITE_NAME}`}
          />
        }
        copy={
          <>
            <p className="font-script text-4xl text-moss md:text-5xl">
              questions
            </p>
            <h2
              id="faq-heading"
              className="mt-2 font-display text-4xl leading-none text-ink sm:text-5xl"
            >
              Straight answers about {service.navLabel.toLowerCase()}
            </h2>
            <div className="mt-10">
              <ServiceFaqSection faqs={service.faqs} embedded />
            </div>
          </>
        }
      />

      <section className="fl-letters bg-paper px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-3xl text-ink sm:text-4xl">
            {service.ctaHeadline}
          </p>
          <Link href="/contact" className="fl-btn mt-8">
            {service.ctaButton}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
