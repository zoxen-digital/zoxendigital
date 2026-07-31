"use client";
import { useState, type CSSProperties } from "react";
import Reveal from "./Reveal";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "General inquiry", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setSent(true);
    setTimeout(() => setSent(false), 4000);
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
          background: "rgba(255,255,255,0.02)",
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

              <h2 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: "800", color: "white", marginBottom: "20px", lineHeight: "1.15" }}>
                Ready To Scale Your Business <span className="gradient-text">With Us?</span>
              </h2>

              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", lineHeight: "1.8", marginBottom: "36px", maxWidth: "440px" }}>
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
                    <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "15px", fontWeight: "500" }}>{perk.label}</span>
                  </div>
                ))}
              </div>
            </div>
            </Reveal>

            {/* Right - Form */}
            <Reveal delay={0.15} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "40px",
            }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
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
                  <h3 style={{ color: "white", fontSize: "22px", fontWeight: "700", marginBottom: "10px" }}>Message Sent!</h3>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>We&apos;ll get back to you within 24-48 hours.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
                    <div>
                      <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
                        Full name <span style={{ color: "#8b8ff5" }}>*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (___) ___-____"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
                      Email <span style={{ color: "#8b8ff5" }}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@business.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
                      Service you&apos;re interested in
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      <option value="General inquiry" style={{ background: "#111" }}>General inquiry</option>
                      <option value="Web Design" style={{ background: "#111" }}>Web Design</option>
                      <option value="Web Development" style={{ background: "#111" }}>Web Development</option>
                      <option value="SEO Optimization" style={{ background: "#111" }}>SEO Optimization</option>
                      <option value="Website Maintenance" style={{ background: "#111" }}>Website Maintenance</option>
                      <option value="AI & Automation" style={{ background: "#111" }}>AI &amp; Automation</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
                      Message <span style={{ color: "#8b8ff5" }}>*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us a little about your project or goals..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center", padding: "16px", borderRadius: "50px", fontSize: "16px" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <line x1="22" y1="2" x2="11" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                    Send Message
                  </button>
                </div>
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
      `}</style>
    </section>
  );
}

const inputStyle: CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  padding: "12px 16px",
  color: "white",
  fontSize: "14px",
  outline: "none",
  transition: "border 0.2s",
};
