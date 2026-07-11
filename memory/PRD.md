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
