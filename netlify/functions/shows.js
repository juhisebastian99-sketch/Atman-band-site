import { verifyBearer, loadShows, saveShows, uuid, err, json, preflight } from "./_shared.js";

function originalPath(req) {
  const headerUrl =
    req.headers.get("x-nf-original-url") ||
    req.headers.get("x-forwarded-url") ||
    "";
  if (headerUrl) {
    try {
      return new URL(headerUrl).pathname;
    } catch (_) {
      /* ignore */
    }
  }
  try {
    return new URL(req.url).pathname;
  } catch (_) {
    return "";
  }
}

// Handles:
//   GET    /api/shows                 -> public list
//   GET    /api/admin/shows           -> admin list
//   POST   /api/admin/shows           -> create (admin)
//   PUT    /api/admin/shows/:id       -> update (admin)
//   DELETE /api/admin/shows/:id       -> delete (admin)
export default async (req) => {
  if (req.method === "OPTIONS") return preflight();
  const path = originalPath(req);
  const isAdminPath = path.startsWith("/api/admin/shows");

  if (req.method === "GET" && !isAdminPath) {
    return json(await loadShows());
  }

  try {
    verifyBearer(req);
  } catch (e) {
    return err(e.message, e.status || 401);
  }

  const list = await loadShows();

  if (req.method === "GET" && isAdminPath) {
    return json(list);
  }

  if (req.method === "POST" && path === "/api/admin/shows") {
    let body;
    try {
      body = await req.json();
    } catch {
      return err("Invalid JSON", 400);
    }
    if (!body?.day || !body?.month || !body?.title)
      return err("day, month and title are required", 400);
    const s = {
      id: uuid(),
      day: String(body.day).trim(),
      month: String(body.month).trim(),
      title: String(body.title).trim(),
      city: String(body.city || "").trim(),
      ticket_url: String(body.ticket_url || "").trim(),
      order: Number(body.order) || list.length + 1,
      created_at: new Date().toISOString(),
    };
    const next = [...list, s];
    await saveShows(next);
    return json(s, { status: 201 });
  }

  const m = path.match(/^\/api\/admin\/shows\/([^/]+)$/);
  if (m) {
    const id = m[1];
    const idx = list.findIndex((v) => v.id === id);
    if (idx === -1) return err("Show not found", 404);

    if (req.method === "PUT") {
      let body;
      try {
        body = await req.json();
      } catch {
        return err("Invalid JSON", 400);
      }
      const updated = {
        ...list[idx],
        day: String(body.day ?? list[idx].day).trim(),
        month: String(body.month ?? list[idx].month).trim(),
        title: String(body.title ?? list[idx].title).trim(),
        city: String(body.city ?? list[idx].city ?? "").trim(),
        ticket_url: String(body.ticket_url ?? list[idx].ticket_url ?? "").trim(),
        order: Number(body.order ?? list[idx].order) || list[idx].order,
      };
      const next = [...list];
      next[idx] = updated;
      await saveShows(next);
      return json(updated);
    }

    if (req.method === "DELETE") {
      const next = list.filter((v) => v.id !== id);
      await saveShows(next);
      return json({ ok: true });
    }
  }

  return err("Not found", 404);
};
