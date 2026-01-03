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
  const renderLanguageSelector = (variant: 'desktop' | 'mobile', className = '') => (
    <div
      className={`${
        variant === 'desktop' ? 'hidden md:flex' : 'flex md:hidden'
      } items-center gap-1 rounded-full border border-gray-200 bg-white/80 px-1 py-0.5 shadow-sm backdrop-blur ${className}`}
    >
      {languageOptions.map(({ code, label, flag, sr }) => {
        const isActive = language === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
              isActive
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            } ${variant === 'desktop' ? 'md:text-xs' : 'text-xs'}`}
            aria-pressed={isActive}
            aria-label={sr}
            title={sr}
          >
            <span aria-hidden="true">{flag}</span>
            <span className="hidden sm:inline">{label}</span>
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



  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (currentPath !== '/') {
      return;
    }

    const handleScroll = () => {
      const sections = ['home', 'packages', 'work'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeSection !== section) {
              setActiveSection(section);
              // Update URL hash without triggering navigation
              window.history.replaceState(null, '', `#${section}`);
            }
            break;
          }
        }
      }
    };

    // Set initial active section from URL hash
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'packages', 'work'].includes(hash)) {
      setActiveSection(hash);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, currentPath]);

  const isCurrentPage = (href: string) => {
    if (href === '#work' && currentPath.startsWith('/work')) {
      return true;
    }

    const section = href.replace('#', '');
    return currentPath === '/' && section === activeSection;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (href.startsWith('#')) {
      if (currentPath !== '/') {
        window.location.href = `/${href}`;
        return;
      }
      const targetId = href.replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        // Update URL hash
        window.history.pushState(null, '', href);
        setActiveSection(targetId);
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

  const showGlassEffect = isScrolled || isMobileMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showGlassEffect
          ? 'bg-white/70 backdrop-blur-lg shadow-lg border-b border-white/20' 
          : 'bg-transparent'
      }`}
      onKeyDown={handleKeyDown}
    >
      {renderLanguageSelector('desktop', 'absolute top-2 right-4 z-50')}
      {renderLanguageSelector('mobile', 'absolute top-2 right-4 z-50')}
      <nav
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-center h-16 sm:h-20">
          {/* Logo - Absolute positioned on the left */}
          <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex items-end gap-1 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg px-2 py-1"
              aria-label={copy.logoAria}
            >
              <img 
                src="/logoBrand.png" 
                alt="StudioDino" 
                className="h-10 w-auto transform group-hover:scale-105 transition-transform"
              />
              <span className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200" style={{ fontFamily: '"Space Grotesk", "Inter", system-ui, -apple-system, sans-serif', letterSpacing: '-0.01em', color: '#4a3c5e' }}>
                StudioDino
              </span>
            </a>
          </div>

          {/* Centered Navigation Container */}
          <div className="flex items-center justify-center gap-3">
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navLinks.map((link) => {
                const isCurrent = isCurrentPage(link.href);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 lg:px-4 py-2 rounded-lg text-sm lg:text-base font-black uppercase tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                      isCurrent
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
                        : 'text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600'
                    }`}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-black uppercase tracking-wide text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-900 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200"
              >
                {copy.bookCall}
              </button>
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

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => {
            const isCurrent = isCurrentPage(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-4 py-3 rounded-lg text-base font-black uppercase tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                  isCurrent
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600'
                }`}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="block w-full text-center px-5 py-3 rounded-lg text-base font-black uppercase tracking-wide text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-900 transition-all duration-200"
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
