"use client";
import { useState, type CSSProperties } from "react";

const PACKAGES = [
  { id: "Standard", price: "$99", desc: "Up to 5 pages, contact form, mobile responsive." },
  { id: "Premium", price: "$199", desc: "Up to 12 pages, admin portal, booking form.", popular: true },
  { id: "Advanced", price: "$499", desc: "Up to 15 pages, eCommerce, automation." },
];

const ADD_ONS = [
  "Logo Design",
  "Domain Purchase & Setup",
  "Business Email Setup",
  "CRM Integration",
  "Copywriting",
  "Additional Pages",
  "Blog Setup",
  "Payment Gateway Setup",
  "Chatbot Integration",
  "Advanced SEO Package",
  "Social Media Setup",
  "Google Business Profile Setup",
];

const MAIN_GOALS = [
  "Generate Leads",
  "Increase Sales",
  "Get Appointments",
  "Build Brand Awareness",
  "Showcase Portfolio",
  "Collect Customer Info",
];

const PAGE_OPTIONS = [
  "Home", "About", "Services", "Contact", "Gallery", "Testimonials",
  "FAQ", "Pricing", "Blog", "Products", "Booking", "Team",
];

const STEPS = ["Share Details", "We Start Building", "Review & Approve", "Website Goes Live"];

