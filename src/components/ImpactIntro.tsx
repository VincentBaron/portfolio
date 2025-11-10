import { useLanguage } from '../lib/language';

const COPY = {
  en: {
    heading: 'Business as a Force for Good',
    textBefore: "I believe technology should drive positive change. That's why ",
    highlightOne: '7.5% of my profits',
    textMiddle: 'are invested in projects driving ',
    highlightTwo: 'social and environmental impact.',
  },
  fr: {
    heading: 'Entreprendre pour le bien commun',
    textBefore: 'Je suis convaincu que la technologie doit générer un impact positif. C’est pourquoi ',
    highlightOne: '7.5% de mes profits',
    textMiddle: 'sont investis dans des projets à impact ',
    highlightTwo: 'social et environnemental.',
  },
} as const;

export default function ImpactIntro() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <div className="text-center mb-6 sm:mb-8 lg:mb-10">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
        {copy.heading}
      </h2>
      <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
        {copy.textBefore}
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {copy.highlightOne}
        </span>{' '}
        {copy.textMiddle}
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {copy.highlightTwo}
        </span>
      </p>
    </div>
  );
}
