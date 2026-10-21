// Shared SEO settings. Override the domain with NEXT_PUBLIC_SITE_URL if it ever changes.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://zoxendigital.com").replace(/\/+$/, "");
export const SITE_NAME = "Zoxen Digital";
export const SITE_EMAIL = "support@zoxendigital.com";

export const DEFAULT_DESCRIPTION =
  "Zoxen Digital builds fast, conversion-focused websites from $99, runs Meta Ads, Google Ads and SEO, and adds AI chatbots and automation that help small and medium businesses get more leads and sales.";

export const KEYWORDS = [
  "web design agency",
  "website development",
  "affordable website design",
  "$99 website",
  "small business website",
  "business website design",
  "ecommerce website development",
  "landing page design",
  "AI chatbot for website",
  "AI calling agent",
  "AI automation agency",
  "Meta ads agency",
  "Facebook ads management",
  "Google Ads management",
  "SEO services",
  "local SEO",
  "social media management",
  "mobile app development",
  "custom software development",
  "digital marketing agency",
  "lead generation",
  "client portal",
  "Zoxen Digital",
];

export const SERVICES = [
  "AI Agent",
  "AI Automation",
  "Website Development",
  "Software Development",
  "Mobile App Development",
  "Performance Optimization",
  "Technical Support",
  "BPO Services",
];

// JSON-LD helper: render with <script type="application/ld+json">.
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Zoxen Digital: Websites, Ads, SEO & AI for growing businesses" };

// Full per-page SEO block. Next.js replaces (not merges) openGraph/twitter from the
// layout, so every page passes its own complete set here.
export function pageMeta({ path, title, description }: { path: string; title: string; description: string }) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  return {
    description,
    alternates: { canonical: path },
    openGraph: { type: "website" as const, locale: "en_US", siteName: SITE_NAME, url: path, title: fullTitle, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image" as const, title: fullTitle, description, images: [OG_IMAGE.url] },
  };
}
