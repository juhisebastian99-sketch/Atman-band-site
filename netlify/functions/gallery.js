import { verifyBearer, loadGallery, saveGallery, uuid, err, json, preflight } from "./_shared.js";

function originalPath(req) {
  const headerUrl = req.headers.get("x-nf-original-url") || req.headers.get("x-forwarded-url") || "";
  if (headerUrl) {
    try { return new URL(headerUrl).pathname; } catch (_) {}
  }
  try { return new URL(req.url).pathname; } catch (_) { return ""; }
}

// GET  /api/gallery              -> public list
// GET  /api/admin/gallery        -> admin list
// POST /api/admin/gallery        -> create
// PUT  /api/admin/gallery/:id    -> update
// DELETE /api/admin/gallery/:id  -> delete
export default async (req) => {
  if (req.method === "OPTIONS") return preflight();
  const path = originalPath(req);
  const isAdminPath = path.startsWith("/api/admin/gallery");

  if (req.method === "GET" && !isAdminPath) return json(await loadGallery());

  try { verifyBearer(req); } catch (e) { return err(e.message, e.status || 401); }

  const list = await loadGallery();
  if (req.method === "GET" && isAdminPath) return json(list);

  if (req.method === "POST" && path === "/api/admin/gallery") {
    let body;
    try { body = await req.json(); } catch { return err("Invalid JSON", 400); }
    if (!body?.url) return err("url is required", 400);
    const g = {
      id: uuid(),
      url: String(body.url).trim(),
      caption: String(body.caption || "").trim(),
      order: Number(body.order) || list.length + 1,
      created_at: new Date().toISOString(),
    };
    const next = [...list, g];
    await saveGallery(next);
    return json(g, { status: 201 });
  }

  const m = path.match(/^\/api\/admin\/gallery\/([^/]+)$/);
  if (m) {
    const id = m[1];
    const idx = list.findIndex((v) => v.id === id);
    if (idx === -1) return err("Gallery item not found", 404);

    if (req.method === "PUT") {
      let body;
      try { body = await req.json(); } catch { return err("Invalid JSON", 400); }
      const updated = {
        ...list[idx],
        url: String(body.url ?? list[idx].url).trim(),
        caption: String(body.caption ?? list[idx].caption ?? "").trim(),
        order: Number(body.order ?? list[idx].order) || list[idx].order,
      };
      const next = [...list];
      next[idx] = updated;
      await saveGallery(next);
      return json(updated);
    }

    if (req.method === "DELETE") {
      const next = list.filter((v) => v.id !== id);
      await saveGallery(next);
      return json({ ok: true });
    }
  }

  return err("Not found", 404);
};
