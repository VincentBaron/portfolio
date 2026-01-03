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
      primary: 'Increase your Net Margin\nPer Recruiter',
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
      <section className="px-4 sm:px-6 lg:px-8 mt-24 sm:mt-26 lg:mt-34 mb-8 sm:mb-12 lg:mb-16">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
          {/* Hero Content */}
          <div className="flex flex-col gap-6 sm:gap-8 items-center mb-2">
            {/* Headline and Text */}
            <div className="text-center flex flex-col gap-10 sm:gap-12 max-w-6xl mx-auto relative">
              
              {/* Blur effect background */}
              <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-orange-100/20 via-yellow-100/15 to-orange-100/20 rounded-full blur-[100px]"></div>
              </div>
              
              {/* Main Headline */}
              <div className="space-y-6 relative z-10">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-7xl font-semibold text-gray-700 leading-[1.1] tracking-[-0.015em] px-4">
                  {language === 'en' ? (
                    <>
                      Increase your Net Margin<br />
                      Per Recruiter{' '}
                      <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent font-bold whitespace-nowrap">
                        with AI
                      </span>
                    </>
                  ) : (
                    <>
                      {copy.headline.primary}{' '}
                      <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent font-bold">
                        avec l'IA
                      </span>
                    </>
                  )}
                </h1>
              </div>

            </div>
          </div>

          {/* Testimonials */}
          <div>
          <div className="text-center flex flex-col gap-3">
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
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16 mt-12 sm:mt-16 lg:mt-8">
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  30+
                </div>
                <p className="text-sm text-gray-600 mt-2">{copy.stats.projects}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {language === 'fr' ? '2 semaines' : '2 Weeks'}
                </div>
                <p className="text-sm text-gray-600 mt-2">{copy.stats.sprint}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  4.9/5
                </div>
                <p className="text-sm text-gray-600 mt-2">{copy.stats.rating}</p>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px h-24 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

            {/* Companies */}
            <div className="text-center w-full lg:w-auto">
              <div className="relative overflow-hidden max-w-xl mx-auto py-4 logo-slideshow">
                {/* Scrolling container - will continuously scroll left */}
                <div className="inline-flex items-center animate-scroll whitespace-nowrap">
                  {/* First set of logos */}
                  <div className="inline-flex items-center shrink-0">
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/side.png"
                        alt="Side"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-32 flex items-center justify-center mx-6">
                      <img
                        src="/randstad.png"
                        alt="Randstad"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-32 flex items-center justify-center mx-6">
                      <img
                        src="/qomon.png"
                        alt="Qomon"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/mitsubishi.webp"
                        alt="Mitsubishi"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/intermarche.png"
                        alt="Intermarché"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/freMobile.png"
                        alt="Free Mobile"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                  </div>
                  {/* Duplicate set for seamless loop */}
                  <div className="inline-flex items-center shrink-0">
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/side.png"
                        alt="Side"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-32 flex items-center justify-center mx-6">
                      <img
                        src="/randstad.png"
                        alt="Randstad"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-32 flex items-center justify-center mx-6">
                      <img
                        src="/qomon.png"
                        alt="Qomon"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/mitsubishi.webp"
                        alt="Mitsubishi"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/intermarche.png"
                        alt="Intermarché"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                    <div className="group transition-all duration-300 hover:scale-105 shrink-0 w-24 flex items-center justify-center mx-6">
                      <img
                        src="/freMobile.png"
                        alt="Free Mobile"
                        className="max-w-full opacity-60 group-hover:opacity-90 transition-opacity duration-300 grayscale group-hover:grayscale-0 object-contain"
                      />
                    </div>
                  </div>
                </div>
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