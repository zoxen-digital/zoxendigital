"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const ICON = { stroke: "#6366f1", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };

const features = [
  {
    title: "Your Own Client Login",
    desc: "Every client gets a private, secure login to track everything about their project in one place.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" {...ICON} /><path d="M7 11V7a5 5 0 0110 0v4" {...ICON} /></svg>,
  },
  {
    title: "Chat With Our Team",
    desc: "No more lost WhatsApp messages. Talk to your project team, share files and get answers inside the portal.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" {...ICON} /></svg>,
  },
  {
    title: "Live Project Progress",
    desc: "See exactly which stage your project is in, from onboarding to launch, with updates as we work.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" {...ICON} /></svg>,
  },
  {
    title: "Review, Approve & Close",
    desc: "Preview your website, request changes or approve it in one click. Projects are signed off and closed right there.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" {...ICON} /><polyline points="22 4 12 14.01 9 11.01" {...ICON} /></svg>,
  },
  {
    title: "Invoices & Documents",
    desc: "View invoices, download PDFs and access every shared file whenever you need them.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" {...ICON} /><polyline points="14 2 14 8 20 8" {...ICON} /><line x1="8" y1="13" x2="16" y2="13" {...ICON} /><line x1="8" y1="17" x2="13" y2="17" {...ICON} /></svg>,
  },
  {
    title: "Support After Launch",
    desc: "Raise a support ticket anytime after your site goes live and track it until it is resolved.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" {...ICON} /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" {...ICON} /></svg>,
  },
];

const stages = ["Onboarding", "Design", "Development", "Review", "Live"];

// What the mockup shows at each stage of the auto-playing project journey.
const journey = [
  {
    status: "Onboarding",
    chat: [
      { from: "team", text: "Welcome aboard! Please upload your logo and content." },
      { from: "client", text: "Done, uploaded everything just now." },
    ],
    chip: "Onboarding form received",
  },
  {
    status: "In Design",
    chat: [
      { from: "team", text: "Homepage design is ready for a quick look." },
      { from: "client", text: "Love it! Can we use a darker blue?" },
    ],
    chip: "New design shared",
  },
  {
    status: "In Development",
    chat: [
      { from: "team", text: "Darker blue applied. Building all pages now." },
      { from: "client", text: "Perfect, thank you for the update!" },
    ],
    chip: "3 of 5 pages built",
  },
  {
    status: "In Review",
    chat: [
      { from: "team", text: "Your website preview is ready. Please review it." },
      { from: "client", text: "Looks amazing. Approving it now!" },
    ],
    chip: "Ready for your review",
  },
  {
    status: "Live",
    chat: [
      { from: "team", text: "Your website is live! Congratulations." },
      { from: "client", text: "Thank you team, smooth process!" },
    ],
    chip: "Project closed",
  },
];

function useJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(3);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Hold longer on "Live" so the celebration can be seen before looping.
    const timer = setTimeout(() => setStep((s) => (s + 1) % journey.length), step === journey.length - 1 ? 4500 : 3200);
    return () => clearTimeout(timer);
  }, [step, visible]);

  return { ref, step };
}

