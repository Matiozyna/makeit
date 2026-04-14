import type { Metadata } from "next";
import Nav from "@/components/Nav";
import HeroSocialMedia from "@/components/hero/HeroSocialMedia";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Social Media — Make it",
  description:
    "Tworzymy content, który buduje markę i generuje mierzalne wyniki sprzedaży. Strategia, grafiki, Reelsy — wszystko w jednym miejscu.",
};

export default function SocialMediaPage() {
  return (
    <>
      <Nav />
      <main>
        <HeroSocialMedia />
      </main>
      <Footer />
    </>
  );
}
