import { useState } from 'react';
import { useLanguage } from '../lib/language';

const EMPLOYER_CHARGE_RATE = 0.44;
const EMPLOYER_CHARGE_PERCENT = Math.round(EMPLOYER_CHARGE_RATE * 100);
const EMPLOYER_MULTIPLIER = 1 + EMPLOYER_CHARGE_RATE;

interface Package {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  outputs: string[];
  price: string;
  color: {
    gradient: string;
    bg: string;
    text: string;
  };
  hasCalculator?: boolean;
  creditNote?: string;
}

const packages: Package[] = [
  {
    id: 1,
    name: 'Audit Dino',
    shortDescription: 'Deep dive into your operational bottlenecks',
    description: '• Map your entire operational structure and tool stack\n• Identify exact bottlenecks causing "tool fatigue"\n• Get prioritized roadmap ranked by business impact',
    outputs: [
      'Operational Map: A visual breakdown of your current friction points.',
      'Prioritized Roadmap: Opportunities ranked by business impact (Time-to-Hire, Cost-per-Hire).',
      'ROI Business Case: Quantification of operational waste transformed into a clear implementation plan.'
    ],
    price: '€3,000',
    creditNote: '100% credit from 1st implementation later',
    color: {
      gradient: 'from-blue-50 to-blue-100',
      bg: 'bg-blue-50/50',
      text: 'text-blue-700'
    }
  },
  {
    id: 2,
    name: 'Cost Cutter Dino',
    shortDescription: 'Calculate the real cost of your manual processes',
    description: 'Calculate the real cost of your manual processes.',
    outputs: [
      'Instant Cost Analysis: See monthly and annual costs of manual processes.',
      'Full Breakdown: Includes gross salary + employer charges (44%).',
      'Custom Report: Get a detailed audit and implementation recommendations via email.'
    ],
    price: 'Free Tool',
    color: {
      gradient: 'from-amber-50 to-amber-100',
      bg: 'bg-amber-50/50',
      text: 'text-amber-700'
    },
    hasCalculator: true
  },
  {
    id: 3,
    name: 'Offensive Dino',
    shortDescription: 'AI-driven lead engine: 1 mandate per 3 calls',
    description: '• Scans competitor job listings to identify real end clients\n• Converts 1 mandate per 3 calls (vs. 1 per 100 traditionally)\n• Plugs directly into your CRM\n• Designed for revenue per call, not activity metrics',
    outputs: [
      'Demand-Triggered Lead Engine: Automatically identifies companies already spending on your competitors, turning job posts into high-intent entry points rather than speculative cold calls.',
      '33× Mandate Conversion Uplift: Moves performance from 1 mandate per 100 cold calls to 1 per 3 calls, slashing call volume while increasing pipeline reliability.',
      'Competitive Spend Intelligence: Reveals where competitors are actively placing talent, exposing who is buying, right now, and in which domains.',
      'Revenue-Driven Pipeline Control: Transforms sourcing into a measurable, forecastable funnel — enabling you to scale revenue by improving probabilities, not by burning more leads.'
    ],
    price: '€3,000 Setup',
    color: {
      gradient: 'from-purple-50 to-purple-100',
      bg: 'bg-purple-50/50',
      text: 'text-purple-700'
    }
  },
  {
    id: 4,
    name: 'Protective Dino',
    shortDescription: 'Protect your client relationships from competitors',
    description: '• Continuously monitors your job listings for reverse-sourcing vulnerabilities\n• Provides automated recommendations to shield client identities while maintaining candidate appeal',
    outputs: [
      'Vulnerability Report: Analysis of which listings reveal too much client data.',
      'Optimization Playbook: Guidelines for writing listings that attract talent without leaking client identities.'
    ],
    price: '€3,000 Setup',
    color: {
      gradient: 'from-indigo-50 to-indigo-100',
      bg: 'bg-indigo-50/50',
      text: 'text-indigo-700'
    }
  },
  {
    id: 5,
    name: 'Sprint Dino',
    shortDescription: 'Production-ready custom solutions in weeks',
    description: '• Month-long sprint delivering a new production feature every week\n• Four complete features with comprehensive training and documentation',
    outputs: [
      'Custom Deliverable: Could include an AI matching engine (Radar), automated billing pipelines, or custom ATS/CRM integrations.',
      'System Documentation: Full hand-over of the new workflow or tool.'
    ],
    price: 'ROI-Based',
    color: {
      gradient: 'from-rose-50 to-rose-100',
      bg: 'bg-rose-50/50',
      text: 'text-rose-700'
    }
  },
  {
    id: 6,
    name: 'Fractional Dino',
    shortDescription: 'Ongoing operational excellence & automation',
    description: '• Fractional COO continuously improving and evolving your existing systems\n• Proactive maintenance and fine-tuning of all automations and workflows\n• Bi-weekly team retrospective workshops to drive continuous improvement',
    outputs: [
      'Monthly Optimization: Continuous refinement of workflows and AI agents.',
      'Team Onboarding & Training: Managing tool provisioning and internal knowledge bases (Notion).',
      'Performance Tracking: Implementation of formal KPI dashboards (Time-to-Hire, etc.).'
    ],
    price: '€5,000 / Month',
    color: {
      gradient: 'from-emerald-50 to-emerald-100',
      bg: 'bg-emerald-50/50',
      text: 'text-emerald-700'
    }
  }
];

