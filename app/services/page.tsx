import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServicesContent from "./ServicesContent";
import { AREA_SERVED, SERVICES, SITE_URL, jsonLd, pageMeta } from "@/lib/seo";

const description =
  "Website development, AI agents, automation, software, mobile apps and support for US and Canadian businesses. One accountable team from first call to launch.";

export const metadata: Metadata = {
  title: "Services: Websites, AI Agents & Apps",
  keywords: ["web development services USA", "digital agency Canada", "web development services", "AI agent development", "AI automation services", "mobile app development", "custom software development", "website maintenance", "BPO services", "performance optimization"],
  ...pageMeta({ path: "/services", title: "Services: Websites, AI Agents & Apps", description }),
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Zoxen Digital Services",
  itemListElement: SERVICES.map((name, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@type": "Service", name, provider: { "@id": `${SITE_URL}/#organization` }, areaServed: AREA_SERVED },
  })),
};

export default function ServicesPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(servicesSchema)} />
      <Navbar />
      <ServicesContent />
      <Footer />
    </main>
  );
}
