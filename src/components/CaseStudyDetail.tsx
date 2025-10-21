import { useMemo } from 'react';
import type { CaseStudy } from '../data/caseStudies';
import { useLanguage } from '../lib/language';

interface CaseStudyDetailProps {
  caseStudy: CaseStudy;
  relatedStudies: CaseStudy[];
}

const COPY = {
  en: {
    sprintLength: '2-week sprint',
    ndaTitle: 'Visuals for this build are protected under NDA.',
    ndaSubtitle: 'Happy to walk through the full implementation on a discovery call.',
    metricsTitle: 'Snapshot outcomes',
    ctaTitle: 'Want a similar sprint for your team?',
    ctaBody:
      'Book a call and we’ll map out a 2-week plan tailored to your stack, your processes, and the outcomes you need right now.',
    ctaPrimary: 'Book a discovery call',
    ctaSecondary: 'Explore more builds',
    relatedTitle: 'Keep exploring',
    relatedLabel: 'Case Study',
    relatedLink: 'Read the story',
    formattedDateOptions: { month: 'long', day: 'numeric', year: 'numeric' } as const,
  },
  fr: {
    sprintLength: 'Sprint de 2 semaines',
    ndaTitle: 'Les visuels de cette réalisation sont protégés par un NDA.',
    ndaSubtitle: 'Je peux détailler l’implémentation complète lors d’un appel.',
    metricsTitle: 'Résultats clés',
    ctaTitle: 'Envie d’un sprint similaire pour votre équipe ?',
    ctaBody:
      'Réservez un appel et nous construirons un plan de 2 semaines adapté à votre stack, vos processus et vos objectifs immédiats.',
    ctaPrimary: 'Réserver un appel découverte',
    ctaSecondary: 'Explorer d’autres projets',
    relatedTitle: 'Continuer à explorer',
    relatedLabel: 'Étude de cas',
    relatedLink: 'Voir le projet',
    formattedDateOptions: { day: 'numeric', month: 'long', year: 'numeric' } as const,
  },
};

export default function CaseStudyDetail({ caseStudy, relatedStudies }: CaseStudyDetailProps) {
  const { language } = useLanguage();
  const copy = COPY[language];

  const formattedDate = useMemo(() => {
    const locale = language === 'fr' ? 'fr-FR' : 'en-US';
    return new Date(caseStudy.publishedAt).toLocaleDateString(locale, copy.formattedDateOptions);
  }, [caseStudy.publishedAt, copy.formattedDateOptions, language]);

  const caseStudiesAnchor = '/#work';

  return (
    <article className="min-h-screen pt-24 sm:pt-32 pb-16 bg-gradient-to-b from-white via-white to-blue-50/30">
      <header className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 text-sm text-gray-500">
            <span>{formattedDate}</span>
            <span aria-hidden="true" className="mx-2">
              •
            </span>
            <span>{copy.sprintLength}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {caseStudy.title[language]}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">{caseStudy.summary[language]}</p>

          {caseStudy.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="mt-12 sm:mt-16">
        {caseStudy.heroImage ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <img
              src={caseStudy.heroImage}
              alt={`Screenshot from ${caseStudy.title[language]}`}
              className="w-full h-auto rounded-3xl shadow-xl border border-white/60"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-56 sm:h-72 rounded-3xl bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center">
              <div className="text-center max-w-2xl px-4">
                <p className="text-xl font-semibold text-blue-800">{copy.ndaTitle}</p>
                <p className="mt-2 text-sm text-blue-900/80">{copy.ndaSubtitle}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <section className="mt-12 sm:mt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-600 mb-3">
              {copy.metricsTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {caseStudy.metrics.map((metric) => (
                <div
                  key={metric.label.en}
                  className="rounded-2xl border border-blue-100 bg-white/80 p-5 shadow-sm shadow-blue-100"
                >
                  <p className="text-xs uppercase tracking-wide text-blue-500 font-semibold mb-1">
                    {metric.label[language]}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value[language]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mt-12 sm:mt-16 px-4 sm:px-6 lg:px-8">
        <div className="prose prose-blue max-w-4xl mx-auto">
          {caseStudy.contentSections.map((section) => (
            <section key={section.heading.en} className="mb-10">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                {section.heading[language]}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph.en} className="text-base text-gray-700 leading-relaxed mb-4">
                  {paragraph[language]}
                </p>
              ))}
            </section>
          ))}
        </div>
      </section>

      <section className="mt-12 sm:mt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white/90 border border-blue-100 p-8 sm:p-10 shadow-lg shadow-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{copy.ctaTitle}</h2>
          <p className="text-base text-gray-600 mb-6">{copy.ctaBody}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://calendly.com/vbaron4220/30min"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:shadow-blue-500/40"
            >
              {copy.ctaPrimary}
            </a>
            <a
              href={caseStudiesAnchor}
              className="inline-flex items-center justify-center rounded-lg border-2 border-gray-200 px-6 py-3 text-base font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
            >
              {copy.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {relatedStudies.length > 0 && (
        <section className="mt-16 px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{copy.relatedTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {relatedStudies.map((related) => (
                <a
                  key={related.slug}
                  href={`/work/${related.slug}`}
                  className="group rounded-2xl border border-gray-200 bg-white/90 p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
                >
                  <p className="text-xs uppercase tracking-wide text-blue-500 font-semibold mb-2">
                    {copy.relatedLabel}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                    {related.title[language]}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{related.summary[language]}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600">
                    {copy.relatedLink}
                    <svg
                      className="ml-2 h-4 w-4 transform transition group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