export default function Packages() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { language } = useLanguage();

  // Calculator state
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [peopleCount, setPeopleCount] = useState('');
  const [monthlyCostPerPerson, setMonthlyCostPerPerson] = useState('');
  const [processDescription, setProcessDescription] = useState('');
  const [calculatedMonthlyCost, setCalculatedMonthlyCost] = useState<number | null>(null);
  const [calculatedAnnualCost, setCalculatedAnnualCost] = useState<number | null>(null);
  const [error, setError] = useState('');

  const togglePackage = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
    // Reset calculator when closing
    if (expandedId === id) {
      setHoursPerWeek('');
      setPeopleCount('');
      setMonthlyCostPerPerson('');
      setProcessDescription('');
      setCalculatedMonthlyCost(null);
      setCalculatedAnnualCost(null);
      setError('');
    }
  };

  const handleCalculatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hours = parseFloat(hoursPerWeek);
    const people = Math.round(parseFloat(peopleCount));
    const grossSalary = parseFloat(monthlyCostPerPerson);

    if (!Number.isFinite(hours) || !Number.isFinite(people) || !Number.isFinite(grossSalary)) {
      setError(language === 'fr' ? 'Merci de remplir tous les champs.' : 'Please fill in all fields.');
      return;
    }
    if (hours <= 0 || people <= 0 || grossSalary <= 0) {
      setError(language === 'fr' ? 'Les valeurs doivent être positives.' : 'Values must be positive.');
      return;
    }

    const monthlyEmployerCostPerPerson = grossSalary * EMPLOYER_MULTIPLIER;
    const monthlyCost = monthlyEmployerCostPerPerson * (hours / 40) * people;
    const annualCost = monthlyCost * 12;

    setError('');
    setCalculatedMonthlyCost(monthlyCost);
    setCalculatedAnnualCost(annualCost);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(Math.round(value));
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6 tracking-tight">
            {language === 'fr' ? 'Nos Forfaits' : 'Our Packages'}
          </h1>
        </div>

        {/* Packages Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-start">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group relative flex"
            >
              {/* Package Card */}
              <div
                className={`relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer flex flex-col w-full ${
                  expandedId === pkg.id
                    ? `shadow-lg ${pkg.color.bg} border border-gray-200`
                    : 'border border-gray-200 bg-white hover:shadow-md hover:border-gray-300 h-full min-h-[280px]'
                }`}
                onClick={() => togglePackage(pkg.id)}
              >
                {/* Subtle Abstract Background Pattern */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gray-400 to-transparent rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-gray-300 to-transparent rounded-full blur-3xl"></div>
                </div>

                {/* Minimal Header with Subtle Gradient */}
                <div className={`bg-gradient-to-br ${pkg.color.gradient} p-8 text-gray-800 relative overflow-hidden`}>
                  {/* Subtle Abstract Shapes */}
                  <div className="absolute inset-0 overflow-hidden opacity-30">
                    <div className="absolute -top-8 -right-8 w-24 h-24 border border-gray-300/20 rotate-45 rounded-lg"></div>
                    <div className="absolute -bottom-6 -left-6 w-20 h-20 border border-gray-300/20 rotate-12 rounded-lg"></div>
                    <div className="absolute top-1/2 right-6 w-12 h-12 bg-gray-300/10 rotate-45 rounded-md"></div>
                  </div>

                  {/* Dino Icon and Title - Horizontally Aligned */}
                  <div className="flex items-center gap-4 mb-3 relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/50 shadow-sm overflow-hidden flex items-center justify-center p-2.5 flex-shrink-0 transition-transform duration-300">
                      <img src="/logoBrand.png" alt={pkg.name} className="w-full h-full object-contain opacity-80" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight">{pkg.name}</h3>
                  </div>

                  {/* Subtle Accent Line */}
                  <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300/30 to-gray-300/50"></div>
                </div>

                {/* Price Badge with Minimal Design */}
                <div className="px-8 py-5 relative">
                  <div className="flex items-center gap-4">
                    <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg ${pkg.color.bg} border border-gray-200/80 shadow-sm transition-all duration-200`}>
                      <svg className={`w-5 h-5 ${pkg.color.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className={`font-semibold text-base ${pkg.color.text}`}>{pkg.price}</span>
                    </div>
                    {pkg.creditNote && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-200/80 shadow-sm">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs font-medium text-emerald-700">{pkg.creditNote}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expandable Content */}
                {/* Expandable Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedId === pkg.id ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-8 pb-8 space-y-6">
                    {/* Calculator for Cost Cutter Dino */}
                    {pkg.hasCalculator && expandedId === pkg.id ? (
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 tracking-wide text-sm">
                            {language === 'fr' ? 'Calculez votre coût' : 'Calculate Your Cost'}
                          </h4>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {pkg.description}
                          </p>
                        </div>

                        <form onSubmit={handleCalculatorSubmit} className="space-y-4" onClick={(e) => e.stopPropagation()}>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-2">
                                {language === 'fr' ? 'Heures/semaine' : 'Hours/week'}
                              </label>
                              <input
                                id="hours"
                                type="number"
                                min="0"
                                step="0.5"
                                value={hoursPerWeek}
                                onChange={(e) => {
                                  setHoursPerWeek(e.target.value);
                                  setError('');
                                }}
                                onClick={(e) => e.stopPropagation()}
                                placeholder={language === 'fr' ? 'ex. 6' : 'e.g. 6'}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                              />
                            </div>

                            <div>
                              <label htmlFor="people" className="block text-sm font-medium text-gray-700 mb-2">
                                {language === 'fr' ? 'Personnes' : 'People'}
                              </label>
                              <input
                                id="people"
                                type="number"
                                min="1"
                                step="1"
                                value={peopleCount}
                                onChange={(e) => {
                                  setPeopleCount(e.target.value);
                                  setError('');
                                }}
                                onClick={(e) => e.stopPropagation()}
                                placeholder={language === 'fr' ? 'ex. 3' : 'e.g. 3'}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                              {language === 'fr' ? 'Salaire brut/mois (€)' : 'Gross salary/mo (€)'}
                            </label>
                            <input
                              id="salary"
                              type="number"
                              min="0"
                              step="any"
                              value={monthlyCostPerPerson}
                              onChange={(e) => {
                                setMonthlyCostPerPerson(e.target.value);
                                setError('');
                              }}
                              onClick={(e) => e.stopPropagation()}
                              placeholder={language === 'fr' ? 'ex. 4000' : 'e.g. 4000'}
                              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                            />
                          </div>

                          <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                              {language === 'fr' ? 'Description du processus' : 'Process description'}
                            </label>
                            <input
                              id="description"
                              type="text"
                              value={processDescription}
                              onChange={(e) => setProcessDescription(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              placeholder={language === 'fr' ? 'ex. Validation des heures' : 'e.g. Time-tracking validation'}
                              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                            />
                          </div>

                          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

                          <button
                            type="submit"
                            disabled={!hoursPerWeek || !peopleCount || !monthlyCostPerPerson}
                            className={`w-full py-3 px-6 rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-md`}
                          >
                            {language === 'fr' ? 'Calculer le coût' : 'Calculate Cost'}
                          </button>
                        </form>

                        {calculatedMonthlyCost !== null && calculatedAnnualCost !== null && (
                          <div className={`${pkg.color.bg} border border-gray-200 rounded-xl p-5 space-y-3 shadow-sm`}>
                            <h5 className={`font-semibold ${pkg.color.text} text-sm`}>
                              {language === 'fr' ? 'Coût estimé' : 'Estimated Cost'}
                            </h5>
                            <div className="grid gap-3 sm:grid-cols-2">
                              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                <p className="text-xs text-gray-600 font-medium mb-1">
                                  {language === 'fr' ? 'Par mois' : 'Monthly'}
                                </p>
                                <p className={`text-2xl font-semibold ${pkg.color.text}`}>
                                  {formatCurrency(calculatedMonthlyCost)}
                                </p>
                              </div>
                              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                <p className="text-xs text-gray-600 font-medium mb-1">
                                  {language === 'fr' ? 'Par an' : 'Annually'}
                                </p>
                                <p className={`text-2xl font-semibold ${pkg.color.text}`}>
                                  {formatCurrency(calculatedAnnualCost)}
                                </p>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 italic">
                              {language === 'fr' 
                                ? `Hypothèse : 40h/semaine + ${EMPLOYER_CHARGE_PERCENT}% de charges patronales`
                                : `Assumes 40h/week + ${EMPLOYER_CHARGE_PERCENT}% employer charges`}
                            </p>
                          </div>
                        )}

                        {/* CTA Button */}
                        <button
                          className={`w-full py-3 px-6 rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm`}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open('https://cal.com/vincent-baron/30mins-meeting', '_blank');
                          }}
                        >
                          {language === 'fr' ? 'Discuter de mes résultats' : 'Discuss My Results'}
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Description */}
                        <div>
                          {/* Check if description contains bullet points */}
                          {pkg.description.includes('•') ? (
                            <ul className="space-y-2.5">
                              {pkg.description.split('\n').map((line, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm">
                                  <svg className={`w-5 h-5 ${pkg.color.text} flex-shrink-0 mt-0.5`} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  <span className="text-gray-600 leading-relaxed">{line.replace('• ', '')}</span>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {pkg.description}
                            </p>
                          )}
                        </div>

                        {/* Special Infographic for Offensive Dino */}
                        {pkg.id === 3 && (
                          <div className="my-6 p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200/50">
                            <div className="flex items-center justify-center gap-8 mb-4">
                              {/* Before */}
                              <div className="text-center">
                                <div className="text-xs font-medium text-gray-500 mb-2">
                                  {language === 'fr' ? 'Avant' : 'Before'}
                                </div>
                                <div className="text-4xl font-bold text-gray-400">1/100</div>
                                <div className="text-xs text-gray-500 mt-1">1%</div>
                              </div>

                              {/* Arrow */}
                              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>

                              {/* After */}
                              <div className="text-center">
                                <div className="text-xs font-medium text-gray-500 mb-2">
                                  {language === 'fr' ? 'Après' : 'After'}
                                </div>
                                <div className="text-4xl font-bold text-purple-600">1/3</div>
                                <div className="text-xs text-purple-600 mt-1 font-semibold">33%</div>
                              </div>
                            </div>

                            {/* Impact Badge */}
                            <div className="text-center pt-4 border-t border-purple-200">
                              <span className="text-sm font-bold text-purple-700">
                                33× {language === 'fr' ? 'Efficacité' : 'Efficiency'}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* CTA Button */}
                        <button
                          className={`w-full py-3 px-6 rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm`}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open('https://cal.com/vincent-baron/30mins-meeting', '_blank');
                          }}
                        >
                          {language === 'fr' ? 'Réserver un appel' : 'Book a Call'}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Collapsed Preview */}
                {expandedId !== pkg.id && (
                  <div className="p-6 flex-grow flex flex-col relative">
                    {/* Subtle corner decoration */}
                    <div className="absolute bottom-6 right-6 w-12 h-12 border-r border-b border-gray-200 opacity-20"></div>
                    
                    {/* Short one-line description */}
                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                      {pkg.shortDescription}
                    </p>
                    
                    <div className={`mt-4 text-sm font-medium ${pkg.color.text} flex items-center gap-2 group-hover:gap-3 transition-all`}>
                      <span>
                        {pkg.hasCalculator 
                          ? (language === 'fr' ? 'Calculer' : 'Calculate')
                          : (language === 'fr' ? 'Voir plus' : 'Learn more')
                        }
                      </span>
                      <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
