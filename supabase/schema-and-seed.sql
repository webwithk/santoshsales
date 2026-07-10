-- Santosh Panwar portfolio Supabase schema and seed
-- Fresh-project setup: this script creates the required tables and resets only these app tables before inserting starter content.

create table if not exists public.portfolio_profile (
  id serial primary key,
  slug text not null,
  name text not null,
  role text not null,
  eyebrow text not null,
  hero_headline text not null,
  hero_value_prop text not null,
  primary_cta_label text not null,
  primary_cta_href text not null,
  secondary_cta_label text not null,
  secondary_cta_href text not null,
  image_url text not null,
  image_alt text not null,
  about_paragraphs jsonb not null,
  about_highlights jsonb not null,
  contact_info jsonb not null,
  footer_tagline text not null,
  social_links jsonb not null,
  seo_title text not null,
  seo_description text not null,
  seo_keywords text not null,
  updated_at timestamptz default now()
);

create table if not exists public.portfolio_nav_items (
  id serial primary key,
  label text not null,
  href text not null,
  sort_order integer not null
);

create table if not exists public.portfolio_section_copy (
  id serial primary key,
  section_key text not null,
  eyebrow text not null,
  title text not null,
  intro text not null,
  sort_order integer not null
);

create table if not exists public.portfolio_stats (
  id serial primary key,
  value text not null,
  label text not null,
  detail text not null,
  sort_order integer not null
);

create table if not exists public.portfolio_experience_items (
  id serial primary key,
  category text not null,
  title text not null,
  description text not null,
  sort_order integer not null
);

create table if not exists public.portfolio_timeline_entries (
  id serial primary key,
  year text not null,
  company_name text not null,
  position text not null,
  achievement text not null,
  sort_order integer not null
);

create table if not exists public.portfolio_reviews (
  id serial primary key,
  client_name text not null,
  client_title text not null,
  quote text not null,
  outcome text not null,
  sort_order integer not null
);

create table if not exists public.contact_messages (
  id serial primary key,
  name text not null,
  email text not null,
  company text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz default now()
);

truncate table
  public.contact_messages,
  public.portfolio_reviews,
  public.portfolio_timeline_entries,
  public.portfolio_experience_items,
  public.portfolio_stats,
  public.portfolio_section_copy,
  public.portfolio_nav_items,
  public.portfolio_profile
restart identity;

insert into public.portfolio_profile (
  slug,
  name,
  role,
  eyebrow,
  hero_headline,
  hero_value_prop,
  primary_cta_label,
  primary_cta_href,
  secondary_cta_label,
  secondary_cta_href,
  image_url,
  image_alt,
  about_paragraphs,
  about_highlights,
  contact_info,
  footer_tagline,
  social_links,
  seo_title,
  seo_description,
  seo_keywords
) values (
  'santosh-panwar',
  'Santosh Panwar',
  'Sales Consultant / Sales Executive',
  '17+ years of consultative sales leadership',
  'Driving Business Growth Through Strategic Sales Excellence',
  'Santosh Panwar helps organizations build trusted client relationships, improve conversion quality, and deliver measurable revenue outcomes through 17+ years of sales expertise, disciplined follow-through, and results-led consulting.',
  'Get in Touch',
  '#contact',
  'View Experience',
  '#experience',
  '/uploads/santosh-panwar-placeholder.svg',
  'Professional corporate portrait placeholder for Santosh Panwar; replace with a real headshot.',
  '["Santosh Panwar is a seasoned Sales Consultant and Sales Executive with more than 17 years of experience helping businesses convert opportunities into long-term commercial value. His approach combines strategic prospecting, consultative selling, and consistent relationship management to create outcomes that are measurable and sustainable.", "Known for building trust with decision-makers, Santosh focuses on understanding customer goals before recommending solutions. This customer-first mindset supports stronger client retention, healthier pipelines, repeat business, and partnerships that continue beyond a single transaction.", "Across diverse industries and market conditions, Santosh has supported revenue growth by aligning sales conversations with business priorities, maintaining clear communication, and following through with the discipline clients expect from a senior sales professional."]'::jsonb,
  '["Relationship-first selling that builds confidence with stakeholders and decision-makers.", "Consultative discovery, objection handling, and value-led solution positioning.", "Client retention and long-term partnership development focused on repeatable growth."]'::jsonb,
  '[{"label":"Email","value":"santosh.panwar@example.com","href":"mailto:santosh.panwar@example.com"}, {"label":"Phone","value":"+91 98765 43210","href":"tel:+919876543210"}, {"label":"Location","value":"Available for India-wide and remote consulting engagements"}]'::jsonb,
  'Strategic sales guidance for businesses that value trust, retention, and measurable revenue growth.',
  '[{"label":"LinkedIn","href":"https://www.linkedin.com/"}, {"label":"Email","href":"mailto:santosh.panwar@example.com"}, {"label":"X","href":"https://x.com/"}]'::jsonb,
  'Santosh Panwar | Sales Consultant & Sales Executive Portfolio',
  'Modern professional portfolio for Santosh Panwar, a Sales Consultant and Sales Executive with 17+ years of experience, 500+ clients served, and a 95% success rate.',
  'Santosh Panwar, Sales Consultant, Sales Executive, consultative selling, client retention, revenue growth, strategic sales, business development'
);

