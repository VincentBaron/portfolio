import { useLanguage } from '../lib/language';
import { getTranslations, packageItems, bundleItems } from '../lib/translations';
import PackageCard from './PackageCard';
import MarginEvolutionGraph from './MarginEvolutionGraph';

export default function Packages() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  // Package colors configuration - matching hero animations
  const packageColors = [
    {
      gradient: 'from-blue-50 to-blue-100',
      bg: 'bg-blue-50/50',
      text: 'text-blue-700',
      button: 'from-blue-600 via-blue-500 to-blue-400',
      buttonHover: 'from-blue-700 via-blue-600 to-blue-500'
    },
    {
      gradient: 'from-purple-50 to-purple-100',
      bg: 'bg-purple-50/50',
      text: 'text-purple-700',
      button: 'from-purple-600 via-purple-500 to-purple-400',
      buttonHover: 'from-purple-700 via-purple-600 to-purple-500'
    },
    {
      gradient: 'from-cyan-50 to-cyan-100',
      bg: 'bg-cyan-50/50',
      text: 'text-cyan-700',
      button: 'from-cyan-600 via-cyan-500 to-cyan-400',
      buttonHover: 'from-cyan-700 via-cyan-600 to-cyan-500'
    },
    {
      gradient: 'from-rose-50 to-rose-100',
      bg: 'bg-rose-50/50',
      text: 'text-rose-700',
      button: 'from-rose-600 via-rose-500 to-rose-400',
      buttonHover: 'from-rose-700 via-rose-600 to-rose-500'
    },
    {
      gradient: 'from-emerald-50 to-emerald-100',
      bg: 'bg-emerald-50/50',
      text: 'text-emerald-700',
      button: 'from-emerald-600 via-emerald-500 to-emerald-400',
      buttonHover: 'from-emerald-700 via-emerald-600 to-emerald-500'
    },
  ];

  // Filter out agents (id 3 and 4)
  const regularPackages = packageItems.filter(pkg => pkg.id !== 3 && pkg.id !== 4);

  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}

        <div className="mb-6 sm:mb-8 text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6 tracking-tight">
            {t.packages.sectionTitle || t.packages.title}
          </h1>
        </div>

        {/* Regular Packages Grid (NO agents) */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20">
          {regularPackages.map((pkg, index) => {
            const pkgColor = packageColors[index % packageColors.length];
            return (
              <div key={pkg.id} className="group relative flex">
                {/* Package Badge */}
                <div className="absolute -top-3 left-6 z-20">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${pkgColor.button} text-white text-xs font-semibold shadow-lg`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                    Package
                  </div>
                </div>
                <PackageCard
                  pkg={pkg}
                  packageColor={pkgColor}
                  isAgent={false}
                />
              </div>
            );
          })}
        </div>

        {/* --- BUNDLES SECTION --- */}
        <div className="mb-20">


          <div className="w-full">
            {bundleItems.map((bundle) => {
              // Special styling for the Pro Bundle - Premium Orange/Amber theme
              const bundleTheme = {
                gradient: 'from-orange-50 via-white to-amber-50',
                border: 'border-orange-100',
                accent: 'text-orange-600',
                button: 'from-orange-600 via-amber-600 to-yellow-600',
                buttonHover: 'from-orange-700 via-amber-700 to-yellow-700'
              };

              // Identify included packages for miniatures
              const auditPkg = packageItems.find(p => p.name === 'Audit');
              const partnerPkg = packageItems.find(p => p.name === 'Partner');
              const customPkg = packageItems.find(p => p.name === 'Custom Solutions');

              const includedPackages = [
                { pkg: auditPkg, label: 'Audit' },
                { pkg: partnerPkg, label: 'Partner' },
                { pkg: customPkg, label: 'Custom', badge: '30% OFF' }
              ].filter(item => item.pkg);

              return (
                <div key={bundle.id} className="relative group mt-6">
                  {/* Bundle Badge */}
                  <div className="absolute -top-3 left-6 z-20">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${bundleTheme.button} text-white text-xs font-semibold shadow-lg`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                      </svg>
                      Bundle
                    </div>
                  </div>
                  <div
                    className={`relative rounded-3xl border-2 ${bundleTheme.border} flex flex-col lg:flex-row overflow-hidden transition-all duration-300 hover:shadow-2xl shadow-xl bg-white group`}
                  >
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-transparent to-amber-50/50 opacity-50" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

                    {/* Left Side: Content & Miniatures */}
                    <div className="p-6 sm:p-8 flex-grow relative z-10 lg:w-3/4 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                            {bundle.name}
                          </h3>
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 border border-orange-200 uppercase tracking-wider">
                            Best Value
                          </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <p className="text-base text-gray-600 leading-relaxed">
                            {bundle.description[language]}
                          </p>

                          {/* Features List moved next to description for compactness */}
                          <ul className="grid grid-cols-1 gap-2">
                            {bundle.includes[language].map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                                  <svg className="w-3 h-3 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                <span className="text-sm text-gray-600 font-medium">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Package Miniatures */}
                      {includedPackages.length > 0 && (
                        <div className="mt-4 pt-6 border-t border-orange-100/50">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {includedPackages.map((item, idx) => (
                              <div key={item.pkg?.id} className="relative group/card flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all hover:bg-white">
                                {/* Badge */}
                                {item.badge && (
                                  <div className={`absolute -top-3 -right-2 px-3 py-1 rounded-full ${item.label === 'Custom' ? 'bg-red-600 text-xs shadow-md scale-110' : 'bg-red-500 text-[10px]'} text-white font-bold shadow-sm z-10`}>
                                    {item.badge}
                                  </div>
                                )}

                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    {idx === 0
                                      ? <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      : idx === 1
                                        ? <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                                        : <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    }
                                  </svg>
                                </div>
                                <div className="min-w-0">
                                  <div className="font-semibold text-gray-900 text-sm truncate">{item.pkg?.name}</div>
                                  <div className="text-[10px] text-gray-500 truncate">
                                    {item.label === 'Custom' ? 'Discounted future builds' : item.pkg?.price[language].includes('/') ? 'Monthly Plan' : 'One-time Audit'}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}



                    </div>


                  </div>
                </div>
              );
            })}
          </div>
        </div>





        {/* Section CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <button
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-white bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-lg"
            onClick={() => window.open('https://cal.com/vincent-baron/30mins-meeting', '_blank')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {t.packages.cta}
          </button>
        </div>
      </div>
    </section >
  );
}
