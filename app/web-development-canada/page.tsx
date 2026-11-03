import type { Metadata } from "next";
import CountryPage from "../components/CountryPage";
import { LOCATIONS } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const loc = LOCATIONS.canada;

export const metadata: Metadata = {
  title: loc.seoTitle,
  keywords: loc.keywords,
  ...pageMeta({ path: `/${loc.slug}`, title: loc.seoTitle, description: loc.description }),
  alternates: {
    canonical: `/${loc.slug}`,
    languages: { "en-CA": `/${loc.slug}`, "fr-CA": `/${LOCATIONS.canadaFr.slug}`, "x-default": `/${loc.slug}` },
  },
};

export default function Page() {
  return <CountryPage loc={loc} />;
}
