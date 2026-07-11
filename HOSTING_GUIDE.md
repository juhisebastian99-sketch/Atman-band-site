# ATMAN — Netlify Hosting Guide (Free · No Backend)

Everything is now static + Netlify Forms + Google Sheets. Nothing to pay for.

## What lives where

| Piece | Where | Who edits |
|---|---|---|
| Website design & pages | Netlify (static) | Developer |
| Contact info & videos | **Google Sheet** | **You** |
| Booking inquiries | **Netlify Forms** | Read by you in Netlify dashboard + email |

---

## 1) Create your Google Sheet (the "admin panel")

1. Open a new Google Sheet: https://sheets.new
2. Rename it → e.g. `ATMAN Site Content`
3. Rename the first tab (bottom-left) to **`settings`** (exactly, lowercase)
4. In the `settings` tab paste these column headers in row 1:

   | email | phone | location | instagram | youtube | spotify | whatsapp | hero_tagline | hero_subline |

5. Fill **row 2** with your actual values. Example:

   | hello@atmanmusic.co | +91 98765 43210 | Mumbai · Available worldwide | https://instagram.com/atman | https://youtube.com/@atman |  | https://wa.me/919876543210 | Music That Touches The Soul | Luxury Live Music for Weddings, Destination Weddings, Corporate Events & Private Celebrations. |

6. Create a **second tab** named **`videos`** with these headers in row 1:

   | youtube_id | title | subtitle | order |

7. Add one row per performance video. Example:

   | 5qap5aO4i9A | Sufi Evening · Live Set | Palace Wedding · Udaipur | 1 |
   | jfKfPfyJRdk | Bollywood Anthems Medley | Sangeet Night · Mumbai | 2 |

   *(The `youtube_id` is the code after `v=` in a YouTube URL. Order controls display order — lower first.)*

8. **File → Share → Publish to web** → click **Publish**
9. Also **Share → Anyone with the link → Viewer**
10. Copy the **Sheet ID** from the URL. The URL looks like:
    `https://docs.google.com/spreadsheets/d/`**`1AbC...XyZ`**`/edit#gid=0`
    The bold part is the **Sheet ID**.

Whenever you edit the sheet and save, the website updates within a few seconds on next visit. No redeploy needed.

---

## 2) Push code to GitHub

You'll need a GitHub repo. From Emergent: click **Save to GitHub** (top-right) and pick / create a repo.

---

## 3) Deploy on Netlify

1. Go to https://app.netlify.com → **Add new site → Import an existing project**
2. Connect GitHub → pick your ATMAN repo
3. Netlify auto-detects `netlify.toml`. Confirm:
   - **Base directory:** `frontend`
   - **Build command:** `yarn install && yarn build`
   - **Publish directory:** `build`
4. Click **Show advanced → New variable** and add:
   ```
   REACT_APP_SHEET_ID = <paste your Google Sheet ID from step 1>
   ```
5. Click **Deploy site** — takes ~3-5 minutes
6. Once live, copy your Netlify URL (e.g. `https://atman-band-a1b2.netlify.app`)

Netlify auto-provisions free HTTPS.

---

## 4) Booking inquiries (Netlify Forms — automatic)

Nothing to configure — the form is already wired.

- When a customer submits, Netlify captures it.
- **View submissions:** Netlify dashboard → your site → **Forms** tab → **booking**
- **Email notifications:** Netlify dashboard → **Forms → Settings & usage → Form notifications → Add notification → Email notification**
  - Enter your email — you'll now get an alert every time someone books.

Free tier: **100 submissions/month** (plenty for a band's inquiries).

---

## 5) Custom domain (optional, still free)

Netlify → your site → **Domain settings → Add custom domain** → enter e.g. `atmanmusic.com` → follow the DNS instructions.

Netlify automatically provisions a free HTTPS certificate for your custom domain.

---

## Daily use

- **Change contact info / phone / socials** → edit the Google Sheet → refresh site
- **Add / edit / delete videos** → edit rows in the `videos` tab → refresh site
- **See new booking inquiries** → Netlify dashboard → Forms tab (and via email if you enabled notifications)

That's it. No servers to manage, no database to worry about, no monthly bill.
