import { ensureAdmin, createToken, err, json, preflight } from "./_shared.js";
import bcrypt from "bcryptjs";

export default async (req) => {
  if (req.method === "OPTIONS") return preflight();
  if (req.method !== "POST") return err("Method not allowed", 405);

  let body;
  try {
    body = await req.json();
  } catch {
    return err("Invalid JSON body", 400);
  }
  const username = (body?.username || "").trim();
  const password = body?.password || "";
  if (!username || !password) return err("Username and password required", 400);

  const admin = await ensureAdmin();
  if (username !== admin.username || !bcrypt.compareSync(password, admin.password_hash)) {
    return err("Invalid username or password", 401);
  }
  const token = createToken(admin.username);
  return json({ token, username: admin.username, role: "admin" });
};
