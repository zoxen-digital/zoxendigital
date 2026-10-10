import { NextRequest, NextResponse } from "next/server";
import { sendLeadToCrm } from "@/lib/crm";
import { sendContactNotification } from "@/lib/mailer";

export const runtime = "nodejs";

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    company: clean(body.company, 160),
    service: clean(body.service, 100),
    budget: clean(body.budget, 60),
    message: clean(body.message, 5000),
    page: clean(body.page, 500) || req.headers.get("referer") || "",
    source: "Website",
    hp: clean(body.hp, 200),
  };

  // Bots fill the hidden honeypot. Pass it to the portal (it ignores them) but never email the team.
  if (lead.hp) {
    await sendLeadToCrm(lead);
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};
  if (!lead.name) errors.name = "Please enter your full name.";
  if (!lead.message) errors.message = "Please tell us about your project.";
  if (!lead.email && !lead.phone) errors.email = "Please enter your email or phone number.";
  else if (lead.email && !EMAIL_RE.test(lead.email)) errors.email = "Please enter a valid email address.";
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: Object.values(errors)[0], fields: errors }, { status: 400 });
  }

  const [crm, emailOk] = await Promise.all([sendLeadToCrm(lead), sendContactNotification(lead)]);

  if (crm.status === "invalid" && !emailOk) {
    return NextResponse.json({ error: crm.error }, { status: 400 });
  }

  const crmOk = crm.status === "saved" || crm.status === "skipped";
  if (!crmOk && !emailOk) {
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try again in a moment." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
