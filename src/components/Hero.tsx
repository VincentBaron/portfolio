import { useState, useEffect } from 'react';
import CalendlyModal from './CalendlyModal';
import CalculatorModal from './CalculatorModal';
import { useLanguage, type Language } from '../lib/language';
import { getTranslations, testimonials } from '../lib/translations';

const EMPLOYER_CHARGE_RATE = 0.44;
const EMPLOYER_CHARGE_PERCENT = Math.round(EMPLOYER_CHARGE_RATE * 100);
const EMPLOYER_MULTIPLIER = 1 + EMPLOYER_CHARGE_RATE;
const HIGHLIGHT_FOCUS_TOKENS = ['35h/week', '35h/semaine'];

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

type FlowState = 'input' | 'collect_email' | 'email_submitted';

interface HeroProps {
  calendarLink?: string;
  showOnlyIntro?: boolean;
  showOnlyCalculator?: boolean;
  showWithTestimonials?: boolean;
}

const DINO_WORDS = ["more mandates", "automated operations"];

const DINO_COLORS =  [
  'bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent',
  'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent',
  'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 bg-clip-text text-transparent',
  'bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 bg-clip-text text-transparent',
  'bg-gradient-to-r from-cyan-600 via-cyan-500 to-cyan-400 bg-clip-text text-transparent',
  'bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 bg-clip-text text-transparent',
  'bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 bg-clip-text text-transparent'
];

