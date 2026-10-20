"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import ProjectModal from "./ProjectModal";

// "Ready to build?" banner; the button opens the Start-your-project popup (sends to the portal).
export default function CtaBar({ id = "contact" }: { id?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <section id={id} style={{ padding: "60px 60px 100px", scrollMarginTop: "100px" }}>
      <Reveal>
        <div className="cta-bar">
          <div>
            <div className="cta-eyebrow"><span />READY TO BUILD?</div>
            <h2 className="cta-title">Have something worth building?</h2>
            <p className="cta-text">Tell us what you&apos;re working on. We&apos;ll help you figure out the right way to build and grow it.</p>
          </div>
          <button type="button" className="cta-btn" onClick={() => setOpen(true)}>
            Start Your Project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </Reveal>

      <ProjectModal open={open} onClose={() => setOpen(false)} />

      <style>{`
        .cta-bar {
          max-width: 1280px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; gap: 32px;
          padding: 56px 48px; border-radius: 32px; background: radial-gradient(circle at 100% 70%, rgba(165,180,252,0.45), transparent 40%), #ffffff;
          border: 1px solid rgba(15,23,42,0.06); box-shadow: 0 20px 60px rgba(15,23,42,0.07);
        }
        .cta-eyebrow { display: flex; align-items: center; gap: 14px; font-size: 17px; font-weight: 600; letter-spacing: 4px; color: rgba(15,23,42,0.6); margin-bottom: 14px; }
        .cta-eyebrow span { width: 36px; height: 2px; background: #0f172a; }
        .cta-title { font-size: clamp(28px, 3.6vw, 46px); font-weight: 800; letter-spacing: -1.5px; color: #0f172a; margin-bottom: 14px; }
        .cta-text { font-size: 18px; line-height: 1.7; color: rgba(15,23,42,0.6); max-width: 640px; }
        .cta-btn { flex-shrink: 0; display: inline-flex; align-items: center; gap: 12px; padding: 20px 32px; border-radius: 50px; border: none; cursor: pointer; font-size: 17px; font-weight: 700; color: #ffffff; background: #0f172a; box-shadow: 0 14px 30px rgba(15,23,42,0.22); transition: transform 0.3s, box-shadow 0.3s; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 18px 38px rgba(79,70,229,0.32); }
        @media (max-width: 800px) {
          #${id} { padding: 40px 16px 70px !important; }
          .cta-bar { flex-direction: column; align-items: flex-start; padding: 36px 24px; }
        }
      `}</style>
    </section>
  );
}
