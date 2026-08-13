import type { ServiceFaq } from '@/lib/servicesData';

function FaqChevron() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-moss transition-transform duration-200 group-open:rotate-180"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ServiceFaqSectionProps = {
  faqs: ServiceFaq[];
  /** H2 text, e.g. "Straight answers about weddings" */
  heading?: string;
  id?: string;
  /** Accordion only — for procession splits */
  embedded?: boolean;
  /** Tighter type-led page */
  compact?: boolean;
};

function FaqList({ faqs }: { faqs: ServiceFaq[] }) {
  return (
    <div className="space-y-0 text-left">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group border-b border-ink/10 first:border-t"
        >
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 marker:content-none touch-manipulation [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 font-display text-lg leading-snug text-ink sm:text-xl">
              {faq.question}
            </span>
            <FaqChevron />
          </summary>
          <div className="pb-6 font-sans text-[0.92rem] font-light leading-[1.85] text-ink-soft">
            {faq.answer}
          </div>
        </details>
      ))}
    </div>
  );
}

export default function ServiceFaqSection({
  faqs,
  heading = 'Straight answers',
  id = 'faq',
  embedded = false,
  compact = false,
}: ServiceFaqSectionProps) {
  if (embedded) {
    return <FaqList faqs={faqs} />;
  }

  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-ink/8 bg-paper px-6 sm:px-10 lg:px-16 ${
        compact ? 'py-12 lg:py-16' : 'py-16 lg:py-24'
      }`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-3xl">
        <p className={`font-script text-moss ${compact ? 'text-2xl' : 'text-3xl'}`}>
          questions
        </p>
        <h2
          id={`${id}-heading`}
          className={`mt-2 font-display text-ink ${
            compact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'
          }`}
        >
          {heading}
        </h2>
        {compact ? null : (
          <p className="mt-4 font-sans text-base font-light leading-[1.8] text-ink-soft">
            A few things clients often ask—tap any row to read more.
          </p>
        )}
        <div className={compact ? 'mt-6' : 'mt-10'}>
          <FaqList faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
