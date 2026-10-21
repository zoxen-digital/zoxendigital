import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { TERMS } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: TERMS.title,
  ...pageMeta({ path: "/terms", title: TERMS.title, description: TERMS.summary }),
};

export default function Page() {
  return <LegalPage doc={TERMS} />;
}
