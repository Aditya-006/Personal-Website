import { Project, BlogPost } from '../types';

export const PERSONAL_INFO = {
  name: 'Aditya Santhosh',
  shortName: 'Aditya',
  title: 'Software Engineer & Systems Architect',
  roleSummary: 'Specializing in resilient distributed architectures, sub-millisecond edge computing, and minimalist high-performance web systems.',
  phone: '7022113229',
  phoneFormatted: '+91 7022113229',
  email: 'Adityasanthoshn0@gmail.com',
  address: 'Bangalore, Karnataka, India',
  city: 'Bangalore',
  country: 'India',
  timezone: 'Asia/Kolkata',
  timezoneOffset: 'UTC+05:30',
  linkedinUrl: 'https://linkedin.com/in/adityasanthosh006',
  linkedinHandle: 'in/adityasanthosh006',
  githubUrl: 'https://github.com/adityasanthosh',
  status: 'Open to high-impact engineering opportunities & consulting',
  availability: 'Available Immediately',
  bio: `I am a software engineer based in Bangalore, building robust backend architectures, distributed pipelines, and hyper-responsive web applications. My engineering ethos prioritizes low cognitive overhead, zero-bloat interfaces, and measurable sub-100ms response times.`,
  coreCompetencies: [
    'Distributed Systems & Microservices',
    'High Performance Web (Core Web Vitals)',
    'Edge Caching & Content Delivery (CDN)',
    'TypeScript, Node.js & React Ecosystem',
    'Database Optimization & Consistency Models',
    'RESTful & gRPC API Engineering'
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'veloce-edge-cache',
    title: 'Veloce Edge Cache',
    subtitle: 'Low-Latency Distributed In-Memory Cache & Reverse Proxy',
    description: 'An ultra-fast edge caching middleware designed for high-traffic microservices with sub-10ms global TTFB and intelligent tiered cache invalidation.',
    category: 'Distributed Systems',
    tags: ['Distributed Systems', 'Edge Compute', 'TypeScript', 'Redis', 'WASM'],
    year: '2024',
    featured: true,
    metrics: [
      { label: 'Latency p99', value: '< 8.4ms' },
      { label: 'Cache Hit Ratio', value: '99.4%' },
      { label: 'Throughput', value: '45k req/s' }
    ],
    githubUrl: 'https://github.com/adityasanthosh/veloce-edge-cache',
    liveUrl: 'https://veloce-edge.dev',
    architecture: {
      overview: 'Engineered a multi-tier edge cache utilizing regional edge workers that coordinate via Bloom filters to minimize origin database trips.',
      highlights: [
        'Deterministic Cache Invalidation using distributed pub/sub channels',
        'Built-in Brotli & Gzip streaming compression pipeline',
        'Automatic stale-while-revalidate and stale-if-error resilience policies',
        'Zero-allocation memory pooling in hot execution paths'
      ],
      techStack: ['Node.js', 'TypeScript', 'Redis Clustered', 'Cloudflare Workers', 'Docker'],
      benchmark: 'Achieved 4.2x reduction in origin server strain across 10M simulated concurrent requests.'
    }
  },
  {
    id: 'telemetry-pulse',
    title: 'Pulse Telemetry Engine',
    subtitle: 'Privacy-Preserving Visitor Engagement & Real-Time Metrics',
    description: 'A lightweight, zero-cookie client-side telemetry system providing granular Core Web Vitals monitoring, scroll-depth mapping, and sub-second event aggregation.',
    category: 'Developer Tools',
    tags: ['Performance', 'Web Vitals', 'TypeScript', 'Canvas', 'Web Workers'],
    year: '2024',
    featured: true,
    metrics: [
      { label: 'Payload Size', value: '1.2 KB' },
      { label: 'Battery Impact', value: 'Negligible' },
      { label: 'Data Privacy', value: '100% GDPR/DPDP' }
    ],
    githubUrl: 'https://github.com/adityasanthosh/pulse-telemetry',
    liveUrl: 'https://pulse-telemetry.io',
    architecture: {
      overview: 'Processes browser performance observer metrics inside a dedicated Web Worker off the main rendering thread, buffering telemetry for batched Beacon API transmissions.',
      highlights: [
        'Real-time INP (Interaction to Next Paint) and CLS layout shift quantification',
        'Differential scroll-tracking using passive Intersection Observers',
        'Dynamic batching algorithm adapting to device network conditions',
        'Zero-PII anonymized session hashing'
      ],
      techStack: ['TypeScript', 'Web Workers API', 'Beacon API', 'IndexedDB', 'Recharts'],
      benchmark: 'Runs with zero main-thread jank, guaranteeing uninterrupted 60/120fps UI rendering.'
    }
  },
  {
    id: 'namma-transit',
    title: 'Namma Bengaluru Transit',
    subtitle: 'Offline-First Low-Bandwidth Commute Optimizer',
    description: 'A hyper-optimized transit planning progressive web application built specifically for Bangalore commuters navigating Metro (Namma Metro) and BMTC bus networks.',
    category: 'Full Stack',
    tags: ['Full Stack', 'Offline First', 'Bangalore Transit', 'GeoJSON', 'PWA'],
    year: '2023',
    featured: true,
    metrics: [
      { label: 'First Load', value: '380ms' },
      { label: 'Offline Capability', value: '100%' },
      { label: 'Daily Active Routes', value: '18k+' }
    ],
    githubUrl: 'https://github.com/adityasanthosh/namma-commute',
    liveUrl: 'https://nammacomute.in',
    architecture: {
      overview: 'Uses compressed Vector Tile caches and client-side Dijkstra route graphs so riders can calculate multi-modal routes even in underground metro stations without cell reception.',
      highlights: [
        'Offline timetable caching with Service Worker background synchronization',
        'Lightweight canvas-based interactive route visualizer',
        'Crowdsourced delay notifications with anti-spam rate limiting',
        'Supports dual Kannada & English localization'
      ],
      techStack: ['React', 'TypeScript', 'Service Workers', 'IndexedDB', 'Tailwind CSS'],
      benchmark: 'Full route calculation executes in under 14 milliseconds entirely on-device.'
    }
  },
  {
    id: 'schema-forge',
    title: 'SchemaForge AST Refactor',
    subtitle: 'Automated Microservice API Contract & Schema Validator',
    description: 'Developer CLI and web dashboard that monitors breaking changes in protobuf, gRPC, and REST schemas across cross-functional engineering teams.',
    category: 'Developer Tools',
    tags: ['Developer Tools', 'AST', 'TypeScript', 'CLI', 'API Contracts'],
    year: '2023',
    featured: false,
    metrics: [
      { label: 'Contracts Scanned', value: '12,000+' },
      { label: 'Breaking Changes Caught', value: '430+' },
      { label: 'CI/CD Speedup', value: '3.5x' }
    ],
    githubUrl: 'https://github.com/adityasanthosh/schema-forge',
    liveUrl: 'https://schemaforge.dev',
    architecture: {
      overview: 'Parses TypeScript interfaces and OpenAPI specifications into Abstract Syntax Trees to calculate backward compatibility deltas before deployment.',
      highlights: [
        'Deterministic semantic version bumping advice based on diff analysis',
        'Interactive dependency graph rendering using WebGL',
        'GitHub Actions and GitLab CI plug-and-play integrations'
      ],
      techStack: ['TypeScript', 'Babel AST', 'Node.js', 'Express', 'D3.js'],
      benchmark: 'Analyzes enterprise repos with 500+ schemas in less than 2.8 seconds.'
    }
  },
  {
    id: 'minimalist-canvas',
    title: 'Zenith Minimalist Reader OS',
    subtitle: 'Distraction-Free Engineering Publishing Platform',
    description: 'An open-source markdown publishing engine that strips away web clutter, delivering maximum typography legibility, instantaneous navigation, and zero trackers.',
    category: 'Open Source',
    tags: ['Open Source', 'Minimalism', 'Typography', 'Next.js', 'Tailwind'],
    year: '2022',
    featured: false,
    metrics: [
      { label: 'Lighthouse Score', value: '100/100' },
      { label: 'Bundle Size', value: '8.4 KB' },
      { label: 'GitHub Stars', value: '850+' }
    ],
    githubUrl: 'https://github.com/adityasanthosh/zenith-reader',
    liveUrl: 'https://zenith-reader.org',
    architecture: {
      overview: 'Zero-JavaScript reading mode that serves static semantic HTML paired with responsive SVG graphics and inline critical styling.',
      highlights: [
        'Dynamic font sizing conforming to ISO 9241 readability standards',
        'Built-in syntax highlighter utilizing compile-time tokenization',
        'Automatic schema.org JSON-LD generation for search engines'
      ],
      techStack: ['TypeScript', 'React', 'Tailwind CSS', 'Vite', 'Markdown AST'],
      benchmark: 'Perfect 100 on Performance, Accessibility, Best Practices, and SEO.'
    }
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'optimizing-core-web-vitals-sub-100ms',
    slug: 'optimizing-core-web-vitals-sub-100ms',
    title: 'Engineering the Sub-100ms Web: Beyond Generic Bundling',
    subtitle: 'A pragmatic architectural playbook for trimming millisecond latencies from modern web apps.',
    excerpt: 'How modern frontend architectures can eliminate execution jank, streamline critical rendering paths, and sustain sub-100ms interaction latencies.',
    category: 'Performance',
    publishedAt: 'February 2025',
    readTime: '6 min read',
    views: 3420,
    tags: ['Web Vitals', 'Performance', 'Edge Compute', 'Browser Internals'],
    keyTakeaways: [
      'Prioritize interaction-to-next-paint (INP) over synthetic benchmarks.',
      'Edge streaming with HTTP/3 eliminates TCP handshake round trips.',
      'Offload analytics & background compute to dedicated Web Workers.',
      'Treat CSS bundle size as a first-class latency budget item.'
    ],
    tableOfContents: [
      { id: 'the-cost-of-latency', title: 'The Cost of Latency in Modern Web Apps' },
      { id: 'breaking-down-the-waterfall', title: 'Deconstructing the Network Waterfall' },
      { id: 'mastering-inp', title: 'Mastering Interaction to Next Paint (INP)' },
      { id: 'edge-delivery-pipeline', title: 'Architecting the Sub-10ms Edge Delivery Pipeline' }
    ],
    content: `
### The Cost of Latency in Modern Web Apps

Every millisecond counts. In high-performance engineering, latency is not simply an aesthetic consideration—it directly impacts user trust, conversion rates, and search engine crawl budgets. When Google incorporated Core Web Vitals into organic ranking algorithms, speed shifted from a technical preference to a foundational ranking signal.

For applications serving thousands or millions of users, latency spikes commonly stem from three culprits:
1. **Unconstrained JavaScript Execution:** Main thread blockage that chokes user input responses.
2. **Suboptimal Caching Headers:** Origin round-trips caused by fragile or missing cache-control headers.
3. **Layout Thrashing:** Repeated unmeasured DOM reads and writes causing Cumulative Layout Shifts.

### Deconstructing the Network Waterfall

Achieving sub-100ms Largest Contentful Paint (LCP) requires strict orchestration of resource prioritization. Modern browsers support granular priority hints (\`fetchpriority="high"\`) and DNS preconnects. By serving assets from geographically dispersed Edge nodes (such as the Bangalore PoP), we circumvent inter-continental submarine cable round-trips.

\`\`\`html
<!-- Critical Resource Hinting -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin />
\`\`\`

### Mastering Interaction to Next Paint (INP)

With First Input Delay (FID) formally retired in favor of Interaction to Next Paint (INP), web apps are held accountable for *every* continuous interaction throughout a user's lifecycle. 

Key architectural steps we enforce:
- **Offload Heavy State Work:** Keep computationally expensive tasks like fuzzy searching or data aggregation inside a \`Worker\` thread.
- **Yield to the Main Thread:** Break long-running synchronization blocks using \`scheduler.yield()\` or \`setTimeout(..., 0)\`.
- **Passive Listeners:** Ensure all scroll, touch, and wheel event handlers are registered with \`{ passive: true }\`.

### Architecting the Sub-10ms Edge Delivery Pipeline

Deploying logic to the edge allows us to authenticate, cache, and serve dynamic content without waking up distant core databases. Paired with modern compression algorithms like Brotli (yielding a 21% compression improvement over gzip for text payloads), cold payload deliveries drop well under 50 Kilobytes.
    `
  },
  {
    id: 'minimalist-ui-philosophy',
    slug: 'minimalist-ui-philosophy',
    title: 'The Minimalist UI Philosophy: Intentionality Over Ornamentation',
    subtitle: 'Why eliminating interface noise yields superior digital craft and heightened user focus.',
    excerpt: 'Examining the mathematical and cognitive foundations behind minimalist digital design—from optical padding to Dieter Rams principles.',
    category: 'UI Philosophy',
    publishedAt: 'January 2025',
    readTime: '5 min read',
    views: 2840,
    tags: ['Design Systems', 'Minimalism', 'Typography', 'Cognitive Load'],
    keyTakeaways: [
      'Minimalism is about the presence of deliberate craft, not the absence of effort.',
      'Optically balanced spacing provides structure without requiring heavy card borders.',
      'Restricting the color palette elevates the semantic weight of accent tones.',
      'Typography hierarchy drives 90% of user comprehension.'
    ],
    tableOfContents: [
      { id: 'the-tyranny-of-slop', title: 'The Tyranny of Digital Clutter' },
      { id: 'optical-geometry', title: 'Optical Geometry and Spatial Rhythm' },
      { id: 'typography-as-architecture', title: 'Typography as Structural Architecture' }
    ],
    content: `
### The Tyranny of Digital Clutter

Modern web development has suffered from an influx of gratuitous visual ornamentations—neon gradients, arbitrary floating orbs, and glassmorphism panels that degrade readability while taxing the GPU.

Dieter Rams' celebrated tenet holds truer than ever: *"Good design is as little design as possible."* When we remove gratuitous decorative layers, the actual content and functionality are forced to stand on their own merit.

### Optical Geometry and Spatial Rhythm

In minimalist user interfaces, negative space is not empty space; it is a structural pillar. We adhere to mathematical spacing scales where outer container padding always exceeds inner child spacing:

- **Mathematical Consistency:** Spacing increments along a rigid 4px/8px baseline rhythm.
- **Corner Nesting Rule:** \`Inner Radius = Outer Radius - Padding\`. Maintaining this prevents optical corner pinch and establishes spatial cohesion.
- **Contrast Ratios:** Contrast must satisfy WCAG AA (at least 4.5:1 for body copy and 3:1 for large display elements) in both light and dark modes.

### Typography as Structural Architecture

When colors and decorative boxes are restrained, typography bears the full responsibility of establishing hierarchy. Pairing an articulate display font for headings with a razor-sharp monospace or sans-serif for numerical data and body text creates effortless visual parsing.
    `
  },
  {
    id: 'building-from-bangalore-tech-ecosystem',
    slug: 'building-from-bangalore-tech-ecosystem',
    title: 'Engineering from Bangalore: Lessons in Scale & Resilient Systems',
    subtitle: 'Reflections from India’s tech capital on designing software that endures erratic networks and rapid surges.',
    excerpt: 'Observations from Bangalore’s vibrant software ecosystem on building fault-tolerant architectures and designing for the next billion users.',
    category: 'Bangalore Tech',
    publishedAt: 'December 2024',
    readTime: '4 min read',
    views: 4120,
    tags: ['Bangalore', 'Ecosystem', 'System Scale', 'Resilience'],
    keyTakeaways: [
      'Building in Bangalore means engineering for extreme real-world network variance.',
      'Offline-first and optimistic UI updates are essential requirements.',
      'High density ecosystems foster uniquely rapid engineering feedback loops.'
    ],
    tableOfContents: [
      { id: 'silicon-plateau', title: 'The Silicon Plateau Environment' },
      { id: 'resilience-under-constraint', title: 'Engineering for Variance' },
      { id: 'the-future-ahead', title: 'Looking Forward' }
    ],
    content: `
### The Silicon Plateau Environment

Bangalore (Bengaluru) has earned its reputation as one of the world's most dynamic software hubs. From Indiranagar to Koramangala and the Electronic City corridors, the city’s engineering density is palpable. Here, software is built not in abstract theory, but amidst hyper-competitive real-world deployment challenges.

### Engineering for Variance

Building systems that thrive here demands resilience:
- **Intermittent Connectivity:** Users transition between fiber gigabit connections and spotty subterranean mobile data. Systems must support idempotent sync and optimistic local state mutations.
- **Resource Constraints:** Applications must respect device memory budgets and avoid draining battery life with ceaseless polling.
- **Scale Surges:** Traffic spikes during peak urban commute hours or nationwide events test API rate limiters and database concurrency pools.

### Looking Forward

The ethos that emerges from this landscape is clear: simplicity, fault tolerance, and unyielding respect for the user’s device resources.
    `
  }
];

export const SEO_CONFIG = {
  title: 'Aditya Santhosh — Personal Portfolio & Blog',
  description: 'Minimalist personal portfolio, engineering blog, and performance dashboard for Aditya Santhosh — Bangalore-based software engineer.',
  url: 'https://linkedin.com/in/adityasanthosh006',
  author: 'Aditya Santhosh',
  phone: '+91 7022113229',
  email: 'Adityasanthoshn0@gmail.com',
  location: 'Bangalore, India',
  keywords: [
    'Aditya Santhosh',
    'Software Engineer',
    'Bangalore',
    'Portfolio',
    'High Performance Web',
    'Distributed Systems',
    'Edge Computing',
    'TypeScript',
    'React',
    'Full Stack Engineer'
  ]
};
