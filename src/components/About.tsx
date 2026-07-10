import { Handshake, TrendingUp, UsersRound } from 'lucide-react';
import type { PortfolioProfile, SectionCopy } from '../types/portfolio';
import AnimatedSection from './AnimatedSection';
import SectionHeader from './SectionHeader';

interface AboutProps {
  profile: PortfolioProfile;
  section: SectionCopy;
}

const highlightIcons = [Handshake, TrendingUp, UsersRound];

export default function About({ profile, section }: AboutProps) {
  return (
    <AnimatedSection id="about" ariaLabelledby="about-heading" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeader section={section} align="left" headingId="about-heading" />

          <div className="rounded-[2rem] border border-slate-200 bg-[var(--background)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
            <div className="space-y-5 text-base leading-8 text-[var(--text)] sm:text-lg">
              {profile.about_paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {profile.about_highlights.map((highlight, index) => {
                const Icon = highlightIcons[index % highlightIcons.length];
                return (
                  <div key={highlight} className="rounded-3xl border border-white bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-[var(--accent)]">
                      <Icon aria-hidden="true" size={22} />
                    </span>
                    <p className="mt-4 text-sm font-bold leading-6 text-[var(--primary)]">{highlight}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
