import { CalendarDays } from 'lucide-react';
import type { SectionCopy, TimelineEntry } from '../types/portfolio';
import AnimatedSection from './AnimatedSection';
import SectionHeader from './SectionHeader';

interface TimelineProps {
  entries: TimelineEntry[];
  section: SectionCopy;
}

export default function Timeline({ entries, section }: TimelineProps) {
  return (
    <AnimatedSection id="journey" ariaLabelledby="journey-heading" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader section={section} headingId="journey-heading" />

        <div className="relative mt-14">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-blue-200 via-slate-200 to-blue-200 md:block" aria-hidden="true" />
          <ol className="space-y-6">
            {entries.map((entry, index) => (
              <li key={entry.id} className="relative md:pl-20">
                <span className="absolute left-0 top-6 hidden h-12 w-12 place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-[var(--accent)] shadow-sm md:grid" aria-hidden="true">
                  <CalendarDays size={21} />
                </span>
                <article className="grid gap-5 rounded-[2rem] border border-slate-200 bg-[var(--background)] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:grid-cols-[180px_1fr] sm:p-8">
                  <div>
                    <p className="font-heading text-3xl font-black text-[var(--accent)]">{entry.year}</p>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Milestone {index + 1}</p>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-[var(--primary)]">{entry.position}</h3>
                    <p className="mt-1 text-base font-semibold text-[var(--secondary)]">{entry.company_name}</p>
                    <p className="mt-4 text-base leading-7 text-[var(--muted)]">{entry.achievement}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </AnimatedSection>
  );
}
