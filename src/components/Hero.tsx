import { useState, useEffect } from 'react';
import CalendlyModal from './CalendlyModal';

interface HeroProps {
  calendarLink?: string;
}

export default function Hero({ calendarLink = 'https://cal.com/2weekstosolve' }: HeroProps) {
  const [painpoint, setPainpoint] = useState('');
  const [currentSentence, setCurrentSentence] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const sentences = [
    "I took note of your issue 🙏",
    "I can help you fix that ✅",
    "Want an actionable plan free of charge ? 🚀",
  ];

  useEffect(() => {
    if (currentSentence > 0 && currentSentence < sentences.length) {
      // Wait for sentence to display, then fade out and show next
      const fadeOutTimeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 1300); // Display for 1.3 seconds
      
      const nextSentenceTimeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSentence(currentSentence + 1);
      }, 1700); // Start fade out at 1.3s, complete transition by 1.7s
      
      return () => {
        clearTimeout(fadeOutTimeout);
        clearTimeout(nextSentenceTimeout);
      };
    } else if (currentSentence === sentences.length) {
      // Fade out last sentence, then show buttons
      const fadeOutTimeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 1300);
      
      const showButtonsTimeout = setTimeout(() => {
        setShowButtons(true);
      }, 1700);
      
      return () => {
        clearTimeout(fadeOutTimeout);
        clearTimeout(showButtonsTimeout);
      };
    }
  }, [currentSentence]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!painpoint.trim()) return;
    
    // Start showing sentences
    setCurrentSentence(1);
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
                Solve your painpoint in just{' '}
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

        {/* AI Input Section - ChatGPT Style */}
        <div className="mb-2 sm:mb-4 lg:mb-6">
          <div className="max-w-3xl mx-auto text-center">
            {currentSentence === 0 && (
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    value={painpoint}
                    onChange={(e) => setPainpoint(e.target.value)}
                    placeholder="Describe your painpoint..."
                    className="w-full rounded-full border-2 border-gray-300 px-4 sm:px-6 py-2 sm:py-3 lg:py-4 pr-12 sm:pr-14 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-lg hover:shadow-xl bg-white"
                  />
                  <button
                    type="submit"
                    disabled={!painpoint.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
                    title="Send"
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
              </form>
            )}

            {/* AI Response - Sentences fade in one by one */}
            {currentSentence > 0 && !showButtons && (
              <div className="min-h-[40px] sm:min-h-[50px] lg:min-h-[60px] flex items-center justify-center">
                <p 
                  key={currentSentence} 
                  className={`text-sm sm:text-base lg:text-lg text-gray-800 font-medium animate-fade-in ${
                    isTransitioning ? 'animate-fade-out' : ''
                  }`}
                >
                  {sentences[currentSentence - 1]}
                </p>
              </div>
            )}

            {/* Buttons appear after all sentences */}
            {showButtons && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center transition-all duration-700 ease-in-out opacity-0 animate-fade-in-slow">
                <button
                  onClick={handleBookCall}
                  className="group inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200 min-w-[180px] sm:min-w-[220px] justify-center"
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
                  Book a 20-mins call
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

                <a
                  href="#work"
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
