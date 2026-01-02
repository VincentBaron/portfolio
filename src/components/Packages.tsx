import { useState } from 'react';
import { useLanguage } from '../lib/language';

interface Package {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  outputs: string[];
  price: string;
  color: {
    gradient: string;
    bg: string;
    text: string;
  };
}

const packages: Package[] = [
  {
    id: 1,
    name: 'Audit Dino',
    subtitle: 'The "Where do I start?" Package',
    description: 'A comprehensive deep dive into your agency\'s current state. We map your entire operational structure, tool stack, and team workflows to identify the exact bottlenecks causing "tool fatigue". This is designed for leaders who feel overwhelmed by multiple tools (ATS, CRM, spreadsheets) and lack a clear operational system.',
    outputs: [
      'Operational Map: A visual breakdown of your current friction points.',
      'Prioritized Roadmap: Opportunities ranked by business impact (Time-to-Hire, Cost-per-Hire).',
      'ROI Business Case: Quantification of operational waste transformed into a clear implementation plan.'
    ],
    price: '€3,000',
    color: {
      gradient: 'from-blue-400 to-blue-600',
      bg: 'bg-blue-50',
      text: 'text-blue-600'
    }
  },
  {
    id: 2,
    name: 'Reverse Sourcing Dino',
    subtitle: 'The "Market Intelligence" Agent',
    description: 'An AI-powered agent designed for aggressive growth. This tool scans competitor job listings and uses advanced logic to identify the end clients behind the postings. It moves you from a reactive to a proactive sales posture.',
    outputs: [
      'Lead Generation Engine: Automated identification of target accounts currently hiring.',
      'Competitor Insights: Real-time data on where your competitors are winning business.'
    ],
    price: 'Contact for Custom Pricing',
    color: {
      gradient: 'from-purple-400 to-purple-600',
      bg: 'bg-purple-50',
      text: 'text-purple-600'
    }
  },
  {
    id: 3,
    name: 'Protective Dino',
    subtitle: 'The "Process Security" Audit',
    description: 'Defensive AI for your intellectual property. We analyze your existing job listings to see if they are vulnerable to the same reverse-sourcing techniques used by competitors. This ensures your hard-earned client relationships stay protected.',
    outputs: [
      'Vulnerability Report: Analysis of which listings reveal too much client data.',
      'Optimization Playbook: Guidelines for writing listings that attract talent without leaking client identities.'
    ],
    price: 'Contact for Custom Pricing',
    color: {
      gradient: 'from-indigo-400 to-indigo-600',
      bg: 'bg-indigo-50',
      text: 'text-indigo-600'
    }
  },
  {
    id: 4,
    name: 'Sprint Dino',
    subtitle: 'The "Custom Builder" Package',
    description: 'Focused, high-impact implementation for agencies ready to scale. Whether you need to integrate messy tools or build custom AI agents, we deliver production-ready code using a modern stack (React, TypeScript, Golang, Python). This is for Level 2 or 3 agencies needing specific, heavy-lifting solutions.',
    outputs: [
      'Custom Deliverable: Could include an AI matching engine (Radar), automated billing pipelines, or custom ATS/CRM integrations.',
      'System Documentation: Full hand-over of the new workflow or tool.'
    ],
    price: '€7,000 – €15,000',
    color: {
      gradient: 'from-pink-400 to-pink-600',
      bg: 'bg-pink-50',
      text: 'text-pink-600'
    }
  },
  {
    id: 5,
    name: 'Fractional Dino',
    subtitle: 'The "Embedded Operator" Package',
    description: 'Ongoing operational excellence. You get a fractional COO to continuously optimize your systems, automate repetitive tasks, and elevate how your team operates. We think like operators, not just tool-pushers, ensuring your tech evolves with your business.',
    outputs: [
      'Monthly Optimization: Continuous refinement of workflows and AI agents.',
      'Team Onboarding & Training: Managing tool provisioning and internal knowledge bases (Notion).',
      'Performance Tracking: Implementation of formal KPI dashboards (Time-to-Hire, etc.).'
    ],
    price: '€5,000 / Month',
    color: {
      gradient: 'from-green-400 to-green-600',
      bg: 'bg-green-50',
      text: 'text-green-600'
    }
  }
];

export default function Packages() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { language } = useLanguage();

  const togglePackage = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {language === 'fr' ? 'Nos Forfaits' : 'Our Packages'}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Choisissez le forfait qui correspond à vos besoins et accélérez votre croissance' 
              : 'Choose the package that fits your needs and accelerate your growth'}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group relative"
            >
              {/* Package Card */}
              <div
                className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  expandedId === pkg.id
                    ? `border-transparent shadow-2xl scale-[1.02] ${pkg.color.bg}`
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg'
                }`}
                onClick={() => togglePackage(pkg.id)}
              >
                {/* Gradient Header */}
                <div className={`bg-gradient-to-br ${pkg.color.gradient} p-6 text-white relative`}>
                  {/* Dino Icon */}
                  <div className="w-16 h-16 mb-4 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 shadow-xl overflow-hidden flex items-center justify-center p-2">
                    <img src="/logoBrand.png" alt={pkg.name} className="w-full h-full object-contain" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-sm opacity-90">{pkg.subtitle}</p>

                  {/* Expand/Collapse Icon */}
                  <div className="absolute top-6 right-6">
                    <div className={`w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 ${
                      expandedId === pkg.id ? 'rotate-45' : ''
                    }`}>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Price Badge */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${pkg.color.bg}`}>
                    <svg className={`w-5 h-5 ${pkg.color.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className={`font-bold ${pkg.color.text}`}>{pkg.price}</span>
                  </div>
                </div>

                {/* Expandable Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedId === pkg.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 space-y-6">
                    {/* Description */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {language === 'fr' ? 'Description' : 'Description'}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Outputs */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {language === 'fr' ? 'Livrables' : 'Output'}
                      </h4>
                      <ul className="space-y-2">
                        {pkg.outputs.map((output, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <svg
                              className={`w-5 h-5 ${pkg.color.text} flex-shrink-0 mt-0.5`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{output}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r ${pkg.color.gradient} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105`}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add your contact/booking logic here
                        window.open('https://cal.com/vincent-baron/30mins-meeting', '_blank');
                      }}
                    >
                      {language === 'fr' ? 'Réserver un appel' : 'Book a Call'}
                    </button>
                  </div>
                </div>

                {/* Collapsed Preview */}
                {expandedId !== pkg.id && (
                  <div className="p-6">
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {pkg.description}
                    </p>
                    <div className={`mt-4 text-sm font-medium ${pkg.color.text} flex items-center gap-1`}>
                      <span>{language === 'fr' ? 'Cliquez pour en savoir plus' : 'Click to learn more'}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
