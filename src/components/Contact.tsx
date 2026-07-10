import { FormEvent, useMemo, useState } from 'react';
import { Mail, MapPin, Phone, Send, ShieldCheck } from 'lucide-react';
import type { PortfolioProfile, SectionCopy } from '../types/portfolio';
import AnimatedSection from './AnimatedSection';
import SectionHeader from './SectionHeader';

interface ContactProps {
  profile: PortfolioProfile;
  section: SectionCopy;
}

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  name: '',
  email: '',
  company: '',
  message: ''
};

const iconByLabel = {
  Email: Mail,
  Phone: Phone,
  Location: MapPin
} as const;

function validate(values: FormState) {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.message.trim().length < 20) errors.message = 'Please share at least 20 characters about your requirement.';
  return errors;
}

export default function Contact({ profile, section }: ContactProps) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const isSubmitting = status === 'loading';
  const messageLength = useMemo(() => form.message.trim().length, [form.message]);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setStatusMessage('');

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      setStatusMessage('Please review the highlighted fields before sending your message.');
      return;
    }

    try {
      setStatus('loading');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const payload = await response.json();

      if (!response.ok) {
        if (payload.errors) setErrors(payload.errors);
        throw new Error(payload.error || 'Unable to send your message right now.');
      }

      setForm(emptyForm);
      setStatus('success');
      setStatusMessage(payload.message || 'Your message has been sent successfully.');
    } catch (error) {
      setStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Unable to send your message right now.');
    }
  };

  return (
    <AnimatedSection id="contact" ariaLabelledby="contact-heading" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader section={section} headingId="contact-heading" />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-[2rem] bg-[var(--primary)] p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,0.18)] sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-blue-100">
              <ShieldCheck aria-hidden="true" size={18} />
              {profile.role}
            </div>
            <h3 className="mt-7 font-heading text-3xl font-bold">{profile.name}</h3>
            <p className="mt-4 text-base leading-8 text-slate-300">{profile.footer_tagline}</p>

            <div className="mt-8 space-y-4">
              {profile.contact_info.map((item) => {
                const Icon = iconByLabel[item.label as keyof typeof iconByLabel] ?? Mail;
                const content = (
                  <span className="flex items-start gap-4 rounded-3xl bg-white/10 p-4 transition hover:bg-white/[0.14]">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-blue-100">
                      <Icon aria-hidden="true" size={20} />
                    </span>
                    <span>
                      <span className="block text-sm font-bold uppercase tracking-[0.18em] text-blue-100">{item.label}</span>
                      <span className="mt-1 block text-base font-semibold text-white">{item.value}</span>
                    </span>
                  </span>
                );

                return item.href ? (
                  <a key={item.label} href={item.href} className="block rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>
          </aside>

          <form onSubmit={handleSubmit} noValidate className="rounded-[2rem] border border-slate-200 bg-[var(--background)] p-6 shadow-[0_22px_70px_rgba(15,23,42,0.07)] sm:p-8 lg:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-bold text-[var(--primary)]">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-[var(--text)] shadow-sm outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-blue-100"
                />
                {errors.name && <p id="name-error" className="mt-2 text-sm font-semibold text-red-700">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-bold text-[var(--primary)]">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-[var(--text)] shadow-sm outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-blue-100"
                />
                {errors.email && <p id="email-error" className="mt-2 text-sm font-semibold text-red-700">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="company" className="text-sm font-bold text-[var(--primary)]">Company <span className="font-semibold text-[var(--muted)]">(optional)</span></label>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={(event) => updateField('company', event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-[var(--text)] shadow-sm outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="message" className="text-sm font-bold text-[var(--primary)]">Message</label>
                <span className={`text-xs font-bold ${messageLength >= 20 ? 'text-[var(--success)]' : 'text-[var(--muted)]'}`}>{messageLength}/20 minimum</span>
              </div>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={form.message}
                onChange={(event) => updateField('message', event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className="mt-2 w-full resize-y rounded-2xl border border-slate-300 bg-white px-4 py-3 text-[var(--text)] shadow-sm outline-none transition focus:border-[var(--accent)] focus:ring-4 focus:ring-blue-100"
              />
              {errors.message && <p id="message-error" className="mt-2 text-sm font-semibold text-red-700">{errors.message}</p>}
            </div>

            {statusMessage && (
              <div
                role="status"
                className={`mt-6 rounded-2xl border px-4 py-3 text-sm font-semibold ${
                  status === 'success'
                    ? 'border-green-200 bg-green-50 text-green-800'
                    : 'border-red-200 bg-red-50 text-red-800'
                }`}
              >
                {statusMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-4 text-base font-bold text-white shadow-xl shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <Send aria-hidden="true" size={18} />
            </button>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
}
