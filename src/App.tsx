import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import About from './components/About';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Reviews from './components/Reviews';
import Stats from './components/Stats';
import Timeline from './components/Timeline';
import type { PortfolioData, SectionCopy } from './types/portfolio';

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-24">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-xl">
        <Loader2 className="mx-auto h-10 w-10 animate-spin text-[var(--accent)]" aria-hidden="true" />
        <p className="mt-5 font-heading text-2xl font-bold text-[var(--primary)]">Loading Santosh Panwar’s portfolio</p>
        <p className="mt-2 text-[var(--muted)]">Fetching portfolio content, metrics, and testimonials from the database.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3" aria-hidden="true">
          <div className="h-28 animate-pulse rounded-3xl bg-slate-100" />
          <div className="h-28 animate-pulse rounded-3xl bg-slate-100" />
          <div className="h-28 animate-pulse rounded-3xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

function ErrorScreen({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="grid min-h-screen place-items-center bg-[var(--background)] px-4 py-16">
      <div className="max-w-xl rounded-[2rem] border border-red-200 bg-white p-8 text-center shadow-xl">
        <AlertCircle className="mx-auto h-12 w-12 text-red-600" aria-hidden="true" />
        <h1 className="mt-5 font-heading text-3xl font-bold text-[var(--primary)]">Portfolio content could not load</h1>
        <p className="mt-4 text-[var(--muted)]">{message}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
        >
          <RefreshCw aria-hidden="true" size={18} />
          Retry
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPortfolio = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/portfolio');
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'The portfolio API returned an error.');
      }
      setData(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load portfolio content.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPortfolio();
  }, [fetchPortfolio]);

  useEffect(() => {
    if (!data?.profile) return;
    document.title = data.profile.seo_title;

    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('description', data.profile.seo_description);
    updateMeta('keywords', data.profile.seo_keywords);
  }, [data]);

  const sectionsByKey = useMemo(() => {
    const map = new Map<string, SectionCopy>();
    data?.sections.forEach((section) => map.set(section.section_key, section));
    return map;
  }, [data]);

  if (loading) return <LoadingScreen />;
  if (error || !data) return <ErrorScreen message={error || 'No portfolio data was returned.'} onRetry={fetchPortfolio} />;

  const requiredSections = ['about', 'stats', 'experience', 'journey', 'reviews', 'contact'];
  const missingSection = requiredSections.find((key) => !sectionsByKey.get(key));
  if (missingSection) {
    return <ErrorScreen message={`The ${missingSection} section is missing from the database.`} onRetry={fetchPortfolio} />;
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
      <a href="#home" className="skip-link">Skip to main content</a>
      <Navbar navItems={data.navItems} profile={data.profile} />
      <main>
        <Hero profile={data.profile} stats={data.stats} />
        <About profile={data.profile} section={sectionsByKey.get('about')!} />
        <Stats stats={data.stats} section={sectionsByKey.get('stats')!} />
        <Experience items={data.experience} section={sectionsByKey.get('experience')!} />
        <Timeline entries={data.timeline} section={sectionsByKey.get('journey')!} />
        <Reviews reviews={data.reviews} section={sectionsByKey.get('reviews')!} />
        <Contact profile={data.profile} section={sectionsByKey.get('contact')!} />
      </main>
      <Footer navItems={data.navItems} profile={data.profile} />
    </div>
  );
}
