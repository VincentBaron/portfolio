import { useState } from 'react';
import CalendlyModal from './CalendlyModal';
import { useLanguage, type Language } from '../lib/language';

const EMPLOYER_CHARGE_RATE = 0.44;
const EMPLOYER_CHARGE_PERCENT = Math.round(EMPLOYER_CHARGE_RATE * 100);
const EMPLOYER_MULTIPLIER = 1 + EMPLOYER_CHARGE_RATE;
const HIGHLIGHT_FOCUS_TOKENS = ['35h/week', '35h/semaine'];

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

type FlowState = 'input' | 'collect_email' | 'email_submitted';

interface HeroProps {
  calendarLink?: string;
  showOnlyIntro?: boolean;
  showOnlyCalculator?: boolean;
  showWithTestimonials?: boolean;
}

interface HeroCopy {
  calculator: {
    title: string;
    hoursLabel: string;
    hoursPlaceholder: string;
    peopleLabel: string;
    peoplePlaceholder: string;
    salaryLabel: string;
    salaryPlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    submitCta: string;
    resultTitle: string;
    monthlyLabel: string;
    annualLabel: string;
    assumption: string;
    currencySymbol: string;
  };
  headline: {
    primary: string;
    highlight: string;
  };
  intro: {
    primary: string;
    secondary: string;
  };
  validation: {
    empty: string;
    short: string;
    long: string;
    emailEmpty: string;
    emailInvalid: string;
    missingPainpoint: string;
    submissionFailed: string;
    unexpected: string;
  };
  emailStep: {
    badge: string;
    heading: string;
    capturedLabel: string;
    instructions: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phoneOptional: string;
    phonePlaceholder: string;
    sending: string;
    send: string;
    shareAnother: string;
    unlockHint: string;
    formHint: string;
  };
  emailSubmitted: {
    badge: string;
    headingTemplate: string;
    reviewingLabel: string;
    followUp: string;
    buttons: {
      bookCall: string;
      shareAnother: string;
    };
  };
  testimonialsTitle: string;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    image: string;
    alt: Record<Language, string>;
  }>;
  stats: {
    projects: string;
    satisfaction: string;
    sprint: string;
    rating: string;
  };
  companiesTitle: string;
}

