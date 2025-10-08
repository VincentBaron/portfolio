export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-300 pt-8">
          {/* Copyright and Pledge */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-sm text-gray-600">
              © {currentYear} 2 Weeks to Solve It. All rights reserved.
            </p>
            <span className="hidden sm:inline text-gray-400">•</span>
            <p className="text-sm font-medium text-purple-600">
              5% of net profit donated to{' '}
              <a
                href="https://ramina.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 rounded transition-colors"
              >
                Ramina
              </a>
            </p>
          </div>

          {/* Secondary Links */}
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="text-sm text-gray-600 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-600 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