insert into public.portfolio_nav_items (label, href, sort_order) values
  ('Home', '#home', 1),
  ('About', '#about', 2),
  ('Experience', '#experience', 3),
  ('Journey', '#journey', 4),
  ('Reviews', '#reviews', 5),
  ('Contact', '#contact', 6);

insert into public.portfolio_section_copy (section_key, eyebrow, title, intro, sort_order) values
  ('about', 'About Santosh', 'Relationship-led sales expertise built for long-term business outcomes', 'A senior sales professional focused on trust, clarity, retention, and repeatable revenue growth across every stage of the client journey.', 1),
  ('stats', 'Measurable Impact', 'Performance indicators that reflect consistency, trust, and execution', 'Replace or expand these metrics with verified numbers as Santosh’s final career data is added.', 2),
  ('experience', 'Experience & Expertise', 'A practical sales skillset shaped by real client conversations', 'From prospecting and negotiation to account growth and retention, Santosh brings a complete view of the modern sales lifecycle.', 3),
  ('journey', 'Career Journey', 'A chronological timeline ready for verified career milestones', 'Use these structured placeholders to quickly replace year, company, position, and achievement details with Santosh’s actual career history.', 4),
  ('reviews', 'Client Reviews', 'What clients and stakeholders can say about working with Santosh', 'Realistic testimonial placeholders highlighting professionalism, trust, communication, and commercial impact.', 5),
  ('contact', 'Start a Conversation', 'Connect for sales consulting, business development, and client growth discussions', 'Use the form below to share your goals, challenges, or collaboration idea. The placeholders can be replaced with Santosh’s direct contact details.', 6);

insert into public.portfolio_stats (value, label, detail, sort_order) values
  ('17+', 'Years Experience', 'Deep sales and business development exposure across client acquisition, relationship management, and revenue expansion.', 1),
  ('500+', 'Clients Served', 'Hands-on experience supporting a broad client base with professional communication and solution-focused selling.', 2),
  ('95%', 'Success Rate', 'Placeholder performance metric representing consistent follow-through, trust building, and goal achievement.', 3),
  ('Multi-sector', 'Industries Served', 'A flexible consultative approach designed for diverse B2B and B2C sales environments.', 4);

