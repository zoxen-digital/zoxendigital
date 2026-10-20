"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Reveal from "./Reveal";

/* ---------- helpers ---------- */

// Adds "in" once the element scrolls into view, so animations start when seen.
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function CountUp({ to, decimals = 0, suffix = "", start }: { to: number; decimals?: number; suffix?: string; start: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1600);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to]);
  return <>{v.toFixed(decimals)}{suffix}</>;
}

/* ---------- mini dashboards ---------- */

function EmailPanel({ on }: { on: boolean }) {
  return (
    <div className="pd-panel">
      <div className="pd-panel-head">
        <span>CAMPAIGN STATUS · ACTIVE</span>
        <span className="pd-live"><span className="pd-live-dot" />LIVE</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "18px" }}>
        <span style={{ fontSize: "13px", color: "rgba(15,23,42,0.6)" }}>Sending</span>
        <div className="pd-track"><div className={`pd-fill email ${on ? "in" : ""}`} /></div>
        <span style={{ fontSize: "12px", color: "rgba(15,23,42,0.5)", fontStyle: "italic" }}>72%</span>
      </div>
      <div className="pd-stats">
        <div><b><CountUp to={12.4} decimals={1} suffix="k" start={on} /></b><span>sent</span></div>
        <div><b><CountUp to={41} suffix="%" start={on} /></b><span>opened</span></div>
        <div><b><CountUp to={9.2} decimals={1} suffix="%" start={on} /></b><span>clicked</span></div>
      </div>
      <svg className={`pd-wave ${on ? "in" : ""}`} viewBox="0 0 300 70" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pd-wave-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <path d="M0 55 C 40 30, 60 25, 90 38 S 140 55, 170 30 S 240 8, 300 14 L 300 70 L 0 70 Z" fill="url(#pd-wave-g)">
          <animate attributeName="d" dur="5s" repeatCount="indefinite"
            values="M0 55 C 40 30, 60 25, 90 38 S 140 55, 170 30 S 240 8, 300 14 L 300 70 L 0 70 Z;
                    M0 50 C 40 36, 60 18, 90 30 S 140 48, 170 24 S 240 14, 300 8 L 300 70 L 0 70 Z;
                    M0 55 C 40 30, 60 25, 90 38 S 140 55, 170 30 S 240 8, 300 14 L 300 70 L 0 70 Z" />
        </path>
      </svg>
    </div>
  );
}

const chatScript = [
  { from: "user", text: "Can you qualify this lead?" },
  { from: "bot", text: "Intent confirmed. Budget captured. Follow-up booked for Thursday 10:00." },
];

function ChatPanel({ on }: { on: boolean }) {
  const [round, setRound] = useState(0);
  useEffect(() => {
    if (!on) return;
    const t = setInterval(() => setRound((r) => r + 1), 6000);
    return () => clearInterval(t);
  }, [on]);
  return (
    <div className="pd-panel">
      <div className="pd-panel-head">
        <span>ZOXEN ASSISTANT</span>
        <span className="pd-live"><span className="pd-live-dot" />ONLINE</span>
      </div>
      <div key={round} className={`pd-chat ${on ? "in" : ""}`}>
        {chatScript.map((m, i) => (
          <div key={i} className={`pd-bubble ${m.from}`} style={{ animationDelay: `${0.3 + i * 1.2}s` }}>{m.text}</div>
        ))}
        <div className="pd-typing" style={{ animationDelay: "2.6s" }}><span /><span /><span /></div>
        <div className="pd-qualify" style={{ animationDelay: "2.8s" }}>Qualifying lead…</div>
      </div>
    </div>
  );
}

const channels = ["IG", "X", "LI", "FB"];

function SocialPanel({ on }: { on: boolean }) {
  const [ch, setCh] = useState(0);
  useEffect(() => {
    if (!on) return;
    const t = setInterval(() => setCh((c) => (c + 1) % channels.length), 1500);
    return () => clearInterval(t);
  }, [on]);
  return (
    <div className="pd-panel">
      <div className="pd-panel-head">
        <span>SOCIAL DESK</span>
        <span className="pd-count">3</span>
      </div>
      <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
        {channels.map((c, i) => <span key={c} className={`pd-chip ${ch === i ? "active" : ""}`}>{c}</span>)}
      </div>
      <div className={`pd-scheduled ${on ? "in" : ""}`}>
        <div style={{ fontSize: "11px", letterSpacing: "1.5px", color: "rgba(15,23,42,0.5)", marginBottom: "6px" }}>SCHEDULED · 18:30</div>
        <div style={{ fontSize: "14px", color: "#0f172a" }}>Launch sequence is live across all channels.</div>
      </div>
      <div className="pd-stats" style={{ alignItems: "center" }}>
        <div><b><CountUp to={2.8} decimals={1} suffix="k" start={on} /></b><span>reach</span></div>
        <div><b><CountUp to={186} start={on} /></b><span>replies</span></div>
        <div className="pd-autoreply"><span className="pd-toggle" />Auto-reply on</div>
      </div>
    </div>
  );
}

