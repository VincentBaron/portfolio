import { caseStudies, type LocalizedString } from '../data/caseStudies';
import CaseStudyCard from './CaseStudyCard';
import ServicesCTA from './ServicesCTA';
import { useLanguage } from '../lib/language';

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
  const sectionHeading = heading ? heading[language] : language === 'fr' ? 'Études de cas' : 'Case Studies';
  const ctaLabel = language === 'fr' ? 'Lancer votre projet' : 'Start Your Project';
  const items = typeof limit === 'number' ? caseStudies.slice(0, limit) : caseStudies;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-900 mb-3 sm:mb-4 lg:mb-6 uppercase tracking-tight">
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
              readLabel={language === 'fr' ? 'Voir le projet' : 'Read case study'}
            />
          ))}
        </div>

        {/* Empty State / Coming Soon */}
        {showCTA && (
          <div className="mt-6 sm:mt-8 lg:mt-10 text-center">
            <div className="flex justify-center">
              <ServicesCTA
                variant="purple"
                label={ctaLabel}
                showArrow={true}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
