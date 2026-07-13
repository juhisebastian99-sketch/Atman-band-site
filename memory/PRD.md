# ATMAN — Luxury Live Music Band Website

## Original Problem Statement
Build a premium, fully responsive website for a luxury live music band called "ATMAN". High-end luxury wedding entertainment brand feel — cinematic, elegant, modern. Premium black & gold theme. Cinzel (headings) + Poppins (body). Mobile-first. Not a generic music template.

## Architecture
- Frontend: React 19 + Tailwind + shadcn/ui + framer-motion + sonner
- Backend: FastAPI + Motor (MongoDB async)
- DB: MongoDB collection `booking_inquiries`

## Design tokens
- Matte Black `#121212`, Warm Charcoal `#1E1E1E`, Antique Gold `#C9A227`, Soft Ivory `#F8F6F2`
- Fonts: Cinzel, Poppins, Cormorant Garamond (accent italics)

## User Personas
1. **Bride/Groom or Wedding Planner** — Researching premium live bands for weddings & destination weddings. Wants proof of luxury & booking access.
2. **Corporate Event Manager** — Sourcing entertainment for gala/launch. Wants credibility & fast contact.
3. **Private Host** — Booking intimate anniversary/spiritual evening.

## Core Requirements (static)
- Cinematic hero with concert stage + gold lights (no faces)
- Elegant "A" logo with musical + spiritual accent
- Genres: Bollywood, Sufi, Rock
- Sections: Home, About, Services (4 cards), Genres, Performances (YouTube), Gallery, Testimonials, Booking form, Footer
- Booking inquiry stored in MongoDB

## What's Been Implemented (2026-07-11)
- Backend: `POST /api/bookings`, `GET /api/bookings`, `GET /api/` — all validated & tested (email, required fields, sorted list)
- Custom SVG ATMAN logo (letter A + treble + soundwave + spiritual arc)
- Sticky glassmorphism navbar (desktop + mobile menu)
- Full-screen Hero with slow scale-up, CSS light beams, grain, animated scroll indicator, genre pills, dual CTAs
- About section with editorial layout, gold-framed image, floating badge, 3 stats
- Services grid (4 cards) with hover corner accents
- Genres section — 3 large numbered cards with hover accents
- Performances — 3 YouTube iframe cards with gold-glow hover
- Bento Gallery — 7 curated images (instruments/stage/lights, no faces)
- Testimonials carousel — prev/next + dot indicators
- Booking form — name, email, phone, event type (shadcn Select), event date (shadcn Popover + Calendar), guests, location, message; sonner toasts
- Footer — logo, socials, sitemap, contact placeholders
- Fully responsive (mobile menu tested at 390px viewport)

## Test Status (iteration_1.json)
- Backend 5/5 PASS
- Frontend end-to-end PASS (form submission verified against DB)
- Minor (non-blocking): toast portal not captured by automation; calendar day cells missing data-testid

## Prioritized Backlog

### P0 (blocking future launch)
- Real photography swap (once client provides face-free assets)
- Real YouTube video IDs for performances
- Real contact info (email/phone/Instagram/YouTube handles)

### P1 (soon)
- Admin dashboard for booking inquiries (list, mark contacted, export CSV)
- Email notification on new inquiry (Resend / SendGrid)
- Testimonials from real clients + photos
- "Featured venues" / logos strip
- SEO metadata + Open Graph image
- Lighthouse pass (image lazy-loading is in place; consider preloading hero LCP)

### P2 (nice-to-have)
- Multi-page routing (/about, /services, /gallery, /contact)
- Audio previews of live sets
- Blog / press page
- Downloadable EPK (Electronic Press Kit) PDF
- WhatsApp / calendar-embed booking widget
- Language toggle (EN / HI)

## Next Tasks
1. Swap YouTube placeholder IDs & imagery once client provides
2. Wire real contact details
3. Build lightweight admin page for inquiries (auth optional)
4. Add email notification integration

