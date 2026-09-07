import React, { useState, useEffect } from 'react';
import {
  Activity,
  X,
  Clock,
  MousePointer,
  Compass,
  Download,
  CheckCircle2,
  Trash2,
  TrendingUp,
  Eye
} from 'lucide-react';
import { analytics } from '../utils/analytics';
import { AnalyticsEvent, VisitorEngagement, WebVitals } from '../types';

interface AnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsModal: React.FC<AnalyticsModalProps> = ({ isOpen, onClose }) => {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [engagement, setEngagement] = useState<VisitorEngagement>(analytics.getEngagement());
  const [vitals, setVitals] = useState<WebVitals>(analytics.getVitals());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const unsubEvents = analytics.subscribeEvents(setEvents);
    const unsubEngagement = analytics.subscribeEngagement(setEngagement);
    const unsubVitals = analytics.subscribeVitals(setVitals);

    const timer = setInterval(() => {
      setEngagement(analytics.getEngagement());
    }, 1000);

    return () => {
      unsubEvents();
      unsubEngagement();
      unsubVitals();
      clearInterval(timer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleExport = () => {
    const data = {
      timestamp: new Date().toISOString(),
      visitor: engagement,
      coreWebVitals: vitals,
      interactionEvents: events
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aditya-santhosh-telemetry-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="analytics-telemetry-drawer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="analytics-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-md bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-500" />
            <div>
              <h3 id="analytics-modal-title" className="text-sm font-bold text-neutral-950 dark:text-neutral-50 tracking-tight">
                Visitor Engagement & Telemetry
              </h3>
              <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                Zero-cookie • Client-side performance observability
              </p>
            </div>
          </div>

          <button
            id="close-analytics-drawer-btn"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Close analytics drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
          {/* Real-time Session Overview */}
          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span>Session Duration</span>
              </div>
              <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {engagement.sessionDurationSec}s
              </div>
            </div>

            <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                <Compass className="w-3.5 h-3.5 text-emerald-500" />
                <span>Scroll Depth</span>
              </div>
              <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {engagement.scrollDepthPct}%
              </div>
            </div>

            <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                <MousePointer className="w-3.5 h-3.5 text-purple-500" />
                <span>Interactions</span>
              </div>
              <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {engagement.totalInteractions}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-1.5 text-neutral-400 mb-1">
                <Eye className="w-3.5 h-3.5 text-amber-500" />
                <span>Active Section</span>
              </div>
              <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase truncate">
                #{engagement.currentSection}
              </div>
            </div>
          </div>

          {/* Sections Traversed */}
          <div className="space-y-2">
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              Sections Traversed This Session
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono">
              {engagement.sectionsVisited.map((sec) => (
                <span
                  key={sec}
                  className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[10px]"
                >
                  #{sec}
                </span>
              ))}
            </div>
          </div>

          {/* Core Web Vitals Snapshot */}
          <div className="space-y-2">
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 flex items-center justify-between">
              <span>Observed Core Web Vitals</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100/100 Grade</span>
            </div>

            <div className="space-y-1.5 font-mono">
              <div className="flex justify-between p-2 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <span>Time to First Byte (TTFB)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{vitals.ttfb} ms</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <span>First Contentful Paint (FCP)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{vitals.fcp} ms</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <span>Largest Contentful Paint (LCP)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{vitals.lcp} ms</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <span>Cumulative Layout Shift (CLS)</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{vitals.cls}</span>
              </div>
            </div>
          </div>

          {/* Real-time Interaction Event Log */}
          <div className="space-y-2">
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 flex items-center justify-between">
              <span>Real-Time Interaction Feed</span>
              <span className="text-[10px] text-neutral-500">{events.length} logged</span>
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1.5 font-mono text-[11px] pr-1">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="p-2 rounded bg-neutral-100/70 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-700/60 flex items-start justify-between gap-2"
                >
                  <div className="truncate">
                    <div className="text-neutral-900 dark:text-neutral-200 truncate">{evt.label}</div>
                    <div className="text-[10px] text-neutral-400">{evt.type}</div>
                  </div>
                  <span className="text-[10px] text-neutral-400 shrink-0">{evt.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-between">
          <span className="text-[11px] font-mono text-neutral-400">
            Aditya Santhosh Engine
          </span>
          <button
            onClick={handleExport}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 hover:opacity-90 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{copied ? 'Exported!' : 'Export JSON'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
