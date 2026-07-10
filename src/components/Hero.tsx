import { ArrowRight, BarChart3, CheckCircle2, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { PortfolioProfile, PortfolioStat } from '../types/portfolio';

interface HeroProps {
  profile: PortfolioProfile;
  stats: PortfolioStat[];
}

export default function Hero({ profile, stats }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const featuredStats = stats.slice(0, 3);

  return (
    <section id="home" className="relative isolate overflow-hidden bg-[var(--background)] pt-28 sm:pt-32 lg:pt-36" aria-labelledby="hero-heading">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.16),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.06),transparent_42%)]" />
      <div className="absolute right-0 top-24 -z-10 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-slate-300/30 blur-3xl" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-bold text-[var(--secondary)] shadow-sm backdrop-blur">
            <ShieldCheck aria-hidden="true" size={18} className="text-[var(--accent)]" />
            {profile.eyebrow}
          </div>

          <h1 id="hero-heading" className="mt-7 font-heading text-4xl font-black tracking-tight text-[var(--primary)] sm:text-5xl lg:text-6xl xl:text-7xl">
            {profile.hero_headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
            {profile.hero_value_prop}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href={profile.primary_cta_href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-4 text-base font-bold text-white shadow-xl shadow-blue-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              {profile.primary_cta_label}
              <ArrowRight aria-hidden="true" size={19} />
            </a>
            <a
              href={profile.secondary_cta_href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-base font-bold text-[var(--primary)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:text-[var(--accent)] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            >
              {profile.secondary_cta_label}
              <BarChart3 aria-hidden="true" size={19} />
            </a>
          </div>

          <dl className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3" aria-label="Selected sales performance highlights">
            {featuredStats.map((stat) => (
              <div key={stat.id} className="rounded-3xl border border-white/80 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
                <dt className="text-sm font-semibold text-[var(--muted)]">{stat.label}</dt>
                <dd className="mt-2 font-heading text-3xl font-black text-[var(--primary)]">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-xl"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96, y: 28 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -left-5 top-8 z-10 hidden rounded-3xl bg-white p-4 shadow-2xl shadow-slate-900/10 sm:block">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-green-50 text-[var(--success)]">
                <CheckCircle2 aria-hidden="true" size={22} />
              </span>
              <div>
                <p className="text-sm font-bold text-[var(--primary)]">Trusted advisory style</p>
                <p className="text-xs text-[var(--muted)]">Placeholder: replace with verified badge</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.25rem] border border-white bg-white p-3 shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
            <img
              src={profile.image_url}
              alt={profile.image_alt}
              className="h-[520px] w-full rounded-[1.75rem] object-cover object-center"
            />
            <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-white/30 bg-[var(--primary)]/88 p-5 text-white shadow-2xl backdrop-blur-md">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">{profile.role}</p>
              <p className="mt-2 font-heading text-2xl font-bold">{profile.name}</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">Placeholder portrait area — replace this image with Santosh Panwar’s professional headshot.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
