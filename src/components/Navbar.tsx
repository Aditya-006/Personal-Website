import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Activity, Globe, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { analytics } from '../utils/analytics';
import { WebVitals } from '../types';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAnalytics: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  onOpenAnalytics
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [blrTime, setBlrTime] = useState('');
  const [vitals, setVitals] = useState<WebVitals>(analytics.getVitals());

  useEffect(() => {
    const unsubVitals = analytics.subscribeVitals(setVitals);

    // Update Bangalore Time
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        }).format(new Date());
        setBlrTime(timeStr);
      } catch {
        setBlrTime(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      unsubVitals();
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { label: 'Work', href: '#portfolio' },
    { label: 'Writing', href: '#blog' },
    { label: 'SEO & Delivery', href: '#delivery' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-neutral-50/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Bangalore Time Indicator */}
        <a
          id="brand-logo-link"
          href="#hero"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-md py-1"
        >
          <div className="w-8 h-8 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center font-mono text-sm font-semibold tracking-tight transition-transform group-hover:scale-105">
            AS
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
              {PERSONAL_INFO.name}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bangalore</span>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <span>{blrTime || 'IST'}</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" aria-label="Main Navigation" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              id={`nav-link-${link.label.toLowerCase()}`}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="px-3.5 py-1.5 text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors rounded-md hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Telemetry Badge, Dark Mode, Get In Touch */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Performance / Analytics Button */}
          <button
            id="analytics-trigger-button"
            onClick={() => {
              analytics.trackEvent('section_view', 'Opened Real-time Telemetry HUD');
              onOpenAnalytics();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            title="View Real-Time Performance & Visitor Telemetry"
            aria-label="View Site Performance and Visitor Telemetry"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            <span className="hidden sm:inline">TTFB</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{vitals.ttfb}ms</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            id="theme-toggle-button"
            onClick={onToggleDarkMode}
            className="p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-700" />
            )}
          </button>

          {/* Quick Contact CTA (Desktop) */}
          <a
            id="nav-cta-contact"
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 rounded-md hover:opacity-90 transition-opacity"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-menu-toggle-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 px-4 pt-2 pb-6 space-y-2 shadow-lg transition-all animate-in fade-in slide-in-from-top-2"
        >
          <div className="py-2 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
            <span className="font-mono">Location: Bangalore, India</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-medium">99.4% Edge Cache</span>
          </div>

          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                id={`mobile-nav-link-${link.label.toLowerCase()}`}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2.5 rounded-md text-base font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              id="mobile-nav-link-phone"
              href={`tel:${PERSONAL_INFO.phone}`}
              className="px-3 py-2.5 rounded-md text-sm font-mono text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors flex items-center justify-between"
            >
              <span>Direct: {PERSONAL_INFO.phoneFormatted}</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-400" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
