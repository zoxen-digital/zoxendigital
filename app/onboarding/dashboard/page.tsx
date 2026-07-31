"use client";
import { useEffect, useMemo, useState } from "react";
import type { OnboardingSubmission, SubmissionStatus } from "@/lib/onboarding-types";

const ALL_STATUSES: SubmissionStatus[] = ["New", "In Progress", "Done", "On Hold"];

const STATUS_COLORS: Record<SubmissionStatus, { bg: string; text: string; hex: string }> = {
  "New": { bg: "rgba(139,143,245,0.15)", text: "#8b8ff5", hex: "#8b8ff5" },
  "In Progress": { bg: "rgba(99,102,241,0.15)", text: "#6366f1", hex: "#6366f1" },
  "Done": { bg: "rgba(34,197,94,0.15)", text: "#4ade80", hex: "#4ade80" },
  "On Hold": { bg: "rgba(245,158,11,0.15)", text: "#f59e0b", hex: "#f59e0b" },
};

function monthKey(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function initials(name: string) {
  return (name || "?").trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "?";
}

function csvEscape(value: string) {
  return `"${(value ?? "").replace(/"/g, '""')}"`;
}

function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 18) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [items, setItems] = useState<OnboardingSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState<"overview" | "submissions">("overview");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<OnboardingSubmission | null>(null);
  const [savingDrawer, setSavingDrawer] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [trendRange, setTrendRange] = useState<7 | 30>(7);
  const [tablePage, setTablePage] = useState(1);

  async function loadData() {
    setLoading(true);
    const res = await fetch("/api/onboarding");
    if (res.status === 401) {
      setAuthed(false);
      setLoading(false);
      return;
    }
    const data = await res.json();
    setItems(data.items || []);
    setAuthed(true);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleLogin() {
    setLoginError("");
    const res = await fetch("/api/dashboard-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setLoginError(data.error || "Login failed");
      return;
    }
    loadData();
  }

  async function handleLogout() {
    await fetch("/api/dashboard-auth", { method: "DELETE" });
    setAuthed(false);
    setItems([]);
  }

  async function patch(id: string, body: Record<string, unknown>) {
    await fetch(`/api/onboarding/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  async function updateStatus(id: string, status: SubmissionStatus) {
    setItems((prev) => prev.map((it) => (it._id === id ? { ...it, status } : it)));
    await patch(id, { status });
  }

  async function saveDrawer() {
    if (!selected?._id) return;
    setSavingDrawer(true);
    await patch(selected._id, {
      status: selected.status,
      assignedTo: selected.assignedTo,
      notes: selected.notes,
      targetMonth: selected.targetMonth,
      domainConnected: selected.domainConnected,
    });
    setItems((prev) => prev.map((it) => (it._id === selected._id ? selected : it)));
    setSavingDrawer(false);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete submission from "${name || "this business"}"? This cannot be undone.`)) return;
    setDeletingId(id);
    const res = await fetch(`/api/onboarding/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((it) => it._id !== id));
      if (selected?._id === id) setSelected(null);
    }
    setDeletingId(null);
  }

  function exportCsv() {
    const headers = ["Business Name", "Contact Person", "Email", "Phone", "Package", "Status", "Assigned To", "Submitted"];
    const rows = filtered.map((it) => [
      it.businessName, it.contactPerson, it.email, it.phone, it.package, it.status, it.assignedTo,
      new Date(it.createdAt).toLocaleString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => csvEscape(String(c ?? ""))).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `onboarding-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = useMemo(() => {
    let result = [...items];
    if (statusFilter !== "All") {
      result = result.filter((it) => it.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (it) =>
          it.businessName?.toLowerCase().includes(q) ||
          it.email?.toLowerCase().includes(q) ||
          it.contactPerson?.toLowerCase().includes(q) ||
          it.industry?.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [items, statusFilter, search]);

  // ---- Analytics (all derived from real data) ----
  const analytics = useMemo(() => {
    const dailyCounts: Record<string, number> = {};
    items.forEach((it) => {
      const k = dayKey(new Date(it.createdAt));
      dailyCounts[k] = (dailyCounts[k] || 0) + 1;
    });

    function seriesFor(days: number) {
      const arr: { label: string; value: number }[] = [];
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const k = dayKey(d);
        arr.push({ label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }), value: dailyCounts[k] || 0 });
      }
      return arr;
    }

    function windowCount(startDaysAgo: number, endDaysAgo: number) {
      const start = new Date();
      start.setDate(start.getDate() - startDaysAgo);
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setDate(end.getDate() - endDaysAgo);
      end.setHours(23, 59, 59, 999);
      return items.filter((it) => {
        const t = new Date(it.createdAt).getTime();
        return t >= start.getTime() && t <= end.getTime();
      }).length;
    }

    const last7 = windowCount(6, 0);
    const prev7 = windowCount(13, 7);
    const pctChange = prev7 > 0 ? Math.round(((last7 - prev7) / prev7) * 100) : last7 > 0 ? 100 : 0;

    const total = items.length;
    const newCount = items.filter((i) => i.status === "New").length;
    const inProgressCount = items.filter((i) => i.status === "In Progress").length;
    const doneCount = items.filter((i) => i.status === "Done").length;
    const onHoldCount = items.filter((i) => i.status === "On Hold").length;
    const conversionRate = total ? Math.round((doneCount / total) * 100) : 0;

    const industryCounts: Record<string, number> = {};
    items.forEach((it) => {
      const key = it.industry || "Other";
      industryCounts[key] = (industryCounts[key] || 0) + 1;
    });
    const topIndustries = Object.entries(industryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count, pct: total ? Math.round((count / total) * 100) : 0 }));

    const packageCounts: Record<string, number> = {};
    items.forEach((it) => {
      const key = it.package || "Unspecified";
      packageCounts[key] = (packageCounts[key] || 0) + 1;
    });

    return {
      trend7: seriesFor(7),
      trend30: seriesFor(30),
      last7, prev7, pctChange,
      total, newCount, inProgressCount, doneCount, onHoldCount, conversionRate,
      topIndustries, packageCounts,
    };
  }, [items]);

  if (authed === null || loading) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#08080b" }}>
        <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading...</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", background: "#08080b" }}>
        <div style={{
          width: "100%", maxWidth: "360px", background: "#0f0f14",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: "18px", padding: "32px",
        }}>
          <h1 style={{ color: "white", fontSize: "20px", fontWeight: "700", marginBottom: "20px", textAlign: "center" }}>
            Dashboard Login
          </h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter password"
            style={{
              width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px", padding: "12px 16px", color: "white", fontSize: "14px", outline: "none", marginBottom: "12px",
            }}
          />
          {loginError && <p style={{ color: "#f87171", fontSize: "13px", marginBottom: "12px" }}>{loginError}</p>}
          <button onClick={handleLogin} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Log In
          </button>
        </div>
      </main>
    );
  }

  const statusCounts: Record<string, number> = { All: items.length };
  ALL_STATUSES.forEach((s) => { statusCounts[s] = items.filter((it) => it.status === s).length; });

  const pageSize = 8;
  const pagedItems = filtered.slice((tablePage - 1) * pageSize, tablePage * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const grouped: Record<string, OnboardingSubmission[]> = {};
  filtered.forEach((it) => {
    const key = monthKey(it.createdAt);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(it);
  });

  const donutSegments = [
    { status: "New" as SubmissionStatus, count: analytics.newCount },
    { status: "In Progress" as SubmissionStatus, count: analytics.inProgressCount },
    { status: "Done" as SubmissionStatus, count: analytics.doneCount },
    { status: "On Hold" as SubmissionStatus, count: analytics.onHoldCount },
  ];
  let acc = 0;
  const conicStops: string[] = [];
  donutSegments.forEach((seg) => {
    const pct = analytics.total ? (seg.count / analytics.total) * 100 : 0;
    conicStops.push(`${STATUS_COLORS[seg.status].hex} ${acc}% ${acc + pct}%`);
    acc += pct;
  });
  const donutBg = analytics.total ? `conic-gradient(${conicStops.join(", ")})` : "rgba(255,255,255,0.06)";

  return (
    <div style={{ minHeight: "100vh", background: "#08080b", display: "flex" }}>
      {/* Sidebar */}
      <aside style={{
        width: "240px", flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.08)",
        padding: "22px 16px", display: "flex", flexDirection: "column",
      }} className="dash-sidebar">
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 8px", marginBottom: "26px" }}>
          <img src="/main-logo.png" alt="Zoxen Digital" style={{ height: "30px", width: "auto", objectFit: "contain" }} />
          <span style={{ fontSize: "14px", fontWeight: "800" }}>
            <span style={{ color: "white" }}>Zoxen</span> <span style={{ color: "#8b8ff5" }}>Digital</span>
          </span>
        </div>

        <SidebarItem
          label="Dashboard"
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" /><rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" /><rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="2" /><rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="2" /></svg>}
          active={page === "overview"}
          onClick={() => setPage("overview")}
        />

        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "10.5px", fontWeight: "700", letterSpacing: "1px", margin: "18px 0 8px", paddingLeft: "8px" }}>ONBOARDING</div>
        <SidebarItem
          label="Submissions"
          count={statusCounts.All}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2" /><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" /></svg>}
          active={page === "submissions"}
          onClick={() => { setPage("submissions"); setStatusFilter("All"); }}
        />

        {page === "submissions" && (
          <div style={{ marginLeft: "8px", marginTop: "4px", display: "flex", flexDirection: "column", gap: "2px" }}>
            {ALL_STATUSES.map((s) => (
              <SidebarSubItem key={s} label={s} count={statusCounts[s]} active={statusFilter === s} onClick={() => setStatusFilter(s)} color={STATUS_COLORS[s].hex} />
            ))}
          </div>
        )}

        <div style={{ flex: 1 }} />

        <div style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))",
          border: "1px solid rgba(99,102,241,0.25)", borderRadius: "14px", padding: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} className="badge-dot" />
            <span style={{ color: "white", fontSize: "12.5px", fontWeight: "700" }}>All systems running</span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", marginBottom: "10px" }}>Database connected</div>
          <button onClick={loadData} className="btn-secondary" style={{ width: "100%", justifyContent: "center", fontSize: "12px", padding: "8px" }}>
            Refresh Data
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top header */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px",
          padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0,
        }}>
          <div style={{ position: "relative", flex: 1, maxWidth: "360px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)" }}>
              <circle cx="11" cy="11" r="7" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); if (e.target.value) setPage("submissions"); }}
              placeholder="Search business, name, email..."
              style={{
                width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px", padding: "9px 14px 9px 36px", color: "white", fontSize: "13px", outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
            <button
              onClick={() => { setStatusFilter("New"); setPage("submissions"); }}
              style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)" }}
              title="New submissions"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              {analytics.newCount > 0 && (
                <span style={{
                  position: "absolute", top: "-4px", right: "-6px", background: "#6366f1", color: "white",
                  fontSize: "9px", fontWeight: "700", borderRadius: "50px", padding: "1px 5px", minWidth: "14px", textAlign: "center",
                }}>{analytics.newCount}</span>
              )}
            </button>

            <div style={{ position: "relative" }}>
              <button
                onClick={() => setProfileOpen((o) => !o)}
                style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer" }}
              >
                <span style={{
                  width: "34px", height: "34px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontSize: "13px", fontWeight: "700",
                }}>A</span>
                <span style={{ textAlign: "left" }}>
                  <div style={{ color: "white", fontSize: "13px", fontWeight: "700" }}>Admin</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "10.5px" }}>Owner</div>
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              {profileOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0, background: "#14141c",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "6px", minWidth: "140px", zIndex: 20,
                }}>
                  <button onClick={handleLogout} style={{
                    width: "100%", textAlign: "left", background: "none", border: "none", color: "#f87171",
                    fontSize: "13px", padding: "8px 10px", cursor: "pointer", borderRadius: "6px",
                  }}>Sign out</button>
                </div>
              )}
            </div>

            <button onClick={exportCsv} style={headerBtnStyle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Export
            </button>
            <a href="/onboarding" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: "12.5px", padding: "9px 16px" }}>
              + New Submission
            </a>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {page === "overview" ? (
            <>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginBottom: "4px" }}>{greeting()}, Admin 👋</p>
              <h1 style={{ color: "white", fontSize: "26px", fontWeight: "800", marginBottom: "6px" }}>Here&apos;s what&apos;s happening today.</h1>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "26px" }}>
                Track your onboarding submissions and convert leads into successful projects.
              </p>

              {/* Stat cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
                <StatCard icon="doc" label="Total Submissions" value={analytics.total} pctChange={analytics.pctChange} trend={analytics.trend7} color="#6366f1" />
                <StatCard icon="user" label="New Submissions" value={analytics.newCount} trend={analytics.trend7} color="#60a5fa" />
                <StatCard icon="filter" label="Conversion Rate" value={`${analytics.conversionRate}%`} trend={analytics.trend7} color="#a78bfa" />
                <StatCard icon="folder" label="In Progress" value={analytics.inProgressCount} trend={analytics.trend7} color="#4ade80" />
              </div>

              <div className="dash-overview-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginBottom: "20px" }}>
                {/* Recent submissions */}
                <div style={{ background: "#0f0f14", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                    <h3 style={{ color: "white", fontSize: "15px", fontWeight: "700" }}>Recent Onboarding Submissions</h3>
                    <button onClick={() => setPage("submissions")} style={{ background: "none", border: "none", color: "#8b8ff5", fontSize: "12.5px", fontWeight: "600", cursor: "pointer" }}>
                      View All →
                    </button>
                  </div>

                  {items.length === 0 ? (
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", textAlign: "center", padding: "30px 0" }}>No submissions yet.</p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {[...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5).map((sub) => (
                        <RecentRow key={sub._id} sub={sub} onClick={() => setSelected(sub)} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Overview donut + quick actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ background: "#0f0f14", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "22px" }}>
                    <h3 style={{ color: "white", fontSize: "15px", fontWeight: "700", marginBottom: "18px" }}>Submissions Overview</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      <div style={{
                        width: "100px", height: "100px", borderRadius: "50%", background: donutBg,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <div style={{ width: "62px", height: "62px", borderRadius: "50%", background: "#0f0f14", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ color: "white", fontSize: "18px", fontWeight: "800" }}>{analytics.total}</span>
                          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "9px" }}>Total</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                        {donutSegments.map((seg) => (
                          <div key={seg.status} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px" }}>
                            <span style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.65)" }}>
                              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: STATUS_COLORS[seg.status].hex, display: "inline-block" }} />
                              {seg.status}
                            </span>
                            <span style={{ color: "white", fontWeight: "600" }}>
                              {seg.count} ({analytics.total ? Math.round((seg.count / analytics.total) * 100) : 0}%)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ background: "#0f0f14", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "22px" }}>
                    <h3 style={{ color: "white", fontSize: "15px", fontWeight: "700", marginBottom: "14px" }}>Quick Actions</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <QuickAction label="View All Submissions" onClick={() => setPage("submissions")} />
                      <QuickAction label="Add New Submission" href="/onboarding" />
                      <QuickAction label="Export CSV Report" onClick={exportCsv} />
                      <QuickAction label="Refresh Data" onClick={loadData} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="dash-overview-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
                {/* Trend chart */}
                <div style={{ background: "#0f0f14", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                    <h3 style={{ color: "white", fontSize: "15px", fontWeight: "700" }}>Submissions Trend</h3>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {([7, 30] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => setTrendRange(r)}
                          style={{
                            background: trendRange === r ? "rgba(99,102,241,0.15)" : "transparent",
                            border: trendRange === r ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.1)",
                            color: trendRange === r ? "white" : "rgba(255,255,255,0.5)",
                            borderRadius: "8px", padding: "5px 10px", fontSize: "11.5px", fontWeight: "600", cursor: "pointer",
                          }}
                        >
                          Last {r} Days
                        </button>
                      ))}
                    </div>
                  </div>
                  <TrendChart data={trendRange === 7 ? analytics.trend7 : analytics.trend30} />
                </div>

                {/* Top industries */}
                <div style={{ background: "#0f0f14", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "22px" }}>
                  <h3 style={{ color: "white", fontSize: "15px", fontWeight: "700", marginBottom: "16px" }}>Top Industries</h3>
                  {analytics.topIndustries.length === 0 ? (
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>No data yet.</p>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      {analytics.topIndustries.map((ind) => (
                        <div key={ind.name}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", marginBottom: "5px" }}>
                            <span style={{ color: "rgba(255,255,255,0.7)" }}>{ind.name}</span>
                            <span style={{ color: "white", fontWeight: "600" }}>{ind.pct}% ({ind.count})</span>
                          </div>
                          <div style={{ height: "6px", borderRadius: "50px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${ind.pct}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
                <div>
                  <h1 style={{ color: "white", fontSize: "22px", fontWeight: "800" }}>All Submissions</h1>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12.5px", marginTop: "2px" }}>{filtered.length} results</p>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["All", ...ALL_STATUSES].map((s) => (
                    <button
                      key={s}
                      onClick={() => { setStatusFilter(s); setTablePage(1); }}
                      style={{
                        padding: "7px 14px", borderRadius: "50px", fontSize: "12px", fontWeight: "600", cursor: "pointer",
                        border: statusFilter === s ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.1)",
                        background: statusFilter === s ? "rgba(99,102,241,0.15)" : "transparent",
                        color: statusFilter === s ? "white" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {Object.keys(grouped).length === 0 ? (
                <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", marginTop: "60px" }}>No submissions found.</p>
              ) : (
                <div style={{ background: "#0f0f14", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", overflow: "hidden" }}>
                  <div className="dash-table-row dash-table-head">
                    <span>BUSINESS</span>
                    <span>CONTACT</span>
                    <span>PACKAGE</span>
                    <span>DATE</span>
                    <span>STATUS</span>
                    <span></span>
                  </div>
                  {pagedItems.map((sub) => {
                    const colors = STATUS_COLORS[sub.status] || STATUS_COLORS["New"];
                    return (
                      <div key={sub._id} className="dash-table-row dash-table-body" onClick={() => setSelected(sub)}>
                        <span style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                          <span style={{
                            width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "white", fontSize: "11px", fontWeight: "700",
                          }}>{initials(sub.businessName)}</span>
                          <span style={{ color: "white", fontSize: "13px", fontWeight: "700", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {sub.businessName || "Untitled"}
                          </span>
                        </span>
                        <span style={{ minWidth: 0 }}>
                          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub.contactPerson}</div>
                          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub.email}</div>
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px" }}>{sub.package}</span>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>{new Date(sub.createdAt).toLocaleDateString()}</span>
                        <span onClick={(e) => e.stopPropagation()}>
                          <select
                            value={sub.status}
                            onChange={(e) => sub._id && updateStatus(sub._id, e.target.value as SubmissionStatus)}
                            style={{
                              background: colors.bg, color: colors.text, border: "none", borderRadius: "8px",
                              padding: "6px 10px", fontSize: "11px", fontWeight: "700", cursor: "pointer", outline: "none",
                            }}
                          >
                            {ALL_STATUSES.map((s) => (
                              <option key={s} value={s} style={{ background: "#111", color: "white" }}>{s}</option>
                            ))}
                          </select>
                        </span>
                        <span onClick={(e) => { e.stopPropagation(); sub._id && handleDelete(sub._id, sub.businessName); }} style={{ cursor: "pointer", textAlign: "right" }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.4 }}>
                            <polyline points="3 6 5 6 21 6" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "18px" }}>
                  <button onClick={() => setTablePage((p) => Math.max(1, p - 1))} disabled={tablePage === 1} style={pageBtnStyle(false)}>‹</button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button key={p} onClick={() => setTablePage(p)} style={pageBtnStyle(p === tablePage)}>{p}</button>
                  ))}
                  <button onClick={() => setTablePage((p) => Math.min(totalPages, p + 1))} disabled={tablePage === totalPages} style={pageBtnStyle(false)}>›</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Slide-over drawer */}
      {selected && (
        <>
          <div onClick={() => setSelected(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 50 }} />
          <div style={{
            position: "fixed", top: 0, right: 0, height: "100vh", width: "420px", maxWidth: "92vw",
            background: "#0c0c11", borderLeft: "1px solid rgba(255,255,255,0.08)", zIndex: 51,
            overflowY: "auto", padding: "24px",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontSize: "13px", fontWeight: "700", flexShrink: 0,
                }}>{initials(selected.businessName)}</span>
                <div>
                  <div style={{ color: "white", fontSize: "16px", fontWeight: "700" }}>{selected.businessName}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{selected.contactPerson}</div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "18px" }}>✕</button>
            </div>

            <DrawerSection title="Project Status">
              <label style={drawerLabel}>Status</label>
              <select
                value={selected.status}
                onChange={(e) => setSelected({ ...selected, status: e.target.value as SubmissionStatus })}
                style={drawerInput}
              >
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s} style={{ background: "#111" }}>{s}</option>
                ))}
              </select>

              <label style={{ ...drawerLabel, marginTop: "14px" }}>Assigned To</label>
              <input
                type="text"
                value={selected.assignedTo || ""}
                onChange={(e) => setSelected({ ...selected, assignedTo: e.target.value })}
                placeholder="Unassigned"
                style={drawerInput}
              />

              <label style={{ ...drawerLabel, marginTop: "14px" }}>Internal Notes</label>
              <textarea
                rows={3}
                value={selected.notes || ""}
                onChange={(e) => setSelected({ ...selected, notes: e.target.value })}
                placeholder="Internal notes..."
                style={{ ...drawerInput, resize: "vertical", fontFamily: "inherit" }}
              />

              <label style={{ ...drawerLabel, marginTop: "14px" }}>Target Month</label>
              <input
                type="text"
                value={selected.targetMonth || ""}
                onChange={(e) => setSelected({ ...selected, targetMonth: e.target.value })}
                style={drawerInput}
              />

              <button
                onClick={() => setSelected({ ...selected, domainConnected: !selected.domainConnected })}
                style={{
                  width: "100%", marginTop: "14px", padding: "10px", borderRadius: "10px", cursor: "pointer",
                  background: selected.domainConnected ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.04)",
                  border: selected.domainConnected ? "1px solid rgba(74,222,128,0.3)" : "1px solid rgba(255,255,255,0.1)",
                  color: selected.domainConnected ? "#4ade80" : "rgba(255,255,255,0.5)",
                  fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="2" /></svg>
                {selected.domainConnected ? "Domain Connected" : "Domain Not Connected"}
              </button>

              <button onClick={saveDrawer} disabled={savingDrawer} className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "16px" }}>
                {savingDrawer ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => selected._id && handleDelete(selected._id, selected.businessName)}
                disabled={deletingId === selected._id}
                style={{
                  width: "100%", marginTop: "10px", padding: "12px", borderRadius: "50px", cursor: "pointer",
                  background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)",
                  color: "#f87171", fontSize: "14px", fontWeight: "700",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <polyline points="3 6 5 6 21 6" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Delete Form
              </button>
            </DrawerSection>

            <DrawerSection title="Contact">
              <DrawerRow label="Email" value={selected.email} />
              <DrawerRow label="Phone" value={selected.phone} />
              <DrawerRow label="Website" value={selected.currentWebsite || "na"} />
              <DrawerRow label="Social" value={selected.socialMedia || "na"} />
              <DrawerRow label="Industry" value={selected.industry} />
              <DrawerRow label="Business Size" value={selected.businessSize} />
            </DrawerSection>

            <DrawerSection title="Package & Add-Ons">
              <DrawerRow label="Package" value={selected.package} />
              <DrawerRow label="Add-Ons" value={selected.addOns?.length ? selected.addOns.join(", ") : "None selected"} />
            </DrawerSection>

            <DrawerSection title="Project Details">
              <DrawerRow label="Main Goal" value={selected.mainGoal} />
              <DrawerRow label="Target Audience" value={selected.targetAudience} />
              <DrawerRow label="Design Style" value={selected.designStyle} />
              <DrawerRow label="Brand Colors" value={selected.brandColors} />
              <DrawerRow label="Pages Needed" value={selected.pagesNeeded?.length ? selected.pagesNeeded.join(", ") : "—"} />
            </DrawerSection>

            <DrawerSection title="Files">
              {selected.logoUrl && (
                <div style={{ marginBottom: "10px" }}>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginBottom: "6px" }}>Logo</div>
                  <img src={selected.logoUrl} alt="Logo" style={{ height: "50px", borderRadius: "8px", background: "white", padding: "4px" }} />
                </div>
              )}
              {selected.attachmentUrls?.length ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {selected.attachmentUrls.map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#8b8ff5", fontSize: "13px" }}>Attachment {i + 1}</a>
                  ))}
                </div>
              ) : (
                !selected.logoUrl && <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>No files uploaded.</p>
              )}
            </DrawerSection>
          </div>
        </>
      )}

      <style>{`
        .dash-table-row {
          display: grid;
          grid-template-columns: 2fr 1.6fr 1fr 0.9fr 1fr 30px;
          gap: 12px;
          align-items: center;
          padding: 14px 20px;
        }
        .dash-table-head {
          color: rgba(255,255,255,0.35);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .dash-table-body {
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .dash-table-body:last-child { border-bottom: none; }
        .dash-table-body:hover { background: rgba(255,255,255,0.02); }
        @media (max-width: 900px) {
          .dash-sidebar { display: none; }
          .dash-overview-grid { grid-template-columns: 1fr !important; }
          .dash-table-row { grid-template-columns: 1.5fr 1fr 1fr; }
          .dash-table-row > span:nth-child(3), .dash-table-row > span:nth-child(6) { display: none; }
        }
      `}</style>
    </div>
  );
}

