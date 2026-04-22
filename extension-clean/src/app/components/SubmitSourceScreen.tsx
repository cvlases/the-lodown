// SubmitSourceScreen.tsx — standalone full-page form for outlet submission
//
// Rendered without the main Masthead (see App.tsx).
// Submissions go into the `source_requests` table in Supabase.
// The team reviews and approves manually before a source appears on the site.

import { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Props { onBack: () => void; }

export default function SubmitSourceScreen({ onBack }: Props) {
  const [form, setForm] = useState({
    outlet_name: '',
    outlet_url: '',
    contact_email: '',
    city: '',
    state: '',
    description: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.outlet_name || !form.outlet_url || !form.contact_email) {
      setErrorMsg('Please fill in outlet name, URL, and contact email.');
      return;
    }
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase.from('source_requests').insert({
      outlet_name:   form.outlet_name,
      outlet_url:    form.outlet_url,
      contact_email: form.contact_email,
      city:          form.city || null,
      state:         form.state || null,
      description:   form.description || null,
    });

    if (error) {
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    } else {
      setStatus('success');
    }
  };

  return (
    <div className="min-h-screen bg-[#e5d8c8]">

      {/* ── Standalone masthead ───────────────────────────────────────── */}
      <div className="bg-[#e5d8c8]">
        <div className="h-2 border-t-4 border-b-4 border-[#3e3232] mx-8 mt-4" />
        <div className="relative text-center py-5">
          <div className="absolute left-8 top-1/2 -translate-y-1/2">
            <button
              onClick={onBack}
              className="font-['Didot:Regular',sans-serif] text-[15px] lg:text-[18px] text-[#3e3232] underline hover:no-underline"
            >
              ← Back to The LoDown
            </button>
          </div>
          <button
            onClick={onBack}
            className="font-['Heading_Now_Trial:16_Bold',sans-serif] text-[#3e3232] text-[48px] sm:text-[64px] lg:text-[80px] tracking-[6px] uppercase leading-[1] hover:opacity-70 transition-opacity"
          >
            The LoDown
          </button>
        </div>
        <div className="h-2 border-t-4 border-b-4 border-[#3e3232] mx-8" />
      </div>

      {/* ── Page content ─────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-6 py-12 lg:px-8 lg:py-16">

        {/* Page header */}
        <div className="mb-10">
          <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[11px] tracking-[3px] text-[#3e3232] uppercase opacity-60 mb-3">
            For outlets
          </p>
          <h2 className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[40px] lg:text-[56px] text-[#3e3232] tracking-[4px] uppercase leading-none mb-4">
            Submit Your<br />Outlet
          </h2>
          <div className="h-px border-t-4 border-[#3e3232] mb-6" />
          <p className="font-['Didot:Italic',sans-serif] italic text-[17px] text-[#3e3232] leading-relaxed opacity-80">
            The LoDown curates a directory of independent and local news sources covering Pittsburgh and surrounding areas. We review every submission and reach out within two weeks.
          </p>
        </div>

        {status === 'success' ? (
          <div className="border-4 border-[#3e3232] p-10 text-center">
            <p className="font-['Heading_Now_Trial:47_Extrabold',sans-serif] text-[28px] tracking-[3px] text-[#3e3232] uppercase mb-4">
              Request Received
            </p>
            <div className="h-px border-t-2 border-dashed border-[#3e3232] mb-6" />
            <p className="font-['Didot:Italic',sans-serif] italic text-[16px] text-[#3e3232] opacity-80 mb-8">
              Thanks for reaching out. We'll review your submission and be in touch at{' '}
              <span className="not-italic font-semibold">{form.contact_email}</span>.
            </p>
            <button
              onClick={onBack}
              className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[15px] tracking-[2px] text-[#3e3232] uppercase underline hover:no-underline"
            >
              ← Return to The LoDown
            </button>
          </div>
        ) : (
          <div className="border-4 border-[#3e3232]">

            {/* Form header bar */}
            <div className="bg-[#3e3232] px-6 py-4">
              <p className="font-['Heading_Now_Trial:25_Medium',sans-serif] text-[12px] tracking-[3px] text-[#e5d8c8] uppercase">
                Submission Form — Fields marked * are required
              </p>
            </div>

            <div className="p-6 lg:p-8 space-y-6">

              <Field label="Outlet Name *">
                <input
                  type="text"
                  value={form.outlet_name}
                  onChange={e => set('outlet_name', e.target.value)}
                  placeholder="e.g. Pittsburgh Current"
                  className={inputClass}
                />
              </Field>

              <Field label="Outlet URL *">
                <input
                  type="url"
                  value={form.outlet_url}
                  onChange={e => set('outlet_url', e.target.value)}
                  placeholder="https://youroutlet.com"
                  className={inputClass}
                />
              </Field>

              <Field label="Contact Email *">
                <input
                  type="email"
                  value={form.contact_email}
                  onChange={e => set('contact_email', e.target.value)}
                  placeholder="editor@youroutlet.com"
                  className={inputClass}
                />
              </Field>

              <div className="flex gap-4">
                <Field label="City" className="flex-1">
                  <input
                    type="text"
                    value={form.city}
                    onChange={e => set('city', e.target.value)}
                    placeholder="Pittsburgh"
                    className={inputClass}
                  />
                </Field>
                <Field label="State" className="w-[100px]">
                  <input
                    type="text"
                    value={form.state}
                    onChange={e => set('state', e.target.value)}
                    placeholder="PA"
                    maxLength={2}
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Tell us about your outlet">
                <textarea
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  placeholder="What do you cover? Who is your audience? How long have you been publishing?"
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {errorMsg && (
                <p className="font-['Didot:Italic',sans-serif] italic text-[14px] text-[#3e3232] opacity-80">
                  {errorMsg}
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                className="w-full bg-[#3e3232] text-[#e5d8c8] py-4 font-['Heading_Now_Trial:25_Medium',sans-serif] text-[16px] tracking-[2.5px] uppercase hover:bg-[#2a1f1f] transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Submitting...' : 'Submit for Review'}
              </button>

            </div>
          </div>
        )}

        {/* Footer note */}
        <p className="mt-8 font-['Didot:Italic',sans-serif] italic text-[13px] text-[#3e3232] opacity-50 text-center">
          The LoDown is a curated directory. Submission does not guarantee inclusion.
        </p>

      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const inputClass = "w-full border-2 border-[#3e3232] bg-transparent px-3 py-2.5 font-['Didot:Regular',sans-serif] text-[15px] text-[#3e3232] focus:outline-none focus:ring-2 focus:ring-[#3e3232] placeholder:text-[#3e3232]/35";

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block font-['Heading_Now_Trial:56_Bold',sans-serif] text-[11px] tracking-[2px] text-[#3e3232] uppercase mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
