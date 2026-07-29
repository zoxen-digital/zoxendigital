"use client";
import Navbar from "../components/Navbar";
import Process from "../components/Process";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import SiteCarousel from "../components/SiteCarousel";

export default function WebDevelopmentPage() {
  return (
    <main>
      <Navbar />
      <WebDevHero />
      <SiteCarousel eyebrow="OUR WORK" heading="Sites We've Built & Launched" />
      <Testimonials />
      <Process />
      <Packages />
      <Contact />
      <Footer />
    </main>
  );
}

function WebDevHero() {
  const features = ["Up to 5 pages", "Contact form", "Stock photos", "Mobile responsive", "Basic on-page SEO", "Free hosting included"];
  const stats = [
    {
      num: "50+",
      label: "Sites launched",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#6366f1" strokeWidth="2" /><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#6366f1" strokeWidth="2" /><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#6366f1" strokeWidth="2" /><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#6366f1" strokeWidth="2" /></svg>
      ),
    },
    {
      num: "98%",
      label: "Performance",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="#6366f1" strokeWidth="2" /><path d="M12 6v6l4 2" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" /></svg>
      ),
    },
    {
      num: "24-48h",
      label: "Kickoff",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#6366f1" strokeWidth="2" /><polyline points="12 7 12 12 16 14" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" /></svg>
      ),
    },
  ];

  return (
    <section
      style={{
        padding: "150px 80px 90px",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
        <div className="webdev-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "56px", alignItems: "start" }}>
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
              <span className="section-eyebrow">WEB DEVELOPMENT</span>
            </div>

            <h1 style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: "800", color: "white", lineHeight: "1.2", marginBottom: "24px" }}>
              Your Website. Live in 24-48 Hours. <span className="gradient-text">No Surprises.</span>
            </h1>

            <p style={{ color: "#8b8ff5", fontSize: "16px", fontWeight: "600", lineHeight: "1.7", marginBottom: "16px" }}>
              Free hosting included with every website package.
            </p>

            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "16px", lineHeight: "1.8", marginBottom: "36px", maxWidth: "560px" }}>
              Pay once, and our team starts today. You&apos;ll get a confirmation within minutes, a kickoff
              message within hours, and a live website within 48 hours. Over 50 businesses have launched with us.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "28px" }}>
              <a href="#packages" className="btn-primary">
                Get Started - $99
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <a href="#contact" className="btn-secondary">
                Talk To Us First
              </a>
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "40px" }}>
              {["5.0 rating on Google", "Secure Payment by Stripe", "30-Day Money-Back Guarantee"].map((t) => (
                <div key={t} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "50px",
                  padding: "6px 14px",
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <polyline points="20 6 9 17 4 12" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", fontWeight: "500" }}>{t}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
              {stats.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "rgba(99,102,241,0.1)",
                    border: "1px solid rgba(99,102,241,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    {s.icon}
                  </div>
                  <div>
                    <div style={{ color: "white", fontSize: "18px", fontWeight: "800" }}>{s.num}</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </Reveal>

          {/* Right - Standard Package highlight card */}
          <Reveal delay={0.15} style={{
            position: "relative",
            background: "linear-gradient(180deg, rgba(99,102,241,0.1), rgba(15,15,25,0.7))",
            border: "1px solid rgba(99,102,241,0.35)",
            borderRadius: "22px",
            padding: "32px",
            boxShadow: "0 0 50px rgba(99,102,241,0.15)",
          }}>
            <span style={{
              position: "absolute",
              top: "-13px",
              left: "32px",
              background: "#6366f1",
              color: "white",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.5px",
              padding: "5px 14px",
              borderRadius: "50px",
            }}>
              BEST VALUE
            </span>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <span style={{ color: "#8b8ff5", fontSize: "13px", fontWeight: "700", letterSpacing: "1px" }}>STANDARD PACKAGE</span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50px", padding: "5px 12px" }}>
                <div style={{ display: "flex", gap: "1px" }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
                  ))}
                </div>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}><strong style={{ color: "white" }}>5.0</strong> rating on Google</span>
              </div>
            </div>

            <div style={{ marginBottom: "8px" }}>
              <span style={{ fontSize: "38px", fontWeight: "800", color: "white" }}>$99</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}> one-time</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginBottom: "24px" }}>
              Clean, professional website to get online fast.
            </p>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginBottom: "20px" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <polyline points="20 6 9 17 4 12" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px" }}>{f}</span>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" stroke="#8b8ff5" strokeWidth="2" strokeLinejoin="round" />
                </svg>
                <span style={{ color: "#8b8ff5", fontSize: "14px", fontWeight: "600" }}>30-Day Money-Back Guarantee</span>
              </div>
            </div>

            <a href="#contact" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginBottom: "12px" }}>
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#packages" className="btn-secondary" style={{ width: "100%", justifyContent: "center", marginBottom: "20px" }}>
              View all packages
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5z" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinejoin="round" /></svg>
                Secure Payment by Stripe
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .webdev-hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      initials: "JD",
      name: "James D.",
      business: "Retail Owner",
      quote: "The team was fast, professional and kept me updated at every step. My site went live exactly on schedule and looks better than I imagined.",
    },
    {
      initials: "AS",
      name: "Aisha S.",
      business: "Wellness Studio",
      quote: "Great experience from start to finish. They understood exactly what my brand needed and delivered it without endless back-and-forth.",
    },
    {
      initials: "MR",
      name: "Marcus R.",
      business: "Home Services",
      quote: "Affordable, quick and the quality speaks for itself. Our booking inquiries doubled within the first month of launching.",
    },
  ];
  return (
    <section style={{ padding: "0 80px 100px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="section-eyebrow" style={{ marginBottom: "14px" }}>TESTIMONIALS</p>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: "800", color: "white", marginBottom: "16px" }}>
            What Our Clients Say
          </h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
            <div style={{ display: "flex", gap: "2px" }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#8b8ff5"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
              ))}
            </div>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>5.0 from happy clients</span>
          </div>
        </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 0.12} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              padding: "28px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "13px",
                  fontWeight: "700",
                }}>
                  {r.initials}
                </div>
                <div>
                  <div style={{ color: "white", fontSize: "14px", fontWeight: "700" }}>{r.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{r.business}</div>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: "1.7" }}>&ldquo;{r.quote}&rdquo;</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Packages() {
  const plans = [
    {
      name: "Standard",
      price: "$99",
      note: "one-time",
      desc: "Clean, professional website to get online fast.",
      features: ["Up to 5 pages", "Contact form", "Stock photos", "Mobile responsive", "Basic on-page SEO", "Free hosting included"],
      popular: false,
    },
    {
      name: "Premium",
      price: "$199",
      note: "one-time",
      desc: "More pages and essential integrations for growing businesses.",
      features: ["Up to 12 pages", "Contact form", "Admin portal", "Booking / appointment form", "Payment integration setup", "Mobile responsive + SEO setup", "Free hosting included"],
      popular: true,
    },
    {
      name: "Advanced",
      price: "$499",
      note: "one-time",
      desc: "Custom eCommerce website with products, payments and business features.",
      features: ["Up to 15 pages", "eCommerce ready", "Upload 50+ products", "Payment gateway integration", "Order management setup", "Admin dashboard", "Free hosting included"],
      popular: false,
    },
    {
      name: "Custom",
      price: "Contact Us",
      note: "",
      desc: "Advanced custom website with premium design and full business systems.",
      features: ["Up to 20 pages", "Advanced custom design", "eCommerce with 100+ products", "Full admin dashboard", "Customer portal", "Advanced integrations & automation", "Free hosting included"],
      popular: false,
    },
  ];

  return (
    <section id="packages" style={{ padding: "0 80px 100px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <Reveal>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="section-eyebrow" style={{ marginBottom: "14px" }}>PRICING</p>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: "800", color: "white", marginBottom: "16px" }}>
            Choose The Perfect Plan
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px", maxWidth: "500px", margin: "0 auto" }}>
            Transparent pricing. Pick a package and complete onboarding, we handle the rest.
          </p>
        </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
          {plans.map((plan, i) => (
            <Reveal
              key={i}
              delay={i * 0.1}
              style={{
                position: "relative",
                background: plan.popular ? "linear-gradient(180deg, rgba(99,102,241,0.1), rgba(20,20,35,0.6))" : "rgba(255,255,255,0.02)",
                border: plan.popular ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                boxShadow: plan.popular ? "0 0 40px rgba(99,102,241,0.2)" : "none",
              }}
            >
              {plan.popular && (
                <span style={{
                  position: "absolute",
                  top: "-13px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#6366f1",
                  color: "white",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "0.5px",
                  padding: "5px 14px",
                  borderRadius: "50px",
                }}>
                  MOST POPULAR
                </span>
              )}

              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "white", marginBottom: "8px" }}>{plan.name}</h3>
              <div style={{ marginBottom: "12px" }}>
                <span style={{ fontSize: "32px", fontWeight: "800", color: "white" }}>{plan.price}</span>
                {plan.note && <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}> {plan.note}</span>}
              </div>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: "1.6", marginBottom: "24px" }}>{plan.desc}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px", flex: 1 }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ marginTop: "2px", flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>{f}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className={plan.popular ? "btn-primary" : "btn-secondary"}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {plan.price === "Contact Us" ? "Contact Us" : "Get Started"}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
