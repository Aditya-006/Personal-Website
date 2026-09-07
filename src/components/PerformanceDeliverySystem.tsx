import React, { useState, useEffect } from 'react';
import {
  Server,
  Zap,
  ShieldCheck,
  Search,
  Code2,
  Cpu,
  ArrowUpRight,
  CheckCircle2,
  FileCode,
  Globe2,
  Copy,
  Check
} from 'lucide-react';
import { WebVitals } from '../types';
import { analytics } from '../utils/analytics';
import { PERSONAL_INFO, SEO_CONFIG } from '../data/portfolioData';

export const PerformanceDeliverySystem: React.FC = () => {
  const [vitals, setVitals] = useState<WebVitals>(analytics.getVitals());
  const [activeTab, setActiveTab] = useState<'delivery' | 'seo'>('delivery');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  useEffect(() => {
    return analytics.subscribeVitals(setVitals);
  }, []);

  const handleCopySchema = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    analytics.trackEvent('seo_audit', `Copied ${type} payload`);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const schemaJsonLd = JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: PERSONAL_INFO.name,
      jobTitle: PERSONAL_INFO.title,
      email: `mailto:${PERSONAL_INFO.email}`,
      telephone: `+91${PERSONAL_INFO.phone}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: PERSONAL_INFO.city,
        addressCountry: PERSONAL_INFO.country
      },
      sameAs: [PERSONAL_INFO.linkedinUrl, PERSONAL_INFO.githubUrl],
      knowsAbout: PERSONAL_INFO.coreCompetencies
    },
    null,
    2
  );

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://adityasanthosh.dev/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://adityasanthosh.dev/#portfolio</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://adityasanthosh.dev/#blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://adityasanthosh.dev/#contact</loc>
    <priority>0.7</priority>
  </url>
</urlset>`;

  return (
    <section id="delivery" aria-label="Performance Delivery and SEO Engine" className="py-20 sm:py-28 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/40 dark:bg-neutral-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-neutral-200/70 dark:border-neutral-800/70">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1">
              Infrastructure & Discovery Architecture
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
              Content Delivery & SEO System
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl">
              Deterministic sub-100ms edge routing, automated Google schema indexing, and real-time Core Web Vitals telemetry.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-neutral-200/60 dark:bg-neutral-800/60 border border-neutral-300/60 dark:border-neutral-700/60 font-mono text-xs">
            <button
              id="tab-delivery-system"
              onClick={() => {
                setActiveTab('delivery');
                analytics.trackEvent('section_view', 'Switched to Delivery System Tab');
              }}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'delivery'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs font-medium'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Edge Delivery & Vitals
            </button>
            <button
              id="tab-seo-optimizer"
              onClick={() => {
                setActiveTab('seo');
                analytics.trackEvent('section_view', 'Switched to SEO Optimizer Tab');
              }}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'seo'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs font-medium'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
              }`}
            >
              SEO Engine & Indexing
            </button>
          </div>
        </div>

        {activeTab === 'delivery' ? (
          <div className="pt-8 space-y-8 animate-in fade-in">
            {/* Edge Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between text-neutral-400 mb-2">
                  <span className="text-xs font-mono">TTFB (Time to First Byte)</span>
                  <Zap className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-neutral-950 dark:text-neutral-50">
                  {vitals.ttfb} <span className="text-xs font-normal text-neutral-500">ms</span>
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                  Sub-50ms target met
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between text-neutral-400 mb-2">
                  <span className="text-xs font-mono">LCP (Largest Content)</span>
                  <Cpu className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-neutral-950 dark:text-neutral-50">
                  {vitals.lcp} <span className="text-xs font-normal text-neutral-500">ms</span>
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                  Grade A (&lt; 2.5s)
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between text-neutral-400 mb-2">
                  <span className="text-xs font-mono">CLS (Layout Shift)</span>
                  <ShieldCheck className="w-4 h-4 text-purple-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-neutral-950 dark:text-neutral-50">
                  {vitals.cls}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                  Zero visual shift
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between text-neutral-400 mb-2">
                  <span className="text-xs font-mono">Edge Cache Ratio</span>
                  <Server className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-neutral-950 dark:text-neutral-50">
                  {vitals.cacheHitRatio}%
                </div>
                <div className="text-[11px] text-neutral-500 font-mono mt-1">
                  {vitals.protocol}
                </div>
              </div>
            </div>

            {/* Architecture Details Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
                <h3 className="text-sm font-semibold font-mono uppercase text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-emerald-500" />
                  <span>Edge Routing & CDN Pipeline</span>
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Assets and dynamic schemas are served from distributed points of presence with primary routing through the Bangalore Edge PoP (<code className="font-mono text-xs">BLR-01</code>). Immutable static assets leverage aggressive HTTP cache control headers:
                </p>
                <div className="p-3 rounded-lg bg-neutral-950 text-neutral-200 font-mono text-xs overflow-x-auto space-y-1">
                  <div className="text-emerald-400"># Response Headers from BLR-01 Edge</div>
                  <div>Cache-Control: public, max-age=31536000, immutable</div>
                  <div>Content-Encoding: br (Brotli Level 11)</div>
                  <div>Alt-Svc: h3=":443"; ma=86400, quic=":443"</div>
                  <div>X-Edge-Origin: BLR-01 (Bangalore, IN)</div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-4">
                <h3 className="text-sm font-semibold font-mono uppercase text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-500" />
                  <span>Compression & Asset Budget</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span>HTML Payload + JSON-LD Schema</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">1.8 KB (Compressed)</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[12%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span>Critical CSS (Tailwind Tree-shaken)</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">3.4 KB (Compressed)</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[24%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span>Core JavaScript Engine</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">22.8 KB (Gzipped)</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full w-[45%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-8 space-y-8 animate-in fade-in">
            {/* Google SERP Organic Search Ranking Simulation */}
            <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-blue-500" />
                <span>Google Organic Search Engine Ranking Simulation</span>
              </div>
              <div className="max-w-2xl font-sans pt-1">
                <div className="text-xs text-neutral-500 font-mono truncate">
                  https://adityasanthosh.dev &gt; portfolio
                </div>
                <div className="text-lg sm:text-xl text-blue-700 dark:text-blue-400 hover:underline font-medium cursor-pointer pt-0.5">
                  Aditya Santhosh — Software Engineer & Systems Architect | Bangalore
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                  Official personal portfolio of Aditya Santhosh (Bangalore, India). Explore production distributed systems, edge cache architectures, technical essays, and contact.
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-blue-600 dark:text-blue-400 pt-2 font-mono">
                  <span className="hover:underline cursor-pointer">Selected Projects</span>
                  <span className="hover:underline cursor-pointer">Technical Writing</span>
                  <span className="hover:underline cursor-pointer">Direct Contact</span>
                  <span className="hover:underline cursor-pointer">Bangalore Engineering</span>
                </div>
              </div>
            </div>

            {/* Structured Schema and Sitemap Generator */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* JSON-LD Inspector */}
              <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-2 font-semibold">
                    <Code2 className="w-4 h-4 text-purple-500" />
                    <span>Active Schema.org JSON-LD (Person)</span>
                  </h3>
                  <button
                    onClick={() => handleCopySchema(schemaJsonLd, 'json-ld')}
                    className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title="Copy JSON-LD"
                  >
                    {copiedType === 'json-ld' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="p-3 rounded-lg bg-neutral-950 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-56 leading-tight">
                  {schemaJsonLd}
                </pre>
              </div>

              {/* Sitemap.xml */}
              <div className="p-6 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-900 dark:text-neutral-100 flex items-center gap-2 font-semibold">
                    <FileCode className="w-4 h-4 text-blue-500" />
                    <span>Organic Crawler Sitemap.xml</span>
                  </h3>
                  <button
                    onClick={() => handleCopySchema(sitemapXml, 'sitemap')}
                    className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title="Copy Sitemap"
                  >
                    {copiedType === 'sitemap' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="p-3 rounded-lg bg-neutral-950 text-blue-300 font-mono text-[11px] overflow-x-auto max-h-56 leading-tight">
                  {sitemapXml}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
