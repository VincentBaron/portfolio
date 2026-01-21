import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../lib/language';
import { getTranslations } from '../lib/translations';
import { fetchCategories, searchLeads, type Category, type JobResult } from '../lib/leadEngineApi';

interface MandateDinoTestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SearchState = 'idle' | 'searching' | 'complete';

// Step durations in milliseconds (can be adjusted or made dynamic)
const stepDurations = [1000, 1500, 1500, 1000, 1000, 1000];

// Define free tier sectors that are unlockable
const FREE_TIER_SECTORS = [
  'Agri_peche',
  'Inform_SSII',
  'BTP',
  'Banq_assur_finan',
  'Distrib_commerce',
  'Sante_social'
];

type ViewState = 'search' | 'premium_upsell';

export default function MandateDinoTestModal({ isOpen, onClose }: MandateDinoTestModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = getTranslations(language);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedLimit, setSelectedLimit] = useState<number>(10);
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedResultId, setExpandedResultId] = useState<number | null>(null);
  const [showDemoRestriction, setShowDemoRestriction] = useState(false);
  const [results, setResults] = useState<JobResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>('search');
  const [isDataReady, setIsDataReady] = useState(false);

  // Load categories on mount
  useEffect(() => {
    fetchCategories().then(data => {
      setCategories(data);
      if (data.some(c => c.value === 'Inform_SSII')) {
        setSelectedSector('Inform_SSII');
      }
    });
  }, []);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchState('idle');
      setCurrentStep(0);
      setExpandedResultId(null);
      setShowDemoRestriction(false);
      setResults([]);
      setSearchError(null);

      setViewState('search');
      setIsDataReady(false);
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
    } else if (isDataReady) {
      setSearchState('complete');
    }
  }, [searchState, currentStep, isDataReady, t.packages.mandateDinoTest.searchSteps.length]);

  const handleSectorClick = (value: string) => {
    if (FREE_TIER_SECTORS.includes(value)) {
      setSelectedSector(value === selectedSector ? null : value);
      setShowDemoRestriction(false);
    } else {
      setViewState('premium_upsell');
    }
  };

  const handleRunTest = async () => {
    if (!selectedSector) return;

    setSearchState('searching');
    setCurrentStep(0);
    setSearchError(null);
    setResults([]);
    setIsDataReady(false);

    try {
      const response = await searchLeads([selectedSector], selectedLimit, 'free');
      setResults(response.results);
      setTotalResults(response.total);
      setIsDataReady(true);
    } catch (error: any) {
      console.error("Search failed", error);
      setSearchError(error.message || "Failed to load results. Please make sure the backend is running.");
      setSearchState('idle');
    }
  };

  const handleSeeMore = () => {
    window.open('https://cal.com/vincent-baron/30mins-meeting', '_blank');
  };

  const toggleResultExpansion = (index: number) => {
    setExpandedResultId(expandedResultId === index ? null : index);
  };

  if (!isOpen) return null;

  const renderPremiumUpsell = () => (
    <div className="flex flex-col h-full bg-white p-6 justify-center items-center text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Unleash the Full Power</h3>
      <p className="text-gray-600 mb-8 max-w-md">
        Unlock advanced features designed for high-performance recruitment agencies:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-8 text-left">
        {[
          'Unlimited search results',
          'Access to all 26+ job sectors',
          'Advanced filtering (Job Title, Date)',
          'Direct CRM Integration',
          'Daily new lead notifications',
          'Advanced company enrichment'
        ].map((feature, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <button
          onClick={handleSeeMore}
          className="flex-1 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          Book a Demo Call
        </button>
        <button
          onClick={() => setViewState('search')}
          className="flex-1 py-3 px-6 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 999999 }}
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        style={{ zIndex: 999998 }}
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl transform transition-all flex flex-col overflow-hidden"
        style={{ zIndex: 999999 }}
      >
        {viewState === 'premium_upsell' ? (
          renderPremiumUpsell()
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100 flex-shrink-0">
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
                  {/* Error Message */}
                  {searchError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      <p className="font-semibold">Error</p>
                      <p>{searchError}</p>
                    </div>
                  )}

                  {/* Limit Selection - BEFORE Sector selection */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Number of results to analyze
                    </h3>
                    <div className="flex gap-2">
                      {[10, 20, 50, 100].map(limit => {
                        const isPremium = limit >= 50;
                        const isSelected = selectedLimit === limit;

                        return (
                          <button
                            key={limit}
                            onClick={() => {
                              if (isPremium) {
                                setViewState('premium_upsell');
                              } else {
                                setSelectedLimit(limit);
                              }
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all flex items-center gap-2 ${isSelected
                              ? 'bg-blue-50 border-blue-300 text-blue-700'
                              : isPremium
                                ? 'bg-gray-50 border-gray-200 text-gray-400 hover:border-gray-300'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-blue-200'
                              }`}
                          >
                            {limit} Jobs
                            {isPremium && (
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sector Selection */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      {t.packages.mandateDinoTest.selectSectors}
                    </h3>
                    {categories.length === 0 ? (
                      <div className="text-gray-500 italic">Loading sectors...</div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-2">
                        {categories.map((sector) => {
                          const isFree = FREE_TIER_SECTORS.includes(sector.value);
                          const isSelected = selectedSector === sector.value;

                          return (
                            <label
                              key={sector.value}
                              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isSelected
                                ? 'bg-blue-50 border-blue-300'
                                : isFree
                                  ? 'bg-white border-gray-200 hover:border-blue-200'
                                  : 'bg-gray-50 border-gray-200 opacity-70 hover:opacity-90'
                                }`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleSectorClick(sector.value);
                              }}
                            >
                              <input
                                type="radio"
                                name="sector"
                                checked={isSelected}
                                readOnly
                                className={`w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 ${!isFree ? 'cursor-not-allowed' : ''
                                  }`}
                              />
                              <span className="text-sm text-gray-700 flex-1">{sector.label}</span>
                              {!isFree && (
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Run Test Button */}
                  <button
                    onClick={handleRunTest}
                    disabled={!selectedSector}
                    className={`w-full py-3 px-6 rounded-lg text-white font-semibold shadow-lg transition-all duration-200 ${selectedSector
                      ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 hover:from-blue-700 hover:via-blue-600 hover:to-blue-500 hover:scale-105 hover:shadow-xl'
                      : 'bg-gray-300 cursor-not-allowed'
                      }`}
                  >
                    {t.packages.mandateDinoTest.runTest}
                  </button>
                </>
              )}

              {searchState === 'searching' && (
                <div className="py-12">
                  {/* Progress Animation */}
                  <div className="flex flex-col items-center">
                    {/* Animated Spinner */}
                    <div className="relative mb-8">
                      <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="w-full max-w-md space-y-3">
                      {t.packages.mandateDinoTest.searchSteps.map((step, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-3 transition-all duration-300 ${index < currentStep
                            ? 'opacity-50'
                            : index === currentStep
                              ? 'opacity-100'
                              : 'opacity-30'
                            }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${index < currentStep
                              ? 'bg-blue-600'
                              : index === currentStep
                                ? 'bg-blue-600 animate-pulse'
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
                            className={`text-sm ${index === currentStep ? 'text-blue-700 font-medium' : 'text-gray-600'
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
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500 ease-out"
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
                      {t.packages.mandateDinoTest.complete.replace('{{count}}', totalResults.toString())}
                    </span>
                  </div>

                  {/* Results */}
                  <div className="mb-6 relative">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-700">
                        {t.packages.mandateDinoTest.resultsTitle}
                      </h3>
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        Showing 4 of {totalResults}
                      </span>
                    </div>

                    {results.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No opportunities found in this sector right now.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Render top 4 results */}
                        {results.slice(0, 4).map((result, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                          >
                            {/* Collapsed View */}
                            <div
                              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                              onClick={() => toggleResultExpansion(index)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">{result.jobTitle}</p>
                                  <p className="text-sm text-gray-600">
                                    {result.companies && result.companies.length > 0
                                      ? `${result.companies.length} potential leads identified`
                                      : 'Analyzing companies...'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <p className="text-xs text-blue-600 font-medium">
                                    Via {result.agencyName || 'Competitor'}
                                  </p>
                                </div>
                                <svg
                                  className={`w-5 h-5 text-gray-400 transition-transform ${expandedResultId === index ? 'rotate-180' : ''
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
                            {expandedResultId === index && (
                              <div className="border-t border-gray-200 p-4 bg-white space-y-4">
                                <div className="space-y-3">
                                  <h4 className="text-xs font-semibold text-gray-500 uppercase">
                                    Identified Companies
                                  </h4>
                                  {result.companies && result.companies.length > 0 ? (
                                    result.companies.map((company, cIndex) => (
                                      <div key={cIndex} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-3">
                                        <div>
                                          <p className="font-medium text-gray-900">{company.companyName}</p>
                                          <p className="text-xs text-gray-500">Match score: {company.probability_score}/10</p>
                                        </div>
                                        <div className="flex gap-2">
                                          <a
                                            href={company.linkedin_url || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-1 transition-colors ${company.linkedin_url
                                              ? 'bg-[#0A66C2] text-white hover:bg-[#004182]'
                                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                              }`}
                                            onClick={(e) => !company.linkedin_url && e.preventDefault()}
                                          >
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            LinkedIn
                                          </a>
                                          <a
                                            href={company.company_website || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-1 transition-colors ${company.company_website
                                              ? 'bg-gray-700 text-white hover:bg-gray-800'
                                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                              }`}
                                            onClick={(e) => !company.company_website && e.preventDefault()}
                                          >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                            Website
                                          </a>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-sm text-gray-500">No companies confidently identified for this posting.</p>
                                  )}
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100">
                                  <a
                                    href={result.jobUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    View Original Job Posting
                                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Faded Fake Results with CTA */}
                        <div className="relative">
                          <div className="select-none pointer-events-none">
                            {[1, 2].map((_, i) => (
                              <div key={i} className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-3">
                                <div className="flex items-center gap-3 opacity-50">
                                  <div className="w-10 h-10 bg-gray-200 rounded-lg blur-[3px]"></div>
                                  <div className="space-y-2 flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-1/3 blur-[3px]"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/4 blur-[3px]"></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-transparent via-white/40 to-white/90">
                            <button
                              onClick={() => setViewState('premium_upsell')}
                              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105"
                            >
                              See All Results
                            </button>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
