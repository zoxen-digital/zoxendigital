"use client";
import { useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "./Reveal";

const SERVICES = [
  "Website (Standard)", "Website with Admin Panel", "E-commerce Website", "SEO", "AI Chatbot", "AI Calling Agent",
  "Meta Ads", "Google Ads", "Social Media Management", "Logo / Branding", "Other",
];
const BUDGETS = ["Under $100", "$100 - $250", "$250 - $500", "$500 - $1,000", "$1,000+", "Not sure yet"];
const EMPTY_FORM = { name: "", email: "", phone: "", company: "", service: "", budget: "", message: "" };
type Field = keyof typeof EMPTY_FORM;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: typeof EMPTY_FORM) {
  const errors: Partial<Record<Field, string>> = {};
  if (!form.name.trim()) errors.name = "Please enter your full name.";
  if (!form.message.trim()) errors.message = "Please tell us about your project.";
  if (!form.email.trim() && !form.phone.trim()) {
    errors.email = "Please enter your email or phone number.";
    errors.phone = " ";
  } else if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [hp, setHp] = useState("");

  const update = (field: Field, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (!errors[field]) return;
    const linked = field === "email" || field === "phone";
    setErrors((e) => ({ ...e, [field]: undefined, ...(linked ? { email: undefined, phone: undefined } : {}) }));
  };

  const handleSubmit = async () => {
    if (sending) return;
    setError("");
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, page: window.location.href, hp }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      window.fbq?.("track", "Lead", { content_name: form.service || "Contact form" });
      setSent(true);
      setForm(EMPTY_FORM);
      setHp("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const perks = [
    {
      label: "Reply within 24-48 hours",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="#6366f1" strokeWidth="2" />
          <polyline points="12 7 12 12 16 14" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: "Free strategy consultation",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.67 13 19.79 19.79 0 011.61 4.4 2 2 0 013.6 2.22h3a2 2 0 012 1.72 12.8 12.8 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.18 6.18l.97-.97a2 2 0 012.11-.45 12.8 12.8 0 002.81.7A2 2 0 0122 16.92z" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: "No spam, ever",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#6366f1" strokeWidth="2" />
          <polyline points="22 6 12 13 2 6" stroke="#6366f1" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      style={{
        padding: "100px 80px",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
        <div className="contact-card" style={{
          background: "rgba(15,23,42,0.03)",
          border: "1px solid rgba(99,102,241,0.25)",
          borderRadius: "28px",
          padding: "64px",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Glow */}
          <div style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "64px", alignItems: "start", position: "relative" }}>
            {/* Left */}
            <Reveal>
            <div>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: "50px",
                padding: "8px 16px",
                marginBottom: "28px",
              }}>
                <span className="badge-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
                <span className="section-eyebrow">GET IN TOUCH</span>
              </div>

              <h2 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: "800", color: "#0f172a", marginBottom: "20px", lineHeight: "1.15" }}>
                Ready To Scale Your Business <span className="gradient-text">With Us?</span>
              </h2>

              <p style={{ color: "rgba(15,23,42,0.65)", fontSize: "16px", lineHeight: "1.8", marginBottom: "36px", maxWidth: "440px" }}>
                Tell us what you need and our team will reach out. Pick a service below and send us a message, it lands straight in our inbox.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {perks.map((perk, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      {perk.icon}
                    </div>
                    <span style={{ color: "rgba(15,23,42,0.8)", fontSize: "15px", fontWeight: "500" }}>{perk.label}</span>
                  </div>
                ))}
              </div>
            </div>
            </Reveal>

            {/* Right - Form */}
            <Reveal delay={0.15} className="contact-form-box" style={{
              background: "rgba(15,23,42,0.03)",
              border: "1px solid rgba(15,23,42,0.1)",
              borderRadius: "20px",
              padding: "40px",
            }}>
              {sent ? (
                <div role="status" style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(99,102,241,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <polyline points="20 6 9 17 4 12" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 style={{ color: "#0f172a", fontSize: "22px", fontWeight: "700", marginBottom: "10px" }}>Message sent!</h3>
                  <p style={{ color: "rgba(15,23,42,0.65)", fontSize: "15px", marginBottom: "24px" }}>Thanks! We will reply within 24 hours.</p>
                  <button type="button" onClick={() => setSent(false)} className="btn-secondary" style={{ fontSize: "14px", padding: "10px 22px" }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  noValidate
                  onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
                  style={{ display: "flex", flexDirection: "column", gap: "18px", position: "relative" }}
                >
                  <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                    <FormField label="Full name" required error={errors.name}>
                      <input type="text" name="name" autoComplete="name" placeholder="Your name" value={form.name}
                        onChange={(e) => update("name", e.target.value)} style={fieldStyle(errors.name)} aria-invalid={!!errors.name} />
                    </FormField>
                    <FormField label="Business name">
                      <input type="text" name="company" autoComplete="organization" placeholder="Your business" value={form.company}
                        onChange={(e) => update("company", e.target.value)} style={fieldStyle()} />
                    </FormField>
                  </div>

                  <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                    <FormField label="Email" hint="or phone" error={errors.email}>
                      <input type="email" name="email" autoComplete="email" placeholder="you@business.com" value={form.email}
                        onChange={(e) => update("email", e.target.value)} style={fieldStyle(errors.email)} aria-invalid={!!errors.email} />
                    </FormField>
                    <FormField label="Phone / WhatsApp" hint="or email" error={errors.phone?.trim() ? errors.phone : undefined}>
                      <input type="tel" name="phone" autoComplete="tel" placeholder="+1 555 123 4567" value={form.phone}
                        onChange={(e) => update("phone", e.target.value)} style={fieldStyle(errors.phone)} aria-invalid={!!errors.phone} />
                    </FormField>
                  </div>

                  <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                    <FormField label="What do you need?">
                      <select name="service" value={form.service} onChange={(e) => update("service", e.target.value)} style={{ ...fieldStyle(), cursor: "pointer" }}>
                        <option value="">Select a service</option>
                        {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </FormField>
                    <FormField label="Budget">
                      <select name="budget" value={form.budget} onChange={(e) => update("budget", e.target.value)} style={{ ...fieldStyle(), cursor: "pointer" }}>
                        <option value="">Select a budget</option>
                        {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </FormField>
                  </div>

                  <FormField label="Tell us about your project" required error={errors.message}>
                    <textarea name="message" rows={4} placeholder="What are you looking to build or improve?" value={form.message}
                      onChange={(e) => update("message", e.target.value)} style={{ ...fieldStyle(errors.message), resize: "vertical" }} aria-invalid={!!errors.message} />
                  </FormField>

                  {/* Honeypot: hidden from people, bots fill it */}
                  <input
                    type="text"
                    name="hp"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    style={{ position: "absolute", left: "-10000px", top: "auto", width: "1px", height: "1px", overflow: "hidden", opacity: 0 }}
                  />

                  {error && (
                    <p role="alert" style={{ color: "#dc2626", fontSize: "14px", background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: "10px", padding: "10px 14px" }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center", padding: "16px", borderRadius: "50px", fontSize: "16px", opacity: sending ? 0.7 : 1, cursor: sending ? "wait" : "pointer" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <line x1="22" y1="2" x2="11" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                  <p style={{ textAlign: "center", fontSize: "12.5px", color: "rgba(15,23,42,0.55)", marginTop: "-4px" }}>
                    By submitting you agree to our{" "}
                    <a href="/privacy-policy" style={{ color: "#4f46e5", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px" }}>Privacy Policy</a>.
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .contact-card { padding: 32px !important; }
          .contact-form-row { grid-template-columns: 1fr !important; }
          #contact { padding: 70px 24px !important; }
        }
        .contact-grid > *, .contact-form-row > * { min-width: 0; }
        @media (max-width: 600px) {
          #contact { padding: 56px 12px !important; }
          .contact-card { padding: 24px 16px !important; border-radius: 20px !important; }
          .contact-form-box { padding: 20px 16px !important; border-radius: 16px !important; }
          .contact-form-row { gap: 18px !important; }
          /* 16px stops iPhones zooming in when a field is tapped */
          #contact input, #contact select, #contact textarea { font-size: 16px !important; }
        }
      `}</style>
    </section>
  );
}

const inputStyle: CSSProperties = {
  width: "100%",
  background: "#ffffff",
  border: "1px solid rgba(15,23,42,0.1)",
  borderRadius: "10px",
  padding: "12px 16px",
  color: "#0f172a",
  fontSize: "14px",
  outline: "none",
  transition: "border 0.2s",
};

function FormField({ label, required, hint, error, children }: { label: string; required?: boolean; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label style={{ display: "block", color: "rgba(15,23,42,0.77)", fontSize: "13px", fontWeight: "600" }}>
        {label} {required && <span style={{ color: "#4f46e5" }}>*</span>}
        {hint && <span style={{ color: "rgba(15,23,42,0.45)", fontWeight: 500 }}> ({hint})</span>}
        {children}
      </label>
      {error && <p style={{ color: "#dc2626", fontSize: "12.5px", marginTop: "6px" }}>{error}</p>}
    </div>
  );
}

const fieldStyle = (error?: string): CSSProperties => ({
  ...inputStyle,
  marginTop: "6px",
  border: `1px solid ${error ? "rgba(220,38,38,0.6)" : "rgba(15,23,42,0.1)"}`,
});
