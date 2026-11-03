import type { Metadata } from "next";
import CountryPage from "../../components/CountryPage";
import { LOCATIONS } from "@/lib/locations";
import { pageMeta } from "@/lib/seo";

const loc = LOCATIONS.canadaFr;
const meta = pageMeta({ path: `/${loc.slug}`, title: loc.seoTitle, description: loc.description });

export const metadata: Metadata = {
  title: loc.seoTitle,
  keywords: loc.keywords,
  ...meta,
  // French and English versions of the Canada page point at each other.
  alternates: {
    canonical: `/${loc.slug}`,
    languages: { "fr-CA": `/${loc.slug}`, "en-CA": `/${LOCATIONS.canada.slug}`, "x-default": `/${LOCATIONS.canada.slug}` },
  },
  openGraph: { ...meta.openGraph, locale: "fr_CA", alternateLocale: ["en_CA"] },
};

export default function Page() {
  return <CountryPage loc={loc} />;
}
