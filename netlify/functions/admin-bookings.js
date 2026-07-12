import { verifyBearer, loadBookings, err, json } from "./_shared.js";

export default async (req) => {
  if (req.method !== "GET") return err("Method not allowed", 405);
  try {
    verifyBearer(req);
  } catch (e) {
    return err(e.message, e.status || 401);
  }
  const items = await loadBookings();
  return json(items);
};
