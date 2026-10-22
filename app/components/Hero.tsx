"use client";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import ProjectModal from "./ProjectModal";

/* ---------- small animated pieces ---------- */

function useCount(to: number, ms = 1800, decimals = 0) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, ms]);
  return v.toFixed(decimals);
}

// Types text out, then waits and starts again (key changes restart it).
function useTyped(text: string, speed = 28, startDelay = 0, loop = 9000) {
  const [n, setN] = useState(0);
  const [round, setRound] = useState(0);
  useEffect(() => {
    let i = 0;
    let typer: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      typer = setInterval(() => {
        i++;
        setN(i);
        if (i >= text.length) clearInterval(typer);
      }, speed);
    }, startDelay);
    const again = setTimeout(() => { setN(0); setRound((r) => r + 1); }, loop);
    return () => { clearTimeout(start); clearTimeout(again); clearInterval(typer); };
  }, [text, speed, startDelay, loop, round]);
  return text.slice(0, n);
}

const codeLines = [
  { t: "// launch.tsx", c: "cm" },
  { t: "export async function grow(brand) {", c: "" },
  { t: "  const site = build(brand)", c: "" },
  { t: "  const smart = withAI(site, 'leads')", c: "" },
  { t: "  await launch(smart)", c: "" },
  { t: "  return 'more customers'", c: "" },
  { t: "}", c: "" },
];
const codeText = codeLines.map((l) => l.t).join("\n");

function CodeCard() {
  const typed = useTyped(codeText, 32, 600, 10000);
  const lines = typed.split("\n");
  return (
    <div className="hv-code-body">
      {codeLines.map((_, i) => (
        <div key={i} className="hv-code-line">
          <span className="hv-ln">{i + 1}</span>
          <span className={i === 0 ? "hv-cm" : ""}>
            {highlight(lines[i] ?? "")}
            {i === lines.length - 1 && <span className="hv-caret" />}
          </span>
        </div>
      ))}
    </div>
  );
}

// Tiny syntax colouring for the fake code editor.
function highlight(s: string) {
  return s.split(/(export|async|function|const|await|return|'[^']*'?)/g).map((part, i) => {
    if (/^(export|async|function|const|await|return)$/.test(part)) return <span key={i} className="hv-kw">{part}</span>;
    if (part.startsWith("'")) return <span key={i} className="hv-str">{part}</span>;
    return part;
  });
}

function AssistantCard() {
  const reply = useTyped("Done. Replied to 14 new leads on WhatsApp and booked 5 strategy calls for this week.", 26, 1400, 9000);
  return (
    <div className="hv-chat">
      <div className="hv-user-msg">Follow up with today&apos;s new leads</div>
      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", minHeight: "66px" }}>
        <span className="hv-ai-badge">AI</span>
        <p className="hv-ai-text">{reply}{reply.length > 0 && reply.length < 84 && <span className="hv-caret dark" />}</p>
      </div>
      <div className="hv-ask"><span>Ask anything…</span><span className="hv-send" /></div>
    </div>
  );
}

function AnalyticsCard() {
  const revenue = useCount(48.2, 1800, 1);
  const leads = useCount(1248, 1800);
  const conv = useCount(4.8, 1800, 1);
  return (
    <>
      <div className="hv-stats">
        <div><span className="hv-label">REVENUE</span><b>${revenue}k</b><span className="hv-up">+12%</span></div>
        <div><span className="hv-label">NEW LEADS</span><b>{Number(leads).toLocaleString()}</b><span className="hv-up">+8%</span></div>
        <div><span className="hv-label">CONVERSION</span><b>{conv}%</b><span className="hv-up">+0.6</span></div>
      </div>
      <div className="hv-chart">
        {[30, 44, 36, 58, 50, 66, 56, 78, 72, 96].map((h, i) => (
          <span key={i} className={i === 9 ? "hi" : i >= 7 ? "mid" : ""} style={{ height: `${h}%`, animationDelay: `${0.2 + i * 0.07}s` }} />
        ))}
        <svg viewBox="0 0 300 80" preserveAspectRatio="none" className="hv-line">
          <path d="M0 60 C 40 50, 70 44, 110 46 S 170 44, 200 34 S 260 18, 300 12" />
        </svg>
      </div>
    </>
  );
}

