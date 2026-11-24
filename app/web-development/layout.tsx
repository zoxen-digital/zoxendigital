import type { Metadata } from "next";
import { AREA_SERVED, SITE_URL, jsonLd, pageMeta } from "@/lib/seo";

const description =
  "Get a professional website for your US or Canadian business live in 24-48 hours, with free hosting, on-page SEO and a free AI chatbot.";

export const metadata: Metadata = {
  title: "Website Development, Live in 48 Hours",
  keywords: ["affordable website USA", "website design for small business USA", "website design Canada", "affordable website design", "website in 48 hours", "small business website", "ecommerce website development", "website with free hosting", "website with AI chatbot", "landing page design"],
  ...pageMeta({ path: "/web-development", title: "Website Development, Live in 48 Hours", description }),
};

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Development",
  serviceType: "Website design and development",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: AREA_SERVED,
  url: `${SITE_URL}/web-development`,
  description,
};

export default function WebDevelopmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(offerSchema)} />
      {children}
    </>
  );
}