function pageBtnStyle(active: boolean): React.CSSProperties {
  return {
    width: "30px", height: "30px", borderRadius: "8px", border: active ? "none" : "1px solid rgba(255,255,255,0.1)",
    background: active ? "#6366f1" : "transparent", color: active ? "white" : "rgba(255,255,255,0.5)",
    fontSize: "12px", fontWeight: "600", cursor: "pointer",
  };
}

function SidebarItem({ label, count, icon, active, onClick }: { label: string; count?: number; icon: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: active ? "rgba(99,102,241,0.15)" : "transparent",
        border: "none", borderRadius: "10px", padding: "10px 12px", cursor: "pointer", marginBottom: "2px",
        color: active ? "white" : "rgba(255,255,255,0.55)",
        fontSize: "13.5px", fontWeight: active ? "700" : "500",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ display: "flex", color: active ? "#8b8ff5" : "rgba(255,255,255,0.4)" }}>{icon}</span>
        {label}
      </span>
      {count !== undefined && <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>{count}</span>}
    </button>
  );
}

function SidebarSubItem({ label, count, active, onClick, color }: { label: string; count?: number; active: boolean; onClick: () => void; color: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: active ? "rgba(255,255,255,0.05)" : "transparent",
        border: "none", borderRadius: "8px", padding: "7px 10px", cursor: "pointer",
        color: active ? "white" : "rgba(255,255,255,0.45)", fontSize: "12.5px", fontWeight: active ? "600" : "500",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, display: "inline-block" }} />
        {label}
      </span>
      {count !== undefined && <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>{count}</span>}
    </button>
  );
}

