import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CtaBar from "../components/CtaBar";
import { POSTS } from "@/lib/blog";
import { SITE_URL, jsonLd, pageMeta } from "@/lib/seo";

const description =
  "Practical guides on websites, SEO, Google and Meta ads and AI chatbots for small businesses in the USA and Canada, from the Zoxen Digital team.";

export const metadata: Metadata = {
  title: "Blog: Websites, SEO, Ads & AI for Small Business",
  ...pageMeta({ path: "/blog", title: "Blog: Websites, SEO, Ads & AI for Small Business", description }),
};

const formatDate = (iso: string) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => b.published.localeCompare(a.published));
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Zoxen Digital Blog",
    url: `${SITE_URL}/blog`,
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}/blog/${p.slug}`, datePublished: p.published })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <Navbar />

      <section style={{ padding: "150px 24px 40px", background: "radial-gradient(circle at 15% 0%, rgba(129,140,248,0.22), transparent 45%)" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
            <span style={{ width: "36px", height: "1px", background: "rgba(15,23,42,0.3)" }} />
            <span style={{ fontSize: "13px", letterSpacing: "3px", color: "#475569", fontWeight: 600 }}>THE ZOXEN BLOG</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5.4vw, 68px)", maxWidth: "860px", marginBottom: "20px" }}>
            Grow your business online, <span className="gradient-text">one guide at a time.</span>
          </h1>
          <p style={{ fontSize: "19px", color: "#475569", maxWidth: "680px" }}>{description}</p>
        </div>
      </section>

      <section style={{ padding: "20px 24px 60px" }}>
        <div className="bl-grid">
          {posts.map((p, i) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className={`bl-card ${i === 0 ? "featured" : ""}`}>
              <div className="bl-thumb">
                {p.image ? (
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 960px) 100vw, 600px" priority={i === 0} style={{ objectFit: "cover" }} />
                ) : (
                  <div className="bl-thumb-chat" aria-hidden="true">
                    <span className="bot">Hi! How can I help?</span>
                    <span className="user">Do you work weekends?</span>
                  </div>
                )}
              </div>
              <div className="bl-body">
                <span className="bl-cat">{p.category}</span>
                <h2>{p.title}</h2>
                <p>{p.excerpt}</p>
                <span className="bl-meta">{formatDate(p.published)} · {p.readMinutes} min read</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBar />
      <Footer />

      <style>{`
        .bl-grid { max-width: 1180px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .bl-card { display: flex; flex-direction: column; border-radius: 24px; overflow: hidden; background: #fff; border: 1px solid rgba(15,23,42,0.07); text-decoration: none; box-shadow: 0 10px 30px rgba(15,23,42,0.04); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s; }
        .bl-card:hover { transform: translateY(-4px); box-shadow: 0 22px 50px rgba(79,70,229,0.14); }
        .bl-card.featured { grid-column: 1 / -1; flex-direction: row; }
        .bl-thumb { position: relative; overflow: hidden; min-height: 200px; display: flex; align-items: center; justify-content: center;
          background: radial-gradient(circle at 80% 20%, rgba(167,139,250,0.45), transparent 50%), radial-gradient(circle at 10% 90%, rgba(129,140,248,0.4), transparent 50%), linear-gradient(135deg, #eef2ff, #f5f3ff); }
        .bl-card.featured .bl-thumb { flex: 1.1; min-height: 320px; }
        .bl-thumb-chat { display: flex; flex-direction: column; gap: 8px; width: 230px; padding: 14px; border-radius: 16px; background: #fff; box-shadow: 0 16px 36px rgba(79,70,229,0.2); }
        .bl-thumb-chat span { font-size: 12.5px; padding: 8px 11px; border-radius: 10px; max-width: 90%; }
        .bl-thumb-chat .bot { background: #f1f5f9; color: #0f172a; align-self: flex-start; }
        .bl-thumb-chat .user { color: #fff; background: linear-gradient(135deg, #6366f1, #4f46e5); align-self: flex-end; }
        .bl-body { flex: 1; padding: 26px; display: flex; flex-direction: column; gap: 12px; }
        .bl-card.featured .bl-body { padding: 40px; justify-content: center; }
        .bl-cat { align-self: flex-start; font-size: 11.5px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #3730a3; background: rgba(99,102,241,0.1); padding: 5px 11px; border-radius: 50px; }
        .bl-body h2 { font-size: 22px; line-height: 1.25; color: #0f172a; }
        .bl-card.featured .bl-body h2 { font-size: clamp(26px, 3vw, 36px); }
        .bl-body p { font-size: 15.5px; color: #475569; }
        .bl-meta { margin-top: auto; font-size: 13.5px; color: #64748b; font-weight: 600; }
        @media (max-width: 960px) {
          .bl-grid { grid-template-columns: 1fr; }
          .bl-card.featured { flex-direction: column; }
          .bl-card.featured .bl-thumb { min-height: 240px; }
          .bl-card.featured .bl-body { padding: 26px; }
        }
      `}</style>
    </main>
  );
}
