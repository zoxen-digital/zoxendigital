import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { POSTS } from "@/lib/blog";

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
    page("/blog", 0.7, "weekly"),
    ...POSTS.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.updated), changeFrequency: "monthly" as const, priority: 0.7 })),
    page("/privacy-policy", 0.3, "yearly"),
    page("/terms", 0.3, "yearly"),
    page("/refund-policy", 0.3, "yearly"),
    page("/data-deletion", 0.3, "yearly"),
  ];
}
