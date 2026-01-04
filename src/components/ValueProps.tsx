import { useLanguage } from '../lib/language';

const COPY = {
  en: {
    heading: 'Why Choose Me',
    subheading: 'I combine speed, scalability, and AI to deliver exceptional results',
    values: [
      {
        title: 'Speed',
        description: 'From concept to production in just 2 weeks—no endless sprints, no delays.',
        icon: (
          <svg
            className="w-12 h-12 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            />
          </svg>
        ),
      },
      {
        title: 'Scalability',
        description: 'Built with Go and modern architecture—handle millions of requests without breaking a sweat.',
        icon: (
          <svg
            className="w-12 h-12 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            />
          </svg>
        ),
      },
      {
        title: 'AI-Powered',
        description: 'Leverage RAG, LLMs, and cutting-edge AI to deliver intelligent, context-aware solutions.',
        icon: (
          <svg
            className="w-12 h-12 text-pink-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>
        ),
      },
    ],
  },
  fr: {
    heading: 'Pourquoi travailler avec moi',
    subheading: 'Je combine vitesse, scalabilité et IA pour livrer des résultats concrets',
    values: [
      {
        title: 'Vitesse',
        description: 'Du concept à la production en 2 semaines seulement — sans sprints interminables ni retards.',
        icon: (
          <svg
            className="w-12 h-12 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            />
          </svg>
        ),
      },
      {
        title: 'Scalabilité',
        description: 'Conçu en Go et avec des architectures modernes pour absorber des millions de requêtes sans compromis.',
        icon: (
          <svg
            className="w-12 h-12 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            />
          </svg>
        ),
      },
      {
        title: 'Propulsé par l’IA',
        description: 'Exploitez RAG, les LLMs et une IA de pointe pour livrer des solutions intelligentes et contextualisées.',
        icon: (
          <svg
            className="w-12 h-12 text-pink-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>
        ),
      },
    ],
  },
} as const;

export default function ValueProps() {
  const { language } = useLanguage();
  const copy = COPY[language];
  const values = copy.values;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {copy.heading}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            {copy.subheading}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col h-full"
            >
              {/* Icon */}
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-base text-gray-600 leading-relaxed flex-grow">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
