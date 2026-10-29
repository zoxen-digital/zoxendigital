import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Admin area, API routes and the private client onboarding form stay out of search.
      disallow: ["/api/", "/onboarding/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
