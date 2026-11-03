import type { ReactNode } from "react";

// Shared sections: software services, why-Zoxen strip and other services.
// Used on /services and the USA/Canada web development pages.

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const softwareCards: { title: string; icon: ReactNode; points: string[]; tags: string[] }[] = [
  {
    title: "Custom Software",
    icon: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="4" y="6" width="32" height="22" rx="2.5" {...S} /><path d="M14 34h12M20 28v6" {...S} /><rect x="10" y="11" width="8" height="6" rx="1" {...S} /><rect x="22" y="17" width="8" height="6" rx="1" {...S} /><path d="M18 14h3a2 2 0 012 2v1" {...S} /></svg>,
    points: ["Project tracking", "Workflow collaboration", "Business management"],
    tags: ["Internal Tools", "Productivity"],
  },
  {
    title: "API & Data Integrations",
    icon: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="4" y="5" width="13" height="12" rx="1.5" {...S} /><rect x="23" y="23" width="13" height="12" rx="1.5" {...S} /><path d="M7 9h7M7 13h5M26 27h7M26 31h5" {...S} /><path d="M21 9h6a3 3 0 013 3v6M30 18l-2.5-2.5M30 18l2.5-2.5M19 31h-6a3 3 0 01-3-3v-6M10 22l-2.5 2.5M10 22l2.5 2.5" {...S} /></svg>,
    points: ["API integrations", "Data automation", "Middleware solutions"],
    tags: ["Automation", "Data Pipelines"],
  },
  {
    title: "Custom CRM Apps",
    icon: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="4" y="6" width="32" height="22" rx="2.5" {...S} /><path d="M14 34h12M20 28v6" {...S} /><circle cx="13" cy="16" r="4" {...S} /><path d="M13 12v4h4M22 21v-5M26 21v-8M30 21v-3" {...S} /></svg>,
    points: ["Business portals", "Team collaboration", "Operations management"],
    tags: ["B2B Portals", "ERPs & CRMs"],
  },
  {
    title: "Support & Maintenance",
    icon: <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" {...S} /><path d="M11 21l5-5 4 3 3-3 6 6-6 5-3-2-2 2-3-1-4-5z" {...S} /></svg>,
    points: ["Urgent support", "Long-term partnership", "Ongoing maintenance"],
    tags: ["Help Desk", "SLA Managed"],
  },
];

const whyPoints: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Direct collaboration with engineers",
    text: "No account managers in the middle. You talk directly to the developers building your website or software, so questions get real answers fast.",
    icon: <svg width="44" height="44" viewBox="0 0 44 44"><circle cx="12" cy="11" r="4" {...S} /><rect x="6" y="17" width="12" height="7" rx="3.5" {...S} /><circle cx="32" cy="25" r="4" {...S} /><rect x="26" y="31" width="12" height="7" rx="3.5" {...S} /><path d="M24 8h7v9M31 17l-2.5-2.5M31 17l2.5-2.5M20 36h-7v-8M13 28l-2.5 2.5M13 28l2.5 2.5" {...S} strokeDasharray="2 2" /></svg>,
  },
  {
    title: "Live progress in your client portal",
    text: "Track every stage, chat with the team, share files and approve work from one private login.",
    icon: <svg width="44" height="44" viewBox="0 0 44 44"><rect x="6" y="8" width="32" height="24" rx="3" {...S} /><path d="M6 14h32M12 22h10M12 26h6M30 20v8M26 24v4" {...S} /></svg>,
  },
  {
    title: "Fast delivery, clear pricing",
    text: "Websites live in 24 to 48 hours from $99, and fixed quotes for software projects before any work starts.",
    icon: <svg width="44" height="44" viewBox="0 0 44 44"><circle cx="22" cy="23" r="14" {...S} /><path d="M22 15v8l5 3M18 5h8" {...S} /></svg>,
  },
  {
    title: "Support after launch",
    text: "Maintenance, updates and support tickets handled by the same team that built it.",
    icon: <svg width="44" height="44" viewBox="0 0 44 44"><path d="M8 24v-3a14 14 0 0128 0v3" {...S} /><rect x="6" y="24" width="7" height="10" rx="2" {...S} /><rect x="31" y="24" width="7" height="10" rx="2" {...S} /><path d="M34 34c0 3-3 5-8 5h-3" {...S} /></svg>,
  },
];

