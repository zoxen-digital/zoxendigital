"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ProjectModal from "./ProjectModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { label: string; href: string; dropdown?: boolean }[] = [
    { label: "Home", href: isHome ? "#home" : "/" },
    { label: "Services", href: "/services" },
    { label: "Web Development", href: "/web-development" },
    { label: "Client Portal", href: isHome || pathname === "/web-development" ? "#portal" : "/#portal" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <>
    <nav
      style={{
        position: "fixed",
        top: scrolled ? "16px" : 0,
        left: scrolled ? "24px" : 0,
        right: scrolled ? "24px" : 0,
        zIndex: 100,
        height: "68px",
        background: scrolled ? "rgba(255,255,255,0.95)" : "#ffffff",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: scrolled ? "1px solid rgba(15,23,42,0.1)" : "1px solid rgba(15,23,42,0.06)",
        borderRadius: scrolled ? "20px" : 0,
        boxShadow: scrolled ? "0 8px 32px rgba(15,23,42,0.1)" : "0 1px 0 rgba(15,23,42,0.04)",
        transition: "all 0.3s ease",
      }}
      className="navbar"
    >
      <div style={{
        maxWidth: "1320px",
        margin: "0 auto",
        height: "100%",
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", height: "40px" }}>
          <div style={{ height: "40px", width: "40px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <img src="/main-logo-dark.png" alt="Zoxen Digital" style={{ display: "block", maxHeight: "34px", maxWidth: "40px", objectFit: "contain" }} />
          </div>
          <span style={{ fontSize: "19px", fontWeight: "800", lineHeight: "40px", whiteSpace: "nowrap" }}>
            <span style={{ color: "#0f172a" }}>Zoxen</span>&nbsp;
            <span style={{ color: "#4f46e5" }}>Digital</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden-mobile">
          {navLinks.map((link) => {
            const isActive = link.label === "Home" ? isHome : link.href === pathname;
            return (
              <a
                key={link.label}
                href={link.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  color: isActive ? "#0f172a" : "#334155",
                  fontSize: "14px",
                  fontWeight: "600",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  borderBottom: isActive ? "2px solid #6366f1" : "none",
                  paddingBottom: "2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0f172a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "#0f172a" : "#334155")}
              >
                {link.label}
                {link.dropdown && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button type="button" onClick={() => setProjectOpen(true)} className="btn-primary hidden-mobile" style={{ fontSize: "14px", padding: "10px 22px", gap: "8px" }}>
            Start Your Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "rgba(15,23,42,0.05)",
              border: "1px solid rgba(15,23,42,0.13)",
              borderRadius: "12px",
              cursor: "pointer",
              padding: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="show-mobile"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 12px)",
          left: 0,
          right: 0,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(15,23,42,0.1)",
          borderRadius: "18px",
          boxShadow: "0 8px 32px rgba(15,23,42,0.09)",
          padding: "20px 28px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "rgba(15,23,42,0.83)", fontSize: "15px", textDecoration: "none" }}
            >
              {link.label}
              {link.dropdown && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </a>
          ))}
          <button
            type="button"
            className="btn-primary"
            onClick={() => { setMenuOpen(false); setProjectOpen(true); }}
            style={{ fontSize: "14px", padding: "10px 22px", justifyContent: "center", gap: "8px" }}
          >
            Start Your Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      )}

      <style>{`
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .navbar {
            top: 16px !important;
            left: 16px !important;
            right: 16px !important;
            height: 60px !important;
            background: rgba(255,255,255,0.85) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(15,23,42,0.1) !important;
            border-radius: 18px !important;
          }
          .navbar > div { padding: 0 18px !important; }
        }
      `}</style>
    </nav>
    <ProjectModal open={projectOpen} onClose={() => setProjectOpen(false)} />
    </>
  );
}
