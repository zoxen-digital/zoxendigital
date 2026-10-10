"use client";
import Reveal from "./Reveal";

// A typical agency WhatsApp group: never-ending, unorganised, easy to lose things in.
const chaos = [
  { from: "client", text: "Hi, any update on the website?", time: "9:02" },
  { from: "client", text: "Hello?? Anyone there?", time: "9:40" },
  { from: "agency", text: "It will be done by tomorrow", time: "11:15" },
  { from: "client", text: "Did you get the logo I sent last week?", time: "11:16" },
  { from: "agency", text: "Which one? Can you send it again?", time: "13:30" },
  { from: "client", text: "How much payment is still pending?", time: "14:05" },
  { from: "client", text: "Did you make the changes I asked for?", time: "16:48" },
  { from: "agency", text: "Which changes? Please send a voice note", time: "18:20" },
  { from: "client", text: "When will the website go live???", time: "21:11" },
];

const calm = [
  { label: "Project stage", value: "In Review", tone: "indigo" },
  { label: "Logo & content", value: "Received", tone: "green" },
  { label: "Change requests", value: "2 of 2 done", tone: "green" },
  { label: "Invoice #1024", value: "Paid", tone: "green" },
  { label: "Go-live date", value: "Friday", tone: "indigo" },
];

export default function ChaosVsCalm() {
  return (
    <div className="cvc-grid">
      {/* WhatsApp chaos */}
      <Reveal delay={0.05}>
        <div className="cvc-panel chaos">
          <div className="cvc-wa-head">
            <div className="cvc-avatar">WG</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>Website Project Group</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)" }}>12 participants</div>
            </div>
            <span className="cvc-unread">47</span>
          </div>
          <div className="cvc-wa-body">
            <div className="cvc-scroll">
              {[...chaos, ...chaos].map((m, i) => (
                <div key={i} className={`cvc-wa-msg ${m.from}`}>
                  {m.text}
                  <span className="cvc-time">{m.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="cvc-caption bad">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" /></svg>
            Updates lost, files buried, nobody sure what&apos;s done
          </div>
        </div>
      </Reveal>

      {/* Portal calm */}
      <Reveal delay={0.15}>
        <div className="cvc-panel calm">
          <div className="cvc-portal-head">
            <div style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a" }}>Business Website</div>
            <span className="cvc-synced"><span className="cvc-synced-dot" />All up to date</span>
          </div>
          <div className="cvc-portal-body">
            {calm.map((row, i) => (
              <div key={row.label} className="cvc-row" style={{ animationDelay: `${0.25 + i * 0.12}s` }}>
                <span style={{ fontSize: "13px", color: "rgba(15,23,42,0.65)", fontWeight: 600 }}>{row.label}</span>
                <span className={`cvc-pill ${row.tone}`}>
                  {row.tone === "green" && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  )}
                  {row.value}
                </span>
              </div>
            ))}
          </div>
          <div className="cvc-caption good">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Everything in one place, always clear
          </div>
        </div>
      </Reveal>

      <style>{`
        .cvc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 48px; }
        .cvc-panel { height: 100%; display: flex; flex-direction: column; border-radius: 20px; overflow: hidden; background: #ffffff; }
        .cvc-panel.chaos { border: 1px solid rgba(15,23,42,0.1); box-shadow: 0 14px 34px rgba(15,23,42,0.07); }
        .cvc-panel.calm { border: 1px solid rgba(99,102,241,0.3); box-shadow: 0 24px 60px rgba(79,70,229,0.16); }

        .cvc-wa-head { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: #075e54; }
        .cvc-avatar { width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.25); color: #ffffff; font-size: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .cvc-unread { min-width: 26px; height: 22px; padding: 0 7px; border-radius: 50px; background: #dc2626; color: #ffffff; font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center; animation: unread-pulse 1.4s ease-in-out infinite; }
        @keyframes unread-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
        .cvc-wa-body {
          position: relative; height: 260px; overflow: hidden; padding: 0 14px; background: #efeae2;
          mask-image: linear-gradient(180deg, transparent 0%, black 14%, black 86%, transparent 100%);
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, black 14%, black 86%, transparent 100%);
        }
        .cvc-scroll { display: flex; flex-direction: column; gap: 8px; padding: 10px 0; animation: wa-scroll 22s linear infinite; }
        .cvc-panel.chaos:hover .cvc-scroll { animation-play-state: paused; }
        @keyframes wa-scroll { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        .cvc-wa-msg { max-width: 80%; font-size: 12.5px; line-height: 1.45; color: #111b21; padding: 7px 10px 6px; border-radius: 9px; box-shadow: 0 1px 1px rgba(0,0,0,0.08); }
        .cvc-wa-msg.client { background: #ffffff; border-top-left-radius: 2px; }
        .cvc-wa-msg.agency { margin-left: auto; background: #d9fdd3; border-top-right-radius: 2px; }
        .cvc-time { display: inline-block; margin-left: 8px; font-size: 10px; color: rgba(17,27,33,0.45); }

        .cvc-portal-head { display: flex; align-items: center; justify-content: space-between; padding: 15px 18px; border-bottom: 1px solid rgba(15,23,42,0.07); background: #f8fafc; }
        .cvc-synced { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: #15803d; background: rgba(22,163,74,0.1); border: 1px solid rgba(22,163,74,0.25); padding: 4px 10px; border-radius: 50px; }
        .cvc-synced-dot { width: 6px; height: 6px; border-radius: 50%; background: #16a34a; animation: dot-pulse 1.8s ease-in-out infinite; }
        .cvc-portal-body { flex: 1; height: 260px; padding: 10px 18px; display: flex; flex-direction: column; justify-content: center; }
        .cvc-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px dashed rgba(15,23,42,0.08); animation: fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both; }
        .cvc-row:last-child { border-bottom: none; }
        .cvc-pill { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 50px; }
        .cvc-pill.green { color: #15803d; background: rgba(22,163,74,0.1); }
        .cvc-pill.indigo { color: #4338ca; background: rgba(99,102,241,0.1); }

        .cvc-caption { display: flex; align-items: center; gap: 8px; padding: 13px 18px; font-size: 13px; font-weight: 700; border-top: 1px solid rgba(15,23,42,0.07); }
        .cvc-caption.bad { color: #b91c1c; background: rgba(220,38,38,0.04); }
        .cvc-caption.good { color: #15803d; background: rgba(22,163,74,0.05); }

        @media (max-width: 860px) {
          .cvc-grid { grid-template-columns: 1fr; gap: 24px; }
        }
      `}</style>
    </div>
  );
}
