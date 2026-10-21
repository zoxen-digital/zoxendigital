import type { Metadata } from "next";
import { SITE_URL, jsonLd, pageMeta } from "@/lib/seo";

const description =
  "Get a professional business website live in 24 to 48 hours from $99, with free hosting, mobile-responsive design, on-page SEO and a free AI chatbot. Premium, e-commerce and custom packages available.";

export const metadata: Metadata = {
  title: "Website Development from $99 | Live in 24-48 Hours",
  keywords: ["$99 website", "cheap website design", "website in 48 hours", "small business website", "ecommerce website development", "website with free hosting", "website with AI chatbot", "landing page design"],
  ...pageMeta({ path: "/web-development", title: "Website Development from $99 | Live in 24-48 Hours", description }),
};

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Website Development",
  serviceType: "Website design and development",
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: "Worldwide",
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
