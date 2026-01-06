import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../lib/language';
import { getTranslations, jobSectors, type Language } from '../lib/translations';

interface MandateDinoTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchState = 'idle' | 'searching' | 'complete';

// Mock results data with diverse tech companies and full job details
interface MockResult {
  id: number;
  company: string;
  job: string;
  time: string;
  location: Record<Language, string>;
  salary: string;
  description: Record<Language, string>;
  profile: Record<Language, string>;
  linkedinUrl: string;
}

const mockResults: MockResult[] = [
  {
    id: 1,
    company: 'Doctolib',
    job: 'Senior Backend Engineer',
    time: '2h',
    location: { en: 'Paris, France', fr: 'Paris, France' },
    salary: '65-85k€',
    description: {
      en: 'Our client, a leading European healthtech platform, is seeking a Senior Backend Engineer to build scalable solutions for their core booking system handling millions of appointments daily. Tech stack: Ruby on Rails, PostgreSQL, Redis, Kubernetes.',
      fr: 'Notre client, une plateforme européenne de santé numérique leader, recherche un Senior Backend Engineer pour construire des solutions scalables pour leur système de réservation gérant des millions de rendez-vous quotidiens. Stack: Ruby on Rails, PostgreSQL, Redis, Kubernetes.',
    },
    profile: {
      en: '5+ years backend experience, strong system design skills, experience with high-traffic applications, fluent in English.',
      fr: '5+ ans d\'expérience backend, solides compétences en conception système, expérience avec des applications à fort trafic, anglais courant.',
    },
    linkedinUrl: 'https://www.linkedin.com/in/mathilde-nicolas/',
  },
  {
    id: 2,
    company: 'Datadog',
    job: 'Staff Data Engineer',
    time: '5h',
    location: { en: 'Paris, France (Hybrid)', fr: 'Paris, France (Hybride)' },
    salary: '80-110k€',
    description: {
      en: 'Our client, a global leader in monitoring and security, is looking for a Staff Data Engineer to build and optimize data pipelines processing petabytes of observability data. You\'ll work with cutting-edge distributed systems. Tech stack: Go, Python, Kafka, Spark, ClickHouse.',
      fr: 'Notre client, un leader mondial du monitoring et de la sécurité, recherche un Staff Data Engineer pour construire et optimiser des pipelines de données traitant des pétaoctets de données d\'observabilité. Vous travaillerez avec des systèmes distribués de pointe. Stack: Go, Python, Kafka, Spark, ClickHouse.',
    },
    profile: {
      en: '7+ years in data engineering, expertise in distributed systems, experience with real-time streaming, strong problem-solving skills.',
      fr: '7+ ans en data engineering, expertise en systèmes distribués, expérience en streaming temps réel, solides compétences analytiques.',
    },
    linkedinUrl: 'https://www.linkedin.com/in/h%C3%A9l%C3%A8ne-stahlberger-98b48344/',
  },
  {
    id: 3,
    company: 'Stripe',
    job: 'Platform Engineer',
    time: '8h',
    location: { en: 'Dublin, Ireland (Remote OK)', fr: 'Dublin, Irlande (Remote OK)' },
    salary: '90-130k€',
    description: {
      en: 'Our client, a leading global payment processor, is hiring a Platform Engineer to design and implement infrastructure that powers global payments. Focus on reliability, scalability, and developer experience. Tech stack: Ruby, Go, AWS, Terraform.',
      fr: 'Notre client, un processeur de paiement mondial leader, recrute un Platform Engineer pour concevoir et implémenter l\'infrastructure qui alimente les paiements mondiaux. Focus sur la fiabilité, la scalabilité et l\'expérience développeur. Stack: Ruby, Go, AWS, Terraform.',
    },
    profile: {
      en: '6+ years platform/infra experience, strong understanding of cloud architecture, experience with payment systems a plus.',
      fr: '6+ ans d\'expérience plateforme/infra, solide compréhension de l\'architecture cloud, expérience avec les systèmes de paiement un plus.',
    },
    linkedinUrl: 'https://www.linkedin.com/in/kerrie-kavanagh-sphr/',
  },
  {
    id: 4,
    company: 'Mistral AI',
    job: 'ML Infrastructure Engineer',
    time: '12h',
    location: { en: 'Paris, France', fr: 'Paris, France' },
    salary: '85-120k€',
    description: {
      en: 'Our client, a pioneering French AI company, is looking for an ML Infrastructure Engineer to build the infrastructure powering next-generation LLMs. Work on training pipelines, model serving, and optimization. Tech stack: Python, PyTorch, CUDA, Kubernetes, Ray.',
      fr: 'Notre client, une entreprise d\'IA française pionnière, recherche un ML Infrastructure Engineer pour construire l\'infrastructure alimentant les LLMs de nouvelle génération. Travaillez sur les pipelines d\'entraînement, le serving de modèles et l\'optimisation. Stack: Python, PyTorch, CUDA, Kubernetes, Ray.',
    },
    profile: {
      en: '4+ years ML infrastructure experience, deep understanding of GPU computing, experience with large-scale distributed training.',
      fr: '4+ ans d\'expérience en infrastructure ML, compréhension approfondie du calcul GPU, expérience avec l\'entraînement distribué à grande échelle.',
    },
    linkedinUrl: 'https://www.linkedin.com/in/mathildecallede/',
  },
  {
    id: 5,
    company: 'Revolut',
    job: 'Senior iOS Developer',
    time: '18h',
    location: { en: 'London, UK (Hybrid)', fr: 'Londres, UK (Hybride)' },
    salary: '75-100k£',
    description: {
      en: 'Our client, a leading fintech company with 35M+ users worldwide, is seeking a Senior iOS Developer to build features with focus on performance, security, and delightful UX. Tech stack: Swift, SwiftUI, Combine, CI/CD.',
      fr: 'Notre client, une société fintech leader avec 35M+ utilisateurs dans le monde, recherche un Senior iOS Developer pour construire des fonctionnalités avec un focus sur la performance, la sécurité et l\'UX. Stack: Swift, SwiftUI, Combine, CI/CD.',
    },
    profile: {
      en: '5+ years iOS development, strong Swift skills, experience with fintech apps preferred, attention to detail.',
      fr: '5+ ans de développement iOS, solides compétences Swift, expérience avec les apps fintech préférée, attention aux détails.',
    },
    linkedinUrl: 'https://www.linkedin.com/in/emma-evans-59959671/',
  },
];

