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

export function getUserById(id) {
  return getUsers().find((u) => u.id === id);
}

export function createUser({ name, email, passwordHash }) {
  const users = getUsers();
  const user = {
    id: Date.now().toString(),
    name,
    email,
    passwordHash,
    provider: "credentials",
    remarks: "",
    avatarUrl: "",
    phone: "",
    address: "",
    bio: "",
    company: "",
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);
  return user;
}

export function upsertOAuthUser({ name, email, provider }) {
  const users = getUsers();
  let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    user = {
      id: Date.now().toString(),
      name,
      email,
      passwordHash: null,
      provider,
      remarks: "",
      avatarUrl: "",
      phone: "",
      address: "",
      bio: "",
      company: "",
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveUsers(users);
  }
  return user;
}

// Admin-only: edit name + internal remarks about a user.
export function updateUser(id, updates) {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const allowed = {};
  if (typeof updates.name === "string") allowed.name = updates.name;
  if (typeof updates.remarks === "string") allowed.remarks = updates.remarks;
  users[index] = { ...users[index], ...allowed };
  saveUsers(users);
  return users[index];
}

// Self-service: a user editing their own profile/contact details.
export function updateProfile(id, updates) {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;
  const allowed = {};
  const fields = ["name", "phone", "address", "bio", "company", "avatarUrl"];
  for (const field of fields) {
    if (typeof updates[field] === "string") allowed[field] = updates[field];
  }
  users[index] = { ...users[index], ...allowed };
  saveUsers(users);
  return users[index];
}

export function deleteUser(id) {
  const users = getUsers();
  const filtered = users.filter((u) => u.id !== id);
  if (filtered.length === users.length) return false;
  saveUsers(filtered);
  return true;
}