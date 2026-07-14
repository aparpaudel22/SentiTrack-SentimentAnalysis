"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import ThemeToggle from "../../components/ThemeToggle";
import ConfirmModal from "../../components/ConfirmModal";
import { useAuth } from "../../lib/auth-context";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  );
}

const DELETION_REASONS = [
  "I no longer need this service",
  "I have privacy concerns",
  "I created a duplicate account",
  "The app is missing features I need",
  "I found a better alternative",
  "Other",
];

function SettingsContent() {
  const { user, logout, refreshSession } = useAuth();
  const router = useRouter();

  const [logoutOpen, setLogoutOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletionReason, setDeletionReason] = useState(DELETION_REASONS[0]);
  const [deletionNote, setDeletionNote] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", bio: "", company: "" });

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setProfileLoading(true);
    setProfileError("");
    try {
      const res = await fetch("/api/account/profile");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load profile.");
      setProfile(data.user);
      setForm({
        name: data.user.name || "",
        phone: data.user.phone || "",
        address: data.user.address || "",
        bio: data.user.bio || "",
        company: data.user.company || "",
      });
    } catch (err) {
      setProfileError(err.message);
    } finally {
      setProfileLoading(false);
    }
  }

  async function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUploading(true);
    setProfileError("");
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await fetch("/api/account/avatar", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload image.");
      setProfile(data.user);
      await refreshSession();
    } catch (err) {
      setProfileError(err.message);
    } finally {
      setAvatarUploading(false);
      e.target.value = "";
    }
  }

  async function handleProfileSave(e) {
    e.preventDefault();
    if (!profile?.avatarUrl) {
      setProfileError("Please upload a profile picture before saving.");
      return;
    }
    setProfileSaving(true);
    setProfileError("");
    setProfileSaved(false);
    try {
      const res = await fetch("/api/account/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save changes.");
      setProfile(data.user);
      await refreshSession();
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3000);
    } catch (err) {
      setProfileError(err.message);
    } finally {
      setProfileSaving(false);
    }
  }

  function clearHistory() {
    const key = `sentitrack-history-${user.email}`;
    window.localStorage.removeItem(key);
    setHistoryOpen(false);
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    setDeleteError("");
    try {
      const res = await fetch("/api/account/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Deletion failed.");

      const key = `sentitrack-history-${user.email}`;
      window.localStorage.removeItem(key);
      window.localStorage.removeItem("sentitrack-theme");

      await logout();
      router.push("/");
    } catch (err) {
      setDeleteError(err.message);
      setDeleting(false);
    }
  }

  return (
    <div className="container-page" style={{ maxWidth: 560, paddingTop: 48, paddingBottom: 64 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32 }}>Settings</h1>

      {/* Profile */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Profile</h3>
        <p style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 18 }}>
          Update your photo and contact details.
        </p>

        {profileLoading ? (
          <p style={{ fontSize: 13, color: "var(--color-muted)" }}>Loading...</p>
        ) : (
          <form onSubmit={handleProfileSave} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  width: 72, height: 72, borderRadius: "50%", overflow: "hidden",
                  background: "var(--color-bg-soft)", display: "flex", alignItems: "center",
                  justifyContent: "center", border: "1px solid var(--color-border)", flexShrink: 0,
                }}
              >
                {profile?.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontSize: 11, color: "var(--color-muted)", textAlign: "center", padding: 4 }}>No photo</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="avatar-upload"
                  className="btn-secondary"
                  style={{ fontSize: 13, padding: "8px 16px", cursor: "pointer", display: "inline-block" }}
                >
                  {avatarUploading ? "Uploading..." : profile?.avatarUrl ? "Change Photo" : "Upload Photo"}
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleAvatarChange}
                  disabled={avatarUploading}
                  style={{ display: "none" }}
                />
                <p style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 6 }}>
                  {profile?.avatarUrl ? "JPG, PNG, or WEBP, up to 4MB." : "Required — upload a real photo of yourself."}
                </p>
              </div>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)", display: "block", marginBottom: 6 }}>Name</label>
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required style={inputStyle} />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)", display: "block", marginBottom: 6 }}>Email</label>
              <input value={user.email} disabled style={{ ...inputStyle, opacity: 0.6, cursor: "not-allowed" }} />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)", display: "block", marginBottom: 6 }}>Phone</label>
              <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="+1 555 123 4567" style={inputStyle} />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)", display: "block", marginBottom: 6 }}>Address</label>
              <input value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} placeholder="City, Country" style={inputStyle} />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)", display: "block", marginBottom: 6 }}>Company / Organization</label>
              <input value={form.company} onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))} style={inputStyle} />
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)", display: "block", marginBottom: 6 }}>Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            {profileError && <p style={{ color: "var(--color-negative)", fontSize: 13, margin: 0 }}>{profileError}</p>}
            {profileSaved && <p style={{ color: "#16a34a", fontSize: 13, margin: 0 }}>Saved.</p>}

            <button type="submit" className="btn-primary" disabled={profileSaving} style={{ alignSelf: "flex-start", padding: "9px 20px", fontSize: 13 }}>
              {profileSaving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
      </div>

      {/* Appearance */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Appearance</h3>
        <p style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 14 }}>
          Choose how SentiTrack looks on this device.
        </p>
        <ThemeToggle />
      </div>

      {/* History */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Report History</h3>
        <p style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 16 }}>
          This clears all saved reports stored locally in this browser for your account.
        </p>
        <button
          onClick={() => setHistoryOpen(true)}
          className="btn-secondary"
          style={{ fontSize: 13, padding: "9px 18px", borderColor: "var(--color-negative)", color: "var(--color-negative)" }}
        >
          Clear All History
        </button>
      </div>

      {/* Session */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>Session</h3>
        <p style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 16 }}>
          You will be signed out of all pages on this device.
        </p>
        <button
          onClick={() => setLogoutOpen(true)}
          className="btn-secondary"
          style={{ fontSize: 13, padding: "9px 18px" }}
        >
          Log Out
        </button>
      </div>

      {/* Danger zone */}
      <div
        className="card"
        style={{ padding: 24, borderColor: "var(--color-negative)", borderWidth: 1, borderStyle: "solid" }}
      >
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: "var(--color-negative)" }}>
          Danger Zone
        </h3>
        <p style={{ fontSize: 13, color: "var(--color-muted)", marginBottom: 16 }}>
          Permanently deletes your account and all associated data. This action cannot be undone.
        </p>
        <button
          onClick={() => setDeleteOpen(true)}
          className="btn-primary"
          style={{
            fontSize: 13,
            padding: "9px 18px",
            background: "var(--color-negative)",
            borderColor: "var(--color-negative)",
          }}
        >
          Delete My Account
        </button>
      </div>

      <ConfirmModal
        open={logoutOpen}
        title="Log out of SentiTrack?"
        message="You will be signed out of your account on this device. Your saved reports and history will remain stored locally in this browser."
        confirmLabel="Yes, Log Out"
        onCancel={() => setLogoutOpen(false)}
        onConfirm={() => { setLogoutOpen(false); logout(); }}
      />

      <ConfirmModal
        open={historyOpen}
        title="Clear all report history?"
        message="This will permanently remove all saved sentiment reports stored in this browser for your account. Your account itself will not be affected. This cannot be undone."
        confirmLabel="Yes, Clear History"
        confirmDanger
        onCancel={() => setHistoryOpen(false)}
        onConfirm={clearHistory}
      />

      <ConfirmModal
        open={deleteOpen}
        title="Delete your account?"
        message="This permanently removes your account credentials. All locally stored reports will also be erased. You cannot undo this."
        confirmLabel={deleting ? "Deleting..." : "Yes, Delete My Account"}
        confirmDanger
        onCancel={() => { setDeleteOpen(false); setDeleteError(""); setDeletionNote(""); }}
        onConfirm={handleDeleteAccount}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)", display: "block", marginBottom: 6 }}>
              Why are you leaving? (optional)
            </label>
            <select
              value={deletionReason}
              onChange={(e) => setDeletionReason(e.target.value)}
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 10, fontSize: 13,
                border: "1px solid var(--color-border)", background: "var(--color-bg)", color: "var(--color-text)",
              }}
            >
              {DELETION_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--color-muted)", display: "block", marginBottom: 6 }}>
              Additional feedback (optional)
            </label>
            <textarea
              value={deletionNote}
              onChange={(e) => setDeletionNote(e.target.value)}
              rows={3}
              placeholder="Tell us more about your experience..."
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 10, fontSize: 13,
                border: "1px solid var(--color-border)", background: "var(--color-bg)", color: "var(--color-text)",
                resize: "vertical", boxSizing: "border-box",
              }}
            />
          </div>

          {deleteError && (
            <p style={{ color: "var(--color-negative)", fontSize: 13, margin: 0 }}>{deleteError}</p>
          )}
        </div>
      </ConfirmModal>
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "10px 12px", borderRadius: 10, fontSize: 14,
  border: "1px solid var(--color-border)", background: "var(--color-bg)", color: "var(--color-text)",
  boxSizing: "border-box",
};