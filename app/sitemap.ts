import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page("", 1, "weekly"),
    page("/services", 0.9, "monthly"),
    page("/web-development", 0.9, "monthly"),
    page("/privacy-policy", 0.3, "yearly"),
    page("/terms", 0.3, "yearly"),
    page("/refund-policy", 0.3, "yearly"),
    page("/data-deletion", 0.3, "yearly"),
  ];
}
