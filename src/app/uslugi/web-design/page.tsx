import type { Metadata } from "next";
import Nav from "@/components/Nav";
import HeroWebDesign from "@/components/hero/HeroWebDesign";
import WebDesignStats from "@/components/sections/WebDesignStats";
import WebDesignBento from "@/components/sections/WebDesignBento";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Web Design — Make it",
  description:
    "Projektujemy i budujemy strony internetowe, które łączą estetykę z funkcjonalnością. Od designu w Figmie po deployment — w jednym miejscu.",
};

export default function WebDesignPage() {
  return (
    <>
      <Nav />
      <main>
        <HeroWebDesign />
        <WebDesignStats />
        <WebDesignBento />
      </main>
      <Footer />
    </>
  );
}
