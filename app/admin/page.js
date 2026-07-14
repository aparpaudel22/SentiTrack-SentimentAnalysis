"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../../components/LoadingSpinner";
import StatsOverview from "../../components/admin/StatsOverview";
import UsersTable from "../../components/admin/UsersTable";
import ActivityLog from "../../components/admin/ActivityLog";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState(null);
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState("");

  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (status === "authenticated" && !isAdmin) {
      router.replace("/analyze");
    }
  }, [status, isAdmin, router]);

  useEffect(() => {
    if (status === "authenticated" && isAdmin) {
      loadData();
    }
  }, [status, isAdmin]);

  async function loadData() {
    setError("");
    try {
      const [usersRes, activityRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/activity"),
      ]);
      const usersData = await usersRes.json();
      const activityData = await activityRes.json();
      if (!usersRes.ok) throw new Error(usersData.error || "Failed to load users.");
      if (!activityRes.ok) throw new Error(activityData.error || "Failed to load activity.");
      setUsers(usersData.users);
      setActivity(activityData.activity);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdateUser(id, updates) {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to update user.");
      return;
    }
    setUsers((prev) => prev.map((u) => (u.id === id ? data.user : u)));
  }

  async function handleDeleteUser(id) {
    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to delete user.");
      return;
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  if (status === "loading" || !isAdmin || users === null || activity === null) {
    return <LoadingSpinner label="Loading admin panel..." />;
  }

  return (
    <div className="container-page" style={{ paddingTop: 48, paddingBottom: 64, display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Admin Panel</h1>
        <p style={{ color: "var(--color-muted)" }}>Manage users and monitor platform activity.</p>
      </div>

      {error && (
        <div className="card" style={{ padding: 16, borderColor: "var(--color-negative)" }}>
          <p style={{ color: "var(--color-negative)", margin: 0, fontSize: 14 }}>{error}</p>
        </div>
      )}

      <StatsOverview users={users} activity={activity} />
      <UsersTable users={users} activity={activity} onUpdate={handleUpdateUser} onDelete={handleDeleteUser} />
      <ActivityLog activity={activity} />
    </div>
  );
}