insert into public.portfolio_experience_items (category, title, description, sort_order) values
  ('Skills', 'Consultative Selling', 'Guides prospects through thoughtful discovery, clear solution mapping, and value-based recommendations aligned to business outcomes.', 1),
  ('Skills', 'Relationship Building', 'Creates long-term trust through consistent follow-up, stakeholder alignment, and transparent communication throughout the sales cycle.', 2),
  ('Skills', 'Negotiation & Closing', 'Balances commercial discipline with customer needs to move opportunities forward and close with confidence.', 3),
  ('Achievements', '500+ Client Engagements', 'Served a broad client base while maintaining a professional, relationship-first approach to account growth and satisfaction.', 4),
  ('Achievements', 'Revenue Growth Enablement', 'Supported pipeline quality, upsell conversations, referrals, and repeat business through strategic sales execution.', 5),
  ('Achievements', 'High Client Retention Focus', 'Prioritized service continuity and long-term partnership value to strengthen post-sale relationships.', 6),
  ('Industries', 'B2B Services & Solutions', 'Experienced in translating complex service value into clear business benefits for decision-makers and buying committees.', 7),
  ('Industries', 'Retail, Distribution & Channel Sales', 'Understands relationship-led field sales, territory management, and channel coordination for repeatable growth.', 8),
  ('Industries', 'Corporate & SME Accounts', 'Comfortable working with both growing businesses and established enterprises that require dependable sales partnership.', 9),
  ('Expertise', 'Pipeline & Account Management', 'Maintains disciplined opportunity tracking, next-step planning, and client prioritization to reduce leakage and improve conversion quality.', 10),
  ('Expertise', 'Client Retention Strategy', 'Strengthens trust after the sale through proactive communication, expectation setting, and partnership reviews.', 11),
  ('Expertise', 'Business Development Planning', 'Builds practical outreach, referral, and market-development plans that support sustainable revenue generation.', 12);

insert into public.portfolio_timeline_entries (year, company_name, position, achievement, sort_order) values
  ('2007 – 2011', 'Company Name Placeholder', 'Sales Executive', 'Built a strong foundation in prospecting, client meetings, objection handling, and disciplined follow-up across an early client portfolio.', 1),
  ('2011 – 2015', 'Company Name Placeholder', 'Senior Sales Executive', 'Expanded responsibility across higher-value accounts, improved conversion consistency, and developed trusted relationships with repeat clients.', 2),
  ('2015 – 2019', 'Company Name Placeholder', 'Business Development Lead', 'Supported new market opportunities, referral-led growth, and structured pipeline management for revenue-focused teams.', 3),
  ('2019 – 2023', 'Company Name Placeholder', 'Sales Consultant', 'Advised clients with a consultative approach, aligning sales conversations to business objectives and long-term retention goals.', 4),
  ('2023 – Present', 'Company Name Placeholder', 'Sales Consultant / Sales Executive', 'Continues to help organizations improve client acquisition, retention, and measurable business growth through strategic sales excellence.', 5);

insert into public.portfolio_reviews (client_name, client_title, quote, outcome, sort_order) values
  ('Client Name Placeholder', 'Director, Growth-Focused Enterprise', 'Santosh brings clarity and confidence to every conversation. His ability to understand our requirements and recommend the right path made the sales process feel consultative rather than transactional.', 'Trusted communication and smoother decision-making', 1),
  ('Client Name Placeholder', 'Founder, SME Business', 'Working with Santosh was a professional experience from the first meeting. He followed through on every commitment, kept expectations clear, and helped us identify practical options for growth.', 'Improved trust and stronger partnership value', 2),
  ('Client Name Placeholder', 'Operations Head, Service Organization', 'Santosh combines market understanding with a relationship-first mindset. His responsiveness and business-focused approach created measurable impact for our team.', 'Better alignment between needs and solutions', 3);

insert into public.contact_messages (name, email, company, message, status) values
  ('Demo Inquiry', 'demo.inquiry@example.com', 'Placeholder Company', 'This seeded message verifies that the contact_messages table is connected and ready to store real portfolio inquiries from the website form.', 'demo');
