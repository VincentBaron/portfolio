export default function SprintTimeline() {
  const steps = [
    {
      days: 'Days 1–2',
      title: 'Scope & Plan',
      description: 'I dive deep into your requirements, define clear deliverables, and create a detailed technical roadmap.',
      expectation: 'Expect: A concrete project plan, architecture decisions, and aligned expectations.',
      color: 'blue',
    },
    {
      days: 'Days 3–10',
      title: 'Build & Iterate',
      description: 'I build your solution using Go, AI/ML frameworks, and modern best practices. Daily progress updates keep you in the loop.',
      expectation: 'Expect: Working features, regular demos, and continuous feedback integration.',
      color: 'purple',
    },
    {
      days: 'Days 11–13',
      title: 'Hardening & Testing',
      description: 'I polish the experience, fix edge cases, conduct thorough testing, and optimize performance for production.',
      expectation: 'Expect: Battle-tested code, performance benchmarks, and deployment-ready artifacts.',
      color: 'pink',
    },
    {
      days: 'Day 14',
      title: 'Handover & Launch',
      description: 'Complete documentation, deployment support, and knowledge transfer ensure your team can run and maintain the solution.',
      expectation: 'Expect: Full documentation, deployment guide, and optional training session.',
      color: 'indigo',
    },
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      hoverBorder: 'hover:border-blue-500',
      text: 'text-blue-600',
      dot: 'bg-blue-600',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      hoverBorder: 'hover:border-purple-500',
      text: 'text-purple-600',
      dot: 'bg-purple-600',
    },
    pink: {
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      hoverBorder: 'hover:border-pink-500',
      text: 'text-pink-600',
      dot: 'bg-pink-600',
    },
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      hoverBorder: 'hover:border-indigo-500',
      text: 'text-indigo-600',
      dot: 'bg-indigo-600',
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            The 2-Week Sprint
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            A proven process that delivers production-ready solutions in 14 days
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, index) => {
              const colors = colorClasses[step.color as keyof typeof colorClasses];
              
              return (
                <div
                  key={index}
                  className={`group relative bg-white rounded-2xl p-6 border-2 ${colors.border} ${colors.hoverBorder} transition-all duration-300 hover:shadow-xl hover:-translate-y-2 focus-within:ring-4 focus-within:ring-${step.color}-500 focus-within:ring-opacity-50`}
                  role="article"
                  aria-label={`Step ${index + 1}: ${step.title}`}
                  tabIndex={0}
                >
                  {/* Step Number & Dot */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center`}>
                      <div className={`w-6 h-6 rounded-full ${colors.dot}`} />
                    </div>
                    <div>
                      <div className={`text-sm font-semibold ${colors.text} uppercase tracking-wide`}>
                        {step.days}
                      </div>
                      <div className="text-xs text-gray-500">
                        Step {index + 1} of 4
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Expectation */}
                  <div className={`${colors.bg} rounded-lg p-3 border ${colors.border}`}>
                    <p className="text-xs font-medium text-gray-700 leading-relaxed">
                      {step.expectation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Ready to transform your idea into reality?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-8 py-4 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Start Your Sprint
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
