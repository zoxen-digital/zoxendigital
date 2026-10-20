"use client";
import { useEffect, useRef, useState } from "react";
import ProjectModal from "../components/ProjectModal";

const services = [
  {
    id: "ai-agent", tag: "AI AGENT", title: "AI Agent",
    desc: "Smart agents that answer, qualify and take action inside your business tools, day and night.",
    points: ["Custom AI agents", "Lead qualification & booking", "Knowledge from your own content", "Human handover when needed"],
  },
  {
    id: "ai-automation", tag: "AI AUTOMATION", title: "AI Automation",
    desc: "Workflows that remove repetitive work, from new lead follow-up to reports, so your team can focus on selling.",
    points: ["Lead follow-up automation", "CRM & WhatsApp integrations", "Email and SMS sequences", "Monitoring & alerts"],
  },
  {
    id: "website-development", tag: "WEB", title: "Website Development",
    desc: "Fast, modern websites that rank on Google and turn visitors into enquiries and sales.",
    points: ["Business & landing pages", "E-commerce stores", "SEO-ready structure", "Admin panel & easy updates"],
  },
  {
    id: "software-development", tag: "SOFTWARE", title: "Software Development",
    desc: "Custom portals, dashboards and internal tools built around how your business actually works.",
    points: ["Client & staff portals", "Booking and order systems", "APIs and integrations", "Secure cloud hosting"],
  },
  {
    id: "mobile-app-development", tag: "APP", title: "Mobile App Development",
    desc: "iOS and Android apps your customers keep on their home screen and use every week.",
    points: ["iOS & Android apps", "Cross-platform builds", "App Store & Play Store publishing", "Push notifications"],
  },
  {
    id: "performance-optimization", tag: "PERFORMANCE", title: "Performance Optimization",
    desc: "We find what is slow or losing conversions on your site, then fix it with a clear, measurable plan.",
    points: ["Core Web Vitals", "Page speed & image optimisation", "Conversion rate fixes", "Tracking & analytics setup"],
  },
  {
    id: "technical-support", tag: "SUPPORT", title: "Technical Support",
    desc: "Ongoing care after launch so your website and systems stay fast, safe and up to date.",
    points: ["Website maintenance", "Security updates", "Backups & recovery", "Support tickets in your portal"],
  },
  {
    id: "bpo-services", tag: "OPERATIONS", title: "BPO Services",
    desc: "Customer support and back-office help delivered with the same quality standard as our builds.",
    points: ["Live chat & email support", "Lead handling & data entry", "Appointment setting", "Back-office operations"],
  },
];

function ServiceCard({ s, i }: { s: (typeof services)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div id={s.id} ref={ref} className={`sv-card ${inView ? "in" : ""}`}>
      <div className="sv-meta">
        <span className="sv-num">{String(i + 1).padStart(2, "0")}</span>
        <span className="sv-tag">{s.tag}</span>
      </div>
      <h2 className="sv-title">{s.title}</h2>
      <p className="sv-desc">{s.desc}</p>
      <ul className="sv-points">
        {s.points.map((p, j) => <li key={p} style={{ transitionDelay: `${0.15 + j * 0.06}s` }}>{p}</li>)}
      </ul>
    </div>
  );
}

