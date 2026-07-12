import { verifyBearer, err, json } from "./_shared.js";

export default async (req) => {
  if (req.method !== "GET") return err("Method not allowed", 405);
  try {
    const u = verifyBearer(req);
    return json({ username: u.username, role: "admin" });
  } catch (e) {
    return err(e.message, e.status || 401);
  }
};
