import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { STATUS_OPTIONS, type OnboardingSubmission } from "@/lib/onboarding-types";
import { sendOnboardingNotification } from "@/lib/mailer";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const COLLECTION = "submissions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.businessName || !body.email) {
      return NextResponse.json({ error: "Business name and email are required" }, { status: 400 });
    }

    const doc = {
      package: body.package || "",
      addOns: Array.isArray(body.addOns) ? body.addOns : [],

      businessName: body.businessName || "",
      contactPerson: body.contactPerson || "",
      email: body.email || "",
      phone: body.phone || "",
      currentWebsite: body.currentWebsite || "",
      socialMedia: body.socialMedia || "",

      mainGoal: body.mainGoal || "",
      targetAudience: body.targetAudience || "",

      logoStatus: body.logoStatus || "",
      designStyle: body.designStyle || "",
      brandColors: body.brandColors || "",
      inspirationWebsites: body.inspirationWebsites || "",

      pagesNeeded: Array.isArray(body.pagesNeeded) ? body.pagesNeeded : [],

      homepageHeadline: body.homepageHeadline || "",
      businessDescription: body.businessDescription || "",
      servicesList: body.servicesList || "",
      contactDetails: body.contactDetails || "",
      pricingDisplay: body.pricingDisplay || "",
      productPricingInfo: body.productPricingInfo || "",
      specialOffers: body.specialOffers || "",
      notes: body.notes || "",

      logoUrl: body.logoUrl || null,
      attachmentUrls: Array.isArray(body.attachmentUrls) ? body.attachmentUrls : [],

      status: "New",
      assignedTo: "",
      domainConnected: false,
      targetMonth: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      createdAt: new Date().toISOString(),
    };

    const db = await getDb();
    const result = await db.collection(COLLECTION).insertOne(doc);

    sendOnboardingNotification(doc as OnboardingSubmission).catch((err) =>
      console.error("Notification email failed:", err)
    );

    return NextResponse.json({ id: result.insertedId, ok: true });
  } catch (err) {
    console.error("Onboarding submit error:", err);
    return NextResponse.json({ error: "Failed to save submission" }, { status: 500 });
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const authed = cookieStore.get("zoxen_dashboard_auth")?.value === "1";
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await getDb();
    const items = await db
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      items: items.map((it) => ({ ...it, _id: it._id.toString() })),
      statusOptions: STATUS_OPTIONS,
    });
  } catch (err) {
    console.error("Onboarding list error:", err);
    return NextResponse.json({ error: "Failed to load submissions" }, { status: 500 });
  }
}
