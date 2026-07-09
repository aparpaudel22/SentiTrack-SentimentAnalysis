import fs from "fs";
import path from "path";
const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, "[]");
}
export function getUsers() {
  ensureFile();
  return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
}
export function saveUsers(users) {
  ensureFile();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}
export function getUserByEmail(email) {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}
export function createUser({ name, email, passwordHash }) {
  const users = getUsers();
  const user = { id: Date.now().toString(), name, email, passwordHash, provider: "credentials" };
  users.push(user);
  saveUsers(users);
  return user;
}
export function upsertOAuthUser({ name, email, provider }) {
  const users = getUsers();
  let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    user = { id: Date.now().toString(), name, email, passwordHash: null, provider };
    users.push(user);
    saveUsers(users);
  }
  return user;
}