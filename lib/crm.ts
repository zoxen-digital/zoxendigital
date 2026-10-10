/**
 * Sends a website enquiry to the Zoxen portal, where it becomes a Query.
 * Server-only: needs CRM_URL and CRM_API_KEY (never expose the key to the browser).
 */
export type CrmLead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  page: string;
  source: string;
  hp: string;
};

export type CrmResult =
  | { status: "saved" | "skipped" } // 201 new Query, 200 duplicate / bot
  | { status: "invalid"; error: string } // 400, message is safe to show the visitor
  | { status: "failed" }; // not configured, 401, 5xx, timeout or network error

export async function sendLeadToCrm(lead: CrmLead): Promise<CrmResult> {
  const base = process.env.CRM_URL?.replace(/\/+$/, "");
  const key = process.env.CRM_API_KEY;
  if (!base || !key) {
    console.warn("Lead not sent to portal: CRM_URL / CRM_API_KEY not configured.");
    return { status: "failed" };
  }

  try {
    const res = await fetch(`${base}/api/public/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    console.log(`Portal lead response: ${res.status}`);

    if (res.status === 201) return { status: "saved" };
    if (res.ok) return { status: "skipped" };
    if (res.status === 400) return { status: "invalid", error: String(data.error || "Please check your details.") };
    if (res.status === 401) console.error("Portal rejected the API key (401). Check CRM_API_KEY.");
    else console.error("Portal lead request failed:", res.status, data);
    return { status: "failed" };
  } catch (err) {
    console.error("Failed to reach portal:", err);
    return { status: "failed" };
  }
}
