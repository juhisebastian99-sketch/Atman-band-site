import { verifyBearer, loadVideos, saveVideos, uuid, err, json } from "./_shared.js";

// Handles:
//   GET    /api/videos                -> public list
//   POST   /api/admin/videos          -> create (admin)
//   PUT    /api/admin/videos/:id      -> update (admin)
//   DELETE /api/admin/videos/:id      -> delete (admin)
export default async (req) => {
  const url = new URL(req.url);
  const path = url.pathname;
  const isAdminPath = path.startsWith("/api/admin/videos");

  if (req.method === "GET" && !isAdminPath) {
    const list = await loadVideos();
    return json(list);
  }

  // Everything below is admin
  try {
    verifyBearer(req);
  } catch (e) {
    return err(e.message, e.status || 401);
  }

  const list = await loadVideos();

  if (req.method === "POST" && path === "/api/admin/videos") {
    let body;
    try {
      body = await req.json();
    } catch {
      return err("Invalid JSON", 400);
    }
    if (!body?.youtube_id || !body?.title) return err("youtube_id and title required", 400);
    const v = {
      id: uuid(),
      youtube_id: String(body.youtube_id).trim(),
      title: String(body.title).trim(),
      subtitle: String(body.subtitle || "").trim(),
      order: Number(body.order) || (list.length + 1),
      created_at: new Date().toISOString(),
    };
    const next = [...list, v];
    await saveVideos(next);
    return json(v, { status: 201 });
  }

  // Match /api/admin/videos/:id
  const m = path.match(/^\/api\/admin\/videos\/([^\/]+)$/);
  if (m) {
    const id = m[1];
    const idx = list.findIndex((v) => v.id === id);
    if (idx === -1) return err("Video not found", 404);

    if (req.method === "PUT") {
      let body;
      try {
        body = await req.json();
      } catch {
        return err("Invalid JSON", 400);
      }
      const updated = {
        ...list[idx],
        youtube_id: String(body.youtube_id ?? list[idx].youtube_id).trim(),
        title: String(body.title ?? list[idx].title).trim(),
        subtitle: String(body.subtitle ?? list[idx].subtitle ?? "").trim(),
        order: Number(body.order ?? list[idx].order) || list[idx].order,
      };
      const next = [...list];
      next[idx] = updated;
      await saveVideos(next);
      return json(updated);
    }

    if (req.method === "DELETE") {
      const next = list.filter((v) => v.id !== id);
      await saveVideos(next);
      return json({ ok: true });
    }
  }

  return err("Not found", 404);
};

export const config = {
  path: ["/api/videos", "/api/admin/videos", "/api/admin/videos/*"],
};
