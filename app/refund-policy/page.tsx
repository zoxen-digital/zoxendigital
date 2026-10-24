import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { REFUND } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: REFUND.title,
  ...pageMeta({ path: "/refund-policy", title: REFUND.title, description: "Zoxen Digital refund and cancellation policy: full refund within 7 days, what happens after work starts, monthly services and how to request a refund." }),
};

export default function Page() {
  return <LegalPage doc={REFUND} />;
}
