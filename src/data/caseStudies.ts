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
  slug: 'cloud-reconciliation-agent',
  title: 'Cloud Reconciliation Agent — Eliminating Hidden Infrastructure Costs',
  heroImage: '/cloud_reconciliation.png',
  summary:
    'Built an automated reconciliation system using Python and Temporal.io to align client sales references with the actual deployed cloud infrastructure. The agent detected unbilled or orphaned resources in real time, preventing multi-million-euro losses.',
  publishedAt: '2024-10-10',
  tags: ['Python', 'Temporal.io', 'Cloud Infrastructure', 'Automation', 'Cost Optimization'],
  metrics: [
    { label: 'Revenue leakage prevented', value: '€2M+ annually' },
    { label: 'Detection frequency', value: 'Daily sync cycles' },
    { label: 'Divergence resolution automation', value: '100%' },
  ],
  contentSections: [
    {
      heading: 'Problem',
      body: [
        'The reference data for client subscriptions often diverged from the actual state of the deployed cloud infrastructure. Some clients retained access to active compute and storage resources that were no longer listed in the sales system.',
        'This mismatch led to substantial unbilled usage and inefficiencies in cost tracking, resulting in millions of euros in annual losses and heavy manual reconciliation work for the ops and billing teams.',
      ],
    },
    {
      heading: 'Approach',
      body: [
        'Designed a Python-based reconciliation agent orchestrated with Temporal.io to automatically cross-check client references against live infrastructure states.',
        'The system ran daily sync workflows that detected and flagged discrepancies, automatically classifying them as “orphaned,” “unbilled,” or “mismatched” resources.',
        'Integrated alerting and reporting to internal dashboards so financial and ops teams could act immediately—or trigger automated cleanup and billing adjustments when safe to do so.',
      ],
    },
    {
      heading: 'Impact',
      body: [
        'Eliminated recurring revenue leakage by automatically identifying and resolving infrastructure discrepancies before billing cycles closed.',
        'Reduced manual auditing and data reconciliation to near-zero, freeing engineers to focus on proactive infrastructure optimization.',
        'Recovered millions of euros in previously lost revenue and established a long-term safeguard against untracked cloud resource drift.',
      ],
    },
  ],
},
  {
  slug: 'radar-ops-automation',
  title: 'Radar — Automated Worker Matching for On-Demand Staffing',
  summary:
    'Designed and shipped a feature that let the operations team automatically surface qualified worker profiles for last-minute missions in the food industry. The system replaced 50+ hours of manual search and outreach per week with an automated pipeline powered by Go, React, and Customer.io.',
  publishedAt: '2024-03-18',
  tags: ['Go', 'React', 'Customer.io', 'Automation', 'Operations'],
  heroImage: '/radar_staffing.png',
  metrics: [
    { label: 'Ops workload reduction', value: '−95%' },
    { label: 'Weekly time saved', value: '≈47 hours' },
    { label: 'Notification automation rate', value: '100%' },
  ],
  contentSections: [
    {
      heading: 'Problem',
      body: [
        'The operations team was responsible for sourcing and confirming workers for last-minute food industry missions—sometimes 50 to 60 profiles in under 24 hours.',
        'The manual process of browsing candidate databases, filtering by domain and price range, and individually contacting each worker consumed over 50 hours per week and often delayed client response times.',
      ],
    },
    {
      heading: 'Approach',
      body: [
        'Built “Radar,” an internal feature that lets ops instantly generate candidate lists based on mission parameters—industry, availability, rate, and experience level—directly from the dashboard.',
        'Implemented a matching engine in Go that filters and ranks profiles in real time, with a React frontend enabling dynamic search and live mission tracking.',
        'Integrated Customer.io for automated outreach, triggering personalized notifications to workers that match a mission’s requirements and collecting confirmations automatically.',
      ],
    },
    {
      heading: 'Impact',
      body: [
        'Reduced weekly manual ops time from 50+ hours to under 3 hours by automating the sourcing and notification process.',
        'Enabled near-instant staffing for urgent client missions, improving responsiveness and reliability across multiple accounts.',
        'Freed the operations team to focus on higher-value relationship management instead of repetitive matching tasks.',
      ],
    },
  ],
},
  {
  slug: 'automated-hours-validation',
  title: 'Automated Hours Validation System for Mission Tracking',
  heroImage: '/hours_import.png',
  summary:
    'Developed a smart import and validation system that automated the reconciliation of worker hours across client Excel files, database records, and worker confirmations. The AI-assisted process reduced weekly ops time from 50 hours to under 3 hours.',
  publishedAt: '2024-05-02',
  tags: ['Go', 'Python', 'AI Automation', 'N8n', 'LLM Integration'],
  metrics: [
    { label: 'Ops workload reduction', value: '−94%' },
    { label: 'Weekly time saved', value: '≈47 hours' },
    { label: 'File automation accuracy', value: '99%+' },
  ],
  contentSections: [
    {
      heading: 'Problem',
      body: [
        'Large enterprise clients in the food industry submitted mission-hour reports as massive Excel files—sometimes thousands of lines long—listing worker names, dates, and logged hours.',
        'The operations team had to manually input and cross-check every record against internal databases and worker confirmations, consuming over 50 hours per week and leaving room for human error.',
      ],
    },
    {
      heading: 'Approach',
      body: [
        'Built an automated import and validation system allowing clients to directly upload their hour tracking files through a secure interface.',
        'Implemented a Go and Python backend pipeline that parsed, matched, and verified data against internal mission records, flagging inconsistencies for review.',
        'Integrated an LLM-based reformatter via N8n to automatically correct or normalize column structures, date formats, and field naming before ingestion.',
        'Developed a parallel worker-facing interface so each worker could directly confirm or correct their hours, removing the need for manual ops intervention.',
      ],
    },
    {
      heading: 'Impact',
      body: [
        'Reduced weekly manual input time from 50+ hours to under 3 hours, limiting human intervention only to conflict resolution.',
        'Increased validation accuracy and reduced payroll discrepancies through automated reconciliation and cross-check logic.',
        'Freed operations bandwidth to focus on strategic client relationships and scaling mission volume without adding headcount.',
      ],
    },
  ],
},
];
