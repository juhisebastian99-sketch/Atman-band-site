import { useEffect, useState } from "react";

/**
 * ATMAN — Google Sheets as the CMS (no backend required).
 *
 * Setup:
 *   1. Create a Google Sheet with two tabs: "settings" and "videos"
 *   2. Share -> Publish to web
 *   3. Copy the Sheet ID (from the URL between /d/ and /edit)
 *   4. Set REACT_APP_SHEET_ID env var on Netlify to that Sheet ID
 *
 * Data is fetched via https://opensheet.elk.sh which turns a public Google
 * Sheet into a JSON API — free, no auth, refreshes on every page load.
 *
 * Sheet columns:
 *   settings tab: email | phone | location | instagram | youtube |
 *                 spotify | whatsapp | hero_tagline | hero_subline
 *                 (one data row)
 *   videos tab:   youtube_id | title | subtitle | order (multiple rows)
 */

const SHEET_ID = process.env.REACT_APP_SHEET_ID || "";

const DEFAULT_SETTINGS = {
  email: "hello@atmanmusic.co",
  phone: "+91 · placeholder",
  location: "Mumbai · India · Available worldwide",
  instagram: "",
  youtube: "",
  spotify: "",
  whatsapp: "",
  hero_tagline: "Music That Touches The Soul",
  hero_subline:
    "Luxury Live Music for Weddings, Destination Weddings, Corporate Events & Private Celebrations.",
};

const FALLBACK_VIDEOS = [
  { id: "seed-1", youtube_id: "5qap5aO4i9A", title: "Sufi Evening · Live Set", subtitle: "Palace Wedding · Udaipur", order: 1 },
  { id: "seed-2", youtube_id: "jfKfPfyJRdk", title: "Bollywood Anthems Medley", subtitle: "Sangeet Night · Mumbai", order: 2 },
  { id: "seed-3", youtube_id: "DWcJFNfaw9c", title: "Rock Finale · Encore", subtitle: "Corporate Gala · Bengaluru", order: 3 },
];

const sheetUrl = (tab) =>
  SHEET_ID ? `https://opensheet.elk.sh/${SHEET_ID}/${encodeURIComponent(tab)}` : null;

export const useSiteSettings = () => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  useEffect(() => {
    const url = sheetUrl("settings");
    if (!url) return;
    let alive = true;
    fetch(url, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((rows) => {
        if (!alive || !Array.isArray(rows) || rows.length === 0) return;
        // First row of the settings tab holds all values
        const row = rows[0] || {};
        const clean = Object.fromEntries(
          Object.entries(row).map(([k, v]) => [k, (v ?? "").toString().trim()])
        );
        setSettings({ ...DEFAULT_SETTINGS, ...clean });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return settings;
};

export const useVideos = () => {
  const [videos, setVideos] = useState(FALLBACK_VIDEOS);
  useEffect(() => {
    const url = sheetUrl("videos");
    if (!url) return;
    let alive = true;
    fetch(url, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((rows) => {
        if (!alive || !Array.isArray(rows)) return;
        const list = rows
          .map((r, i) => ({
            id: `sheet-${i}`,
            youtube_id: (r.youtube_id || "").toString().trim(),
            title: (r.title || "").toString().trim(),
            subtitle: (r.subtitle || "").toString().trim(),
            order: Number(r.order) || i + 1,
          }))
          .filter((v) => v.youtube_id && v.title)
          .sort((a, b) => a.order - b.order);
        if (list.length > 0) setVideos(list);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return videos;
};