export default function ServicesContent() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <section style={{ padding: "160px 60px 60px", position: "relative" }}>
        <div className="sv-glow" />
        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
          <div className="sv-eyebrow">SERVICES</div>
          <h1 className="sv-h1">One team for the website, the marketing <span className="gradient-text">and the launch.</span></h1>
          <p className="sv-lead">
            Websites, software, apps, AI and the support that keeps them running. One accountable team from the first call to a live, growing business.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {services.map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}
          </div>

          <button type="button" className="sv-dark-btn" style={{ marginTop: "40px" }} onClick={() => setModal(true)}>
            Discuss your project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </section>

      <section style={{ padding: "40px 60px 100px" }}>
        <div className="sv-cta">
          <div>
            <div className="sv-cta-eyebrow"><span />READY TO BUILD?</div>
            <h2 className="sv-cta-title">Have something worth building?</h2>
            <p className="sv-cta-text">Tell us what you&apos;re working on. We&apos;ll help you figure out the right way to build and grow it.</p>
          </div>
          <button type="button" className="sv-dark-btn" onClick={() => setModal(true)}>
            Start Your Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </section>

      <ProjectModal open={modal} onClose={() => setModal(false)} />

      <style>{`
        .sv-glow { position: absolute; left: 10%; top: 40px; width: 700px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(129,140,248,0.22), transparent 65%); filter: blur(20px); pointer-events: none; }
        .sv-eyebrow { font-size: 14px; font-weight: 600; letter-spacing: 3px; color: rgba(15,23,42,0.55); margin-bottom: 24px; }
        .sv-h1 { font-size: clamp(36px, 5.4vw, 72px); font-weight: 800; letter-spacing: -2.5px; line-height: 1.05; color: #0f172a; max-width: 980px; margin-bottom: 26px; }
        .sv-lead { font-size: 19px; line-height: 1.75; color: rgba(15,23,42,0.6); max-width: 780px; margin-bottom: 64px; }

        .sv-card {
          position: relative; overflow: hidden; padding: 40px 42px; border-radius: 28px;
          background: linear-gradient(110deg, rgba(238,242,255,0.95), rgba(255,255,255,0.9) 55%, #ffffff);
          border: 1px solid rgba(99,102,241,0.14); box-shadow: 0 8px 30px rgba(15,23,42,0.04);
          opacity: 0; transform: translateY(36px); transition: opacity 0.7s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s, border-color 0.35s;
        }
        .sv-card.in { opacity: 1; transform: none; }
        .sv-card::before { content: ""; position: absolute; inset: 0; background: radial-gradient(600px circle at 0% 0%, rgba(129,140,248,0.18), transparent 50%); opacity: 0; transition: opacity 0.4s; pointer-events: none; }
        .sv-card:hover { border-color: rgba(99,102,241,0.35); box-shadow: 0 20px 50px rgba(79,70,229,0.12); }
        .sv-card:hover::before { opacity: 1; }
        .sv-meta { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
        .sv-num { font-size: 15px; font-weight: 800; letter-spacing: 2px; color: #0f172a; }
        .sv-tag { font-size: 12px; font-weight: 700; letter-spacing: 2px; color: #4338ca; padding: 6px 13px; border-radius: 50px; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.25); }
        .sv-title { font-size: clamp(26px, 3vw, 38px); font-weight: 800; letter-spacing: -1.2px; color: #0f172a; margin-bottom: 14px; }
        .sv-desc { font-size: 18px; color: rgba(15,23,42,0.8); line-height: 1.6; margin-bottom: 22px; max-width: 900px; }
        .sv-points { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 14px 40px; }
        .sv-points li { position: relative; padding-left: 20px; font-size: 16.5px; color: rgba(15,23,42,0.6); opacity: 0; transform: translateX(-8px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .sv-card.in .sv-points li { opacity: 1; transform: none; }
        .sv-points li::before { content: ""; position: absolute; left: 0; top: 9px; width: 7px; height: 7px; border-radius: 50%; background: #818cf8; box-shadow: 0 0 0 3px rgba(129,140,248,0.2); }

        .sv-dark-btn { display: inline-flex; align-items: center; gap: 12px; padding: 20px 32px; border-radius: 50px; border: none; cursor: pointer; font-size: 17px; font-weight: 700; color: #ffffff; background: #0f172a; box-shadow: 0 14px 30px rgba(15,23,42,0.22); transition: transform 0.3s, box-shadow 0.3s; }
        .sv-dark-btn:hover { transform: translateY(-2px); box-shadow: 0 18px 38px rgba(79,70,229,0.32); }

        .sv-cta {
          max-width: 1280px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 32px;
          padding: 56px 48px; border-radius: 32px; background: radial-gradient(circle at 100% 70%, rgba(165,180,252,0.45), transparent 40%), #ffffff;
          border: 1px solid rgba(15,23,42,0.06); box-shadow: 0 20px 60px rgba(15,23,42,0.07);
        }
        .sv-cta-eyebrow { display: flex; align-items: center; gap: 14px; font-size: 17px; font-weight: 600; letter-spacing: 4px; color: rgba(15,23,42,0.6); margin-bottom: 14px; }
        .sv-cta-eyebrow span { width: 36px; height: 2px; background: #0f172a; }
        .sv-cta-title { font-size: clamp(28px, 3.6vw, 46px); font-weight: 800; letter-spacing: -1.5px; color: #0f172a; margin-bottom: 14px; }
        .sv-cta-text { font-size: 18px; line-height: 1.7; color: rgba(15,23,42,0.6); max-width: 640px; }

        @media (max-width: 800px) {
          section { padding-left: 16px !important; padding-right: 16px !important; }
          .sv-card { padding: 28px 22px; border-radius: 22px; }
          .sv-points { grid-template-columns: 1fr; }
          .sv-cta { flex-direction: column; align-items: flex-start; padding: 36px 24px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sv-card, .sv-points li { opacity: 1; transform: none; }
        }
      `}</style>
    </>
  );
}