function CrmPanel({ on }: { on: boolean }) {
  return (
    <div className="pd-panel">
      <div className="pd-panel-head">
        <span>PIPELINE</span>
        <span>34% CONVERSION</span>
      </div>
      <div className={`pd-pipe ${on ? "in" : ""}`}>
        {["NEW", "QUALIFIED", "WON"].map((col) => (
          <div key={col}>
            <div style={{ fontSize: "11px", letterSpacing: "1.5px", color: "rgba(15,23,42,0.5)", marginBottom: "8px" }}>{col}</div>
            <div className="pd-slot" />
            <div className="pd-slot" />
          </div>
        ))}
        <div className="pd-deal" />
      </div>
      <div className={`pd-bars ${on ? "in" : ""}`}>
        {[40, 70, 52, 92, 66].map((h, i) => <span key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }} />)}
      </div>
    </div>
  );
}

/* ---------- section ---------- */

type Product = { num: string; title: string; desc: string; panel: (on: boolean) => ReactNode };

const products: Product[] = [
  { num: "01", title: "Email Marketing Tools", desc: "Campaigns, sequences and reporting that keep your outreach consistent without a full-time operator on every send.", panel: (on) => <EmailPanel on={on} /> },
  { num: "02", title: "AI Chatbot", desc: "Answers common questions, captures qualified leads and hands the rest to your team. On your site, around the clock.", panel: (on) => <ChatPanel on={on} /> },
  { num: "03", title: "Social Media Automation", desc: "Keep replies and posts moving across every social channel so your brand stays present without living in the inbox.", panel: (on) => <SocialPanel on={on} /> },
  { num: "04", title: "CRM & Lead Gen Tools", desc: "One place for leads, pipeline and follow-up, so every sales decision is based on the same live picture.", panel: (on) => <CrmPanel on={on} /> },
];

