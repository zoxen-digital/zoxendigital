import type { Metadata } from "next";
import { AREA_SERVED, SITE_URL, jsonLd, pageMeta } from "@/lib/seo";

const description =
  "Get a professional website for your US or Canadian business live in 24-48 hours from $99, with free hosting, on-page SEO and a free AI chatbot.";

export const metadata: Metadata = {
  title: "$99 Website Development, Live in 48 Hours",
  keywords: ["$99 website USA", "website design for small business USA", "website design Canada", "$99 website", "cheap website design", "website in 48 hours", "small business website", "ecommerce website development", "website with free hosting", "website with AI chatbot", "landing page design"],
  ...pageMeta({ path: "/web-development", title: "$99 Website Development, Live in 48 Hours", description }),
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
  offers: [
    { "@type": "Offer", name: "Standard Website", price: "99", priceCurrency: "USD", description: "Up to 5 pages, free hosting, basic SEO and a free AI chatbot." },
    { "@type": "Offer", name: "Premium Website", price: "199", priceCurrency: "USD", description: "Up to 12 pages with admin portal, booking and payment setup." },
    { "@type": "Offer", name: "Advanced E-commerce Website", price: "499", priceCurrency: "USD", description: "Custom e-commerce store with products, payments and order management." },
  ],
};

export default function WebDevelopmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(offerSchema)} />
      {children}
    </>
  );
}
