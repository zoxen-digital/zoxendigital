import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhoWeAre from "./components/WhoWeAre";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import HomeProcess from "./components/HomeProcess";
import Automation from "./components/Automation";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhoWeAre />
      <Services />
      <Portfolio />
      <HomeProcess />
      <Automation />
      <Contact />
      <Footer />
    </main>
  );
}
