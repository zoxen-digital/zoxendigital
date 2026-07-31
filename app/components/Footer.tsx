"use client";
import Reveal from "./Reveal";

export default function Footer() {
  const links = {
    Company: ["About Us", "Portfolio", "Process", "Automation", "Contact"],
    Services: ["Web Design", "Web Development", "SEO Optimization", "Website Maintenance"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer style={{
      background: "transparent",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "64px 80px 32px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top */}
        <Reveal y={16} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "48px", marginBottom: "56px" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="#6366f1" strokeWidth="1.5" />
                <ellipse cx="20" cy="20" rx="18" ry="7" stroke="#6366f1" strokeWidth="1.5" transform="rotate(-30 20 20)" />
                <text x="20" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="800" fontFamily="sans-serif">OX</text>
              </svg>
              <div>
                <div style={{ fontSize: "15px", fontWeight: "800", color: "white", letterSpacing: "2px" }}>ZOXEN</div>
                <div style={{ fontSize: "8px", color: "#6366f1", letterSpacing: "4px" }}>DIGITAL</div>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", lineHeight: "1.8", marginBottom: "24px", maxWidth: "260px" }}>
              Building fast, modern, and conversion-focused websites that help businesses stand out and grow online.
            </p>
            {/* Social Icons */}
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { name: "Twitter/X", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                { name: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
                { name: "Instagram", path: "M17.5 6.5h.01M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 110 10A5 5 0 0112 7z" },
              ].map((social) => (
                <div
                  key={social.name}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.15)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={social.path} />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 style={{ color: "white", fontSize: "13px", fontWeight: "700", marginBottom: "20px", letterSpacing: "1px" }}>{section.toUpperCase()}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </Reveal>

        {/* Bottom */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>
            © {new Date().getFullYear()} Zoxen Digital. All rights reserved.
          </p>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>
            Crafted with precision for growth-focused businesses.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
          footer { padding: 48px 24px 24px !important; }
        }
        @media (max-width: 480px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
