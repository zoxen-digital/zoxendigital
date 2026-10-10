import nodemailer from "nodemailer";
import type { OnboardingSubmission } from "./onboarding-types";

function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_APP_PASSWORD;

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendOnboardingNotification(doc: OnboardingSubmission) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("Email not sent: EMAIL_USER / EMAIL_APP_PASSWORD not configured.");
    return;
  }

  const to = (process.env.NOTIFY_EMAIL || process.env.EMAIL_USER || "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color:#4f46e5;">New Onboarding Submission</h2>
      <p><strong>Business:</strong> ${doc.businessName}</p>
      <p><strong>Contact Person:</strong> ${doc.contactPerson || "—"}</p>
      <p><strong>Email:</strong> ${doc.email}</p>
      <p><strong>Phone:</strong> ${doc.phone || "—"}</p>
      <p><strong>Package:</strong> ${doc.package}</p>
      <p><strong>Add-Ons:</strong> ${doc.addOns?.length ? doc.addOns.join(", ") : "None"}</p>
      <p><strong>Main Goal:</strong> ${doc.mainGoal || "—"}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
      <p style="font-size:13px;color:#666;">Submitted ${new Date(doc.createdAt).toLocaleString()}</p>
      <p style="font-size:13px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || ""}/onboarding/dashboard" style="color:#4f46e5;">
          View in Dashboard →
        </a>
      </p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Zoxen Digital Onboarding" <${process.env.EMAIL_USER}>`,
      to,
      subject: `New Onboarding: ${doc.businessName}`,
      html,
    });
  } catch (err) {
    console.error("Failed to send onboarding notification email:", err);
  }
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function sendContactNotification(lead: {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  page: string;
}): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("Contact email not sent: EMAIL_USER / EMAIL_APP_PASSWORD not configured.");
    return false;
  }

  const to = (process.env.NOTIFY_EMAIL || process.env.EMAIL_USER || "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const row = (label: string, value: string) =>
    `<p><strong>${label}:</strong> ${value ? escapeHtml(value) : "—"}</p>`;

  const html = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="color:#4f46e5;">New Website Enquiry</h2>
      ${row("Name", lead.name)}
      ${row("Email", lead.email)}
      ${row("Phone", lead.phone)}
      ${row("Business", lead.company)}
      ${row("Service", lead.service)}
      ${row("Budget", lead.budget)}
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:8px;">${escapeHtml(lead.message || "—")}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
      <p style="font-size:13px;color:#666;">Sent from ${escapeHtml(lead.page || "the website")}. Also added to the portal as a Query.</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Zoxen Digital Website" <${process.env.EMAIL_USER}>`,
      to,
      replyTo: lead.email || undefined,
      subject: `New Enquiry: ${lead.name}${lead.service ? ` (${lead.service})` : ""}`,
      html,
    });
    return true;
  } catch (err) {
    console.error("Failed to send contact notification email:", err);
    return false;
  }
}
