import ServicesCTA from './ServicesCTA';
import { useLanguage } from '../lib/language';

const COPY = {
  en: {
    heading: 'Ready to start your 1-week sprint?',
    body: 'Book a call to discuss your project and get started.',
    book: 'Book a Call',
    view: 'View Case Studies',
  },
  fr: {
    heading: 'Prêt à lancer votre sprint de 2 semaines ?',
    body: 'Réservez un appel pour parler de votre projet et démarrer.',
    book: 'Réserver un appel',
    view: 'Voir les études de cas',
  },
} as const;

export default function ServicesMainCTA() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <>
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {copy.heading}
          </h2>
          <p className="text-base text-gray-600 mb-6 leading-relaxed">
            {copy.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ServicesCTA 
              variant="purple"
              label={copy.book}
              showCalendar={true}
              className="px-6 py-3 text-base"
            />
            <a
              href="#work"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 transition-all duration-200"
            >
              {copy.view}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
