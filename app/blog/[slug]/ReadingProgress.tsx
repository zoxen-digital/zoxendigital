"use client";
import { useEffect, useState } from "react";

// Thin progress bar at the top of the page while reading a post.
export default function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);
  return (
    <div aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 200, pointerEvents: "none" }}>
      <div style={{ height: "100%", width: "100%", transformOrigin: "left", transform: `scaleX(${p})`, background: "linear-gradient(90deg, #6366f1, #7c3aed)" }} />
    </div>
  );
}
