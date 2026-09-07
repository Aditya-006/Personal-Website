import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Blog } from './components/Blog';
import { PerformanceDeliverySystem } from './components/PerformanceDeliverySystem';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AnalyticsModal } from './components/AnalyticsModal';
import { analytics } from './utils/analytics';
import { Activity, ShieldCheck } from 'lucide-react';
import { WebVitals } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('aditya-portfolio-theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [analyticsOpen, setAnalyticsOpen] = useState<boolean>(false);
  const [vitals, setVitals] = useState<WebVitals>(analytics.getVitals());

  useEffect(() => {
    const unsub = analytics.subscribeVitals(setVitals);

    // Synchronize HTML element class
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('aditya-portfolio-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('aditya-portfolio-theme', 'light');
    }
    analytics.setTheme(darkMode ? 'dark' : 'light');

    // Global keyboard listener for fast telemetry inspect (Key: Shift + A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === 'a') {
        setAnalyticsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      unsub();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-neutral-100 dark:selection:text-neutral-900 font-sans transition-colors duration-200">
      {/* Top Fixed Header */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenAnalytics={() => setAnalyticsOpen(true)}
      />

      {/* Main Semantic Content */}
      <main id="main-content" tabIndex={-1}>
        {/* Editorial Introduction */}
        <Hero />

        {/* Selected Work / Portfolio Section */}
        <Portfolio />

        {/* Technical Blog / Engineering Essays */}
        <Blog />

        {/* High Performance Content Delivery & SEO Inspector */}
        <PerformanceDeliverySystem />

        {/* Contact Form & Direct Communication Channels */}
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer onOpenAnalytics={() => setAnalyticsOpen(true)} />

      {/* Analytics & Performance Telemetry Drawer */}
      <AnalyticsModal isOpen={analyticsOpen} onClose={() => setAnalyticsOpen(false)} />

      {/* Floating Bottom Telemetry Pill */}
      <aside
        aria-label="Floating Site Telemetry Pill"
        className="fixed bottom-4 right-4 z-30"
      >
        <button
          id="floating-analytics-btn"
          onClick={() => {
            analytics.trackEvent('section_view', 'Clicked floating telemetry badge');
            setAnalyticsOpen(true);
          }}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-300/80 dark:border-neutral-700/80 text-neutral-700 dark:text-neutral-300 shadow-md hover:border-neutral-500 dark:hover:border-neutral-500 transition-all text-xs font-mono"
          title="Open real-time visitor analytics & performance monitor (or press Shift + A)"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline text-neutral-500">Edge BLR-01</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{vitals.ttfb}ms</span>
          <span className="text-neutral-300 dark:text-neutral-700">|</span>
          <Activity className="w-3 h-3 text-neutral-400 group-hover:text-emerald-500 transition-colors" />
        </button>
      </aside>
    </div>
  );
}