const HERO_COPY: Record<Language, HeroCopy> = {
  en: {
    calculator: {
      title: 'Back-office manual process cost calculator',
      hoursLabel: 'Hours per person every week',
      hoursPlaceholder: 'e.g. 6',
      peopleLabel: 'People involved',
      peoplePlaceholder: 'e.g. 3',
      salaryLabel: 'Avg gross monthly salary (€)',
      salaryPlaceholder: 'e.g. 4000',
      descriptionLabel: 'Describe the manual process',
      descriptionPlaceholder: 'e.g. Time-tracking validation in the back-office.',
      submitCta: 'Calculate cost impact',
      resultTitle: 'Estimated cost of this manual process',
      monthlyLabel: 'Monthly cost',
      annualLabel: 'Annual cost',
      assumption:
        'Assumes a 40h workweek and adds +44% employer charges on top of the gross salary.',
      currencySymbol: '€',
    },
    headline: {
      primary: 'Increase your Net Margin Per Recruiter',
      highlight:
        'I audit your recruiting operations and implement AI-powered systems in 14 days to boost margins without hiring more staff.',
    },
    intro: {
      primary:
        'Manual recruiting processes drain productivity and compress margins. Profile sourcing, candidate screening, follow-ups, reporting… repetitive tasks that limit your recruiters\' capacity and revenue per head.',
      secondary:
        'My approach: identify your highest-impact bottlenecks, quantify the opportunity, then deploy AI systems that amplify each recruiter\'s output and profitability — working alongside your existing tools.',
    },
    validation: {
      empty: 'Please fill in every field to estimate the cost.',
      short: 'All values must be greater than zero.',
      long: 'Please enter realistic values (hours < 80, salary < 50,000).',
      emailEmpty: 'Please provide your email address',
      emailInvalid: 'Please enter a valid email address',
      missingPainpoint: 'Please run the cost calculator before sharing your email.',
      submissionFailed: 'Unable to save your details. Please try again.',
      unexpected: 'Unexpected error while sending your details. Please try again.',
    },
    emailStep: {
      badge: 'Almost there',
      heading: 'Where should I send your back-office audit and ROI breakdown?',
      capturedLabel: 'Manual process details',
      instructions:
        "I'll review these numbers, challenge assumptions, and reply with system ideas, timelines, and ROI projections.",
      emailLabel: 'Work email',
      emailPlaceholder: 'you@company.com',
      phoneLabel: 'Phone number',
      phoneOptional: '(optional)',
      phonePlaceholder: '+33 7 68 12 34 56',
      sending: 'Sending...',
      send: 'Send it',
      shareAnother: 'Adjust the numbers',
      unlockHint:
        "Share your work email and I'll send a detailed back-office systems audit with ROI projections (gross salary + 44% employer charges included).",
      formHint: 'I’ll reply with concrete system and automation ideas tailored to this process.',
    },
    emailSubmitted: {
      badge: 'Check your inbox',
      headingTemplate: "I'll send the audit and implementation plan to {{email}}.",
      reviewingLabel: 'Cost breakdown I’m reviewing',
      followUp:
        'I’ll send the back-office audit shortly. Feel free to book a call while I dig in.',
      buttons: {
        bookCall: 'Book a 20-min call',
        shareAnother: 'Recalculate another process',
      },
    },
    testimonialsTitle: 'They Trusted Us',
    testimonials: [
      {
        quote:
          'Vincent improved our internal tools and workflows, helping the Ops team save significant time on daily processes. His focus on operational efficiency had a clear impact on how we delivered projects.',
        author: 'Holy Sicard-Razaka',
        role: 'Head of Product @ Randstad',
        image: '/holy.jpeg',
        alt: {
          en: 'Holy Sicard-Razaka, Head of Product at Randstads',
          fr: 'Holy Sicard-Razaka, Head of Product chez Randstads',
        },
      },
      {
        quote:
          'Vincent built automations to sync product releases between tech and product — including Slack posts and GitLab updates. It streamlined our delivery process and reduced manual coordination.',
        author: 'Alexis Doroszkiewicz',
        role: 'Full-Stack Developer @ Side',
        image: '/alexis.jpeg',
        alt: {
          en: 'Alexis Doroszkiewicz, Full-Stack Developer at Side',
          fr: 'Alexis Doroszkiewicz, développeur full-stack chez Side',
        },
      },
      {
        quote:
          'Vincent proved highly effective at navigating our microservices environment to ensure smooth implementation. His work was crucial for expanding our platform’s capabilities.',
        author: 'Guillaume Forgue',
        role: 'Lead Developer @ Qomon',
        image: '/guillaume.jpeg',
        alt: {
          en: 'Guillaume Forgue, Lead Developer at Qomon',
          fr: 'Guillaume Forgue, lead developer chez Qomon',
        },
      },
    ],
    stats: {
      projects: 'Projects Delivered',
      satisfaction: 'Client Satisfaction',
      sprint: 'Average Sprint Time',
      rating: 'Average Rating',
    },
    companiesTitle: 'Companies we worked with',
  },
  fr: {
    calculator: {
      title: 'Calculez le coût de votre processus manuel de back-office',
      hoursLabel: 'Heures par personne et par semaine',
      hoursPlaceholder: 'ex. 6',
      peopleLabel: 'Nombre de personnes concernées',
      peoplePlaceholder: 'ex. 3',
      salaryLabel: 'Salaire brut mensuel moyen (€)',
      salaryPlaceholder: 'ex. 4000',
      descriptionLabel: 'Décrivez ce processus',
      descriptionPlaceholder: 'ex. Validation des heures d’intérimaires.',
      submitCta: 'Estimer le coût',
      resultTitle: 'Coût estimé de ce processus manuel',
      monthlyLabel: 'Coût mensuel',
      annualLabel: 'Coût annuel',
      assumption:
        'Hypothèse : 40h/semaine + 44 % de charges patronales ajoutées au salaire brut.',
      currencySymbol: '€',
    },
    headline: {
      primary: 'Votre back-office perd jusqu’à 35h/semaine dans des process manuels.',
      highlight:
        'J’audite vos opérations internes et je mets en place un premier système en 14 jours pour vous permettre de scaler sans recruter.',
    },
    intro: {
      primary:
        'Ces pertes de temps dans le back-office représentent souvent plusieurs dizaines de milliers d’euros par an en salaires, retards et opportunités manquées. Devis, relances, saisies, reporting… autant de tâches répétitives qui saturent vos équipes et freinent votre croissance.',
      secondary:
        'Mon approche : détecter vos points de friction les plus coûteux, les chiffrer, puis mettre en place un système simple qui libère du temps et de la marge — sans changer vos outils existants.',
    },
    validation: {
      empty: 'Merci de remplir tous les champs pour estimer le coût.',
      short: 'Toutes les valeurs doivent être supérieures à zéro.',
      long: 'Merci d’entrer des valeurs réalistes (heures < 80, salaire < 50 000).',
      emailEmpty: 'Merci d’indiquer votre adresse e-mail',
      emailInvalid: 'Merci d’entrer une adresse e-mail valide',
      missingPainpoint: 'Merci de lancer le calcul avant d’indiquer votre e-mail.',
      submissionFailed: 'Impossible d’enregistrer vos informations. Merci de réessayer.',
      unexpected: 'Erreur inattendue lors de l’envoi de vos informations. Merci de réessayer.',
    },
    emailStep: {
      badge: 'On y est presque',
      heading:
        'Où dois-je vous envoyer l’audit de votre back-office et l’estimation de ROI ?',
      capturedLabel: 'Détails du processus',
      instructions:
        'J’analyse ces chiffres, je challenge les hypothèses et je vous réponds avec des idées de système, un planning et le ROI attendu.',
      emailLabel: 'Email professionnel',
      emailPlaceholder: 'vous@entreprise.com',
      phoneLabel: 'Numéro de téléphone',
      phoneOptional: '(optionnel)',
      phonePlaceholder: '+33 6 12 34 56 78',
      sending: 'Envoi...',
      send: 'Envoyer',
      shareAnother: 'Ajuster les chiffres',
      unlockHint:
        "Partagez votre e-mail pro pour recevoir un audit de votre back-office et le détail du ROI (salaire brut + 44 % de charges).",
      formHint:
        'Je vous recontacte avec des idées de systèmes et d’automatisation adaptées à ce process.',
    },
    emailSubmitted: {
      badge: 'Vérifiez votre boîte mail',
      headingTemplate: 'J’envoie l’audit et le plan de mise en œuvre à {{email}}.',
      reviewingLabel: 'Ce que j’analyse',
      followUp:
        'Je vous envoie l’audit très vite. En attendant, vous pouvez réserver un appel.',
      buttons: {
        bookCall: 'Réserver un appel de 20 minutes',
        shareAnother: 'Recalculer un autre process',
      },
    },
    testimonialsTitle: 'Ils m’ont fait confiance',
    testimonials: [
      {
        quote:
          'Vincent a amélioré nos outils internes et nos workflows, permettant à l’équipe Ops de gagner un temps considérable au quotidien. Son focus en efficacité opérationnelle a eu un impact direct sur notre delivery.',
        author: 'Holy Sicard-Razaka',
        role: 'Head of Product chez Side',
        image: '/holy.jpeg',
        alt: {
          en: 'Holy Sicard-Razaka, Head of Product at Side',
          fr: 'Holy Sicard-Razaka, Head of Product chez Side',
        },
      },
      {
        quote:
          'Vincent a mis en place des automatisations pour synchroniser les sorties produit entre la tech et le produit — Slack, GitLab, etc. Cela a fluidifié notre delivery et réduit la coordination manuelle.',
        author: 'Alexis Doroszkiewicz',
        role: 'Développeur full-stack chez Side',
        image: '/alexis.jpeg',
        alt: {
          en: 'Alexis Doroszkiewicz, Full-Stack Developer at Side',
          fr: 'Alexis Doroszkiewicz, développeur full-stack chez Side',
        },
      },
      {
        quote:
          'Vincent s’est montré très efficace pour naviguer dans notre environnement microservices et assurer une implémentation fluide. Son travail a été crucial pour étendre les capacités de notre plateforme.',
        author: 'Guillaume Forgue',
        role: 'Lead developer chez Qomon',
        image: '/guillaume.jpeg',
        alt: {
          en: 'Guillaume Forgue, Lead Developer at Qomon',
          fr: 'Guillaume Forgue, lead developer chez Qomon',
        },
      },
    ],
    stats: {
      projects: 'Projets livrés',
      satisfaction: 'Satisfaction client',
      sprint: 'Durée moyenne d’un sprint',
      rating: 'Note moyenne',
    },
    companiesTitle: 'Entreprises accompagnées',
  },
};

