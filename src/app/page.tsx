import Nav from "@/components/Nav";
import Hero from "@/components/hero/Hero";
import Testimonials from "@/components/sections/Testimonials";
import OurWork from "@/components/sections/OurWork";
import HowWeHelp from "@/components/sections/HowWeHelp";
import WhoWePartnerWith from "@/components/sections/WhoWePartnerWith";
import ContactCTA from "@/components/sections/ContactCTA";
import WhatPeopleSay from "@/components/sections/WhatPeopleSay";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Testimonials />
        <OurWork />
        <HowWeHelp />
        <WhoWePartnerWith />
        <ContactCTA />
        <WhatPeopleSay />
      </main>
      <Footer />
    </>
  );
}
