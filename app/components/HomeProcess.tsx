"use client";
import Reveal from "./Reveal";

export default function HomeProcess() {
  const steps = [
    {
      num: "01",
      title: "Discovery",
      desc: "We understand your business and audience.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="2" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Strategy",
      desc: "We create a customized plan for growth.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7c.6.5 1 1.2 1 2.05V17h6v-.25c0-.85.4-1.55 1-2.05A7 7 0 0012 2z" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Execution",
      desc: "Our experts execute with precision.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Automation",
      desc: "We automate and streamline for efficiency.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#6366f1" strokeWidth="2" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#6366f1" strokeWidth="2" />
          <path d="M10 6.5h4a3 3 0 013 3V14M14 17.5h-4a3 3 0 01-3-3V10" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      num: "05",
      title: "Scale",
      desc: "We optimize and scale for sustainable growth.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="17 6 23 6 23 12" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="process"
      style={{
        padding: "100px 80px",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
          <span className="section-eyebrow">OUR PROCESS</span>
        </div>
        <h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: "800", color: "white", marginBottom: "64px", lineHeight: "1.15" }}>
          A Proven Roadmap To Your{" "}
          <span className="gradient-text">Growth.</span>
        </h2>

        {/* Timeline */}
        <div className="home-process-timeline" style={{ position: "relative", display: "flex", justifyContent: "space-between", gap: "24px" }}>
          {/* Connector line */}
          <div style={{
            position: "absolute",
            top: "38px",
            left: "38px",
            right: "38px",
            height: "1px",
            background: "linear-gradient(90deg, rgba(99,102,241,0.05), rgba(99,102,241,0.5), rgba(99,102,241,0.05))",
            zIndex: 0,
          }} />

          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.1} style={{ flex: 1 }}>
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{
                width: "76px",
                height: "76px",
                borderRadius: "18px",
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.25)",
                boxShadow: "0 0 30px rgba(99,102,241,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "24px",
              }}>
                {step.icon}
              </div>
              <div style={{ fontSize: "26px", fontWeight: "800", color: "white", marginBottom: "6px" }}>{step.num}</div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "white", marginBottom: "10px" }}>{step.title}</h3>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: "1.6", maxWidth: "180px" }}>{step.desc}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #process { padding: 70px 24px !important; }
          .home-process-timeline { flex-direction: column !important; gap: 40px !important; }
          .home-process-timeline > div:first-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
