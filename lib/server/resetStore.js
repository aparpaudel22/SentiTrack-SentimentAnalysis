import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const RESETS_FILE = path.join(DATA_DIR, "resets.json");

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(RESETS_FILE)) fs.writeFileSync(RESETS_FILE, "[]");
}

function getResets() {
  ensureFile();
  return JSON.parse(fs.readFileSync(RESETS_FILE, "utf-8"));
}

function saveResets(resets) {
  ensureFile();
  fs.writeFileSync(RESETS_FILE, JSON.stringify(resets, null, 2));
}

export function createResetToken(email) {
  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 60 * 60 * 1000; // 1 hour
  const resets = getResets().filter((r) => r.email !== email); // remove old tokens for this email
  resets.push({ token, email: email.toLowerCase(), expires });
  saveResets(resets);
  return token;
}

export function getResetByToken(token) {
  const resets = getResets();
  return resets.find((r) => r.token === token && r.expires > Date.now()) || null;
}

export function clearResetToken(token) {
  const resets = getResets().filter((r) => r.token !== token);
  saveResets(resets);
}