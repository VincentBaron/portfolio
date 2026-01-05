export type Language = 'en' | 'fr';

// ============================================================================
// MULTILINGUAL CONTENT (Language keys within each item)
// ============================================================================

// Testimonials with multilingual content
export interface Testimonial {
  quote: Record<Language, string>;
  author: string;
  role: Record<Language, string>;
  image: string;
  alt: Record<Language, string>;
}

export const testimonials: Testimonial[] = [
  {
    quote: {
      en: 'Vincent improved our internal tools and workflows, helping the Ops team save significant time on daily processes.',
      fr: 'Vincent a amélioré nos outils internes et nos workflows, permettant à l\'équipe Ops de gagner un temps considérable au quotidien. Son focus en efficacité opérationnelle a eu un impact direct sur notre delivery.',
    },
    author: 'Holy Sicard-Razaka',
    role: {
      en: 'Head of Product @ Randstad',
      fr: 'Head of Product chez Side',
    },
    image: '/holy.jpeg',
    alt: {
      en: 'Holy Sicard-Razaka, Head of Product at Randstads',
      fr: 'Holy Sicard-Razaka, Head of Product chez Randstads',
    },
  },
  {
    quote: {
      en: 'Vincent built automations to sync product releases between tech and product — including Slack posts and GitLab updates.',
      fr: 'Vincent a mis en place des automatisations pour synchroniser les sorties produit entre la tech et le produit — Slack, GitLab, etc. Cela a fluidifié notre delivery et réduit la coordination manuelle.',
    },
    author: 'Alexis Doroszkiewicz',
    role: {
      en: 'Full-Stack Developer @ Side',
      fr: 'Développeur full-stack chez Side',
    },
    image: '/alexis.jpeg',
    alt: {
      en: 'Alexis Doroszkiewicz, Full-Stack Developer at Side',
      fr: 'Alexis Doroszkiewicz, développeur full-stack chez Side',
    },
  },
  {
    quote: {
      en: 'Vincent\'s work on optimising our internal processes was crucial for expanding our platform\'s capabilities.',
      fr: 'Vincent s\'est montré très efficace pour naviguer dans notre environnement microservices et assurer une implémentation fluide. Son travail a été crucial pour étendre les capacités de notre plateforme.',
    },
    author: 'Guillaume Forgue',
    role: {
      en: 'Lead Developer @ Qomon',
      fr: 'Lead developer chez Qomon',
    },
    image: '/guillaume.jpeg',
    alt: {
      en: 'Guillaume Forgue, Lead Developer at Qomon',
      fr: 'Guillaume Forgue, lead developer chez Qomon',
    },
  },
];

// Package items with multilingual content
export interface PackageItem {
  id: number;
  name: string;
  shortDescription: Record<Language, string>;
  description: Record<Language, string>;
  outputs: Record<Language, string[]>;
  price: Record<Language, string>;
  creditNote?: Record<Language, string>;
}

