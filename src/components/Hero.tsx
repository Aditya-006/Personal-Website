import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, ArrowDown, Copy, Check, Terminal, ExternalLink, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { analytics } from '../utils/analytics';

export const Hero: React.FC = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    analytics.trackEvent('copy_contact', `Copied ${type} to clipboard`, { value: text });
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Introduction and Summary"
      className="pt-28 sm:pt-36 pb-16 sm:pb-24 border-b border-neutral-200/80 dark:border-neutral-800/80 relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{PERSONAL_INFO.status}</span>
        </div>

        {/* Display Typography */}
        <div className="space-y-4">
          <h1
            id="hero-title"
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 leading-[1.12]"
          >
            Aditya Santhosh
          </h1>

          <p
            id="hero-role"
            className="text-lg sm:text-2xl font-medium text-neutral-600 dark:text-neutral-300 tracking-tight"
          >
            {PERSONAL_INFO.title}
          </p>

          <p
            id="hero-bio"
            className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed pt-2"
          >
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Direct Contact Bar - Quick Interactive Pills */}
        <div
          id="contact-quick-pills"
          className="mt-8 pt-6 border-t border-neutral-200/70 dark:border-neutral-800/70 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {/* Email */}
          <div className="group flex items-center justify-between p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Mail className="w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0" />
              <div className="truncate">
                <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Email</div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:underline truncate block"
                  title={PERSONAL_INFO.email}
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
              title="Copy email address"
              aria-label="Copy email address"
            >
              {copiedItem === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Phone */}
          <div className="group flex items-center justify-between p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Phone className="w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0" />
              <div className="truncate">
                <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Phone</div>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-xs font-medium font-mono text-neutral-800 dark:text-neutral-200 hover:underline truncate block"
                  title={PERSONAL_INFO.phoneFormatted}
                >
                  {PERSONAL_INFO.phoneFormatted}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
              className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
              title="Copy phone number"
              aria-label="Copy phone number"
            >
              {copiedItem === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Location */}
          <div className="flex items-center p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <MapPin className="w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0" />
              <div>
                <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Location</div>
                <div className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                  {PERSONAL_INFO.address}
                </div>
              </div>
            </div>
          </div>

          {/* LinkedIn */}
          <a
            id="hero-linkedin-link"
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.trackEvent('contact_action', 'Clicked LinkedIn Profile Link')}
            className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all text-neutral-800 dark:text-neutral-200 group"
          >
            <div className="flex items-center gap-2.5">
              <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <div>
                <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Network</div>
                <div className="text-xs font-medium group-hover:underline">
                  {PERSONAL_INFO.linkedinHandle}
                </div>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
          </a>
        </div>

        {/* Action Buttons & Quick Nav */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            id="hero-btn-portfolio"
            onClick={() => {
              analytics.trackEvent('section_view', 'Jump to Portfolio from Hero');
              handleScrollTo('#portfolio');
            }}
            className="px-5 py-2.5 rounded-lg bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-xs flex items-center gap-2"
          >
            <span>Explore Portfolio</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            id="hero-btn-blog"
            onClick={() => {
              analytics.trackEvent('section_view', 'Jump to Blog from Hero');
              handleScrollTo('#blog');
            }}
            className="px-5 py-2.5 rounded-lg bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-sm font-medium border border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 dark:hover:border-neutral-500 transition-all"
          >
            Read Articles
          </button>

          <button
            id="hero-btn-contact"
            onClick={() => {
              analytics.trackEvent('section_view', 'Jump to Contact from Hero');
              handleScrollTo('#contact');
            }}
            className="px-5 py-2.5 rounded-lg bg-transparent hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 text-sm font-medium transition-all"
          >
            Get In Touch
          </button>
        </div>

        {/* Minimalist Engineering Competencies List */}
        <div className="mt-12 pt-6 border-t border-neutral-200/70 dark:border-neutral-800/70">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
            Core Technical Focus Areas
          </div>
          <div className="flex flex-wrap gap-2">
            {PERSONAL_INFO.coreCompetencies.map((comp) => (
              <span
                key={comp}
                className="px-3 py-1 rounded-md text-xs font-mono bg-neutral-100 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-800/60"
              >
                {comp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
