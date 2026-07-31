"use client";
import { useEffect, useRef } from "react";
import Reveal from "./Reveal";

export default function Services() {
  const services = [
    {
      statLabel: "SITES BUILT",
      statValue: "150+",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <polyline points="16 18 22 12 16 6" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="8 6 2 12 8 18" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Web Development",
      desc: "Fast, secure and scalable websites built with the latest technologies.",
    },
    {
      statLabel: "TIME SAVED",
      statValue: "80%",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="7" width="16" height="13" rx="2" stroke="#6366f1" strokeWidth="2" />
          <path d="M8 7V5a1 1 0 011-1h6a1 1 0 011 1v2" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
          <circle cx="9" cy="13" r="1" fill="#6366f1" />
          <circle cx="15" cy="13" r="1" fill="#6366f1" />
        </svg>
      ),
      title: "AI & Automations",
      desc: "Smart automation systems that save time, reduce manual work and scale your business.",
    },
    {
      statLabel: "ROI",
      statValue: "+300%",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path d="M3 11l18-7-7 18-2-8-9-3z" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
      title: "Paid Advertising",
      desc: "High-converting Meta, Google & TikTok ads that bring quality leads and maximize ROI.",
    },
    {
      statLabel: "BRANDS",
      statValue: "300+",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#6366f1" strokeWidth="2" />
          <circle cx="9" cy="9" r="1.2" fill="#6366f1" />
          <circle cx="15" cy="9" r="1.2" fill="#6366f1" />
          <circle cx="9" cy="14.5" r="1.2" fill="#6366f1" />
          <path d="M12 17a3 3 0 003-3h-6a3 3 0 003 3z" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
      title: "Design & Branding",
      desc: "Eye-catching creatives, brand identity and visual systems that make you stand out.",
    },
    {
      statLabel: "VIEWS",
      statValue: "5M+",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="6" width="14" height="12" rx="2" stroke="#6366f1" strokeWidth="2" />
          <path d="M16 10l6-3v10l-6-3" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
      title: "Video Editing & Production",
      desc: "Professional video editing, production and visual content that engages and converts.",
    },
    {
      statLabel: "ENGAGEMENT",
      statValue: "+180%",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />
          <polyline points="14 2 14 8 20 8" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />
          <line x1="8" y1="13" x2="16" y2="13" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="17" x2="13" y2="17" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      title: "Content Strategy",
      desc: "Research-led content planning that tells your brand story and drives measurable growth.",
    },
    {
      statLabel: "FOLLOWERS",
      statValue: "+320%",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <circle cx="18" cy="5" r="3" stroke="#6366f1" strokeWidth="2" />
          <circle cx="6" cy="12" r="3" stroke="#6366f1" strokeWidth="2" />
          <circle cx="18" cy="19" r="3" stroke="#6366f1" strokeWidth="2" />
          <line x1="8.6" y1="10.6" x2="15.4" y2="6.4" stroke="#6366f1" strokeWidth="2" />
          <line x1="8.6" y1="13.4" x2="15.4" y2="17.6" stroke="#6366f1" strokeWidth="2" />
        </svg>
      ),
      title: "Social Media Management",
      desc: "Convert followers into customers with tested social strategies and consistent content.",
    },
  ];

  const loop = [...services, ...services];

  const viewportRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let raf: number;

    function tick() {
      if (el && !draggingRef.current && !pausedRef.current) {
        el.scrollLeft += 0.6;
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function scheduleResume() {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 2500);
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = viewportRef.current;
    if (!el) return;
    draggingRef.current = true;
    pausedRef.current = true;
    startXRef.current = e.clientX;
    startScrollRef.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    const el = viewportRef.current;
    if (!el) return;
    const delta = e.clientX - startXRef.current;
    el.scrollLeft = startScrollRef.current - delta;
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const el = viewportRef.current;
    draggingRef.current = false;
    if (el) {
      el.style.cursor = "grab";
      try { el.releasePointerCapture(e.pointerId); } catch {}
    }
    scheduleResume();
  }

  return (
    <section
      id="services"
      style={{
        padding: "100px 0",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px",
        height: "400px",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", padding: "0 80px" }}>
        {/* Header */}
        <Reveal>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p className="section-eyebrow" style={{ marginBottom: "14px" }}>SERVICES</p>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: "800", color: "white", marginBottom: "16px" }}>
            What We Can Do For You
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "16px", maxWidth: "480px", margin: "0 auto", lineHeight: "1.7" }}>
            We offer end-to-end digital solutions to build your brand and grow your business.
          </p>
        </div>
        </Reveal>
      </div>

      {/* Marquee */}
      <div
        ref={viewportRef}
        className="services-marquee-viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={(e) => draggingRef.current && onPointerUp(e)}
      >
        <div className="services-marquee-track">
          {loop.map((s, i) => (
            <div key={i} className="service-card">
              {/* Stat badge */}
              <div className="service-stat-badge">
                <span className="service-stat-label">{s.statLabel}</span>
                <span className="service-stat-value">{s.statValue}</span>
              </div>

              {/* Icon + light beam + platform */}
              <div className="service-icon-stage">
                <div className="service-light-beam" />
                <div className="service-icon">{s.icon}</div>
                <div className="service-platform" />
              </div>

              <h3 style={{ fontSize: "19px", fontWeight: "700", color: "white", marginBottom: "12px" }}>
                {s.title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", lineHeight: "1.7", marginBottom: "26px" }}>
                {s.desc}
              </p>

              {/* Learn More */}
              <div className="service-learn-more">
                <span>LEARN MORE</span>
                <div className="service-arrow-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-marquee-viewport {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          cursor: grab;
          touch-action: pan-y;
          scrollbar-width: none;
          -webkit-mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent);
          mask-image: linear-gradient(90deg, transparent, black 6%, black 94%, transparent);
        }
        .services-marquee-viewport::-webkit-scrollbar {
          display: none;
        }
        .services-marquee-track {
          display: flex;
          gap: 24px;
          width: max-content;
        }
        .service-card {
          position: relative;
          flex: 0 0 260px;
          background: linear-gradient(180deg, rgba(30,27,60,0.55) 0%, rgba(10,10,20,0.75) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 44px 24px 32px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #6366f1, transparent);
          opacity: 0.6;
        }
        .service-card:hover {
          border-color: rgba(99,102,241,0.5);
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(99,102,241,0.25);
        }
        .service-stat-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px solid rgba(99,102,241,0.35);
          background: rgba(99,102,241,0.12);
          border-radius: 10px;
          padding: 6px 12px;
        }
        .service-stat-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.4);
        }
        .service-stat-value {
          font-size: 14px;
          font-weight: 800;
          color: #8b8ff5;
        }
        .service-icon-stage {
          position: relative;
          width: 100%;
          height: 130px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 16px;
        }
        .service-light-beam {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 100%;
          background: linear-gradient(180deg, rgba(99,102,241,0.35), rgba(99,102,241,0));
          filter: blur(8px);
        }
        .service-icon {
          position: relative;
          z-index: 1;
          margin-bottom: 20px;
          filter: drop-shadow(0 0 10px rgba(99,102,241,0.7));
        }
        .service-platform {
          width: 90px;
          height: 26px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(99,102,241,0.35) 0%, rgba(99,102,241,0.05) 70%, transparent 100%);
          border: 1px solid rgba(99,102,241,0.3);
        }
        .service-learn-more {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #6366f1;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .service-arrow-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 768px) {
          #services { padding: 70px 0 !important; }
          #services > div { padding: 0 24px !important; }
        }
      `}</style>
    </section>
  );
}
