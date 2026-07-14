import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const ACTIVITY_FILE = path.join(DATA_DIR, "activity.json");
const MAX_ENTRIES = 500;
const MAX_COMMENTS_STORED = 50;

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(ACTIVITY_FILE)) fs.writeFileSync(ACTIVITY_FILE, "[]");
}

export function logActivity({ email, commentsCount, success, error, summary, comments, results, usedFallback }) {
  ensureFile();
  const entries = JSON.parse(fs.readFileSync(ACTIVITY_FILE, "utf-8"));
  const entry = {
    id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
    email: email || "unknown",
    date: new Date().toISOString(),
    commentsCount: commentsCount || 0,
    success: !!success,
    error: error || null,
    summary: summary || null,
    usedFallback: !!usedFallback,
    comments: Array.isArray(comments) ? comments.slice(0, MAX_COMMENTS_STORED).map((c) => String(c).slice(0, 500)) : [],
    results: Array.isArray(results) ? results.slice(0, MAX_COMMENTS_STORED) : [],
  };
  entries.unshift(entry);
  fs.writeFileSync(ACTIVITY_FILE, JSON.stringify(entries.slice(0, MAX_ENTRIES), null, 2));
  return entry;
}

export function getAllActivity() {
  ensureFile();
  return JSON.parse(fs.readFileSync(ACTIVITY_FILE, "utf-8"));
}

export function getActivityByEmail(email) {
  return getAllActivity().filter((a) => a.email.toLowerCase() === (email || "").toLowerCase());
}