export default function Hero({ 
  calendarLink = 'https://cal.com/vincent-baron/30mins-meeting',
}: HeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);
  const [capturedPainpoint, setCapturedPainpoint] = useState('');
  const { language } = useLanguage();
  const t = getTranslations(language);
  const copy = t.hero;
  
  // Typing animation state
  const [displayText, setDisplayText] = useState(`${t.hero.headline.highlight}`);
  const [phase, setPhase] = useState<'waiting' | 'erasing' | 'typing'>('waiting');
  const [currentIndex, setCurrentIndex] = useState(-1); // Start at -1 for 'AI'
  const [showCaret, setShowCaret] = useState(true);
  
  // Get the current word being shown/typed
  const getCurrentWord = () => {
    return currentIndex === -1 ? `${t.hero.headline.highlight}` : t.hero.headline.highlightWords[currentIndex];
  };
  
  useEffect(() => {
    // Blink caret
    const caretInterval = setInterval(() => {
      setShowCaret(prev => !prev);
    }, 530);
    
    return () => clearInterval(caretInterval);
  }, []);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentWord = getCurrentWord();
    
    if (phase === 'waiting') {
      // Wait 2 seconds then start erasing
      timeout = setTimeout(() => {
        setPhase('erasing');
      }, 2000);
    } else if (phase === 'erasing') {
      if (displayText.length > 0) {
        // Erase one character
        timeout = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, 100);
      } else {
        // Done erasing, move to next word and start typing
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % DINO_WORDS.length;
        setCurrentIndex(nextIndex === 0 && currentIndex !== -1 ? -1 : nextIndex);
        setPhase('typing');
      }
    } else if (phase === 'typing') {
      if (displayText.length < currentWord.length) {
        // Type one character
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 150);
      } else {
        // Done typing, wait before erasing
        setPhase('waiting');
      }
    }
    
    return () => clearTimeout(timeout);
  }, [phase, displayText, currentIndex]);
  const headlineFocusToken = HIGHLIGHT_FOCUS_TOKENS.find((token) =>
    copy.headline.highlight.toLowerCase().includes(token.toLowerCase()),
  );
  const highlightedHeadline = headlineFocusToken
    ? copy.headline.highlight
        .split(new RegExp(`(${escapeRegExp(headlineFocusToken)})`, 'i'))
        .filter(Boolean)
        .map((segment, index) =>
          segment.toLowerCase() === headlineFocusToken.toLowerCase() ? (
            <span
              key={`focus-${index}`}
              className="bg-white text-blue-700 px-2 py-0.5 rounded-full shadow-sm font-semibold"
            >
              {segment}
            </span>
          ) : (
            <span key={`segment-${index}`}>{segment}</span>
          ),
        )
    : copy.headline.highlight;

  const handleBookCall = () => {
    setIsModalOpen(true);
  };

    return (
      <section className="px-4 sm:px-6 lg:px-8 mt-24 sm:mt-26 lg:mt-34 mb-8 sm:mb-12 lg:mb-16">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
          {/* Hero Content */}
          <div className="flex flex-col gap-6 sm:gap-8 items-center mb-2">
            {/* Headline and Text */}
            <div className="text-center flex flex-col gap-10 sm:gap-12 max-w-6xl mx-auto relative w-full">
              
              {/* Blur effect background */}
              <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-orange-100/20 via-yellow-100/15 to-orange-100/20 rounded-full blur-[100px]"></div>
              </div>
              
              {/* Main Headline */}
              <div className="space-y-6 relative z-10 flex justify-center w-full">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-700 leading-[1.1] tracking-[-0.015em] text-center px-2">
                      {t.hero.headline.primary}<br />
                      <span className="inline-block flex flex-col">
                        {t.hero.headline.secondary}{' '}
                        <span className={`${DINO_COLORS[0] || DINO_COLORS[0]} font-bold whitespace-nowrap inline-block align-baseline pb-2`}>
                          {displayText || "\u200b"}
                        </span>
                      </span>
                </h1>
              </div>

            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <button
                onClick={handleBookCall}
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-lg"
              >
                <span className="relative z-10">
                  {t.hero.cta.bookAudit}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>
              <button
                onClick={() => setIsCalculatorModalOpen(true)}
                className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200 hover:border-orange-300 text-lg"
              >
                {t.hero.cta.calculateCosts}
              </button>
            </div>
          </div>

          {/* Testimonials */}
          <div>
          <div className="text-center flex flex-col gap-3">
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              {copy.testimonialsTitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-left hover:shadow-md transition-shadow duration-200"
                >
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {testimonial.quote[language]}
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.alt[language]}
                      className="h-12 w-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                    />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-gray-600">
                        {testimonial.role[language]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats and Companies Section */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16 mt-12 sm:mt-16 lg:mt-8">
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-semibold text-blue-700">
                  30+
                </div>
                <p className="text-sm text-gray-600 mt-2">{copy.stats.projects}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-semibold text-blue-700">
                  {language === 'fr' ? '1 semaine' : '1 Week'}
                </div>
                <p className="text-sm text-gray-600 mt-2">{copy.stats.sprint}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-semibold text-blue-700">
                  4.9/5
                </div>
                <p className="text-sm text-gray-600 mt-2">{copy.stats.rating}</p>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px h-24 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

            {/* Companies */}
            <div className="text-center w-full lg:w-auto">
              <div className="relative overflow-hidden max-w-xl mx-auto py-4 logo-slideshow">
                {/* Scrolling container - will continuously scroll left */}
                <div className="inline-flex items-center animate-scroll whitespace-nowrap">
                  {/* First set of logos */}
                  <div className="inline-flex items-center shrink-0">
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/side.png"
                        alt="Side"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-32 flex items-center justify-center mx-6">
                      <img
                        src="/randstad.png"
                        alt="Randstad"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-32 flex items-center justify-center mx-6">
                      <img
                        src="/qomon.png"
                        alt="Qomon"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/mitsubishi.webp"
                        alt="Mitsubishi"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/intermarche.png"
                        alt="Intermarché"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/freMobile.png"
                        alt="Free Mobile"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                  </div>
                  {/* Duplicate set for seamless loop */}
                  <div className="inline-flex items-center shrink-0">
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/side.png"
                        alt="Side"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-32 flex items-center justify-center mx-6">
                      <img
                        src="/randstad.png"
                        alt="Randstad"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-32 flex items-center justify-center mx-6">
                      <img
                        src="/qomon.png"
                        alt="Qomon"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/mitsubishi.webp"
                        alt="Mitsubishi"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/intermarche.png"
                        alt="Intermarché"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/freMobile.png"
                        alt="Free Mobile"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
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
          painpoint={capturedPainpoint}
          calendarLink={calendarLink}
        />

        {/* Calculator Modal */}
        <CalculatorModal
          isOpen={isCalculatorModalOpen}
          onClose={() => setIsCalculatorModalOpen(false)}
        />
      </section>
    );
}