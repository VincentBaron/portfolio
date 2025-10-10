import { useState, useEffect } from 'react';
import CalendlyModal from './CalendlyModal';

interface SprintPlan {
  projectTitle: string;
  description: string;
}

type FlowState = 'input' | 'loading' | 'result' | 'error';

interface HeroProps {
  calendarLink?: string;
}

export default function Hero({ calendarLink = 'https://cal.com/2weekstosolve' }: HeroProps) {
  const [painpoint, setPainpoint] = useState('');
  const [flowState, setFlowState] = useState<FlowState>('input');
  const [sprintPlan, setSprintPlan] = useState<SprintPlan | null>(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const validateInput = (input: string): string | null => {
    if (!input.trim()) return 'Please describe your painpoint';
    if (input.trim().length < 10) return 'Please provide more details about your painpoint';
    if (input.trim().length > 500) return 'Please keep your painpoint under 500 characters';
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateInput(painpoint);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setFlowState('loading');

    // Show loading for 2 seconds then show results
    setTimeout(() => {
      // Simple mock plan - we only need basic structure for the display
      const mockPlan = {
        projectTitle: `Solution for: ${painpoint.substring(0, 50)}${painpoint.length > 50 ? '...' : ''}`,
        description: 'A comprehensive 2-week sprint to address your painpoint and deliver a scalable solution.',
      };

      setSprintPlan(mockPlan);
      setFlowState('result');
    }, 2000);
  };

  const handleRetry = () => {
    setError('');
    setFlowState('input');
    setSprintPlan(null);
  };



  const handleBookCall = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pb-0">
      <div className="max-w-7xl mx-auto w-full pb-0">
        {/* Hero Content with Profile Picture */}
        <div className="grid lg:grid-cols-[250px_1fr] gap-4 sm:gap-6 lg:gap-8 items-center mb-3 sm:mb-4 lg:mb-6">
          {/* Left Side - Profile Picture */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative">
              {/* Decorative gradient background */}
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur-xl"></div>
              {/* Profile image container */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56">
                <img
                  src="/profilePic.png"
                  alt="Vincent Baron - Founder"
                  className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
                />
                {/* Decorative ring */}
                <div className="absolute -inset-1 border-2 border-blue-600/30 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Headline and Text */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
              Built fast.{' '}
              <span className="block sm:inline">Built to scale.</span>
              <br />
              <span className="text-gradient">Built with AI.</span>
            </h1>

            <div className="mb-2 sm:mb-3 lg:mb-4">
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-2 leading-relaxed">
                I'll solve your painpoint in just{' '}
                <span className="font-semibold text-blue-600">2 weeks</span>.
              </p>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                Scalable MVPs • AI-powered solutions (RAG/LLM) • Production-ready features
              </p>
              <p className="text-xs sm:text-sm text-purple-600 font-medium mt-1 sm:mt-2">
                🌍 5% of net profits invested in projects driving social and environmental impact.
              </p>
            </div>
          </div>
        </div>

        {/* Painpoint to Plan Flow */}
        <div className="mb-2 sm:mb-4 lg:mb-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Input State */}
            {flowState === 'input' && (
              <div className="text-center">
                <form onSubmit={handleSubmit}>
                  <div className="relative max-w-3xl mx-auto">
                    <input
                      type="text"
                      value={painpoint}
                      onChange={(e) => setPainpoint(e.target.value)}
                      placeholder="Describe your painpoint..."
                      className={`w-full rounded-full border-2 px-4 sm:px-6 py-2 sm:py-3 lg:py-4 pr-12 sm:pr-14 text-sm sm:text-base focus:outline-none focus:ring-4 transition-all shadow-lg hover:shadow-xl bg-white ${
                        error 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10'
                      }`}
                    />
                    <button
                      type="submit"
                      disabled={!painpoint.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
                      title="Generate Sprint Plan"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                        />
                      </svg>
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-600 text-sm mt-2 animate-fade-in">{error}</p>
                  )}
                </form>
              </div>
            )}

            {/* Loading State */}
            {flowState === 'loading' && (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-3 text-gray-700">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="text-lg font-medium">Generating your sprint plan...</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">This may take a few seconds</p>
              </div>
            )}

            {/* Error State */}
            {flowState === 'error' && (
              <div className="text-center py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <div className="flex items-center gap-3 text-red-700 mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 19c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <span className="font-medium">Something went wrong</span>
                  </div>
                  <p className="text-red-600 text-sm mb-4">{error}</p>
                  <button
                    onClick={handleRetry}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Result State - Inline Solution Cards */}
            {flowState === 'result' && sprintPlan && (
              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-3 gap-4">
                  {/* 1. Complete Solution */}
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="text-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Solution</h3>
                    </div>
                    <p className="text-sm text-gray-700 text-center mb-3">
                      AI helper to handle user feedback with smart categorization, sentiment analysis, and automated responses.
                    </p>
                    <div className="text-center text-xs text-gray-500">
                      ~1 month timeline
                    </div>
                  </div>

                  {/* 2. MVP Focus */}
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <div className="text-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">MVP Focus</h3>
                    </div>
                    <p className="text-sm text-gray-700 text-center mb-3">
                      Chatbot for direct questions using existing FAQs with smart routing to customer support when needed.
                    </p>
                    <div className="text-center text-xs text-gray-500">
                      Core features only
                    </div>
                  </div>

                  {/* 3. Project Timeline */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-5">
                    <div className="text-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Timeline</h3>
                    </div>
                    <div className="space-y-2 text-sm text-center">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">MVP Duration:</span>
                        <span className="font-medium text-green-700">~10 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Full Solution:</span>
                        <span className="font-medium text-green-700">~1 month</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
                  <button
                    onClick={handleBookCall}
                    className="group inline-flex items-center px-6 py-3 rounded-lg text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200 min-w-[220px] justify-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                    Let's discuss your project
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
                  </button>

                  <button
                    onClick={() => {
                      setPainpoint('');
                      setFlowState('input');
                      setSprintPlan(null);
                      setError('');
                    }}
                    className="inline-flex items-center px-6 py-3 rounded-lg text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200 min-w-[220px] justify-center hover:bg-gray-50"
                  >
                    Try another painpoint
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 text-center">
          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 font-medium">They Trusted Me</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 sm:p-3 lg:p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="text-lg sm:text-xl mb-1">"</div>
              <p className="text-xs text-gray-700 mb-2 sm:mb-3 leading-relaxed">
                From concept to MVP in 2 weeks. The AI features Vincent built have already increased our conversions by 40%.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs">
                  👨‍💼
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-gray-900">David Kim</p>
                  <p className="text-xs text-gray-600">VP, RetailTech Pro</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 sm:p-3 lg:p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="text-lg sm:text-xl mb-1">"</div>
              <p className="text-xs text-gray-700 mb-2 sm:mb-3 leading-relaxed">
                Vincent transformed our product vision into reality. His sprint methodology eliminated all the usual friction.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs">
                  👩‍💼
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-gray-900">Sarah Chen</p>
                  <p className="text-xs text-gray-600">CEO, TechVision AI</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 sm:p-3 lg:p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="text-lg sm:text-xl mb-1">"</div>
              <p className="text-xs text-gray-700 mb-2 sm:mb-3 leading-relaxed">
                Exceptional technical skills combined with business acumen. Vincent delivered a scalable solution that grows with us.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs">
                  👩‍🔬
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-gray-900">Emily Thompson</p>
                  <p className="text-xs text-gray-600">CTO, DataFlow</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats and Companies Section */}
          <div className="mt-2 sm:mt-4 lg:mt-6 flex flex-col lg:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-8 xl:gap-12">
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  50+
                </div>
                <p className="text-xs text-gray-600 mt-1">Projects Delivered</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  98%
                </div>
                <p className="text-xs text-gray-600 mt-1">Client Satisfaction</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  2 Weeks
                </div>
                <p className="text-xs text-gray-600 mt-1">Average Sprint Time</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  4.9/5
                </div>
                <p className="text-xs text-gray-600 mt-1">Average Rating</p>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px h-20 bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-60"></div>

            {/* Companies */}
            <div className="text-center">
              <p className="text-sm text-gray-600 font-medium mb-4">Companies I worked with</p>
              <div className="flex items-center justify-center gap-6 md:gap-8">
                {/* Qomon Logo */}
                <div className="group transition-all duration-300 hover:scale-105">
                  <img
                    src="/qomonLogo.png"
                    alt="Qomon"
                    className="h-8 w-auto opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                  />
                </div>
                
                {/* Side Logo */}
                <div className="group transition-all duration-300 hover:scale-105">
                  <img
                    src="/sideLogo.png"
                    alt="Side"
                    className="h-8 w-auto opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                  />
                </div>
                
                {/* Mitsubishi Logo */}
                <div className="group transition-all duration-300 hover:scale-105">
                  <img
                    src="/mitsubishi.avif"
                    alt="Mitsubishi"
                    className="h-8 w-auto opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendly Modal */}
      <CalendlyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        painpoint={painpoint}
      />
    </section>
  );
}