export const packageItems: PackageItem[] = [
  {
    id: 1,
    name: 'ScanDino',
    shortDescription: {
      en: 'Deep dive into your operational bottlenecks',
      fr: 'Analyse approfondie de vos goulets d\'étranglement opérationnels',
    },
    description: {
      en: '• Map your entire operational structure and tool stack\n• Identify exact bottlenecks causing "tool fatigue"\n• Get prioritized roadmap ranked by business impact',
      fr: '• Cartographie de toute votre structure opérationnelle et pile d\'outils\n• Identification des goulets d\'étranglement causant la "fatigue des outils"\n• Feuille de route priorisée selon l\'impact business',
    },
    outputs: {
      en: [
        'Operational Map: A visual breakdown of your current friction points.',
        'Prioritized Roadmap: Opportunities ranked by business impact (Time-to-Hire, Cost-per-Hire).',
        'ROI Business Case: Quantification of operational waste transformed into a clear implementation plan.'
      ],
      fr: [
        'Cartographie Opérationnelle : Une visualisation de vos points de friction actuels.',
        'Feuille de Route Priorisée : Opportunités classées par impact business (Time-to-Hire, Cost-per-Hire).',
        'Business Case ROI : Quantification du gaspillage opérationnel transformé en plan d\'implémentation clair.'
      ],
    },
    price: {
      en: '€3,000',
      fr: '€3,000',
    },
    creditNote: {
      en: '100% credit from 1st implementation later',
      fr: 'Crédit 100% sur la 1ère implémentation',
    },
  },
  {
    id: 3,
    name: 'HuntDino',
    shortDescription: {
      en: 'AI-driven lead engine: 1 mandate per 3 calls',
      fr: 'Moteur de leads IA : 1 mandat pour 3 appels',
    },
    description: {
      en: '• Scans competitor job listings to identify real end clients\n• Converts 1 mandate per 3 calls (vs. 1 per 100 traditionally)\n• Plugs directly into your CRM\n• Designed for revenue per call, not activity metrics',
      fr: '• Scanne les offres d\'emploi concurrentes pour identifier les vrais clients finaux\n• Convertit 1 mandat pour 3 appels (vs 1 pour 100 traditionnellement)\n• S\'intègre directement dans votre CRM\n• Conçu pour le revenu par appel, pas les métriques d\'activité',
    },
    outputs: {
      en: [
        'Demand-Triggered Lead Engine: Automatically identifies companies already spending on your competitors, turning job posts into high-intent entry points rather than speculative cold calls.',
        '33× Mandate Conversion Uplift: Moves performance from 1 mandate per 100 cold calls to 1 per 3 calls, slashing call volume while increasing pipeline reliability.',
        'Competitive Spend Intelligence: Reveals where competitors are actively placing talent, exposing who is buying, right now, and in which domains.',
        'Revenue-Driven Pipeline Control: Transforms sourcing into a measurable, forecastable funnel — enabling you to scale revenue by improving probabilities, not by burning more leads.'
      ],
      fr: [
        'Moteur de Leads Déclenché par la Demande : Identifie automatiquement les entreprises qui dépensent déjà chez vos concurrents, transformant les offres d\'emploi en points d\'entrée à fort potentiel plutôt qu\'en appels à froid spéculatifs.',
        'Augmentation de 33× du Taux de Conversion : Fait passer les performances de 1 mandat pour 100 appels à froid à 1 pour 3 appels, réduisant drastiquement le volume d\'appels tout en augmentant la fiabilité du pipeline.',
        'Intelligence des Dépenses Concurrentielles : Révèle où les concurrents placent activement des talents, exposant qui achète, maintenant, et dans quels domaines.',
        'Contrôle du Pipeline Axé sur le Revenu : Transforme le sourcing en un entonnoir mesurable et prévisible — vous permettant d\'augmenter les revenus en améliorant les probabilités, et non en brûlant plus de leads.'
      ],
    },
    price: {
      en: '€3,000 Setup',
      fr: '€3,000 Installation',
    },
  },
  {
    id: 4,
    name: 'GuardDino',
    shortDescription: {
      en: 'Protect your client relationships from competitors',
      fr: 'Protégez vos relations clients de la concurrence',
    },
    description: {
      en: '• Continuously monitors your job listings for reverse-sourcing vulnerabilities\n• Provides automated recommendations to shield client identities while maintaining candidate appeal',
      fr: '• Surveille en continu vos offres d\'emploi pour détecter les vulnérabilités de reverse-sourcing\n• Fournit des recommandations automatisées pour protéger les identités des clients tout en maintenant l\'attrait pour les candidats',
    },
    outputs: {
      en: [
        'Vulnerability Report: Analysis of which listings reveal too much client data.',
        'Optimization Playbook: Guidelines for writing listings that attract talent without leaking client identities.'
      ],
      fr: [
        'Rapport de Vulnérabilité : Analyse des offres qui révèlent trop de données clients.',
        'Guide d\'Optimisation : Recommandations pour rédiger des offres qui attirent les talents sans divulguer les identités des clients.'
      ],
    },
    price: {
      en: '€3,000 Setup',
      fr: '€3,000 Installation',
    },
  },
  {
    id: 5,
    name: 'SprintDino',
    shortDescription: {
      en: 'Production-ready custom solutions in weeks',
      fr: 'Solutions sur mesure prêtes pour la production en quelques semaines',
    },
    description: {
      en: '• Month-long sprint delivering a new production feature every week\n• Four complete features with comprehensive training and documentation',
      fr: '• Sprint d\'un mois livrant une nouvelle fonctionnalité de production chaque semaine\n• Quatre fonctionnalités complètes avec formation et documentation complètes',
    },
    outputs: {
      en: [
        'Custom Deliverable: Could include an AI matching engine (Radar), automated billing pipelines, or custom ATS/CRM integrations.',
        'System Documentation: Full hand-over of the new workflow or tool.'
      ],
      fr: [
        'Livrable Sur Mesure : Peut inclure un moteur de matching IA (Radar), des pipelines de facturation automatisés ou des intégrations ATS/CRM personnalisées.',
        'Documentation Système : Transfert complet du nouveau workflow ou outil.'
      ],
    },
    price: {
      en: 'ROI-Based',
      fr: 'Basé sur ROI',
    },
  },
  {
    id: 6,
    name: 'ProDino',
    shortDescription: {
      en: 'Ongoing operational excellence & automation',
      fr: 'Excellence opérationnelle continue et automatisation',
    },
    description: {
      en: '• Fractional COO continuously improving and evolving your existing systems\n• Proactive maintenance and fine-tuning of all automations and workflows\n• Bi-weekly team retrospective workshops to drive continuous improvement',
      fr: '• COO fractionné améliorant et faisant évoluer continuellement vos systèmes existants\n• Maintenance proactive et ajustement de toutes les automatisations et workflows\n• Ateliers rétrospectifs d\'équipe bihebdomadaires pour favoriser l\'amélioration continue',
    },
    outputs: {
      en: [
        'Monthly Optimization: Continuous refinement of workflows and AI agents.',
        'Team Onboarding & Training: Managing tool provisioning and internal knowledge bases (Notion).',
        'Performance Tracking: Implementation of formal KPI dashboards (Time-to-Hire, etc.).'
      ],
      fr: [
        'Optimisation Mensuelle : Raffinement continu des workflows et agents IA.',
        'Onboarding et Formation d\'Équipe : Gestion de l\'approvisionnement en outils et des bases de connaissances internes (Notion).',
        'Suivi des Performances : Mise en place de tableaux de bord KPI formels (Time-to-Hire, etc.).'
      ],
    },
    price: {
      en: '€5,000 / Month',
      fr: '5 000 € / Mois',
    },
  },
];

