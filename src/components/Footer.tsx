import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, Linkedin, Github, Activity } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { analytics } from '../utils/analytics';

interface FooterProps {
  onOpenAnalytics: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAnalytics }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    analytics.trackEvent('section_view', 'Scrolled back to top');
  };

  return (
    <footer id="site-footer" className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-100 dark:border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                {PERSONAL_INFO.city}, {PERSONAL_INFO.country}
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm">
              Minimalist personal website built with sub-millisecond standards, responsive typography, and privacy-first telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{PERSONAL_INFO.email}</span>
            </a>
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{PERSONAL_INFO.phoneFormatted}</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white flex items-center gap-1.5"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>{PERSONAL_INFO.linkedinHandle}</span>
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
          <div className="flex items-center gap-2">
            <span>Bangalore coordinates: 12.9716° N, 77.5946° E</span>
            <span>•</span>
            <button
              onClick={onOpenAnalytics}
              className="hover:text-neutral-900 dark:hover:text-white inline-flex items-center gap-1 underline"
            >
              <Activity className="w-3 h-3 text-emerald-500" />
              <span>Telemetry HUD</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="Return to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
