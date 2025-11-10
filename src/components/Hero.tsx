import { useState } from 'react';
import CalendlyModal from './CalendlyModal';
import { useLanguage, type Language } from '../lib/language';

type FlowState = 'input' | 'collect_email' | 'email_submitted';

interface HeroProps {
  calendarLink?: string;
}

interface HeroCopy {
  headline: {
    primary: string;
    highlight: string;
  };
  intro: {
    primary: string;
    secondary: string;
  };
  painpointPlaceholder: string;
  generateTitle: string;
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
    emailPlaceholder: string;
    sending: string;
    send: string;
    shareAnother: string;
  };
  emailSubmitted: {
    badge: string;
    headingTemplate: string;
    reviewingLabel: string;
    followUp: string;
    buttons: {
      bookCall: string;
      caseStudies: string;
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
    headline: {
      primary: 'Eliminate up to 80% of manual work',
      highlight: 'Reduce operational costs by up to 40%',
    },
    intro: {
      primary:
        'Manual processes cost you time, money, and frustration. I design scalable backend and AI systems that make your operations run themselves.',
      secondary:
        'With over five years of experience as a software engineer, I combine deep technical expertise with a business-first mindset to uncover inefficiencies and deliver practical, production-ready MVPs in focused two-week sprints.',
    },
    painpointPlaceholder: 'Describe your painpoint...',
    generateTitle: 'Generate Sprint Plan',
    validation: {
      empty: 'Please describe your painpoint',
      short: 'Please provide more details about your painpoint',
      long: 'Please keep your painpoint under 500 characters',
      emailEmpty: 'Please provide your email address',
      emailInvalid: 'Please enter a valid email address',
      missingPainpoint: 'Please describe your painpoint before sharing your email.',
      submissionFailed: 'Unable to save your details. Please try again.',
      unexpected: 'Unexpected error while sending your details. Please try again.',
    },
    emailStep: {
      badge: 'Almost there',
      heading: 'Where should I send your detailed audit and implementation plan?',
      capturedLabel: 'Painpoint received',
      instructions:
        'I’ll review this and send a deeper breakdown with timelines, quick wins, and the two-week sprint structure straight to your inbox.',
      emailPlaceholder: 'you@company.com',
      sending: 'Sending...',
      send: 'Send it',
      shareAnother: 'Share a different painpoint',
    },
    emailSubmitted: {
      badge: 'Check your inbox',
      headingTemplate: 'I’ll send the audit and implementation plan to {{email}}.',
      reviewingLabel: 'What I’m reviewing',
      followUp:
        'Expect a response within one business day. In the meantime, feel free to book a call or dive into relevant case studies.',
      buttons: {
        bookCall: 'Book a 20-min call',
        caseStudies: 'See case studies',
        shareAnother: 'Share another painpoint',
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
    headline: {
      primary: 'Éliminez jusqu’à 80 % de vos tâches manuelles',
      highlight: 'Réduisez de 40% vos coûts opérationnels',
    },
    intro: {
      primary:
        'Les processus manuels vous coûtent du temps, de l’argent et de la frustration. Je conçois des automatisations sans que vous ayez à changer vos outils.',
      secondary:
        'Fort de cinq ans d’expérience en ingénierie logicielle, je combine expertise technique et vision business pour identifier les inefficacités et livrer des MVP prêts pour la production en sprints ciblés de deux semaines.',
    },
    painpointPlaceholder: 'Décrivez votre problème...',
    generateTitle: 'Générer le plan de sprint',
    validation: {
      empty: 'Merci de décrire votre problème',
      short: 'Merci d’ajouter davantage de détails sur votre problème',
      long: 'Limitez votre description à 500 caractères',
      emailEmpty: 'Merci d’indiquer votre adresse e-mail',
      emailInvalid: 'Merci d’entrer une adresse e-mail valide',
      missingPainpoint: 'Merci de décrire votre problème avant d’indiquer votre e-mail.',
      submissionFailed: 'Impossible d’enregistrer vos informations. Merci de réessayer.',
      unexpected: 'Erreur inattendue lors de l’envoi de vos informations. Merci de réessayer.',
    },
    emailStep: {
      badge: 'On y est presque',
      heading: 'Où dois-je vous envoyer l’audit détaillé et le plan de mise en œuvre ?',
      capturedLabel: 'Problème bien reçu',
      instructions:
        'Je vais analyser tout cela et vous envoyer un plan détaillé avec chronologie, quick wins et structure du sprint de deux semaines, directement dans votre boîte mail.',
      emailPlaceholder: 'vous@entreprise.com',
      sending: 'Envoi...',
      send: 'Envoyer',
      shareAnother: 'Partager un autre problème',
    },
    emailSubmitted: {
      badge: 'Vérifiez votre boîte mail',
      headingTemplate: 'J’envoie l’audit et le plan de mise en œuvre à {{email}}.',
      reviewingLabel: 'Ce que j’analyse',
      followUp:
        'Vous recevrez une réponse sous un jour ouvré. En attendant, réservez un appel ou consultez les études de cas.',
      buttons: {
        bookCall: 'Réserver un appel de 20 minutes',
        caseStudies: 'Voir les études de cas',
        shareAnother: 'Partager un autre problème',
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

export default function Hero({ calendarLink = 'https://cal.com/vincent-baron/30mins-meeting' }: HeroProps) {
  const [painpoint, setPainpoint] = useState('');
  const [flowState, setFlowState] = useState<FlowState>('input');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedPainpoint, setCapturedPainpoint] = useState('');
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const { language } = useLanguage();
  const copy = HERO_COPY[language];
  const confirmationHeading = copy.emailSubmitted.headingTemplate.replace(
    '{{email}}',
    submittedEmail || copy.emailStep.emailPlaceholder,
  );
  const validateInput = (input: string): string | null => {
    if (!input.trim()) return copy.validation.empty;
    if (input.trim().length < 10) return copy.validation.short;
    if (input.trim().length > 500) return copy.validation.long;
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
    const validationError = validateInput(painpoint);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setEmailError('');
    setSubmissionError('');
    setIsSubmitting(false);
    const trimmed = painpoint.trim();
    setCapturedPainpoint(trimmed);
    setPainpoint('');
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
    if (!capturedPainpoint) {
      setError(copy.validation.missingPainpoint);
      setFlowState('input');
      return;
    }

    const trimmedEmail = email.trim();
    setIsSubmitting(true);

    console.log("Submitting email:", trimmedEmail, "for painpoint:", capturedPainpoint);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: trimmedEmail,
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
    setEmail('');
    setSubmittedEmail('');
    setEmailError('');
    setSubmissionError('');
    setIsSubmitting(false);
  };

  const handleBookCall = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pb-0">
      <div className="max-w-7xl mx-auto w-full pb-0">
        {/* Hero Content with Profile Picture */}
        <div className="grid lg:grid-cols-[250px_1fr] gap-4 sm:gap-6 lg:gap-8 items-center mb-3 sm:mb-4 lg:mb-6">
          {/* Left Side - Profile Picture */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative">
              {/* Decorative gradient background */}
              <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 blur-xl"></div>
              {/* Profile image container */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56">
                <img
                  src="/profilePic.png"
                  alt={language === 'fr' ? 'Vincent Baron — fondateur' : 'Vincent Baron - Founder'}
                  className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
                />
                {/* Decorative ring */}
                <div className="absolute -inset-1 border-2 border-blue-600/30 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Headline and Text */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
              {copy.headline.primary}
              <br />
              <span className="text-gradient">{copy.headline.highlight}</span>
            </h1>

            <div className="mb-2 sm:mb-3 lg:mb-4">
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-2 leading-relaxed">
                {copy.intro.primary}
              </p>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                {copy.intro.secondary}
              </p>
              <div className="mt-3 flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs sm:text-sm font-medium text-gray-700">
                  <span role="img" aria-label="Go">🐹</span> Go
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs sm:text-sm font-medium text-gray-700">
                  <span role="img" aria-label="Python">🐍</span> Python
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs sm:text-sm font-medium text-gray-700">
                  <span role="img" aria-label="n8n">🔁</span> n8n
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs sm:text-sm font-medium text-gray-700">
                  <span role="img" aria-label="LLMs and RAG">🧠</span> LLMs &amp; RAG
                </span>
                
              </div>
            </div>
          </div>
        </div>

        {/* Painpoint to Plan Flow */}
        <div className="mb-2 sm:mb-4 lg:mb-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Input State */}
            {flowState === 'input' && (
              <div className="text-center">
                <form onSubmit={handleSubmit}>
                  <div className="relative max-w-3xl mx-auto">
                    <input
                      type="text"
                      value={painpoint}
                      onChange={(e) => setPainpoint(e.target.value)}
                      placeholder={copy.painpointPlaceholder}
                      className={`w-full rounded-full border-2 px-4 sm:px-6 py-2 sm:py-3 lg:py-4 pr-12 sm:pr-14 text-sm sm:text-base focus:outline-none focus:ring-4 transition-all shadow-lg hover:shadow-xl bg-white ${
                        error 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10'
                      }`}
                    />
                    <button
                      type="submit"
                      disabled={!painpoint.trim()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
                      title={copy.generateTitle}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
                        />
                      </svg>
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-600 text-sm mt-2 animate-fade-in">{error}</p>
                  )}
                </form>
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

                  {capturedPainpoint && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                      <p className="font-semibold text-blue-900 mb-1">{copy.emailStep.capturedLabel}</p>
                      <p className="leading-relaxed">{capturedPainpoint}</p>
                    </div>
                  )}

                  <p className="text-sm text-gray-700">
                    {copy.emailStep.instructions}
                  </p>

                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <div className="relative max-w-lg">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError('');
                          if (submissionError) setSubmissionError('');
                        }}
                        placeholder={copy.emailStep.emailPlaceholder}
                        disabled={isSubmitting}
                        className={`w-full rounded-full border-2 px-4 sm:px-6 py-3 pr-28 text-sm sm:text-base focus:outline-none focus:ring-4 transition-all shadow-lg hover:shadow-xl bg-white ${
                          emailError || submissionError
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10'
                        } ${isSubmitting ? 'opacity-80 cursor-progress' : ''}`}
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? copy.emailStep.sending : copy.emailStep.send}
                      </button>
                    </div>
                    {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
                    {submissionError && !emailError && (
                      <p className="text-red-600 text-sm">{submissionError}</p>
                    )}
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

                  {capturedPainpoint && (
                    <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-sm text-white/90 mb-4">
                      <p className="text-xs uppercase tracking-wide text-white/70 font-semibold mb-2">
                        {copy.emailSubmitted.reviewingLabel}
                      </p>
                      <p className="leading-relaxed">{capturedPainpoint}</p>
                    </div>
                  )}

                  <p className="text-sm text-white/80 mb-6">
                    {copy.emailSubmitted.followUp}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleBookCall}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-blue-600 font-semibold shadow-lg hover:text-blue-700 transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a3 3 0 016 0v2h3a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h3zm2-2a1 1 0 112 0v2h-2V5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6" />
                      </svg>
                      {copy.emailSubmitted.buttons.bookCall}
                    </button>
                    <a
                      href="#work"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white border border-white/40 font-semibold hover:bg-white/20 transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                      {copy.emailSubmitted.buttons.caseStudies}
                    </a>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleRetry}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 5A8.001 8.001 0 004.582 9H9m0 11v-5h-.582" />
                    </svg>
                    {copy.emailSubmitted.buttons.shareAnother}
                  </button>
                </div>
              </div>
            )}

            {/* Testimonials */}
            <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 text-center">
              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 font-medium">{copy.testimonialsTitle}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mx-auto">
                {copy.testimonials.map((testimonial) => (
                  <div
                    key={testimonial.author}
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-left"
                  >
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{testimonial.quote}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.alt[language]}
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover border border-white shadow"
                      />
                      <div className="text-left">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">{testimonial.author}</p>
                        <p className="text-[11px] sm:text-xs text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Stats and Companies Section */}
            <div className="mt-2 sm:mt-4 lg:mt-6 flex flex-col lg:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-8 xl:gap-12">
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 items-center">
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
              <p className="text-sm text-gray-600 font-medium mb-4">{copy.companiesTitle}</p>
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
        </div>
      </div>

      {/* Calendly Modal */}
      <CalendlyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        painpoint={capturedPainpoint || painpoint}
        calendarLink={calendarLink}
      />
    </section>
  );
}