// ============================================================================
// STATIC TRANSLATIONS (Simple key-value per language)
// ============================================================================

export interface Translations {
  // Header
  header: {
    nav: {
      home: string;
      packages: string;
      work: string;
    };
    bookCall: string;
    logoAria: string;
    mobileOpen: string;
    mobileClose: string;
    toggleMenuAria: string;
  };

  // Hero
  hero: {
    calculator: {
      title: string;
      hoursLabel: string;
      hoursPlaceholder: string;
      peopleLabel: string;
      peoplePlaceholder: string;
      salaryLabel: string;
      salaryPlaceholder: string;
      descriptionLabel: string;
      descriptionPlaceholder: string;
      submitCta: string;
      resultTitle: string;
      monthlyLabel: string;
      annualLabel: string;
      assumption: string;
      currencySymbol: string;
    };
    headline: {
      primary: string;
      secondary: string;
      highlight: string;
    };
    intro: {
      primary: string;
      secondary: string;
    };
    validation: {
      empty: string;
      short: string;
      long: string;
      emailEmpty: string;
      emailInvalid: string;
      missingPainpoint: string;
      submissionFailed: string;
      unexpected: string;
    };
    emailStep: {
      badge: string;
      heading: string;
      capturedLabel: string;
      instructions: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phoneOptional: string;
      phonePlaceholder: string;
      sending: string;
      send: string;
      shareAnother: string;
      unlockHint: string;
      formHint: string;
    };
    emailSubmitted: {
      badge: string;
      headingTemplate: string;
      reviewingLabel: string;
      followUp: string;
      buttons: {
        bookCall: string;
        shareAnother: string;
      };
    };
    testimonialsTitle: string;
    stats: {
      projects: string;
      satisfaction: string;
      sprint: string;
      rating: string;
    };
    companiesTitle: string;
    cta: {
      bookAudit: string;
      calculateCosts: string;
    };
  };

