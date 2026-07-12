import { getStore } from "@netlify/blobs";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_ALG = "HS256";
const TOKEN_DAYS = 7;

export const getSecret = () =>
  process.env.JWT_SECRET || "atman-dev-secret-change-me";
export const getAdminUsername = () =>
  (process.env.ADMIN_USERNAME || "Ashutosh12").trim();
export const getAdminPassword = () =>
  process.env.ADMIN_PASSWORD || "Ashutosh@12";

export const store = () => getStore({ name: "atman", consistency: "strong" });

export const uuid = () =>
  globalThis.crypto?.randomUUID?.() ||
  `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "Content-Type, Authorization",
  "access-control-max-age": "86400",
};

export const preflight = () => new Response(null, { status: 204, headers: CORS_HEADERS });

export const json = (data, init = {}) =>
  new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      ...CORS_HEADERS,
      ...(init.headers || {}),
    },
  });

export const err = (message, status = 400) => json({ detail: message }, { status });

export async function ensureAdmin() {
  const s = store();
  const existing = await s.get("admin_user", { type: "json" });
  const desiredUsername = getAdminUsername();
  const desiredPassword = getAdminPassword();

  if (!existing || existing.username !== desiredUsername) {
    const hash = bcrypt.hashSync(desiredPassword, 10);
    const rec = {
      username: desiredUsername,
      password_hash: hash,
      created_at: new Date().toISOString(),
    };
    await s.setJSON("admin_user", rec);
    return rec;
  }
  if (!bcrypt.compareSync(desiredPassword, existing.password_hash)) {
    const hash = bcrypt.hashSync(desiredPassword, 10);
    const rec = { ...existing, password_hash: hash };
    await s.setJSON("admin_user", rec);
    return rec;
  }
  return existing;
}

export function createToken(username) {
  return jwt.sign({ sub: username, role: "admin" }, getSecret(), {
    algorithm: JWT_ALG,
    expiresIn: `${TOKEN_DAYS}d`,
  });
}

export function verifyBearer(req) {
  const auth =
    req.headers.get("authorization") ||
    req.headers.get("Authorization") ||
    "";
  if (!auth.startsWith("Bearer ")) {
    const e = new Error("Not authenticated");
    e.status = 401;
    throw e;
  }
  const token = auth.slice(7).trim();
  try {
    const payload = jwt.verify(token, getSecret(), { algorithms: [JWT_ALG] });
    if (payload.role !== "admin") {
      const e = new Error("Forbidden");
      e.status = 403;
      throw e;
    }
    return { username: payload.sub };
  } catch (e) {
    if (e.status) throw e;
    const ee = new Error("Invalid or expired token");
    ee.status = 401;
    throw ee;
  }
}

// ---- Data defaults + loaders ----
export const DEFAULT_SETTINGS = {
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

export const DEFAULT_VIDEOS = [
  { id: "seed-1", youtube_id: "5qap5aO4i9A", title: "Sufi Evening · Live Set", subtitle: "Palace Wedding · Udaipur", order: 1, created_at: new Date().toISOString() },
  { id: "seed-2", youtube_id: "jfKfPfyJRdk", title: "Bollywood Anthems Medley", subtitle: "Sangeet Night · Mumbai", order: 2, created_at: new Date().toISOString() },
  { id: "seed-3", youtube_id: "DWcJFNfaw9c", title: "Rock Finale · Encore", subtitle: "Corporate Gala · Bengaluru", order: 3, created_at: new Date().toISOString() },
];

export async function loadSettings() {
  const saved = (await store().get("settings", { type: "json" })) || {};
  return { ...DEFAULT_SETTINGS, ...saved };
}
export async function saveSettings(next) {
  const merged = { ...DEFAULT_SETTINGS, ...next };
  await store().setJSON("settings", merged);
  return merged;
}

export async function loadVideos() {
  let list = await store().get("videos", { type: "json" });
  if (!Array.isArray(list)) {
    list = DEFAULT_VIDEOS;
    await store().setJSON("videos", list);
  }
  return [...list].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
export async function saveVideos(list) {
  await store().setJSON("videos", list);
  return list;
}

export async function loadBookings() {
  const list = (await store().get("bookings", { type: "json" })) || [];
  return [...list].sort((a, b) =>
    (b.created_at || "").localeCompare(a.created_at || "")
  );
}
export async function appendBooking(b) {
  const list = (await store().get("bookings", { type: "json" })) || [];
  list.push(b);
  await store().setJSON("bookings", list);
}
