"use client";
import { useEffect, useState } from "react";
import Reveal from "../components/Reveal";
import ProjectModal from "../components/ProjectModal";

const features = ["Up to 5 pages", "Contact form", "Stock photos", "Mobile responsive", "Basic on-page SEO", "Free hosting included"];

const timeline = [
  { label: "Order", sub: "Today" },
  { label: "Kickoff", sub: "Within hours" },
  { label: "Live", sub: "24–48h" },
];

// Small live preview of the free chatbot: greeting, typing, then a lead captured.
function ChatPreview() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 4), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="pk-chat">
      <div className="pk-chat-msg bot">Hi! Looking for a new website?</div>
      <div className={`pk-chat-msg user reveal ${phase >= 1 ? "show" : ""}`}>Yes, how much?</div>
      {phase === 2 && <div className="pk-chat-typing"><span /><span /><span /></div>}
      <div className={`pk-chat-msg bot reveal ${phase >= 3 ? "show" : ""}`}>From $99. Can I book you a free call?</div>
    </div>
  );
}

export default function PackageCard() {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={0.15}>
      <div className="pk-card">
        <div className="pk-glow" />

        {/* Header */}
        <div className="pk-head">
          <span className="pk-offer"><span className="pk-offer-dot" />SPECIAL OFFER</span>
          <span className="pk-rating">
            <span style={{ color: "#f59e0b", letterSpacing: "1px" }}>★★★★★</span>
            <b>5.0</b> on Google
          </span>
        </div>

        <div className="pk-eyebrow"><span />STANDARD PACKAGE</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "8px" }}>
          <span className="pk-price">$99</span>
          <span style={{ fontSize: "15px", color: "rgba(15,23,42,0.55)", fontWeight: 600 }}>one-time</span>
        </div>
        <p className="pk-desc">A clean, professional website to get your business online fast.</p>

        {/* Free chatbot */}
        <div className="pk-bonus">
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="pk-bonus-top">
              <span className="pk-bonus-tag">+ FREE</span>
              <span style={{ fontSize: "12.5px", color: "rgba(15,23,42,0.5)" }}>usually <s style={{ color: "#dc2626", fontWeight: 700 }}>$30</s></span>
            </div>
            <div style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.4px", margin: "5px 0 3px" }}>AI Chatbot included</div>
            <div style={{ fontSize: "13.5px", color: "rgba(15,23,42,0.6)", lineHeight: 1.5 }}>Answers visitors 24/7 and captures leads while you sleep.</div>
          </div>
          <ChatPreview />
        </div>

        {/* Features */}
        <ul className="pk-features">
          {features.map((f) => (
            <li key={f}>
              <span className="pk-check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              {f}
            </li>
          ))}
        </ul>

        {/* Delivery timeline */}
        <div className="pk-timeline">
          <div className="pk-timeline-line"><div className="pk-timeline-fill" /></div>
          {timeline.map((t, i) => (
            <div key={t.label} className="pk-timeline-step" style={{ animationDelay: `${0.4 + i * 0.5}s` }}>
              <span className="pk-timeline-dot" />
              <b>{t.label}</b>
              <span>{t.sub}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <button type="button" className="pk-primary" onClick={() => setOpen(true)}>
          Get Started for $99
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <a href="#packages" className="pk-ghost">
          View all packages
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>

        {/* Trust */}
        <div className="pk-trust">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><polyline points="9 12 11 14 15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            30-day money-back guarantee
          </span>
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" /></svg>
            Secure payment by Stripe
          </span>
        </div>
      </div>

      <ProjectModal open={open} onClose={() => setOpen(false)} />

      <style>{`
        .pk-card {
          position: relative; overflow: hidden; padding: 24px 26px; border-radius: 28px; background: #ffffff;
          border: 1px solid rgba(15,23,42,0.07); box-shadow: 0 30px 70px rgba(15,23,42,0.1), 0 0 0 6px rgba(99,102,241,0.05);
        }
        .pk-glow { position: absolute; right: -120px; top: -120px; width: 320px; height: 320px; border-radius: 50%; background: radial-gradient(circle, rgba(129,140,248,0.28), transparent 65%); pointer-events: none; }
        .pk-head { position: relative; display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; }
        .pk-offer {
          display: inline-flex; align-items: center; gap: 8px; padding: 7px 14px; border-radius: 50px; font-size: 11.5px; font-weight: 800; letter-spacing: 1.5px; color: #ffffff;
          background: linear-gradient(110deg, #4f46e5 30%, #818cf8 50%, #4f46e5 70%); background-size: 250% 100%; animation: pk-shine 3s linear infinite;
          box-shadow: 0 8px 18px rgba(79,70,229,0.3);
        }
        @keyframes pk-shine { from { background-position: 100% 0; } to { background-position: -150% 0; } }
        .pk-offer-dot { width: 6px; height: 6px; border-radius: 50%; background: #ffffff; animation: dot-pulse 1.6s infinite; }
        .pk-rating { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 50px; font-size: 12px; color: rgba(15,23,42,0.6); background: #f8fafc; border: 1px solid rgba(15,23,42,0.08); }
        .pk-rating b { color: #0f172a; }

        .pk-eyebrow { position: relative; display: flex; align-items: center; gap: 12px; font-size: 12.5px; font-weight: 700; letter-spacing: 3px; color: rgba(15,23,42,0.55); margin-bottom: 6px; }
        .pk-eyebrow span { width: 28px; height: 1.5px; background: rgba(15,23,42,0.35); }
        .pk-price { font-size: 52px; font-weight: 800; letter-spacing: -3px; line-height: 1; color: #0f172a; }
        .pk-desc { font-size: 14.5px; color: rgba(15,23,42,0.62); line-height: 1.5; margin-bottom: 16px; }

        .pk-bonus {
          display: flex; align-items: center; gap: 14px; padding: 14px; border-radius: 18px; margin-bottom: 16px;
          background: linear-gradient(120deg, #eef2ff, #f5f3ff 60%, #ffffff); border: 1px solid rgba(99,102,241,0.2);
        }
        .pk-bonus-top { display: flex; align-items: center; gap: 10px; }
        .pk-bonus-tag { font-size: 11px; font-weight: 800; letter-spacing: 1px; color: #ffffff; padding: 4px 10px; border-radius: 50px; background: linear-gradient(135deg, #22c55e, #16a34a); box-shadow: 0 4px 10px rgba(22,163,74,0.3); }
        .pk-chat { flex-shrink: 0; width: 158px; display: flex; flex-direction: column; gap: 6px; padding: 10px; border-radius: 16px; background: #ffffff; border: 1px solid rgba(15,23,42,0.07); box-shadow: 0 10px 24px rgba(79,70,229,0.12); min-height: 100px; }
        .pk-chat-msg { font-size: 11px; line-height: 1.4; padding: 6px 9px; border-radius: 10px; max-width: 92%; }
        .pk-chat-msg.bot { align-self: flex-start; background: #f1f5f9; color: #0f172a; border-bottom-left-radius: 3px; }
        .pk-chat-msg.user { align-self: flex-end; color: #ffffff; background: linear-gradient(135deg, #6366f1, #4f46e5); border-bottom-right-radius: 3px; }
        .pk-chat-msg.reveal { opacity: 0; transform: translateY(6px); transition: opacity 0.35s ease, transform 0.35s ease; }
        .pk-chat-msg.reveal.show { opacity: 1; transform: none; }
        .pk-chat-typing { display: inline-flex; gap: 3px; padding: 7px 9px; border-radius: 10px; background: #f1f5f9; width: fit-content; }
        .pk-chat-typing span { width: 5px; height: 5px; border-radius: 50%; background: #6366f1; animation: offer-typing 1.1s ease-in-out infinite; }
        .pk-chat-typing span:nth-child(2) { animation-delay: 0.15s; } .pk-chat-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes offer-typing { 0%,60%,100% { opacity: 0.35; transform: none; } 30% { opacity: 1; transform: translateY(-2px); } }

        .pk-features { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; margin-bottom: 16px; }
        .pk-features li { display: flex; align-items: center; gap: 9px; font-size: 14px; color: rgba(15,23,42,0.8); }
        .pk-check { flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #4338ca; background: #e0e7ff; }

        .pk-timeline { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); padding: 12px 4px 0; margin-bottom: 16px; border-top: 1px dashed rgba(15,23,42,0.1); }
        .pk-timeline-line { position: absolute; top: 20px; left: 16.6%; right: 16.6%; height: 2px; background: rgba(15,23,42,0.08); border-radius: 2px; overflow: hidden; }
        .pk-timeline-fill { height: 100%; width: 100%; transform-origin: left; transform: scaleX(0); background: linear-gradient(90deg, #6366f1, #16a34a); animation: pk-fill 1.4s cubic-bezier(0.65,0,0.35,1) 0.5s forwards; }
        @keyframes pk-fill { to { transform: scaleX(1); } }
        .pk-timeline-step { position: relative; display: flex; flex-direction: column; align-items: center; gap: 3px; text-align: center; opacity: 0.4; animation: pk-step 0.5s ease forwards; }
        @keyframes pk-step { to { opacity: 1; } }
        .pk-timeline-dot { width: 18px; height: 18px; margin-bottom: 4px; border-radius: 50%; background: #ffffff; border: 2px solid #6366f1; box-shadow: 0 0 0 4px rgba(99,102,241,0.12); }
        .pk-timeline-step:last-child .pk-timeline-dot { border-color: #16a34a; background: #16a34a; box-shadow: 0 0 0 4px rgba(22,163,74,0.15); }
        .pk-timeline-step b { font-size: 13.5px; color: #0f172a; }
        .pk-timeline-step span:last-child { font-size: 11.5px; color: rgba(15,23,42,0.5); }

        .pk-primary { width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 15px; border-radius: 50px; border: none; cursor: pointer; font-size: 16px; font-weight: 700; color: #ffffff; background: #0f172a; box-shadow: 0 14px 30px rgba(15,23,42,0.22); transition: transform 0.3s, box-shadow 0.3s; margin-bottom: 8px; }
        .pk-primary:hover { transform: translateY(-2px); box-shadow: 0 18px 38px rgba(79,70,229,0.35); }
        .pk-ghost { width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 12px; border-radius: 50px; text-decoration: none; font-size: 15px; font-weight: 600; color: #0f172a; border: 1.5px dashed rgba(15,23,42,0.18); transition: all 0.3s; }
        .pk-ghost:hover { border-color: #6366f1; color: #4338ca; }
        .pk-trust { display: flex; justify-content: center; flex-wrap: wrap; gap: 6px 18px; margin-top: 12px; }
        .pk-trust span { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; color: rgba(15,23,42,0.55); }

        @media (max-width: 520px) {
          .pk-card { padding: 24px 18px; border-radius: 24px; }
          .pk-price { font-size: 56px; }
          .pk-bonus { flex-direction: column; align-items: stretch; }
          .pk-chat { width: 100%; }
          .pk-features { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pk-timeline-fill { transform: none; } .pk-timeline-step { opacity: 1; }
        }
      `}</style>
    </Reveal>
  );
}
