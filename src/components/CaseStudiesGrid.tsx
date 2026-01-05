import { caseStudies, type LocalizedString } from '../data/caseStudies';
import CaseStudyCard from './CaseStudyCard';
import { useLanguage } from '../lib/language';
import { getTranslations } from '../lib/translations';

interface CaseStudiesGridProps {
  heading?: LocalizedString;
  limit?: number;
  showCTA?: boolean;
}

export default function CaseStudiesGrid({
  heading,
  limit,
  showCTA = true,
}: CaseStudiesGridProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const sectionHeading = heading ? heading[language] : t.caseStudies.title;
  const items = typeof limit === 'number' ? caseStudies.slice(0, limit) : caseStudies;

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6 tracking-tight">
            {sectionHeading}
          </h1>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {items.map((study, index) => (
            <CaseStudyCard
              key={index}
              title={study.title[language]}
              summary={study.summary[language]}
              slug={study.slug}
              thumbnail={study.heroImage}
              tags={study.tags}
              readLabel={t.caseStudies.readCaseStudy}
            />
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <button
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-lg"
            onClick={() => window.open('https://cal.com/vincent-baron/30mins-meeting', '_blank')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {t.caseStudies.startProject}
          </button>
        </div>
      </div>
    </section>
  );
}
