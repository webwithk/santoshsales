import { Award, BriefcaseBusiness, Building2, CheckCircle2, LineChart, Target } from 'lucide-react';
import type { ExperienceItem, SectionCopy } from '../types/portfolio';
import AnimatedSection from './AnimatedSection';
import SectionHeader from './SectionHeader';

interface ExperienceProps {
  items: ExperienceItem[];
  section: SectionCopy;
}

const iconByCategory = {
  Skills: Target,
  Achievements: Award,
  Industries: Building2,
  Expertise: LineChart
} as const;

export default function Experience({ items, section }: ExperienceProps) {
  const categories = Array.from(new Set(items.map((item) => item.category)));

  return (
    <AnimatedSection id="experience" ariaLabelledby="experience-heading" className="bg-[var(--background)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader section={section} headingId="experience-heading" />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {categories.map((category) => {
            const Icon = iconByCategory[category as keyof typeof iconByCategory] ?? BriefcaseBusiness;
            const categoryItems = items.filter((item) => item.category === category);
            return (
              <article key={category} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.12)] sm:p-8">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-[var(--accent)]">
                    <Icon aria-hidden="true" size={26} />
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-[var(--primary)]">{category}</h3>
                </div>

                <div className="mt-7 space-y-5">
                  {categoryItems.map((item) => (
                    <div key={item.id} className="flex gap-4 rounded-3xl bg-slate-50 p-4">
                      <CheckCircle2 aria-hidden="true" className="mt-1 shrink-0 text-[var(--success)]" size={20} />
                      <div>
                        <h4 className="font-bold text-[var(--primary)]">{item.title}</h4>
                        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
