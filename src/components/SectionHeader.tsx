import type { SectionCopy } from '../types/portfolio';

interface SectionHeaderProps {
  section: SectionCopy;
  align?: 'left' | 'center';
  headingId?: string;
  className?: string;
}

export default function SectionHeader({ section, align = 'center', headingId, className = '' }: SectionHeaderProps) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-[var(--accent)]">{section.eyebrow}</p>
      <h2 id={headingId} className="font-heading text-3xl font-bold tracking-tight text-[var(--primary)] sm:text-4xl lg:text-5xl">
        {section.title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[var(--muted)] sm:text-lg">{section.intro}</p>
    </div>
  );
}