const otherServices: { title: string; icon: ReactNode }[] = [
  { title: "Consulting, Discovery & Strategy", icon: <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="16" cy="20" r="12" {...S} /><path d="M4 20h24M16 8c4 4 4 20 0 24M16 8c-4 4-4 20 0 24" {...S} /><path d="M27 33h9l-1-5-3-2 1-4-3-3-3 4 1 4-2 2z" {...S} /></svg> },
  { title: "Business Process Automation", icon: <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="6" {...S} /><circle cx="20" cy="20" r="2" {...S} /><path d="M20 8v4M20 28v4M8 20h4M28 20h4M11.5 11.5l3 3M25.5 25.5l3 3M28.5 11.5l-3 3M14.5 25.5l-3 3" {...S} /><circle cx="6" cy="6" r="2" {...S} /><circle cx="34" cy="34" r="2" {...S} /></svg> },
  { title: "SaaS Integrations", icon: <svg width="40" height="40" viewBox="0 0 40 40"><path d="M12 24a7 7 0 01-1-14 9 9 0 0117 2 6 6 0 011 12z" {...S} /><path d="M15 24v6M20 24v9M25 24v6" {...S} /><circle cx="15" cy="31" r="1.5" {...S} /><circle cx="20" cy="34" r="1.5" {...S} /><circle cx="25" cy="31" r="1.5" {...S} /></svg> },
  { title: "App Modernization", icon: <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="22" cy="20" r="8" {...S} /><circle cx="22" cy="20" r="3" {...S} /><path d="M22 9v3M22 28v3M11 20h3M30 20h3M14 12l2 2M28 26l2 2M30 12l-2 2" {...S} /><path d="M6 8h6v6M6 32h6v-6" {...S} /></svg> },
  { title: "eCommerce Development", icon: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="5" y="6" width="30" height="22" rx="2.5" {...S} /><path d="M3 32h34M12 13h3l2 8h9l2-6H16" {...S} /><circle cx="18" cy="24" r="1" {...S} /><circle cx="25" cy="24" r="1" {...S} /></svg> },
  { title: "Maintenance & Support", icon: <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="11" {...S} /><path d="M20 4v4M20 32v4M4 20h4M32 20h4M8.7 8.7l2.8 2.8M28.5 28.5l2.8 2.8M31.3 8.7l-2.8 2.8M11.5 28.5l-2.8 2.8" {...S} /><path d="M17 23l6-6M22 15a3 3 0 104 4" {...S} /></svg> },
];

// French (Canada) copy, matched to the cards above by position.
const softwareFr = [
  { title: "Logiciels sur mesure", points: ["Suivi de projets", "Collaboration d'équipe", "Gestion d'entreprise"], tags: ["Outils internes", "Productivité"] },
  { title: "Intégrations API et données", points: ["Intégrations API", "Automatisation des données", "Solutions middleware"], tags: ["Automatisation", "Flux de données"] },
  { title: "Applications CRM sur mesure", points: ["Portails d'affaires", "Collaboration d'équipe", "Gestion des opérations"], tags: ["Portails B2B", "ERP et CRM"] },
  { title: "Soutien et maintenance", points: ["Soutien urgent", "Partenariat à long terme", "Maintenance continue"], tags: ["Service d'assistance", "Entente de service"] },
];
const whyFr = [
  { title: "Collaboration directe avec les développeurs", text: "Aucun intermédiaire. Vous parlez directement aux développeurs qui créent votre site ou votre logiciel, pour des réponses claires et rapides." },
  { title: "Suivi en direct dans votre portail client", text: "Suivez chaque étape, discutez avec l'équipe, partagez vos fichiers et approuvez le travail à partir d'un seul accès privé." },
  { title: "Livraison rapide, prix clairs", text: "Sites web en ligne en 24 à 48 heures dès 99 $ US, et soumissions à prix fixe pour les projets logiciels avant le début des travaux." },
  { title: "Soutien après la mise en ligne", text: "Mises à jour, maintenance et billets de soutien pris en charge par la même équipe qui a créé votre projet." },
];

type Lang = "en" | "fr";

const SOFTWARE_IDS: Record<string, string> = {
  "Custom Software": "custom-software",
  "API & Data Integrations": "api-data-integrations",
  "Custom CRM Apps": "custom-crm-apps",
  "Support & Maintenance": "support-maintenance",
};

