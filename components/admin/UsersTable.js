"use client";
import { useState } from "react";
import ConfirmModal from "../ConfirmModal";

export default function UsersTable({ users, activity, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ name: "", remarks: "" });
  const [deleteTarget, setDeleteTarget] = useState(null);

  function startEdit(user) {
    setEditingId(user.id);
    setDraft({ name: user.name || "", remarks: user.remarks || "" });
  }

  function saveEdit(id) {
    onUpdate(id, draft);
    setEditingId(null);
  }

  function usageFor(email) {
    return activity.filter((a) => a.email.toLowerCase() === email.toLowerCase()).length;
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    onDelete(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <div className="card" style={{ padding: 24 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Users ({users.length})</h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid var(--color-border)" }}>
              <th style={{ padding: "8px 10px" }}>Name</th>
              <th style={{ padding: "8px 10px" }}>Email</th>
              <th style={{ padding: "8px 10px" }}>Account Type</th>
              <th style={{ padding: "8px 10px" }}>Provider</th>
              <th style={{ padding: "8px 10px" }}>Analyses</th>
              <th style={{ padding: "8px 10px" }}>Remarks</th>
              <th style={{ padding: "8px 10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isAdminAccount = user.accountType === "Admin";
              return (
                <tr key={user.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  {editingId === user.id ? (
                    <>
                      <td style={{ padding: "8px 10px" }}>
                        <input value={draft.name} onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))} style={inputStyle} />
                      </td>
                      <td style={{ padding: "8px 10px", color: "var(--color-muted)" }}>{user.email}</td>
                      <td style={{ padding: "8px 10px" }}>
                        <AccountBadge type={user.accountType} />
                      </td>
                      <td style={{ padding: "8px 10px" }}>{user.provider}</td>
                      <td style={{ padding: "8px 10px" }}>{usageFor(user.email)}</td>
                      <td style={{ padding: "8px 10px" }}>
                        <input value={draft.remarks} onChange={(e) => setDraft((d) => ({ ...d, remarks: e.target.value }))} style={inputStyle} placeholder="Add a remark..." />
                      </td>
                      <td style={{ padding: "8px 10px", display: "flex", gap: 8 }}>
                        <button onClick={() => saveEdit(user.id)} className="btn-primary" style={smallBtn}>Save</button>
                        <button onClick={() => setEditingId(null)} className="btn-secondary" style={smallBtn}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ padding: "8px 10px", fontWeight: 600 }}>{user.name || "—"}</td>
                      <td style={{ padding: "8px 10px", color: "var(--color-muted)" }}>{user.email}</td>
                      <td style={{ padding: "8px 10px" }}>
                        <AccountBadge type={user.accountType} />
                      </td>
                      <td style={{ padding: "8px 10px" }}>{user.provider}</td>
                      <td style={{ padding: "8px 10px" }}>{usageFor(user.email)}</td>
                      <td style={{ padding: "8px 10px", color: "var(--color-muted)" }}>{user.remarks || "—"}</td>
                      <td style={{ padding: "8px 10px", display: "flex", gap: 8 }}>
                        <button onClick={() => startEdit(user)} className="btn-secondary" style={smallBtn}>Edit</button>
                        {!isAdminAccount && (
                          <button onClick={() => setDeleteTarget(user)} className="btn-secondary" style={{ ...smallBtn, color: "var(--color-negative)" }}>Delete</button>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete user?"
        message={deleteTarget ? `This will permanently delete ${deleteTarget.email}. This cannot be undone.` : ""}
        confirmLabel="Yes, Delete"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

function AccountBadge({ type }) {
  const isAdmin = type === "Admin";
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 10px",
        borderRadius: 999,
        color: isAdmin ? "var(--color-primary)" : "var(--color-muted)",
        background: isAdmin ? "rgba(59,130,246,0.12)" : "var(--color-bg-soft)",
      }}
    >
      {type}
    </span>
  );
}

const inputStyle = { width: "100%", padding: "6px 8px", borderRadius: 6, border: "1px solid var(--color-border)", background: "var(--color-bg)", color: "var(--color-text)", fontSize: 13, boxSizing: "border-box" };
const smallBtn = { padding: "6px 12px", fontSize: 12 };