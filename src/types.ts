export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Distributed Systems' | 'Full Stack' | 'Developer Tools' | 'Open Source';
  tags: string[];
  year: string;
  metrics: {
    label: string;
    value: string;
  }[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  architecture: {
    overview: string;
    highlights: string[];
    techStack: string[];
    benchmark: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: 'System Design' | 'Performance' | 'UI Philosophy' | 'Bangalore Tech';
  publishedAt: string;
  readTime: string;
  views: number;
  tags: string[];
  keyTakeaways: string[];
  tableOfContents: { id: string; title: string }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  serviceType: string;
}

export interface AnalyticsEvent {
  id: string;
  type: 'page_view' | 'section_view' | 'project_click' | 'blog_read' | 'contact_action' | 'theme_toggle' | 'seo_audit' | 'copy_contact' | 'filter_change';
  label: string;
  timestamp: string;
  details?: Record<string, any>;
}

export interface WebVitals {
  lcp: number; // Largest Contentful Paint (ms)
  fid: number; // First Input Delay (ms) / INP
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte (ms)
  fcp: number; // First Contentful Paint (ms)
  domLoad: number;
  cacheHitRatio: number;
  edgeNode: string;
  protocol: string;
}

export interface VisitorEngagement {
  sessionDurationSec: number;
  currentSection: string;
  scrollDepthPct: number;
  totalInteractions: number;
  sectionsVisited: string[];
  themeUsage: 'dark' | 'light';
}