  // Packages
  packages: {
    title: string;
    calculator: {
      title: string;
      hoursLabel: string;
      hoursPlaceholder: string;
      peopleLabel: string;
      peoplePlaceholder: string;
      salaryLabel: string;
      salaryPlaceholder: string;
      descriptionLabel: string;
      descriptionPlaceholder: string;
      calculateCta: string;
      estimatedCost: string;
      monthly: string;
      annually: string;
      assumption: string;
      discussResults: string;
      allFieldsRequired: string;
      positiveValues: string;
    };
    learnMore: string;
    calculate: string;
    bookCall: string;
    before: string;
    after: string;
    efficiency: string;
    viewSampleAnalysis: string;
    viewSampleReport: string;
  };

  // Footer
  footer: {
    rights: string;
    pledgePrefix: string;
    privacy: string;
    terms: string;
  };

  // Case Studies
  caseStudies: {
    title: string;
    readCaseStudy: string;
    startProject: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    header: {
      nav: {
        home: 'Home',
        packages: 'Packages',
        work: 'Work',
      },
      bookCall: 'Book a Call',
      logoAria: '2 Weeks to Solve It - Home',
      mobileOpen: 'Open menu',
      mobileClose: 'Close menu',
      toggleMenuAria: 'Toggle navigation menu',
    },

    hero: {
      calculator: {
        title: 'Back-office manual process cost calculator',
        hoursLabel: 'Hours per person every week',
        hoursPlaceholder: 'e.g. 6',
        peopleLabel: 'People involved',
        peoplePlaceholder: 'e.g. 3',
        salaryLabel: 'Avg gross monthly salary (€)',
        salaryPlaceholder: 'e.g. 4000',
        descriptionLabel: 'Describe the manual process',
        descriptionPlaceholder: 'e.g. Time-tracking validation in the back-office.',
        submitCta: 'Calculate cost impact',
        resultTitle: 'Estimated cost of this manual process',
        monthlyLabel: 'Monthly cost',
        annualLabel: 'Annual cost',
        assumption: 'Assumes a 40h workweek and adds +44% employer charges on top of the gross salary.',
        currencySymbol: '€',
      },
      headline: {
        primary: 'Increase your Net Margin\n',
        secondary: 'Per Recruiter with',
        highlight: 'AI',
      },
      intro: {
        primary: 'Manual recruiting processes drain productivity and compress margins. Profile sourcing, candidate screening, follow-ups, reporting… repetitive tasks that limit your recruiters\' capacity and revenue per head.',
        secondary: 'My approach: identify your highest-impact bottlenecks, quantify the opportunity, then deploy AI systems that amplify each recruiter\'s output and profitability — working alongside your existing tools.',
      },
      validation: {
        empty: 'Please fill in every field to estimate the cost.',
        short: 'All values must be greater than zero.',
        long: 'Please enter realistic values (hours < 80, salary < 50,000).',
        emailEmpty: 'Please provide your email address',
        emailInvalid: 'Please enter a valid email address',
        missingPainpoint: 'Please run the cost calculator before sharing your email.',
        submissionFailed: 'Unable to save your details. Please try again.',
        unexpected: 'Unexpected error while sending your details. Please try again.',
      },
      emailStep: {
        badge: 'Almost there',
        heading: 'Where should I send your back-office audit and ROI breakdown?',
        capturedLabel: 'Manual process details',
        instructions: 'I\'ll review these numbers, challenge assumptions, and reply with system ideas, timelines, and ROI projections.',
        emailLabel: 'Work email',
        emailPlaceholder: 'you@company.com',
        phoneLabel: 'Phone number',
        phoneOptional: '(optional)',
        phonePlaceholder: '+33 7 68 12 34 56',
        sending: 'Sending...',
        send: 'Send it',
        shareAnother: 'Adjust the numbers',
        unlockHint: 'Share your work email and I\'ll send a detailed back-office systems audit with ROI projections (gross salary + 44% employer charges included).',
        formHint: 'I\'ll reply with concrete system and automation ideas tailored to this process.',
      },
      emailSubmitted: {
        badge: 'Check your inbox',
        headingTemplate: 'I\'ll send the audit and implementation plan to {{email}}.',
        reviewingLabel: 'Cost breakdown I\'m reviewing',
        followUp: 'I\'ll send the back-office audit shortly. Feel free to book a call while I dig in.',
        buttons: {
          bookCall: 'Book a 20-min call',
          shareAnother: 'Recalculate another process',
        },
      },
      testimonialsTitle: 'They Trusted Us',
      stats: {
        projects: 'Projects Delivered',
        satisfaction: 'Client Satisfaction',
        sprint: 'Avg Time to Market',
        rating: 'Average Rating',
      },
      companiesTitle: 'Companies we worked with',
      cta: {
        bookAudit: 'Book a Free Audit',
        calculateCosts: 'Calculate Your Costs',
      },
    },

    packages: {
      title: 'Our Packages',
      calculator: {
        title: 'Calculate Your Cost',
        hoursLabel: 'Hours/week',
        hoursPlaceholder: 'e.g. 6',
        peopleLabel: 'People',
        peoplePlaceholder: 'e.g. 3',
        salaryLabel: 'Gross salary/mo (€)',
        salaryPlaceholder: 'e.g. 4000',
        descriptionLabel: 'Process description',
        descriptionPlaceholder: 'e.g. Time-tracking validation',
        calculateCta: 'Calculate Cost',
        estimatedCost: 'Estimated Cost',
        monthly: 'Monthly',
        annually: 'Annually',
        assumption: 'Assumes 40h/week + {{percent}}% employer charges',
        discussResults: 'Discuss My Results',
        allFieldsRequired: 'Please fill in all fields.',
        positiveValues: 'Values must be positive.',
      },
      learnMore: 'Learn more',
      calculate: 'Calculate',
      bookCall: 'Book a Call',
      before: 'Before',
      after: 'After',
      efficiency: 'Efficiency',
      viewSampleAnalysis: 'View Sample Analysis',
      viewSampleReport: 'View Sample Report',
    },

    footer: {
      rights: 'All rights reserved.',
      pledgePrefix: '7.5% of net profit donated to',
      privacy: 'Privacy',
      terms: 'Terms',
    },

    caseStudies: {
      title: 'Case Studies',
      readCaseStudy: 'Read case study',
      startProject: 'Start Your Project',
    },
  },

