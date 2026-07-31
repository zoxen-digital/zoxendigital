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
