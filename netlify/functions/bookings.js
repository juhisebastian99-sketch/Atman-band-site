import { appendBooking, uuid, err, json } from "./_shared.js";

export default async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204 });
  if (req.method !== "POST") return err("Method not allowed", 405);

  let body;
  try {
    body = await req.json();
  } catch {
    return err("Invalid JSON", 400);
  }
  const name = (body?.name || "").trim();
  const email = (body?.email || "").trim();
  const phone = (body?.phone || "").trim();
  const event_type = (body?.event_type || "").trim();
  if (!name || !email || !phone || !event_type) {
    return err("name, email, phone and event_type are required", 400);
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) return err("Invalid email address", 400);

  const inquiry = {
    id: uuid(),
    name,
    email,
    phone,
    event_type,
    event_date: (body?.event_date || "").toString(),
    guest_count: (body?.guest_count || "").toString(),
    location: (body?.location || "").toString(),
    message: (body?.message || "").toString(),
    created_at: new Date().toISOString(),
  };
  await appendBooking(inquiry);
  return json(inquiry, { status: 201 });
};

export const config = { path: "/api/bookings" };
