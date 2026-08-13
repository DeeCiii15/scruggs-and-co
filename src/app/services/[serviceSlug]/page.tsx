import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navigation from '../../components/Navigation';
import SiteFooter from '../../components/SiteFooter';
import HomeStylePageIntro from '../../components/HomeStylePageIntro';
import ServiceFaqJsonLd from '../../components/ServiceFaqJsonLd';
import ServiceProcession from '../../components/ServiceProcession';
import {
  getAllServiceSlugs,
  getServiceBySlug,
  getServicePortfolioHref,
  getServiceShootCards,
  serviceHref,
} from '@/lib/servicesData';

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

  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: serviceHref(service.slug) },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: serviceHref(service.slug),
    },
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
