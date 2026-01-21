import { useLanguage } from '../lib/language';
import { getTranslations, packageItems } from '../lib/translations';
import PackageCard from './PackageCard';

export default function Agents() {
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

    // Filter only agents (id 3 and 4)
    const agentPackages = packageItems.filter(pkg => pkg.id === 3 || pkg.id === 4);

    return (
        <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-6 sm:mb-8 text-left">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-900 mb-3 sm:mb-4 lg:mb-6 tracking-tight">
                        {t.packages.agentsTitle}
                    </h2>
                </div>

                {/* Agents Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {agentPackages.map((pkg, index) => {
                        const pkgColor = packageColors[index % packageColors.length];
                        return (
                            <div key={pkg.id} className="group relative flex">
                                {/* AI Agent Badge */}
                                <div className="absolute -top-3 left-6 z-20">
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${pkgColor.button} text-white text-xs font-semibold shadow-lg`}>
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        AI Agent
                                    </div>
                                </div>

                                <PackageCard
                                    pkg={pkg}
                                    packageColor={pkgColor}
                                    isAgent={true}
                                />
                            </div>
                        );
                    })}
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
                        {t.packages.agentsCta}
                    </button>
                </div>
            </div>
        </section>
    );
}
