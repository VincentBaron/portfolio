import { useLanguage } from '../lib/language';

const FOOTER_COPY = {
  en: {
    rights: 'All rights reserved.',
    pledgePrefix: '7.5% of net profit donated to',
    privacy: 'Privacy',
    terms: 'Terms',
  },
  fr: {
    rights: 'Tous droits réservés.',
    pledgePrefix: '7.5% du bénéfice net reversé à',
    privacy: 'Confidentialité',
    terms: 'Conditions',
  },
} as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const copy = FOOTER_COPY[language];

  return (
    <footer className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t-4 border-gray-900 pt-8">
          {/* Copyright and Pledge */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-sm text-gray-700 font-bold">
              © {currentYear} StudioDino. {copy.rights}
            </p>
          </div>

          {/* Secondary Links */}
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-sm text-gray-700 font-bold uppercase tracking-wide hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded transition-colors"
            >
              {copy.privacy}
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-700 font-bold uppercase tracking-wide hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded transition-colors"
            >
              {copy.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
