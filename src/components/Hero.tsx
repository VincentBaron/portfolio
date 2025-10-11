import { useCallback, useState } from 'react';
import CalendlyModal from './CalendlyModal';

interface SprintPlan {
  status: 'complete' | 'needs_details';
  assumptions: string[];
  clarificationsNeeded: string[];
  generalSolution: string;
  mvpSolution: string;
  sprintDurationDays: number;
  ctaCopy: string;
  followUpQuestions: string[];
}

type FlowState = 'input' | 'loading' | 'result' | 'error' | 'clarify';

interface HeroProps {
  calendarLink?: string;
}

export default function Hero({ calendarLink = 'https://cal.com/2weekstosolve' }: HeroProps) {
  const [painpoint, setPainpoint] = useState('');
  const [flowState, setFlowState] = useState<FlowState>('input');
  const [sprintPlan, setSprintPlan] = useState<SprintPlan | null>(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clarificationInput, setClarificationInput] = useState('');
  const [conversation, setConversation] = useState<{ initial: string; clarifications: string[] }>({
    initial: '',
    clarifications: [],
  });

  const webhookUrl =
    import.meta.env.PUBLIC_N8N_WEBHOOK_URL ?? 'http://localhost:5678/webhook/planner';

  const buildPayload = useCallback((initial: string, clarifications: string[]) => {
    const sections = [`Original Painpoint:\n${initial}`];
    clarifications.forEach((detail, index) => {
      sections.push(`Additional Detail ${index + 1}:\n${detail}`);
    });
    return sections.join('\n\n');
  }, []);

  const requestPlan = useCallback(
    async (payload: string) => {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ painpoint: payload }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `n8n webhook error (${response.status}): ${
            errorText || response.statusText || 'Unexpected error'
          }`
        );
      }

      const data = await response.json();
      if (!data || typeof data !== 'object' || !data.plan) {
        throw new Error('Unexpected response from n8n webhook');
      }

      const plan = data.plan as Partial<SprintPlan>;
      const status =
        plan.status === 'complete'
          ? 'complete'
          : plan.status === 'needs_details'
          ? 'needs_details'
          : 'needs_details';

      return {
        status,
        assumptions: Array.isArray(plan.assumptions) ? plan.assumptions : [],
        clarificationsNeeded: Array.isArray(plan.clarificationsNeeded) ? plan.clarificationsNeeded : [],
        generalSolution: plan.generalSolution ?? '',
        mvpSolution: plan.mvpSolution ?? '',
        sprintDurationDays:
          typeof plan.sprintDurationDays === 'number'
            ? plan.sprintDurationDays
            : Number.parseInt(String(plan.sprintDurationDays ?? 0), 10) || 0,
        ctaCopy: plan.ctaCopy ?? '',
        followUpQuestions: Array.isArray(plan.followUpQuestions) ? plan.followUpQuestions : [],
      } as SprintPlan;
    },
    [webhookUrl]
  );
  const validateInput = (input: string): string | null => {
    if (!input.trim()) return 'Please describe your painpoint';
    if (input.trim().length < 10) return 'Please provide more details about your painpoint';
    if (input.trim().length > 500) return 'Please keep your painpoint under 500 characters';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateInput(painpoint);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setFlowState('loading');
    const trimmed = painpoint.trim();
    setConversation({ initial: trimmed, clarifications: [] });

    try {
      const payload = buildPayload(trimmed, []);
      const plan = await requestPlan(payload);
      setSprintPlan(plan);
      if (plan.status === 'complete') {
        setFlowState('result');
      } else {
        setFlowState('clarify');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to reach n8n webhook';
      setError(message);
      setFlowState('error');
    }
  };

  const clarificationHistory = conversation.clarifications;
  const generalSolutionLines =
    sprintPlan?.generalSolution
      ?.split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean) ?? [];
  const mvpItems =
    sprintPlan?.mvpSolution
      ?.split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean) ?? [];

  const handleRetry = () => {
    setError('');
    setFlowState('input');
    setSprintPlan(null);
    setClarificationInput('');
    setConversation({ initial: '', clarifications: [] });
  };

  const handleClarificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const additionalDetails = clarificationInput.trim();
    if (!additionalDetails) {
      setError('Please provide additional details before resubmitting.');
      return;
    }

    const basePainpoint = conversation.initial;
    if (!basePainpoint) {
      setError('Original painpoint missing. Please start over.');
      setFlowState('error');
      return;
    }

    setError('');
    const nextClarifications = [...conversation.clarifications, additionalDetails];
    setConversation({ initial: basePainpoint, clarifications: nextClarifications });
    setClarificationInput('');
    setFlowState('loading');

    try {
      const payload = buildPayload(basePainpoint, nextClarifications);
      const plan = await requestPlan(payload);
      setSprintPlan(plan);
      if (plan.status === 'complete') {
        setFlowState('result');
      } else {
        setFlowState('clarify');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to reach n8n webhook';
      setError(message);
      setFlowState('error');
    }
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

            {/* Clarify State */}
            {flowState === 'clarify' && sprintPlan && (
              <div className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto">
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M8.257 3.099c.765-1.36 2.718-1.36 3.482 0l6.516 11.591c.75 1.334-.213 2.986-1.742 2.986H3.483c-1.53 0-2.492-1.652-1.742-2.986L8.257 3.1z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
                        Needs Clarification
                      </p>
                      <h3 className="text-xl font-bold text-gray-900">
                        I need a bit more context to craft the sprint.
                      </h3>
                    </div>
                  </div>

                  {sprintPlan.clarificationsNeeded.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-700 mb-2">
                        Please answer the following so I can propose a concrete plan:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {sprintPlan.clarificationsNeeded.map((question, index) => (
                          <li key={`clarification-${index}`}>{question}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {clarificationHistory.length > 0 && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <p className="text-sm font-medium text-blue-800 mb-2">Details you've already shared:</p>
                      <ul className="space-y-2 text-sm text-blue-900">
                        {clarificationHistory.map((detail, index) => (
                          <li key={`clarification-history-${index}`}>
                            <span className="font-semibold">Update {index + 1}:</span> {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <form onSubmit={handleClarificationSubmit} className="space-y-3">
                    <label className="block text-sm font-medium text-gray-800">
                      Add more details
                      <textarea
                        value={clarificationInput}
                        onChange={(e) => setClarificationInput(e.target.value)}
                        className="mt-2 w-full rounded-2xl border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-200 px-4 py-3 text-sm text-gray-900 shadow-inner resize-y min-h-[120px]"
                        placeholder="Share additional context, constraints, or goals..."
                      />
                    </label>
                    {error && (
                      <p className="text-red-600 text-sm">{error}</p>
                    )}
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                      >
                        Resubmit with more context
                      </button>
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Start over
                      </button>
                    </div>
                  </form>
                </div>
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

            {/* Result State */}
            {flowState === 'result' && sprintPlan && (
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-2xl p-6 shadow-xl border border-blue-200 hover:border-blue-300 transition-all duration-500 hover:shadow-blue-200/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200/30 rounded-full blur-xl group-hover:bg-blue-300/40 transition-all duration-500"></div>
                    <div className="relative">
                      <div className="flex justify-between items-start mb-4">
                        <div className="px-3 py-1 bg-blue-100 border border-blue-300 rounded-full">
                          <span className="text-xs font-medium text-blue-700">~1 month</span>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                          </svg>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent mb-3">
                        Full Implementation
                      </h3>

                      <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                        {generalSolutionLines.length > 0 ? (
                          generalSolutionLines.map((line, index) => (
                            <p key={`general-solution-${index}`}>{line}</p>
                          ))
                        ) : (
                          <p>{sprintPlan.generalSolution}</p>
                        )}
                      </div>

                    </div>
                  </div>

                  <div className="group relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-pink-100 rounded-2xl p-6 shadow-xl border border-purple-200 hover:border-purple-300 transition-all duration-500 hover:shadow-purple-200/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200/30 rounded-full blur-xl group-hover:bg-purple-300/40 transition-all duration-500"></div>
                    <div className="relative">
                      <div className="flex justify-between items-start mb-4">
                        <div className="px-3 py-1 bg-purple-100 border border-purple-300 rounded-full">
                          <span className="text-xs font-medium text-purple-700">
                            {`~${sprintPlan.sprintDurationDays || 10} days`}
                          </span>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-purple-700 bg-clip-text text-transparent mb-4">
                        MVP Sprint Outline
                      </h3>

                      {mvpItems.length > 0 ? (
                        <ul className="space-y-2 text-sm text-gray-700">
                          {mvpItems.map((item, index) => (
                            <li key={`mvp-item-${index}`} className="flex items-start gap-2">
                              <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-purple-500"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-700 leading-relaxed">{sprintPlan.mvpSolution}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleBookCall}
                    className="inline-flex items-center px-6 py-3 rounded-full text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200 justify-center"
                  >
                    Book a call
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      setPainpoint('');
                      setFlowState('input');
                      setSprintPlan(null);
                      setClarificationInput('');
                      setConversation({ initial: '', clarifications: [] });
                      setError('');
                    }}
                    className="inline-flex items-center px-5 py-2.5 rounded-full border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
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
