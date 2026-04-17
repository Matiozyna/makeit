export interface SiteContent {
  siteName: string;
  siteUrl: string;
  tagline: string;
  heroSubtitle: string;
  hero: {
    badge: string;
    headlineTop: string;
    headlineBottom: string;
    headlineAccent: string;
    ctaPrimary: string;
    ctaSecondary: string;
    rotatingPrefix: string;
    rotatingTargets: string[];
    rotatingSuffix: string;
    clients: string[];
  };
  footer: {
    description: string;
    copyright: string;
  };
  contactCta: {
    heading: string;
    description: string;
    emailButtonLabel: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    tiktok: string;
  };
  stats: { value: number; label: string; suffix: string }[];
  seo: {
    title: string;
    description: string;
    ogImage: string;
  };
  googleAnalyticsId: string;
}
