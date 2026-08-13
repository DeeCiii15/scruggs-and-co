# Scruggs & Co Photo

Next.js marketing site for Scruggs & Co Photo (Liv) — documentary wedding & lifestyle photography based in Chesnee, SC.

Built from the photography website template (hub-and-spoke IA + shared components). Visual direction is documented in [`THEME.md`](./THEME.md) (**Cypress Documentary**), inspired by the live client site and editorial photography portfolios—not a clone of the existing Pixieset layout.

## Develop

```bash
npm install
npm run images:download   # pull client photos from Pixieset CDN
npm run galleries:sync
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customize

| Area | Files |
|------|--------|
| Brand / locale / SEO | `src/lib/siteConfig.ts`, `.env.local` |
| Services | `src/lib/servicesData.ts` |
| Portfolio | `src/lib/portfolioShoots.ts`, `public/images/galleries/` |
| Testimonials | `src/lib/testimonialsData.ts` |
| Theme tokens | `src/app/globals.css`, `src/app/layout.tsx` |
| Formspree | `NEXT_PUBLIC_FORMSPREE_FORM_ID` in `.env.local` |

## Build

```bash
npm run build
```
