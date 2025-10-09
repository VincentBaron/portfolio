import React from 'react';
import CaseStudyCard from './CaseStudyCard';
import ServicesCTA from './ServicesCTA';

export default function CaseStudiesGrid() {
  const caseStudies = [
    {
      title: 'AI-Powered Customer Support Platform',
      summary: 'Built a RAG-based support system that reduced response time by 75% and handled 10k+ daily queries using Go, PostgreSQL, and GPT-4.',
      slug: 'ai-customer-support',
      tags: ['Go', 'RAG', 'PostgreSQL', 'GPT-4'],
    },
    {
      title: 'Real-Time Analytics Dashboard',
      summary: 'Developed a high-performance analytics platform processing 1M+ events per day with sub-100ms latency using Go microservices and TimescaleDB.',
      slug: 'realtime-analytics',
      tags: ['Go', 'TimescaleDB', 'Next.js', 'WebSockets'],
    },
    {
      title: 'E-commerce Order Automation',
      summary: 'Integrated n8n workflows to automate order processing, inventory management, and customer notifications, saving 20+ hours weekly.',
      slug: 'ecommerce-automation',
      tags: ['n8n', 'Shopify', 'PostgreSQL', 'APIs'],
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">
            Case Studies
          </h1>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {caseStudies.map((study, index) => (
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
      </div>
    </section>
  );
}
