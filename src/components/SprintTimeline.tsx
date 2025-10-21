import ServicesCTA from './ServicesCTA';
import { useLanguage, type Language } from '../lib/language';

interface TimelineStep {
  days: string;
  title: string;
  description: string;
  expectation: string;
  color: 'blue' | 'purple' | 'pink' | 'indigo';
}

const COPY: Record<Language, {
  heading: string;
  subheading: string;
  steps: TimelineStep[];
  prompt: string;
  ctaLabel: string;
  stepLabel: (current: number, total: number) => string;
}> = {
  en: {
    heading: 'The 2-Week Sprint',
    subheading: 'A proven process that delivers production-ready solutions in 14 days',
    prompt: 'Ready to transform your idea into reality?',
    ctaLabel: 'Start Your Sprint',
    stepLabel: (current, total) => `Step ${current} of ${total}`,
    steps: [
      {
        days: 'Days 1–2',
        title: 'Scope & Plan',
        description:
          'I dive deep into your requirements, define clear deliverables, and create a detailed technical roadmap.',
        expectation: 'Expect: A concrete project plan, architecture decisions, and aligned expectations.',
        color: 'blue',
      },
      {
        days: 'Days 3–10',
        title: 'Build & Iterate',
        description:
          'I build your solution using AI/ML frameworks, and modern best practices. Daily progress updates to keep you in the loop.',
        expectation: 'Expect: Working features, regular demos, and continuous feedback integration.',
        color: 'purple',
      },
      {
        days: 'Days 11–13',
        title: 'Hardening & Testing',
        description:
          'I polish the experience, fix edge cases, conduct thorough testing, and optimize performance for production.',
        expectation: 'Expect: Battle-tested code, performance benchmarks, and deployment-ready artifacts.',
        color: 'pink',
      },
      {
        days: 'Day 14',
        title: 'Handover & Launch',
        description:
          'Complete documentation, deployment support, and knowledge transfer ensure your team can maintain the solution.',
        expectation: 'Expect: Full documentation, deployment guide, and optional training session.',
        color: 'indigo',
      },
    ],
  },
  fr: {
    heading: 'Le sprint de 2 semaines',
    subheading: 'Un processus éprouvé pour livrer une solution prête en 14 jours',
    prompt: 'Prêt à transformer votre idée en réalité ?',
    ctaLabel: 'Lancer votre sprint',
    stepLabel: (current, total) => `Étape ${current} sur ${total}`,
    steps: [
      {
        days: 'Jours 1–2',
        title: 'Cadrage & planification',
        description:
          'J’analyse vos besoins, je définis des livrables clairs et j’établis une feuille de route technique détaillée.',
        expectation: 'Livrables : plan projet concret, décisions d’architecture et attentes alignées.',
        color: 'blue',
      },
      {
        days: 'Jours 3–10',
        title: 'Construction & itérations',
        description:
          'Je développe la solution avec les frameworks IA/ML et les meilleures pratiques modernes. Un point quotidien vous tient informé.',
        expectation: 'Livrables : fonctionnalités opérationnelles, démos régulières et intégration continue de vos retours.',
        color: 'purple',
      },
      {
        days: 'Jours 11–13',
        title: 'Renforcement & tests',
        description:
          'Je peaufine l’expérience, corrige les cas limites, réalise des tests approfondis et optimise les performances pour la production.',
        expectation: 'Livrables : code prêt pour la production, métriques de performance et artefacts de déploiement.',
        color: 'pink',
      },
      {
        days: 'Jour 14',
        title: 'Transmission & lancement',
        description:
          'Documentation complète, support au déploiement et transfert de connaissances pour que votre équipe prenne le relais.',
        expectation: 'Livrables : documentation complète, guide de déploiement et session de formation optionnelle.',
        color: 'indigo',
      },
    ],
  },
};

export default function SprintTimeline() {
  const { language } = useLanguage();
  const copy = COPY[language];
  const steps = copy.steps;

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      hoverBorder: 'hover:border-blue-500',
      text: 'text-blue-600',
      dot: 'bg-blue-600',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      hoverBorder: 'hover:border-purple-500',
      text: 'text-purple-600',
      dot: 'bg-purple-600',
    },
    pink: {
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      hoverBorder: 'hover:border-pink-500',
      text: 'text-pink-600',
      dot: 'bg-pink-600',
    },
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      hoverBorder: 'hover:border-indigo-500',
      text: 'text-indigo-600',
      dot: 'bg-indigo-600',
    },
  };

  return (
    <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-4">
            {copy.heading}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            {copy.subheading}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-4 relative z-10">
            {steps.map((step, index) => {
              const colors = colorClasses[step.color as keyof typeof colorClasses];
              
              return (
                <div
                  key={index}
                  className={`group relative bg-white rounded-2xl p-3 sm:p-4 lg:p-5 border-2 ${colors.border} ${colors.hoverBorder} transition-all duration-300 hover:shadow-xl hover:-translate-y-2 focus-within:ring-4 focus-within:ring-${step.color}-500 focus-within:ring-opacity-50`}
                  role="article"
                  aria-label={`Step ${index + 1}: ${step.title}`}
                  tabIndex={0}
                >
                  {/* Step Number & Dot */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 lg:mb-4">
                    <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full ${colors.bg} flex items-center justify-center`}>
                      <div className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 rounded-full ${colors.dot}`} />
                    </div>
                    <div>
                      <div className={`text-sm font-semibold ${colors.text} uppercase tracking-wide`}>
                        {step.days}
                      </div>
                      <div className="text-xs text-gray-500">
                        {copy.stepLabel(index + 1, steps.length)}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-2 sm:mb-3 lg:mb-4">
                    {step.description}
                  </p>

                  {/* Expectation */}
                  <div className={`${colors.bg} rounded-lg p-2 sm:p-3 border ${colors.border}`}>
                    <p className="text-xs font-medium text-gray-700 leading-relaxed">
                      {step.expectation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 lg:mb-6">
            {copy.prompt}
          </p>
          <div className="flex justify-center">
            <ServicesCTA 
              variant="purple"
              label={copy.ctaLabel}
              showArrow={true}
              className="px-8 py-4 text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