function ProductRow({ p, i }: { p: Product; i: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const flip = i % 2 === 1;
  return (
    <div ref={ref} className={`pd-row ${flip ? "flip" : ""} ${inView ? "in" : ""}`}>
      <div className="pd-text">
        <div style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
          <span className="pd-num">{p.num}</span>
          <div>
            <h3 className="pd-title">{p.title}</h3>
            <p className="pd-desc">{p.desc}</p>
            <a href="#contact" className={`pd-btn ${i === 0 || i === 1 ? "solid" : ""}`}>
              Explore product
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="pd-visual">{p.panel(inView)}</div>
    </div>
  );
}

export default function Products() {
  return (
    <section id="services" style={{ padding: "100px 60px", position: "relative" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
          <div className="pd-head">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
                <span style={{ width: "36px", height: "1px", background: "rgba(15,23,42,0.3)" }} />
                <span style={{ fontSize: "13px", letterSpacing: "3px", color: "rgba(15,23,42,0.55)", fontWeight: 600 }}>OUR PRODUCTS</span>
              </div>
              <h2 style={{ fontSize: "clamp(34px, 5vw, 64px)", fontWeight: 800, color: "#0f172a", lineHeight: 1.05, letterSpacing: "-2px", maxWidth: "820px", marginBottom: "20px" }}>
                Products that take work off <span className="gradient-text">your team.</span>
              </h2>
              <p style={{ fontSize: "18px", color: "rgba(15,23,42,0.6)", lineHeight: 1.7, maxWidth: "640px" }}>
                Email, chat, social and CRM tools we build so you spend less time on busywork and more time closing.
              </p>
            </div>
            <a href="#contact" className="pd-all">
              View all products
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {products.map((p, i) => <ProductRow key={p.num} p={p} i={i} />)}
        </div>
      </div>

      <style>{`
        .pd-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; padding-bottom: 44px; margin-bottom: 56px; border-bottom: 1px solid rgba(15,23,42,0.08); }
        .pd-all { flex-shrink: 0; display: inline-flex; align-items: center; gap: 10px; padding: 18px 28px; border-radius: 50px; background: #0f172a; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; box-shadow: 0 12px 30px rgba(15,23,42,0.2); transition: transform 0.3s, box-shadow 0.3s; }
        .pd-all:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(79,70,229,0.3); }

        .pd-row {
          display: grid; grid-template-columns: 1.1fr 1fr; gap: 48px; align-items: center; padding: 40px;
          border-radius: 32px; background: #ffffff; border: 1px solid rgba(15,23,42,0.06); box-shadow: 0 10px 40px rgba(15,23,42,0.04);
          opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .pd-row.in { opacity: 1; transform: none; }
        .pd-row.flip .pd-text { order: 2; }
        .pd-row.flip { grid-template-columns: 1fr 1.1fr; }
        .pd-num { flex-shrink: 0; width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 17px; font-weight: 800; color: #ffffff; background: linear-gradient(135deg, #6366f1, #4f46e5); box-shadow: 0 10px 22px rgba(79,70,229,0.3); }
        .pd-title { font-size: clamp(26px, 3vw, 38px); font-weight: 800; color: #0f172a; letter-spacing: -1.2px; line-height: 1.1; margin: 6px 0 14px; }
        .pd-desc { font-size: 17px; color: rgba(15,23,42,0.62); line-height: 1.75; max-width: 560px; margin-bottom: 26px; }
        .pd-btn { display: inline-flex; align-items: center; gap: 10px; padding: 14px 22px; border-radius: 50px; text-decoration: none; font-size: 13px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #4338ca; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.25); transition: all 0.3s; }
        .pd-btn.solid { color: #ffffff; background: linear-gradient(135deg, #6366f1, #4f46e5); border-color: transparent; box-shadow: 0 8px 20px rgba(79,70,229,0.3); }
        .pd-btn:hover { transform: translateX(4px); }

        .pd-panel { position: relative; padding: 22px 24px; border-radius: 24px; background: #ffffff; border: 1px solid rgba(15,23,42,0.07); box-shadow: 0 24px 50px rgba(15,23,42,0.08); min-height: 250px; overflow: hidden; }
        .pd-panel::before { content: ""; position: absolute; inset: -40% -20% auto auto; width: 70%; height: 90%; background: radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%); pointer-events: none; }
        .pd-panel-head { display: flex; justify-content: space-between; align-items: center; font-size: 12px; letter-spacing: 2px; color: rgba(15,23,42,0.5); }
        .pd-live { display: inline-flex; align-items: center; gap: 7px; color: #0f172a; font-weight: 600; }
        .pd-live-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 0 rgba(34,197,94,0.6); animation: pd-ping 1.8s infinite; }
        @keyframes pd-ping { 0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); } 100% { box-shadow: 0 0 0 9px rgba(34,197,94,0); } }
        .pd-track { flex: 1; height: 4px; border-radius: 4px; background: rgba(15,23,42,0.08); overflow: hidden; }
        .pd-fill { height: 100%; width: 0; border-radius: 4px; background: linear-gradient(90deg, #6366f1, #7c3aed); }
        .pd-fill.email.in { animation: pd-send 6s ease-in-out infinite; }
        @keyframes pd-send { 0% { width: 8%; } 60%, 85% { width: 72%; } 100% { width: 8%; } }
        .pd-stats { display: flex; gap: 28px; margin-top: 20px; }
        .pd-stats b { display: block; font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
        .pd-stats span { font-size: 13px; color: rgba(15,23,42,0.5); }
        .pd-wave { display: block; width: 62%; height: 72px; margin: 18px auto 0; clip-path: inset(0 100% 0 0); }
        .pd-wave.in { animation: pd-reveal 1.6s cubic-bezier(0.16,1,0.3,1) 0.3s forwards; }
        @keyframes pd-reveal { to { clip-path: inset(0 0 0 0); } }

        .pd-chat { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
        .pd-bubble, .pd-typing, .pd-qualify { opacity: 0; }
        .pd-chat.in .pd-bubble, .pd-chat.in .pd-typing, .pd-chat.in .pd-qualify { animation: pd-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @keyframes pd-pop { from { opacity: 0; transform: translateY(10px) scale(0.97); } to { opacity: 1; transform: none; } }
        .pd-bubble { max-width: 88%; padding: 11px 15px; font-size: 14.5px; line-height: 1.5; border-radius: 10px; }
        .pd-bubble.user { align-self: flex-end; color: #ffffff; background: linear-gradient(135deg, #6366f1, #4f46e5); border-bottom-right-radius: 3px; }
        .pd-bubble.bot { align-self: flex-start; color: #0f172a; background: #f1f5f9; border-bottom-left-radius: 3px; }
        .pd-typing { display: inline-flex; gap: 5px; padding: 4px 2px; }
        .pd-typing span { width: 7px; height: 7px; border-radius: 50%; background: #6366f1; animation: pd-dot 1.2s ease-in-out infinite; }
        .pd-typing span:nth-child(2) { animation-delay: 0.15s; }
        .pd-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes pd-dot { 0%,60%,100% { opacity: 0.3; transform: none; } 30% { opacity: 1; transform: translateY(-3px); } }
        .pd-qualify { font-size: 18px; color: rgba(15,23,42,0.7); }

        .pd-count { width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; letter-spacing: 0; color: #ffffff; background: #6366f1; animation: pd-bump 3s ease-in-out infinite; }
        @keyframes pd-bump { 0%,85%,100% { transform: scale(1); } 90% { transform: scale(1.3); } }
        .pd-chip { padding: 7px 11px; font-size: 12px; font-weight: 600; letter-spacing: 1px; color: rgba(15,23,42,0.6); border: 1px solid rgba(15,23,42,0.12); border-radius: 6px; transition: all 0.35s; }
        .pd-chip.active { color: #ffffff; background: #6366f1; border-color: #6366f1; box-shadow: 0 6px 14px rgba(99,102,241,0.35); transform: translateY(-2px); }
        .pd-scheduled { margin-top: 16px; padding: 16px; border-radius: 6px; background: #f8fafc; border: 1px solid rgba(15,23,42,0.08); opacity: 0; transform: translateX(20px); }
        .pd-scheduled.in { animation: pd-slide 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s forwards; }
        @keyframes pd-slide { to { opacity: 1; transform: none; } }
        .pd-autoreply { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(15,23,42,0.65); }
        .pd-toggle { position: relative; width: 30px; height: 17px; border-radius: 20px; background: #6366f1; }
        .pd-toggle::after { content: ""; position: absolute; top: 2px; left: 15px; width: 13px; height: 13px; border-radius: 50%; background: #ffffff; }

        .pd-pipe { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 18px; }
        .pd-slot { height: 44px; margin-bottom: 8px; border-radius: 4px; background: #f8fafc; border: 1px solid rgba(15,23,42,0.08); }
        .pd-pipe > div:nth-child(1) .pd-slot:first-of-type, .pd-pipe > div:nth-child(2) .pd-slot:first-of-type { background: rgba(99,102,241,0.12); border-color: rgba(99,102,241,0.4); }
        .pd-deal { position: absolute; left: 0; top: 27px; width: calc((100% - 20px) / 3); height: 44px; border-radius: 4px; background: linear-gradient(135deg, #6366f1, #7c3aed); box-shadow: 0 8px 18px rgba(79,70,229,0.35); opacity: 0; }
        .pd-pipe.in .pd-deal { animation: pd-move 6s cubic-bezier(0.65,0,0.35,1) 0.6s infinite; }
        @keyframes pd-move {
          0% { opacity: 0; transform: translateX(0); }
          8% { opacity: 1; transform: translateX(0); }
          30% { transform: translateX(calc(100% + 10px)); }
          55%, 80% { opacity: 1; transform: translateX(calc(200% + 20px)); }
          100% { opacity: 0; transform: translateX(calc(200% + 20px)); }
        }
        .pd-bars { display: flex; align-items: flex-end; gap: 8px; height: 56px; margin-top: 12px; }
        .pd-bars span { flex: 1; border-radius: 3px 3px 0 0; background: linear-gradient(180deg, rgba(99,102,241,0.55), rgba(99,102,241,0.08)); transform: scaleY(0); transform-origin: bottom; }
        .pd-bars.in span { animation: pd-grow 0.9s cubic-bezier(0.16,1,0.3,1) forwards, pd-sway 3s ease-in-out 1.2s infinite; }
        @keyframes pd-grow { to { transform: scaleY(1); } }
        @keyframes pd-sway { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(0.82); } }

        @media (max-width: 900px) {
          #services { padding: 70px 16px !important; }
          .pd-head { flex-direction: column; align-items: flex-start; }
          .pd-row, .pd-row.flip { grid-template-columns: 1fr; padding: 24px; gap: 28px; border-radius: 24px; }
          .pd-row.flip .pd-text { order: 0; }
          .pd-num { width: 46px; height: 46px; font-size: 15px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pd-row { opacity: 1; transform: none; }
          .pd-bubble, .pd-typing, .pd-qualify, .pd-scheduled { opacity: 1; transform: none; }
          .pd-wave { clip-path: none; }
        }
      `}</style>
    </section>
  );
}