export function SoftwareServices({ heading = "Software Development", intro, lang = "en" }: { heading?: string; intro?: string; lang?: Lang }) {
  return (
    <section className="sw-section">
      <div className="sw-wrap">
        <div className="sw-eyebrow">{lang === "fr" ? "LOGICIELS" : "SOFTWARE"}</div>
        <h2 className="sw-h2">{heading}</h2>
        <p className="sw-intro">{intro || "Beyond websites, we build the software that runs your business: internal tools, integrations, CRMs and the support that keeps them working."}</p>
        <div className="sw-grid">
          {softwareCards.map((card, idx) => ({ ...card, ...(lang === "fr" ? softwareFr[idx] : {}) })).map((c) => (
            <div key={c.title} id={SOFTWARE_IDS[c.title] ?? undefined} className="sw-card">
              <div className="sw-card-head">
                <span className="sw-icon">{c.icon}</span>
                <h3>{c.title}</h3>
                <svg className="sw-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <ul>
                {c.points.map((p) => (
                  <li key={p}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="#4338ca" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="sw-tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
      <SectionStyles />
    </section>
  );
}

export function WhyZoxen({ lang = "en" }: { lang?: Lang }) {
  return (
    <section className="sw-section sw-why">
      <div className="sw-wrap">
        <div className="sw-eyebrow light">{lang === "fr" ? "POURQUOI ZOXEN" : "WHY ZOXEN"}</div>
        <h2 className="sw-h2 light">{lang === "fr" ? "Conçu avec vous, pas seulement pour vous." : "Built with you, not just for you."}</h2>
        <div className="sw-why-grid">
          {whyPoints.map((point, idx) => ({ ...point, ...(lang === "fr" ? whyFr[idx] : {}) })).map((w, i) => (
            <div key={w.title} className={`sw-why-card ${i === 0 ? "featured" : ""}`}>
              <span className="sw-why-icon">{w.icon}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </div>
      <SectionStyles />
    </section>
  );
}

export function OtherServices() {
  return (
    <section className="sw-section">
      <div className="sw-wrap">
        <h2 className="sw-h2 small">Other Services</h2>
        <div className="sw-other">
          {otherServices.map((o) => (
            <div key={o.title} className="sw-other-item">
              <span className="sw-other-icon">{o.icon}</span>
              <h3>{o.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <SectionStyles />
    </section>
  );
}

function SectionStyles() {
  return (
    <style>{`
      .sw-section { padding: 70px 24px; }
      .sw-wrap { max-width: 1280px; margin: 0 auto; }
      .sw-eyebrow { font-size: 13px; font-weight: 700; letter-spacing: 3px; color: #475569; margin-bottom: 14px; }
      .sw-eyebrow.light { color: #c7d2fe; }
      .sw-h2 { font-size: clamp(30px, 4vw, 48px); margin-bottom: 14px; }
      .sw-h2.light { color: #ffffff; margin-bottom: 40px; }
      .sw-h2.small { font-size: clamp(26px, 3vw, 34px); margin-bottom: 34px; }
      .sw-intro { font-size: 18px; color: #475569; max-width: 760px; margin-bottom: 40px; }

      .sw-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
      .sw-card { scroll-margin-top: 110px; display: flex; flex-direction: column; padding: 24px; border-radius: 18px; background: #fff; border: 1px solid rgba(15,23,42,0.08); box-shadow: 0 8px 26px rgba(15,23,42,0.04); transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; }
      .sw-card:hover { transform: translateY(-4px); border-color: rgba(99,102,241,0.35); box-shadow: 0 20px 44px rgba(79,70,229,0.14); }
      .sw-card-head { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 20px; }
      .sw-icon { flex-shrink: 0; color: #3730a3; }
      .sw-card-head h3 { flex: 1; font-size: 20px; line-height: 1.2; }
      .sw-arrow { flex-shrink: 0; color: #94a3b8; transition: color 0.3s, transform 0.3s; }
      .sw-card:hover .sw-arrow { color: #4338ca; transform: translate(2px, -2px); }
      .sw-card ul { list-style: none; display: flex; flex-direction: column; gap: 12px; padding-bottom: 20px; margin-bottom: 18px; border-bottom: 1px solid rgba(15,23,42,0.08); }
      .sw-card li { display: flex; align-items: center; gap: 10px; font-size: 15.5px; color: #334155; }
      .sw-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; }
      .sw-tags span { font-size: 12.5px; font-weight: 600; color: #3730a3; padding: 6px 12px; border-radius: 50px; background: #f8fafc; border: 1px solid rgba(99,102,241,0.2); }

      .sw-why { background: radial-gradient(circle at 85% 20%, rgba(124,58,237,0.35), transparent 45%), linear-gradient(135deg, #1e1b4b, #312e81 60%, #3730a3); }
      .sw-why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
      .sw-why-card { padding: 28px 24px; border-radius: 18px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); }
      .sw-why-card.featured { background: #f8fafc; border-color: transparent; box-shadow: 0 24px 50px rgba(15,23,42,0.3); }
      .sw-why-icon { display: inline-flex; color: #c7d2fe; margin-bottom: 18px; }
      .sw-why-card.featured .sw-why-icon { color: #3730a3; }
      .sw-why-card h3 { font-size: 20px; line-height: 1.25; color: #ffffff; margin-bottom: 10px; }
      .sw-why-card.featured h3 { color: #0f172a; }
      .sw-why-card p { font-size: 15px; line-height: 1.65; color: #c7d2fe; }
      .sw-why-card.featured p { color: #475569; }

      .sw-other { display: grid; grid-template-columns: repeat(3, 1fr); gap: 34px 40px; }
      .sw-other-item { display: flex; align-items: center; gap: 18px; }
      .sw-other-icon { flex-shrink: 0; width: 64px; height: 64px; border-radius: 18px; display: flex; align-items: center; justify-content: center; color: #3730a3; background: #eef2ff; border: 1px solid rgba(99,102,241,0.2); }
      .sw-other-item h3 { font-size: 19px; line-height: 1.3; }

      @media (max-width: 1100px) {
        .sw-grid, .sw-why-grid { grid-template-columns: repeat(2, 1fr); }
        .sw-other { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 640px) {
        .sw-section { padding: 50px 16px; }
        .sw-grid, .sw-why-grid, .sw-other { grid-template-columns: 1fr; }
      }
    `}</style>
  );
}
