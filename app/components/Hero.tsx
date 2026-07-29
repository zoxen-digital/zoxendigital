"use client";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="home"
      className="hero-section"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(5,5,15,0.7) 40%, rgba(10,10,26,0.75) 70%, rgba(0,0,0,0.85) 100%), url('/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        padding: "120px 80px 80px",
      }}
    >
      {/* Background Stars */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              background: "white",
              borderRadius: "50%",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.6 + 0.1,
              animation: `glow ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 3 + "s",
            }}
          />
        ))}
      </div>

      {/* Purple Glow Blobs */}
      <div style={{
        position: "absolute",
        top: "10%",
        right: "5%",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        borderRadius: "50%",
        zIndex: 0,
      }} />
      <div style={{
        position: "absolute",
        bottom: "0%",
        left: "20%",
        width: "400px",
        height: "400px",
        background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        zIndex: 0,
      }} />

      {/* Content */}
      <div style={{ display: "flex", alignItems: "center", width: "100%", maxWidth: "1280px", margin: "0 auto", gap: "60px", zIndex: 1, position: "relative" }}>
        {/* Left */}
        <div style={{ flex: "1", maxWidth: "560px" }}>
          {/* Badge */}
          <Reveal delay={0}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(99,102,241,0.1)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "50px",
            padding: "8px 16px",
            marginBottom: "28px",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="#6366f1" strokeWidth="2" fill="rgba(99,102,241,0.3)" />
            </svg>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: "600", letterSpacing: "1px" }}>WEB DESIGN & DEVELOPMENT AGENCY</span>
          </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={0.1}>
          <h1 style={{ fontSize: "clamp(42px, 5vw, 68px)", fontWeight: "800", lineHeight: "1.05", marginBottom: "20px", color: "white" }}>
            Websites That{" "}
            <span className="gradient-text">Elevate Brands.</span>
          </h1>
          </Reveal>

          <Reveal delay={0.2}>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)", lineHeight: "1.7", marginBottom: "32px", maxWidth: "440px" }}>
            At Zoxen Digital, we build fast, modern and conversion-focused websites that help businesses stand out and grow online.
          </p>
          </Reveal>

          {/* Feature Pills */}
          <Reveal delay={0.3}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "36px" }}>
            {[
              { icon: <MonitorIcon />, label: "Modern Design" },
              { icon: <BoltIcon />, label: "Lightning Fast" },
              { icon: <SearchIcon />, label: "SEO Optimized" },
              { icon: <TargetIcon />, label: "Built to Convert" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                {item.icon}
                <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", fontWeight: "500" }}>{item.label}</span>
              </div>
            ))}
          </div>
          </Reveal>

          {/* Buttons */}
          <Reveal delay={0.4}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "44px" }}>
            <a href="#contact" className="btn-primary">
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#portfolio" className="btn-secondary">
              View Our Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
          </Reveal>

        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-visual { display: none !important; }
        }
        @media (max-width: 768px) {
          section#home { padding: 100px 24px 160px !important; }
          .stats-bar > div { padding: 16px 12px !important; gap: 8px !important; }
          .hero-section { background-image: linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(5,5,15,0.7) 40%, rgba(10,10,26,0.75) 70%, rgba(0,0,0,0.85) 100%), url('/mobile-hero.png') !important; }
        }
      `}</style>
    </section>
  );
}

// SVG Icons
function MonitorIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#6366f1" strokeWidth="2" /><path d="M8 21h8M12 17v4" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" /></svg>;
}
function BoltIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" /></svg>;
}
function SearchIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#6366f1" strokeWidth="2" /><path d="M21 21l-4.35-4.35" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" /></svg>;
}
function TargetIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" /></svg>;
}
