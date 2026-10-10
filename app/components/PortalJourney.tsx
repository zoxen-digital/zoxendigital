"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const I = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const steps = [
  {
    title: "Get Your Portal Login",
    desc: "As soon as you start, you receive a private login to your own client portal.",
    tag: "Day 1",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" {...I} /><path d="M7 11V7a5 5 0 0110 0v4" {...I} /></svg>,
  },
  {
    title: "Share Your Details",
    desc: "Fill the onboarding form and upload your logo, content and images in one place.",
    tag: "Onboarding",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" {...I} /></svg>,
  },
  {
    title: "Chat & Track Progress",
    desc: "Talk to your team inside the portal and watch your project move stage by stage.",
    tag: "Design & Build",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" {...I} /></svg>,
  },
  {
    title: "Review Your Website",
    desc: "Open the preview link, request changes, and see every revision round tracked.",
    tag: "Review",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" {...I} /><circle cx="12" cy="12" r="3" {...I} /></svg>,
  },
  {
    title: "Approve & Go Live",
    desc: "Approve in one click. We launch your website and the project is closed in the portal.",
    tag: "Launch",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" {...I} /><polyline points="22 4 12 14.01 9 11.01" {...I} /></svg>,
  },
  {
    title: "Ongoing Support",
    desc: "Need a change later? Raise a support ticket from the same login and track it to done.",
    tag: "After launch",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" {...I} /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" {...I} /></svg>,
  },
];

export default function PortalJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Fill the line as the timeline scrolls past the middle of the screen.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Starts filling when the row enters the lower screen, full by mid-screen.
      const p = (window.innerHeight * 0.85 - rect.top) / (window.innerHeight * 0.4);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="portal-journey" style={{ padding: "80px 80px 90px", position: "relative" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 48px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "50px", padding: "8px 16px", marginBottom: "24px" }}>
              <span className="badge-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
              <span className="section-eyebrow">HOW IT WORKS</span>
            </div>
            <h2 style={{ fontSize: "clamp(28px, 3.8vw, 44px)", fontWeight: "800", color: "#0f172a", lineHeight: "1.15", marginBottom: "16px" }}>
              From First Login To <span className="gradient-text">Going Live.</span>
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(15,23,42,0.65)", lineHeight: "1.7" }}>
              Here is exactly what working with us looks like inside your client portal.
            </p>
          </div>
        </Reveal>

        <div ref={trackRef} className="pj-track">
          <div className="pj-line"><div className="pj-line-fill" style={{ transform: `scaleX(${progress})` }} /></div>

          {steps.map((s, i) => {
            const active = progress >= (i + 0.5) / steps.length;
            return (
              <div key={s.title} className={`pj-step ${active ? "active" : ""}`}>
                <div className="pj-node">{s.icon}</div>
                <span className="pj-tag">Step {i + 1}</span>
                <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: "8px 0 6px", lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontSize: "13px", color: "rgba(15,23,42,0.62)", lineHeight: "1.55" }}>{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .pj-track { position: relative; display: grid; grid-template-columns: repeat(6, 1fr); gap: 20px; }
        .pj-line { position: absolute; left: calc(100% / 12); right: calc(100% / 12); top: 26px; height: 3px; background: rgba(99,102,241,0.12); border-radius: 3px; overflow: hidden; }
        .pj-line-fill { position: absolute; inset: 0; transform-origin: left; background: linear-gradient(90deg, #6366f1, #7c3aed 60%, #16a34a); transition: transform 0.15s linear; }

        .pj-step { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; opacity: 0.5; transform: translateY(10px); transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .pj-step.active { opacity: 1; transform: none; }
        .pj-node {
          position: relative; z-index: 1; width: 52px; height: 52px; border-radius: 16px; margin-bottom: 14px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(15,23,42,0.35); background: #ffffff; border: 1.5px solid rgba(15,23,42,0.12);
          transition: all 0.5s cubic-bezier(0.34,1.56,0.64,1);
        }
        .pj-step.active .pj-node {
          color: #ffffff; border-color: transparent; background: linear-gradient(135deg, #6366f1, #4f46e5);
          box-shadow: 0 0 0 6px rgba(99,102,241,0.15), 0 10px 24px rgba(79,70,229,0.35); transform: scale(1.06);
        }
        .pj-step:last-child.active .pj-node { background: linear-gradient(135deg, #22c55e, #16a34a); box-shadow: 0 0 0 6px rgba(34,197,94,0.15), 0 10px 24px rgba(22,163,74,0.35); }
        .pj-tag { font-size: 10.5px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: #4f46e5; background: rgba(99,102,241,0.1); padding: 3px 9px; border-radius: 50px; }

        @media (max-width: 1000px) {
          .pj-track { grid-template-columns: repeat(3, 1fr); row-gap: 36px; }
          .pj-line { display: none; }
        }
        @media (max-width: 560px) {
          #portal-journey { padding: 60px 20px 70px !important; }
          .pj-track { grid-template-columns: repeat(2, 1fr); gap: 28px 16px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pj-step { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
