import Script from "next/script";

// Google "Add to preferred sources" button (standard JavaScript implementation).
// Loaded only on blog pages so it doesn't add JavaScript to the rest of the site.
export default function PreferredSource({ theme = "light" }: { theme?: "light" | "dark" }) {
  return (
    <div className="ps-box">
      <div>
        <div className="ps-title">Follow Zoxen Digital on Google</div>
        <p className="ps-text">Add us as a preferred source to see our guides more often in Google Search, Top Stories and AI Mode.</p>
      </div>
      <div google-add-preferred-source-btn="" data-theme={theme} data-lang="en" />
      {/* Fallback when the button can't load (e.g. blocked scripts) */}
      <noscript>
        <a href="https://www.google.com/preferences/source?q=zoxendigital.com">Add as Preferred Source</a>
      </noscript>
      <Script src="https://news.google.com/swg/js/v1/publisher.js" strategy="lazyOnload" />

      <style>{`
        .ps-box { display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin: 28px 0; padding: 22px 24px; border-radius: 20px; background: #fff; border: 1px solid rgba(15,23,42,0.08); box-shadow: 0 10px 30px rgba(15,23,42,0.04); }
        .ps-title { font-family: var(--font-display), sans-serif; font-size: 18px; font-weight: 800; color: #0f172a; letter-spacing: -0.3px; margin-bottom: 4px; }
        .ps-text { font-size: 15px !important; color: #475569; margin: 0 !important; max-width: 460px; line-height: 1.55; }
      `}</style>
    </div>
  );
}
