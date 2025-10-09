import { useState } from 'react';

interface Badge {
  name: string;
  description: string;
  color: string;
  icon?: string;
}

export default function StackBadges() {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  const badges: Badge[] = [
    {
      name: 'Go',
      description: 'Concurrency & reliability—handle millions of requests with minimal resources',
      color: 'blue',
      icon: '⚡',
    },
    {
      name: 'PostgreSQL',
      description: 'Battle-tested relational database with ACID guarantees and powerful querying',
      color: 'indigo',
      icon: '🐘',
    },
    {
      name: 'Next.js',
      description: 'React framework for production—SEO, performance, and developer experience',
      color: 'gray',
      icon: '▲',
    },
    {
      name: 'TypeScript',
      description: 'Type safety catches bugs before production and improves maintainability',
      color: 'blue',
      icon: '📘',
    },
    {
      name: 'n8n',
      description: 'Workflow automation—connect systems and automate processes without code',
      color: 'red',
      icon: '🔗',
    },
    {
      name: 'RAG',
      description: 'Retrieval-Augmented Generation—AI with context from your own data sources',
      color: 'purple',
      icon: '🧠',
    },
    {
      name: 'LLMs',
      description: 'Large Language Models—leverage GPT, Claude, and others for intelligent features',
      color: 'pink',
      icon: '✨',
    },
    {
      name: 'Docker',
      description: 'Containerization ensures consistent deployments across all environments',
      color: 'cyan',
      icon: '🐳',
    },
    {
      name: 'Vercel',
      description: 'Edge network deployment for lightning-fast global performance',
      color: 'gray',
      icon: '▲',
    },
  ];

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
            My Tech Stack
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Modern, proven technologies that deliver performance, reliability, and scale
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {badges.map((badge, index) => {
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
                  title={badge.description}
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
                      {badge.description}
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
            And many more tools tailored to your specific needs
          </p>
        </div>
      </div>
    </section>
  );
}
