interface HeroProps {
  calendarLink?: string;
}

export default function Hero({ calendarLink = 'https://cal.com/2weekstosolve' }: HeroProps) {
  return (
    <section className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 pb-0">
      <div className="max-w-7xl mx-auto w-full pb-0">
        {/* Hero Content with Profile Picture */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-center mb-10">
          {/* Left Side - Profile Picture */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative">
              {/* Decorative gradient background */}
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur-xl"></div>
              {/* Profile image container */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Built fast.{' '}
              <span className="block sm:inline">Built to scale.</span>
              <br />
              <span className="text-gradient">Built with AI.</span>
            </h1>

            <div className="mb-8">
              <p className="text-lg sm:text-xl text-gray-700 mb-3 leading-relaxed">
                Transform your vision into reality in just{' '}
                <span className="font-semibold text-blue-600">2 weeks</span>.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Scalable MVPs • AI-powered solutions (RAG/LLM) • Production-ready features
              </p>
              <p className="text-sm sm:text-base text-purple-600 font-medium mt-3">
                🌍 5% of net profits invested in projects driving social and environmental impact.
              </p>
            </div>

            {/* CTAs - Moved here */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
              {/* Primary CTA */}
              <a
                href={calendarLink}
                target="_blank"
                rel="noopener noreferrer"
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
                Book a 20-min call
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
              </a>

              {/* Secondary CTA */}
              <a
                href="/work"
                className="group inline-flex items-center px-6 py-3 rounded-lg text-base font-semibold text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-gray-300 hover:border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200 min-w-[220px] justify-center"
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                See case studies
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
              </a>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-6 pt-6 text-center">
          <p className="text-sm text-gray-600 mb-4 font-medium">They Trusted Me</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="text-xl mb-1">"</div>
              <p className="text-xs text-gray-700 mb-3 leading-relaxed">
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
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="text-xl mb-1">"</div>
              <p className="text-xs text-gray-700 mb-3 leading-relaxed">
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
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="text-xl mb-1">"</div>
              <p className="text-xs text-gray-700 mb-3 leading-relaxed">
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

          {/* Stats Section */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 items-center">
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
        </div>
      </div>
    </section>
  );
}
