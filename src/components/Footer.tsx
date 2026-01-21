import { useLanguage } from '../lib/language';
import { getTranslations } from '../lib/translations';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const t = getTranslations(language);
  const copy = t.footer;

  return (
    <footer className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-8">
          {/* Copyright and Pledge */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-sm text-gray-600 font-medium">
              © {currentYear} StudioDino. {copy.rights}
            </p>
          </div>

          {/* Secondary Links */}
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-sm text-gray-600 font-medium hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 rounded transition-colors"
            >
              {copy.privacy}
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-600 font-medium hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 rounded transition-colors"
            >
              {copy.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
