import { useRef } from 'react';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 420; // card width + gap
      const targetScroll = direction === 'left'
        ? current.scrollLeft - scrollAmount
        : current.scrollLeft + scrollAmount;

      current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 overflow-hidden bg-gray-50/50">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header with Nav */}
        <div className="mb-8 flex items-end justify-between px-2">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight mb-2">
              {sectionHeading}
            </h1>
            <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
          </div>

          <div className="hidden sm:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-600 hover:text-gray-900 transition-all shadow-sm active:scale-95"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-600 hover:text-gray-900 transition-all shadow-sm active:scale-95"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 -mx-4 px-4 sm:mx-0 sm:px-2 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((study, index) => (
            <div key={index} className="flex-shrink-0 w-[85vw] sm:w-[400px] snap-center">
              <CaseStudyCard
                title={study.title[language]}
                summary={study.summary[language]}
                slug={study.slug}
                thumbnail={study.heroImage}
                tags={study.tags}
                readLabel={t.caseStudies.readCaseStudy}
              />
            </div>
          ))}
          {/* Padding element for right side scroll */}
          <div className="w-1 flex-shrink-0"></div>
        </div>

        {/* Section CTA */}
        {showCTA && (
          <div className="mt-4 text-center">
            <button
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white bg-gradient-to-r from-orange-500 to-orange-600 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-lg"
              onClick={() => window.open('https://cal.com/vincent-baron/30mins-meeting', '_blank')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {t.caseStudies.startProject}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