function PhoneCard() {
  const [mins, setMins] = useState(12);
  useEffect(() => {
    const t = setInterval(() => setMins((m) => (m <= 8 ? 12 : m - 1)), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="hv-phone">
      <div className="hv-notch" />
      <div className="hv-phone-top"><span>9:41</span><span className="hv-bars" /></div>
      <div className="hv-map">
        <span className="hv-order">Order #2048</span>
        <div className="hv-block a" /><div className="hv-block b" /><div className="hv-block c" />
        <svg viewBox="0 0 160 170" className="hv-route">
          <path id="hv-route-path" d="M30 150 L30 100 Q30 80 50 80 L110 80 Q130 80 130 60 L130 20" />
          <circle r="7" className="hv-courier"><animateMotion dur="6s" repeatCount="indefinite" path="M30 150 L30 100 Q30 80 50 80 L110 80 Q130 80 130 60 L130 20" /></circle>
          <circle cx="130" cy="20" r="6" className="hv-dest" />
        </svg>
      </div>
      <div className="hv-sheet">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><div className="hv-label" style={{ fontSize: "8px" }}>ARRIVING IN</div><b style={{ fontSize: "20px" }}>{mins}</b><span style={{ fontSize: "10px", color: "rgba(15,23,42,0.5)" }}> min</span></div>
          <span className="hv-live-pill"><span />Live</span>
        </div>
        <div className="hv-progress"><span /><span /><span className="go" /></div>
        <div className="hv-driver"><span className="hv-avatar">M</span><span style={{ flex: 1 }}><b style={{ fontSize: "10px" }}>Marco R.</b><br /><span style={{ fontSize: "8px", color: "rgba(15,23,42,0.5)" }}>★ 4.9</span></span><span className="hv-call" /></div>
      </div>
    </div>
  );
}

/* ---------- hero ---------- */

export default function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <section id="home" className="hero-section" style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", padding: "130px 60px 80px" }}>
      <div className="hero-glow" />
      <div className="hero-grid">
        {/* Left */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <Reveal delay={0}>
            <div className="hero-badge"><span className="hero-badge-ring" />WEBSITE DESIGN &amp; DEVELOPMENT · ADS · SEO · AI</div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="hero-title">
              Your growth. Our code.<br />
              <span className="hero-highlight">A little AI.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="hero-sub">
              We design and build websites, run ads and SEO, and add AI chatbots and automation for businesses that need to sell more and grow faster.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "36px" }}>
              <button type="button" className="hero-cmd" onClick={() => setModalOpen(true)}>
                <span><span style={{ color: "#a5b4fc" }}>$</span> start-your-project</span>
                <span className="hero-enter">ENTER
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 10l-5 5 5 5M20 4v7a4 4 0 01-4 4H4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </button>
              <a href="#portal" className="hero-ghost">
                See how it works
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div className="hero-avatars">
                <span style={{ background: "#0f172a", color: "#fff", fontSize: "10px" }}>5.0</span>
                <span style={{ background: "#e0e7ff", color: "#4338ca" }}>W</span>
                <span style={{ background: "#fff", color: "#0f172a" }}>S</span>
                <span style={{ background: "#ede9fe", color: "#6d28d9" }}>A</span>
              </div>
              <span style={{ fontSize: "15px", color: "rgba(15,23,42,0.6)" }}>Trusted by <b style={{ color: "#0f172a" }}>50+ growing businesses</b></span>
            </div>
          </Reveal>
        </div>

        {/* Right: floating product cards */}
        <div className="hv-scale">
          <div className="hv-stage">
            <div className="hv-card c-analytics"><div className="hv-float f1">
              <div className="hv-win">
                <div className="hv-bar"><i /><i /><i /><span className="hv-url">zoxendigital.com/analytics</span></div>
                <div style={{ padding: "16px 18px 14px" }}><AnalyticsCard /></div>
              </div>
            </div></div>

            <div className="hv-card c-light"><div className="hv-float f2">
              <div className="hv-pill">
                <svg width="46" height="46" viewBox="0 0 46 46" className="hv-ring">
                  <circle cx="23" cy="23" r="19" className="bg" />
                  <circle cx="23" cy="23" r="19" className="fg" />
                </svg>
                <span className="hv-ring-num">98</span>
                <span><b style={{ fontSize: "16px", fontStyle: "italic" }}>Lighthouse</b><br /><span style={{ fontSize: "12px", color: "rgba(15,23,42,0.5)" }}>performance</span></span>
              </div>
            </div></div>

            <div className="hv-card c-code"><div className="hv-float f3">
              <div className="hv-win dark">
                <div className="hv-bar dark"><i /><i /><i /><span className="hv-url dark">zoxen.dev/launch.tsx</span></div>
                <CodeCard />
              </div>
            </div></div>

            <div className="hv-card c-deploy"><div className="hv-float f4">
              <div className="hv-pill small">
                <span className="hv-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                <span><b style={{ fontSize: "14px" }}>Website live</b><br /><span style={{ fontSize: "11px", color: "rgba(15,23,42,0.5)" }}>deployed · 1.2s</span></span>
              </div>
            </div></div>

            <div className="hv-card c-assistant"><div className="hv-float f5">
              <div className="hv-win">
                <div className="hv-bar"><i /><i /><i /><span className="hv-url">zoxen.ai/assistant</span></div>
                <AssistantCard />
              </div>
            </div></div>

            <div className="hv-card c-phone"><div className="hv-float f6"><PhoneCard /></div></div>
          </div>
        </div>
      </div>

      <ProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <style>{`
        .hero-section { background: linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%); }
        .hero-glow { position: absolute; width: 700px; height: 700px; right: 5%; top: 5%; border-radius: 50%; background: radial-gradient(circle, rgba(129,140,248,0.22), transparent 65%); filter: blur(10px); pointer-events: none; }
        .hero-grid { position: relative; width: 100%; max-width: 1320px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }

        .hero-badge { display: inline-flex; align-items: center; gap: 10px; padding: 9px 16px 9px 10px; border-radius: 50px; background: #ffffff; border: 1px solid rgba(15,23,42,0.08); box-shadow: 0 4px 14px rgba(15,23,42,0.05); font-size: 13px; font-weight: 600; letter-spacing: 2.5px; color: #0f172a; margin-bottom: 30px; }
        .hero-badge-ring { width: 16px; height: 16px; border-radius: 50%; border: 3px solid #0f172a; background: #a5b4fc; box-shadow: 0 0 0 3px rgba(99,102,241,0.2); animation: dot-pulse 2s ease-in-out infinite; }
        .hero-title { font-size: clamp(42px, 6vw, 82px); font-weight: 800; line-height: 1.02; letter-spacing: -3px; color: #0f172a; margin-bottom: 28px; }
        .hero-highlight { position: relative; display: inline-block; padding: 0 14px; margin-top: 6px; color: #ffffff; z-index: 0; }
        .hero-highlight::before { content: ""; position: absolute; inset: 6% -2px 2%; z-index: -1; border-radius: 14px; background: linear-gradient(135deg, #6366f1, #7c3aed); transform: skewX(-6deg) scaleX(0); transform-origin: left; animation: hl-in 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s forwards; box-shadow: 0 14px 30px rgba(99,102,241,0.35); }
        @keyframes hl-in { to { transform: skewX(-6deg) scaleX(1); } }
        .hero-sub { font-size: 19px; line-height: 1.7; color: rgba(15,23,42,0.62); max-width: 580px; margin-bottom: 36px; }

        .hero-cmd { border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 22px; padding: 10px 10px 10px 24px; border-radius: 16px; background: #0f172a; color: #ffffff; text-decoration: none; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 17px; box-shadow: 0 16px 34px rgba(15,23,42,0.25); transition: transform 0.3s, box-shadow 0.3s; }
        .hero-cmd:hover { transform: translateY(-2px); box-shadow: 0 20px 40px rgba(79,70,229,0.35); }
        .hero-enter { display: inline-flex; align-items: center; gap: 8px; padding: 12px 16px; border-radius: 10px; font-family: var(--font-body), sans-serif; font-size: 14px; font-weight: 800; letter-spacing: 1px; color: #0f172a; background: linear-gradient(135deg, #c7d2fe, #a5b4fc); }
        .hero-ghost { display: inline-flex; align-items: center; gap: 12px; padding: 18px 26px; border-radius: 16px; color: #0f172a; text-decoration: none; font-size: 17px; font-weight: 600; border: 1.5px dashed rgba(15,23,42,0.2); background: rgba(255,255,255,0.6); transition: all 0.3s; }
        .hero-ghost:hover { border-color: #6366f1; color: #4338ca; }
        .hero-avatars { display: flex; }
        .hero-avatars span { width: 34px; height: 34px; margin-left: -8px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; border: 2px solid #f8fafc; box-shadow: 0 2px 6px rgba(15,23,42,0.1); }
        .hero-avatars span:first-child { margin-left: 0; }

        /* stage */
        .hv-scale { position: relative; height: 600px; }
        .hv-stage { position: absolute; left: 0; top: 0; width: 620px; height: 700px; }
        .hv-card { position: absolute; transition: transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.4s, filter 0.4s; }
        .hv-stage:hover .hv-card { opacity: 0.55; filter: saturate(0.4) blur(0.6px); }
        .hv-stage .hv-card:hover { opacity: 1; filter: none; z-index: 30 !important; transform: scale(1.04); }
        .hv-float { animation: hv-bob 6s ease-in-out infinite; }
        .f1 { animation-delay: 0s; } .f2 { animation-delay: -1s; } .f3 { animation-delay: -2.5s; } .f4 { animation-delay: -3.5s; } .f5 { animation-delay: -1.8s; } .f6 { animation-delay: -4.2s; }
        @keyframes hv-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

        .c-analytics { left: 20px; top: 30px; width: 420px; z-index: 2; rotate: -2deg; }
        .c-light { left: 440px; top: 0; z-index: 5; rotate: 3deg; }
        .c-code { left: 215px; top: 170px; width: 400px; z-index: 3; rotate: 2deg; }
        .c-deploy { left: 0; top: 330px; z-index: 6; rotate: -2deg; }
        .c-assistant { left: 40px; top: 405px; width: 390px; z-index: 4; rotate: 1.5deg; }
        .c-phone { left: 430px; top: 315px; z-index: 7; rotate: -6deg; }

        .hv-win { background: #ffffff; border-radius: 18px; border: 1px solid rgba(15,23,42,0.07); box-shadow: 0 30px 60px rgba(15,23,42,0.12); overflow: hidden; }
        .hv-win.dark { background: #13132b; border-color: rgba(255,255,255,0.06); box-shadow: 0 30px 60px rgba(15,23,42,0.35); }
        .hv-bar { display: flex; align-items: center; gap: 6px; padding: 12px 14px; border-bottom: 1px solid rgba(15,23,42,0.06); }
        .hv-bar.dark { border-color: rgba(255,255,255,0.07); }
        .hv-bar i { width: 9px; height: 9px; border-radius: 50%; background: #e2e8f0; }
        .hv-bar i:first-child { background: #818cf8; }
        .hv-bar.dark i { background: #33334d; } .hv-bar.dark i:first-child { background: #818cf8; }
        .hv-url { margin-left: 10px; font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 11.5px; color: rgba(15,23,42,0.5); background: #f1f5f9; padding: 4px 10px; border-radius: 6px; }
        .hv-url.dark { color: rgba(255,255,255,0.55); background: rgba(255,255,255,0.06); }

        .hv-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .hv-stats b { display: block; font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; margin: 4px 0 6px; }
        .hv-label { display: block; font-size: 10.5px; letter-spacing: 1.5px; color: rgba(15,23,42,0.5); }
        .hv-up { display: inline-block; font-size: 11px; font-weight: 700; color: #4338ca; background: #e0e7ff; padding: 3px 8px; border-radius: 50px; }
        .hv-chart { position: relative; display: flex; align-items: flex-end; gap: 7px; height: 92px; margin-top: 16px; padding-top: 12px; border-top: 1px dashed rgba(15,23,42,0.1); }
        .hv-chart span { flex: 1; border-radius: 4px 4px 2px 2px; background: #eef0f4; transform: scaleY(0); transform-origin: bottom; animation: hv-grow 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
        .hv-chart span.mid { background: #d4d8e3; }
        .hv-chart span.hi { background: linear-gradient(180deg, #818cf8, #6366f1); box-shadow: 0 6px 14px rgba(99,102,241,0.35); }
        @keyframes hv-grow { to { transform: scaleY(1); } }
        .hv-line { position: absolute; left: 0; right: 30%; top: 4px; height: 70px; width: 70%; overflow: visible; }
        .hv-line path { fill: none; stroke: #0f172a; stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: 400; stroke-dashoffset: 400; animation: hv-draw 2s ease 0.6s forwards; }
        @keyframes hv-draw { to { stroke-dashoffset: 0; } }

        .hv-pill { position: relative; display: flex; align-items: center; gap: 14px; padding: 12px 20px 12px 12px; border-radius: 18px; background: #ffffff; border: 1px solid rgba(15,23,42,0.06); box-shadow: 0 20px 40px rgba(15,23,42,0.1); color: #0f172a; }
        .hv-pill.small { padding: 12px 18px 12px 12px; }
        .hv-ring { transform: rotate(-90deg); }
        .hv-ring circle { fill: none; stroke-width: 4; }
        .hv-ring .bg { stroke: #e2e8f0; }
        .hv-ring .fg { stroke: #6366f1; stroke-linecap: round; stroke-dasharray: 119.4; stroke-dashoffset: 119.4; animation: hv-ring 1.8s ease 0.8s forwards; }
        @keyframes hv-ring { to { stroke-dashoffset: 2.4; } }
        .hv-ring-num { position: absolute; left: 12px; width: 46px; text-align: center; font-size: 14px; font-weight: 800; }
        .hv-check { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #22c55e, #16a34a); box-shadow: 0 6px 14px rgba(22,163,74,0.35); animation: hv-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) 1.2s both; }
        @keyframes hv-pop { from { transform: scale(0); } to { transform: scale(1); } }

        .hv-code-body { padding: 16px 18px 20px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 13.5px; line-height: 1.95; color: #e2e8f0; min-height: 200px; }
        .hv-code-line { display: flex; gap: 16px; white-space: pre; }
        .hv-ln { width: 12px; text-align: right; color: rgba(255,255,255,0.28); }
        .hv-cm { color: rgba(255,255,255,0.45); }
        .hv-kw { color: #a5b4fc; }
        .hv-str { color: #c4b5fd; }
        .hv-caret { display: inline-block; width: 8px; height: 15px; margin-left: 2px; vertical-align: -2px; background: #a5b4fc; animation: hv-blink 1s steps(1) infinite; }
        .hv-caret.dark { background: #6366f1; width: 2px; }
        @keyframes hv-blink { 50% { opacity: 0; } }

        .hv-chat { padding: 16px 18px 18px; }
        .hv-user-msg { margin-left: auto; width: fit-content; max-width: 80%; padding: 11px 16px; border-radius: 14px; background: #0f172a; color: #ffffff; font-size: 14px; margin-bottom: 14px; animation: hv-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.6s both; }
        .hv-ai-badge { flex-shrink: 0; width: 30px; height: 30px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; color: #4338ca; background: #e0e7ff; }
        .hv-ai-text { font-size: 14px; line-height: 1.6; color: rgba(15,23,42,0.75); }
        .hv-ask { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; padding: 10px 10px 10px 16px; border-radius: 50px; border: 1px solid rgba(15,23,42,0.1); font-size: 13px; color: rgba(15,23,42,0.4); }
        .hv-send { width: 26px; height: 26px; border-radius: 50%; background: #0f172a; }

        .hv-phone { position: relative; width: 180px; height: 360px; padding: 10px; border-radius: 34px; background: #0f172a; box-shadow: 0 30px 60px rgba(15,23,42,0.35); }
        .hv-notch { position: absolute; top: 14px; left: 50%; width: 64px; height: 18px; margin-left: -32px; border-radius: 20px; background: #0f172a; z-index: 3; }
        .hv-phone-top { position: absolute; top: 14px; left: 26px; right: 26px; display: flex; justify-content: space-between; font-size: 9px; font-weight: 700; color: #0f172a; z-index: 2; }
        .hv-bars { width: 22px; height: 8px; border-radius: 2px; border: 1.5px solid #0f172a; }
        .hv-map { position: relative; height: 200px; border-radius: 26px 26px 0 0; background: #eef2f7; overflow: hidden; }
        .hv-order { position: absolute; top: 40px; left: 34px; z-index: 2; font-size: 10px; font-weight: 700; color: #0f172a; background: #ffffff; padding: 5px 10px; border-radius: 50px; box-shadow: 0 4px 10px rgba(15,23,42,0.1); }
        .hv-block { position: absolute; background: #ffffff; border-radius: 6px; }
        .hv-block.a { left: 60px; top: 30px; width: 70px; height: 60px; background: #e0e7ff; }
        .hv-block.b { left: 12px; top: 110px; width: 50px; height: 40px; }
        .hv-block.c { left: 80px; top: 120px; width: 60px; height: 50px; }
        .hv-route { position: absolute; inset: 20px 0 0 0; width: 100%; height: 100%; }
        .hv-route path { fill: none; stroke: #0f172a; stroke-width: 6; stroke-linecap: round; stroke-linejoin: round; }
        .hv-courier { fill: #ffffff; stroke: #0f172a; stroke-width: 4; }
        .hv-dest { fill: #a5b4fc; stroke: #0f172a; stroke-width: 3; }
        .hv-sheet { height: 140px; padding: 12px 12px 10px; border-radius: 0 0 26px 26px; background: #ffffff; }
        .hv-live-pill { display: inline-flex; align-items: center; gap: 4px; font-size: 9px; font-weight: 700; color: #4338ca; background: #e0e7ff; padding: 3px 8px; border-radius: 50px; }
        .hv-live-pill span { width: 5px; height: 5px; border-radius: 50%; background: #6366f1; animation: dot-pulse 1.5s infinite; }
        .hv-progress { display: flex; gap: 4px; margin: 10px 0; }
        .hv-progress span { flex: 1; height: 3px; border-radius: 3px; background: #0f172a; }
        .hv-progress span.go { background: linear-gradient(90deg, #0f172a 40%, #e2e8f0 40%); animation: hv-go 6s linear infinite; background-size: 200% 100%; }
        @keyframes hv-go { from { background-position: 100% 0; } to { background-position: 0 0; } }
        .hv-driver { display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 12px; background: #f1f5f9; }
        .hv-avatar { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 800; color: #fff; background: #0f172a; }
        .hv-call { width: 22px; height: 22px; border-radius: 50%; background: #c7d2fe; }

        @media (max-width: 1200px) {
          .hv-scale { height: 570px; }
          .hv-stage { transform: scale(0.8); transform-origin: top left; }
        }
        @media (max-width: 1000px) {
          section#home { padding: 110px 20px 60px !important; min-height: auto !important; }
          .hero-grid { grid-template-columns: 1fr; gap: 20px; }
          .hv-scale { height: 475px; overflow: hidden; }
          .hv-stage { left: 50%; transform: translateX(-50%) scale(0.66); transform-origin: top center; }
          .hero-title { letter-spacing: -2px; }
        }
        @media (max-width: 520px) {
          .hero-badge { font-size: 10.5px; letter-spacing: 1.2px; padding: 8px 12px 8px 8px; gap: 8px; }
          .hv-scale { height: 375px; }
          .hv-stage { transform: translateX(-50%) scale(0.52); }
          .hero-cmd { font-size: 15px; gap: 14px; }
          .hero-sub { font-size: 17px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hv-float { animation: none; }
        }
      `}</style>
    </section>
  );
}
