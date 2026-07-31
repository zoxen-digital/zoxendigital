"use client";
import Reveal from "./Reveal";

export default function Automation() {
  const leftNodes = [
    {
      label: "CRM",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="5" rx="8" ry="3" stroke="#8b8ff5" strokeWidth="2" />
          <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#8b8ff5" strokeWidth="2" />
          <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#8b8ff5" strokeWidth="2" />
        </svg>
      ),
    },
    {
      label: "Leads",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="7" r="4" stroke="#8b8ff5" strokeWidth="2" />
          <path d="M2 21v-2a5 5 0 015-5h4a5 5 0 015 5v2" stroke="#8b8ff5" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 8a3 3 0 010 6M21 21v-2a4 4 0 00-3-3.87" stroke="#8b8ff5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Web Forms",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#8b8ff5" strokeWidth="2" strokeLinejoin="round" />
          <polyline points="14 2 14 8 20 8" stroke="#8b8ff5" strokeWidth="2" strokeLinejoin="round" />
          <line x1="9" y1="13" x2="15" y2="13" stroke="#8b8ff5" strokeWidth="2" strokeLinecap="round" />
          <line x1="9" y1="17" x2="13" y2="17" stroke="#8b8ff5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const rightNodes = [
    {
      label: "WhatsApp",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#8b8ff5">
          <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.35A10 10 0 1012 2zm0 18.15a8.13 8.13 0 01-4.15-1.14l-.3-.18-3 .81.8-2.93-.2-.31A8.15 8.15 0 1112 20.15zm4.48-6.12c-.24-.12-1.44-.71-1.66-.79s-.39-.12-.55.12-.63.79-.77.95-.29.18-.53.06a6.6 6.6 0 01-1.95-1.2 7.3 7.3 0 01-1.35-1.68c-.14-.24 0-.37.12-.5s.28-.32.42-.48a.6.6 0 00.1-.6c-.05-.12-.5-1.2-.68-1.64s-.37-.38-.51-.39h-.44a.85.85 0 00-.6.28 2.6 2.6 0 00-.8 1.93 4.5 4.5 0 00.95 2.38 10.3 10.3 0 003.94 3.47 4.5 4.5 0 002.24.59 1.9 1.9 0 001.57-.75 1.55 1.55 0 00.36-.99c0-.2-.06-.31-.3-.43z" />
        </svg>
      ),
    },
    {
      label: "Email",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#8b8ff5" strokeWidth="2" />
          <polyline points="22 6 12 13 2 6" stroke="#8b8ff5" strokeWidth="2" />
        </svg>
      ),
    },
    {
      label: "Sales",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#8b8ff5" strokeWidth="2" />
          <path d="M12 6v12M15 9.5c0-1.38-1.34-2.5-3-2.5s-3 1.12-3 2.5S10.34 12 12 12s3 1.12 3 2.5-1.34 2.5-3 2.5-3-1.12-3-2.5" stroke="#8b8ff5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="automation"
      style={{
        padding: "100px 80px",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="automation-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" }}>
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
              <span className="section-eyebrow">AI &amp; AUTOMATION</span>
            </div>

            <h2 style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: "800", color: "white", lineHeight: "1.1", marginBottom: "24px" }}>
              Work <span className="gradient-text">Smarter.</span><br />
              Scale <span className="gradient-text">Faster.</span>
            </h2>

            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "16px", lineHeight: "1.8", marginBottom: "36px", maxWidth: "440px" }}>
              Our AI-powered automation systems handle repetitive tasks, nurture leads, and keep your business running on autopilot.
            </p>

            <a href="#contact" className="btn-primary">
              Explore Automation
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
          </Reveal>

          {/* Right - Network diagram (desktop) */}
          <Reveal delay={0.15} className="automation-diagram automation-diagram-desktop" style={{ position: "relative", height: "420px" }}>
            <svg viewBox="0 0 600 420" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              <path id="line-l1" d="M0,95 C150,95 260,210 300,210" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.5" />
              <path id="line-l2" d="M0,215 C150,215 260,210 300,210" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.5" />
              <path id="line-l3" d="M0,335 C150,335 260,210 300,210" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.5" />
              <path id="line-r1" d="M600,95 C450,95 340,210 300,210" fill="none" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.5" />
              <path id="line-r2" d="M600,215 C450,215 340,210 300,210" fill="none" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.5" />
              <path id="line-r3" d="M600,335 C450,335 340,210 300,210" fill="none" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.5" />

              {["line-l1", "line-l2", "line-l3"].map((id, i) => (
                <circle key={id} r="4" fill="#6366f1">
                  <animateMotion dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${id}`} />
                  </animateMotion>
                </circle>
              ))}
              {["line-r1", "line-r2", "line-r3"].map((id, i) => (
                <circle key={id} r="4" fill="#8b5cf6">
                  <animateMotion dur="3.2s" begin={`${i * 0.5 + 0.25}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${id}`} />
                  </animateMotion>
                </circle>
              ))}
            </svg>

            {/* Center brain node */}
            <div className="automation-center">
              <div className="automation-center-ring" />
              <div className="automation-center-core">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3c-2 0-3.5 1.3-3.5 3 0 .6.2 1.1.5 1.5-1 .3-1.7 1.2-1.7 2.3 0 .7.3 1.3.8 1.8-.9.4-1.6 1.4-1.6 2.5 0 1.5 1.2 2.7 2.7 2.9.2 1.3 1.3 2.3 2.6 2.3s2.5-1 2.6-2.3c1.5-.2 2.7-1.4 2.7-2.9 0-1.1-.7-2.1-1.6-2.5.5-.5.8-1.1.8-1.8 0-1.1-.7-2-1.7-2.3.3-.4.5-.9.5-1.5C15.5 4.3 14 3 12 3z" stroke="#6366f1" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M12 3v16" stroke="#6366f1" strokeWidth="1.6" />
                </svg>
              </div>
            </div>

            {/* Left labels */}
            <div className="automation-node" style={{ top: "70px", left: "0" }}>
              <div className="automation-node-icon">{leftNodes[0].icon}</div>
              <span>{leftNodes[0].label}</span>
            </div>
            <div className="automation-node" style={{ top: "190px", left: "0" }}>
              <div className="automation-node-icon">{leftNodes[1].icon}</div>
              <span>{leftNodes[1].label}</span>
            </div>
            <div className="automation-node" style={{ top: "310px", left: "0" }}>
              <div className="automation-node-icon">{leftNodes[2].icon}</div>
              <span>{leftNodes[2].label}</span>
            </div>

            {/* Right labels */}
            <div className="automation-node" style={{ top: "70px", right: "0" }}>
              <div className="automation-node-icon">{rightNodes[0].icon}</div>
              <span>{rightNodes[0].label}</span>
            </div>
            <div className="automation-node" style={{ top: "190px", right: "0" }}>
              <div className="automation-node-icon">{rightNodes[1].icon}</div>
              <span>{rightNodes[1].label}</span>
            </div>
            <div className="automation-node" style={{ top: "310px", right: "0" }}>
              <div className="automation-node-icon">{rightNodes[2].icon}</div>
              <span>{rightNodes[2].label}</span>
            </div>
          </Reveal>

          {/* Right - Network diagram (mobile) */}
          <Reveal delay={0.15} className="automation-diagram-mobile">
            <div className="automation-center-mobile">
              <div className="automation-center-ring" />
              <div className="automation-center-core">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3c-2 0-3.5 1.3-3.5 3 0 .6.2 1.1.5 1.5-1 .3-1.7 1.2-1.7 2.3 0 .7.3 1.3.8 1.8-.9.4-1.6 1.4-1.6 2.5 0 1.5 1.2 2.7 2.7 2.9.2 1.3 1.3 2.3 2.6 2.3s2.5-1 2.6-2.3c1.5-.2 2.7-1.4 2.7-2.9 0-1.1-.7-2.1-1.6-2.5.5-.5.8-1.1.8-1.8 0-1.1-.7-2-1.7-2.3.3-.4.5-.9.5-1.5C15.5 4.3 14 3 12 3z" stroke="#6366f1" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M12 3v16" stroke="#6366f1" strokeWidth="1.6" />
                </svg>
              </div>
            </div>
            <div className="automation-node-grid">
              {[...leftNodes, ...rightNodes].map((node) => (
                <div key={node.label} className="automation-node automation-node-mobile">
                  <div className="automation-node-icon">{node.icon}</div>
                  <span>{node.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .automation-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 110px;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .automation-center-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(99,102,241,0.25);
          background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
        }
        .automation-center-core {
          position: relative;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: #0a0a12;
          border: 1.5px solid rgba(99,102,241,0.5);
          box-shadow: 0 0 40px rgba(99,102,241,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .automation-node {
          position: absolute;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          background: #0e0e1a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 10px 16px;
          white-space: nowrap;
          box-shadow: 0 8px 20px rgba(0,0,0,0.4);
        }
        .automation-node-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .automation-node span {
          color: white;
          font-size: 14px;
          font-weight: 600;
        }
        .automation-diagram-mobile {
          display: none;
          position: relative;
          flex-direction: column;
          align-items: center;
          gap: 28px;
        }
        .automation-center-mobile {
          position: relative;
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .automation-node-grid {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .automation-node-mobile {
          position: static;
          justify-content: flex-start;
          width: 100%;
        }
        @media (max-width: 900px) {
          #automation { padding: 70px 24px !important; }
          .automation-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .automation-diagram { height: 360px !important; }
        }
        @media (max-width: 600px) {
          .automation-diagram-desktop { display: none !important; }
          .automation-diagram-mobile { display: flex !important; }
        }
        @media (max-width: 420px) {
          .automation-node-grid { grid-template-columns: 1fr; }
          .automation-node span { font-size: 12px; }
          .automation-node { padding: 8px 10px; }
        }
      `}</style>
    </section>
  );
}
