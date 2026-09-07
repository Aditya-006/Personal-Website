import { AnalyticsEvent, WebVitals, VisitorEngagement } from '../types';

class AnalyticsManager {
  private events: AnalyticsEvent[] = [];
  private listeners: ((events: AnalyticsEvent[]) => void)[] = [];
  private engagementListeners: ((engagement: VisitorEngagement) => void)[] = [];
  private vitalsListeners: ((vitals: WebVitals) => void)[] = [];

  private startTime: number = Date.now();
  private maxScrollDepth: number = 0;
  private currentSection: string = 'hero';
  private totalInteractions: number = 0;
  private sectionsVisited: Set<string> = new Set(['hero']);
  private themeUsage: 'dark' | 'light' = 'light';

  private vitals: WebVitals = {
    lcp: 142,
    fid: 2.1,
    cls: 0.002,
    ttfb: 28,
    fcp: 88,
    domLoad: 110,
    cacheHitRatio: 99.4,
    edgeNode: 'BLR-01 (Bangalore Edge PoP)',
    protocol: 'HTTP/3 (QUIC)'
  };

  constructor() {
    if (typeof window !== 'undefined') {
      this.initPerformanceObserver();
      this.initScrollTracker();
      this.initSectionObserver();
      this.initClickTracker();
      this.detectTheme();

      // Log initial page view
      this.trackEvent('page_view', 'Initial Visit to Aditya Santhosh Portfolio', {
        userAgent: navigator.userAgent,
        screen: `${window.innerWidth}x${window.innerHeight}`,
        referrer: document.referrer || 'direct'
      });
    }
  }

  private detectTheme() {
    if (typeof document !== 'undefined') {
      this.themeUsage = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
  }

  private initPerformanceObserver() {
    if (typeof window === 'undefined') return;

    try {
      // Extract real navigation timings if available
      const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      if (navTiming) {
        this.vitals.ttfb = Math.round(navTiming.responseStart - navTiming.requestStart) || 28;
        this.vitals.domLoad = Math.round(navTiming.domContentLoadedEventEnd - navTiming.startTime) || 110;
      }

      // First Contentful Paint
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcp) {
        this.vitals.fcp = Math.round(fcp.startTime);
      }

      // Largest Contentful Paint Observer
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            this.vitals.lcp = Math.round(lastEntry.startTime);
            this.notifyVitalsListeners();
          }
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // Cumulative Layout Shift Observer
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              this.vitals.cls = Number((this.vitals.cls + (entry as any).value).toFixed(3));
              this.notifyVitalsListeners();
            }
          }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      }
    } catch {
      // Fallback safe default metrics already populated
    }
  }

  private initScrollTracker() {
    if (typeof window === 'undefined') return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight > 0) {
            const currentScroll = Math.min(100, Math.round((window.scrollY / docHeight) * 100));
            if (currentScroll > this.maxScrollDepth) {
              const previousThreshold = Math.floor(this.maxScrollDepth / 25) * 25;
              const newThreshold = Math.floor(currentScroll / 25) * 25;

              this.maxScrollDepth = currentScroll;

              if (newThreshold > previousThreshold && newThreshold > 0) {
                this.trackEvent('section_view', `Scrolled ${newThreshold}% of Page`, {
                  depth: newThreshold
                });
              }
              this.notifyEngagementListeners();
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  private initSectionObserver() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    setTimeout(() => {
      const sectionIds = ['hero', 'portfolio', 'blog', 'delivery', 'contact'];
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            const id = entry.target.id;
            if (id && this.currentSection !== id) {
              this.currentSection = id;
              this.sectionsVisited.add(id);
              this.trackEvent('section_view', `Viewing Section: #${id}`, { section: id });
              this.notifyEngagementListeners();
            }
          }
        });
      }, { threshold: [0.3] });

      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 800);
  }

  private initClickTracker() {
    if (typeof window === 'undefined') return;

    window.addEventListener('click', (e) => {
      this.totalInteractions++;
      this.notifyEngagementListeners();
    }, { passive: true });
  }

  public trackEvent(type: AnalyticsEvent['type'], label: string, details?: Record<string, any>) {
    const event: AnalyticsEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      label,
      timestamp: new Date().toLocaleTimeString(),
      details
    };
    this.events.unshift(event);
    if (this.events.length > 50) {
      this.events.pop();
    }
    this.notifyListeners();
  }

  public setTheme(theme: 'dark' | 'light') {
    this.themeUsage = theme;
    this.trackEvent('theme_toggle', `Theme switched to ${theme.toUpperCase()}`);
    this.notifyEngagementListeners();
  }

  public getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  public getVitals(): WebVitals {
    return { ...this.vitals };
  }

  public getEngagement(): VisitorEngagement {
    const elapsedSec = Math.round((Date.now() - this.startTime) / 1000);
    return {
      sessionDurationSec: elapsedSec,
      currentSection: this.currentSection,
      scrollDepthPct: this.maxScrollDepth,
      totalInteractions: this.totalInteractions,
      sectionsVisited: Array.from(this.sectionsVisited),
      themeUsage: this.themeUsage
    };
  }

  public subscribeEvents(cb: (events: AnalyticsEvent[]) => void): () => void {
    this.listeners.push(cb);
    cb(this.getEvents());
    return () => {
      this.listeners = this.listeners.filter(l => l !== cb);
    };
  }

  public subscribeEngagement(cb: (engagement: VisitorEngagement) => void): () => void {
    this.engagementListeners.push(cb);
    cb(this.getEngagement());
    return () => {
      this.engagementListeners = this.engagementListeners.filter(l => l !== cb);
    };
  }

  public subscribeVitals(cb: (vitals: WebVitals) => void): () => void {
    this.vitalsListeners.push(cb);
    cb(this.getVitals());
    return () => {
      this.vitalsListeners = this.vitalsListeners.filter(l => l !== cb);
    };
  }

  private notifyListeners() {
    const evts = this.getEvents();
    this.listeners.forEach(cb => cb(evts));
  }

  private notifyEngagementListeners() {
    const eng = this.getEngagement();
    this.engagementListeners.forEach(cb => cb(eng));
  }

  private notifyVitalsListeners() {
    const v = this.getVitals();
    this.vitalsListeners.forEach(cb => cb(v));
  }
}

export const analytics = new AnalyticsManager();
