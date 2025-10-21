export interface CaseStudyContentSection {
  heading: string;
  body: string[];
}

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
  heroImage?: string;
  metrics?: CaseStudyMetric[];
  contentSections: CaseStudyContentSection[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'wingit-ai-marketplace',
    title: 'WingIt.ai Wingfoil Gear Aggregator',
    summary:
      'Built an aggregator that sits on top of leading wingfoiling marketplaces, layering skill-based filters, curated bundles, and an Ollama + Mistral concierge that surfaces the right kit in seconds.',
    publishedAt: '2024-07-08',
    tags: ['Next.js', 'Supabase', 'Python', 'Playwright', 'Ollama', 'Mistral Large'],
    metrics: [
      { label: 'Conversion rate uplift', value: '+32%' },
      { label: 'Curated gear profiles', value: '18 rider archetypes' },
      { label: 'Inventory coverage', value: '4.5k SKUs' },
    ],
    contentSections: [
      {
        heading: 'Problem',
        body: [
          'Wingfoiling exploded in popularity, but the gear landscape remained fragmented across niche marketplaces and forum listings. Riders bounced between tabs, normalized specs by hand, and struggled to see which bundles made sense for their skill level.',
          'WingIt.ai wanted an aggregator that felt as personal as walking into a pro shop: single search, consistent data, tailored recommendations, and a smarter way to surface demo programs and coaching packages pulled from partner stores.',
        ],
      },
      {
        heading: 'Approach',
        body: [
          'Designed an aggregation layer on Next.js backed by Supabase for normalized product records, partner marketplace metadata, and event-sourced updates. A lightweight edge API delivers near-real-time availability without exposing partner credentials.',
          'Built Python-based scrapers using Playwright and rotating proxies to ingest catalog data from approved marketplaces, then enriched it with computer-vision generated alt text and NLP signals before dropping the output into Supabase.',
          'The Ollama concierge (running Mistral Large) uses retrieval-augmented generation against normalized specs and rider archetypes to recommend quivers based on wind range, weight, and progression goals. Specialty filters—foil size, wing canopy tension, travel weight—plus prompt telemetry dashboards let the team tune workloads without downtime.',
        ],
      },
      {
        heading: 'Impact',
        body: [
          'Time-to-cart dropped from minutes of browsing to under 40 seconds for guided shoppers, and bundle attachment rate jumped to 58% as the assistant recommended complementary foils and leashes.',
          'Retail partners use the shared analytics workspace to see which rider personas convert best, which in turn informed exclusive inventory allocations ahead of peak season.',
          'Support tickets about “what gear should I buy?” fell by 71%, freeing the founders to focus on regional launch partnerships and pro team endorsements.',
        ],
      },
    ],
  },
  {
    slug: 'portfolio-experience-relaunch',
    title: 'Personal Portfolio Growth Engine',
    summary:
      'Relaunched my portfolio into a performant Astro + React experience with narrative case studies, automated Calendly booking, and scroll-aware navigation that lifts inbound conversions.',
    publishedAt: '2024-05-27',
    tags: ['Astro', 'React', 'TailwindCSS', 'Calendly API', 'Plausible'],
    heroImage: '/portfolio-case-study-cover.svg',
    metrics: [
      { label: 'Time to relaunch', value: '12 days' },
      { label: 'Qualified leads lift', value: '+46%' },
      { label: 'Core Web Vitals pass rate', value: '99%' },
    ],
    contentSections: [
      {
        heading: 'Problem',
        body: [
          'The previous site was a static landing page that buried case studies, lacked clear calls-to-action, and took nearly seven seconds to load on mobile—potential clients dropped before seeing any proof of work.',
          'It also forced manual back-and-forth to schedule intro calls, and there was no analytics instrumentation to understand what prospective founders cared about most.',
        ],
      },
      {
        heading: 'Approach',
        body: [
          'Mapped the buyer journey end-to-end, then rebuilt the site on Astro for fast static delivery while using React islands for interactive components like the sprint timeline and Calendly modal.',
          'Created a component library in Tailwind that aligned the brand palette, introduced responsive typography, and added scroll-triggered sections so visitors can navigate directly to process, impact, or work.',
          'Hooked in Plausible analytics, structured data tags, automated sitemap generation, and SEO-friendly case study routes so the content footprint scales without extra tooling.',
        ],
      },
      {
        heading: 'Impact',
        body: [
          'Lead-to-call conversion jumped 46% after launch because key proof points and the booking flow are always one click away, even on mobile.',
          'Average page load dropped under one second, and the site now scores 99+ across Core Web Vitals, unlocking better organic performance.',
          'The modular content system means adding new offers or deep-dives takes minutes, not hours—future sprints fuel the portfolio without code rewrites.',
        ],
      },
    ],
  },
  {
    slug: 'ecommerce-automation',
    title: 'E-commerce Order Automation',
    summary:
      'Integrated n8n workflows to automate order processing, inventory management, and customer notifications, saving 20+ hours weekly.',
    publishedAt: '2023-11-18',
    tags: ['n8n', 'Shopify', 'PostgreSQL', 'APIs'],
    metrics: [
      { label: 'Hours saved weekly', value: '20+' },
      { label: 'Order accuracy', value: '99.4%' },
      { label: 'Manual touchpoints', value: '-80%' },
    ],
    contentSections: [
      {
        heading: 'Problem',
        body: [
          'A boutique watersports brand struggled to keep up with order volume during seasonal spikes. Inventory, fulfillment, and customer messaging lived in disconnected systems, forcing nightly spreadsheet reconciliations.',
          'VIP customers were missing restock alerts, and partner warehouses had no live view into bundle availability—leading to costly split shipments and refunds.',
        ],
      },
      {
        heading: 'Approach',
        body: [
          'Mapped every operational handoff from checkout to last-mile updates, scoring each touchpoint by automation readiness and customer impact.',
          'Implemented n8n to orchestrate Shopify events, 3PL APIs, and a lightweight PostgreSQL ledger that keeps inventory and purchase orders in sync across channels.',
          'Introduced proactive customer notifications with guardrails—SMS, email, and WhatsApp fallbacks fire automatically, while exceptions trigger human review queues.',
        ],
      },
      {
        heading: 'Impact',
        body: [
          'The operations team reclaimed 22 hours each week, reinvesting the time into wholesale partnerships and community events.',
          'Stockouts and double-shipped orders virtually disappeared because every channel reads from the same source of truth.',
          'Customers rave about proactive updates, helping increase repeat purchase rate by 14% in the first quarter after launch.',
        ],
      },
    ],
  },
];
