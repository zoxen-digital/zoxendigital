"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const sites = [
  { name: "Cobb Church Network", url: "https://www.cobbchurchnetwork.org/" },
  { name: "Merchant Orders", url: "https://www.merchantorders.io/" },
  { name: "Stride Shockey Sales", url: "https://www.strideshockeysales.com/" },
  { name: "M2M Pro Cleaners", url: "https://www.m2mprocleaners.ca/" },
  { name: "Little Sunshine ECLC", url: "https://www.littlesunshineeclc.ca/" },
];

type SiteCarouselProps = {
  id?: string;
  eyebrow?: string;
  heading?: string;
};

const DESKTOP_WIDTH = 1440;
const DESKTOP_HEIGHT = 900;

function SitePreview({ url, name }: { url: string; name: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      if (width > 0) setScale(width / DESKTOP_WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-iframe-wrap" ref={wrapRef}>
      <iframe
        src={url}
        title={name}
        loading="lazy"
        style={{
          width: `${DESKTOP_WIDTH}px`,
          height: `${DESKTOP_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}

export default function SiteCarousel({ id, eyebrow = "OUR WORK", heading = "Sites We've Built & Launched" }: SiteCarouselProps) {
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const startXRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current) {
        setActive((prev) => (prev + 1) % sites.length);
      }
    }, 15000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => setActive(((i % sites.length) + sites.length) % sites.length);

  function scheduleResume() {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => { pausedRef.current = false; }, 4000);
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    draggingRef.current = true;
    pausedRef.current = true;
    startXRef.current = e.clientX;
    containerRef.current?.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    setDragOffset(e.clientX - startXRef.current);
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const width = containerRef.current?.offsetWidth || 1;
    const threshold = width * 0.15;
    if (dragOffset > threshold) goTo(active - 1);
    else if (dragOffset < -threshold) goTo(active + 1);
    setDragOffset(0);
    try { containerRef.current?.releasePointerCapture(e.pointerId); } catch {}
    scheduleResume();
  }

  return (
    <section id={id} style={{ padding: "100px 80px", overflow: "hidden", position: "relative" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="section-eyebrow" style={{ marginBottom: "14px" }}>{eyebrow}</p>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: "800", color: "#0f172a" }}>
            {heading}
          </h2>
        </div>
        </Reveal>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button className="site-nav-btn" onClick={() => { goTo(active - 1); pausedRef.current = true; scheduleResume(); }} aria-label="Previous site">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <div
            ref={containerRef}
            className="site-carousel"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={(e) => draggingRef.current && endDrag(e)}
            onMouseEnter={() => { pausedRef.current = true; }}
            onMouseLeave={() => { if (!draggingRef.current) pausedRef.current = false; }}
          >
            {sites.map((site, i) => {
              let offset = i - active;
              if (offset > sites.length / 2) offset -= sites.length;
              if (offset < -sites.length / 2) offset += sites.length;
              const isCenter = offset === 0;
              const abs = Math.abs(offset);
              const dragPct = containerRef.current ? (dragOffset / containerRef.current.offsetWidth) * 100 : 0;

              return (
                <div
                  key={site.url}
                  className="site-slide"
                  onClick={() => !draggingRef.current && goTo(i)}
                  style={{
                    transform: `translateX(${offset * 62 + dragPct}%) scale(${isCenter ? 1 : abs === 1 ? 0.78 : 0.6})`,
                    opacity: abs > 2 ? 0 : isCenter ? 1 : abs === 1 ? 0.5 : 0.25,
                    zIndex: isCenter ? 3 : 3 - abs,
                    pointerEvents: abs > 2 ? "none" : "auto",
                    transition: draggingRef.current ? "none" : "transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease",
                  }}
                >
                  <div className="site-browser-bar">
                    <span className="site-browser-dot" style={{ background: "#ff5f57" }} />
                    <span className="site-browser-dot" style={{ background: "#febc2e" }} />
                    <span className="site-browser-dot" style={{ background: "#28c840" }} />
                    <span className="site-browser-url">{site.url.replace("https://www.", "").replace(/\/$/, "")}</span>
                  </div>
                  <SitePreview url={site.url} name={site.name} />
                  <div className="site-caption">
                    <span>{site.name}</span>
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="site-visit-link"
                    >
                      Visit Website
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H7M17 7v10" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="site-nav-btn" onClick={() => { goTo(active + 1); pausedRef.current = true; scheduleResume(); }} aria-label="Next site">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "28px" }}>
          {sites.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); pausedRef.current = true; scheduleResume(); }}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === active ? "22px" : "8px",
                height: "8px",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
                background: i === active ? "#6366f1" : "rgba(15,23,42,0.26)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .site-carousel {
          position: relative;
          flex: 1;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          touch-action: pan-y;
          user-select: none;
        }
        .site-nav-btn {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(15,23,42,0.05);
          border: 1px solid rgba(15,23,42,0.16);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .site-nav-btn:hover {
          background: rgba(99,102,241,0.15);
          border-color: rgba(99,102,241,0.4);
        }
        .site-slide {
          position: absolute;
          width: 560px;
          max-width: 80vw;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(15,23,42,0.13);
          background: #ffffff;
          box-shadow: 0 30px 60px rgba(15,23,42,0.13);
          cursor: pointer;
        }
        .site-browser-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          background: #f1f5f9;
          border-bottom: 1px solid rgba(15,23,42,0.08);
        }
        .site-browser-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
        .site-browser-url {
          margin-left: 10px;
          font-size: 11px;
          color: rgba(15,23,42,0.59);
          background: rgba(15,23,42,0.05);
          border-radius: 6px;
          padding: 3px 10px;
          flex: 1;
          text-align: left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .site-iframe-wrap {
          width: 100%;
          height: 300px;
          overflow: hidden;
          background: white;
          pointer-events: none;
        }
        .site-iframe-wrap iframe {
          border: none;
        }
        .site-caption {
          padding: 12px 16px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .site-caption span {
          color: #0f172a;
          font-size: 14px;
          font-weight: 700;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .site-visit-link {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #4f46e5;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          flex-shrink: 0;
        }
        .site-visit-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 700px) {
          .site-carousel { height: 340px; }
          .site-slide { width: 320px; }
          .site-iframe-wrap { height: 220px; }
          .site-nav-btn { width: 34px; height: 34px; }
        }
      `}</style>
    </section>
  );
}
