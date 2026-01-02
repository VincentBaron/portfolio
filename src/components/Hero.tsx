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
      primary: 'Increase your Net Margin Per Recruiter\nwith AI',
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
    testimonialsTitle: 'They Trusted Me',
    testimonials: [
      {
        quote:
          'Vincent improved our internal tools and workflows, helping the Ops team save significant time on daily processes. His focus on operational efficiency had a clear impact on how we delivered projects.',
        author: 'Holy Sicard-Razaka',
        role: 'Head of Product @ Side',
        image: '/holy.jpeg',
        alt: {
          en: 'Holy Sicard-Razaka, Head of Product at Side',
          fr: 'Holy Sicard-Razaka, Head of Product chez Side',
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
    companiesTitle: 'Companies I worked with',
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
  showOnlyIntro = false,
  showOnlyCalculator = false,
  showWithTestimonials = false
}: HeroProps) {
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [peopleCount, setPeopleCount] = useState('');
  const [monthlyCostPerPerson, setMonthlyCostPerPerson] = useState('');
  const [processDescription, setProcessDescription] = useState('');
  const [calculatedMonthlyCost, setCalculatedMonthlyCost] = useState<number | null>(null);
  const [calculatedAnnualCost, setCalculatedAnnualCost] = useState<number | null>(null);
  const [lockedInputs, setLockedInputs] = useState<{
    hours: number;
    people: number;
    grossSalary: number;
    description: string;
  } | null>(null);
  const [flowState, setFlowState] = useState<FlowState>('input');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedPainpoint, setCapturedPainpoint] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const { language } = useLanguage();
  const copy = HERO_COPY[language];
  const locale = language === 'fr' ? 'fr-FR' : 'en-US';
  const currencyCode = copy.calculator.currencySymbol === '$' ? 'USD' : 'EUR';
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(Math.round(value));
  const formatHours = (value: number) =>
    Number.isInteger(value) ? value.toString() : value.toFixed(1);
  const peopleWord = (count: number) =>
    language === 'fr'
      ? count > 1
        ? 'personnes'
        : 'personne'
      : count > 1
        ? 'people'
        : 'person';
  const confirmationHeading = copy.emailSubmitted.headingTemplate.replace(
    '{{email}}',
    submittedEmail || copy.emailStep.emailPlaceholder,
  );
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
  const validateCalculatorInputs = (
    hours: number,
    people: number,
    grossSalary: number,
  ): string | null => {
    if (!Number.isFinite(hours) || !Number.isFinite(people) || !Number.isFinite(grossSalary)) {
      return copy.validation.empty;
    }
    if (hours <= 0 || people <= 0 || grossSalary <= 0) {
      return copy.validation.short;
    }
    return null;
  };

  const validateEmail = (value: string): string | null => {
    if (!value.trim()) return copy.validation.emailEmpty;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value.trim())) return copy.validation.emailInvalid;
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hours = parseFloat(hoursPerWeek);
    const people = Math.round(parseFloat(peopleCount));
    const grossSalary = parseFloat(monthlyCostPerPerson);
    const trimmedDescription = processDescription.trim();
    const validationError = validateCalculatorInputs(hours, people, grossSalary);
    if (validationError) {
      setError(validationError);
      return;
    }

    const monthlyEmployerCostPerPerson = grossSalary * EMPLOYER_MULTIPLIER;
    const monthlyCost = monthlyEmployerCostPerPerson * (hours / 40) * people;
    const annualCost = monthlyCost * 12;
    const summary =
      language === 'fr'
        ? `Estimation : ${formatHours(hours)}h/semaine × ${people} ${peopleWord(
            people,
          )} à ${formatCurrency(grossSalary)} brut/mois (+${EMPLOYER_CHARGE_PERCENT}% de charges) → ${formatCurrency(
            monthlyCost,
          )}/mois (${formatCurrency(annualCost)}/an).`
        : `Estimate: ${formatHours(hours)}h/week × ${people} ${peopleWord(
            people,
          )} at ${formatCurrency(
            grossSalary,
          )} gross/month (+${EMPLOYER_CHARGE_PERCENT}% employer charges) → ${formatCurrency(
            monthlyCost,
          )} per month (${formatCurrency(annualCost)} per year).`;
    const descriptionLine = trimmedDescription
      ? language === 'fr'
        ? `Processus : ${trimmedDescription}`
        : `Process: ${trimmedDescription}`
      : '';
    const combinedSummary = descriptionLine ? `${descriptionLine}\n${summary}` : summary;

    setProcessDescription(trimmedDescription);
    setError('');
    setEmailError('');
    setSubmissionError('');
    setIsSubmitting(false);
    setCalculatedMonthlyCost(monthlyCost);
    setCalculatedAnnualCost(annualCost);
    setLockedInputs({
      hours,
      people,
      grossSalary,
      description: trimmedDescription,
    });
    setCapturedPainpoint(combinedSummary);
    setFlowState('collect_email');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }

    setEmailError('');
    setSubmissionError('');
    if (!capturedPainpoint || !lockedInputs) {
      setError(copy.validation.missingPainpoint);
      setFlowState('input');
      return;
    }

    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    setIsSubmitting(true);

    console.log('Submitting email:', trimmedEmail, 'for painpoint:', capturedPainpoint);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: trimmedEmail,
          phone: trimmedPhone || undefined,
          painpoint: capturedPainpoint,
        }),
      });

      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          data && typeof data === 'object' && 'error' in data
            ? String((data as { error?: unknown }).error ?? '')
            : '';
        setSubmissionError(message || copy.validation.submissionFailed);
        return;
      }

      setSubmittedEmail(trimmedEmail);
      setEmail('');
      setPhone('');
      setSubmissionError('');
      setFlowState('email_submitted');
    } catch {
      setSubmissionError(copy.validation.unexpected);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    setError('');
    setFlowState('input');
    setCapturedPainpoint('');
    setLockedInputs(null);
    setCalculatedMonthlyCost(null);
    setCalculatedAnnualCost(null);
    setEmail('');
    setPhone('');
    setSubmittedEmail('');
    setEmailError('');
    setSubmissionError('');
    setIsSubmitting(false);
  };

  const handleBookCall = () => {
    setIsModalOpen(true);
  };

  // If showing only intro, render just the headline and CTA
  if (showOnlyIntro) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 py-0 pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto w-full">
          {/* Hero Content */}
          <div className="flex flex-col gap-2 sm:gap-3 items-center">
            {/* Headline and Text */}
            <div className="text-center flex flex-col gap-2 sm:gap-3">
              {/* Agents Badge */}
              <div className="flex items-center justify-center">
                <div className="inline-flex items-center gap-4">
                  {/* Avatar Stack */}
                  <div className="flex -space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                      <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                      <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                      <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                      <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                      <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                      <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  {/* Count Badge */}
                  <span className="text-base font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {language === 'fr' ? '9 agents' : '9 agents'}
                  </span>
                </div>
              </div>
              
              {/* Main Headline */}
              <h1 className="mb-0 pb-0">
                <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-[1.3] whitespace-pre-line">
                  {copy.headline.primary}
                </span>
              </h1>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleBookCall}
                  className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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

  // If showing with testimonials, render intro + testimonials/companies but not calculator
  if (showWithTestimonials) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 py-0 pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto w-full">
          {/* Hero Content */}
          <div className="flex flex-col gap-2 sm:gap-3 items-center mb-0">
            {/* Headline and Text */}
            <div className="text-center flex flex-col gap-2 sm:gap-3">
              {/* Agents Badge */}
              <div className="flex items-center justify-center">
                <div className="inline-flex items-center gap-4">
                  {/* Avatar Stack */}
                  <div className="flex -space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                      <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                      <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                      <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                      <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                      <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                      <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  {/* Count Badge */}
                  <span className="text-base font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {language === 'fr' ? '9 agents' : '9 agents'}
                  </span>
                </div>
              </div>
              
              {/* Main Headline */}
              <h1 className="mb-0 pb-0">
                <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-[1.3] whitespace-pre-line">
                  {copy.headline.primary}
                </span>
              </h1>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleBookCall}
                  className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
          <div className="mt-0 pt-0 text-center flex flex-col gap-1 sm:gap-2">
            <p className="text-xs sm:text-sm text-gray-600 mb-0 font-medium">
              {copy.testimonialsTitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 mx-auto">
              {copy.testimonials.map((testimonial) => (
                <div
                  key={testimonial.author}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-left"
                >
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.alt[language]}
                      className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover border border-white shadow"
                    />
                    <div className="text-left">
                      <p className="text-xs sm:text-sm font-semibold text-gray-900">
                        {testimonial.author}
                      </p>
                      <p className="text-[11px] sm:text-xs text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats and Companies Section */}
          <div className="mt-0 sm:mt-1 lg:mt-2 flex flex-col lg:flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-6 xl:gap-8">
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  50+
                </div>
                <p className="text-xs text-gray-600 mt-1">{copy.stats.projects}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {language === 'fr' ? '2 semaines' : '2 Weeks'}
                </div>
                <p className="text-xs text-gray-600 mt-1">{copy.stats.sprint}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  4.9/5
                </div>
                <p className="text-xs text-gray-600 mt-1">{copy.stats.rating}</p>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block w-px h-20 bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-60"></div>

            {/* Companies */}
            <div className="text-center">
              <p className="text-sm text-gray-600 font-medium mb-4">
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

  // If showing only calculator, skip the intro section
  const showIntroSection = !showOnlyCalculator;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-0 pt-20 sm:pt-24">
      <div className="max-w-7xl mx-auto w-full">
        {showIntroSection && (
          <>
        {/* Hero Content */}
        <div className="flex flex-col gap-2 sm:gap-3 items-center mb-0">
          {/* Headline and Text */}
          <div className="text-center flex flex-col gap-2 sm:gap-3">
            {/* Agents Badge */}
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center gap-4">
                {/* Avatar Stack */}
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                    <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                    <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                    <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                    <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                    <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-gray-200/20 shadow-xl overflow-hidden flex items-center justify-center p-1.5">
                    <img src="/logoBrand.png" alt="Agent" className="w-full h-full object-contain" />
                  </div>
                </div>
                {/* Count Badge */}
                <span className="text-base font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {language === 'fr' ? '9 agents' : '9 agents'}
                </span>
              </div>
            </div>
            
            {/* Main Headline */}
            <h1 className="mb-0 pb-0">
              <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-[1.3] whitespace-pre-line">
                {copy.headline.primary}
              </span>
            </h1>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <button
                type="button"
                onClick={handleBookCall}
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
        </>
        )}

        {/* Painpoint to Plan Flow */}
        {!showOnlyIntro && (
        <div className="mb-0 mt-2 sm:mt-3">
          <div className="max-w-5xl mx-auto">
            {/* Input State */}
            {flowState === 'input' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 sm:p-10 shadow-2xl shadow-blue-500/10 space-y-8">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-1">
                      {copy.calculator.title}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid gap-5 sm:grid-cols-3">
                      <div>
                        <label
                          htmlFor="hoursPerWeek"
                          className="block text-sm font-bold text-gray-900 mb-2"
                        >
                          {copy.calculator.hoursLabel}
                        </label>
                        <div className="relative">
                          <input
                            id="hoursPerWeek"
                            type="number"
                            min="0"
                            step="0.5"
                            inputMode="decimal"
                            value={hoursPerWeek}
                            onChange={(e) => {
                              setHoursPerWeek(e.target.value);
                              if (error) setError('');
                            }}
                            placeholder={copy.calculator.hoursPlaceholder}
                            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 pr-20 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-gray-300"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                            {language === 'fr' ? 'h/sem.' : 'h/week'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="peopleCount"
                          className="block text-sm font-bold text-gray-900 mb-2"
                        >
                          {copy.calculator.peopleLabel}
                        </label>
                        <div className="relative">
                          <input
                            id="peopleCount"
                            type="number"
                            min="1"
                            step="1"
                            inputMode="numeric"
                            value={peopleCount}
                            onChange={(e) => {
                              setPeopleCount(e.target.value);
                              if (error) setError('');
                            }}
                            placeholder={copy.calculator.peoplePlaceholder}
                            className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-gray-300"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                            {language === 'fr' ? 'pers.' : 'ppl'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="monthlyCostPerPerson"
                          className="block text-sm font-bold text-gray-900 mb-2"
                        >
                          {copy.calculator.salaryLabel}
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-semibold text-gray-400">
                            {copy.calculator.currencySymbol}
                          </span>
                          <input
                            id="monthlyCostPerPerson"
                            type="number"
                            min="0"
                            step="any"
                            inputMode="decimal"
                            value={monthlyCostPerPerson}
                            onChange={(e) => {
                              setMonthlyCostPerPerson(e.target.value);
                              if (error) setError('');
                            }}
                            placeholder={copy.calculator.salaryPlaceholder}
                            className="w-full rounded-xl border-2 border-gray-200 pl-12 pr-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-gray-300"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="processDescription"
                        className="block text-sm font-bold text-gray-900 mb-2"
                      >
                        {copy.calculator.descriptionLabel}
                      </label>
                      <input
                        id="processDescription"
                        type="text"
                        value={processDescription}
                        onChange={(e) => {
                          setProcessDescription(e.target.value);
                          if (error) setError('');
                        }}
                        placeholder={copy.calculator.descriptionPlaceholder}
                        className="w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-gray-300"
                      />
                    </div>

                    {error && <p className="text-red-600 text-sm font-semibold animate-fade-in">{error}</p>}

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={!hoursPerWeek || !peopleCount || !monthlyCostPerPerson}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                      >
                        {copy.calculator.submitCta}
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h14M12 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* Email Collection State */}
            {flowState === 'collect_email' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
                        {copy.emailStep.badge}
                      </p>
                      <h3 className="text-xl font-bold text-gray-900">
                        {copy.emailStep.heading}
                      </h3>
                    </div>
                  </div>

                  {lockedInputs && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800 space-y-3">
                      <p className="font-semibold text-blue-900">
                        {copy.emailStep.capturedLabel}
                      </p>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="bg-white/60 rounded-lg p-3 text-blue-900">
                          <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-1">
                            {copy.calculator.hoursLabel}
                          </p>
                          <p className="text-lg font-bold">
                            {formatHours(lockedInputs.hours)}{' '}
                            {language === 'fr' ? 'h/sem.' : 'h/week'}
                          </p>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3 text-blue-900">
                          <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-1">
                            {copy.calculator.peopleLabel}
                          </p>
                          <p className="text-lg font-bold">
                            {lockedInputs.people} {peopleWord(lockedInputs.people)}
                          </p>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3 text-blue-900">
                          <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-1">
                            {copy.calculator.salaryLabel}
                          </p>
                          <p className="text-lg font-bold">
                            {formatCurrency(lockedInputs.grossSalary)}
                          </p>
                        </div>
                      </div>
                      {lockedInputs.description && (
                        <div className="bg-white/60 rounded-lg p-3 text-blue-900">
                          <p className="text-xs uppercase tracking-wide text-blue-600 font-semibold mb-1">
                            {copy.calculator.descriptionLabel}
                          </p>
                          <p className="text-sm">{lockedInputs.description}</p>
                        </div>
                      )}
                      <p className="text-xs text-blue-700/80">
                        {copy.emailStep.unlockHint}
                      </p>
                    </div>
                  )}

                  {typeof calculatedMonthlyCost === 'number' &&
                    typeof calculatedAnnualCost === 'number' && (
                      <div className="bg-white border border-blue-100 rounded-xl p-4 sm:p-5 shadow-sm space-y-3">
                        <p className="text-xs uppercase tracking-wide text-blue-700 font-semibold">
                          {copy.calculator.resultTitle}
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-[11px] uppercase tracking-wide text-blue-600 font-semibold mb-1">
                              {copy.calculator.monthlyLabel}
                            </p>
                            <p className="text-2xl font-bold text-blue-900">
                              {formatCurrency(calculatedMonthlyCost)}
                            </p>
                          </div>
                          <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-[11px] uppercase tracking-wide text-blue-600 font-semibold mb-1">
                              {copy.calculator.annualLabel}
                            </p>
                            <p className="text-2xl font-bold text-blue-900">
                              {formatCurrency(calculatedAnnualCost)}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-blue-700/80">
                          {copy.calculator.assumption}
                        </p>
                      </div>
                    )}

                  <p className="text-sm text-gray-700">
                    {copy.emailStep.instructions}
                  </p>

                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-1">
                        <label
                          htmlFor="workEmail"
                          className="text-sm font-semibold text-gray-800"
                        >
                          {copy.emailStep.emailLabel}
                        </label>
                        <input
                          id="workEmail"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError('');
                            if (submissionError) setSubmissionError('');
                          }}
                          placeholder={copy.emailStep.emailPlaceholder}
                          disabled={isSubmitting}
                          aria-invalid={Boolean(emailError)}
                          className={`w-full rounded-xl border-2 px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-4 transition-all shadow-sm ${
                            emailError
                              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10'
                          } ${isSubmitting ? 'opacity-80 cursor-progress' : ''}`}
                        />
                        {emailError && (
                          <p className="text-red-600 text-sm">{emailError}</p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <label
                          htmlFor="phoneNumber"
                          className="text-sm font-semibold text-gray-800"
                        >
                          {copy.emailStep.phoneLabel}{' '}
                          <span className="text-gray-400">
                            {copy.emailStep.phoneOptional}
                          </span>
                        </label>
                        <input
                          id="phoneNumber"
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (submissionError) setSubmissionError('');
                          }}
                          placeholder={copy.emailStep.phonePlaceholder}
                          disabled={isSubmitting}
                          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                        />
                      </div>
                    </div>
                    {submissionError && !emailError && (
                      <p className="text-red-600 text-sm">{submissionError}</p>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className="inline-flex w-full sm:w-auto items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? copy.emailStep.sending : copy.emailStep.send}
                      </button>
                      <p className="text-xs text-gray-500">
                        {copy.emailStep.formHint}
                      </p>
                    </div>
                  </form>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {copy.emailStep.shareAnother}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Email Submitted State */}
            {flowState === 'email_submitted' && (
              <div className="max-w-4xl mx-auto space-y-4">
                <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-white/10">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/70 font-semibold">
                        {copy.emailSubmitted.badge}
                      </p>
                      <h3 className="text-xl font-bold">
                        {confirmationHeading}
                      </h3>
                    </div>
                  </div>

                  {typeof calculatedMonthlyCost === 'number' &&
                    typeof calculatedAnnualCost === 'number' && (
                      <div className="mb-4">
                        <p className="text-xs uppercase tracking-wide text-white/70 font-semibold mb-2">
                          {copy.calculator.resultTitle}
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="bg-white/10 border border-white/20 rounded-xl p-4">
                            <p className="text-xs uppercase tracking-wide text-white/70 font-semibold mb-1">
                              {copy.calculator.monthlyLabel}
                            </p>
                            <p className="text-2xl font-bold">
                              {formatCurrency(calculatedMonthlyCost)}
                            </p>
                          </div>
                          <div className="bg-white/10 border border-white/20 rounded-xl p-4">
                            <p className="text-xs uppercase tracking-wide text-white/70 font-semibold mb-1">
                              {copy.calculator.annualLabel}
                            </p>
                            <p className="text-2xl font-bold">
                              {formatCurrency(calculatedAnnualCost)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                  {lockedInputs && (
                    <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-sm text-white/90 mb-4 space-y-3">
                      <p className="text-xs uppercase tracking-wide text-white/70 font-semibold">
                        {copy.emailSubmitted.reviewingLabel}
                      </p>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-[11px] uppercase tracking-wide text-white/60 font-semibold mb-1">
                            {copy.calculator.hoursLabel}
                          </p>
                          <p className="text-lg font-bold">
                            {formatHours(lockedInputs.hours)}{' '}
                            {language === 'fr' ? 'h/sem.' : 'h/week'}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-[11px] uppercase tracking-wide text-white/60 font-semibold mb-1">
                            {copy.calculator.peopleLabel}
                          </p>
                          <p className="text-lg font-bold">
                            {lockedInputs.people} {peopleWord(lockedInputs.people)}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-[11px] uppercase tracking-wide text-white/60 font-semibold mb-1">
                            {copy.calculator.salaryLabel}
                          </p>
                          <p className="text-lg font-bold">
                            {formatCurrency(lockedInputs.grossSalary)}
                          </p>
                        </div>
                      </div>
                      {lockedInputs.description && (
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-[11px] uppercase tracking-wide text-white/60 font-semibold mb-1">
                            {copy.calculator.descriptionLabel}
                          </p>
                          <p className="text-sm text-white/90">
                            {lockedInputs.description}
                          </p>
                        </div>
                      )}
                      {capturedPainpoint && (
                        <p className="leading-relaxed text-white/80 whitespace-pre-line">
                          {capturedPainpoint}
                        </p>
                      )}
                    </div>
                  )}

                  <p className="text-sm text-white/80 mb-6">
                    {copy.emailSubmitted.followUp}
                  </p>

                  <div className="flex justify-center">
                    <button
                      onClick={handleBookCall}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-blue-600 font-semibold shadow-lg hover:text-blue-700 transition-all"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V5a3 3 0 016 0v2h3a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3zm2-2a1 1 0 112 0v2h-2V5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 13h6"
                        />
                      </svg>
                      {copy.emailSubmitted.buttons.bookCall}
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleRetry}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 5A8.001 8.001 0 004.582 9H9m0 11v-5h-.582"
                      />
                    </svg>
                    {copy.emailSubmitted.buttons.shareAnother}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        )}
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