export default function Hero({ 
  calendarLink = 'https://cal.com/vincent-baron/30mins-meeting',
}: HeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedPainpoint, setCapturedPainpoint] = useState('');
  const { language } = useLanguage();
  const copy = HERO_COPY[language];
  const headlineFocusToken = HIGHLIGHT_FOCUS_TOKENS.find((token) =>
    copy.headline.highlight.toLowerCase().includes(token.toLowerCase()),
  );
  const highlightedHeadline = headlineFocusToken
    ? copy.headline.highlight
        .split(new RegExp(`(${escapeRegExp(headlineFocusToken)})`, 'i'))
        .filter(Boolean)
        .map((segment, index) =>
          segment.toLowerCase() === headlineFocusToken.toLowerCase() ? (
            <span
              key={`focus-${index}`}
              className="bg-white text-blue-700 px-2 py-0.5 rounded-full shadow-sm font-semibold"
            >
              {segment}
            </span>
          ) : (
            <span key={`segment-${index}`}>{segment}</span>
          ),
        )
    : copy.headline.highlight;

  const handleBookCall = () => {
    setIsModalOpen(true);
  };

    return (
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Hero Content */}
          <div className="flex flex-col gap-6 sm:gap-8 items-center mb-12 sm:mb-16">
            {/* Headline and Text */}
            <div className="text-center flex flex-col gap-6 sm:gap-8">
              {/* Badge */}
              <div className="flex justify-center mb-2 mt-4 sm:mt-6">
                <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 border-3 border-gray-900 text-gray-900 text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  Process Optimisation
                </span>
              </div>
              
              {/* Main Headline */}
              <div className="mb-6 pb-0">
                <h1 className="mb-3 pb-0">
                  <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight whitespace-pre-line pb-2" style={{ WebkitTextStroke: '0.5px rgba(79, 70, 229, 0.3)', paintOrder: 'stroke fill' }}>
                    {copy.headline.primary}
                  </span>
                </h1>
                <span className="inline-block px-6 py-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 leading-tight transform -skew-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-900 rounded-lg" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3), 0 0 1px rgba(0, 0, 0, 0.2)' }}>
                  with AI
                </span>
              </div>
              


              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
                <button
                  type="button"
                  onClick={handleBookCall}
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-900 transition-all duration-200 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <svg
                    className="w-5 h-5 transition-transform group-hover:rotate-12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5A2.25 2.25 0 0021 19.5v-1.26a1.125 1.125 0 00-.852-1.09l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293a.75.75 0 01-1.21.038 12.036 12.036 0 01-3.173-3.173.75.75 0 01.038-1.21l1.293-.97a1.125 1.125 0 00.417-1.173L7.85 3.102A1.125 1.125 0 006.76 2.25H5.5A2.25 2.25 0 003.25 4.5v2.25z"
                    />
                  </svg>
                  {language === 'fr' ? 'Réserver un appel gratuit' : 'Book a free call'}
                </button>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="text-center flex flex-col gap-6">
            <p className="text-sm sm:text-base text-gray-600 font-medium">
              {copy.testimonialsTitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
              {copy.testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="bg-white rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-900 text-left"
                >
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.alt[language]}
                      className="h-12 w-12 rounded-full object-cover border-4 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    />
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats and Companies Section */}
          <div className="mt-12 sm:mt-16 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16">
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  30+
                </div>
                <p className="text-sm text-gray-600 mt-2">{copy.stats.projects}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {language === 'fr' ? '2 semaines' : '2 Weeks'}
                </div>
                <p className="text-sm text-gray-600 mt-2">{copy.stats.sprint}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  4.9/5
                </div>
                <p className="text-sm text-gray-600 mt-2">{copy.stats.rating}</p>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px h-24 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

            {/* Companies */}
            <div className="text-center">
              <p className="text-base text-gray-600 font-medium mb-6">
                {copy.companiesTitle}
              </p>
              <div className="flex items-center justify-center gap-6 md:gap-8">
                {/* Qomon Logo */}
                <div className="group transition-all duration-300 hover:scale-105">
                  <img
                    src="/qomonLogo.png"
                    alt="Qomon"
                    className="h-8 w-auto opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                  />
                </div>

                {/* Side Logo */}
                <div className="group transition-all duration-300 hover:scale-105">
                  <img
                    src="/sideLogo.png"
                    alt="Side"
                    className="h-8 w-auto opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                  />
                </div>

                {/* Mitsubishi Logo */}
                <div className="group transition-all duration-300 hover:scale-105">
                  <img
                    src="/mitsubishi.avif"
                    alt="Mitsubishi"
                    className="h-8 w-auto opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendly Modal */}
        <CalendlyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          painpoint={capturedPainpoint}
          calendarLink={calendarLink}
        />
      </section>
    );
}