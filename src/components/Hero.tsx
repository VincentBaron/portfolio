import { useState } from 'react';
import CalendlyModal from './CalendlyModal';

type FlowState = 'input' | 'collect_email' | 'email_submitted';

interface HeroProps {
  calendarLink?: string;
}

export default function Hero({ calendarLink = 'https://cal.com/2weekstosolve' }: HeroProps) {
  const [painpoint, setPainpoint] = useState('');
  const [flowState, setFlowState] = useState<FlowState>('input');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedPainpoint, setCapturedPainpoint] = useState('');
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const validateInput = (input: string): string | null => {
    if (!input.trim()) return 'Please describe your painpoint';
    if (input.trim().length < 10) return 'Please provide more details about your painpoint';
    if (input.trim().length > 500) return 'Please keep your painpoint under 500 characters';
    return null;
  };

  const validateEmail = (value: string): string | null => {
    if (!value.trim()) return 'Please provide your email address';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value.trim())) return 'Please enter a valid email address';
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
    setEmailError('');
    setSubmissionError('');
    setIsSubmitting(false);
    const trimmed = painpoint.trim();
    setCapturedPainpoint(trimmed);
    setPainpoint('');
    setFlowState('collect_email');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }

    setEmailError('');
    setSubmissionError('');
    if (!capturedPainpoint) {
      setError('Please describe your painpoint before sharing your email.');
      setFlowState('input');
      return;
    }

    const trimmedEmail = email.trim();
    setIsSubmitting(true);

    console.log("Submitting email:", trimmedEmail, "for painpoint:", capturedPainpoint);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: trimmedEmail,
          painpoint: capturedPainpoint,
        }),
      });

      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          data && typeof data === 'object' && 'error' in data
            ? String((data as { error?: unknown }).error ?? '')
            : '';
        setSubmissionError(message || 'Unable to save your details. Please try again.');
        return;
      }

      setSubmittedEmail(trimmedEmail);
      setEmail('');
      setSubmissionError('');
      setFlowState('email_submitted');
    } catch {
      setSubmissionError('Unexpected error while sending your details. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setError('');
    setFlowState('input');
    setCapturedPainpoint('');
    setEmail('');
    setSubmittedEmail('');
    setEmailError('');
    setSubmissionError('');
    setIsSubmitting(false);
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
              Reduce by up to 80% manual work.{' '}
              <br />
              <span className="text-gradient">Save up to 40% on operational costs.</span>
            </h1>

            <div className="mb-2 sm:mb-3 lg:mb-4">
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-2 leading-relaxed">
                I'll solve your painpoint in just{' '}
                <span className="font-semibold text-blue-600">2 weeks</span>.
              </p>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                Scalable MVPs • AI-powered solutions (RAG/LLM) • Production-ready features
              </p>
                <p className="text-base sm:text-lg text-purple-600 font-semibold mt-1 sm:mt-2">
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
            {/* Email Collection State */}
            {flowState === 'collect_email' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
                        Almost there
                      </p>
                      <h3 className="text-xl font-bold text-gray-900">
                        Where should I send your detailed audit and implementation plan?
                      </h3>
                    </div>
                  </div>

                  {capturedPainpoint && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                      <p className="font-semibold text-blue-900 mb-1">Painpoint received</p>
                      <p className="leading-relaxed">{capturedPainpoint}</p>
                    </div>
                  )}

                  <p className="text-sm text-gray-700">
                    I’ll review this and send a deeper breakdown with timelines, quick wins, and the two-week sprint
                    structure straight to your inbox.
                  </p>

                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <div className="relative max-w-lg">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError('');
                          if (submissionError) setSubmissionError('');
                        }}
                        placeholder="you@company.com"
                        disabled={isSubmitting}
                        className={`w-full rounded-full border-2 px-4 sm:px-6 py-3 pr-28 text-sm sm:text-base focus:outline-none focus:ring-4 transition-all shadow-lg hover:shadow-xl bg-white ${
                          emailError || submissionError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10'
                        } ${isSubmitting ? 'opacity-80 cursor-progress' : ''}`}
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Send it'}
                      </button>
                    </div>
                    {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
                    {submissionError && !emailError && (
                      <p className="text-red-600 text-sm">{submissionError}</p>
                    )}
                  </form>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Share a different painpoint
                    </button>
                  </div>
                </div>
              </div>
            )}

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

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleBookCall}
                  className="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200 justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V5a3 3 0 016 0v2h3a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3zm2-2a1 1 0 112 0v2h-2V5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6" />
                  </svg>
                  Book a 20-min call
                </button>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.383 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-4.925 7-9.542 7s-8.268-2.943-9.542-7z" />
                  </svg>
                  See use cases
                </a>
              </div>
            </div>

            {/* Email Submitted State */}
            {flowState === 'email_submitted' && (
              <div className="max-w-4xl mx-auto space-y-4">
                <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-white/10">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/70 font-semibold">
                        Check your inbox
                      </p>
                      <h3 className="text-xl font-bold">
                        I’ll send the audit and implementation plan to {submittedEmail}.
                      </h3>
                    </div>
                  </div>

                  {capturedPainpoint && (
                    <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-sm text-white/90 mb-4">
                      <p className="text-xs uppercase tracking-wide text-white/70 font-semibold mb-2">
                        What I’m reviewing
                      </p>
                      <p className="leading-relaxed">{capturedPainpoint}</p>
                    </div>
                  )}

                  <p className="text-sm text-white/80 mb-6">
                    Expect a response within one business day. In the meantime, feel free to book a call or dive into
                    relevant case studies.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleBookCall}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-blue-600 font-semibold shadow-lg hover:text-blue-700 transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a3 3 0 016 0v2h3a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3zm2-2a1 1 0 112 0v2h-2V5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6" />
                      </svg>
                      Book a call
                    </button>
                    <a
                      href="#work"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white border border-white/40 font-semibold hover:bg-white/20 transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                      View case studies
                    </a>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleRetry}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 5A8.001 8.001 0 004.582 9H9m0 11v-5h-.582" />
                    </svg>
                    Share another painpoint
                  </button>
                </div>
              </div>
            )}

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
      </div>

      {/* Calendly Modal */}
      <CalendlyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        painpoint={capturedPainpoint || painpoint}
      />
    </section>
  );
}