export default function ClientPortal() {
  const { ref: mockRef, step } = useJourney();
  const current = journey[step];
  const isLive = step === journey.length - 1;
  const progress = (step + 1) * 20;

  return (
    <section id="portal" style={{ padding: "110px 80px", position: "relative", overflow: "hidden", background: "linear-gradient(180deg, transparent 0%, rgba(238,242,255,0.7) 50%, transparent 100%)" }}>
      <div className="portal-grid-bg" />
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Heading */}
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 64px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: "50px", padding: "8px 16px", marginBottom: "24px" }}>
              <span className="badge-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
              <span className="section-eyebrow">CLIENT PORTAL</span>
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: "800", color: "#0f172a", marginBottom: "18px", lineHeight: "1.15" }}>
              Your Project, Always <span className="gradient-text">In Your Hands.</span>
            </h2>
            <p style={{ fontSize: "17px", color: "rgba(15,23,42,0.65)", lineHeight: "1.7" }}>
              Every Zoxen client gets access to our private client portal. Chat with the team, track progress, approve work and close your project, all from one login.
            </p>
          </div>
        </Reveal>

        <div className="portal-layout">
          {/* Features */}
          <div className="portal-features">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <div className="portal-feature">
                  <div className="portal-feature-icon">{f.icon}</div>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "6px" }}>{f.title}</h3>
                    <p style={{ fontSize: "14px", color: "rgba(15,23,42,0.62)", lineHeight: "1.6" }}>{f.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Portal mockup */}
          <Reveal delay={0.15} y={40}>
            <div ref={mockRef} className="portal-mock animate-float-slow">
              <div className="portal-mock-bar">
                <span style={{ background: "#f87171" }} /><span style={{ background: "#fbbf24" }} /><span style={{ background: "#4ade80" }} />
                <div className="portal-mock-url">portal.zoxendigital.com</div>
              </div>

              <div style={{ padding: "22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                  <div>
                    <div style={{ fontSize: "12px", color: "rgba(15,23,42,0.5)", fontWeight: 600 }}>Welcome back</div>
                    <div style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a" }}>Business Website</div>
                  </div>
                  <span key={current.status} className={`portal-status ${isLive ? "live" : ""}`}><span className="badge-dot" />{current.status}</span>
                </div>

                {/* Stages */}
                <div className="portal-card">
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
                    <span>Project Progress</span><span style={{ color: isLive ? "#16a34a" : "#4f46e5" }}>{progress}%</span>
                  </div>
                  <div className="portal-progress"><div className={`portal-progress-fill ${isLive ? "live" : ""}`} style={{ width: `${progress}%` }} /></div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
                    {stages.map((s, i) => (
                      <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", flex: 1 }}>
                        <span className={`portal-stage-dot ${i < step || isLive ? "done" : i === step ? "active" : ""}`} />
                        <span style={{ fontSize: "10px", fontWeight: 600, color: i <= step ? "#0f172a" : "rgba(15,23,42,0.4)", transition: "color 0.4s" }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat (re-mounted per stage so the messages animate in again) */}
                <div className="portal-card" style={{ marginTop: "14px", minHeight: "168px" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "12px" }}>Project Chat</div>
                  <div key={step}>
                    {current.chat.map((m, i) => (
                      <div key={i} className={`portal-msg ${m.from}`} style={{ animationDelay: `${0.2 + i * 0.9}s` }}>{m.text}</div>
                    ))}
                    {!isLive && <div className="portal-typing"><span /><span /><span /></div>}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "14px" }}>
                  <div className={`portal-btn primary ${step === 3 ? "pressing" : ""}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {isLive ? "Approved" : "Approve & Close"}
                  </div>
                  <div className="portal-btn">Request Changes</div>
                </div>
              </div>

              {/* Live celebration */}
              {isLive && (
                <div className="portal-live-overlay">
                  <div className="portal-live-card">
                    <div className="portal-live-icon">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a" }}>Website is Live!</div>
                    <div style={{ fontSize: "13px", color: "rgba(15,23,42,0.6)", marginTop: "4px" }}>Project approved &amp; closed in the portal</div>
                  </div>
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i} className="portal-confetti" style={{ left: `${8 + i * 6.5}%`, animationDelay: `${(i % 5) * 0.12}s`, background: ["#6366f1", "#7c3aed", "#3b82f6", "#16a34a", "#f59e0b"][i % 5] }} />
                  ))}
                </div>
              )}

              {/* Floating chips */}
              <div className="portal-chip chip-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#16a34a" strokeWidth="2" /></svg>
                Invoice #1024 · <b style={{ color: "#16a34a" }}>Paid</b>
              </div>
              <div key={`chip-${step}`} className="portal-chip chip-2 chip-swap">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" /></svg>
                {current.chip}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div style={{ textAlign: "center", marginTop: "56px" }}>
            <a href="#contact" className="btn-primary">
              Start Your Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        .portal-grid-bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image: linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
        }
        .portal-layout { display: grid; grid-template-columns: 1fr 1.05fr; gap: 64px; align-items: center; }
        .portal-features { display: grid; grid-template-columns: 1fr 1fr; gap: 28px 32px; }
        .portal-feature { display: flex; flex-direction: column; gap: 14px; }
        .portal-feature-icon {
          width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center;
          background: #ffffff; border: 1px solid rgba(99,102,241,0.25); box-shadow: 0 6px 18px rgba(99,102,241,0.12);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .portal-feature:hover .portal-feature-icon { transform: translateY(-3px) rotate(-4deg); box-shadow: 0 10px 24px rgba(99,102,241,0.22); }

        .portal-mock {
          position: relative; background: #ffffff; border: 1px solid rgba(15,23,42,0.08); border-radius: 20px;
          box-shadow: 0 30px 70px rgba(79,70,229,0.18), 0 8px 20px rgba(15,23,42,0.06);
        }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        @keyframes float-slow { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .portal-mock-bar { display: flex; align-items: center; gap: 6px; padding: 12px 16px; border-bottom: 1px solid rgba(15,23,42,0.07); background: #f8fafc; border-radius: 20px 20px 0 0; }
        .portal-mock-bar > span { width: 9px; height: 9px; border-radius: 50%; }
        .portal-mock-url { margin-left: 10px; flex: 1; font-size: 11px; color: rgba(15,23,42,0.5); background: rgba(15,23,42,0.05); border-radius: 6px; padding: 4px 10px; }
        .portal-status { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: #4338ca; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.25); padding: 5px 10px; border-radius: 50px; }
        .portal-status .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #6366f1; display: inline-block; }
        .portal-card { background: #f8fafc; border: 1px solid rgba(15,23,42,0.06); border-radius: 14px; padding: 16px; }
        .portal-progress { height: 8px; border-radius: 50px; background: rgba(99,102,241,0.12); overflow: hidden; }
        .portal-progress-fill { height: 100%; border-radius: 50px; background: linear-gradient(90deg, #6366f1, #7c3aed); transition: width 1s cubic-bezier(0.16,1,0.3,1), background 0.6s; }
        .portal-progress-fill.live { background: linear-gradient(90deg, #22c55e, #16a34a); }
        .portal-status { animation: status-pop 0.45s cubic-bezier(0.34,1.56,0.64,1); }
        .portal-status.live { color: #15803d; background: rgba(22,163,74,0.1); border-color: rgba(22,163,74,0.3); }
        .portal-status.live .badge-dot { background: #16a34a; }
        @keyframes status-pop { from { transform: scale(0.8); opacity: 0; } to { transform: none; opacity: 1; } }
        .portal-btn.pressing { animation: btn-press 3.2s ease forwards; }
        @keyframes btn-press { 0%,70% { transform: none; box-shadow: 0 6px 16px rgba(79,70,229,0.3); } 78% { transform: scale(0.94); box-shadow: 0 0 0 6px rgba(99,102,241,0.25); } 88%,100% { transform: none; box-shadow: 0 0 0 10px rgba(99,102,241,0); } }
        .portal-live-overlay { position: absolute; inset: 0; border-radius: 20px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.55); backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px); animation: fade-in 0.4s ease both; z-index: 3; }
        .portal-live-card { text-align: center; background: #ffffff; padding: 26px 30px; border-radius: 18px; border: 1px solid rgba(22,163,74,0.25); box-shadow: 0 20px 50px rgba(22,163,74,0.2); animation: status-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.15s both; }
        .portal-live-icon { width: 58px; height: 58px; margin: 0 auto 12px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #22c55e, #16a34a); box-shadow: 0 0 0 8px rgba(34,197,94,0.15); }
        .portal-confetti { position: absolute; top: -12px; width: 8px; height: 12px; border-radius: 2px; animation: confetti-fall 2.6s ease-in forwards; }
        @keyframes confetti-fall { 0% { transform: translateY(0) rotate(0); opacity: 1; } 100% { transform: translateY(560px) rotate(540deg); opacity: 0; } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .chip-2.chip-swap { animation: chip-in 0.5s cubic-bezier(0.34,1.56,0.64,1), float 6s ease-in-out 0.5s infinite; }
        @keyframes chip-in { from { opacity: 0; transform: translateX(-16px) scale(0.9); } to { opacity: 1; transform: none; } }
        .portal-stage-dot { width: 12px; height: 12px; border-radius: 50%; background: #e2e8f0; border: 2px solid #ffffff; box-shadow: 0 0 0 1px rgba(15,23,42,0.1); }
        .portal-stage-dot.done { background: #6366f1; box-shadow: 0 0 0 1px #6366f1; }
        .portal-stage-dot.active { background: #ffffff; box-shadow: 0 0 0 2px #6366f1, 0 0 0 6px rgba(99,102,241,0.18); animation: dot-pulse 1.8s ease-in-out infinite; }
        .portal-msg { max-width: 82%; font-size: 12.5px; line-height: 1.5; padding: 9px 12px; border-radius: 12px; margin-bottom: 8px; opacity: 0; animation: msg-in 0.5s ease forwards; }
        .portal-msg.team { background: #ffffff; border: 1px solid rgba(15,23,42,0.07); color: #0f172a; border-bottom-left-radius: 4px; }
        .portal-msg.client { margin-left: auto; background: linear-gradient(135deg, #6366f1, #4f46e5); color: #ffffff; border-bottom-right-radius: 4px; }
        @keyframes msg-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .portal-typing { display: inline-flex; gap: 4px; padding: 10px 12px; background: #ffffff; border: 1px solid rgba(15,23,42,0.07); border-radius: 12px; border-bottom-left-radius: 4px; opacity: 0; animation: msg-in 0.5s ease 2.4s forwards; }
        .portal-typing span { width: 6px; height: 6px; border-radius: 50%; background: rgba(15,23,42,0.35); animation: typing 1.2s ease-in-out infinite; }
        .portal-typing span:nth-child(2) { animation-delay: 0.15s; }
        .portal-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes typing { 0%,60%,100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-4px); opacity: 1; } }
        .portal-btn { display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12.5px; font-weight: 700; padding: 11px; border-radius: 10px; color: #0f172a; background: #ffffff; border: 1px solid rgba(15,23,42,0.12); }
        .portal-btn.primary { color: #ffffff; border: none; background: linear-gradient(135deg, #6366f1, #4f46e5); box-shadow: 0 6px 16px rgba(79,70,229,0.3); }
        .portal-chip {
          position: absolute; display: flex; align-items: center; gap: 8px; white-space: nowrap;
          font-size: 12px; font-weight: 600; color: #0f172a; background: #ffffff; border: 1px solid rgba(15,23,42,0.08);
          padding: 10px 14px; border-radius: 12px; box-shadow: 0 12px 30px rgba(15,23,42,0.12);
        }
        .chip-1 { top: 70px; right: -34px; animation: float 5s ease-in-out infinite; }
        .chip-2 { bottom: 90px; left: -44px; animation: float 6s ease-in-out 1s infinite; }

        @media (max-width: 1100px) {
          .portal-layout { grid-template-columns: 1fr; gap: 56px; }
          .chip-1 { right: 10px; top: -18px; }
          .chip-2 { left: 10px; bottom: -18px; }
        }
        @media (max-width: 640px) {
          #portal { padding: 70px 20px !important; }
          .portal-features { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
