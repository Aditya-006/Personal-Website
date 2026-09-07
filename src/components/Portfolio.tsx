import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Layers, Search, X, CheckCircle2, ArrowRight, Cpu, Zap } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { analytics } from '../utils/analytics';

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ['All', 'Distributed Systems', 'Full Stack', 'Developer Tools', 'Open Source'];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenCaseStudy = (project: Project) => {
    setActiveProject(project);
    analytics.trackEvent('project_click', `Viewed Case Study: ${project.title}`, {
      projectId: project.id,
      category: project.category
    });
  };

  return (
    <section id="portfolio" aria-label="Selected Engineering Work" className="py-20 sm:py-28 border-b border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-neutral-200/70 dark:border-neutral-800/70">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-1">
              Portfolio & Engineering Artifacts
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50">
              Selected Work
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl">
              Production systems, low-latency edge caching middleware, and offline-first transit architectures built with high craftsmanship.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="portfolio-search-input"
              type="text"
              placeholder="Search projects or stack..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length > 2) {
                  analytics.trackEvent('filter_change', `Searched portfolio: ${e.target.value}`);
                }
              }}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 dark:focus:border-neutral-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-6 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`portfolio-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                setSelectedCategory(cat);
                analytics.trackEvent('filter_change', `Filtered by category: ${cat}`);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-medium'
                  : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              id={`project-card-${project.id}`}
              className="group flex flex-col justify-between bg-white dark:bg-neutral-900/90 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 dark:text-neutral-500 mb-2">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-0.5 mb-3">
                  {project.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Key Metrics Strip */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-lg bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200/60 dark:border-neutral-800/60 mb-4">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-xs font-bold font-mono text-neutral-900 dark:text-neutral-100">{m.value}</div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                <button
                  id={`btn-case-study-${project.id}`}
                  onClick={() => handleOpenCaseStudy(project)}
                  className="text-xs font-medium text-neutral-900 dark:text-neutral-100 hover:underline flex items-center gap-1 focus:outline-none"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.trackEvent('project_click', `GitHub Source: ${project.title}`)}
                      className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      title="View Source Code"
                      aria-label="View Source Code on GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.trackEvent('project_click', `Live Demo: ${project.title}`)}
                      className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      title="Launch Live Application"
                      aria-label="Launch Live Application"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-neutral-500 dark:text-neutral-400">
            <p className="text-sm">No projects found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs font-mono underline text-neutral-900 dark:text-neutral-100"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* In-Depth Architecture Case Study Modal */}
      {activeProject && (
        <div
          id="project-case-study-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                  Architecture Case Study • {activeProject.category}
                </div>
                <h3 id="case-study-title" className="text-xl sm:text-2xl font-bold text-neutral-950 dark:text-neutral-50">
                  {activeProject.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {activeProject.subtitle}
                </p>
              </div>
              <button
                id="close-case-study-btn"
                onClick={() => setActiveProject(null)}
                className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Close case study modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-6 space-y-6">
              {/* Metrics Showcase */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                {activeProject.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-base sm:text-lg font-bold font-mono text-neutral-900 dark:text-neutral-100">
                      {m.value}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Architecture Overview */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>System Architecture</span>
                </h4>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {activeProject.architecture.overview}
                </p>
              </div>

              {/* Key Highlights */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-3 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Engineering Highlights & Inventions</span>
                </h4>
                <ul className="space-y-2">
                  {activeProject.architecture.highlights.map((highlight, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benchmark Result */}
              <div className="p-4 rounded-xl bg-neutral-100/70 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-700/60">
                <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">
                  Empirical Benchmark Result
                </div>
                <p className="text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200">
                  {activeProject.architecture.benchmark}
                </p>
              </div>

              {/* Tech Stack Pills */}
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
                  Technologies Employed
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeProject.architecture.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Author: Aditya Santhosh</span>
              <div className="flex items-center gap-3">
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-xs font-mono font-medium border border-neutral-300 dark:border-neutral-700 hover:border-neutral-500 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 rounded-lg text-xs font-mono font-medium bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
