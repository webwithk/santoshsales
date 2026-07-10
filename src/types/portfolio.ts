export interface NavItem {
  id: number;
  label: string;
  href: string;
  sort_order: number;
}

export interface SectionCopy {
  id: number;
  section_key: string;
  eyebrow: string;
  title: string;
  intro: string;
  sort_order: number;
}

export interface PortfolioProfile {
  id: number;
  slug: string;
  name: string;
  role: string;
  eyebrow: string;
  hero_headline: string;
  hero_value_prop: string;
  primary_cta_label: string;
  primary_cta_href: string;
  secondary_cta_label: string;
  secondary_cta_href: string;
  image_url: string;
  image_alt: string;
  about_paragraphs: string[];
  about_highlights: string[];
  contact_info: Array<{ label: string; value: string; href?: string }>;
  footer_tagline: string;
  social_links: Array<{ label: string; href: string }>;
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  updated_at: string;
}

export interface PortfolioStat {
  id: number;
  value: string;
  label: string;
  detail: string;
  sort_order: number;
}

export interface ExperienceItem {
  id: number;
  category: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface TimelineEntry {
  id: number;
  year: string;
  company_name: string;
  position: string;
  achievement: string;
  sort_order: number;
}

export interface Review {
  id: number;
  client_name: string;
  client_title: string;
  quote: string;
  outcome: string;
  sort_order: number;
}

export interface PortfolioData {
  profile: PortfolioProfile;
  navItems: NavItem[];
  sections: SectionCopy[];
  stats: PortfolioStat[];
  experience: ExperienceItem[];
  timeline: TimelineEntry[];
  reviews: Review[];
}
