export interface LocalizedString {
  en: string;
  fr: string;
}

export interface SchemaConfig {
  nodes: Array<{
    id: string;
    label: string;
    type?: 'source' | 'process' | 'destination' | 'default';
  }>;
  connections: Array<{
    from: string;
    to: string;
    label?: string;
  }>;
  title?: string;
}

export interface CaseStudyContentSection {
  heading: LocalizedString;
  body: LocalizedString[];
  schemaConfig?: SchemaConfig;
}

export interface CaseStudyMetric {
  label: LocalizedString;
  value: LocalizedString;
}

export interface CaseStudy {
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  publishedAt: string;
  tags: string[];
  heroImage?: string;
  metrics?: CaseStudyMetric[];
  contentSections: CaseStudyContentSection[];
}

const localized = (en: string, fr: string): LocalizedString => ({ en, fr });

export const caseStudies: CaseStudy[] = [
  {
    slug: 'cloud-reconciliation-agent',
    title: localized(
      'Cloud Reconciliation Agent — Eliminating Hidden Infrastructure Costs',
      "Agent de rapprochement cloud — éliminer les coûts d’infrastructure cachés",
    ),
    heroImage: '/cloud_reconciliation.png',
    summary: localized(
      'Built an automated reconciliation system using Python and Temporal.io to align client sales references with the actual deployed cloud infrastructure. The agent detected unbilled or orphaned resources in real time, preventing multi-million-euro losses.',
      'Développement d’un système de rapprochement automatisé avec Python et Temporal.io pour aligner les références commerciales clients sur l’infrastructure cloud effectivement déployée. L’agent détecte en temps réel les ressources non facturées ou orphelines et évite des pertes de plusieurs millions d’euros.',
    ),
    publishedAt: '2024-10-10',
    tags: ['Python', 'Temporal.io', 'Cloud Infrastructure', 'Automation', 'Cost Optimization'],
    metrics: [
      {
        label: localized('Revenue leakage prevented', 'Fuite de revenus évitée'),
        value: localized('€2M+ annually', 'Plus de 2 M€ par an'),
      },
      {
        label: localized('Detection frequency', 'Fréquence de détection'),
        value: localized('Daily sync cycles', 'Synchronisation quotidienne'),
      },
      {
        label: localized('Divergence resolution automation', 'Automatisation de la résolution des écarts'),
        value: localized('100%', '100 %'),
      },
    ],
    contentSections: [
      {
        heading: localized('Problem', 'Problème'),
        body: [
          localized(
            'The reference data for client subscriptions often diverged from the actual state of the deployed cloud infrastructure. Some clients retained access to active compute and storage resources that were no longer listed in the sales system.',
            'Les données de référence des abonnements clients divergeaient souvent de l’état réel de l’infrastructure cloud déployée. Certains clients conservaient l’accès à des ressources de calcul et de stockage actives qui n’étaient plus répertoriées dans le système commercial.',
          ),
          localized(
            'This mismatch led to substantial unbilled usage and inefficiencies in cost tracking, resulting in millions of euros in annual losses and heavy manual reconciliation work for the ops and billing teams.',
            'Ces écarts engendraient une consommation non facturée importante et des difficultés de suivi des coûts, avec à la clé des pertes annuelles de plusieurs millions d’euros et un rapprochement manuel très lourd pour les équipes opérations et facturation.',
          ),
        ],
      },
      {
        heading: localized('Approach', 'Approche'),
        body: [
          localized(
            'Designed a Python-based reconciliation agent orchestrated with Temporal.io to automatically cross-check client references against live infrastructure states.',
            'Conception d’un agent de rapprochement en Python orchestré avec Temporal.io pour croiser automatiquement les références clients avec l’état réel de l’infrastructure.',
          ),
          localized(
            'The system ran daily sync workflows that detected and flagged discrepancies, automatically classifying them as “orphaned,” “unbilled,” or “mismatched” resources.',
            'Le système exécutait des workflows quotidiens qui détectaient et classaient les écarts comme ressources « orphelines », « non facturées » ou « incohérentes ».',
          ),
          localized(
            'Integrated alerting and reporting to internal dashboards so financial and ops teams could act immediately—or trigger automated cleanup and billing adjustments when safe to do so.',
            'Intégration d’alertes et de rapports dans les tableaux de bord internes pour permettre aux équipes finance et opérations d’agir immédiatement ou de déclencher un nettoyage automatisé et des ajustements de facturation lorsque c’était possible.',
          ),
        ],
        schemaConfig: {
          title: 'Reconciliation Workflow',
          nodes: [
            { id: 'sales', label: 'Sales System\n(Client References)', type: 'source' },
            { id: 'infra', label: 'Cloud Infrastructure\n(Live State)', type: 'source' },
            { id: 'agent', label: 'Reconciliation Agent\n(Temporal.io)', type: 'process' },
            { id: 'classify', label: 'Classification Engine\n(Orphaned/Unbilled)', type: 'process' },
            { id: 'dashboard', label: 'Internal Dashboard\n(Alerts & Reports)', type: 'destination' },
          ],
          connections: [
            { from: 'sales', to: 'agent', label: 'Client data' },
            { from: 'infra', to: 'agent', label: 'Infrastructure state' },
            { from: 'agent', to: 'classify', label: 'Detected discrepancies' },
            { from: 'classify', to: 'dashboard', label: 'Classified issues' },
          ],
        },
      },
      {
        heading: localized('Impact', 'Impact'),
        body: [
          localized(
            'Eliminated recurring revenue leakage by automatically identifying and resolving infrastructure discrepancies before billing cycles closed.',
            'Suppression des fuites de revenus récurrentes en identifiant et en résolvant automatiquement les divergences d’infrastructure avant la clôture des cycles de facturation.',
          ),
          localized(
            'Reduced manual auditing and data reconciliation to near-zero, freeing engineers to focus on proactive infrastructure optimization.',
            'Réduction quasi totale des audits et rapprochements manuels, libérant les ingénieurs pour se concentrer sur l’optimisation proactive de l’infrastructure.',
          ),
          localized(
            'Recovered millions of euros in previously lost revenue and established a long-term safeguard against untracked cloud resource drift.',
            'Récupération de millions d’euros précédemment perdus et mise en place d’un garde-fou durable contre la dérive des ressources cloud non suivies.',
          ),
        ],
      },
    ],
  },
  {
    slug: 'radar-ops-automation',
    title: localized(
      'Radar — Automated Worker Matching for On-Demand Staffing',
      'Radar — mise en relation automatisée des travailleurs pour l’intérim à la demande',
    ),
    summary: localized(
      'Designed and shipped a feature that let the operations team automatically surface qualified worker profiles for last-minute missions in the food industry. The system replaced 50+ hours of manual search and outreach per week with an automated pipeline powered by Go, React, and Customer.io.',
      'Conception et livraison d’une fonctionnalité permettant à l’équipe opérations d’identifier automatiquement les profils qualifiés pour des missions de dernière minute dans l’agroalimentaire. Le système a remplacé plus de 50 heures de recherche et d’outreach manuels par semaine par un pipeline automatisé propulsé par Go, React et Customer.io.',
    ),
    publishedAt: '2024-03-18',
    tags: ['Go', 'React', 'Customer.io', 'Automation', 'Operations'],
    heroImage: '/radar_staffing.png',
    metrics: [
      {
        label: localized('Ops workload reduction', 'Réduction de la charge ops'),
        value: localized('−95%', '−95 %'),
      },
      {
        label: localized('Weekly time saved', 'Temps hebdomadaire économisé'),
        value: localized('≈47 hours', '≈47 heures'),
      },
      {
        label: localized('Notification automation rate', 'Taux d’automatisation des notifications'),
        value: localized('100%', '100 %'),
      },
    ],
    contentSections: [
      {
        heading: localized('Problem', 'Problème'),
        body: [
          localized(
            'The operations team was responsible for sourcing and confirming workers for last-minute food industry missions—sometimes 50 to 60 profiles in under 24 hours.',
            'L’équipe opérations devait sourcer et confirmer des travailleurs pour des missions de dernière minute dans l’agroalimentaire — parfois 50 à 60 profils en moins de 24 heures.',
          ),
          localized(
            'The manual process of browsing candidate databases, filtering by domain and price range, and individually contacting each worker consumed over 50 hours per week and often delayed client response times.',
            'Le processus manuel consistant à parcourir la base candidats, filtrer par domaine et fourchette de prix puis contacter individuellement chaque travailleur consommait plus de 50 heures par semaine et retardait les réponses aux clients.',
          ),
        ],
      },
      {
        heading: localized('Approach', 'Approche'),
        body: [
          localized(
            'Built “Radar,” an internal feature that lets ops instantly generate candidate lists based on mission parameters—industry, availability, rate, and experience level—directly from the dashboard.',
            'Création de « Radar », une fonctionnalité interne permettant aux ops de générer instantanément des listes de candidats selon les paramètres de mission — secteur, disponibilité, tarif et niveau d’expérience — directement depuis le tableau de bord.',
          ),
          localized(
            'Implemented a matching engine in Go that filters and ranks profiles in real time, with a React frontend enabling dynamic search and live mission tracking.',
            'Mise en place d’un moteur de matching en Go qui filtre et classe les profils en temps réel, avec une interface React offrant une recherche dynamique et un suivi des missions en direct.',
          ),
          localized(
            'Integrated Customer.io for automated outreach, triggering personalized notifications to workers that match a mission’s requirements and collecting confirmations automatically.',
            'Intégration de Customer.io pour l’outreach automatisé, en déclenchant des notifications personnalisées aux travailleurs correspondant à la mission et en collectant automatiquement les confirmations.',
          ),
        ],
        schemaConfig: {
          title: 'Matching Pipeline',
          nodes: [
            { id: 'dashboard', label: 'Ops Dashboard\n(Mission Parameters)', type: 'source' },
            { id: 'matching', label: 'Matching Engine\n(Go)', type: 'process' },
            { id: 'database', label: 'Worker Database\n(Profiles)', type: 'source' },
            { id: 'customerio', label: 'Customer.io\n(Notifications)', type: 'process' },
            { id: 'workers', label: 'Workers\n(Confirmations)', type: 'destination' },
          ],
          connections: [
            { from: 'dashboard', to: 'matching', label: 'Mission criteria' },
            { from: 'database', to: 'matching', label: 'Worker profiles' },
            { from: 'matching', to: 'customerio', label: 'Matched candidates' },
            { from: 'customerio', to: 'workers', label: 'Personalized notifications' },
          ],
        },
      },
      {
        heading: localized('Impact', 'Impact'),
        body: [
          localized(
            'Reduced weekly manual ops time from 50+ hours to under 3 hours by automating the sourcing and notification process.',
            'Réduction du temps manuel hebdomadaire des ops de plus de 50 heures à moins de 3 heures grâce à l’automatisation du sourcing et des notifications.',
          ),
          localized(
            'Enabled near-instant staffing for urgent client missions, improving responsiveness and reliability across multiple accounts.',
            'Permis un staffing quasi instantané pour les missions urgentes, améliorant la réactivité et la fiabilité sur plusieurs comptes.',
          ),
          localized(
            'Freed the operations team to focus on higher-value relationship management instead of repetitive matching tasks.',
            'Libéré l’équipe opérations pour se concentrer sur la relation client à forte valeur plutôt que sur des tâches répétitives de matching.',
          ),
        ],
      },
    ],
  },
  {
    slug: 'automated-hours-validation',
    title: localized(
      'Automated Hours Validation System for Mission Tracking',
      'Système automatisé de validation des heures pour le suivi de mission',
    ),
    heroImage: '/hours_import.png',
    summary: localized(
      'Developed a smart import and validation system that automated the reconciliation of worker hours across client Excel files, database records, and worker confirmations. The AI-assisted process reduced weekly ops time from 50 hours to under 3 hours.',
      'Développement d’un système intelligent d’import et de validation qui automatise le rapprochement des heures travaillées entre les fichiers Excel clients, la base de données et les confirmations des travailleurs. Le processus assisté par IA a réduit le temps hebdomadaire des ops de 50 heures à moins de 3 heures.',
    ),
    publishedAt: '2024-05-02',
    tags: ['Go', 'Python', 'AI Automation', 'N8n', 'LLM Integration'],
    metrics: [
      {
        label: localized('Ops workload reduction', 'Réduction de la charge ops'),
        value: localized('−94%', '−94 %'),
      },
      {
        label: localized('Weekly time saved', 'Temps hebdomadaire économisé'),
        value: localized('≈47 hours', '≈47 heures'),
      },
      {
        label: localized('File automation accuracy', 'Précision de l’automatisation des fichiers'),
        value: localized('99%+', '99 %+'),
      },
    ],
    contentSections: [
      {
        heading: localized('Problem', 'Problème'),
        body: [
          localized(
            'Large enterprise clients in the food industry submitted mission-hour reports as massive Excel files—sometimes thousands of lines long—listing worker names, dates, and logged hours.',
            'Les grands comptes de l’agroalimentaire transmettaient des relevés d’heures sous forme de fichiers Excel volumineux — parfois des milliers de lignes — avec les noms des travailleurs, les dates et les heures déclarées.',
          ),
          localized(
            'The operations team had to manually input and cross-check every record against internal databases and worker confirmations, consuming over 50 hours per week and leaving room for human error.',
            'L’équipe opérations devait saisir et recouper manuellement chaque enregistrement avec les bases internes et les confirmations des travailleurs, ce qui prenait plus de 50 heures par semaine et laissait la place aux erreurs humaines.',
          ),
        ],
      },
      {
        heading: localized('Approach', 'Approche'),
        body: [
          localized(
            'Built an automated import and validation system allowing clients to directly upload their hour tracking files through a secure interface.',
            'Mise en place d’un système d’import et de validation automatisé permettant aux clients de téléverser directement leurs fichiers de suivi des heures via une interface sécurisée.',
          ),
          localized(
            'Implemented a Go and Python backend pipeline that parsed, matched, and verified data against internal mission records, flagging inconsistencies for review.',
            'Développement d’un pipeline backend en Go et Python qui analyse, rapproche et vérifie les données avec les missions internes, en signalant les incohérences à corriger.',
          ),
          localized(
            'Integrated an LLM-based reformatter via N8n to automatically correct or normalize column structures, date formats, and field naming before ingestion.',
            'Intégration d’un reformatteur basé sur un LLM via n8n pour corriger ou normaliser automatiquement la structure des colonnes, les formats de date et les libellés avant ingestion.',
          ),
          localized(
            'Developed a parallel worker-facing interface so each worker could directly confirm or correct their hours, removing the need for manual ops intervention.',
            'Déploiement d’une interface dédiée aux travailleurs pour qu’ils confirment ou corrigent directement leurs heures, supprimant l’intervention manuelle des ops.',
          ),
        ],
        schemaConfig: {
          title: 'Validation Flow',
          nodes: [
            { id: 'client', label: 'Client Upload\n(Excel Files)', type: 'source' },
            { id: 'llm', label: 'LLM Reformatter\n(N8n)', type: 'process' },
            { id: 'pipeline', label: 'Validation Pipeline\n(Go/Python)', type: 'process' },
            { id: 'database', label: 'Mission Database\n(Internal Records)', type: 'source' },
            { id: 'workers', label: 'Worker Interface\n(Confirmations)', type: 'destination' },
          ],
          connections: [
            { from: 'client', to: 'llm', label: 'Raw files' },
            { from: 'llm', to: 'pipeline', label: 'Normalized data' },
            { from: 'database', to: 'pipeline', label: 'Mission records' },
            { from: 'pipeline', to: 'workers', label: 'Hours to confirm' },
          ],
        },
      },
      {
        heading: localized('Impact', 'Impact'),
        body: [
          localized(
            'Reduced weekly manual input time from 50+ hours to under 3 hours, limiting human intervention only to conflict resolution.',
            'Réduction du temps de saisie manuel de plus de 50 heures à moins de 3 heures, en ne mobilisant les équipes que pour résoudre les conflits.',
          ),
          localized(
            'Increased validation accuracy and reduced payroll discrepancies through automated reconciliation and cross-check logic.',
            'Amélioration de la précision des validations et réduction des écarts de paie grâce au rapprochement et aux contrôles automatisés.',
          ),
          localized(
            'Freed operations bandwidth to focus on strategic client relationships and scaling mission volume without adding headcount.',
            'Libération de la capacité des ops pour se concentrer sur la relation client stratégique et absorber plus de volume sans recruter.',
          ),
        ],
      },
    ],
  },
  {
    slug: 'real-time-retail-pricing',
    title: localized(
      'Real-Time Retail Pricing Data Analyst — Competitive Intelligence for French Food Retail',
      'Analyste de données de prix en temps réel — intelligence concurrentielle pour la grande distribution alimentaire française',
    ),
    summary: localized(
      'Built a real-time competitive pricing intelligence system for the French food retail market. The platform automatically scrapes competitor websites, processes pricing data, and delivers actionable insights through an interactive dashboard, saving €50K+ monthly through optimized pricing strategies.',
      'Développement d\'un système d\'intelligence concurrentielle des prix en temps réel pour le marché français de la grande distribution alimentaire. La plateforme scrape automatiquement les sites concurrents, traite les données de prix et fournit des insights actionnables via un tableau de bord interactif, économisant plus de 50 K€ par mois grâce à des stratégies de prix optimisées.',
    ),
    publishedAt: '2024-08-15',
    tags: ['Python', 'Web Scraping', 'Data Analytics', 'Dashboards', 'Competitive Intelligence'],
    heroImage: '/intermarche.png',
    metrics: [
      {
        label: localized('Monthly savings through pricing optimization', 'Économies mensuelles via optimisation des prix'),
        value: localized('€50K+', 'Plus de 50 K€'),
      },
      {
        label: localized('Weekly time saved on market research', 'Temps hebdomadaire économisé en veille marché'),
        value: localized('40+ hours', 'Plus de 40 heures'),
      },
      {
        label: localized('Data freshness', 'Fraîcheur des données'),
        value: localized('Real-time (4h cycles)', 'Temps réel (cycles de 4h)'),
      },
    ],
    contentSections: [
      {
        heading: localized('Problem', 'Problème'),
        body: [
          localized(
            'A major French food retailer needed to stay competitive in a fast-moving market where pricing strategies directly impact margins and customer loyalty.',
            'Un acteur majeur de la grande distribution alimentaire française devait rester compétitif dans un marché dynamique où les stratégies de prix impactent directement les marges et la fidélité client.',
          ),
          localized(
            'The manual process of tracking competitor prices across multiple chains and thousands of SKUs consumed over 40 hours per week and often resulted in outdated insights by the time decisions were made.',
            'Le processus manuel de suivi des prix concurrents sur plusieurs enseignes et milliers de références consommait plus de 40 heures par semaine et aboutissait souvent à des insights obsolètes au moment de la prise de décision.',
          ),
        ],
      },
      {
        heading: localized('Approach', 'Approche'),
        body: [
          localized(
            'Designed and deployed a fully automated web scraping system targeting major French food retail competitors (Carrefour, Leclerc, Auchan, etc.).',
            'Conception et déploiement d\'un système de scraping web entièrement automatisé ciblant les principaux concurrents de la grande distribution alimentaire française (Carrefour, Leclerc, Auchan, etc.).',
          ),
          localized(
            'Built a Python-based data processing pipeline that normalizes, deduplicates, and enriches pricing data, matching products across different retailer catalogs.',
            'Développement d\'un pipeline de traitement de données en Python qui normalise, déduplique et enrichit les données de prix, en rapprochant les produits entre les catalogues des différentes enseignes.',
          ),
          localized(
            'Created an interactive dashboard with real-time visualizations, price trend analysis, and automated alerts for significant competitor price changes.',
            'Création d\'un tableau de bord interactif avec visualisations en temps réel, analyse des tendances de prix et alertes automatisées pour les changements de prix significatifs chez les concurrents.',
          ),
        ],
        schemaConfig: {
          title: 'Data Flow Architecture',
          nodes: [
            { id: 'competitors', label: 'Competitor Websites\n(Carrefour, Leclerc, etc.)', type: 'source' },
            { id: 'scraper', label: 'Web Scraper\n(Python)', type: 'process' },
            { id: 'processor', label: 'Data Processor\n(Normalization)', type: 'process' },
            { id: 'database', label: 'Pricing Database\n(Historical Data)', type: 'destination' },
            { id: 'dashboard', label: 'Analytics Dashboard\n(Insights)', type: 'destination' },
          ],
          connections: [
            { from: 'competitors', to: 'scraper', label: 'Product pages' },
            { from: 'scraper', to: 'processor', label: 'Raw pricing data' },
            { from: 'processor', to: 'database', label: 'Normalized records' },
            { from: 'database', to: 'dashboard', label: 'Trend analysis' },
          ],
        },
      },
      {
        heading: localized('Impact', 'Impact'),
        body: [
          localized(
            'Enabled data-driven pricing decisions that recovered €50K+ monthly through competitive positioning and margin optimization.',
            'Permis des décisions de prix basées sur les données qui ont récupéré plus de 50 K€ par mois grâce au positionnement concurrentiel et à l\'optimisation des marges.',
          ),
          localized(
            'Reduced manual market research time from 40+ hours to near-zero, freeing the pricing team to focus on strategic analysis rather than data collection.',
            'Réduction du temps de veille marché manuel de plus de 40 heures à quasi zéro, libérant l\'  équipe pricing pour se concentrer sur l\'analyse stratégique plutôt que la collecte de données.',
          ),
          localized(
            'Provided real-time competitive intelligence with 4-hour refresh cycles, enabling rapid response to market changes and promotional activities.',
            'Fourniture d\'intelligence concurrentielle en temps réel avec des cycles de rafraîchissement de 4 heures, permettant une réponse rapide aux changements de marché et aux activités promotionnelles.',
          ),
        ],
      },
    ],
  },
];
