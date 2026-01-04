import { useState, useEffect } from 'react';
import CalendlyModal from './CalendlyModal';
import { useLanguage, type Language } from '../lib/language';

interface NavItem {
  id: 'home' | 'packages' | 'work';
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', href: '#home' },
  { id: 'packages', href: '#packages' },
  { id: 'work', href: '#work' },
];

const HEADER_COPY: Record<
  Language,
  {
    nav: Record<NavItem['id'], string>;
    bookCall: string;
    logoAria: string;
    mobileOpen: string;
    mobileClose: string;
    toggleMenuAria: string;
  }
> = {
  en: {
    nav: {
      home: 'Home',
      packages: 'Packages',
      work: 'Work',
    },
    bookCall: 'Book a Call',
    logoAria: '2 Weeks to Solve It - Home',
    mobileOpen: 'Open menu',
    mobileClose: 'Close menu',
    toggleMenuAria: 'Toggle navigation menu',
  },
  fr: {
    nav: {
      home: 'Accueil',
      packages: 'Forfaits',
      work: 'Projets',
    },
    bookCall: 'Réserver un appel',
    logoAria: '2 Weeks to Solve It - Accueil',
    mobileOpen: 'Ouvrir le menu',
    mobileClose: 'Fermer le menu',
    toggleMenuAria: 'Basculer le menu de navigation',
  },
};

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath = '/' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const copy = HEADER_COPY[language];
  const navLinks = NAV_ITEMS.map((item) => ({
    href: item.href,
    label: copy.nav[item.id],
  }));
  const languageOptions: Array<{ code: Language; label: string; flag: string; sr: string }> = [
    { code: 'en', label: 'EN', flag: '🇬🇧', sr: 'English / Anglais' },
    { code: 'fr', label: 'FR', flag: '🇫🇷', sr: 'French / Français' },
  ];
  const renderLanguageSelector = () => (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm px-1.5 py-1 shadow-sm">
      {languageOptions.map(({ code, label, flag, sr }) => {
        const isActive = language === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 ${
              isActive
                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            aria-pressed={isActive}
            aria-label={sr}
            title={sr}
          >
            <span aria-hidden="true" className="text-sm">{flag}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Simple hash-based active section tracking
  const [activeSection, setActiveSection] = useState('home');

  // Initialize from URL hash on mount
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') || 'home';
    if (['home', 'packages', 'work'].includes(hash)) {
      setActiveSection(hash);
    }
  }, []);

  const isCurrentPage = (href: string) => {
    // If we're on a work detail page, highlight work tab
    if (href === '#work' && currentPath.startsWith('/work')) {
      return true;
    }
    
    // On home page, check active section
    if (currentPath === '/') {
      const section = href.replace('#', '');
      return section === activeSection;
    }
    
    return false;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      // If not on home page, navigate to home first
      if (currentPath !== '/') {
        window.location.href = `/${href}`;
        return;
      }
      
      const targetId = href.replace('#', '');
      const target = document.getElementById(targetId);
      
      if (target) {
        // Immediately update active section for instant feedback
        setActiveSection(targetId);
        
        // Update URL hash
        window.history.pushState(null, '', href);
        
        // Smooth scroll to target
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
      return;
    }

    window.location.href = href;
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center gap-4">
          <nav
            className="relative bg-white/95 backdrop-blur-md rounded-xl shadow-sm border border-gray-200/80 flex-1"
            aria-label="Main navigation"
          >
            <div className="flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20">
              {/* Logo */}
              <div className="flex-shrink-0">
                <a
                  href="#home"
                  onClick={(e) => handleNavClick(e, '#home')}
                  className="flex items-end group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg px-2 py-1"
                  aria-label={copy.logoAria}
                >
                  <img 
                    src="/logoBrand.png" 
                    alt="StudioDino" 
                    className="h-8 w-auto transform group-hover:scale-105 transition-transform"
                  />
                  <span className="text-xl font-light tracking-wide text-gray-700 group-hover:text-gray-900 transition-all duration-300 -ml-1" style={{ fontFamily: '"Space Grotesk", "Inter", system-ui, -apple-system, sans-serif', fontWeight: '300' }}>
                    StudioDino
                  </span>
                </a>
              </div>

              {/* Navigation Container */}
              <div className="flex items-center gap-3">
                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:space-x-1">
                  {navLinks.map((link) => {
                    const isCurrent = isCurrentPage(link.href);
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-medium tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 ${
                          isCurrent
                            ? 'text-gray-900 bg-gradient-to-r from-blue-50 to-indigo-50'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                        aria-current={isCurrent ? 'page' : undefined}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </div>

                {/* Language Selector - Desktop */}
                <div className="hidden md:block">
                  {renderLanguageSelector()}
                </div>

                {/* Mobile Menu Button */}
                <button
                  type="button"
                  className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-colors"
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label={copy.toggleMenuAria}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span className="sr-only">
                    {isMobileMenuOpen ? copy.mobileClose : copy.mobileOpen}
                  </span>
                  {!isMobileMenuOpen ? (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        </nav>

        {/* CTA Button - Desktop - Separated */}
        <div className="hidden md:block">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-200"
          >
            {copy.bookCall}
          </button>
        </div>
      </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-8 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => {
            const isCurrent = isCurrentPage(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-4 py-3 rounded-lg text-base font-medium tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-1 ${
                  isCurrent
                    ? 'text-gray-900 bg-gradient-to-r from-blue-50 to-indigo-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-2 flex justify-center">
            {renderLanguageSelector()}
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="block w-full text-center px-5 py-3 rounded-lg text-base font-semibold tracking-wide text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-md transition-all duration-200"
            >
              {copy.bookCall}
            </button>
          </div>
        </div>
      </div>

      {/* Calendly Modal */}
      <CalendlyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
}