function StatCard({ icon, label, value, pctChange, trend, color }: {
  icon: string; label: string; value: number | string; pctChange?: number; trend: { label: string; value: number }[]; color: string;
}) {
  return (
    <div style={{ background: "#0f0f14", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px", background: `${color}22`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <StatIcon icon={icon} color={color} />
        </div>
        <div>
          <div style={{ color: "white", fontSize: "22px", fontWeight: "800", lineHeight: 1 }}>{value}</div>
          <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "11.5px", marginTop: "2px" }}>{label}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        {pctChange !== undefined && (
          <span style={{ fontSize: "11px", fontWeight: "700", color: pctChange >= 0 ? "#4ade80" : "#f87171" }}>
            {pctChange >= 0 ? "↑" : "↓"} {Math.abs(pctChange)}% <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: "400" }}>vs last 7 days</span>
          </span>
        )}
        <Sparkline data={trend.map((d) => d.value)} color={color} />
      </div>
    </div>
  );
}

function StatIcon({ icon, color }: { icon: string; color: string }) {
  const c = { width: 17, height: 17, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2 } as const;
  if (icon === "doc") return <svg {...c}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
  if (icon === "user") return <svg {...c}><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a8 8 0 0116 0v1" strokeLinecap="round" /></svg>;
  if (icon === "filter") return <svg {...c}><path d="M4 4h16l-6 8v6l-4 2v-8z" strokeLinejoin="round" /></svg>;
  return <svg {...c}><path d="M3 7l9-4 9 4-9 4-9-4z" strokeLinejoin="round" /><path d="M3 7v10l9 4 9-4V7" strokeLinejoin="round" /></svg>;
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 70, h = 26;
  const max = Math.max(1, ...data);
  const points = data.map((v, i) => `${(i / (data.length - 1 || 1)) * w},${h - (v / max) * (h - 4) - 2}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrendChart({ data }: { data: { label: string; value: number }[] }) {
  const w = 700, h = 180, pad = 24;
  const max = Math.max(4, ...data.map((d) => d.value));
  const step = data.length > 1 ? (w - pad * 2) / (data.length - 1) : 0;
  const points = data.map((d, i) => {
    const x = pad + i * step;
    const y = h - pad - (d.value / max) * (h - pad * 2);
    return { x, y, ...d };
  });
  const linePoints = points.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPoints = `${pad},${h - pad} ${linePoints} ${pad + (points.length - 1) * step},${h - pad}`;
  const showEvery = data.length > 14 ? Math.ceil(data.length / 10) : 1;

  return (
    <div style={{ overflowX: "auto" }}>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ minWidth: "500px" }}>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line key={f} x1={pad} x2={w - pad} y1={h - pad - f * (h - pad * 2)} y2={h - pad - f * (h - pad * 2)} stroke="rgba(255,255,255,0.05)" />
        ))}
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#trendFill)" />
        <polyline points={linePoints} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#6366f1" />
        ))}
        {points.map((p, i) => (
          i % showEvery === 0 ? (
            <text key={i} x={p.x} y={h - 4} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.35)">{p.label}</text>
          ) : null
        ))}
      </svg>
    </div>
  );
}

function RecentRow({ sub, onClick }: { sub: OnboardingSubmission; onClick: () => void }) {
  const colors = STATUS_COLORS[sub.status] || STATUS_COLORS["New"];
  return (
    <div onClick={onClick} style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
      padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0, flex: 1 }}>
        <span style={{
          width: "32px", height: "32px", borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontSize: "11px", fontWeight: "700",
        }}>{initials(sub.businessName)}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: "white", fontSize: "13px", fontWeight: "700", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub.businessName || "Untitled"}</div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub.industry || sub.email}</div>
        </div>
      </div>
      <span style={{
        background: colors.bg, color: colors.text, borderRadius: "8px",
        padding: "4px 10px", fontSize: "11px", fontWeight: "700", flexShrink: 0,
      }}>{sub.status}</span>
      <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "11.5px", flexShrink: 0, minWidth: "70px", textAlign: "right" }}>
        {new Date(sub.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
}

function QuickAction({ label, onClick, href }: { label: string; onClick?: () => void; href?: string }) {
  const style: React.CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px", padding: "11px 14px", color: "white", fontSize: "13px", fontWeight: "600",
    cursor: "pointer", textDecoration: "none",
  };
  const arrow = <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#8b8ff5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer" style={style}>{label}{arrow}</a>;
  }
  return <button onClick={onClick} style={style}>{label}{arrow}</button>;
}

function DrawerSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "22px" }}>
      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", marginBottom: "12px" }}>
        {title.toUpperCase()}
      </div>
      {children}
    </div>
  );
}

function DrawerRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", marginBottom: "2px" }}>{label}</div>
      <div style={{ color: "white", fontSize: "13px", lineHeight: "1.5", whiteSpace: "pre-wrap" }}>{value}</div>
    </div>
  );
}

const headerBtnStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "6px",
  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px", padding: "9px 14px", color: "rgba(255,255,255,0.75)",
  fontSize: "12px", fontWeight: "600", cursor: "pointer",
};

const drawerLabel: React.CSSProperties = {
  display: "block", color: "rgba(255,255,255,0.5)", fontSize: "12px", fontWeight: "600", marginBottom: "6px",
};

const drawerInput: React.CSSProperties = {
  width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px", padding: "9px 12px", color: "white", fontSize: "13px", outline: "none",
};
