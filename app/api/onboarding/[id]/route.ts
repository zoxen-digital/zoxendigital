import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const COLLECTION = "submissions";

async function requireAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("zoxen_dashboard_auth")?.value === "1";
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const db = await getDb();
    const item = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ item: { ...item, _id: item._id.toString() } });
  } catch (err) {
    console.error("Onboarding get error:", err);
    return NextResponse.json({ error: "Failed to load submission" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const update: Record<string, unknown> = {};
    if (typeof body.status === "string") update.status = body.status;
    if (typeof body.notes === "string") update.notes = body.notes;
    if (typeof body.assignedTo === "string") update.assignedTo = body.assignedTo;
    if (typeof body.domainConnected === "boolean") update.domainConnected = body.domainConnected;
    if (typeof body.targetMonth === "string") update.targetMonth = body.targetMonth;

    const db = await getDb();
    await db.collection(COLLECTION).updateOne({ _id: new ObjectId(id) }, { $set: update });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Onboarding update error:", err);
    return NextResponse.json({ error: "Failed to update submission" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const db = await getDb();
    const result = await db.collection(COLLECTION).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Onboarding delete error:", err);
    return NextResponse.json({ error: "Failed to delete submission" }, { status: 500 });
  }
}
