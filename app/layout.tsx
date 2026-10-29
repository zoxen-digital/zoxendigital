import type { Metadata, Viewport } from "next";
import { Sora, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import MetaPixel from "./components/MetaPixel";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/next";
import { AREA_SERVED, DEFAULT_DESCRIPTION, KEYWORDS, SERVICES, SITE_EMAIL, SITE_NAME, SITE_URL, jsonLd } from "@/lib/seo";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Zoxen Digital | Websites, Ads, SEO & AI for Businesses",
    template: "%s | Zoxen Digital",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Digital Marketing & Web Development",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["en_CA"],
    siteName: SITE_NAME,
    title: "Zoxen Digital | Websites, Ads, SEO & AI for Businesses",
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoxen Digital | Websites, Ads, SEO & AI for Businesses",
    description: DEFAULT_DESCRIPTION,
  },
  formatDetection: { telephone: false, email: false, address: false },
  verification: {
    google: "LBE4bBtqY_9TuEIH6HQp1G3iyfI2qA2BoQaILJWqusg",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
};

// Site-wide structured data: who we are and what we offer.
const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      image: `${SITE_URL}/opengraph-image`,
      email: SITE_EMAIL,
      description: DEFAULT_DESCRIPTION,
      priceRange: "$$",
      areaServed: AREA_SERVED,
      knowsAbout: ["Web Design", "Website Development", "SEO", "Meta Ads", "Google Ads", "AI Chatbots", "AI Automation", "Mobile App Development"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Zoxen Digital Services",
        itemListElement: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
      },
      contactPoint: { "@type": "ContactPoint", contactType: "sales", email: SITE_EMAIL, availableLanguage: ["English", "Urdu"] },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${hankenGrotesk.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationSchema)} />
        {children}
        <MetaPixel />
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
