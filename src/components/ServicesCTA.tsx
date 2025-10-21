import { useState } from 'react';
import CalendlyModal from './CalendlyModal';
import { useLanguage } from '../lib/language';

interface ServicesCTAProps {
  variant?: 'blue' | 'purple' | 'indigo';
  label?: string;
  className?: string;
  showArrow?: boolean;
  showCalendar?: boolean;
}

export default function ServicesCTA({ 
  variant = 'blue', 
  label,
  className = '',
  showArrow = false,
  showCalendar = false
}: ServicesCTAProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();
  const buttonLabel = label ?? (language === 'fr' ? 'Commencer' : 'Get Started');

  const getVariantClasses = () => {
    switch (variant) {
      case 'purple':
        return 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700';
      case 'indigo':
        return 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800';
      default:
        return 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800';
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`block w-full text-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white ${getVariantClasses()} focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200 ${className} ${(showArrow || showCalendar) ? 'inline-flex items-center justify-center' : ''}`}
      >
        {showCalendar && (
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        )}
        {buttonLabel}
        {showArrow && (
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
        )}
      </button>

      <CalendlyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
