// Country landing pages. Each country has its own copy so the pages are genuinely different.
export type Location = {
  lang: "en" | "fr";
  slug: string; // route path without leading slash
  country: string;
  short: string; // "USA" / "Canada"
  seoTitle: string;
  description: string;
  keywords: string[];
  h1: string;
  highlight: string;
  lead: string;
  intro: string[];
  whyTitle: string;
  why: { title: string; text: string }[];
  localTitle: string;
  local: { title: string; text: string }[];
  regionsTitle: string;
  regions: string[];
  industries: string[];
  softwareIntro: string;
  faq: { q: string; a: string }[];
};

export const LOCATIONS: Record<"usa" | "canada" | "canadaFr", Location> = {
  usa: {
    lang: "en",
    slug: "web-development-usa",
    country: "United States",
    short: "USA",
    seoTitle: "Web Development & Software Company in the USA",
    description:
      "Web development and custom software for US small businesses. Websites live in 24-48 hours from $99, plus CRMs, integrations, SEO and AI chatbots.",
    keywords: [
      "web development company USA",
      "web development services USA",
      "website development company in USA",
      "software development company USA",
      "small business web design USA",
      "custom software development USA",
      "affordable web development USA",
      "web developer for small business USA",
    ],
    h1: "Web Development & Software Company",
    highlight: "for US Businesses",
    lead:
      "Fast, conversion-focused websites and custom software for small and growing businesses across the United States. Websites live in 24 to 48 hours from $99.",
    intro: [
      "Most small businesses in the US don't need a huge agency retainer. They need a website that loads fast, shows up on Google and turns visitors into calls, plus a few smart tools that save time behind the scenes.",
      "That is what we do. Zoxen Digital builds websites, online stores and custom software for US businesses, from solo contractors in Texas to growing clinics in Florida and service companies in New York. You get one team for design, development, SEO and support, and you can follow every step in your own client portal.",
    ],
    whyTitle: "Why US businesses work with Zoxen Digital",
    why: [
      { title: "Clear, fixed pricing in USD", text: "Websites start at $99 one-time. Software projects get a fixed quote before any work begins, so there are no surprise invoices." },
      { title: "Live in 24 to 48 hours", text: "For standard websites, you get a confirmation within minutes, a kickoff the same day and a live site in about two days." },
      { title: "Built to rank on Google", text: "Every site ships with on-page SEO, fast loading, mobile-first design and clean structure, so you are not starting from zero." },
      { title: "Available almost around the clock", text: "Our team is available nearly 24/7, so you get answers and updates on your schedule, whether you are on Eastern, Central, Mountain or Pacific time." },
    ],
    localTitle: "Built for how US businesses operate",
    local: [
      { title: "Accessibility in mind", text: "Website accessibility matters in the US, both for customers and for legal risk. We design with WCAG accessibility guidelines in mind: readable contrast, labeled buttons, keyboard-friendly navigation and proper headings." },
      { title: "Local SEO for your city", text: "Ranking in your area is what brings real calls. We structure your pages, schema and Google Business Profile details so you can compete in local results, not just national ones." },
      { title: "Payments and bookings", text: "Accept payments with Stripe, take bookings online and send automatic confirmations, all connected to your website." },
      { title: "Leads that don't slip away", text: "A free AI chatbot on our Standard package answers visitors after hours and collects contact details, so evening and weekend traffic still turns into leads." },
    ],
    regionsTitle: "Serving businesses across the United States",
    regions: ["New York", "Texas", "Florida", "California", "Illinois", "Georgia", "Arizona", "North Carolina", "New Jersey", "Washington"],
    industries: ["Contractors & home services", "Real estate", "Clinics & healthcare", "Restaurants & cafes", "Law firms", "Salons & spas", "E-commerce brands", "Startups & SaaS"],
    softwareIntro:
      "When a website is not enough, we build the software behind it: internal tools, CRMs, customer portals and integrations with the apps US businesses already use, like Stripe, QuickBooks, HubSpot and Google Workspace.",
    faq: [
      { q: "How much does a small business website cost in the USA?", a: "With Zoxen Digital, a professional 5-page website starts at $99 one-time, including free hosting and a free AI chatbot. Larger sites with admin panels, bookings or e-commerce start at $199 and $499. Custom software is quoted per project." },
      { q: "How fast can you launch my website?", a: "Standard websites go live in 24 to 48 hours after we receive your details. Bigger websites and custom software follow a project timeline that we share upfront in your client portal." },
      { q: "Do you build custom software, not just websites?", a: "Yes. We build internal tools, CRM apps, customer portals, API integrations and automations for US businesses, along with ongoing support and maintenance." },
      { q: "Will my website show up on Google?", a: "Every website includes on-page SEO basics: fast loading, mobile design, page titles, descriptions and structured data. For competitive keywords, we also offer ongoing SEO and Google Ads." },
      { q: "Do I own my website?", a: "Yes. Once the project is paid, the website and its content belong to you." },
    ],
  },

  canada: {
    lang: "en",
    slug: "web-development-canada",
    country: "Canada",
    short: "Canada",
    seoTitle: "Web Development & Software Company in Canada",
    description:
      "Web development and custom software for Canadian small businesses. Websites live in 24-48 hours from $99 USD, plus CRMs, integrations, SEO and AI chatbots.",
    keywords: [
      "web development company Canada",
      "web development services Canada",
      "website development company in Canada",
      "software development company Canada",
      "small business website Canada",
      "custom software development Canada",
      "affordable web design Canada",
      "web developer Toronto Vancouver",
    ],
    h1: "Web Development & Software Company",
    highlight: "for Canadian Businesses",
    lead:
      "Websites, online stores and custom software for small and growing businesses across Canada, from Toronto and Vancouver to Calgary and Halifax. Live in 24 to 48 hours.",
    intro: [
      "Canadian small businesses often get stuck between two options: build a website yourself on a DIY builder, or pay a large agency thousands of dollars and wait months. Neither is great when you just want a professional site that brings in customers.",
      "Zoxen Digital sits in the middle. We design and build fast, modern websites and practical business software for Canadian companies, handle the technical side for you, and keep everything visible in your own client portal. Prices are simple and paid once, and support continues after launch.",
    ],
    whyTitle: "Why Canadian businesses choose Zoxen Digital",
    why: [
      { title: "Simple pricing, no long contracts", text: "Websites start at $99 USD one-time, which works out to a small fraction of a typical agency quote. Software projects get a fixed price before we start." },
      { title: "Fast turnaround", text: "Standard websites are live in 24 to 48 hours, so you can start taking enquiries this week instead of next quarter." },
      { title: "One team for everything", text: "Design, development, SEO, Google and Meta ads and support all come from the same team, so nothing gets lost between vendors." },
      { title: "Available almost around the clock", text: "Our team is available nearly 24/7, so from Pacific to Atlantic time you get answers and updates when it suits your business." },
    ],
    localTitle: "Built for doing business in Canada",
    local: [
      { title: "Privacy-ready websites", text: "Canadian businesses collecting customer details need to handle them carefully. We set up clear privacy policies, consent for forms and secure hosting, in line with the expectations of Canada's privacy laws such as PIPEDA." },
      { title: "English and French options", text: "Serving customers in Quebec or across the country? We can build your website with an English and French version on request, so both audiences feel at home." },
      { title: "Local search in your city", text: "We structure your pages and business details so you can show up when people in your city search for your services, whether that is Toronto, Calgary or Ottawa." },
      { title: "Payments and bookings", text: "Online payments with Stripe, booking forms and automatic confirmations that work for Canadian customers." },
    ],
    regionsTitle: "Serving businesses across Canada",
    regions: ["Toronto", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Montreal", "Winnipeg", "Mississauga", "Halifax", "Victoria"],
    industries: ["Trades & contractors", "Real estate agents", "Dental & health clinics", "Restaurants & food", "Professional services", "Beauty & wellness", "Online stores", "Tech startups"],
    softwareIntro:
      "Need more than a website? We build custom tools for Canadian businesses: CRMs, booking and order systems, client portals and integrations with apps like QuickBooks, Shopify, Stripe and Google Workspace.",
    faq: [
      { q: "How much does a website cost for a small business in Canada?", a: "Zoxen Digital websites start at $99 USD one-time for a professional 5-page site with free hosting and a free AI chatbot. Larger sites start at $199 USD and e-commerce stores at $499 USD. Custom software is quoted per project." },
      { q: "Do you work with businesses anywhere in Canada?", a: "Yes. We work remotely with businesses in every province, including Ontario, British Columbia, Alberta and Quebec, and run the whole project through your client portal." },
      { q: "Can you build a bilingual English and French website?", a: "Yes, we can add a French version of your website on request. Let us know when you start your project and we will include it in the plan." },
      { q: "Do you build software as well as websites?", a: "Yes. We build CRMs, internal tools, customer portals, API integrations and business automations, with ongoing support and maintenance." },
      { q: "How long does it take to launch?", a: "Standard websites go live in 24 to 48 hours. Larger websites and software projects get a clear timeline before we begin." },
    ],
  },

  canadaFr: {
    lang: "fr",
    slug: "web-development-canada/fr",
    country: "Canada",
    short: "Canada",
    seoTitle: "Développement web et logiciel au Canada",
    description:
      "Développement web et logiciels sur mesure pour les PME canadiennes. Sites en ligne en 24 à 48 heures dès 99 $ US, plus CRM, intégrations, SEO et chatbots IA.",
    keywords: [
      "développement web Canada",
      "entreprise de développement web Canada",
      "conception de site web Québec",
      "développement logiciel sur mesure Canada",
      "site web pour petite entreprise Canada",
      "agence web Montréal",
      "création de site web abordable",
      "développeur web Québec",
    ],
    h1: "Développement web et logiciel",
    highlight: "pour les entreprises canadiennes",
    lead:
      "Sites web, boutiques en ligne et logiciels sur mesure pour les petites et moyennes entreprises partout au Canada, de Montréal à Vancouver. En ligne en 24 à 48 heures.",
    intro: [
      "Beaucoup de petites entreprises canadiennes se retrouvent devant deux choix : créer leur site elles-mêmes avec un outil en ligne, ou payer une grande agence des milliers de dollars et attendre des mois. Ni l'un ni l'autre n'est idéal quand on veut simplement un site professionnel qui attire des clients.",
      "Zoxen Digital offre une autre option. Nous concevons des sites web rapides et modernes ainsi que des logiciels pratiques pour les entreprises canadiennes. Nous nous occupons de toute la partie technique, et vous suivez chaque étape dans votre propre portail client. Les prix sont simples, payés une seule fois, et le soutien continue après la mise en ligne.",
    ],
    whyTitle: "Pourquoi les entreprises canadiennes choisissent Zoxen Digital",
    why: [
      { title: "Prix simples, sans long contrat", text: "Les sites web commencent à 99 $ US, payés une seule fois, soit une fraction du prix d'une agence traditionnelle. Les projets logiciels ont un prix fixe avant le début des travaux." },
      { title: "Livraison rapide", text: "Les sites web standards sont en ligne en 24 à 48 heures, pour recevoir des demandes dès cette semaine." },
      { title: "Une seule équipe pour tout", text: "Conception, développement, SEO, publicités Google et Meta et soutien : tout est géré par la même équipe, sans rien perdre entre plusieurs fournisseurs." },
      { title: "Disponibles presque en tout temps", text: "Notre équipe est disponible presque 24 h sur 24, 7 jours sur 7. Que vous soyez à l'heure du Pacifique ou de l'Atlantique, vous obtenez des réponses quand cela vous convient." },
    ],
    localTitle: "Conçu pour faire des affaires au Canada",
    local: [
      { title: "Sites respectueux de la vie privée", text: "Les entreprises canadiennes qui recueillent des renseignements personnels doivent les traiter avec soin. Nous mettons en place une politique de confidentialité claire, le consentement dans les formulaires et un hébergement sécurisé, conformément aux attentes des lois canadiennes sur la vie privée comme la LPRPDE." },
      { title: "Site en français et en anglais", text: "Vous servez des clients au Québec ou partout au pays ? Nous pouvons créer votre site web en français et en anglais, avec un sélecteur de langue, pour que chaque client se sente chez lui." },
      { title: "Visibilité locale dans votre ville", text: "Nous structurons vos pages et vos coordonnées pour que vous apparaissiez quand les gens de votre ville cherchent vos services, que ce soit à Montréal, Québec ou Ottawa." },
      { title: "Paiements et réservations", text: "Paiements en ligne avec Stripe, formulaires de réservation et confirmations automatiques adaptés à vos clients canadiens." },
    ],
    regionsTitle: "Au service des entreprises partout au Canada",
    regions: ["Montréal", "Québec", "Laval", "Gatineau", "Sherbrooke", "Ottawa", "Toronto", "Vancouver", "Calgary", "Halifax"],
    industries: ["Métiers et entrepreneurs", "Courtiers immobiliers", "Cliniques dentaires et santé", "Restaurants", "Services professionnels", "Beauté et bien-être", "Boutiques en ligne", "Startups techno"],
    softwareIntro:
      "Besoin de plus qu'un site web ? Nous créons des outils sur mesure pour les entreprises canadiennes : CRM, systèmes de réservation et de commandes, portails clients et intégrations avec des applications comme QuickBooks, Shopify, Stripe et Google Workspace.",
    faq: [
      { q: "Combien coûte un site web pour une petite entreprise au Canada ?", a: "Chez Zoxen Digital, un site professionnel de 5 pages commence à 99 $ US, payé une seule fois, avec hébergement gratuit et chatbot IA gratuit. Les sites plus complets commencent à 199 $ US et les boutiques en ligne à 499 $ US. Les logiciels sur mesure font l'objet d'une soumission." },
      { q: "Pouvez-vous créer un site web bilingue français et anglais ?", a: "Oui. Nous pouvons créer votre site en français et en anglais, avec un sélecteur de langue. Mentionnez-le au début de votre projet et nous l'inclurons dans le plan." },
      { q: "Travaillez-vous avec des entreprises partout au Canada ?", a: "Oui. Nous travaillons à distance avec des entreprises de toutes les provinces, dont le Québec, l'Ontario, la Colombie-Britannique et l'Alberta, et tout le projet se déroule dans votre portail client." },
      { q: "Créez-vous aussi des logiciels ?", a: "Oui. Nous créons des CRM, des outils internes, des portails clients, des intégrations API et des automatisations, avec soutien et maintenance continus." },
      { q: "Combien de temps faut-il pour la mise en ligne ?", a: "Les sites web standards sont en ligne en 24 à 48 heures. Les sites plus importants et les projets logiciels ont un échéancier clair avant le début des travaux." },
    ],
  },
};
