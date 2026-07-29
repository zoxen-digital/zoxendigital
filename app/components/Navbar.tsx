"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: isHome ? "#home" : "/" },
    { label: "About Us", href: isHome ? "#about" : "/#about" },
    { label: "Services", href: isHome ? "#services" : "/#services", dropdown: true },
    { label: "Web Development", href: "/web-development" },
    { label: "Our Work", href: isHome ? "#portfolio" : "/#portfolio" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: scrolled ? "24px" : "16px",
        left: scrolled ? "24px" : 0,
        right: scrolled ? "24px" : 0,
        zIndex: 100,
        height: "68px",
        background: scrolled ? "rgba(10,10,20,0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        border: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        borderRadius: scrolled ? "20px" : 0,
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.35)" : "none",
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
            <img src="/main-logo.png" alt="Zoxen Digital" style={{ display: "block", maxHeight: "34px", maxWidth: "40px", objectFit: "contain" }} />
          </div>
          <span style={{ fontSize: "19px", fontWeight: "800", lineHeight: "40px", whiteSpace: "nowrap" }}>
            <span style={{ color: "white" }}>Zoxen</span>&nbsp;
            <span style={{ color: "#8b8ff5" }}>Digital</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden-mobile">
          {navLinks.map((link) => {
            const isActive = link.label === "Home" ? isHome : link.label === "Web Development" && pathname === "/web-development";
            return (
              <a
                key={link.label}
                href={link.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  color: isActive ? "white" : "rgba(255,255,255,0.6)",
                  fontSize: "14px",
                  fontWeight: "500",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  borderBottom: isActive ? "2px solid #6366f1" : "none",
                  paddingBottom: "2px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "white" : "rgba(255,255,255,0.6)")}
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
          <a href="#contact" className="btn-primary hidden-mobile" style={{ fontSize: "14px", padding: "10px 22px", gap: "8px" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.67 13 19.79 19.79 0 011.61 4.4 2 2 0 013.6 2.22h3a2 2 0 012 1.72 12.8 12.8 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.18 6.18l.97-.97a2 2 0 012.11-.45 12.8 12.8 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Book Strategy
          </a>
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              cursor: "pointer",
              padding: "10px",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="show-mobile"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
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
          background: "rgba(10,10,20,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "18px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
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
              style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "rgba(255,255,255,0.8)", fontSize: "15px", textDecoration: "none" }}
            >
              {link.label}
              {link.dropdown && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary"
            onClick={() => setMenuOpen(false)}
            style={{ fontSize: "14px", padding: "10px 22px", justifyContent: "center", gap: "8px" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.67 13 19.79 19.79 0 011.61 4.4 2 2 0 013.6 2.22h3a2 2 0 012 1.72 12.8 12.8 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.18 6.18l.97-.97a2 2 0 012.11-.45 12.8 12.8 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Book Strategy
          </a>
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
            background: rgba(10,10,20,0.75) !important;
            backdrop-filter: blur(20px) !important;
            -webkit-backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            border-radius: 18px !important;
          }
          .navbar > div { padding: 0 18px !important; }
        }
      `}</style>
    </nav>
  );
}
