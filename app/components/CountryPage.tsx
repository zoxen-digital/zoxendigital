import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CtaBar from "./CtaBar";
import { SoftwareServices, WhyZoxen } from "./SoftwareSections";
import { LOCATIONS, type Location } from "@/lib/locations";
import { SITE_URL, jsonLd } from "@/lib/seo";

// Fixed page text in English and French (Canada).
const UI = {
  en: {
    serving: "SERVING", start: "Start your project", see99: "See the $99 website →",
    trust: ["Live in 24-48 hours", "Free hosting", "Free AI chatbot", "Client portal"],
    packagesFor: (c: string) => `Website packages for ${c} businesses`, packagesSub: "All prices in USD, paid once. No monthly contracts for the website itself.",
    compare: "Compare all package details →", popular: "MOST POPULAR",
    regionsSub: "We work remotely with businesses nationwide, including:", industriesTitle: "Industries we build for", industriesSub: "Websites and software for:",
    faq: "Frequently asked questions", alsoServing: "Also serving", webDevIn: "Web development in",
    softwareIn: (c: string) => `Custom Software Development in ${c}`,
  },
  fr: {
    serving: "AU SERVICE DU", start: "Démarrer votre projet", see99: "Voir le site à 99 $ →",
    trust: ["En ligne en 24-48 heures", "Hébergement gratuit", "Chatbot IA gratuit", "Portail client"],
    packagesFor: () => "Forfaits de sites web pour les entreprises canadiennes", packagesSub: "Tous les prix en dollars américains, payés une seule fois. Aucun abonnement mensuel pour le site.",
    compare: "Comparer tous les forfaits →", popular: "LE PLUS POPULAIRE",
    regionsSub: "Nous travaillons à distance avec des entreprises partout au pays, notamment à :", industriesTitle: "Secteurs que nous servons", industriesSub: "Sites web et logiciels pour :",
    faq: "Questions fréquentes", alsoServing: "Vous êtes aussi aux", webDevIn: "Développement web aux",
    softwareIn: () => "Développement de logiciels sur mesure au Canada",
  },
};

const packagesFr = [
  { name: "Standard", note: "paiement unique", points: ["Jusqu'à 5 pages", "Hébergement gratuit", "Chatbot IA gratuit", "SEO de base"] },
  { name: "Premium", note: "paiement unique", points: ["Jusqu'à 12 pages", "Portail d'administration", "Réservations et paiements", "Configuration SEO"] },
  { name: "Commerce en ligne", note: "paiement unique", points: ["Jusqu'à 15 pages", "50+ produits", "Passerelle de paiement", "Gestion des commandes"] },
  { name: "Sur mesure et logiciels", price: "Soumission", note: "prix fixe", points: ["Design sur mesure", "CRM et portails", "Intégrations", "Soutien continu"] },
];

const packages = [
  { name: "Standard", price: "$99", note: "one-time", points: ["Up to 5 pages", "Free hosting", "Free AI chatbot", "Basic on-page SEO"] },
  { name: "Premium", price: "$199", note: "one-time", points: ["Up to 12 pages", "Admin portal", "Bookings & payments", "SEO setup"], popular: true },
  { name: "E-commerce", price: "$499", note: "one-time", points: ["Up to 15 pages", "50+ products", "Payment gateway", "Order management"] },
  { name: "Custom & Software", price: "Quote", note: "fixed price", points: ["Custom design", "CRMs & portals", "Integrations", "Ongoing support"] },
];

