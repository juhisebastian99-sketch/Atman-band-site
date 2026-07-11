# ATMAN — Netlify Hosting Guide (Free Forever)

Full-stack site on Netlify **at $0/month**, with your admin panel intact.

## What's included
- Public site (React) → Netlify CDN
- API (login, settings, videos, bookings) → **Netlify Functions** (125k requests/month free)
- Storage → **Netlify Blobs** (free, no external DB)
- Admin panel at `/admin` — login **Ashutosh12 / Ashutosh@12** (change anytime via env vars)

## Step-by-step deployment

### 1) Push to GitHub
- Click **Save to GitHub** in Emergent (top-right) → pick / create a repo.

### 2) Create Netlify site
1. Go to https://app.netlify.com → **Add new site → Import an existing project**
2. Connect GitHub → pick your ATMAN repo
3. Netlify auto-reads `netlify.toml`. Confirm:
   - Base directory: (leave blank / repo root)
   - Build command: `cd frontend && yarn install && yarn build`
   - Publish directory: `frontend/build`
4. Click **Show advanced → New variable** and add these 3 environment variables:
   ```
   ADMIN_USERNAME = Ashutosh12
   ADMIN_PASSWORD = Ashutosh@12
   JWT_SECRET     = any-long-random-string-at-least-32-characters
   ```
5. Click **Deploy site** — takes ~3-5 minutes
6. Copy the site URL (e.g. `https://atman-band-abcd.netlify.app`)

### 3) You're live
- **Public site:** `https://<your-site>.netlify.app`
- **Admin panel:** `https://<your-site>.netlify.app/admin`
  - Log in with `Ashutosh12` / `Ashutosh@12`
  - Update contact, socials, videos — changes reflect instantly on the public site (~2 second cache)
  - View incoming booking inquiries in the **Inquiries** tab
- **Discrete admin link:** small lock icon in the site footer

### 4) Custom domain (optional, still free)
Netlify → your site → **Domain management → Add custom domain** → enter `atmanmusic.com` (or any domain you own) → follow DNS instructions. Free HTTPS auto-provisioned.

## Changing your admin password later
Netlify → site → **Site settings → Environment variables** → change `ADMIN_PASSWORD` → redeploy (Deploys → Trigger deploy). The next login uses the new password.

## Free-tier limits (way more than a band needs)
| Piece | Free | Typical use |
|---|---|---|
| Netlify bandwidth | 100 GB / month | ~10,000 site visits |
| Netlify Functions | 125,000 requests / month | ~1,000 admin edits + 10,000 page loads |
| Netlify Blobs | Generous (unlimited on personal plan) | Booking inquiries, settings, videos |

No credit card required. No auto-billing. No surprises.
