"use client";
import { useState, type CSSProperties, type ReactNode } from "react";

const PACKAGES = [
  { id: "Standard", price: "$99", desc: "Up to 5 pages, contact form, mobile responsive." },
  { id: "Premium", price: "$199", desc: "Up to 12 pages, admin portal, booking form.", popular: true },
  { id: "Advanced", price: "$499", desc: "Up to 15 pages, eCommerce, automation." },
];

const ADD_ONS = [
  "Logo Design", "Domain Purchase & Setup", "Business Email Setup", "CRM Integration",
  "Copywriting", "Additional Pages", "Blog Setup", "Payment Gateway Setup",
  "Chatbot Integration", "Advanced SEO Package", "Social Media Setup", "Google Business Profile Setup",
];

const MAIN_GOALS = [
  "Generate Leads", "Increase Sales", "Get Appointments",
  "Build Brand Awareness", "Showcase Portfolio", "Collect Customer Info",
];

const PAGE_OPTIONS = [
  "Home", "About", "Services", "Contact", "Gallery", "Testimonials",
  "FAQ", "Pricing", "Blog", "Products", "Booking", "Team",
];

const INDUSTRIES = [
  "Retail & E-commerce", "Restaurant & Food", "Health & Wellness", "Construction & Renovation",
  "Professional Services", "Real Estate", "Automotive", "Non-Profit & Community", "Education", "Other",
];

const BUSINESS_SIZES = ["Just me", "2-10 employees", "11-50 employees", "50+ employees"];

const STEP_LABELS = ["Basic Info", "Goals", "Features", "Design", "Content", "Review"];
const STEP_TITLES = [
  "Basic Information", "Project Goals", "Features & Pages",
  "Design Preferences", "Content Details", "Review & Submit",
];

const FEATURES = [
  { title: "Custom Solutions", desc: "Tailored to your unique business needs" },
  { title: "Fast & Reliable", desc: "On-time delivery with top quality" },
  { title: "Dedicated Support", desc: "We're here for you, always" },
  { title: "Results Driven", desc: "Focused on growth and success" },
];