export default function CountryPage({ loc }: { loc: Location }) {
  const fr = loc.lang === "fr";
  const t = UI[loc.lang];
  const isCanada = loc.slug.startsWith(LOCATIONS.canada.slug);
  const other = isCanada ? LOCATIONS.usa : LOCATIONS.canada;
  const pkgs = packages.map((p, i) => (fr ? { ...p, ...packagesFr[i] } : p));
  const url = `${SITE_URL}/${loc.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `Web Development & Software Development in ${loc.country}`,
        serviceType: ["Website development", "Custom software development", "E-commerce development"],
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: loc.country },
        url,
        description: loc.description,
        inLanguage: fr ? "fr-CA" : "en",
        offers: [
          { "@type": "Offer", name: "Standard Website", price: "99", priceCurrency: "USD" },
          { "@type": "Offer", name: "Premium Website", price: "199", priceCurrency: "USD" },
          { "@type": "Offer", name: "E-commerce Website", price: "499", priceCurrency: "USD" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `Web Development ${loc.short}`, item: url },
        ],
      },
    ],
  };

  return (
    <main lang={fr ? "fr-CA" : undefined}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <Navbar />

      {/* Hero */}
      <section className="cp-hero">
        <div className="cp-wrap">
          <nav className="cp-crumbs" aria-label="Breadcrumb"><Link href="/">{fr ? "Accueil" : "Home"}</Link><span>/</span><span>{fr ? "Développement web Canada" : `Web Development ${loc.short}`}</span></nav>
          <div className="cp-top">
            <div className="cp-badge"><span className="cp-flag" />{t.serving} {loc.country.toUpperCase()}</div>
            {isCanada && (
              <div className="cp-lang" role="group" aria-label="Language">
                <Link href={`/${LOCATIONS.canada.slug}`} hrefLang="en-CA" aria-current={!fr ? "page" : undefined} className={!fr ? "on" : ""}>EN</Link>
                <Link href={`/${LOCATIONS.canadaFr.slug}`} hrefLang="fr-CA" aria-current={fr ? "page" : undefined} className={fr ? "on" : ""}>FR</Link>
              </div>
            )}
          </div>
          <h1 className="cp-h1">{loc.h1} <span className="gradient-text">{loc.highlight}</span></h1>
          <p className="cp-lead">{loc.lead}</p>
          <div className="cp-actions">
            <a href="#contact" className="cp-btn dark">{t.start} <span aria-hidden="true">↗</span></a>
            <Link href="/web-development" className="cp-btn ghost">{t.see99}</Link>
          </div>
          <div className="cp-trust">
            {t.trust.map((x) => <span key={x}>✓ {x}</span>)}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="cp-section">
        <div className="cp-wrap cp-narrow">
          {loc.intro.map((p) => <p key={p.slice(0, 20)} className="cp-p">{p}</p>)}
        </div>
      </section>

      {/* Why */}
      <section className="cp-section">
        <div className="cp-wrap">
          <h2 className="cp-h2">{loc.whyTitle}</h2>
          <div className="cp-grid4">
            {loc.why.map((w, i) => (
              <div key={w.title} className="cp-card">
                <span className="cp-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="cp-section">
        <div className="cp-wrap">
          <h2 className="cp-h2">{t.packagesFor(loc.short)}</h2>
          <p className="cp-sub">{t.packagesSub}</p>
          <div className="cp-grid4">
            {pkgs.map((p) => (
              <div key={p.name} className={`cp-pkg ${p.popular ? "popular" : ""}`}>
                {p.popular && <span className="cp-pop">{t.popular}</span>}
                <div className="cp-pkg-name">{p.name}</div>
                <div className="cp-price">{p.price}<span>{p.note}</span></div>
                <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "22px" }}><Link href="/web-development#packages" className="cp-link">{t.compare}</Link></div>
        </div>
      </section>

      {/* Local */}
      <section className="cp-section cp-tint">
        <div className="cp-wrap">
          <h2 className="cp-h2">{loc.localTitle}</h2>
          <div className="cp-grid2">
            {loc.local.map((l) => (
              <div key={l.title} className="cp-local">
                <h3>{l.title}</h3>
                <p>{l.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SoftwareServices lang={loc.lang} heading={t.softwareIn(loc.country === "United States" ? "the USA" : "Canada")} intro={loc.softwareIntro} />
      <WhyZoxen lang={loc.lang} />

      {/* Regions & industries */}
      <section className="cp-section">
        <div className="cp-wrap cp-split">
          <div>
            <h2 className="cp-h2 small">{loc.regionsTitle}</h2>
            <p className="cp-sub">{t.regionsSub}</p>
            <div className="cp-chips">{loc.regions.map((r) => <span key={r}>{r}</span>)}</div>
          </div>
          <div>
            <h2 className="cp-h2 small">{t.industriesTitle}</h2>
            <p className="cp-sub">{t.industriesSub}</p>
            <div className="cp-chips">{loc.industries.map((r) => <span key={r}>{r}</span>)}</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cp-section">
        <div className="cp-wrap cp-narrow">
          <h2 className="cp-h2">{t.faq}</h2>
          {loc.faq.map((f) => (
            <details key={f.q} className="cp-faq">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
          <p className="cp-other">{t.alsoServing} {fr ? "États-Unis" : other.country} ? <Link href={`/${other.slug}`} className="cp-link">{t.webDevIn} {fr ? "États-Unis" : other.short} →</Link></p>
        </div>
      </section>

      <CtaBar />
      <Footer />

      <style>{`
        .cp-wrap { max-width: 1280px; margin: 0 auto; }
        .cp-narrow { max-width: 820px; }
        .cp-hero { padding: 150px 24px 60px; background: radial-gradient(circle at 15% 0%, rgba(129,140,248,0.24), transparent 45%), radial-gradient(circle at 90% 30%, rgba(167,139,250,0.18), transparent 40%); }
        .cp-crumbs { display: flex; gap: 8px; font-size: 13.5px; color: #64748b; margin-bottom: 20px; }
        .cp-crumbs a { color: #475569; text-decoration: none; }
        .cp-top { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; margin-bottom: 24px; }
        .cp-top .cp-badge { margin-bottom: 0; }
        .cp-lang { display: inline-flex; padding: 4px; border-radius: 50px; background: #fff; border: 1px solid rgba(15,23,42,0.1); box-shadow: 0 4px 14px rgba(15,23,42,0.05); }
        .cp-lang a { padding: 7px 16px; border-radius: 50px; font-size: 13px; font-weight: 800; letter-spacing: 1px; color: #475569; text-decoration: none; transition: all 0.2s; }
        .cp-lang a.on { color: #fff; background: #0f172a; }
        .cp-lang a:not(.on):hover { color: #3730a3; }
        .cp-badge { display: inline-flex; align-items: center; gap: 10px; padding: 8px 16px 8px 10px; border-radius: 50px; background: #fff; border: 1px solid rgba(15,23,42,0.08); font-size: 12.5px; font-weight: 700; letter-spacing: 2px; color: #0f172a; margin-bottom: 24px; }
        .cp-flag { width: 14px; height: 14px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #7c3aed); box-shadow: 0 0 0 3px rgba(99,102,241,0.2); }
        .cp-h1 { font-size: clamp(38px, 5.6vw, 72px); max-width: 1000px; margin-bottom: 22px; }
        .cp-lead { font-size: 19px; color: #475569; max-width: 760px; margin-bottom: 30px; }
        .cp-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-bottom: 26px; }
        .cp-btn { display: inline-flex; align-items: center; gap: 10px; padding: 17px 28px; border-radius: 50px; font-size: 16px; font-weight: 700; text-decoration: none; font-family: var(--font-display), sans-serif; transition: transform 0.3s, box-shadow 0.3s; }
        .cp-btn.dark { color: #fff; background: #0f172a; box-shadow: 0 14px 30px rgba(15,23,42,0.22); }
        .cp-btn.dark:hover { transform: translateY(-2px); box-shadow: 0 18px 36px rgba(79,70,229,0.3); }
        .cp-btn.ghost { color: #0f172a; border: 1.5px dashed rgba(15,23,42,0.22); background: rgba(255,255,255,0.6); }
        .cp-btn.ghost:hover { border-color: #6366f1; color: #3730a3; }
        .cp-trust { display: flex; flex-wrap: wrap; gap: 10px 22px; font-size: 14.5px; font-weight: 600; color: #334155; }

        .cp-section { padding: 56px 24px; }
        .cp-tint { background: linear-gradient(180deg, transparent, rgba(238,242,255,0.8), transparent); }
        .cp-p { font-size: 18px; line-height: 1.8; color: #334155; margin-bottom: 18px; }
        .cp-h2 { font-size: clamp(28px, 3.6vw, 44px); margin-bottom: 14px; }
        .cp-h2.small { font-size: clamp(24px, 2.6vw, 32px); }
        .cp-sub { font-size: 16.5px; color: #475569; margin-bottom: 26px; }

        .cp-grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 30px; }
        .cp-grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 30px; }
        .cp-card, .cp-local { padding: 26px; border-radius: 20px; background: #fff; border: 1px solid rgba(15,23,42,0.07); box-shadow: 0 8px 26px rgba(15,23,42,0.04); }
        .cp-num { display: inline-block; font-size: 13px; font-weight: 800; letter-spacing: 2px; color: #4338ca; margin-bottom: 14px; }
        .cp-card h3, .cp-local h3 { font-size: 20px; line-height: 1.25; margin-bottom: 10px; }
        .cp-card p, .cp-local p { font-size: 15.5px; color: #475569; line-height: 1.7; }

        .cp-pkg { position: relative; padding: 26px; border-radius: 20px; background: #fff; border: 1px solid rgba(15,23,42,0.08); }
        .cp-pkg.popular { border-color: rgba(99,102,241,0.45); box-shadow: 0 20px 44px rgba(79,70,229,0.15); }
        .cp-pop { position: absolute; top: -12px; left: 22px; font-size: 11px; font-weight: 800; letter-spacing: 1px; color: #fff; padding: 5px 12px; border-radius: 50px; background: linear-gradient(135deg, #6366f1, #4f46e5); }
        .cp-pkg-name { font-size: 14px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #3730a3; margin-bottom: 8px; }
        .cp-price { font-family: var(--font-display), sans-serif; font-size: 40px; font-weight: 800; letter-spacing: -1.5px; color: #0f172a; margin-bottom: 16px; }
        .cp-price span { font-family: var(--font-body), sans-serif; font-size: 14px; font-weight: 600; letter-spacing: 0; color: #64748b; margin-left: 6px; }
        .cp-pkg ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .cp-pkg li { position: relative; padding-left: 22px; font-size: 15px; color: #334155; }
        .cp-pkg li::before { content: "✓"; position: absolute; left: 0; color: #4338ca; font-weight: 800; }
        .cp-link { font-weight: 700; color: #3730a3; text-decoration: none; }
        .cp-link:hover { text-decoration: underline; }

        .cp-split { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
        .cp-chips { display: flex; flex-wrap: wrap; gap: 10px; }
        .cp-chips span { font-size: 14.5px; font-weight: 600; color: #334155; padding: 9px 16px; border-radius: 50px; background: #fff; border: 1px solid rgba(15,23,42,0.1); }

        .cp-faq { border: 1px solid rgba(15,23,42,0.08); border-radius: 16px; background: #fff; padding: 4px 20px; margin-bottom: 12px; }
        .cp-faq summary { cursor: pointer; list-style: none; padding: 16px 28px 16px 0; position: relative; font-weight: 700; color: #0f172a; font-size: 17px; }
        .cp-faq summary::-webkit-details-marker { display: none; }
        .cp-faq summary::after { content: "+"; position: absolute; right: 0; top: 13px; font-size: 22px; color: #4338ca; transition: transform 0.2s; }
        .cp-faq[open] summary::after { transform: rotate(45deg); }
        .cp-faq p { font-size: 16px; color: #475569; line-height: 1.7; margin-bottom: 16px; }
        .cp-other { margin-top: 26px; font-size: 16px; color: #475569; }

        @media (max-width: 1000px) {
          .cp-grid4 { grid-template-columns: repeat(2, 1fr); }
          .cp-split { grid-template-columns: 1fr; gap: 30px; }
        }
        @media (max-width: 640px) {
          .cp-hero { padding: 120px 16px 40px; }
          .cp-section { padding: 40px 16px; }
          .cp-grid4, .cp-grid2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
