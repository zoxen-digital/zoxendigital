"use client";
import { useEffect, useRef, useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const steps = [
  { key: "name", label: "Name", placeholder: "Your name", type: "text", autoComplete: "name" },
  { key: "email", label: "Email", placeholder: "you@company.com", type: "email", autoComplete: "email" },
  { key: "phone", label: "Phone / WhatsApp (optional)", placeholder: "A number we can reach", type: "tel", autoComplete: "tel" },
  { key: "message", label: "Project details", placeholder: "Tell us a little about what you're looking to build.", type: "textarea", autoComplete: "off" },
] as const;

type Key = (typeof steps)[number]["key"];
const EMPTY: Record<Key, string> = { name: "", email: "", phone: "", message: "" };

export default function ProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY);
  const [hp, setHp] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  // Lock page scroll, close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  useEffect(() => {
    if (open && !done) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open, step, done]);

  const close = () => {
    onClose();
    // Reset after the close animation so the next open starts fresh.
    setTimeout(() => { setStep(0); setForm(EMPTY); setHp(""); setError(""); setDone(false); }, 250);
  };

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const validate = (): string => {
    const v = form[current.key].trim();
    if (current.key === "name" && !v) return "Please enter your name.";
    if (current.key === "email") {
      if (!v) return "Please enter your email.";
      if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
    }
    if (current.key === "message" && !v) return "Please tell us a little about your project.";
    return "";
  };

  const submit = async () => {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company: "", service: "", budget: "", page: window.location.href, hp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      window.fbq?.("track", "Lead", { content_name: "Start your project popup" });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const next = () => {
    if (sending) return;
    const msg = validate();
    if (msg) return setError(msg);
    setError("");
    if (isLast) submit();
    else setStep((s) => s + 1);
  };

  const skip = () => { setError(""); setForm((f) => ({ ...f, phone: "" })); setStep((s) => s + 1); };

  return (
    <div className={`pm-overlay ${open ? "open" : ""}`} onMouseDown={(e) => e.target === e.currentTarget && close()} aria-hidden={!open}>
      <div className="pm-modal" role="dialog" aria-modal="true" aria-labelledby="pm-title">
        <button type="button" className="pm-close" onClick={close}>CLOSE</button>
        <div className="pm-eyebrow">START YOUR PROJECT</div>
        <h2 id="pm-title" className="pm-title">A short conversation. A clear next step.</h2>

        {done ? (
          <div className="pm-done">
            <div className="pm-done-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <h3>Thanks, {form.name.split(" ")[0] || "there"}!</h3>
            <p>We have your details and will reply within 24 hours.</p>
            <button type="button" className="pm-primary" onClick={close}>Done</button>
          </div>
        ) : (
          <form noValidate onSubmit={(e) => { e.preventDefault(); next(); }}>
            <div className="pm-progress">
              <span className="pm-count">{String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
              <div className="pm-track"><div className="pm-fill" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
            </div>

            <div key={step} className="pm-field">
              <label htmlFor="pm-input" className="pm-label">{current.label.toUpperCase()}</label>
              {current.type === "textarea" ? (
                <textarea id="pm-input" ref={inputRef} rows={4} className="pm-input" placeholder={current.placeholder}
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} aria-invalid={!!error} />
              ) : (
                <input id="pm-input" ref={inputRef} type={current.type} autoComplete={current.autoComplete} className="pm-input" placeholder={current.placeholder}
                  value={form[current.key]} onChange={(e) => setForm({ ...form, [current.key]: e.target.value })} aria-invalid={!!error} />
              )}
              {error && <p className="pm-error" role="alert">{error}</p>}
            </div>

            {/* Honeypot: hidden from people, bots fill it */}
            <input type="text" name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)}
              style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", opacity: 0 }} />

            <div className="pm-actions">
              {step > 0 ? <button type="button" className="pm-ghost" onClick={() => { setError(""); setStep((s) => s - 1); }}>Back</button> : <span />}
              <div style={{ display: "flex", gap: "12px" }}>
                {current.key === "phone" && <button type="button" className="pm-ghost" onClick={skip}>Skip</button>}
                <button type="submit" className="pm-primary" disabled={sending}>
                  {isLast ? (sending ? "Sending..." : "Start Your Project") : "Continue"}
                </button>
              </div>
            </div>
            {isLast && (
              <p className="pm-legal">By submitting you agree to our <a href="/privacy-policy">Privacy Policy</a>.</p>
            )}
          </form>
        )}
      </div>

      <style>{`
        .pm-overlay { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 16px;
          background: rgba(15,23,42,0.45); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
          opacity: 0; visibility: hidden; transition: opacity 0.25s, visibility 0.25s; }
        .pm-overlay.open { opacity: 1; visibility: visible; }
        .pm-modal { position: relative; width: 100%; max-width: 620px; padding: 36px; border-radius: 28px; color: #ffffff;
          background: radial-gradient(circle at 85% 0%, rgba(99,102,241,0.25), transparent 45%), #12121c;
          border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 40px 90px rgba(15,23,42,0.5);
          transform: translateY(20px) scale(0.97); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); }
        .pm-overlay.open .pm-modal { transform: none; }
        .pm-close { position: absolute; top: 30px; right: 32px; background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.7); font-size: 14px; font-weight: 700; letter-spacing: 2px; }
        .pm-close:hover { color: #ffffff; }
        .pm-eyebrow { font-size: 13px; font-weight: 700; letter-spacing: 3px; color: rgba(255,255,255,0.65); margin-bottom: 12px; }
        .pm-title { font-size: clamp(22px, 3.4vw, 30px); font-weight: 800; letter-spacing: -1px; line-height: 1.2; margin-bottom: 28px; padding-right: 60px; }
        .pm-progress { display: flex; align-items: center; gap: 20px; margin-bottom: 28px; }
        .pm-count { font-size: 15px; font-weight: 700; letter-spacing: 2px; color: rgba(255,255,255,0.75); white-space: nowrap; }
        .pm-track { flex: 1; height: 1px; background: rgba(255,255,255,0.12); }
        .pm-fill { height: 2px; margin-top: -0.5px; background: linear-gradient(90deg, #818cf8, #a5b4fc); transition: width 0.5s cubic-bezier(0.16,1,0.3,1); }
        .pm-field { animation: pm-in 0.35s cubic-bezier(0.16,1,0.3,1); min-height: 150px; }
        @keyframes pm-in { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: none; } }
        .pm-label { display: block; font-size: 14px; font-weight: 700; letter-spacing: 1.5px; color: rgba(255,255,255,0.75); margin-bottom: 14px; }
        .pm-input { width: 100%; padding: 20px 22px; border-radius: 18px; font-size: 17px; font-family: inherit; color: #ffffff;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.18); outline: none; resize: vertical; transition: border-color 0.2s, box-shadow 0.2s; }
        .pm-input::placeholder { color: rgba(255,255,255,0.4); }
        .pm-input:focus { border-color: #818cf8; box-shadow: 0 0 0 4px rgba(129,140,248,0.18); }
        .pm-input[aria-invalid="true"] { border-color: #f87171; }
        .pm-error { margin-top: 10px; font-size: 13.5px; color: #fca5a5; }
        .pm-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 28px; }
        .pm-ghost { padding: 18px 30px; border-radius: 50px; font-size: 16px; font-weight: 700; color: #ffffff; cursor: pointer; background: transparent; border: 1px solid rgba(255,255,255,0.2); transition: border-color 0.2s, background 0.2s; }
        .pm-ghost:hover { border-color: rgba(255,255,255,0.45); background: rgba(255,255,255,0.04); }
        .pm-primary { padding: 18px 32px; border-radius: 50px; font-size: 16px; font-weight: 700; color: #0f172a; cursor: pointer; border: none;
          background: linear-gradient(135deg, #c7d2fe, #a5b4fc); box-shadow: 0 10px 26px rgba(129,140,248,0.35); transition: transform 0.2s, box-shadow 0.2s; }
        .pm-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(129,140,248,0.5); }
        .pm-primary:disabled { opacity: 0.7; cursor: wait; transform: none; }
        .pm-legal { margin-top: 18px; font-size: 12.5px; color: rgba(255,255,255,0.5); text-align: right; }
        .pm-legal a { color: #a5b4fc; text-decoration: underline; }
        .pm-done { text-align: center; padding: 10px 0 4px; animation: pm-in 0.4s ease; }
        .pm-done-icon { width: 72px; height: 72px; margin: 0 auto 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #6366f1, #7c3aed); box-shadow: 0 0 0 10px rgba(99,102,241,0.15); }
        .pm-done h3 { font-size: 24px; font-weight: 800; margin-bottom: 8px; }
        .pm-done p { color: rgba(255,255,255,0.7); margin-bottom: 26px; }
        @media (max-width: 560px) {
          .pm-modal { padding: 26px 20px; border-radius: 22px; }
          .pm-close { top: 22px; right: 20px; }
          .pm-ghost, .pm-primary { padding: 15px 22px; font-size: 15px; }
          .pm-input { font-size: 16px; }
        }
      `}</style>
    </div>
  );
}
