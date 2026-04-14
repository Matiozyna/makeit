import type { Metadata } from "next";
import Nav from "@/components/Nav";
import HeroFoto from "@/components/hero/HeroFoto";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fotografia & Wideo — Make it",
  description:
    "Profesjonalne sesje produktowe, zdjęcia wizerunkowe i filmy reklamowe, które przykuwają uwagę i budują markę.",
};

export default function FotoWideoPage() {
  return (
    <>
      <Nav />
      <main>
        <HeroFoto />
      </main>
      <Footer />
    </>
  );
}
