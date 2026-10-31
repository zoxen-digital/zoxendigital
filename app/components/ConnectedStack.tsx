"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Reveal from "./Reveal";

const I = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

type Service = { tag: string; title: string; href: string; icon: ReactNode };

const left: Service[] = [
  { tag: "AI AGENT", title: "AI Agent", href: "/services#ai-agent", icon: <svg width="20" height="20" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="12" rx="3" {...I} /><path d="M12 8V4M9 13h.01M15 13h.01M9 17h6" {...I} /></svg> },
  { tag: "WEB", title: "Website Development", href: "/web-development", icon: <svg width="20" height="20" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" {...I} /><path d="M3 9h18" {...I} /></svg> },
  { tag: "APP", title: "Mobile App Development", href: "/services#mobile-app-development", icon: <svg width="20" height="20" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2.5" {...I} /><path d="M11 18h2" {...I} /></svg> },
  { tag: "CX", title: "Technical Support", href: "/services#technical-support", icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0118 0v6" {...I} /><path d="M21 19a2 2 0 01-2 2h-1v-6h3zM3 19a2 2 0 002 2h1v-6H3z" {...I} /></svg> },
];

const right: Service[] = [
  { tag: "AI AUTOMATION", title: "AI Automation", href: "/services#ai-automation", icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z" {...I} /></svg> },
  { tag: "DEV", title: "Software Development", href: "/services#software-development", icon: <svg width="20" height="20" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6" {...I} /><polyline points="8 6 2 12 8 18" {...I} /></svg> },
  { tag: "PERF", title: "Performance Optimization", href: "/services#performance-optimization", icon: <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 14l4-4M3.34 19a10 10 0 1117.32 0" {...I} /></svg> },
  { tag: "BPO", title: "BPO Services", href: "/services#bpo-services", icon: <svg width="20" height="20" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" {...I} /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" {...I} /></svg> },
];

const all = [...left, ...right];

export default function ConnectedStack() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Draw a curve from each card's inner edge to the side of the core.
  const measure = useCallback(() => {
    const wrap = wrapRef.current, core = coreRef.current;
    if (!wrap || !core) return;
    const w = wrap.getBoundingClientRect();
    const c = core.getBoundingClientRect();
    const cy = c.top + c.height / 2 - w.top;
    setSize({ w: w.width, h: w.height });
    setPaths(
      cardRefs.current.map((card, i) => {
        if (!card) return "";
        const r = card.getBoundingClientRect();
        const isLeft = i < left.length;
        const x1 = (isLeft ? r.right : r.left) - w.left;
        const y1 = r.top + r.height / 2 - w.top;
        const x2 = (isLeft ? c.left : c.right) - w.left;
        const dx = (x2 - x1) * 0.55;
        return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${cy}, ${x2} ${cy}`;
      })
    );
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % all.length), 2200);
    return () => clearInterval(t);
  }, [paused]);

  const card = (s: Service, i: number) => (
    <a
      key={s.title}
      href={s.href}
      ref={(el) => { cardRefs.current[i] = el; }}
      className={`cs-card ${active === i ? "active" : ""}`}
      onMouseEnter={() => { setActive(i); setPaused(true); }}
      onMouseLeave={() => setPaused(false)}
    >
      <span className="cs-icon">{s.icon}</span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span className="cs-tag">{s.tag}</span>
        <span className="cs-title">{s.title}</span>
      </span>
      <svg className="cs-arrow" width="16" height="16" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" {...I} /></svg>
    </a>
  );

  return (
    <section id="stack" style={{ padding: "100px 60px", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 56px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "50px", padding: "8px 16px", marginBottom: "24px" }}>
              <span className="badge-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
              <span className="section-eyebrow">EVERYTHING CONNECTED</span>
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4.4vw, 54px)", fontWeight: 800, color: "#0f172a", lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "16px" }}>
              One <span className="gradient-text">Connected Stack.</span>
            </h2>
            <p style={{ fontSize: "17px", color: "rgba(15,23,42,0.62)", lineHeight: 1.7 }}>
              AI agents, automation, websites, software and apps all run through one Zoxen core, so nothing you launch lives in a silo.
            </p>
          </div>
        </Reveal>

        <div ref={wrapRef} className="cs-wrap">
          {/* Connection lines */}
          <svg className="cs-lines" width={size.w} height={size.h} viewBox={`0 0 ${size.w || 1} ${size.h || 1}`} aria-hidden="true">
            <defs>
              <linearGradient id="cs-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            {paths.map((d, i) => d && (
              <g key={i}>
                <path d={d} className={`cs-path ${active === i ? "active" : ""}`} />
                <circle r="3" className="cs-dot">
                  <animateMotion dur={`${3 + (i % 4) * 0.6}s`} repeatCount="indefinite" path={d} />
                </circle>
                {active === i && (
                  <circle r="5" className="cs-pulse">
                    <animateMotion dur="1.4s" repeatCount="indefinite" path={d} />
                  </circle>
                )}
              </g>
            ))}
          </svg>

          <div className="cs-col">{left.map((s, i) => card(s, i))}</div>

          <div className="cs-core-wrap">
            <div ref={coreRef} className="cs-core">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/main-logo.png" alt="Zoxen Digital" width={368} height={208} style={{ width: "62%", height: "auto", display: "block" }} />
              <span className="cs-core-name">ZOXEN</span>
            </div>
            <div className="cs-core-label">ZOXEN CORE · CLIENT PORTAL</div>
          </div>

          <div className="cs-col">{right.map((s, i) => card(s, i + left.length))}</div>
        </div>
      </div>

      <style>{`
        .cs-wrap { position: relative; display: grid; grid-template-columns: minmax(240px, 380px) 1fr minmax(240px, 380px); align-items: center; gap: 24px; }
        .cs-lines { position: absolute; inset: 0; pointer-events: none; overflow: visible; z-index: 0; }
        .cs-path { fill: none; stroke: rgba(15,23,42,0.18); stroke-width: 1.5; transition: stroke 0.4s, stroke-width 0.4s; }
        .cs-path.active { stroke: url(#cs-grad); stroke-width: 2.5; }
        .cs-dot { fill: #6366f1; opacity: 0.55; }
        .cs-pulse { fill: #7c3aed; filter: drop-shadow(0 0 6px rgba(124,58,237,0.8)); }

        .cs-col { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 28px; }
        .cs-card {
          display: flex; align-items: center; gap: 14px; padding: 18px 20px; border-radius: 18px; text-decoration: none;
          background: #ffffff; border: 1px solid rgba(15,23,42,0.07); box-shadow: 0 6px 20px rgba(15,23,42,0.05);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s, border-color 0.35s;
        }
        .cs-card.active { border-color: rgba(99,102,241,0.35); box-shadow: 0 16px 40px rgba(79,70,229,0.16); transform: translateY(-2px); background: linear-gradient(135deg, rgba(238,242,255,0.9), #ffffff 60%); }
        .cs-icon {
          flex-shrink: 0; width: 46px; height: 46px; border-radius: 13px; display: flex; align-items: center; justify-content: center;
          color: rgba(15,23,42,0.7); background: #f8fafc; border: 1px solid rgba(15,23,42,0.08); transition: all 0.35s;
        }
        .cs-card.active .cs-icon { color: #ffffff; border-color: transparent; background: linear-gradient(135deg, #6366f1, #4f46e5); box-shadow: 0 8px 18px rgba(79,70,229,0.35); }
        .cs-tag { display: block; font-size: 10.5px; font-weight: 700; letter-spacing: 1.5px; color: #64748b; margin-bottom: 3px; }
        .cs-title { display: block; font-size: 16px; font-weight: 700; color: #0f172a; letter-spacing: -0.2px; }
        .cs-arrow { flex-shrink: 0; color: rgba(15,23,42,0.25); transition: all 0.35s; }
        .cs-card.active .cs-arrow { color: #4f46e5; transform: translateX(3px); }

        .cs-core-wrap { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; }
        .cs-core {
          position: relative; width: 240px; height: 240px; border-radius: 34px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
          background: radial-gradient(circle at 50% 30%, #1e1b4b, #0f172a 70%);
          border: 3px solid #ffffff;
          box-shadow: 0 0 0 10px rgba(99,102,241,0.08), 0 0 70px rgba(99,102,241,0.45), 0 30px 60px rgba(15,23,42,0.3);
        }
        .cs-core::after { content: ""; position: absolute; inset: -14px; border-radius: 42px; border: 1px solid rgba(99,102,241,0.25); animation: core-ring 3s ease-out infinite; }
        @keyframes core-breathe { 0%,100% { box-shadow: 0 0 0 10px rgba(99,102,241,0.08), 0 0 60px rgba(99,102,241,0.35), 0 30px 60px rgba(15,23,42,0.3); } 50% { box-shadow: 0 0 0 14px rgba(99,102,241,0.12), 0 0 90px rgba(124,58,237,0.55), 0 30px 60px rgba(15,23,42,0.3); } }
        @keyframes core-ring { 0% { transform: scale(0.96); opacity: 1; } 100% { transform: scale(1.12); opacity: 0; } }
        .cs-core-name { font-size: 22px; font-weight: 800; letter-spacing: 6px; color: #ffffff; }
        .cs-core-label { margin-top: 26px; font-size: 11px; font-weight: 700; letter-spacing: 2.5px; color: #64748b; }

        @media (max-width: 1100px) {
          .cs-wrap { grid-template-columns: 1fr 1fr; }
          .cs-lines { display: none; }
          .cs-core-wrap { grid-column: 1 / -1; order: -1; margin-bottom: 16px; }
          .cs-core { width: 180px; height: 180px; }
          .cs-col { gap: 16px; }
        }
        @media (max-width: 640px) {
          #stack { padding: 70px 16px !important; }
          .cs-wrap { grid-template-columns: 1fr; }
          .cs-card { padding: 14px 16px; }
        }
      `}</style>
    </section>
  );
}