export default function OnboardingPage() {
  const [selectedPackage, setSelectedPackage] = useState("Premium");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [pagesNeeded, setPagesNeeded] = useState<string[]>(["Home", "About", "Services", "Contact"]);

  const [form, setForm] = useState({
    businessName: "", contactPerson: "", email: "", phone: "", currentWebsite: "", socialMedia: "",
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

  const update = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }));

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
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
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

  return (
    <main style={{ minHeight: "100vh", padding: "60px 20px 100px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "50px", padding: "8px 16px", marginBottom: "20px",
          }}>
            <span className="badge-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", display: "inline-block" }} />
            <span className="section-eyebrow">GET STARTED</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: "800", color: "white", marginBottom: "12px" }}>
            Let&apos;s Get Your <span className="gradient-text">Website Built</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "15px", maxWidth: "520px", margin: "0 auto" }}>
            Tell us about your project below. The more detail you share, the faster and smoother your build will go.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "48px", flexWrap: "wrap", gap: "12px" }}>
          {STEPS.map((step, i) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: "140px" }}>
              <div style={{
                width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                background: i === 0 ? "#6366f1" : "rgba(255,255,255,0.06)",
                border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontSize: "12px", fontWeight: "700",
              }}>
                {i + 1}
              </div>
              <span style={{ color: i === 0 ? "white" : "rgba(255,255,255,0.4)", fontSize: "12px", fontWeight: "600" }}>{step}</span>
            </div>
          ))}
        </div>

        {/* Package selection */}
        <Section title="Confirm Your Package">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px" }}>
            {PACKAGES.map((pkg) => {
              const isSelected = selectedPackage === pkg.id;
              return (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  style={{
                    position: "relative",
                    textAlign: "left",
                    background: isSelected ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.02)",
                    border: isSelected ? "1px solid rgba(99,102,241,0.6)" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                    padding: "18px",
                    cursor: "pointer",
                  }}
                >
                  {pkg.popular && (
                    <span style={{
                      position: "absolute", top: "-10px", right: "14px", background: "#6366f1", color: "white",
                      fontSize: "10px", fontWeight: "700", padding: "3px 10px", borderRadius: "50px",
                    }}>MOST POPULAR</span>
                  )}
                  <div style={{ color: "white", fontSize: "15px", fontWeight: "700", marginBottom: "4px" }}>{pkg.id}</div>
                  <div style={{ color: "#8b8ff5", fontSize: "20px", fontWeight: "800", marginBottom: "6px" }}>{pkg.price}</div>
                  <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", lineHeight: "1.5" }}>{pkg.desc}</div>
                </button>
              );
            })}
          </div>
        </Section>

        {/* Add-ons */}
        <Section title="Add-Ons (Optional)" note="Additional cost will be reviewed by your project manager and quoted separately before any work begins. You will not be charged without approval.">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
            {ADD_ONS.map((item) => (
              <CheckPill key={item} label={item} checked={addOns.includes(item)} onToggle={() => toggleAddOn(item)} />
            ))}
          </div>
        </Section>

        {/* Your details */}
        <Section title="Your Details">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="onboarding-row">
            <Field label="Business Name" required value={form.businessName} onChange={(v) => update("businessName", v)} placeholder="Your business name" />
            <Field label="Contact Person" value={form.contactPerson} onChange={(v) => update("contactPerson", v)} placeholder="Full name" />
            <Field label="Email" required type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="you@business.com" />
            <Field label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} placeholder="+1 (___) ___-____" />
            <Field label="Current Website (if any)" value={form.currentWebsite} onChange={(v) => update("currentWebsite", v)} placeholder="https://" />
            <Field label="Social Media Links" value={form.socialMedia} onChange={(v) => update("socialMedia", v)} placeholder="Instagram, Facebook, etc." />
          </div>
        </Section>

        {/* Project details */}
        <Section title="Project Details">
          <Field
            label="Main Goal"
            as="select"
            value={form.mainGoal}
            onChange={(v) => update("mainGoal", v)}
            options={MAIN_GOALS}
          />
          <Field label="Target Audience" as="textarea" value={form.targetAudience} onChange={(v) => update("targetAudience", v)} placeholder="Who are your ideal customers?" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }} className="onboarding-row">
            <Field label="Do you have a logo?" as="select" value={form.logoStatus} onChange={(v) => update("logoStatus", v)} options={["I have a logo", "I need a logo designed"]} />
            <Field label="Design Style" value={form.designStyle} onChange={(v) => update("designStyle", v)} placeholder="Modern, minimal, bold, elegant..." />
            <Field label="Brand Colors" value={form.brandColors} onChange={(v) => update("brandColors", v)} placeholder="e.g. Purple & white" />
            <Field label="Inspiration Websites" value={form.inspirationWebsites} onChange={(v) => update("inspirationWebsites", v)} placeholder="Links to sites you like" />
          </div>
        </Section>

        {/* Pages needed */}
        <Section title="Pages You Need">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px" }}>
            {PAGE_OPTIONS.map((page) => (
              <CheckPill key={page} label={page} checked={pagesNeeded.includes(page)} onToggle={() => togglePage(page)} />
            ))}
          </div>
        </Section>

        {/* Content input */}
        <Section title="Content Details">
          <Field label="Homepage Headline" value={form.homepageHeadline} onChange={(v) => update("homepageHeadline", v)} placeholder="The first thing visitors should read" />
          <Field label="Business Description" as="textarea" value={form.businessDescription} onChange={(v) => update("businessDescription", v)} placeholder="Tell us what your business does" />
          <Field label="Services List" as="textarea" value={form.servicesList} onChange={(v) => update("servicesList", v)} placeholder="List each service with a short description" />
          <Field label="Contact Page Details" as="textarea" value={form.contactDetails} onChange={(v) => update("contactDetails", v)} placeholder="Address, hours, map link..." />
          <Field label="Pricing Display Preference" value={form.pricingDisplay} onChange={(v) => update("pricingDisplay", v)} placeholder="Show prices publicly / Contact for quote" />
          <Field label="Product / Pricing Info (if applicable)" as="textarea" value={form.productPricingInfo} onChange={(v) => update("productPricingInfo", v)} placeholder="Product names, prices, variants..." />
          <Field label="Special Offers or Packages" as="textarea" value={form.specialOffers} onChange={(v) => update("specialOffers", v)} placeholder="Any promotions to feature" />
          <Field label="Additional Notes" as="textarea" value={form.notes} onChange={(v) => update("notes", v)} placeholder="Anything else we should know" />
        </Section>

        {/* Uploads */}
        <Section title="Logo & Attachments">
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
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

            <div>
              <label style={labelStyle}>Additional Files (images, docs, etc.)</label>
              <input type="file" multiple onChange={handleAttachmentsUpload} style={fileInputStyle} />
              {uploadingFiles && <p style={hintStyle}>Uploading...</p>}
              {attachmentUrls.length > 0 && (
                <p style={{ marginTop: "8px", color: "#8b8ff5", fontSize: "12px" }}>{attachmentUrls.length} file(s) uploaded</p>
              )}
            </div>
          </div>
        </Section>

        {/* Timeline notice */}
        <div style={{
          background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: "14px", padding: "18px 20px", marginBottom: "32px", fontSize: "13px",
          color: "rgba(255,255,255,0.6)", lineHeight: "1.7",
        }}>
          <strong style={{ color: "white" }}>Timeline:</strong> Most websites are completed within 10-15 business days
          after we receive all your content. Delays in providing content may extend your timeline (a $10/day fee
          applies for extensions beyond 15 days due to missing content).
        </div>

        {error && (
          <div style={{ color: "#f87171", fontSize: "14px", marginBottom: "16px", textAlign: "center" }}>{error}</div>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center", padding: "16px", borderRadius: "50px", fontSize: "16px", opacity: submitting ? 0.7 : 1 }}
        >
          {submitting ? "Submitting..." : "Let's Get Your Website Built"}
        </button>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "12px", marginTop: "16px" }}>
          🔒 Your information is secure
        </p>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .onboarding-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "18px", padding: "26px", marginBottom: "20px",
    }}>
      <h2 style={{ fontSize: "17px", fontWeight: "700", color: "white", marginBottom: note ? "8px" : "18px" }}>{title}</h2>
      {note && <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: "1.6", marginBottom: "18px" }}>{note}</p>}
      {children}
    </div>
  );
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
  display: "block",
  color: "rgba(255,255,255,0.7)",
  fontSize: "13px",
  fontWeight: "600",
  marginBottom: "6px",
};

const inputStyle: CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  padding: "12px 16px",
  color: "white",
  fontSize: "14px",
  outline: "none",
};

const fileInputStyle: CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.04)",
  border: "1px dashed rgba(255,255,255,0.15)",
  borderRadius: "10px",
  padding: "12px 16px",
  color: "rgba(255,255,255,0.6)",
  fontSize: "13px",
};

const hintStyle: CSSProperties = {
  color: "#8b8ff5",
  fontSize: "12px",
  marginTop: "6px",
};
