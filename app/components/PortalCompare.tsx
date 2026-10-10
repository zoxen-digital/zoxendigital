"use client";
import Reveal from "./Reveal";

const oldWay = [
  "Updates lost in long WhatsApp chats",
  "Calling again and again to ask \"what's the status?\"",
  "Files, logos and content scattered everywhere",
  "Approvals and change requests get forgotten",
  "Invoices buried in email threads",
];

const zoxenWay = [
  "One dedicated chat for your project",
  "Live project stage you can check 24/7",
  "Every file and document in one place",
  "One-click approval with a clear record",
  "Invoices and payments tracked in your portal",
];

const stats = [
  { value: "24/7", label: "Access to your project" },
  { value: "1", label: "Login for everything" },
  { value: "0", label: "Lost messages or files" },
];

export default function PortalCompare() {
  return (
    <section id="portal-compare" style={{ padding: "40px 80px 110px", position: "relative" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 56px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "50px", padding: "8px 16px", marginBottom: "24px" }}>
              <span className="badge-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
              <span className="section-eyebrow">WHY IT MATTERS</span>
            </div>
            <h2 style={{ fontSize: "clamp(28px, 3.8vw, 44px)", fontWeight: "800", color: "#0f172a", lineHeight: "1.15", marginBottom: "16px" }}>
              No More Chasing Updates. <span className="gradient-text">Just Clarity.</span>
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(15,23,42,0.65)", lineHeight: "1.7" }}>
              Most agencies run projects on WhatsApp and email. We built a proper system so you always know where your project stands.
            </p>
          </div>
        </Reveal>

        <div className="compare-grid">
          {/* Old way */}
          <Reveal delay={0.05}>
            <div className="compare-card old">
              <div className="compare-head">
                <span className="compare-tag old">The Old Way</span>
                <span style={{ fontSize: "13px", color: "rgba(15,23,42,0.5)", fontWeight: 600 }}>Most agencies</span>
              </div>
              <ul>
                {oldWay.map((t, i) => (
                  <li key={t} style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                    <span className="compare-icon old">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" /></svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* VS badge */}
          <div className="compare-vs">VS</div>

          {/* Zoxen way */}
          <Reveal delay={0.15}>
            <div className="compare-card new">
              <div className="compare-head">
                <span className="compare-tag new">The Zoxen Way</span>
                <span style={{ fontSize: "13px", color: "#4338ca", fontWeight: 700 }}>Client Portal</span>
              </div>
              <ul>
                {zoxenWay.map((t, i) => (
                  <li key={t} style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
                    <span className="compare-icon new">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Stats strip */}
        <Reveal delay={0.2}>
          <div className="compare-stats">
            {stats.map((s) => (
              <div key={s.label} className="compare-stat">
                <div className="gradient-text" style={{ fontSize: "38px", fontWeight: 800, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "13px", color: "rgba(15,23,42,0.6)", fontWeight: 600, marginTop: "8px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .compare-grid { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: stretch; }
        .compare-grid > div { height: 100%; }
        .compare-card { height: 100%; border-radius: 20px; padding: 30px; transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .compare-card.old { background: #f8fafc; border: 1px dashed rgba(15,23,42,0.18); }
        .compare-card.new {
          position: relative; background: #ffffff;
          border: 1.5px solid transparent;
          background: linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(var(--angle, 135deg), #6366f1, #7c3aed, #3b82f6, #6366f1) border-box;
          box-shadow: 0 24px 60px rgba(79,70,229,0.16);
          animation: spin-border 6s linear infinite;
        }
        .compare-card.new:hover { transform: translateY(-4px); box-shadow: 0 30px 70px rgba(79,70,229,0.24); }
        @property --angle { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @keyframes spin-border { to { --angle: 360deg; } }
        .compare-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
        .compare-tag { font-size: 12px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; padding: 6px 12px; border-radius: 50px; }
        .compare-tag.old { color: #b91c1c; background: rgba(220,38,38,0.08); border: 1px solid rgba(220,38,38,0.2); }
        .compare-tag.new { color: #ffffff; background: linear-gradient(135deg, #6366f1, #4f46e5); box-shadow: 0 6px 16px rgba(79,70,229,0.3); }
        .compare-card ul { list-style: none; display: flex; flex-direction: column; gap: 14px; }
        .compare-card li { display: flex; align-items: flex-start; gap: 12px; font-size: 15px; line-height: 1.5; animation: fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both; }
        .compare-card.old li { color: rgba(15,23,42,0.55); }
        .compare-card.new li { color: #0f172a; font-weight: 600; }
        .compare-icon { flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-top: 1px; }
        .compare-icon.old { background: rgba(220,38,38,0.1); }
        .compare-icon.new { background: linear-gradient(135deg, #6366f1, #4f46e5); box-shadow: 0 4px 10px rgba(79,70,229,0.3); }
        .compare-vs {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 2;
          width: 52px; height: 52px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 800; color: #4338ca; background: #ffffff;
          border: 1px solid rgba(99,102,241,0.3); box-shadow: 0 10px 26px rgba(79,70,229,0.2);
        }
        .compare-stats {
          margin-top: 40px; display: grid; grid-template-columns: repeat(3, 1fr);
          background: #ffffff; border: 1px solid rgba(15,23,42,0.08); border-radius: 18px;
          box-shadow: 0 10px 30px rgba(15,23,42,0.05);
        }
        .compare-stat { text-align: center; padding: 26px 16px; }
        .compare-stat + .compare-stat { border-left: 1px solid rgba(15,23,42,0.08); }

        @media (max-width: 860px) {
          #portal-compare { padding: 30px 20px 80px !important; }
          .compare-grid { grid-template-columns: 1fr; gap: 44px; }
          .compare-stats { grid-template-columns: 1fr; }
          .compare-stat + .compare-stat { border-left: none; border-top: 1px solid rgba(15,23,42,0.08); }
        }
      `}</style>
    </section>
  );
}
