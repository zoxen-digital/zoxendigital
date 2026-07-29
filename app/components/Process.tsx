"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Confirm Your Spot with Payment",
      desc: "Secure your place with a simple payment to kick things off.",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M9 3h6a1 1 0 011 1v1H8V4a1 1 0 011-1z" stroke="#8b8ff5" strokeWidth="2" strokeLinejoin="round" />
          <path d="M6 5h12a1 1 0 011 1v13a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="#8b8ff5" strokeWidth="2" strokeLinejoin="round" />
          <path d="M9 11h6M9 15h4" stroke="#8b8ff5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Fill Out the Form",
      desc: "Tell us about your project and goals. Takes about 5 minutes.",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="#8b8ff5" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke="#8b8ff5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "We Build Your Website",
      desc: "Our team gets started on your website within 24-48 hrs.",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <polyline points="16 18 22 12 16 6" stroke="#8b8ff5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="8 6 2 12 8 18" stroke="#8b8ff5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      num: "04",
      title: "Review and Approve",
      desc: "See the design before it goes live. Same day feedback.",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 19l7-7 3 3-7 7-3-3z" stroke="#8b8ff5" strokeWidth="2" strokeLinejoin="round" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" stroke="#8b8ff5" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="9" cy="9" r="1.5" stroke="#8b8ff5" strokeWidth="2" />
        </svg>
      ),
    },
    {
      num: "05",
      title: "Your Site Goes Live",
      desc: "We connect your domain and launch your site within hours.",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" stroke="#8b8ff5" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" stroke="#8b8ff5" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [linePath, setLinePath] = useState<string[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function computePath() {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const points = nodeRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 };
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - containerRect.left,
          y: r.top + r.height / 2 - containerRect.top,
        };
      });

      const segments: string[] = [];
      for (let i = 0; i < points.length - 1; i++) {
        const a = points[i];
        const b = points[i + 1];
        const midX = (a.x + b.x) / 2;
        segments.push(`M${a.x},${a.y} C${midX},${a.y} ${midX},${b.y} ${b.x},${b.y}`);
      }
      setLinePath(segments);
      setSvgSize({ width: containerRect.width, height: containerRect.height });
    }

    computePath();
    window.addEventListener("resize", computePath);
    const t = setTimeout(computePath, 300);
    return () => {
      window.removeEventListener("resize", computePath);
      clearTimeout(t);
    };
  }, []);

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
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        {/* Header */}
        <Reveal>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
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
          <h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: "800", color: "white", marginBottom: "20px", lineHeight: "1.15" }}>
            A Process Built For <span className="gradient-text">Clarity</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", maxWidth: "560px", margin: "0 auto", lineHeight: "1.7" }}>
            Five proven steps that keep every project on time, on budget and aligned with your goals.
          </p>
        </div>
        </Reveal>

        {/* Zigzag Timeline */}
        <div ref={containerRef} className="process-zigzag" style={{ position: "relative", display: "flex", marginTop: "80px" }}>
          {/* Connector line */}
          {svgSize.width > 0 && (
            <svg
              className="process-line"
              width={svgSize.width}
              height={svgSize.height}
              style={{ position: "absolute", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }}
            >
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 z" fill="#6366f1" />
                </marker>
              </defs>
              {linePath.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeDasharray="7 7"
                  opacity="0.55"
                  markerEnd="url(#arrow)"
                />
              ))}
            </svg>
          )}

          {steps.map((step, i) => {
            const isUpper = i % 2 === 0;
            return (
              <div key={i} className={`process-col ${isUpper ? "upper" : "lower"}`}>
                {!isUpper && (
                  <div className="process-text">
                    <div className="process-num">{step.num}</div>
                    <h3 className="process-title">{step.title}</h3>
                    <p className="process-desc">{step.desc}</p>
                  </div>
                )}

                <div className="process-node-wrap">
                  <div
                    className="process-node"
                    ref={(el) => {
                      nodeRefs.current[i] = el;
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                {isUpper && (
                  <div className="process-text">
                    <div className="process-num">{step.num}</div>
                    <h3 className="process-title">{step.title}</h3>
                    <p className="process-desc">{step.desc}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .process-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          z-index: 1;
          animation: process-fade-in 0.8s ease both;
        }
        .process-col:nth-child(2) { animation-delay: 0.1s; }
        .process-col:nth-child(3) { animation-delay: 0.2s; }
        .process-col:nth-child(4) { animation-delay: 0.3s; }
        .process-col:nth-child(5) { animation-delay: 0.4s; }
        @keyframes process-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .process-node {
          animation: process-pulse 2.5s ease-in-out infinite;
        }
        @keyframes process-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(99,102,241,0.35), 0 0 20px rgba(139,92,246,0.15); }
          50% { box-shadow: 0 0 42px rgba(99,102,241,0.55), 0 0 30px rgba(139,92,246,0.3); }
        }
        .process-col.lower {
          margin-top: 130px;
        }
        .process-node-wrap {
          position: relative;
          margin: 20px 0;
        }
        .process-node {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: #0a0a12;
          border: 1.5px solid rgba(99,102,241,0.5);
          box-shadow: 0 0 30px rgba(99,102,241,0.35), 0 0 20px rgba(139,92,246,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .process-num {
          font-size: 26px;
          font-weight: 800;
          color: white;
          margin-bottom: 6px;
        }
        .process-title {
          font-size: 18px;
          font-weight: 700;
          color: white;
          margin-bottom: 10px;
          max-width: 220px;
        }
        .process-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
          max-width: 220px;
        }
        @media (max-width: 900px) {
          #process { padding: 70px 24px !important; }
          .process-zigzag { flex-direction: column !important; gap: 48px !important; }
          .process-col.lower { margin-top: 0 !important; }
          .process-line { display: none !important; }
        }
      `}</style>
    </section>
  );
}
