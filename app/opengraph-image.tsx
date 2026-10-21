import { ImageResponse } from "next/og";

// Share preview image (WhatsApp, Facebook, LinkedIn, X) for every page.
export const alt = "Zoxen Digital: Websites, Ads, SEO & AI for growing businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: "70px 80px", background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 60%, #e0e7ff 100%)", fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #6366f1, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 26, fontWeight: 800 }}>OX</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: "#0f172a", display: "flex" }}>
            Zoxen<span style={{ color: "#4f46e5", marginLeft: 10 }}>Digital</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 800, color: "#0f172a", letterSpacing: -3, lineHeight: 1.05 }}>Your growth. Our code.</div>
          <div style={{ display: "flex", marginTop: 14 }}>
            <div style={{ fontSize: 76, fontWeight: 800, color: "#fff", letterSpacing: -3, padding: "0 22px 8px", borderRadius: 20, background: "linear-gradient(135deg, #6366f1, #7c3aed)" }}>A little AI.</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Websites from $99", "Meta & Google Ads", "SEO", "AI Chatbots"].map((t) => (
            <div key={t} style={{ fontSize: 26, fontWeight: 600, color: "#4338ca", background: "#ffffff", border: "2px solid #c7d2fe", borderRadius: 999, padding: "10px 24px" }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
