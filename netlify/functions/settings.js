import { verifyBearer, loadSettings, saveSettings, err, json } from "./_shared.js";

export default async (req) => {
  if (req.method === "GET") {
    const s = await loadSettings();
    return json(s);
  }
  if (req.method === "PUT") {
    try {
      verifyBearer(req);
    } catch (e) {
      return err(e.message, e.status || 401);
    }
    let body;
    try {
      body = await req.json();
    } catch {
      return err("Invalid JSON", 400);
    }
    const saved = await saveSettings(body || {});
    return json(saved);
  }
  return err("Method not allowed", 405);
};
