import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services | Zoxen Digital",
  description: "Websites, software, mobile apps, AI agents, automation and support. One accountable team from the first call to a live, growing business.",
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <ServicesContent />
      <Footer />
    </main>
  );
}
