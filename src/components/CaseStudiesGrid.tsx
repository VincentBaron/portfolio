import React from 'react';
import CaseStudyCard from './CaseStudyCard';

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
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Case Studies
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Real projects, real results—see how we've helped businesses ship fast and scale smart
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-6">
            More case studies coming soon. Want to be featured?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-lg text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Start Your Project
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
