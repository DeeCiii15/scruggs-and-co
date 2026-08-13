'use client';

import { useForm, ValidationError } from '@formspree/react';
import { CONTACT_EMAIL } from '@/lib/siteConfig';

const FORMSPREE_FORM_ID =
  process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim() || 'your_form_id';

type BookingFormProps = {
  className?: string;
};

const fieldClass =
  'box-border w-full min-w-0 max-w-full border border-ink/15 bg-paper px-4 py-3.5 font-sans text-[0.95rem] font-light leading-normal text-ink placeholder:text-ink-soft/55 transition focus:border-moss/50 focus:outline-none focus:ring-1 focus:ring-moss/30 disabled:opacity-60';

const fieldWrapClass = 'min-w-0 w-full max-w-full';

const labelClass =
  'mb-2.5 block font-sans text-[0.6rem] font-medium uppercase tracking-[0.18em] text-ink-soft';

const fieldErrorClass = 'mt-2 font-sans text-sm font-light text-ink-soft';

const errorClass =
  'border border-ink/15 bg-paper-deep p-5 font-sans text-sm font-light leading-relaxed text-ink';

export default function BookingForm({ className }: BookingFormProps) {
  const [state, handleSubmit] = useForm(FORMSPREE_FORM_ID);

  if (state.succeeded) {
    return (
      <div className={`py-6 text-center ${className ?? ''}`}>
        <p className="font-script text-3xl text-moss md:text-4xl">thank you</p>
        <p className="mt-4 font-display text-2xl leading-snug text-ink sm:text-3xl">
          Your message is on its way—I can&rsquo;t wait to read it.
        </p>
        <p className="mx-auto mt-5 max-w-md font-sans text-sm font-light leading-[1.8] text-ink-soft md:text-base">
          I&rsquo;ll reply as soon as I can. If you need me sooner, email me
          directly at{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-moss underline decoration-moss/30 underline-offset-4 transition hover:text-ink hover:decoration-ink/40"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="fl-btn fl-btn-ghost mt-10"
        >
          Write another note
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative mx-auto min-w-0 w-full max-w-xl space-y-7 text-left sm:space-y-8 ${className ?? ''}`}
    >
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <ValidationError
        prefix=""
        errors={state.errors}
        className={errorClass}
      />

      <div className="grid min-w-0 grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8">
        <div className="min-w-0">
          <label htmlFor="name" className={labelClass}>
            Your name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            disabled={state.submitting}
            className={fieldClass}
            placeholder="What should I call you?"
          />
          <ValidationError
            prefix=""
            field="name"
            errors={state.errors}
            className={fieldErrorClass}
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            disabled={state.submitting}
            className={fieldClass}
            placeholder="So I can reply"
          />
          <ValidationError
            prefix=""
            field="email"
            errors={state.errors}
            className={fieldErrorClass}
          />
        </div>
      </div>

      <div className="grid min-w-0 w-full max-w-full grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8">
        <div className={fieldWrapClass}>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            disabled={state.submitting}
            className={fieldClass}
            placeholder="Optional"
          />
        </div>
        <div className={`booking-form-date-field ${fieldWrapClass}`}>
          <label htmlFor="event_date" className={labelClass}>
            Dream date or season
          </label>
          <input
            id="event_date"
            name="event_date"
            type="date"
            disabled={state.submitting}
            className={`${fieldClass} booking-form-date-input [color-scheme:light]`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className={labelClass}>
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          disabled={state.submitting}
          className={fieldClass}
          placeholder="City, venue, or general area"
        />
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>
          What are we celebrating?
        </label>
        <select
          id="service"
          name="service"
          required
          disabled={state.submitting}
          className={fieldClass}
          defaultValue=""
        >
          <option value="" disabled>
            Choose one&hellip;
          </option>
          <option value="Wedding">Wedding</option>
          <option value="Lifestyle session">Lifestyle session / portraits</option>
          <option value="Elopement">Elopement</option>
          <option value="Something else">Something else</option>
        </select>
        <ValidationError
          prefix=""
          field="service"
          errors={state.errors}
          className={fieldErrorClass}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          The heart of it
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          disabled={state.submitting}
          className={`${fieldClass} resize-none`}
          placeholder="Tell me all the details—vibe, vision, and anything that matters to you."
        />
        <ValidationError
          prefix=""
          field="message"
          errors={state.errors}
          className={fieldErrorClass}
        />
      </div>

      <div className="flex justify-start pt-2">
        <button
          type="submit"
          disabled={state.submitting}
          className="fl-btn disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.submitting ? 'Sending…' : 'Send message'}
          {!state.submitting && <span aria-hidden>→</span>}
        </button>
      </div>
    </form>
  );
}
