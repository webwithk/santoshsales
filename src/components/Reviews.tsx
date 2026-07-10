import { Quote, Star } from 'lucide-react';
import type { Review, SectionCopy } from '../types/portfolio';
import AnimatedSection from './AnimatedSection';
import SectionHeader from './SectionHeader';

interface ReviewsProps {
  reviews: Review[];
  section: SectionCopy;
}

export default function Reviews({ reviews, section }: ReviewsProps) {
  return (
    <AnimatedSection id="reviews" ariaLabelledby="reviews-heading" className="bg-[var(--background)] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader section={section} headingId="reviews-heading" />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure key={review.id} className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_22px_70px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_90px_rgba(15,23,42,0.12)] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-[var(--accent)]">
                  <Quote aria-hidden="true" size={21} />
                </span>
                <div className="flex text-amber-400" aria-label="Five-star testimonial placeholder">
                  <Star aria-hidden="true" size={17} fill="currentColor" />
                  <Star aria-hidden="true" size={17} fill="currentColor" />
                  <Star aria-hidden="true" size={17} fill="currentColor" />
                  <Star aria-hidden="true" size={17} fill="currentColor" />
                  <Star aria-hidden="true" size={17} fill="currentColor" />
                </div>
              </div>
              <blockquote className="mt-6 flex-1 text-base leading-8 text-[var(--text)]">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-7 border-t border-slate-200 pt-5">
                <p className="font-heading text-lg font-bold text-[var(--primary)]">{review.client_name}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--muted)]">{review.client_title}</p>
                <p className="mt-3 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">{review.outcome}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