## Update Log
- 2026-07-13: Hero background swapped to dramatic musician-silhouette + vertical gold beams shot (Unsplash `1470229722913...`) to match client-provided luxury mockup reference. Logo (`AtmanLogo.jsx`) now uses `mixBlendMode: screen` on the WA0003 JPG asset so the brand Enso circle renders cleanly on any dark surface (navbar, hero, footer). Both changes verified visually against mockup at 1920×900.
- 2026-07-13 (v3): Front-page rebuilt to exactly match the client's design mockup (`WA0009.jpg` full layout). Navbar simplified to HOME | ABOUT | MUSIC | SHOWS | GALLERY | CONTACT with 4 social icons on right (Instagram, YouTube, Spotify, Facebook) replacing the BOOK ATMAN button. Hero cleaned up: removed the "DARK · BOLD · TIMELESS —" descriptor line, replaced the two CTAs with a single "LISTEN NOW" gold-outlined button, tagline reformatted to "MUSIC. SOUL. CONNECTION." with SOUL highlighted in gold, gold brush strokes changed to diagonal parallel lines (bottom-left + top-right corners) matching the reference. Hero background changed to a full concert-with-stage-lights shot (Unsplash `photo-1524368535928...`).
- 2026-07-13 (v4): **Full bento-grid homepage rebuild + Shows admin CRUD.**
  - New `LandingBento.jsx` — entire homepage is a bento-grid dashboard matching the client's full-page mockup: Hero (big Enso logo, MUSIC · SOUL · CONNECTION, LISTEN NOW), We Are ATMAN card (top-right with band portrait + KNOW MORE), Music card (4 latest video cards with YouTube thumbnails + waveform + play indicator, opens YouTube on click), Upcoming Shows card (dated list with Book Tickets buttons, opens ticket URL or scrolls to booking), Gallery grid (6 photos, grayscale, hover reveal), Booking form, Footer with Quick Links + Follow Us socials + Subscribe form + Dark Bold Timeless tagline.
  - Global SVG `#atman-remove-black` filter moved to `App.js` root — logo renders as a proper transparent cutout site-wide (nav, hero, footer).
  - **Shows CRUD** wired end-to-end: FastAPI (`/api/shows`, `/api/admin/shows/*`) + Netlify function `shows.js` + Blobs storage + `netlify.toml` routing + `useShows()` hook + admin Shows tab (add/edit/delete rows). Default seed: Live at Blue Frog (Jun 24), Rock Night Fest (Jul 05), Sounds of Soul (Jul 19). Fields: day, month, title, city, ticket_url, order.
  - Contact details & YouTube video CRUD already existed and are now surfaced in the bento — Music card uses live videos from `/api/videos`, footer socials use live settings from `/api/settings`.
  - Full curl E2E tested: login → create show → update show → list (sorted) → delete → verify.
- 2026-07-13 (v5): **Logo made bulletproof + Admin button + explanation of Netlify serverless "no backend".**
  - `AtmanLogo.jsx` rewritten with canvas-based processing: on page load, the JPG is drawn to an offscreen canvas, every near-black pixel gets alpha=0 with feathered anti-aliasing on the edges, and the result is exposed as a data-URL PNG. This is a REAL transparent PNG — works identically across browsers, cached or not, with or without CSS filter support. Result cached at module scope so it processes only once per page load.
  - New `AtmanLogoLarge` export used in Hero + Bento centerpiece + Footer for the big Enso mark.
  - **Admin button** added in footer bottom-right (subtle gold hover) — visitors can now reach `/admin` without knowing the URL.
  - Confirmed via screenshot: logo visible in nav + hero + footer with zero visible black rectangle.
- 2026-07-13 (v6): **All social/contact links now fully admin-editable end-to-end.**
  - Added `facebook` field to SiteSettings model (FastAPI + Netlify + admin form). Admin panel Contact tab now has 4 social fields (Instagram, YouTube, Spotify, Facebook) plus WhatsApp, Email, Phone, Location.
  - Navbar rewritten to read from `useSiteSettings()` — all 4 top-right social icons and mobile menu socials now open the admin-configured URLs.
  - FooterBento already reads settings.facebook/instagram/youtube/spotify.
  - Contact info (email, phone, location) already reads from settings via Booking component.
  - Shows/Videos already fully admin-editable via `/api/shows` and `/api/videos` CRUD.
  - E2E verified: PUT /admin/settings with new socials → GET /api/settings returns them → Navbar renders links with new URLs (screenshot confirmed).

  **Admin can now edit** (all persist to Netlify Blobs / MongoDB, immediately reflected on the site):
  - Email, Phone, WhatsApp, Location (Contact tab)
  - Instagram, YouTube, Spotify, Facebook URLs (Contact tab)
  - Hero tagline & subline (Contact tab)
  - Upcoming Shows: day, month, title, city, ticket URL, order (Shows tab)
  - Performance Videos: YouTube ID, title, subtitle, order (Videos tab)
  - View incoming booking inquiries (Inquiries tab)