type FormState = {
  contactPerson: string; email: string; phone: string;
  businessName: string; currentWebsite: string; industry: string; businessSize: string; socialMedia: string;
  mainGoal: string; targetAudience: string;
  logoStatus: string; designStyle: string; brandColors: string; inspirationWebsites: string;
  homepageHeadline: string; businessDescription: string; servicesList: string; contactDetails: string;
  pricingDisplay: string; productPricingInfo: string; specialOffers: string; notes: string;
};

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState("Premium");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [pagesNeeded, setPagesNeeded] = useState<string[]>(["Home", "About", "Services", "Contact"]);

  const [form, setForm] = useState<FormState>({
    contactPerson: "", email: "", phone: "",
    businessName: "", currentWebsite: "", industry: INDUSTRIES[0], businessSize: BUSINESS_SIZES[0], socialMedia: "",
    mainGoal: MAIN_GOALS[0], targetAudience: "",
    logoStatus: "I have a logo", designStyle: "", brandColors: "", inspirationWebsites: "",
    homepageHeadline: "", businessDescription: "", servicesList: "", contactDetails: "",
    pricingDisplay: "", productPricingInfo: "", specialOffers: "", notes: "",
  });

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [attachmentUrls, setAttachmentUrls] = useState<string[]>([]);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (key: keyof FormState, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const toggleAddOn = (item: string) =>
    setAddOns((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));

  const togglePage = (item: string) =>
    setPagesNeeded((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));

  async function uploadFile(file: File): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) return null;
    const data = await res.json();
    return data.url as string;
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    const url = await uploadFile(file);
    if (url) setLogoUrl(url);
    setUploadingLogo(false);
  }

  async function handleAttachmentsUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingFiles(true);
    const urls = await Promise.all(files.map(uploadFile));
    setAttachmentUrls((prev) => [...prev, ...urls.filter((u): u is string => !!u)]);
    setUploadingFiles(false);
  }

  function validateStep(): string {
    if (step === 1) {
      if (!form.contactPerson || !form.email || !form.businessName) {
        return "Please fill in your name, email and business name.";
      }
    }
    return "";
  }

  function goNext() {
    const err = validateStep();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStep((s) => Math.min(6, s + 1));
  }

  function goBack() {
    setError("");
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleSubmit() {
    setError("");
    if (!form.businessName || !form.email) {
      setError("Please fill in your business name and email before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          package: selectedPackage,
          addOns,
          pagesNeeded,
          logoUrl,
          attachmentUrls,
          ...form,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", background: "#05050a" }}>
        <div style={{ maxWidth: "480px", textAlign: "center" }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%", background: "rgba(99,102,241,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <polyline points="20 6 9 17 4 12" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 style={{ fontSize: "28px", fontWeight: "800", color: "white", marginBottom: "12px" }}>You&apos;re All Set!</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "15px", lineHeight: "1.7" }}>
            Thanks for sharing your project details. Our team will review everything and reach out within 24-48 hours to kick things off.
          </p>
        </div>
      </main>
    );
  }

  const progressPct = Math.round((step / 6) * 100);

  return (
    <main style={{ minHeight: "100vh", background: "#05050a", padding: "32px 20px", display: "flex", justifyContent: "center" }}>
      <div className="onboarding-shell" style={{
        width: "100%", maxWidth: "1180px", display: "flex",
        background: "#0a0a12", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px", overflow: "hidden",
      }}>
        {/* Sidebar */}
        <aside className="onboarding-sidebar" style={{
          width: "320px", flexShrink: 0, padding: "36px 32px",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
            <img src="/main-logo.png" alt="Zoxen Digital" style={{ height: "34px", width: "auto", objectFit: "contain" }} />
            <span style={{ fontSize: "16px", fontWeight: "800" }}>
              <span style={{ color: "white" }}>Zoxen</span> <span style={{ color: "#8b8ff5" }}>Digital</span>
            </span>
          </div>

          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "white", lineHeight: "1.25", marginBottom: "14px" }}>
            Let&apos;s Build Something <span className="gradient-text">Amazing Together</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13.5px", lineHeight: "1.7", marginBottom: "28px" }}>
            Please fill out the details below so we can understand your business and deliver the perfect solution.
          </p>

          {/* Decorative orbit */}
          <div style={{ position: "relative", height: "110px", marginBottom: "28px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="160" height="90" viewBox="0 0 160 90" style={{ position: "absolute" }}>
              <ellipse cx="80" cy="45" rx="75" ry="22" fill="none" stroke="#6366f1" strokeWidth="1.5" opacity="0.5" transform="rotate(-12 80 45)" />
              <circle cx="80" cy="45" r="16" fill="rgba(99,102,241,0.15)" stroke="#6366f1" strokeWidth="1.5" />
              <circle cx="142" cy="30" r="4" fill="#8b8ff5" />
            </svg>
          </div>

          {/* Progress */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#8b8ff5", fontSize: "11px", fontWeight: "700", letterSpacing: "0.5px" }}>ONBOARDING PROGRESS</span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px" }}>Step {step} of 6</span>
            </div>
            <div style={{ height: "6px", borderRadius: "50px", background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progressPct}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", transition: "width 0.3s ease" }} />
            </div>
            <div style={{ textAlign: "right", color: "rgba(255,255,255,0.35)", fontSize: "11px", marginTop: "4px" }}>{progressPct}%</div>
          </div>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "auto" }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{
                  width: "34px", height: "34px", borderRadius: "10px", flexShrink: 0,
                  background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <polyline points="20 6 9 17 4 12" stroke="#8b8ff5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div style={{ color: "white", fontSize: "13.5px", fontWeight: "700" }}>{f.title}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginTop: "1px" }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Need help */}
          <div style={{
            marginTop: "28px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px", padding: "18px",
          }}>
            <div style={{ color: "white", fontSize: "13.5px", fontWeight: "700", marginBottom: "4px" }}>Need Help?</div>
            <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", marginBottom: "10px" }}>Our team is here to assist you.</div>
            <a href="mailto:zoxendigital@gmail.com" style={{ display: "flex", alignItems: "center", gap: "6px", color: "#8b8ff5", fontSize: "12.5px", textDecoration: "none", marginBottom: "12px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#8b8ff5" strokeWidth="2" /><polyline points="22 6 12 13 2 6" stroke="#8b8ff5" strokeWidth="2" /></svg>
              zoxendigital@gmail.com
            </a>
            <a href="mailto:zoxendigital@gmail.com?subject=Schedule%20a%20Call" className="btn-secondary" style={{ width: "100%", justifyContent: "center", fontSize: "12.5px", padding: "9px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="white" strokeWidth="2" /><path d="M3 9h18M8 2v4M16 2v4" stroke="white" strokeWidth="2" strokeLinecap="round" /></svg>
              Schedule a Call
            </a>
          </div>
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, padding: "36px 40px", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "32px" }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0,
              background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <StepIcon step={step} />
            </div>
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: "800", color: "white" }}>Project Onboarding Form</h2>
              <p style={{ fontSize: "13.5px", marginTop: "2px" }}>
                <span style={{ color: "#8b8ff5", fontWeight: "700" }}>Step {step} of 6</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}> — {STEP_TITLES[step - 1]}</span>
              </p>
            </div>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <FieldGroup icon="user" title="Your Information">
                <div className="onboarding-row" style={rowStyle}>
                  <Field label="Full Name" required value={form.contactPerson} onChange={(v) => update("contactPerson", v)} placeholder="Enter your full name" />
                  <Field label="Email Address" required type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="Enter your email address" />
                </div>
                <Field label="Phone Number" required type="tel" value={form.phone} onChange={(v) => update("phone", v)} placeholder="(555) 123-4567" />
              </FieldGroup>

              <FieldGroup icon="briefcase" title="Business Information">
                <div className="onboarding-row" style={rowStyle}>
                  <Field label="Business Name" required value={form.businessName} onChange={(v) => update("businessName", v)} placeholder="Enter your business name" />
                  <Field label="Website (if any)" value={form.currentWebsite} onChange={(v) => update("currentWebsite", v)} placeholder="https://yourwebsite.com" />
                </div>
                <div className="onboarding-row" style={rowStyle}>
                  <Field label="Industry / Niche" required as="select" value={form.industry} onChange={(v) => update("industry", v)} options={INDUSTRIES} />
                  <Field label="Business Size" as="select" value={form.businessSize} onChange={(v) => update("businessSize", v)} options={BUSINESS_SIZES} />
                </div>
                <Field label="Social Media Links" value={form.socialMedia} onChange={(v) => update("socialMedia", v)} placeholder="Instagram, Facebook, etc." />
              </FieldGroup>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <FieldGroup icon="target" title="Confirm Your Package">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px" }}>
                  {PACKAGES.map((pkg) => {
                    const isSelected = selectedPackage === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg.id)}
                        style={{
                          position: "relative", textAlign: "left",
                          background: isSelected ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.02)",
                          border: isSelected ? "1px solid rgba(99,102,241,0.6)" : "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "14px", padding: "16px", cursor: "pointer",
                        }}
                      >
                        {pkg.popular && (
                          <span style={{
                            position: "absolute", top: "-10px", right: "12px", background: "#6366f1", color: "white",
                            fontSize: "10px", fontWeight: "700", padding: "3px 10px", borderRadius: "50px",
                          }}>MOST POPULAR</span>
                        )}
                        <div style={{ color: "white", fontSize: "14px", fontWeight: "700", marginBottom: "4px" }}>{pkg.id}</div>
                        <div style={{ color: "#8b8ff5", fontSize: "19px", fontWeight: "800", marginBottom: "6px" }}>{pkg.price}</div>
                        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "11.5px", lineHeight: "1.5" }}>{pkg.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </FieldGroup>

              <FieldGroup icon="target" title="Project Goals">
                <Field label="What's your main goal?" as="select" value={form.mainGoal} onChange={(v) => update("mainGoal", v)} options={MAIN_GOALS} />
                <Field label="Target Audience" as="textarea" value={form.targetAudience} onChange={(v) => update("targetAudience", v)} placeholder="Who are your ideal customers?" />
              </FieldGroup>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <FieldGroup icon="grid" title="Add-Ons (Optional)" note="Additional cost will be reviewed by your project manager and quoted separately before any work begins. You will not be charged without approval.">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                  {ADD_ONS.map((item) => (
                    <CheckPill key={item} label={item} checked={addOns.includes(item)} onToggle={() => toggleAddOn(item)} />
                  ))}
                </div>
              </FieldGroup>

              <FieldGroup icon="grid" title="Pages You Need">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "10px" }}>
                  {PAGE_OPTIONS.map((page) => (
                    <CheckPill key={page} label={page} checked={pagesNeeded.includes(page)} onToggle={() => togglePage(page)} />
                  ))}
                </div>
              </FieldGroup>
            </>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <FieldGroup icon="palette" title="Design Preferences">
              <div className="onboarding-row" style={rowStyle}>
                <Field label="Do you have a logo?" as="select" value={form.logoStatus} onChange={(v) => update("logoStatus", v)} options={["I have a logo", "I need a logo designed"]} />
                <Field label="Design Style" value={form.designStyle} onChange={(v) => update("designStyle", v)} placeholder="Modern, minimal, bold, elegant..." />
              </div>
              <div className="onboarding-row" style={rowStyle}>
                <Field label="Brand Colors" value={form.brandColors} onChange={(v) => update("brandColors", v)} placeholder="e.g. Purple & white" />
                <Field label="Inspiration Websites" value={form.inspirationWebsites} onChange={(v) => update("inspirationWebsites", v)} placeholder="Links to sites you like" />
              </div>
              <div style={{ marginTop: "8px" }}>
                <label style={labelStyle}>Upload Your Logo</label>
                <input type="file" accept="image/*" onChange={handleLogoUpload} style={fileInputStyle} />
                {uploadingLogo && <p style={hintStyle}>Uploading...</p>}
                {logoUrl && (
                  <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <img src={logoUrl} alt="Uploaded logo" style={{ height: "40px", borderRadius: "8px", background: "white", padding: "4px" }} />
                    <span style={{ color: "#8b8ff5", fontSize: "12px" }}>Uploaded</span>
                  </div>
                )}
              </div>
            </FieldGroup>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <FieldGroup icon="document" title="Content Details">
              <Field label="Homepage Headline" value={form.homepageHeadline} onChange={(v) => update("homepageHeadline", v)} placeholder="The first thing visitors should read" />
              <Field label="Business Description" as="textarea" value={form.businessDescription} onChange={(v) => update("businessDescription", v)} placeholder="Tell us what your business does" />
              <Field label="Services List" as="textarea" value={form.servicesList} onChange={(v) => update("servicesList", v)} placeholder="List each service with a short description" />
              <Field label="Contact Page Details" as="textarea" value={form.contactDetails} onChange={(v) => update("contactDetails", v)} placeholder="Address, hours, map link..." />
              <div className="onboarding-row" style={rowStyle}>
                <Field label="Pricing Display Preference" value={form.pricingDisplay} onChange={(v) => update("pricingDisplay", v)} placeholder="Show prices / Contact for quote" />
                <Field label="Product / Pricing Info" value={form.productPricingInfo} onChange={(v) => update("productPricingInfo", v)} placeholder="If applicable" />
              </div>
              <Field label="Special Offers or Packages" as="textarea" value={form.specialOffers} onChange={(v) => update("specialOffers", v)} placeholder="Any promotions to feature" />
              <Field label="Additional Notes" as="textarea" value={form.notes} onChange={(v) => update("notes", v)} placeholder="Anything else we should know" />
              <div style={{ marginTop: "8px" }}>
                <label style={labelStyle}>Additional Files (images, docs, etc.)</label>
                <input type="file" multiple onChange={handleAttachmentsUpload} style={fileInputStyle} />
                {uploadingFiles && <p style={hintStyle}>Uploading...</p>}
                {attachmentUrls.length > 0 && <p style={{ marginTop: "8px", color: "#8b8ff5", fontSize: "12px" }}>{attachmentUrls.length} file(s) uploaded</p>}
              </div>
            </FieldGroup>
          )}

          {/* STEP 6 - REVIEW */}
          {step === 6 && (
            <FieldGroup icon="check" title="Review Your Information">
              <ReviewRow label="Full Name" value={form.contactPerson} />
              <ReviewRow label="Email" value={form.email} />
              <ReviewRow label="Phone" value={form.phone} />
              <ReviewRow label="Business Name" value={form.businessName} />
              <ReviewRow label="Industry" value={form.industry} />
              <ReviewRow label="Package" value={`${selectedPackage}`} />
              <ReviewRow label="Main Goal" value={form.mainGoal} />
              <ReviewRow label="Add-Ons" value={addOns.length ? addOns.join(", ") : "None selected"} />
              <ReviewRow label="Pages Needed" value={pagesNeeded.join(", ")} />
              <ReviewRow label="Design Style" value={form.designStyle} />
              <ReviewRow label="Homepage Headline" value={form.homepageHeadline} />
              <ReviewRow label="Logo Uploaded" value={logoUrl ? "Yes" : "No"} />
              <ReviewRow label="Attachments" value={attachmentUrls.length ? `${attachmentUrls.length} file(s)` : "None"} />

              <div style={{
                background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "14px", padding: "16px 18px", marginTop: "20px", fontSize: "12.5px",
                color: "rgba(255,255,255,0.6)", lineHeight: "1.7",
              }}>
                <strong style={{ color: "white" }}>Timeline:</strong> Most websites are completed within 10-15 business days
                after we receive all your content. 🔒 Your information is secure.
              </div>
            </FieldGroup>
          )}

          {error && <div style={{ color: "#f87171", fontSize: "13.5px", marginTop: "8px" }}>{error}</div>}

          {/* Nav buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "28px" }}>
            <button
              onClick={goBack}
              disabled={step === 1}
              className="btn-secondary"
              style={{ opacity: step === 1 ? 0.4 : 1, cursor: step === 1 ? "default" : "pointer" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19l-7-7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Back
            </button>

            {step < 6 ? (
              <button onClick={goNext} className="btn-primary">
                Next Step
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting} className="btn-primary" style={{ opacity: submitting ? 0.7 : 1 }}>
                {submitting ? "Submitting..." : "Submit Form"}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
          </div>

          {/* Step indicator */}
          <div className="onboarding-steps" style={{ display: "flex", justifyContent: "space-between", marginTop: "36px" }}>
            {STEP_LABELS.map((label, i) => {
              const num = i + 1;
              const active = num === step;
              const done = num < step;
              return (
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, position: "relative" }}>
                  {i > 0 && (
                    <div style={{
                      position: "absolute", top: "15px", right: "50%", width: "100%", height: "1px",
                      background: done || active ? "#6366f1" : "rgba(255,255,255,0.1)", zIndex: 0,
                    }} />
                  )}
                  <div style={{
                    width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0, position: "relative", zIndex: 1,
                    background: active ? "#6366f1" : done ? "rgba(99,102,241,0.3)" : "#14141c",
                    border: active || done ? "none" : "1px solid rgba(255,255,255,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontSize: "12px", fontWeight: "700",
                  }}>
                    {done ? (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    ) : num}
                  </div>
                  <span style={{ color: active ? "white" : "rgba(255,255,255,0.4)", fontSize: "11px", fontWeight: "600", marginTop: "8px" }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .onboarding-shell { flex-direction: column !important; }
          .onboarding-sidebar { width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.08); }
        }
        @media (max-width: 600px) {
          .onboarding-row { grid-template-columns: 1fr !important; }
          .onboarding-steps span { display: none; }
        }
      `}</style>
    </main>
  );
}

const rowStyle: CSSProperties = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" };

function StepIcon({ step }: { step: number }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "#8b8ff5", strokeWidth: 2 };
  switch (step) {
    case 1: return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a8 8 0 0116 0v1" strokeLinecap="round" /></svg>;
    case 2: return <svg {...common}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.5" fill="#8b8ff5" /></svg>;
    case 3: return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>;
    case 4: return <svg {...common}><circle cx="12" cy="12" r="9" /><circle cx="9" cy="9" r="1.2" fill="#8b8ff5" /><circle cx="15" cy="9" r="1.2" fill="#8b8ff5" /><circle cx="9" cy="14.5" r="1.2" fill="#8b8ff5" /></svg>;
    case 5: return <svg {...common}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" strokeLinecap="round" /><line x1="9" y1="17" x2="13" y2="17" strokeLinecap="round" /></svg>;
    default: return <svg {...common}><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="9" /></svg>;
  }
}

function FieldGroup({ icon, title, note, children }: { icon: string; title: string; note?: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
        <GroupIcon icon={icon} />
        <h3 style={{ fontSize: "15px", fontWeight: "700", color: "white" }}>{title}</h3>
      </div>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "18px" }} />
      {note && <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: "1.6", marginBottom: "16px" }}>{note}</p>}
      {children}
    </div>
  );
}

function GroupIcon({ icon }: { icon: string }) {
  const c = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "#6366f1", strokeWidth: 2 } as const;
  if (icon === "user") return <svg {...c}><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a8 8 0 0116 0v1" strokeLinecap="round" /></svg>;
  if (icon === "briefcase") return <svg {...c}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>;
  if (icon === "target") return <svg {...c}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></svg>;
  if (icon === "grid") return <svg {...c}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>;
  if (icon === "palette") return <svg {...c}><circle cx="12" cy="12" r="9" /><circle cx="9" cy="9" r="1.2" fill="#6366f1" /><circle cx="15" cy="9" r="1.2" fill="#6366f1" /><circle cx="9" cy="14.5" r="1.2" fill="#6366f1" /></svg>;
  if (icon === "document") return <svg {...c}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
  return <svg {...c}><path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="9" /></svg>;
}

function CheckPill({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: "flex", alignItems: "center", gap: "8px", textAlign: "left",
        background: checked ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.02)",
        border: checked ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px", padding: "10px 12px", cursor: "pointer",
      }}
    >
      <span style={{
        width: "16px", height: "16px", borderRadius: "4px", flexShrink: 0,
        border: checked ? "none" : "1px solid rgba(255,255,255,0.3)",
        background: checked ? "#6366f1" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px" }}>{label}</span>
    </button>
  );
}

function ReviewRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px" }}>{label}</span>
      <span style={{ color: "white", fontSize: "13px", fontWeight: "600", textAlign: "right" }}>{value}</span>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  as?: "input" | "textarea" | "select";
  options?: string[];
};

function Field({ label, value, onChange, placeholder, required, type = "text", as = "input", options }: FieldProps) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={labelStyle}>
        {label} {required && <span style={{ color: "#8b8ff5" }}>*</span>}
      </label>
      {as === "textarea" ? (
        <textarea
          rows={3}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
        />
      ) : as === "select" ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
          {options?.map((opt) => (
            <option key={opt} value={opt} style={{ background: "#111" }}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
        />
      )}
    </div>
  );
}

const labelStyle: CSSProperties = {
  display: "block", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: "600", marginBottom: "6px",
};

const inputStyle: CSSProperties = {
  width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px", padding: "12px 16px", color: "white", fontSize: "14px", outline: "none",
};

const fileInputStyle: CSSProperties = {
  width: "100%", background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.15)",
  borderRadius: "10px", padding: "12px 16px", color: "rgba(255,255,255,0.6)", fontSize: "13px",
};

const hintStyle: CSSProperties = { color: "#8b8ff5", fontSize: "12px", marginTop: "6px" };