// Step durations in milliseconds
const stepDurations = [1000, 1500, 1500, 1000, 1000, 1000];

// The IT Services sector value that's pre-selected for demo
const DEMO_SECTOR = 'Inform_SSII';

export default function MandateDinoTestModal({ isOpen, onClose }: MandateDinoTestModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = getTranslations(language);

  // Pre-select the IT Services sector
  const [selectedSectors, setSelectedSectors] = useState<string[]>([DEMO_SECTOR]);
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedResultId, setExpandedResultId] = useState<number | null>(null);
  const [showDemoRestriction, setShowDemoRestriction] = useState(false);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedSectors([DEMO_SECTOR]);
      setSearchState('idle');
      setCurrentStep(0);
      setExpandedResultId(null);
      setShowDemoRestriction(false);
    }
  }, [isOpen]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key and click outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && searchState !== 'searching') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && searchState !== 'searching') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, searchState]);

  // Search animation state machine
  useEffect(() => {
    if (searchState !== 'searching') return;

    const totalSteps = t.packages.mandateDinoTest.searchSteps.length;

    if (currentStep < totalSteps) {
      const timeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, stepDurations[currentStep] || 1000);

      return () => clearTimeout(timeout);
    } else {
      // All steps complete
      setSearchState('complete');
    }
  }, [searchState, currentStep, t.packages.mandateDinoTest.searchSteps.length]);

  const handleSectorClick = (value: string) => {
    if (value === DEMO_SECTOR) {
      // Toggle the demo sector
      setSelectedSectors((prev) =>
        prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
      );
    } else {
      // Show demo restriction message for other sectors
      setShowDemoRestriction(true);
    }
  };

  const handleRunTest = () => {
    if (selectedSectors.length === 0) return;
    setSearchState('searching');
    setCurrentStep(0);
  };

  const handleSeeMore = () => {
    window.open('https://cal.com/vincent-baron/30mins-meeting', '_blank');
  };

  const toggleResultExpansion = (id: number) => {
    setExpandedResultId(expandedResultId === id ? null : id);
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 999999 }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        style={{ zIndex: 999998 }}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl transform transition-all flex flex-col overflow-hidden"
        style={{ zIndex: 999999 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-br from-purple-50 to-purple-100 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {t.packages.mandateDinoTest.modalTitle}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {t.packages.mandateDinoTest.modalSubtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={searchState === 'searching'}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full transition-colors flex-shrink-0 ml-4 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close modal"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {searchState === 'idle' && (
            <>
              {/* Demo Restriction Alert */}
              {showDemoRestriction && (
                <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-amber-800">{t.packages.mandateDinoTest.demoRestriction}</p>
                      <p className="text-sm text-amber-700 mt-1">{t.packages.mandateDinoTest.demoRestrictionDesc}</p>
                      <button
                        onClick={handleSeeMore}
                        className="mt-2 text-sm font-medium text-purple-600 hover:text-purple-700"
                      >
                        {t.packages.bookCall} →
                      </button>
                    </div>
                    <button
                      onClick={() => setShowDemoRestriction(false)}
                      className="text-amber-600 hover:text-amber-800"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Sector Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  {t.packages.mandateDinoTest.selectSectors}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2">
                  {jobSectors.map((sector) => {
                    const isDemoSector = sector.value === DEMO_SECTOR;
                    const isSelected = selectedSectors.includes(sector.value);

                    return (
                      <label
                        key={sector.value}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-purple-50 border-purple-300'
                            : isDemoSector
                            ? 'bg-gray-50 border-gray-200 hover:border-purple-200'
                            : 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-80'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSectorClick(sector.value);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className={`w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500 ${
                            !isDemoSector ? 'cursor-not-allowed' : ''
                          }`}
                        />
                        <span className="text-sm text-gray-700 flex-1">{sector.label[language]}</span>
                        {!isDemoSector && (
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Run Test Button */}
              <button
                onClick={handleRunTest}
                disabled={selectedSectors.length === 0}
                className={`w-full py-3 px-6 rounded-lg text-white font-semibold shadow-lg transition-all duration-200 ${
                  selectedSectors.length > 0
                    ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 hover:from-purple-700 hover:via-purple-600 hover:to-purple-500 hover:scale-105 hover:shadow-xl'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {t.packages.mandateDinoTest.runTest}
              </button>

              {selectedSectors.length === 0 && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  {t.packages.mandateDinoTest.noSectorSelected}
                </p>
              )}
            </>
          )}

          {searchState === 'searching' && (
            <div className="py-12">
              {/* Progress Animation */}
              <div className="flex flex-col items-center">
                {/* Animated Spinner */}
                <div className="relative mb-8">
                  <div className="w-16 h-16 border-4 border-purple-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="w-full max-w-md space-y-3">
                  {t.packages.mandateDinoTest.searchSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 transition-all duration-300 ${
                        index < currentStep
                          ? 'opacity-50'
                          : index === currentStep
                          ? 'opacity-100'
                          : 'opacity-30'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                          index < currentStep
                            ? 'bg-purple-600'
                            : index === currentStep
                            ? 'bg-purple-600 animate-pulse'
                            : 'bg-gray-300'
                        }`}
                      >
                        {index < currentStep ? (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="text-xs text-white font-medium">{index + 1}</span>
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          index === currentStep ? 'text-purple-700 font-medium' : 'text-gray-600'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="w-full max-w-md mt-6">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500 ease-out"
                      style={{
                        width: `${(currentStep / t.packages.mandateDinoTest.searchSteps.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {searchState === 'complete' && (
            <div className="py-4">
              {/* Success Message */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {t.packages.mandateDinoTest.complete.replace('{{count}}', '247')}
                </span>
              </div>

              {/* Results */}
              <div className="mb-6 relative">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">
                    {t.packages.mandateDinoTest.resultsTitle}
                  </h3>
                  <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                    {t.packages.mandateDinoTest.freeResults}
                  </span>
                </div>

                <div className="space-y-3">
                  {mockResults.slice(0, 3).map((result) => (
                    <div
                      key={result.id}
                      className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                    >
                      {/* Collapsed View */}
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                        onClick={() => toggleResultExpansion(result.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{result.company}</p>
                            <p className="text-sm text-gray-600">{result.job}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              {t.packages.mandateDinoTest.postedAgo.replace('{{time}}', result.time)}
                            </p>
                            <p className="text-xs text-purple-600 font-medium">
                              {t.packages.mandateDinoTest.competitor}
                            </p>
                          </div>
                          <svg
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              expandedResultId === result.id ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedResultId === result.id && (
                        <div className="border-t border-gray-200 p-4 bg-white space-y-4">
                          {/* Location & Salary */}
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="text-gray-600">{result.location[language]}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-gray-600 font-medium">{result.salary}</span>
                            </div>
                          </div>

                          {/* Description */}
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
                              {t.packages.mandateDinoTest.description}
                            </h4>
                            <p className="text-sm text-gray-700">{result.description[language]}</p>
                          </div>

                          {/* Profile */}
                          <div>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-1">
                              {t.packages.mandateDinoTest.profile}
                            </h4>
                            <p className="text-sm text-gray-700">{result.profile[language]}</p>
                          </div>
                           {/* Contact HR Button */}
                          <a
                            href={result.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white text-sm font-medium rounded-lg hover:bg-[#004182] transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                            {t.packages.mandateDinoTest.contactHR}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Faded results with overlay */}
                  <div className="relative">
                    {mockResults.slice(3).map((result) => (
                      <div
                        key={result.id}
                        className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{result.company}</p>
                            <p className="text-sm text-gray-600">{result.job}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Fade overlay with See More */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-transparent flex flex-col items-center justify-end">
                      <p className="text-sm text-gray-600 mb-3">
                        {t.packages.mandateDinoTest.moreResults2.replace('{{count}}', '5 720')}
                      </p>
                      <button
                        onClick={handleSeeMore}
                        className="px-6 py-3 rounded-lg text-white font-semibold shadow-lg bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 hover:from-purple-700 hover:via-purple-600 hover:to-purple-500 transition-all duration-200 hover:scale-105 hover:shadow-xl"
                      >
                        {t.packages.mandateDinoTest.seeMore}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
