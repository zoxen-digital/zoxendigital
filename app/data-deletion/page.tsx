import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";
import { DATA_DELETION } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  title: DATA_DELETION.title,
  ...pageMeta({ path: "/data-deletion", title: DATA_DELETION.title, description: DATA_DELETION.summary }),
};

export default function Page() {
  return <LegalPage doc={DATA_DELETION} />;
}
