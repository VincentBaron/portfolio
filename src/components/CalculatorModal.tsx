import { useState } from 'react';
import { useLanguage } from '../lib/language';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMPLOYER_CHARGE_RATE = 0.44;
const EMPLOYER_CHARGE_PERCENT = Math.round(EMPLOYER_CHARGE_RATE * 100);

const CalculatorModal = ({ isOpen, onClose }: CalculatorModalProps) => {
  const { language } = useLanguage();
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [peopleCount, setPeopleCount] = useState('');
  const [monthlyCostPerPerson, setMonthlyCostPerPerson] = useState('');
  const [processDescription, setProcessDescription] = useState('');
  const [calculatedMonthlyCost, setCalculatedMonthlyCost] = useState<number | null>(null);
  const [calculatedAnnualCost, setCalculatedAnnualCost] = useState<number | null>(null);
  const [error, setError] = useState('');

  const copy = {
    en: {
      title: 'Calculate Your Manual Process Cost',
      hoursLabel: 'Hours per person per week',
      hoursPlaceholder: 'e.g. 6',
      peopleLabel: 'Number of people involved',
      peoplePlaceholder: 'e.g. 3',
      salaryLabel: 'Average gross monthly salary (€)',
      salaryPlaceholder: 'e.g. 4000',
      descriptionLabel: 'Describe the manual process',
      descriptionPlaceholder: 'e.g. Time-tracking validation in the back-office',
      calculateBtn: 'Calculate Cost Impact',
      resultTitle: 'Estimated Cost of This Process',
      monthly: 'Monthly',
      annually: 'Annually',
      assumption: `Assumes 40h/week + ${EMPLOYER_CHARGE_PERCENT}% employer charges`,
      errorEmpty: 'Please fill in all fields',
      errorInvalid: 'Please enter valid positive numbers',
    },
    fr: {
      title: 'Calculez le Coût de Votre Processus Manuel',
      hoursLabel: 'Heures par personne par semaine',
      hoursPlaceholder: 'ex. 6',
      peopleLabel: 'Nombre de personnes impliquées',
      peoplePlaceholder: 'ex. 3',
      salaryLabel: 'Salaire brut mensuel moyen (€)',
      salaryPlaceholder: 'ex. 4000',
      descriptionLabel: 'Décrivez le processus manuel',
      descriptionPlaceholder: 'ex. Validation des heures dans le back-office',
      calculateBtn: 'Calculer l\'Impact du Coût',
      resultTitle: 'Coût Estimé de ce Processus',
      monthly: 'Mensuel',
      annually: 'Annuel',
      assumption: `Hypothèse : 40h/semaine + ${EMPLOYER_CHARGE_PERCENT}% de charges patronales`,
      errorEmpty: 'Veuillez remplir tous les champs',
      errorInvalid: 'Veuillez entrer des nombres positifs valides',
    },
  };

  const t = copy[language];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const hours = parseFloat(hoursPerWeek);
    const people = parseFloat(peopleCount);
    const salary = parseFloat(monthlyCostPerPerson);

    if (!hours || !people || !salary) {
      setError(t.errorEmpty);
      return;
    }

    if (hours <= 0 || people <= 0 || salary <= 0) {
      setError(t.errorInvalid);
      return;
    }

    // Calculate cost
    const WORKING_HOURS_PER_MONTH = 160; // 40h/week * 4 weeks
    const hourlyRate = (salary * (1 + EMPLOYER_CHARGE_RATE)) / WORKING_HOURS_PER_MONTH;
    const monthlyCost = hourlyRate * hours * 4.33 * people; // 4.33 weeks per month
    const annualCost = monthlyCost * 12;

    setCalculatedMonthlyCost(monthlyCost);
    setCalculatedAnnualCost(annualCost);
  };

  const handleReset = () => {
    setHoursPerWeek('');
    setPeopleCount('');
    setMonthlyCostPerPerson('');
    setProcessDescription('');
    setCalculatedMonthlyCost(null);
    setCalculatedAnnualCost(null);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-50 to-orange-100 px-6 sm:px-8 py-6 border-b border-orange-200 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-900">{t.title}</h2>
            <button
              onClick={onClose}
              className="text-orange-700 hover:text-orange-900 transition-colors p-2 hover:bg-orange-200/50 rounded-lg"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6 space-y-6">
          <form onSubmit={handleCalculate} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="hours" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.hoursLabel}
                </label>
                <input
                  id="hours"
                  type="number"
                  min="0"
                  step="0.5"
                  value={hoursPerWeek}
                  onChange={(e) => {
                    setHoursPerWeek(e.target.value);
                    setError('');
                  }}
                  placeholder={t.hoursPlaceholder}
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="people" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t.peopleLabel}
                </label>
                <input
                  id="people"
                  type="number"
                  min="1"
                  step="1"
                  value={peopleCount}
                  onChange={(e) => {
                    setPeopleCount(e.target.value);
                    setError('');
                  }}
                  placeholder={t.peoplePlaceholder}
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.salaryLabel}
              </label>
              <input
                id="salary"
                type="number"
                min="0"
                step="any"
                value={monthlyCostPerPerson}
                onChange={(e) => {
                  setMonthlyCostPerPerson(e.target.value);
                  setError('');
                }}
                placeholder={t.salaryPlaceholder}
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.descriptionLabel}
              </label>
              <textarea
                id="description"
                rows={3}
                value={processDescription}
                onChange={(e) => setProcessDescription(e.target.value)}
                placeholder={t.descriptionPlaceholder}
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all resize-none"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!hoursPerWeek || !peopleCount || !monthlyCostPerPerson}
              className="group relative w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg text-base"
            >
              <span className="relative z-10">{t.calculateBtn}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </form>

          {/* Results */}
          {calculatedMonthlyCost !== null && calculatedAnnualCost !== null && (
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 space-y-4 shadow-md animate-fadeIn">
              <h3 className="font-bold text-orange-900 text-lg">{t.resultTitle}</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-white border-2 border-orange-200 rounded-lg p-5 shadow-sm">
                  <p className="text-sm text-gray-600 font-semibold mb-2">
                    {t.monthly}
                  </p>
                  <p className="text-3xl font-bold text-orange-700">
                    {formatCurrency(calculatedMonthlyCost)}
                  </p>
                </div>
                <div className="bg-white border-2 border-orange-200 rounded-lg p-5 shadow-sm">
                  <p className="text-sm text-gray-600 font-semibold mb-2">
                    {t.annually}
                  </p>
                  <p className="text-3xl font-bold text-orange-700">
                    {formatCurrency(calculatedAnnualCost)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-orange-800 italic bg-orange-100/50 rounded-lg p-3">
                {t.assumption}
              </p>
              <button
                onClick={handleReset}
                className="w-full py-3 px-6 rounded-lg text-orange-700 bg-white border-2 border-orange-300 hover:bg-orange-50 font-semibold transition-all duration-200 text-base"
              >
                {language === 'en' ? 'Calculate Another Process' : 'Calculer un Autre Processus'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorModal;
