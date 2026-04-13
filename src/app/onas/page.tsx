import type { Metadata } from "next";
import Nav from "@/components/Nav";
import HeroONas from "@/components/hero/HeroONas";
import TeamSection from "@/components/sections/TeamSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "O nas — Make it",
  description:
    "Jesteśmy Make it — agencja kreatywna z Krakowa łącząca design, development i content w jednym miejscu. Budujemy marki, które wygrywają w internecie.",
};

export default function ONasPage() {
  return (
    <>
      <Nav />
      <main>
        <HeroONas />
        <TeamSection />
      </main>
      <Footer />
    </>
  );
}
