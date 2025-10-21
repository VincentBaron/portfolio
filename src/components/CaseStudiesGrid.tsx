import React from 'react';
import { caseStudies } from '../data/caseStudies';
import CaseStudyCard from './CaseStudyCard';
import ServicesCTA from './ServicesCTA';

interface CaseStudiesGridProps {
  heading?: string;
  limit?: number;
  showCTA?: boolean;
}

export default function CaseStudiesGrid({
  heading = 'Case Studies',
  limit,
  showCTA = true,
}: CaseStudiesGridProps) {
  const items = typeof limit === 'number' ? caseStudies.slice(0, limit) : caseStudies;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            {heading}
          </h1>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {items.map((study, index) => (
            <CaseStudyCard
              key={index}
              title={study.title}
              summary={study.summary}
              slug={study.slug}
              tags={study.tags}
            />
          ))}
        </div>

        {/* Empty State / Coming Soon */}
        {showCTA && (
          <div className="mt-6 sm:mt-8 lg:mt-10 text-center">
            <div className="flex justify-center">
              <ServicesCTA
                variant="purple"
                label="Start Your Project"
                showArrow={true}
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
