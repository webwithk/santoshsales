import type { PortfolioStat, SectionCopy } from '../types/portfolio';
import AnimatedSection from './AnimatedSection';
import SectionHeader from './SectionHeader';

interface StatsProps {
  stats: PortfolioStat[];
  section: SectionCopy;
}

export default function Stats({ stats, section }: StatsProps) {
  return (
    <AnimatedSection ariaLabelledby="stats-heading" className="relative overflow-hidden bg-[var(--primary)] py-20 text-white sm:py-24 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.38),transparent_34%),radial-gradient(circle_at_80%_75%,rgba(30,58,95,0.5),transparent_40%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader section={section} headingId="stats-heading" className="[&_*]:text-white [&_p:first-child]:text-blue-200 [&_p:last-child]:text-slate-300" />

        <dl className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-label="Portfolio performance statistics">
          {stats.map((stat) => (
            <div key={stat.id} className="group rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.14] sm:p-7">
              <dt className="text-sm font-bold uppercase tracking-[0.18em] text-blue-100">{stat.label}</dt>
              <dd className="mt-4 font-heading text-4xl font-black tracking-tight text-white sm:text-5xl">{stat.value}</dd>
              <p className="mt-4 text-sm leading-6 text-slate-300">{stat.detail}</p>
            </div>
          ))}
        </dl>
      </div>
    </AnimatedSection>
  );
}
