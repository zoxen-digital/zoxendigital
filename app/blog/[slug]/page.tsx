import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CtaBar from "../../components/CtaBar";
import { POSTS, getPost, type Block } from "@/lib/blog";
import { SITE_URL, jsonLd, pageMeta } from "@/lib/seo";
import ReadingProgress from "./ReadingProgress";
import PreferredSource from "../PreferredSource";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const meta = pageMeta({ path: `/blog/${post.slug}`, title: post.seoTitle, description: post.description });
  return {
    title: post.seoTitle,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.updated,
      ...(post.image && { images: [{ url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt }] }),
    },
    ...(post.image && { twitter: { ...meta.twitter, images: [post.image.src] } }),
  };
}

const formatDate = (iso: string) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "p": return <p key={i}>{b.text}</p>;
    case "h2": return <h2 key={i} id={b.id}>{b.text}</h2>;
    case "h3": return <h3 key={i}>{b.text}</h3>;
    case "ul": return <ul key={i}>{b.items.map((t) => <li key={t}>{t}</li>)}</ul>;
    case "quote": return <blockquote key={i}>{b.text}</blockquote>;
    case "callout":
      return (
        <aside key={i} className="bp-callout">
          <div className="bp-callout-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="white" strokeWidth="2" strokeLinejoin="round" /></svg>
          </div>
          <div>
            <div className="bp-callout-title">{b.title}</div>
            <p>{b.text}</p>
            {b.cta && <Link href={b.cta.href} className="bp-callout-btn">{b.cta.label} →</Link>}
          </div>
        </aside>
      );
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = post.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.published,
        dateModified: post.updated,
        author: { "@type": "Organization", name: post.author, url: SITE_URL },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: url,
        image: post.image ? `${SITE_URL}${post.image.src}` : `${SITE_URL}/opengraph-image`,
        keywords: post.keywords.join(", "),
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <ReadingProgress />
      <Navbar />

      <article>
        {/* Header */}
        <header className="bp-header">
          <div className="bp-wrap">
            <nav className="bp-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>/</span><Link href="/blog">Blog</Link><span>/</span><span className="bp-crumb-current">{post.category}</span>
            </nav>
            <span className="bp-category">{post.category}</span>
            <h1 className="bp-title">{post.title}</h1>
            <p className="bp-lead">{post.excerpt}</p>
            <div className="bp-meta">
              <span className="bp-avatar">ZD</span>
              <span><b>{post.author}</b><br /><time dateTime={post.published}>{formatDate(post.published)}</time> · {post.readMinutes} min read</span>
            </div>
          </div>
        </header>

        {/* Featured image */}
        <div className="bp-wrap">
          {post.image ? (
            <figure className="bp-hero-img">
              <Image src={post.image.src} alt={post.image.alt} width={post.image.width} height={post.image.height} priority sizes="(max-width: 1180px) 100vw, 1132px" />
            </figure>
          ) : (
            <div className="bp-hero-visual" role="img" aria-label="Illustration of an AI chatbot answering a customer on a small business website">
              <div className="bp-hv-window">
                <div className="bp-hv-bar"><i /><i /><i /><span>yourbusiness.com</span></div>
                <div className="bp-hv-body">
                  <div className="bp-hv-lines"><span /><span /><span className="short" /></div>
                  <div className="bp-hv-chat">
                    <div className="bp-hv-chat-head"><span className="dot" />AI Assistant · Online</div>
                    <div className="bp-hv-msg bot">Hi! How can I help you today?</div>
                    <div className="bp-hv-msg user">Do you work on weekends?</div>
                    <div className="bp-hv-msg bot">Yes, Saturdays 9am to 2pm. Want me to book you in?</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Body + table of contents */}
        <div className="bp-wrap bp-layout">
          <aside className="bp-toc">
            <div className="bp-toc-title">In this article</div>
            <ol>{toc.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ol>
          </aside>

          <div className="bp-content">
            {post.body.map(renderBlock)}

            <section className="bp-faq" aria-labelledby="faq">
              <h2 id="faq">Frequently asked questions</h2>
              {post.faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </section>

            <PreferredSource />

            <div className="bp-share">
              Found this useful? Share it:
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + url)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bp-wrap" style={{ paddingTop: 20 }}>
          <h2 className="bp-related-title">Keep reading</h2>
          <div className="bp-related">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="bp-related-card">
                <span className="bp-category">{r.category}</span>
                <h3>{r.title}</h3>
                <p>{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CtaBar />
      <Footer />

      <style>{`
        .bp-wrap { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
        .bp-header { padding: 140px 0 40px; background: radial-gradient(circle at 15% 0%, rgba(129,140,248,0.22), transparent 45%); }
        .bp-header .bp-wrap { max-width: 860px; }
        .bp-crumbs { display: flex; flex-wrap: wrap; gap: 8px; font-size: 13.5px; color: #64748b; margin-bottom: 22px; }
        .bp-crumbs a { color: #475569; text-decoration: none; }
        .bp-crumbs a:hover { color: #4338ca; }
        .bp-crumb-current { color: #0f172a; font-weight: 600; }
        .bp-category { display: inline-block; font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #3730a3; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.25); padding: 5px 12px; border-radius: 50px; }
        .bp-title { font-size: clamp(32px, 4.6vw, 56px); margin: 18px 0 18px; }
        .bp-lead { font-size: 19px; line-height: 1.7; color: #475569; margin-bottom: 26px; }
        .bp-meta { display: flex; align-items: center; gap: 12px; font-size: 14px; color: #475569; line-height: 1.5; }
        .bp-meta b { color: #0f172a; }
        .bp-avatar { width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; color: #fff; background: linear-gradient(135deg, #6366f1, #7c3aed); }

        .bp-hero-img { margin: 0 0 56px; border-radius: 28px; overflow: hidden; border: 1px solid rgba(99,102,241,0.15); box-shadow: 0 30px 60px rgba(79,70,229,0.12); background: #f5f3ff; }
        .bp-hero-img img { display: block; width: 100%; height: auto; }
        .bp-hero-visual { position: relative; height: 380px; border-radius: 28px; overflow: hidden; margin-bottom: 56px; display: flex; align-items: center; justify-content: center;
          background: radial-gradient(circle at 80% 20%, rgba(167,139,250,0.45), transparent 45%), radial-gradient(circle at 10% 90%, rgba(129,140,248,0.4), transparent 45%), linear-gradient(135deg, #eef2ff, #f5f3ff); border: 1px solid rgba(99,102,241,0.15); }
        .bp-hv-window { width: min(640px, 88%); background: #fff; border-radius: 18px; box-shadow: 0 30px 60px rgba(79,70,229,0.18); overflow: hidden; }
        .bp-hv-bar { display: flex; align-items: center; gap: 6px; padding: 11px 14px; border-bottom: 1px solid rgba(15,23,42,0.06); }
        .bp-hv-bar i { width: 9px; height: 9px; border-radius: 50%; background: #e2e8f0; }
        .bp-hv-bar i:first-child { background: #818cf8; }
        .bp-hv-bar span { margin-left: 10px; font-size: 11.5px; color: #475569; background: #f1f5f9; padding: 3px 10px; border-radius: 6px; }
        .bp-hv-body { position: relative; height: 230px; padding: 22px; }
        .bp-hv-lines span { display: block; height: 12px; border-radius: 6px; background: #eef0f4; margin-bottom: 12px; width: 70%; }
        .bp-hv-lines span.short { width: 40%; }
        .bp-hv-chat { position: absolute; right: 18px; bottom: 18px; width: 270px; padding: 12px; border-radius: 16px; background: #fff; border: 1px solid rgba(15,23,42,0.08); box-shadow: 0 16px 36px rgba(79,70,229,0.2); display: flex; flex-direction: column; gap: 7px; }
        .bp-hv-chat-head { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; color: #0f172a; padding-bottom: 6px; border-bottom: 1px solid rgba(15,23,42,0.06); }
        .bp-hv-chat-head .dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; }
        .bp-hv-msg { font-size: 12px; line-height: 1.45; padding: 7px 10px; border-radius: 10px; max-width: 88%; }
        .bp-hv-msg.bot { background: #f1f5f9; color: #0f172a; align-self: flex-start; }
        .bp-hv-msg.user { color: #fff; background: linear-gradient(135deg, #6366f1, #4f46e5); align-self: flex-end; }

        .bp-layout { display: grid; grid-template-columns: 250px minmax(0, 720px); gap: 64px; justify-content: center; }
        .bp-toc { position: sticky; top: 110px; align-self: start; padding: 18px; border-radius: 18px; background: #fff; border: 1px solid rgba(15,23,42,0.07); }
        .bp-toc-title { font-size: 12px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; color: #475569; margin-bottom: 12px; }
        .bp-toc ol { list-style: none; counter-reset: toc; display: flex; flex-direction: column; gap: 10px; }
        .bp-toc li { counter-increment: toc; font-size: 13.5px; line-height: 1.4; }
        .bp-toc li::before { content: counter(toc) ". "; color: #4338ca; font-weight: 700; }
        .bp-toc a { color: #334155; text-decoration: none; }
        .bp-toc a:hover { color: #4338ca; }

        .bp-content { font-size: 18px; line-height: 1.8; color: #334155; }
        .bp-content p { margin-bottom: 22px; line-height: 1.8; }
        .bp-content h2 { font-size: clamp(24px, 2.6vw, 32px); margin: 48px 0 18px; scroll-margin-top: 100px; }
        .bp-content h3 { font-size: 21px; margin: 30px 0 10px; }
        .bp-content ul { margin: 0 0 24px; padding-left: 0; list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .bp-content li { position: relative; padding-left: 28px; }
        .bp-content li::before { content: ""; position: absolute; left: 4px; top: 11px; width: 9px; height: 9px; border-radius: 50%; background: #6366f1; box-shadow: 0 0 0 4px rgba(99,102,241,0.15); }
        .bp-content blockquote { margin: 34px 0; padding: 22px 26px; border-left: 4px solid #6366f1; border-radius: 0 18px 18px 0; background: linear-gradient(110deg, #eef2ff, #fff); font-size: 21px; font-weight: 600; line-height: 1.55; color: #1e1b4b; font-family: var(--font-display), sans-serif; letter-spacing: -0.3px; }

        .bp-callout { display: flex; gap: 18px; margin: 36px 0; padding: 26px; border-radius: 22px; background: linear-gradient(120deg, #eef2ff, #f5f3ff 60%, #fff); border: 1px solid rgba(99,102,241,0.25); box-shadow: 0 16px 40px rgba(79,70,229,0.1); }
        .bp-callout-icon { flex-shrink: 0; width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #3b82f6, #6366f1 55%, #7c3aed); box-shadow: 0 8px 18px rgba(79,70,229,0.35); }
        .bp-callout-title { font-family: var(--font-display), sans-serif; font-size: 20px; font-weight: 800; color: #0f172a; letter-spacing: -0.4px; margin-bottom: 6px; }
        .bp-callout p { margin-bottom: 14px !important; font-size: 16.5px; }
        .bp-callout-btn { display: inline-flex; padding: 11px 20px; border-radius: 50px; font-size: 15px; font-weight: 700; color: #fff; text-decoration: none; background: #0f172a; box-shadow: 0 10px 24px rgba(15,23,42,0.2); }

        .bp-faq { margin-top: 56px; }
        .bp-faq details { border: 1px solid rgba(15,23,42,0.08); border-radius: 16px; background: #fff; padding: 4px 20px; margin-bottom: 12px; }
        .bp-faq summary { cursor: pointer; list-style: none; padding: 16px 28px 16px 0; position: relative; font-weight: 700; color: #0f172a; font-size: 17px; }
        .bp-faq summary::-webkit-details-marker { display: none; }
        .bp-faq summary::after { content: "+"; position: absolute; right: 0; top: 13px; font-size: 22px; color: #4338ca; transition: transform 0.2s; }
        .bp-faq details[open] summary::after { transform: rotate(45deg); }
        .bp-faq details p { font-size: 16.5px; margin-bottom: 16px; }

        .bp-share { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin: 40px 0 10px; padding-top: 24px; border-top: 1px solid rgba(15,23,42,0.08); font-size: 15px; color: #475569; }
        .bp-share a { padding: 8px 16px; border-radius: 50px; font-size: 14px; font-weight: 600; color: #3730a3; text-decoration: none; background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.2); }

        .bp-related-title { font-size: 28px; margin: 40px 0 20px; }
        .bp-related { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .bp-related-card { display: block; padding: 24px; border-radius: 22px; background: #fff; border: 1px solid rgba(15,23,42,0.07); text-decoration: none; transition: transform 0.3s, box-shadow 0.3s; }
        .bp-related-card:hover { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(79,70,229,0.12); }
        .bp-related-card h3 { font-size: 20px; color: #0f172a; margin: 14px 0 8px; }
        .bp-related-card p { font-size: 15px; color: #475569; }

        @media (max-width: 960px) {
          .bp-layout { grid-template-columns: minmax(0, 1fr); gap: 0; }
          .bp-toc { position: static; margin-bottom: 32px; }
          .bp-related { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .bp-header { padding-top: 110px; }
          .bp-hero-visual { height: 280px; border-radius: 20px; }
          .bp-hero-img { border-radius: 18px; margin-bottom: 36px; }
          .bp-hv-chat { width: 220px; right: 10px; bottom: 10px; }
          .bp-content { font-size: 17px; }
          .bp-callout { flex-direction: column; padding: 20px; }
        }
      `}</style>
    </main>
  );
}

export const dynamicParams = false;