  fr: {
    header: {
      nav: {
        home: 'Accueil',
        packages: 'Forfaits',
        work: 'Projets',
      },
      bookCall: 'Réserver un appel',
      logoAria: '2 Weeks to Solve It - Accueil',
      mobileOpen: 'Ouvrir le menu',
      mobileClose: 'Fermer le menu',
      toggleMenuAria: 'Basculer le menu de navigation',
    },

    hero: {
      calculator: {
        title: 'Calculez le coût de votre processus manuel de back-office',
        hoursLabel: 'Heures par personne et par semaine',
        hoursPlaceholder: 'ex. 6',
        peopleLabel: 'Nombre de personnes concernées',
        peoplePlaceholder: 'ex. 3',
        salaryLabel: 'Salaire brut mensuel moyen (€)',
        salaryPlaceholder: 'ex. 4000',
        descriptionLabel: 'Décrivez ce processus',
        descriptionPlaceholder: 'ex. Validation des heures d\'intérimaires.',
        submitCta: 'Estimer le coût',
        resultTitle: 'Coût estimé de ce processus manuel',
        monthlyLabel: 'Coût mensuel',
        annualLabel: 'Coût annuel',
        assumption: 'Hypothèse : 40h/semaine + 44 % de charges patronales ajoutées au salaire brut.',
        currencySymbol: '€',
      },
      headline: {
        primary: 'Augmentez votre Marge Net',
        secondary: ' Par Recruteur avec',
        highlight: 'l\'IA',
      },
      intro: {
        primary: 'Ces pertes de temps dans le back-office représentent souvent plusieurs dizaines de milliers d\'euros par an en salaires, retards et opportunités manquées. Devis, relances, saisies, reporting… autant de tâches répétitives qui saturent vos équipes et freinent votre croissance.',
        secondary: 'Mon approche : détecter vos points de friction les plus coûteux, les chiffrer, puis mettre en place un système simple qui libère du temps et de la marge — sans changer vos outils existants.',
      },
      validation: {
        empty: 'Merci de remplir tous les champs pour estimer le coût.',
        short: 'Toutes les valeurs doivent être supérieures à zéro.',
        long: 'Merci d\'entrer des valeurs réalistes (heures < 80, salaire < 50 000).',
        emailEmpty: 'Merci d\'indiquer votre adresse e-mail',
        emailInvalid: 'Merci d\'entrer une adresse e-mail valide',
        missingPainpoint: 'Merci de lancer le calcul avant d\'indiquer votre e-mail.',
        submissionFailed: 'Impossible d\'enregistrer vos informations. Merci de réessayer.',
        unexpected: 'Erreur inattendue lors de l\'envoi de vos informations. Merci de réessayer.',
      },
      emailStep: {
        badge: 'On y est presque',
        heading: 'Où dois-je vous envoyer l\'audit de votre back-office et l\'estimation de ROI ?',
        capturedLabel: 'Détails du processus',
        instructions: 'J\'analyse ces chiffres, je challenge les hypothèses et je vous réponds avec des idées de système, un planning et le ROI attendu.',
        emailLabel: 'Email professionnel',
        emailPlaceholder: 'vous@entreprise.com',
        phoneLabel: 'Numéro de téléphone',
        phoneOptional: '(optionnel)',
        phonePlaceholder: '+33 6 12 34 56 78',
        sending: 'Envoi...',
        send: 'Envoyer',
        shareAnother: 'Ajuster les chiffres',
        unlockHint: 'Partagez votre e-mail pro pour recevoir un audit de votre back-office et le détail du ROI (salaire brut + 44 % de charges).',
        formHint: 'Je vous recontacte avec des idées de systèmes et d\'automatisation adaptées à ce process.',
      },
      emailSubmitted: {
        badge: 'Vérifiez votre boîte mail',
        headingTemplate: 'J\'envoie l\'audit et le plan de mise en œuvre à {{email}}.',
        reviewingLabel: 'Ce que j\'analyse',
        followUp: 'Je vous envoie l\'audit très vite. En attendant, vous pouvez réserver un appel.',
        buttons: {
          bookCall: 'Réserver un appel de 20 minutes',
          shareAnother: 'Recalculer un autre process',
        },
      },
      testimonialsTitle: 'Ils m\'ont fait confiance',
      stats: {
        projects: 'Projets livrés',
        satisfaction: 'Satisfaction client',
        sprint: 'Durée moyenne d\'un sprint',
        rating: 'Note moyenne',
      },
      companiesTitle: 'Entreprises accompagnées',
      cta: {
        bookAudit: 'Réserver un Audit Gratuit',
        calculateCosts: 'Calculer Vos Coûts',
      },
    },

    packages: {
      title: 'Nos Forfaits',
      calculator: {
        title: 'Calculez votre coût',
        hoursLabel: 'Heures/semaine',
        hoursPlaceholder: 'ex. 6',
        peopleLabel: 'Personnes',
        peoplePlaceholder: 'ex. 3',
        salaryLabel: 'Salaire brut/mois (€)',
        salaryPlaceholder: 'ex. 4000',
        descriptionLabel: 'Description du processus',
        descriptionPlaceholder: 'ex. Validation des heures',
        calculateCta: 'Calculer le coût',
        estimatedCost: 'Coût estimé',
        monthly: 'Par mois',
        annually: 'Par an',
        assumption: 'Hypothèse : 40h/semaine + {{percent}}% de charges patronales',
        discussResults: 'Discuter de mes résultats',
        allFieldsRequired: 'Merci de remplir tous les champs.',
        positiveValues: 'Les valeurs doivent être positives.',
      },
      learnMore: 'Voir plus',
      calculate: 'Calculer',
      bookCall: 'Réserver un appel',
      before: 'Avant',
      after: 'Après',
      efficiency: 'Efficacité',
      viewSampleAnalysis: 'Voir l\'exemple d\'analyse',
      viewSampleReport: 'Voir l\'exemple de rapport',
    },

    footer: {
      rights: 'Tous droits réservés.',
      pledgePrefix: '7.5% du bénéfice net reversé à',
      privacy: 'Confidentialité',
      terms: 'Conditions',
    },

    caseStudies: {
      title: 'Études de cas',
      readCaseStudy: 'Voir le projet',
      startProject: 'Lancer votre projet',
    },
  },
};

// Helper function to get translations
export function getTranslations(language: Language): Translations {
  return translations[language];
}
