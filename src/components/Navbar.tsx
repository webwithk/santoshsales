import { useEffect, useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { NavItem, PortfolioProfile } from '../types/portfolio';

interface NavbarProps {
  navItems: NavItem[];
  profile: PortfolioProfile;
}

export default function Navbar({ navItems, profile }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0]?.href?.replace('#', '') ?? 'home');

  const initials = useMemo(
    () =>
      profile.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join(''),
    [profile.name]
  );

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace('#', '')).filter(Boolean);
    const onScroll = () => {
      const current = sectionIds.reduce((active, id) => {
        const element = document.getElementById(id);
        if (!element) return active;
        const top = element.getBoundingClientRect().top;
        return top <= 120 ? id : active;
      }, sectionIds[0] ?? 'home');
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [navItems]);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <a href="#home" className="group flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]" onClick={() => setIsOpen(false)}>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--primary)] font-heading text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-transform duration-300 group-hover:-translate-y-0.5">
            {initials}
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-base font-bold text-[var(--primary)]">{profile.name}</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{profile.role}</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const id = item.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                  isActive
                    ? 'bg-blue-50 text-[var(--accent)] shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-[var(--primary)]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <a
          href={profile.primary_cta_href}
          className="hidden rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] sm:inline-flex"
        >
          {profile.primary_cta_label}
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[var(--primary)] shadow-sm transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] lg:hidden"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`lg:hidden ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} transition-opacity duration-300`}
      >
        <div className="border-t border-slate-200 bg-white px-4 py-5 shadow-2xl sm:px-6">
          <div className="grid gap-2">
            {navItems.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-base font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                    isActive ? 'bg-blue-50 text-[var(--accent)]' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
          <a
            href={profile.primary_cta_href}
            onClick={() => setIsOpen(false)}
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
          >
            {profile.primary_cta_label}
          </a>
        </div>
      </div>
    </header>
  );
}
