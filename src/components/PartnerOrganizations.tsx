import { useState, useEffect } from 'react';
import { useLanguage } from '../lib/language';

export default function PartnerOrganizations() {
  const [count, setCount] = useState(0);
  const { language } = useLanguage();
  const totalLabel = language === 'fr' ? 'Montant total collecté' : 'Total funds raised';
  const formattedAmount = language === 'fr'
    ? `${count.toLocaleString('fr-FR')} €`
    : `$${count.toLocaleString('en-US')}`;
  const targetAmount = 255; // Total amount funded so far

  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const steps = 60;
    const increment = targetAmount / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetAmount) {
        setCount(targetAmount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-6 sm:mt-8 lg:mt-12">
      {/* Funding Counter */}
      <div className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 border-2 border-blue-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
              {totalLabel}
            </h3>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {formattedAmount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
