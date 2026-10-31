"use client";
import Script from "next/script";
import Reveal from "./Reveal";

export default function Footer() {
  const links: Record<string, { label: string; href: string }[]> = {
    Company: [
      { label: "Client Portal", href: "/#portal" },
      { label: "Process", href: "/#process" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/#contact" },
    ],
    Services: [
      { label: "All Services", href: "/services" },
      { label: "Web Development", href: "/web-development" },
      { label: "AI Agents", href: "/services#ai-agent" },
      { label: "AI & Automation", href: "/services#ai-automation" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
      { label: "Data Deletion", href: "/data-deletion" },
    ],
  };

  return (
    <footer style={{
      background: "transparent",
      borderTop: "1px solid rgba(15,23,42,0.08)",
      padding: "64px 80px 32px",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top */}
        <Reveal y={16} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "48px", marginBottom: "56px" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/main-logo-dark.png" alt="Zoxen Digital" width={64} height={36} style={{ display: "block", height: "36px", width: "auto", objectFit: "contain" }} />
              <div>
                <div style={{ fontSize: "15px", fontWeight: "800", color: "#0f172a", letterSpacing: "2px" }}>ZOXEN</div>
                <div style={{ fontSize: "8px", color: "#6366f1", letterSpacing: "4px" }}>DIGITAL</div>
              </div>
            </div>
            <p style={{ color: "rgba(15,23,42,0.56)", fontSize: "13px", lineHeight: "1.8", marginBottom: "24px", maxWidth: "260px" }}>
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
                    background: "rgba(15,23,42,0.07)",
                    border: "1px solid rgba(15,23,42,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(99,102,241,0.15)"; e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(15,23,42,0.07)"; e.currentTarget.style.borderColor = "rgba(15,23,42,0.1)"; }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(15,23,42,0.65)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={social.path} />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 style={{ color: "#0f172a", fontSize: "13px", fontWeight: "700", marginBottom: "20px", letterSpacing: "1px" }}>{section.toUpperCase()}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{ color: "rgba(15,23,42,0.56)", fontSize: "13px", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(15,23,42,0.77)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(15,23,42,0.56)")}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </Reveal>

        {/* Bottom */}
        <div style={{
          borderTop: "1px solid rgba(15,23,42,0.08)",
          paddingTop: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <p style={{ color: "#64748b", fontSize: "12px" }}>
            © {new Date().getFullYear()} Zoxen Digital. Serving businesses across the United States and Canada.
          </p>
          {/* Google "preferred sources" button on every page; the script loads after the page */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ color: "#64748b", fontSize: "12px" }}>Follow us on Google</span>
            <div google-add-preferred-source-btn="" data-theme="light" data-lang="en" />
          </div>
          <Script src="https://news.google.com/swg/js/v1/publisher.js" strategy="lazyOnload" />
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
