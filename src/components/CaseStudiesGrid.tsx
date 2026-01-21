import { useRef, useState, useEffect } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(1);

  // Handle scroll detection for active index
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let rafId: number;
    const handleScroll = () => {
      // Use requestAnimationFrame for performance
      rafId = requestAnimationFrame(() => {
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        let closestIndex = 0;
        let minDistance = Infinity;

        // Iterate over card elements (ignoring the spacer if strictly querying children, but careful with types)
        // We only care about the case study card wrappers
        const cardElements = Array.from(container.children).slice(0, items.length);

        cardElements.forEach((child, index) => {
          const rect = child.getBoundingClientRect();
          const childCenter = rect.left + rect.width / 2;
          const distance = Math.abs(containerCenter - childCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });

        if (closestIndex !== activeIndex) {
          setActiveIndex(closestIndex);
        }
      });
    };

    // Initial scroll to center the active index (1)
    if (container && activeIndex === 1) {
      // Small timeout to ensure layout is done
      setTimeout(() => {
        scrollToIndex(1);
      }, 100);
    }

    container.addEventListener('scroll', handleScroll);
    // Initial calculation for state sync
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [items.length, activeIndex]);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      // Clamp index
      const targetIndex = Math.max(0, Math.min(index, items.length - 1));

      const cardElements = Array.from(current.children).slice(0, items.length);
      const targetElement = cardElements[targetIndex] as HTMLElement;

      if (targetElement) {
        // Calculate scroll position to center the element
        // We want: targetElement.center == current.center
        // offsetLeft is relative to the scroll container's scrolling content (start)
        // But we need to account for padding.
        // Easier method: use scrollIntoView with block: 'nearest', inline: 'center'
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  const getCardStyle = (index: number) => {
    const diff = Math.abs(index - activeIndex);
    if (diff === 0) {
      return 'scale-100 opacity-100 translate-y-0 blur-0 z-10';
    } else if (diff === 1) {
      return 'scale-90 opacity-40 blur-[1px] translate-y-2 z-0';
    } else {
      return 'scale-90 opacity-0 blur-sm translate-y-4 -z-10 pointer-events-none';
    }
  };

  return (
    <section className="px-0 sm:px-6 lg:px-8 py-12 overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative group">
        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between px-4 sm:px-2">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 tracking-tight mb-2">
              {sectionHeading}
            </h1>
            <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows Overlay - Centered on Active Item */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
            <div className="w-full max-w-[95vw] sm:max-w-[560px] flex justify-between items-center px-2 sm:px-0">
              <button
                onClick={() => scrollToIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
                className={`transform transition-all duration-200 pointer-events-auto
                  p-3 rounded-full border border-gray-200/50 bg-white/80 backdrop-blur-md shadow-lg 
                  text-gray-700 hover:text-gray-900 hover:bg-white hover:scale-110 active:scale-95
                  disabled:opacity-0 disabled:cursor-not-allowed`}
                aria-label="Previous"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => scrollToIndex(activeIndex + 1)}
                disabled={activeIndex === items.length - 1}
                className={`transform transition-all duration-200 pointer-events-auto
                  p-3 rounded-full border border-gray-200/50 bg-white/80 backdrop-blur-md shadow-lg 
                  text-gray-700 hover:text-gray-900 hover:bg-white hover:scale-110 active:scale-95
                  disabled:opacity-0 disabled:cursor-not-allowed`}
                aria-label="Next"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 px-[calc(50%-42.5vw)] sm:px-[calc(50%-200px)] [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((study, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-[85vw] sm:w-[400px] snap-center transition-all duration-500 ease-out transform ${getCardStyle(index)}`}
              >
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
          </div>
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
