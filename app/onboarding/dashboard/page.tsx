"use client";
import { useEffect, useMemo, useState } from "react";
import type { OnboardingSubmission, SubmissionStatus } from "@/lib/onboarding-types";

const ALL_STATUSES: SubmissionStatus[] = ["New", "In Progress", "Done", "On Hold"];

const STATUS_COLORS: Record<SubmissionStatus, { bg: string; text: string }> = {
  "New": { bg: "rgba(139,143,245,0.15)", text: "#8b8ff5" },
  "In Progress": { bg: "rgba(99,102,241,0.15)", text: "#6366f1" },
  "Done": { bg: "rgba(34,197,94,0.15)", text: "#4ade80" },
  "On Hold": { bg: "rgba(245,158,11,0.15)", text: "#f59e0b" },
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

export default function DashboardPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [items, setItems] = useState<OnboardingSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState<"all" | "month" | "domain">("all");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<OnboardingSubmission | null>(null);
  const [savingDrawer, setSavingDrawer] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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
    if (view === "month") {
      const now = new Date();
      result = result.filter((it) => {
        const d = new Date(it.createdAt);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });
    } else if (view === "domain") {
      result = result.filter((it) => it.domainConnected);
    }
    if (statusFilter !== "All") {
      result = result.filter((it) => it.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (it) =>
          it.businessName?.toLowerCase().includes(q) ||
          it.email?.toLowerCase().includes(q) ||
          it.contactPerson?.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [items, view, statusFilter, search]);

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

  const now = new Date();
  const thisMonthCount = items.filter((it) => {
    const d = new Date(it.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const domainCount = items.filter((it) => it.domainConnected).length;

  const statusCounts: Record<string, number> = { All: items.length };
  ALL_STATUSES.forEach((s) => { statusCounts[s] = items.filter((it) => it.status === s).length; });

  const statCards = [
    { label: "Total", value: items.length, color: "white" },
    { label: "New", value: statusCounts["New"], color: "#8b8ff5" },
    { label: "In Progress", value: statusCounts["In Progress"], color: "#6366f1" },
    { label: "Done", value: statusCounts["Done"], color: "#4ade80" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#08080b", display: "flex", flexDirection: "column" }}>
      {/* Top header */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 28px", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "10px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: "800", fontSize: "16px",
          }}>Z</div>
          <div>
            <div style={{ color: "white", fontSize: "15px", fontWeight: "700" }}>Zoxen Dashboard</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>Onboarding Submissions</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={exportCsv} style={headerBtnStyle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Generate Report
          </button>
          <button onClick={loadData} style={{ ...headerBtnStyle, padding: "9px", width: "38px", justifyContent: "center" }} title="Refresh">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21.5 2v6h-6M2.5 22v-6h6M2.5 11.5a10 10 0 0117.4-6.7L21.5 8M21.5 12.5a10 10 0 01-17.4 6.7L2.5 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button onClick={handleLogout} style={headerBtnStyle}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Sign out
          </button>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <aside style={{
          width: "230px", flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.08)",
          padding: "24px 16px", overflowY: "auto",
        }}>
          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", marginBottom: "10px", paddingLeft: "8px" }}>VIEW</div>
          <SidebarItem label="All Websites" active={view === "all"} onClick={() => setView("all")} />
          <SidebarItem label="This Month" count={thisMonthCount} active={view === "month"} onClick={() => setView("month")} />
          <SidebarItem label="Domain Connected" count={domainCount} active={view === "domain"} onClick={() => setView("domain")} />

          <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", margin: "22px 0 10px", paddingLeft: "8px" }}>STATUS</div>
          <SidebarItem label="All" count={statusCounts.All} active={statusFilter === "All"} onClick={() => setStatusFilter("All")} />
          {ALL_STATUSES.map((s) => (
            <SidebarItem key={s} label={s} count={statusCounts[s]} active={statusFilter === s} onClick={() => setStatusFilter(s)} />
          ))}
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, padding: "24px 28px", overflowY: "auto", minWidth: 0 }}>
          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px", marginBottom: "22px" }}>
            {statCards.map((card) => (
              <div key={card.label} style={{
                background: "#0f0f14", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px", padding: "18px 20px",
              }}>
                <div style={{ color: card.color, fontSize: "26px", fontWeight: "800" }}>{card.value}</div>
                <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", fontWeight: "600", marginTop: "2px" }}>{card.label}</div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: "relative", marginBottom: "20px", maxWidth: "420px" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}>
              <circle cx="11" cy="11" r="7" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search business, name, email..."
              style={{
                width: "100%", background: "#0f0f14", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px", padding: "10px 14px 10px 38px", color: "white", fontSize: "13px", outline: "none",
              }}
            />
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", marginTop: "60px" }}>No submissions found.</p>
          ) : (
            <div style={{ background: "#0f0f14", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", overflow: "hidden" }}>
              <div className="dash-table-row dash-table-head">
                <span>BUSINESS</span>
                <span>CONTACT</span>
                <span>PACKAGE</span>
                <span>DATE</span>
                <span>STATUS</span>
              </div>
              {filtered.map((sub) => {
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
                  </div>
                );
              })}
            </div>
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
          grid-template-columns: 2fr 1.6fr 1fr 0.9fr 1fr;
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
          .dash-table-row { grid-template-columns: 1.5fr 1fr 1fr; }
          .dash-table-row > span:nth-child(3) { display: none; }
        }
      `}</style>
    </div>
  );
}

function SidebarItem({ label, count, active, onClick }: { label: string; count?: number; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: active ? "rgba(99,102,241,0.12)" : "transparent",
        border: "none", borderRadius: "8px", padding: "9px 10px", cursor: "pointer", marginBottom: "2px",
        color: active ? "white" : "rgba(255,255,255,0.55)",
        fontSize: "13px", fontWeight: active ? "700" : "500",
      }}
    >
      <span>{label}</span>
      {count !== undefined && <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>{count}</span>}
    </button>
  );
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
