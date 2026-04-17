import { Suspense } from "react";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/hero/Hero";
import { readJSON } from "@/lib/db";
import type { SiteContent } from "@/lib/content-types";

const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials")
);
const OurWork = dynamic(() => import("@/components/sections/OurWork"));
const HowWeHelp = dynamic(() => import("@/components/sections/HowWeHelp"));
const WhoWePartnerWith = dynamic(
  () => import("@/components/sections/WhoWePartnerWith")
);
const ContactCTA = dynamic(() => import("@/components/sections/ContactCTA"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  const content = readJSON<SiteContent>("content.json");

  return (
    <>
      <Nav />
      <main>
        <Hero content={content} />
        <Suspense>
          <Testimonials />
        </Suspense>
        <Suspense>
          <OurWork />
        </Suspense>
        <Suspense>
          <HowWeHelp />
        </Suspense>
        <Suspense>
          <WhoWePartnerWith />
        </Suspense>
        <Suspense>
          <ContactCTA content={content} />
        </Suspense>
      </main>
      <Suspense>
        <Footer content={content} />
      </Suspense>
    </>
  );
}
