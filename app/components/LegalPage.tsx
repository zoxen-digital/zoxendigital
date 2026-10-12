import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { COMPANY, LEGAL_DOCS, type LegalDoc } from "@/lib/legal";

// Website routes for each document (portal slugs differ for privacy).
export const LEGAL_ROUTES: Record<string, string> = {
  privacy: "/privacy-policy",
  terms: "/terms",
  "refund-policy": "/refund-policy",
  "data-deletion": "/data-deletion",
};

// Turn the company email and website into links inside plain legal text.
function withLinks(text: string): ReactNode {
  const tokens = [COMPANY.email, COMPANY.website];
  const parts = text.split(new RegExp(`(${tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`));
  return parts.map((part, i) => {
    if (part === COMPANY.email) return <a key={i} href={`mailto:${part}`} className="legal-link">{part}</a>;
    if (part === COMPANY.website) return <a key={i} href={part} className="legal-link">{part.replace(/^https?:\/\//, "")}</a>;
    return part;
  });
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <main>
      <Navbar />
      <section style={{ padding: "150px 24px 90px" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "50px", padding: "8px 16px", marginBottom: "22px" }}>
            <span className="badge-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
            <span className="section-eyebrow">LEGAL</span>
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: "#0f172a", lineHeight: 1.1, marginBottom: "12px" }}>{doc.title}</h1>
          <p style={{ fontSize: "14px", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginBottom: "28px" }}>Last updated: {COMPANY.updated}</p>

          <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)", borderLeft: "4px solid #6366f1", borderRadius: "14px", padding: "18px 22px", marginBottom: "36px" }}>
            <p style={{ fontSize: "16px", color: "#0f172a", lineHeight: 1.7 }}>{withLinks(doc.summary)}</p>
          </div>

          {/* Sections */}
          <div className="legal-card">
            {doc.sections.map((s, i) => (
              <div key={s.h} className="legal-section">
                <h2>
                  <span className="legal-num">{i + 1}</span>
                  {s.h}
                </h2>
                {s.p?.map((t, j) => <p key={j}>{withLinks(t)}</p>)}
                {s.list && (
                  <ul>
                    {s.list.map((t, j) => <li key={j}>{withLinks(t)}</li>)}
                  </ul>
                )}
                {s.after?.map((t, j) => <p key={j}>{withLinks(t)}</p>)}
              </div>
            ))}
          </div>

          {/* Other documents */}
          <div style={{ marginTop: "36px", display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "rgba(15,23,42,0.5)", fontWeight: 600, marginRight: "4px" }}>Other policies:</span>
            {LEGAL_DOCS.filter((d) => d.slug !== doc.slug).map((d) => (
              <a key={d.slug} href={LEGAL_ROUTES[d.slug]} className="legal-chip">{d.title}</a>
            ))}
          </div>
          <p style={{ marginTop: "24px", fontSize: "14px", color: "rgba(15,23,42,0.6)" }}>
            Questions? Email us at <a href={`mailto:${COMPANY.email}`} className="legal-link">{COMPANY.email}</a>.
          </p>
        </div>
      </section>
      <Footer />

      <style>{`
        .legal-card { background: #ffffff; border: 1px solid rgba(15,23,42,0.08); border-radius: 20px; padding: 12px 36px; box-shadow: 0 10px 30px rgba(15,23,42,0.04); }
        .legal-section { padding: 26px 0; border-bottom: 1px solid rgba(15,23,42,0.07); }
        .legal-section:last-child { border-bottom: none; }
        .legal-section h2 { display: flex; align-items: center; gap: 12px; font-size: 19px; font-weight: 800; color: #0f172a; margin-bottom: 14px; }
        .legal-num { flex-shrink: 0; width: 30px; height: 30px; border-radius: 9px; display: inline-flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; color: #4338ca; background: rgba(99,102,241,0.1); }
        .legal-section p { font-size: 15px; line-height: 1.8; color: rgba(15,23,42,0.72); margin-bottom: 12px; }
        .legal-section ul { list-style: none; display: flex; flex-direction: column; gap: 10px; margin: 4px 0 14px; }
        .legal-section li { position: relative; padding-left: 22px; font-size: 15px; line-height: 1.7; color: rgba(15,23,42,0.72); }
        .legal-section li::before { content: ""; position: absolute; left: 4px; top: 10px; width: 7px; height: 7px; border-radius: 50%; background: #6366f1; }
        .legal-link { color: #4f46e5; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; word-break: break-word; }
        .legal-chip { font-size: 13px; font-weight: 600; color: #4338ca; text-decoration: none; background: #ffffff; border: 1px solid rgba(99,102,241,0.3); padding: 7px 14px; border-radius: 50px; transition: all 0.2s; }
        .legal-chip:hover { background: rgba(99,102,241,0.08); }
        @media (max-width: 600px) {
          .legal-card { padding: 4px 18px; border-radius: 16px; }
          .legal-section h2 { font-size: 17px; }
        }
      `}</style>
    </main>
  );
}
