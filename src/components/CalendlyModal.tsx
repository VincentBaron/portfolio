import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage, type Language } from '../lib/language';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  painpoint?: string;
  calendarLink?: string;
}

const MODAL_COPY: Record<Language, {
  title: string;
  subtitle: string;
  painpointLabel: string;
  close: string;
  loading: string;
  scheduleText: string;
}> = {
  en: {
    title: 'Book a Call',
    subtitle: "Let's discuss your project and create an actionable plan",
    painpointLabel: 'Painpoint',
    close: 'Close modal',
    loading: 'Loading calendar...',
    scheduleText: 'Schedule time with me',
  },
  fr: {
    title: 'Réserver un appel',
    subtitle: 'Discutons de votre projet et définissons un plan actionnable',
    painpointLabel: 'Problème',
    close: 'Fermer la fenêtre',
    loading: 'Chargement du calendrier...',
    scheduleText: 'Planifier un appel',
  },
};

export default function CalendlyModal({ isOpen, onClose, painpoint, calendarLink }: CalendlyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const copy = MODAL_COPY[language];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      
      const initializeCalendly = () => {
        if ((window as any).Calendly) {
          const calendlyContainer = document.getElementById('calendly-container');
          if (calendlyContainer) {
            calendlyContainer.innerHTML = '';
            
            // Build Calendly URL with painpoint if provided
            const baseUrl = calendarLink ?? 'https://cal.com/vincent-baron/30mins-meeting';
            let calendlyUrl = baseUrl;
            const urlParams = new URLSearchParams();
            
            if (painpoint) {
              urlParams.set('a1', painpoint.substring(0, 200)); // Limit length for URL safety
            }
            
            // Add branding and other params to match your widget setup
            urlParams.set('text', copy.scheduleText);
            urlParams.set('color', '0069ff');
            urlParams.set('textColor', 'ffffff');
            
            if (urlParams.toString()) {
              calendlyUrl += `?${urlParams.toString()}`;
            }

            (window as any).Calendly.initInlineWidget({
              url: calendlyUrl,
              parentElement: calendlyContainer,
              prefill: {},
              utm: {}
            });
          }
        }
      };

      // Load Calendly CSS if not already loaded
      if (!document.querySelector('link[href*="calendly"]')) {
        const link = document.createElement('link');
        link.href = 'https://assets.calendly.com/assets/external/widget.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      
      // Load Calendly widget script if not already loaded
      if (!document.querySelector('script[src*="calendly"]')) {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
          initializeCalendly();
        };
      } else if ((window as any).Calendly) {
        // Script already loaded, initialize immediately
        initializeCalendly();
      }
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, painpoint, copy.scheduleText, calendarLink]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4 calendly-modal"
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
        className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl transform transition-all flex flex-col"
        style={{ zIndex: 999999 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{copy.title}</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {copy.subtitle}
            </p>
            {painpoint && (
              <p className="text-xs sm:text-sm text-blue-600 mt-2 bg-blue-50 px-2 py-1 rounded-full inline-block max-w-full truncate">
                💡 {copy.painpointLabel}: {painpoint.substring(0, 80)}{painpoint.length > 80 ? '...' : ''}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 ml-4"
            aria-label={copy.close}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Calendly Container */}
        <div className="flex-1 p-4 sm:p-6 overflow-hidden">
          <div
            id="calendly-container"
            className="w-full h-full min-h-[500px]"
            style={{ height: 'calc(90vh - 140px)' }}
          >
            {/* Loading state */}
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">{copy.loading}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
