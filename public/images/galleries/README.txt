Gallery uploads — categories & photo shoots
==========================================

THREE LEVELS ON THE SITE
------------------------
  1. Category polaroid (portfolio page) — Weddings, Engagement, Family, etc.
  2. Shoot polaroids — one per session inside that category
  3. Photos — full gallery for one shoot


ADD A NEW PHOTO SHOOT (2 steps)
-------------------------------

STEP 1 — Create a folder and add images:

  public/images/galleries/{category-folder}/{shoot-slug}/
    cover.jpg or cover.jpeg     ← polaroid thumbnail (either works)
    (other photos with any names — sync renames them)

  Examples:
    engagement/lake-bowen-engagement/
    weddings/maddie-cole/

  Category folders:
    weddings/  engagement/  family/
    maternity/  portraits/  seniors/


STEP 2 — Register the shoot in code:

  File: src/lib/portfolioShoots.ts

  Add under the right category:

    {
      slug: 'lake-bowen-engagement',
      title: 'Lake Bowen Engagement',
      name: 'Maddie & Cole',
      venue: 'Lake Bowen',
      description: 'A few sentences for Google — location, vibe, season…',
    },

  slug must match your folder name.
  title appears under the shoot polaroid and in the browser tab.
  name is optional (couple/client names for polaroid captions).
  venue is optional (place name).
  description is optional but helps SEO (meta description + shoot page blurb).


SITE URLS (after deploy)
------------------------
  All galleries:     /portfolio
  Category:          /portfolio/engagement
  One shoot:         /portfolio/engagement/lake-bowen-engagement

  Old ?category= links still redirect automatically.


STEP 3 — Sync (renames photos & refreshes the site list):

    npm run galleries:sync

  This runs automatically before npm run dev and npm run build.
  You can also run it manually after uploading new files.


WHAT SYNC DOES
--------------
  • Renames gallery photos to 01.jpg, 02.jpg, 03.jpg, …
  • Normalizes cover to cover.jpg or cover.jpeg
  • Compresses large gallery images (max 2400px edge, ~85% JPEG quality)
  • Updates src/lib/galleryManifest.json (the site reads this)

  Hero / home page images in public/images/ are NOT touched — only galleries/.


TIPS
----
  • Drop photos in with camera names — sync handles renaming
  • Use lowercase folder slugs (lake-bowen-engagement, not Lake-Bowen)
  • JPG recommended; large files over ~10 MB may load slowly
  • After sync, hard-refresh the browser (Ctrl+Shift+R)
  • Empty categories (Engagement, Family, Maternity, Seniors) stay listed
    on /portfolio with a “Sessions coming soon” state until you add a shoot
