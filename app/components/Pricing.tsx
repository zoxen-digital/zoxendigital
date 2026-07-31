"use client";
import { useState } from "react";

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      price: annual ? 799 : 999,
      desc: "Perfect for small businesses getting started online.",
      features: [
        "5-Page Website",
        "Mobile Responsive",
        "Basic SEO Setup",
        "Contact Form",
        "3 Revisions",
        "2 Weeks Delivery",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Professional",
      price: annual ? 1599 : 1999,
      desc: "For growing businesses that need more features and performance.",
      features: [
        "10-Page Website",
        "Mobile Responsive",
        "Advanced SEO",
        "CMS Integration",
        "Custom Animations",
        "Unlimited Revisions",
        "3 Weeks Delivery",
        "1 Month Support",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      price: annual ? 2999 : 3799,
      desc: "For established businesses needing a full digital presence.",
      features: [
        "Unlimited Pages",
        "Custom Web App",
        "Full SEO Package",
        "E-Commerce Ready",
        "Performance Audit",
        "Unlimited Revisions",
        "4-6 Weeks Delivery",
        "3 Months Support",
      ],
      cta: "Let's Talk",
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      style={{
        padding: "100px 80px",
        background: "transparent",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="section-eyebrow" style={{ marginBottom: "12px" }}>PRICING</p>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: "800", color: "white", marginBottom: "16px" }}>
            Simple, Transparent Pricing
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "15px", marginBottom: "32px" }}>
            No hidden fees. No surprises. Just results.
          </p>

          {/* Toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.05)", padding: "6px", borderRadius: "50px" }}>
            <button
              onClick={() => setAnnual(false)}
              style={{
                background: !annual ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "transparent",
                color: "white",
                border: "none",
                padding: "8px 20px",
                borderRadius: "50px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            >Monthly</button>
            <button
              onClick={() => setAnnual(true)}
              style={{
                background: annual ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "transparent",
                color: "white",
                border: "none",
                padding: "8px 20px",
                borderRadius: "50px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Annual
              <span style={{ background: "#22c55e", color: "white", fontSize: "10px", fontWeight: "700", padding: "2px 7px", borderRadius: "50px" }}>-20%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}>
          {plans.map((plan, i) => (
            <div
              key={i}
              style={{
                background: plan.popular ? "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(79,70,229,0.1))" : "rgba(255,255,255,0.02)",
                border: plan.popular ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.06)",
                borderRadius: "20px",
                padding: "36px",
                position: "relative",
                transform: plan.popular ? "scale(1.03)" : "scale(1)",
                transition: "transform 0.3s",
                boxShadow: plan.popular ? "0 0 60px rgba(99,102,241,0.15)" : "none",
              }}
            >
              {plan.popular && (
                <div style={{
                  position: "absolute",
                  top: "-14px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "700",
                  padding: "5px 16px",
                  borderRadius: "50px",
                  letterSpacing: "1px",
                }}>
                  MOST POPULAR
                </div>
              )}

              <h3 style={{ fontSize: "20px", fontWeight: "700", color: "white", marginBottom: "8px" }}>{plan.name}</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "24px", lineHeight: "1.5" }}>{plan.desc}</p>

              <div style={{ marginBottom: "28px" }}>
                <span style={{ fontSize: "44px", fontWeight: "800", color: "white" }}>${plan.price.toLocaleString()}</span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}> / project</span>
              </div>

              <a
                href="#contact"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "13px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "15px",
                  textDecoration: "none",
                  background: plan.popular ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "transparent",
                  color: "white",
                  border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.2)",
                  marginBottom: "28px",
                  transition: "all 0.3s",
                  boxShadow: plan.popular ? "0 6px 20px rgba(99,102,241,0.4)" : "none",
                }}
              >
                {plan.cta}
              </a>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <polyline points="20 6 9 17 4 12" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #pricing { padding: 70px 24px !important; }
        }
      `}</style>
    </section>
  );
}
