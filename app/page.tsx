import type { Metadata } from "next";
import { DEFAULT_DESCRIPTION, pageMeta } from "@/lib/seo";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
// Who We Are section hidden for now; uncomment to bring it back.
// import WhoWeAre from "./components/WhoWeAre";
import ConnectedStack from "./components/ConnectedStack";
// Old Services section replaced by Products; uncomment to bring it back.
// import Services from "./components/Services";
import Products from "./components/Products";
// Our Work section hidden for now; uncomment to bring it back.
// import Portfolio from "./components/Portfolio";
import HomeProcess from "./components/HomeProcess";
import ClientPortal from "./components/ClientPortal";
import PortalJourney from "./components/PortalJourney";
import PortalCompare from "./components/PortalCompare";
// Automation section hidden for now; uncomment to bring it back.
// import Automation from "./components/Automation";
// Contact form replaced by the CTA bar + popup on the home page.
// import Contact from "./components/Contact";
import CtaBar from "./components/CtaBar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: { absolute: "Zoxen Digital | Websites, Ads, SEO & AI for Growing Businesses" },
  ...pageMeta({ path: "/", title: "Zoxen Digital | Websites, Ads, SEO & AI for Growing Businesses", description: DEFAULT_DESCRIPTION }),
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* <WhoWeAre /> */}
      <ConnectedStack />
      {/* <Services /> */}
      <Products />
      {/* <Portfolio /> */}
      <HomeProcess />
      <ClientPortal />
      <PortalJourney />
      <PortalCompare />
      {/* <Automation /> */}
      {/* <Contact /> */}
      <CtaBar />
      <Footer />
    </main>
  );
}
