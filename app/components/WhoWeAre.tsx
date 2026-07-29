"use client";
import Reveal from "./Reveal";

export default function WhoWeAre() {
  const features = [
    {
      title: "Result-Driven Design",
      desc: "Every pixel is built to convert",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="5" stroke="#6366f1" strokeWidth="2" />
          <path d="M8.5 13.5L6 22l6-3 6 3-2.5-8.5" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Growth-First Delivery",
      desc: "Built around your goals & KPIs",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="about"
      style={{
        padding: "100px 80px",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="who-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          {/* Left */}
          <Reveal>
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: "50px",
              padding: "8px 16px",
              marginBottom: "24px",
            }}>
              <span className="badge-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
              <span className="section-eyebrow">WHO WE ARE</span>
            </div>

            <h2 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: "800", color: "white", marginBottom: "24px", lineHeight: "1.15" }}>
              A Web Partner <span className="gradient-text">Built for Growth</span>
            </h2>

            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", lineHeight: "1.8", marginBottom: "20px" }}>
              Zoxen Digital blends design and engineering under one roof. We don&apos;t just deliver websites, we build digital experiences that compound your results over time.
            </p>

            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", lineHeight: "1.8", marginBottom: "36px" }}>
              Since day one, we&apos;ve helped <span style={{ color: "#6366f1", fontWeight: "700" }}>50+ businesses</span> launch, grow and modernize. From startups to established brands, our team ships work that feels premium and performs even better.
            </p>

            {/* Feature cards */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {features.map((f, i) => (
                <div key={i} style={{
                  flex: "1",
                  minWidth: "200px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "14px",
                  padding: "20px",
                }}>
                  <div style={{ marginBottom: "10px" }}>{f.icon}</div>
                  <h4 style={{ fontSize: "15px", fontWeight: "700", color: "white", marginBottom: "4px" }}>{f.title}</h4>
                  <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          </Reveal>

          {/* Right */}
          <Reveal delay={0.15}>
          <div>
            <p style={{ textAlign: "right", color: "rgba(255,255,255,0.4)", fontSize: "12px", fontWeight: "700", letterSpacing: "2px", marginBottom: "16px" }}>
              OUR WORK IN MOTION
            </p>
            {/* Laptop-style frame */}
            <div>
              <div style={{
                borderRadius: "16px 16px 0 0",
                overflow: "hidden",
                border: "1px solid rgba(99,102,241,0.2)",
                borderBottom: "none",
                boxShadow: "0 20px 60px rgba(99,102,241,0.15)",
                background: "#000",
              }}>
                <div style={{ height: "22px", background: "#0a0a0a", borderBottom: "1px solid rgba(255,255,255,0.05)" }} />
                <div style={{ width: "100%", aspectRatio: "16 / 10", overflow: "hidden" }}>
                  <img src="/image.png" alt="Zoxen Digital work" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </div>
              <div style={{
                height: "10px",
                background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                borderRadius: "0 0 8px 8px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderTop: "none",
              }} />
            </div>
          </div>
          </Reveal>
        </div>

        {/* Mission & Vision */}
        <div className="mission-vision-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "64px" }}>
          <Reveal>
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "28px",
            display: "flex",
            gap: "18px",
          }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#6366f1" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" stroke="#6366f1" strokeWidth="2" />
                <circle cx="12" cy="12" r="1" fill="#6366f1" />
              </svg>
            </div>
            <div>
              <h4 style={{ fontSize: "18px", fontWeight: "700", color: "white", marginBottom: "8px" }}>Our Mission</h4>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7" }}>
                To empower businesses with websites that are beautiful, fast and built to scale, turning digital presence into real revenue.
              </p>
            </div>
          </div>
          </Reveal>

          <Reveal delay={0.15}>
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "28px",
            display: "flex",
            gap: "18px",
          }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(99,102,241,0.12)",
              border: "1px solid rgba(99,102,241,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" stroke="#6366f1" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h4 style={{ fontSize: "18px", fontWeight: "700", color: "white", marginBottom: "8px" }}>Our Vision</h4>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: "1.7" }}>
                To be the go-to web partner for ambitious brands across the USA & Canada, setting the standard for premium, results-driven work.
              </p>
            </div>
          </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about { padding: 70px 24px !important; }
          .who-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .mission-vision-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
