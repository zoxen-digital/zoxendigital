"use client";
import { useState, useEffect } from "react";
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

export default function SiteCarousel({ id, eyebrow = "OUR WORK", heading = "Sites We've Built & Launched" }: SiteCarouselProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % sites.length);
    }, 15000);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => setActive(((i % sites.length) + sites.length) % sites.length);

  return (
    <section id={id} style={{ padding: "100px 80px", overflow: "hidden", position: "relative" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="section-eyebrow" style={{ marginBottom: "14px" }}>{eyebrow}</p>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: "800", color: "white" }}>
            {heading}
          </h2>
        </div>
        </Reveal>

        <div className="site-carousel">
          {sites.map((site, i) => {
            let offset = i - active;
            if (offset > sites.length / 2) offset -= sites.length;
            if (offset < -sites.length / 2) offset += sites.length;
            const isCenter = offset === 0;
            const abs = Math.abs(offset);

            return (
              <button
                key={site.url}
                onClick={() => goTo(i)}
                className="site-slide"
                style={{
                  transform: `translateX(${offset * 62}%) scale(${isCenter ? 1 : abs === 1 ? 0.78 : 0.6})`,
                  opacity: abs > 2 ? 0 : isCenter ? 1 : abs === 1 ? 0.5 : 0.25,
                  zIndex: isCenter ? 3 : 3 - abs,
                  pointerEvents: abs > 2 ? "none" : "auto",
                }}
              >
                <div className="site-browser-bar">
                  <span className="site-browser-dot" style={{ background: "#ff5f57" }} />
                  <span className="site-browser-dot" style={{ background: "#febc2e" }} />
                  <span className="site-browser-dot" style={{ background: "#28c840" }} />
                  <span className="site-browser-url">{site.url.replace("https://www.", "").replace(/\/$/, "")}</span>
                </div>
                <div className="site-iframe-wrap">
                  <iframe src={site.url} title={site.name} loading="lazy" />
                </div>
                <div className="site-caption">{site.name}</div>
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "28px" }}>
          {sites.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === active ? "22px" : "8px",
                height: "8px",
                borderRadius: "50px",
                border: "none",
                cursor: "pointer",
                background: i === active ? "#6366f1" : "rgba(255,255,255,0.2)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .site-carousel {
          position: relative;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .site-slide {
          position: absolute;
          width: 560px;
          max-width: 80vw;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.1);
          background: #0a0a12;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease;
          cursor: pointer;
          padding: 0;
        }
        .site-browser-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          background: #111118;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .site-browser-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
        .site-browser-url {
          margin-left: 10px;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          background: rgba(255,255,255,0.04);
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
        }
        .site-iframe-wrap iframe {
          width: 1280px;
          height: 960px;
          border: none;
          transform: scale(0.4375);
          transform-origin: top left;
        }
        .site-caption {
          padding: 12px 16px;
          color: white;
          font-size: 14px;
          font-weight: 700;
          background: #0a0a12;
          text-align: center;
        }
        @media (max-width: 700px) {
          .site-carousel { height: 340px; }
          .site-slide { width: 320px; }
          .site-iframe-wrap { height: 220px; }
        }
      `}</style>
    </section>
  );
}
