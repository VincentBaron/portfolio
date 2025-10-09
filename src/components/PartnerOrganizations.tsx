import React, { useState, useEffect } from 'react';

interface Partner {
  name: string;
  description: string;
  website: string;
  focus: string;
}

export default function PartnerOrganizations() {
  const [count, setCount] = useState(0);
  const targetAmount = 12500; // Total amount funded so far

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

  const partners: Partner[] = [
    {
      name: 'Ramina',
      description: 'Supporting sustainable development and community empowerment through innovative technology solutions.',
      website: 'https://ramina.org',
      focus: 'Community Development',
    },
    {
      name: 'Greenpeace',
      description: 'Global environmental organization campaigning for a green and peaceful future through direct action and advocacy.',
      website: 'https://www.greenpeace.org',
      focus: 'Environmental Protection',
    },
    {
      name: 'Sea Shepherd',
      description: 'International marine conservation organization protecting ocean wildlife and habitats through direct action campaigns.',
      website: 'https://seashepherd.org',
      focus: 'Ocean Conservation',
    },
  ];

  return (
    <div className="mt-16">
      {/* Funding Counter */}
      <div className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Impact Investment
            </h3>
            <p className="text-gray-600">
              Total funding contributed to our partner organizations
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              ${count.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500 mt-2">and growing</p>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Our Partners
        </h3>
        <p className="text-base text-gray-600 max-w-3xl">
          We're proud to collaborate with organizations making a real difference in the world
        </p>
      </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-300 transform hover:-translate-y-1"
            >
              {/* Focus Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-semibold mb-4">
                {partner.focus}
              </div>

              {/* Partner Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                {partner.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-4">
                {partner.description}
              </p>

              {/* Learn More Link */}
              <div className="flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors duration-300">
                Learn more
                <svg
                  className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
    </div>
  );
}
