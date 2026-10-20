"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const I = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const steps = [
  {
    num: "01",
    title: "Discover",
    desc: "We map your goals, audience and offer so the build starts from clarity, not assumptions.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" {...I} /><circle cx="12" cy="12" r="5" {...I} /><circle cx="12" cy="12" r="1.2" {...I} /></svg>,
  },
  {
    num: "02",
    title: "Design",
    desc: "Layouts and brand come together: clean UX, a strong message and pages built to convert.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" {...I} /><path d="M3 9h18M8 13h8M8 16h5" {...I} /></svg>,
  },
  {
    num: "03",
    title: "Build",
    desc: "Our team builds in focused sprints with regular updates and previews inside your client portal.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6" {...I} /><polyline points="8 6 2 12 8 18" {...I} /><path d="M14 4l-4 16" {...I} /></svg>,
  },
  {
    num: "04",
    title: "Launch & Scale",
    desc: "We launch, monitor and improve, with ads, SEO and automation ready to grow your results.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><polyline points="3 17 9 11 13 15 21 7" {...I} /><polyline points="15 7 21 7 21 13" {...I} /></svg>,
  },
];

export default function HomeProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Scroll-driven: starts when the card enters the lower screen, complete by mid-screen.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;
      setProgress(Math.max(0, Math.min(1, (vh * 0.85 - top) / (vh * 0.5))));
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

  const active = Math.round(progress * (steps.length - 1));
  const fill = progress;

  return (
    <section id="process" style={{ padding: "100px 60px", position: "relative" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <div className="hp-head">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                <span style={{ width: "36px", height: "1px", background: "rgba(15,23,42,0.3)" }} />
                <span style={{ fontSize: "13px", letterSpacing: "3px", color: "rgba(15,23,42,0.55)", fontWeight: 600 }}>HOW WE WORK</span>
              </div>
              <h2 style={{ fontSize: "clamp(34px, 5vw, 64px)", fontWeight: 800, color: "#0f172a", lineHeight: 1.05, letterSpacing: "-2px", maxWidth: "620px", marginBottom: "20px" }}>
                A clear path from brief <span className="gradient-text">to launch.</span>
              </h2>
              <p style={{ fontSize: "18px", color: "rgba(15,23,42,0.6)", lineHeight: 1.7 }}>
                Four stages. One dedicated team. Live progress you can follow in your client portal.
              </p>
            </div>
            <a href="#contact" className="hp-cta">
              Start a project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div ref={ref} className="hp-card">
            <div className="hp-line">
              <div className="hp-line-fill" style={{ transform: `scaleX(${fill})` }} />
            </div>

            {steps.map((s, i) => {
              const state = i === active ? "active" : i < active ? "done" : "next";
              return (
                <div key={s.num} className={`hp-step ${state}`}>
                  <div className="hp-icon">{s.icon}</div>
                  <div className="hp-num">{s.num}</div>
                  <h3 className="hp-title">{s.title}</h3>
                  <p className="hp-desc">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>

      <style>{`
        .hp-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; padding-bottom: 44px; margin-bottom: 56px; border-bottom: 1px solid rgba(15,23,42,0.08); }
        .hp-cta { flex-shrink: 0; display: inline-flex; align-items: center; gap: 10px; padding: 18px 28px; border-radius: 50px; background: #0f172a; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; box-shadow: 0 12px 30px rgba(15,23,42,0.2); transition: transform 0.3s, box-shadow 0.3s; }
        .hp-cta:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(79,70,229,0.3); }

        .hp-card {
          position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px;
          padding: 40px 40px 44px; border-radius: 32px; background: #ffffff;
          border: 1px solid rgba(15,23,42,0.06); box-shadow: 0 10px 40px rgba(15,23,42,0.04);
        }
        /* Icons are 72px wide: the line runs from the first icon's centre to the last one's. */
        .hp-line { position: absolute; top: 76px; left: 76px; right: calc((100% - 200px) / 4 + 4px); height: 2px; background: rgba(15,23,42,0.1); border-radius: 2px; overflow: hidden; }
        .hp-line-fill { position: absolute; inset: 0; transform-origin: left; background: linear-gradient(90deg, #0f172a, #4f46e5); transition: transform 0.15s linear; }

        .hp-step { position: relative; z-index: 1; cursor: default; }
        .hp-icon {
          width: 72px; height: 72px; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin-bottom: 30px;
          color: rgba(15,23,42,0.6); background: #ffffff; border: 1px solid rgba(15,23,42,0.08); box-shadow: 0 6px 18px rgba(15,23,42,0.05);
          transition: all 0.5s cubic-bezier(0.34,1.56,0.64,1);
        }
        .hp-step.active .hp-icon {
          color: #a5b4fc; background: radial-gradient(circle at 50% 30%, #1e1b4b, #0f172a 75%); border-color: transparent;
          box-shadow: 0 0 0 4px rgba(99,102,241,0.35), 0 0 30px rgba(99,102,241,0.5), 0 12px 24px rgba(15,23,42,0.25);
          transform: scale(1.06);
        }
        .hp-num { font-size: 13px; font-weight: 700; letter-spacing: 2px; color: rgba(15,23,42,0.5); margin-bottom: 10px; transition: color 0.5s; }
        .hp-title { font-size: clamp(22px, 2.2vw, 30px); font-weight: 800; letter-spacing: -1px; color: #0f172a; margin-bottom: 14px; transition: color 0.5s; }
        .hp-desc { font-size: 16px; line-height: 1.75; color: rgba(15,23,42,0.62); transition: color 0.5s; }

        .hp-step.done .hp-title { color: rgba(15,23,42,0.6); }
        .hp-step.done .hp-desc { color: rgba(15,23,42,0.5); }
        .hp-step.next .hp-icon { opacity: 0.55; }
        .hp-step.next .hp-num, .hp-step.next .hp-title, .hp-step.next .hp-desc { color: rgba(15,23,42,0.28); }
        .hp-step.active .hp-num { color: #4f46e5; }

        @media (max-width: 1000px) {
          #process { padding: 70px 16px !important; }
          .hp-head { flex-direction: column; align-items: flex-start; }
          .hp-card { grid-template-columns: 1fr 1fr; gap: 36px 24px; padding: 28px 24px; border-radius: 24px; }
          .hp-line { display: none; }
          .hp-step.next .hp-num, .hp-step.next .hp-title, .hp-step.next .hp-desc { color: rgba(15,23,42,0.45); }
        }
        @media (max-width: 560px) {
          .hp-card { grid-template-columns: 1fr; }
          .hp-icon { width: 58px; height: 58px; border-radius: 16px; margin-bottom: 18px; }
        }
      `}</style>
    </section>
  );
}
