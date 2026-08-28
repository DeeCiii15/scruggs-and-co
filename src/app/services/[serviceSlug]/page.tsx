import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navigation from '../../components/Navigation';
import SiteFooter from '../../components/SiteFooter';
import HomeStylePageIntro from '../../components/HomeStylePageIntro';
import ServiceFaqJsonLd from '../../components/ServiceFaqJsonLd';
import ServiceJsonLd from '../../components/ServiceJsonLd';
import ServiceProcession from '../../components/ServiceProcession';
import {
  getAllServiceSlugs,
  getServiceBySlug,
  getServiceHeroImage,
  getServicePortfolioHref,
  getServiceShootCards,
  serviceHref,
} from '@/lib/servicesData';
import { pageShareMeta } from '@/lib/shareMeta';
import { SITE_NAME } from '@/lib/siteConfig';

type ServicePageProps = {
  params: Promise<{ serviceSlug: string }>;
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map((serviceSlug) => ({ serviceSlug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) return {};

  const path = serviceHref(service.slug);
  const share = pageShareMeta({
    title: service.metaTitle,
    description: service.metaDescription,
    url: path,
    image: getServiceHeroImage(service),
    imageAlt: `${service.name} by ${SITE_NAME}`,
  });

  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: path },
    ...share,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const shoots = getServiceShootCards(service);
  const portfolioHref = getServicePortfolioHref(service);

  return (
    <div className="min-h-screen bg-paper">
      <ServiceJsonLd service={service} />
      <ServiceFaqJsonLd faqs={service.faqs} />
      <Navigation />
      <HomeStylePageIntro />

      <main>
        <ServiceProcession
          service={service}
          shoots={shoots}
          portfolioHref={portfolioHref}
        />
      </main>

      <SiteFooter />
    </div>
  );
}
