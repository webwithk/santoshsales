import { Linkedin, Mail, Twitter } from 'lucide-react';
import type { NavItem, PortfolioProfile } from '../types/portfolio';

interface FooterProps {
  navItems: NavItem[];
  profile: PortfolioProfile;
}

const socialIconByLabel = {
  LinkedIn: Linkedin,
  Email: Mail,
  X: Twitter
} as const;

export default function Footer({ navItems, profile }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--primary)] text-white" aria-labelledby="footer-heading">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.7fr]">
          <div>
            <h2 id="footer-heading" className="font-heading text-2xl font-bold">{profile.name}</h2>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">{profile.role}</p>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">{profile.footer_tagline}</p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-blue-200">Navigation</h3>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {navItems.map((item) => (
                <a key={item.id} href={item.href} className="text-sm font-semibold text-slate-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-blue-200">Social</h3>
            <div className="mt-5 flex gap-3">
              {profile.social_links.map((social) => {
                const Icon = socialIconByLabel[social.label as keyof typeof socialIconByLabel] ?? Mail;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-blue-100 transition hover:-translate-y-1 hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    <Icon aria-hidden="true" size={19} />
                  </a>
                );
              })}
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-400">Placeholder social links — replace with verified professional profiles before launch.</p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex sm:items-center sm:justify-between">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p className="mt-3 sm:mt-0">Built for strategic growth conversations.</p>
        </div>
      </div>
    </footer>
  );
}
