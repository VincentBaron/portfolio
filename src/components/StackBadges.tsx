import { useState } from 'react';
import { useLanguage } from '../lib/language';

const BADGES = [
  {
    name: 'Go',
    description: {
      en: 'Concurrency & reliability—handle millions of requests with minimal resources',
      fr: 'Concurrence et fiabilité — gère des millions de requêtes avec un minimum de ressources',
    },
    color: 'blue',
    icon: '⚡',
  },
  {
    name: 'PostgreSQL',
    description: {
      en: 'Battle-tested relational database with ACID guarantees and powerful querying',
      fr: 'Base de données relationnelle éprouvée avec garanties ACID et requêtes puissantes',
    },
    color: 'indigo',
    icon: '🐘',
  },
  {
    name: 'Next.js',
    description: {
      en: 'React framework for production—SEO, performance, and developer experience',
      fr: 'Framework React taillé pour la production — SEO, performance et expérience développeur',
    },
    color: 'gray',
    icon: '▲',
  },
  {
    name: 'TypeScript',
    description: {
      en: 'Type safety catches bugs before production and improves maintainability',
      fr: 'Le typage fort évite les bugs avant la prod et améliore la maintenabilité',
    },
    color: 'blue',
    icon: '📘',
  },
  {
    name: 'n8n',
    description: {
      en: 'Workflow automation—connect systems and automate processes without code',
      fr: 'Automatisation des workflows — connecte les systèmes et automatise les processus sans code',
    },
    color: 'red',
    icon: '🔗',
  },
  {
    name: 'RAG',
    description: {
      en: 'Retrieval-Augmented Generation—AI with context from your own data sources',
      fr: 'Retrieval-Augmented Generation — une IA qui s’appuie sur vos propres données',
    },
    color: 'purple',
    icon: '🧠',
  },
  {
    name: 'LLMs',
    description: {
      en: 'Large Language Models—leverage GPT, Claude, and others for intelligent features',
      fr: 'Large Language Models — exploitez GPT, Claude et consorts pour des fonctionnalités intelligentes',
    },
    color: 'pink',
    icon: '✨',
  },
  {
    name: 'Docker',
    description: {
      en: 'Containerization ensures consistent deployments across all environments',
      fr: 'La containerisation garantit des déploiements cohérents sur tous les environnements',
    },
    color: 'cyan',
    icon: '🐳',
  },
  {
    name: 'Vercel',
    description: {
      en: 'Edge network deployment for lightning-fast global performance',
      fr: 'Déploiement sur réseau edge pour des performances fulgurantes partout dans le monde',
    },
    color: 'gray',
    icon: '▲',
  },
] as const;

export default function StackBadges() {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
  const { language } = useLanguage();

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200',
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-300 hover:bg-indigo-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200',
    red: 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200',
    pink: 'bg-pink-100 text-pink-700 border-pink-300 hover:bg-pink-200',
    cyan: 'bg-cyan-100 text-cyan-700 border-cyan-300 hover:bg-cyan-200',
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {language === 'fr' ? 'Mon stack technologique' : 'My Tech Stack'}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Des technologies modernes et éprouvées pour la performance, la fiabilité et la montée en charge'
              : 'Modern, proven technologies that deliver performance, reliability, and scale'}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {BADGES.map((badge, index) => {
            const colors = colorClasses[badge.color as keyof typeof colorClasses];
            const isHovered = hoveredBadge === badge.name;
            
            return (
              <div key={index} className="relative">
                <button
                  className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 font-semibold text-sm transition-all duration-200 transform hover:scale-105 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${colors}`}
                  onMouseEnter={() => setHoveredBadge(badge.name)}
                  onMouseLeave={() => setHoveredBadge(null)}
                  onFocus={() => setHoveredBadge(badge.name)}
                  onBlur={() => setHoveredBadge(null)}
                  aria-describedby={`tooltip-${badge.name}`}
                  title={badge.description[language]}
                >
                  {badge.icon && (
                    <span className="text-lg" aria-hidden="true">
                      {badge.icon}
                    </span>
                  )}
                  <span>{badge.name}</span>
                </button>

                {/* Tooltip */}
                {isHovered && (
                  <div
                    id={`tooltip-${badge.name}`}
                    role="tooltip"
                    className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-xl max-w-xs w-max pointer-events-none"
                  >
                    <div className="relative">
                      {badge.description[language]}
                      {/* Tooltip arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-gray-900" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            {language === 'fr'
              ? 'Et bien d’autres outils adaptés à vos besoins spécifiques'
              : 'And many more tools tailored to your specific needs'}
          </p>
        </div>
      </div>
    </section>
  );
}
