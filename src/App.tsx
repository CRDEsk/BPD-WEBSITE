import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { HeaderLogoInstitutional } from './components/HeaderLogoInstitutional';
import { FooterLogoInstitutional } from './components/FooterLogoInstitutional';
import { InstitutionalGlyph } from './components/InstitutionalGlyphs';
import { WatermarkShield } from './components/WatermarkShield';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useLanguage } from './contexts/LanguageContext';
import { PDFIndex } from './pages/PDFIndex';
import { NotFound } from './pages/NotFound';
import { ThankYou } from './pages/ThankYou';

// Lazy load PDF pages for code splitting
const PolitiqueGestionCrise = lazy(() => import('./pages/PolitiqueGestionCrise').then(m => ({ default: m.PolitiqueGestionCrise })));
const AccordConfidentialite = lazy(() => import('./pages/AccordConfidentialite').then(m => ({ default: m.AccordConfidentialite })));
const MandatIntervention = lazy(() => import('./pages/MandatIntervention').then(m => ({ default: m.MandatIntervention })));
const LettreMission = lazy(() => import('./pages/LettreMission').then(m => ({ default: m.LettreMission })));
const ConsentementTraitement = lazy(() => import('./pages/ConsentementTraitement').then(m => ({ default: m.ConsentementTraitement })));

const HomePage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    contactMethod: 'email',
    email: '',
    exposure: 'bas',
    message: '',
    honeypot: '', // Spam protection
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = language === 'fr' ? 'Le nom est requis' : 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = language === 'fr' ? 'Le nom doit contenir au moins 2 caractères' : 'Name must be at least 2 characters';
    }

    // Email validation if contact method is email
    if (formData.contactMethod === 'email') {
      if (!formData.email.trim()) {
        errors.email = language === 'fr' ? 'L\'email est requis' : 'Email is required';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
          errors.email = language === 'fr' ? 'Format d\'email invalide' : 'Invalid email format';
        }
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = language === 'fr' ? 'Le message est requis' : 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = language === 'fr' ? 'Le message doit contenir au moins 10 caractères' : 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 2000) {
      errors.message = language === 'fr' ? 'Le message ne doit pas dépasser 2000 caractères' : 'Message must not exceed 2000 characters';
    }

    // Honeypot check (should be empty)
    if (formData.honeypot) {
      // Bot detected, silently fail
      console.warn('Honeypot field filled - potential bot');
      return false;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setValidationErrors({});

    try {
      // Updated Formspree endpoint
      const response = await fetch('https://formspree.io/f/mwpgqqlv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          contactMethod: formData.contactMethod,
          email: formData.contactMethod === 'email' ? formData.email.trim() : undefined,
          exposure: formData.exposure,
          message: formData.message.trim(),
          _subject: `Nouvelle demande BPD - ${formData.exposure.toUpperCase()}`,
        }),
      });

      if (response.ok) {
        // Redirect to thank you page
        navigate('/merci', { replace: true });
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section - Ultra Institutional Dense - Tighter Spacing */}
      <section className="relative pt-16 sm:pt-20 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 bg-bpd-paper overflow-hidden border-b-2 border-[#D0CAC4]">
        <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center pointer-events-none">
          <WatermarkShield />
        </div>
        <div className="relative container mx-auto max-w-5xl">
          <div className="space-y-3 sm:space-y-4 text-left">
            <div className="subtitle-institutional text-[8px] sm:text-[9px] text-bpd-grey font-semibold mb-2 sm:mb-3">
              {t('hero.subtitle')}
            </div>
            <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold text-bpd-ink leading-[1.3] tracking-tight max-w-4xl title-border-left">
              {t('hero.title')}
            </h1>
            <p className="text-[13px] sm:text-[14px] text-bpd-ink/90 leading-[1.4] max-w-3xl mt-1.5 sm:mt-2 font-medium">
              {t('hero.mandat')}
            </p>
            <p className="text-[16px] sm:text-[17px] lg:text-[18px] font-medium text-bpd-ink/90 leading-[1.4] max-w-3xl mt-1.5 sm:mt-2 uppercase tracking-[0.05em]">
              {t('hero.subtitle2')}
            </p>
            <div className="space-y-2 text-[14px] sm:text-[15px] text-bpd-ink/80 leading-[1.5] max-w-3xl mt-3 sm:mt-4">
              <p>
                {t('hero.description')}
              </p>
              <p className="text-[12px] sm:text-[13px] text-bpd-grey italic mt-2 sm:mt-2.5">
                {t('hero.note')}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mt-4 sm:mt-4.5">
              <a
                href="#contact"
                className="px-4 sm:px-5 py-2.5 min-h-[44px] flex items-center justify-center bg-bpd-red text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] hover:bg-bpd-red-soft active:bg-bpd-red active:scale-[0.98] transition-all duration-200 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Dossier confidentiel"
              >
                {t('hero.cta1')}
              </a>
              <span className="text-bpd-grey text-xs hidden sm:inline">|</span>
              <a
                href="#contact"
                className="px-4 sm:px-5 py-2.5 min-h-[44px] flex items-center justify-center bg-transparent border-2 border-bpd-red text-bpd-red text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] hover:bg-bpd-red hover:text-white hover:border-bpd-red active:bg-bpd-red-soft active:scale-[0.98] transition-all duration-200 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Contact sécurisé"
              >
                {t('hero.cta2')}
              </a>
            </div>
            <p className="text-[9px] sm:text-[10px] text-bpd-grey mt-3 sm:mt-3.5 tracking-[0.05em] leading-relaxed">
              {t('hero.micro')}
            </p>
          </div>
        </div>
      </section>

      {/* À qui s'adresse le BPD - Ultra Institutional Dense - Tighter */}
      <section id="qui" className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-white border-t-2 border-[#D0CAC4]">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold text-bpd-ink leading-[1.35] mb-2 sm:mb-3 title-border-left">
              {t('who.title')}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-bpd-ink/80 leading-[1.5] max-w-4xl">
              {t('who.intro')}
            </p>
          </div>
          <div className="space-y-6 sm:space-y-8">
            {[
              {
                glyph: 'creators' as const,
                title: t('who.creators.title'),
                desc: t('who.creators.desc'),
              },
              {
                glyph: 'entrepreneurs' as const,
                title: t('who.entrepreneurs.title'),
                desc: t('who.entrepreneurs.desc'),
              },
              {
                glyph: 'families' as const,
                title: t('who.families.title'),
                desc: t('who.families.desc'),
              },
              {
                glyph: 'professionals' as const,
                title: t('who.professionals.title'),
                desc: t('who.professionals.desc'),
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-3 sm:gap-4 lg:gap-5 items-start pb-5 sm:pb-6 border-b border-[#D0CAC4] last:border-0">
                <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                  <InstitutionalGlyph type={item.glyph} className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[18px] sm:text-[19px] lg:text-[20px] font-semibold text-bpd-ink mb-1.5 sm:mb-2 title-border-left">{item.title}</h3>
                  <p className="text-[14px] sm:text-[15px] text-bpd-ink/80 leading-[1.5]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problèmes que l'on résout - Ultra Institutional Dense - Tighter */}
      <section id="problemes" className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-bpd-paper border-t-2 border-[#D0CAC4]">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-5 sm:space-y-6">
            <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold text-bpd-ink leading-[1.35] max-w-4xl title-border-left">
              {t('problems.title')}
            </h2>
            <div className="space-y-3 sm:space-y-4 text-[14px] sm:text-[15px] text-bpd-ink/80 leading-[1.5] max-w-4xl">
              <p>
                {t('problems.p1')}
              </p>
              <p>
                {t('problems.p2')}
              </p>
              <p>
                {t('problems.p3')}
              </p>
              <p className="font-semibold text-bpd-red">
                {t('problems.p4')}
              </p>
            </div>
            <div className="pt-5 sm:pt-6 border-t-2 border-[#D0CAC4]">
              <h3 className="text-[16px] sm:text-[17px] font-semibold text-bpd-ink mb-3 sm:mb-4 uppercase tracking-[0.05em]">
                {t('problems.actions.title')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  t('problems.actions.1'),
                  t('problems.actions.2'),
                  t('problems.actions.3'),
                  t('problems.actions.4'),
                ].map((point, index) => (
                  <div key={index} className="flex items-start">
                    <p className="text-[14px] sm:text-[15px] text-bpd-ink/80 leading-[1.5]">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos services - Ultra Institutional Dense - Tighter */}
      <section id="services" className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-white border-t-2 border-[#D0CAC4]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold text-bpd-ink leading-[1.35] mb-6 sm:mb-8 title-border-left">
            {t('services.title')}
          </h2>
          <div className="space-y-8 sm:space-y-10">
            {[
              {
                title: t('services.crisis.title'),
                subtitle: t('services.crisis.subtitle'),
                points: [
                  t('services.crisis.1'),
                  t('services.crisis.2'),
                  t('services.crisis.3'),
                  t('services.crisis.4'),
                ],
              },
              {
                title: t('services.cleanup.title'),
                subtitle: t('services.cleanup.subtitle'),
                points: [
                  t('services.cleanup.1'),
                  t('services.cleanup.2'),
                  t('services.cleanup.3'),
                  t('services.cleanup.4'),
                ],
              },
              {
                title: t('services.monitoring.title'),
                subtitle: t('services.monitoring.subtitle'),
                points: [
                  t('services.monitoring.1'),
                  t('services.monitoring.2'),
                  t('services.monitoring.3'),
                  t('services.monitoring.4'),
                ],
              },
              {
                title: t('services.confidential.title'),
                subtitle: t('services.confidential.subtitle'),
                points: [
                  t('services.confidential.1'),
                  t('services.confidential.2'),
                  t('services.confidential.3'),
                  t('services.confidential.4'),
                ],
              },
            ].map((service, index) => (
              <div key={index} className="pb-6 sm:pb-8 border-b border-[#D0CAC4] last:border-0 last:pb-0">
                <h3 className="text-[18px] sm:text-[19px] lg:text-[20px] font-semibold text-bpd-ink mb-1.5 sm:mb-2 title-border-left">{service.title}</h3>
                <p className="text-[14px] sm:text-[15px] text-bpd-ink/80 mb-3 sm:mb-4 leading-[1.5]">{service.subtitle}</p>
                <div className="space-y-1.5 sm:space-y-2">
                  {service.points.map((point, pIndex) => (
                    <p key={pIndex} className="text-[14px] sm:text-[15px] text-bpd-ink/80 leading-[1.5]">{point}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche - Ultra Institutional Dense - Tighter */}
      <section id="process" className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-bpd-paper border-t-2 border-[#D0CAC4]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold text-bpd-ink leading-[1.35] mb-6 sm:mb-8 title-border-left">
            {t('process.title')}
          </h2>
          <div className="space-y-5 sm:space-y-6">
            {[
              {
                step: '1',
                title: t('process.step1.title'),
                desc: t('process.step1.desc'),
                points: null,
              },
              {
                step: '2',
                title: t('process.step2.title'),
                desc: t('process.step2.desc'),
                points: [
                  t('process.step2.points.1'),
                  t('process.step2.points.2'),
                  t('process.step2.points.3'),
                  t('process.step2.points.4'),
                ],
                note: t('process.step2.note'),
              },
              {
                step: '3',
                title: t('process.step3.title'),
                desc: t('process.step3.desc'),
                points: [
                  t('process.step3.points.1'),
                  t('process.step3.points.2'),
                  t('process.step3.points.3'),
                  t('process.step3.points.4'),
                ],
                note: t('process.step3.note'),
              },
              {
                step: '4',
                title: t('process.step4.title'),
                desc: t('process.step4.desc'),
                points: [
                  t('process.step4.points.1'),
                  t('process.step4.points.2'),
                  t('process.step4.points.3'),
                ],
                note: t('process.step4.note'),
              },
              {
                step: '5',
                title: t('process.step5.title'),
                desc: t('process.step5.desc'),
                points: [
                  t('process.step5.points.1'),
                  t('process.step5.points.2'),
                  t('process.step5.points.3'),
                  t('process.step5.points.4'),
                ],
                note: null,
              },
              {
                step: '6',
                title: t('process.step6.title'),
                desc: t('process.step6.desc'),
                points: [
                  t('process.step6.points.1'),
                  t('process.step6.points.2'),
                  t('process.step6.points.3'),
                ],
                note: null,
              },
            ].map((item, index) => (
              <div key={index} className="flex gap-3 sm:gap-4 lg:gap-5 items-start pb-5 sm:pb-6 border-b border-[#D0CAC4] last:border-0 last:pb-0">
                <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 border-2 border-bpd-ink text-bpd-ink flex items-center justify-center text-sm sm:text-base font-bold min-w-[32px] sm:min-w-[36px]" style={{ fontFamily: 'monospace' }}>
                  {item.step}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[18px] sm:text-[19px] lg:text-[20px] font-semibold text-bpd-ink mb-1.5 sm:mb-2 title-border-left">{item.title}</h3>
                  <p className="text-[14px] sm:text-[15px] text-bpd-ink/80 leading-[1.5] mb-2">{item.desc}</p>
                  {item.points && (
                    <div className="space-y-1 mb-2">
                      {item.points.map((point, pIndex) => (
                        <p key={pIndex} className="text-[14px] sm:text-[15px] text-bpd-ink/80 leading-[1.5]">{point}</p>
                      ))}
                    </div>
                  )}
                  {item.note && (
                    <p className="text-[13px] sm:text-[14px] text-bpd-grey italic leading-[1.5] mt-2">{item.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi nous faire confiance - Ultra Institutional Dense - Tighter */}
      <section id="confiance" className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-white border-t-2 border-[#D0CAC4]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold text-bpd-ink leading-[1.35] mb-6 sm:mb-8 title-border-left">
            {t('trust.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {[
              {
                title: t('trust.expertise.title'),
                desc: t('trust.expertise.desc'),
              },
              {
                title: t('trust.positioning.title'),
                desc: t('trust.positioning.desc'),
              },
              {
                title: t('trust.confidentiality.title'),
                desc: t('trust.confidentiality.desc'),
              },
              {
                title: t('trust.custom.title'),
                desc: t('trust.custom.desc'),
              },
            ].map((item, index) => (
              <div key={index} className="pb-5 sm:pb-6 border-b border-[#D0CAC4] last:border-0">
                <h3 className="text-[18px] sm:text-[19px] lg:text-[20px] font-semibold text-bpd-ink mb-1.5 sm:mb-2 title-border-left">{item.title}</h3>
                <p className="text-[14px] sm:text-[15px] text-bpd-ink/80 leading-[1.5]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure technique - Ultra Institutional - Tighter */}
      <section className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-bpd-paper border-t-2 border-[#D0CAC4]">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-[18px] sm:text-[19px] lg:text-[20px] font-semibold text-bpd-ink title-border-left">{t('infra.title')}</h3>
            <p className="text-[14px] sm:text-[15px] text-bpd-ink/80 leading-[1.5] max-w-3xl">
              <span className="font-semibold">{t('infra.cell')}</span>
            </p>
            <p className="text-[13px] sm:text-[14px] text-bpd-grey leading-[1.5] max-w-3xl">
              {t('infra.p1')}
            </p>
            <p className="text-[13px] sm:text-[14px] text-bpd-grey leading-[1.5] max-w-3xl">
              {t('infra.p2')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact - Ultra Institutional - Tighter */}
      <section id="contact" className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-white border-t-2 border-[#D0CAC4]">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-5 sm:mb-6">
            <h2 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold text-bpd-ink leading-[1.35] mb-2 sm:mb-3 title-border-left">
              {t('contact.title')}
            </h2>
            <div className="space-y-2 text-[14px] sm:text-[15px] text-bpd-ink/80 leading-[1.5] max-w-2xl">
              <p>
                {t('contact.p1')}
              </p>
              <p>
                {t('contact.p2')}
              </p>
              <p>
                {t('contact.p3')}
              </p>
            </div>
          </div>
          {submitStatus === 'error' && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500">
              <p className="text-[13px] sm:text-[14px] text-red-800 font-medium">
                {t('contact.error')}
              </p>
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-4 p-4 sm:p-5 lg:p-6 bg-bpd-paper border border-[#E0DAD4]"
            aria-label="Formulaire de contact"
          >
            {/* Honeypot field - hidden from users */}
            <input
              type="text"
              name="website"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div>
              <label htmlFor="name" className="block text-[11px] sm:text-[12px] font-semibold text-bpd-ink uppercase tracking-[0.1em] mb-1.5">
                {t('contact.name.label')}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (validationErrors.name) {
                    setValidationErrors({ ...validationErrors, name: '' });
                  }
                }}
                className={`w-full px-3 py-2.5 min-h-[44px] text-[14px] sm:text-[15px] border ${
                  validationErrors.name ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:border-bpd-red bg-white`}
                required
                aria-required="true"
                aria-invalid={!!validationErrors.name}
                aria-describedby={validationErrors.name ? 'name-error' : undefined}
              />
              {validationErrors.name && (
                <p id="name-error" className="mt-1 text-[12px] text-red-600" role="alert">
                  {validationErrors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contactMethod" className="block text-[11px] sm:text-[12px] font-semibold text-bpd-ink uppercase tracking-[0.1em] mb-1.5">
                {t('contact.method.label')}
              </label>
              <select
                id="contactMethod"
                value={formData.contactMethod}
                onChange={(e) => {
                  setFormData({ ...formData, contactMethod: e.target.value, email: '' });
                  setValidationErrors({ ...validationErrors, email: '' });
                }}
                className="w-full px-3 py-2.5 min-h-[44px] text-[14px] sm:text-[15px] border border-gray-300 focus:outline-none focus:border-bpd-red bg-white"
                aria-label={t('contact.method.label')}
              >
                <option value="email">{t('contact.method.email')}</option>
                <option value="whatsapp">{t('contact.method.whatsapp')}</option>
              </select>
            </div>
            {formData.contactMethod === 'email' && (
              <div>
                <label htmlFor="email" className="block text-[11px] sm:text-[12px] font-semibold text-bpd-ink uppercase tracking-[0.1em] mb-1.5">
                  {language === 'fr' ? 'Email' : 'Email'}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (validationErrors.email) {
                      setValidationErrors({ ...validationErrors, email: '' });
                    }
                  }}
                  className={`w-full px-3 py-2.5 min-h-[44px] text-[14px] sm:text-[15px] border ${
                    validationErrors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:border-bpd-red bg-white`}
                  required={formData.contactMethod === 'email'}
                  aria-required={formData.contactMethod === 'email'}
                  aria-invalid={!!validationErrors.email}
                  aria-describedby={validationErrors.email ? 'email-error' : undefined}
                />
                {validationErrors.email && (
                  <p id="email-error" className="mt-1 text-[12px] text-red-600" role="alert">
                    {validationErrors.email}
                  </p>
                )}
              </div>
            )}
            <div>
              <label htmlFor="exposure" className="block text-[11px] sm:text-[12px] font-semibold text-bpd-ink uppercase tracking-[0.1em] mb-1.5">
                {t('contact.exposure.label')}
              </label>
              <select
                id="exposure"
                value={formData.exposure}
                onChange={(e) => setFormData({ ...formData, exposure: e.target.value })}
                className="w-full px-3 py-2.5 min-h-[44px] text-[14px] sm:text-[15px] border border-gray-300 focus:outline-none focus:border-bpd-red bg-white"
                aria-label={t('contact.exposure.label')}
              >
                <option value="bas">{t('contact.exposure.bas')}</option>
                <option value="sensible">{t('contact.exposure.sensible')}</option>
                <option value="critique">{t('contact.exposure.critique')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-[11px] sm:text-[12px] font-semibold text-bpd-ink uppercase tracking-[0.1em] mb-1.5">
                {t('contact.message.label')}
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (validationErrors.message) {
                    setValidationErrors({ ...validationErrors, message: '' });
                  }
                }}
                rows={5}
                className={`w-full px-3 py-2.5 text-[14px] sm:text-[15px] border ${
                  validationErrors.message ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:border-bpd-red bg-white resize-none min-h-[120px]`}
                required
                aria-required="true"
                aria-invalid={!!validationErrors.message}
                aria-describedby={validationErrors.message ? 'message-error' : 'message-counter'}
                maxLength={2000}
              />
              <div className="flex justify-between items-center mt-1">
                {validationErrors.message ? (
                  <p id="message-error" className="text-[12px] text-red-600" role="alert">
                    {validationErrors.message}
                  </p>
                ) : (
                  <span id="message-counter" className="text-[11px] text-bpd-grey">
                    {formData.message.length} / 2000 {language === 'fr' ? 'caractères' : 'characters'}
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-5 py-3 min-h-[44px] flex items-center justify-center bg-bpd-red text-white text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.1em] hover:bg-bpd-red-soft active:bg-bpd-red active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
              aria-label={t('contact.submit')}
            >
              {isSubmitting ? t('contact.submitting') : t('contact.submit')}
            </button>
            <div className="bg-bpd-red/5 border-l-3 border-bpd-red pl-3 py-2">
              <p className="text-[10px] sm:text-[11px] font-medium text-bpd-ink/80 leading-relaxed">
                {t('contact.privacy')}
              </p>
            </div>
            <p className="text-[10px] sm:text-[11px] text-bpd-grey text-center leading-relaxed">
              {t('contact.final')}
            </p>
          </form>
        </div>
      </section>

    </>
  );
};

const MentionsLegales = () => (
  <main className="pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 bg-bpd-paper min-h-screen">
    <div className="container mx-auto max-w-7xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold text-bpd-ink leading-[1.35] title-border-left">
          Mentions légales
        </h1>
        <p className="text-[11px] sm:text-[12px] text-bpd-grey uppercase tracking-[0.05em] mt-1">
          Legal Notice
        </p>
      </div>
      
      {/* Bilingual Layout - French Left, English Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {/* French Column */}
        <section className="bg-white p-6 sm:p-8 border border-[#E0DAD4] space-y-5 sm:space-y-6 text-bpd-ink/80 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-bpd-ink mb-3 border-b border-gray-300 pb-2">
              Français
            </h2>
          </div>
          <div>
            <p className="mb-4">
              Le présent site est édité par le Bureau de Protection Digitale (BPD), unité privée spécialisée dans la protection de l'identité numérique et la gestion d'incidents d'exposition.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Entité opératrice</h3>
            <div className="space-y-1">
              <p className="font-medium text-bpd-ink">Aoufi Ventures LLC — Société de droit américain (Wyoming, USA)</p>
              <p>Siège administratif : 30 N Gould St Ste R, Sheridan, WY 82801</p>
              <p>Email opérationnel : <a href="mailto:contact@bureauprotectiondigitale.fr" className="text-bpd-red hover:underline">contact@bureauprotectiondigitale.fr</a></p>
              <p>Représentation : Direction opérationnelle du BPD</p>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Hébergement</h3>
            <p className="mb-2">
              L'hébergement du site est assuré par un prestataire international offrant un haut niveau de résilience et de confidentialité.
            </p>
            <p>
              Les informations complémentaires peuvent être fournies sur demande.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Responsabilité</h3>
            <p className="mb-2">
              Les contenus du site ont un caractère strictement informatif.
            </p>
            <p className="mb-2">
              Ils ne constituent ni un conseil juridique, ni une offre contractuelle engageante.
            </p>
            <p>
              Le BPD ne saurait être tenu responsable d'erreurs, d'omissions ou d'une indisponibilité ponctuelle.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Propriété intellectuelle</h3>
            <p>
              Toute reproduction, extraction ou diffusion non autorisée est strictement interdite.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Droit applicable & juridiction compétente</h3>
            <p className="mb-2">
              Les informations sont régies par le droit applicable à l'entité opératrice.
            </p>
            <p>
              Tout différend relève des juridictions compétentes du ressort concerné.
            </p>
          </div>
          <div className="pt-4 border-t border-gray-200 mt-6">
            <p className="text-xs text-bpd-gray/60">
              Dernière mise à jour : 2025
            </p>
          </div>
        </section>

        {/* English Column */}
        <section className="bg-white p-6 sm:p-8 border border-[#E0DAD4] space-y-5 sm:space-y-6 text-bpd-ink/80 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-bpd-ink mb-3 border-b border-gray-300 pb-2">
              English
            </h2>
          </div>
          <div>
            <p className="mb-4">
              This website is published by the Bureau de Protection Digitale (BPD), a private unit specialized in digital identity protection and exposure incident management.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Operating Entity</h3>
            <div className="space-y-1">
              <p className="font-medium text-bpd-ink">Aoufi Ventures LLC — American law company (Wyoming, USA)</p>
              <p>Administrative headquarters: 30 N Gould St Ste R, Sheridan, WY 82801</p>
              <p>Operational email: <a href="mailto:contact@bureauprotectiondigitale.fr" className="text-bpd-red hover:underline">contact@bureauprotectiondigitale.fr</a></p>
              <p>Representation: BPD operational management</p>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Hosting</h3>
            <p className="mb-2">
              The website is hosted by an international provider offering a high level of resilience and confidentiality.
            </p>
            <p>
              Additional information may be provided upon request.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Liability</h3>
            <p className="mb-2">
              The website content is strictly informational.
            </p>
            <p className="mb-2">
              It does not constitute legal advice or a binding contractual offer.
            </p>
            <p>
              The BPD cannot be held responsible for errors, omissions, or temporary unavailability.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Intellectual Property</h3>
            <p>
              Any unauthorized reproduction, extraction, or distribution is strictly prohibited.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Applicable Law & Competent Jurisdiction</h3>
            <p className="mb-2">
              The information is governed by the law applicable to the operating entity.
            </p>
            <p>
              Any dispute falls under the competent jurisdictions of the relevant jurisdiction.
            </p>
          </div>
          <div className="pt-4 border-t border-gray-200 mt-6">
            <p className="text-xs text-bpd-gray/60">
              Last updated: 2025
            </p>
          </div>
        </section>
      </div>
    </div>
  </main>
);

const PolitiqueConfidentialite = () => (
  <main className="pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 bg-bpd-paper min-h-screen">
    <div className="container mx-auto max-w-7xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold text-bpd-ink leading-[1.35] title-border-left">
          Politique de confidentialité
        </h1>
        <p className="text-[11px] sm:text-[12px] text-bpd-grey uppercase tracking-[0.05em] mt-1">
          Privacy Policy
        </p>
      </div>
      
      {/* Bilingual Layout - French Left, English Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {/* French Column */}
        <section className="bg-white p-6 sm:p-8 border border-[#E0DAD4] space-y-5 sm:space-y-6 text-bpd-ink/80 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-bpd-ink mb-3 border-b border-gray-300 pb-2">
              Français
            </h2>
          </div>
          <div>
            <p className="mb-4">
              Le BPD traite uniquement les données strictement nécessaires à l'analyse et à la gestion des demandes qui lui sont adressées.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Données collectées</h3>
            <div className="space-y-1">
              <p>— Identité ou pseudonyme</p>
              <p>— Coordonnées de contact</p>
              <p>— Niveau d'urgence</p>
              <p>— Description des éléments numériques en cause</p>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Finalités du traitement</h3>
            <div className="space-y-1">
              <p>— Évaluation de la recevabilité d'un dossier</p>
              <p>— Élaboration d'un protocole d'intervention</p>
              <p>— Exécution de la mission, le cas échéant</p>
              <p>— Respect des obligations légales ou réglementaires applicables</p>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Base légale</h3>
            <p className="mb-2">
              Les traitements reposent sur :
            </p>
            <div className="space-y-1">
              <p>— l'exécution de mesures précontractuelles,</p>
              <p>— l'intérêt légitime à sécuriser les opérations et la traçabilité.</p>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Confidentialité</h3>
            <p className="mb-2">
              L'accès aux dossiers est strictement limité aux personnes habilitées.
            </p>
            <p>
              Aucune donnée n'est vendue, transférée ou utilisée à des fins publicitaires.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Transferts internationaux</h3>
            <p>
              Certaines infrastructures étant situées hors UE, des transferts peuvent être réalisés dans un cadre sécurisé et contrôlé.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Durée de conservation</h3>
            <p>
              Les données sont conservées uniquement pour la durée nécessaire au traitement du dossier et aux obligations associées.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Exercice des droits</h3>
            <p>
              Toute demande relative à vos données peut être adressée à :
            </p>
            <p>
              <a href="mailto:privacy@bureauprotectiondigitale.fr" className="text-bpd-red hover:underline">privacy@bureauprotectiondigitale.fr</a>
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Sécurité des communications</h3>
            <p className="mb-2">
              Les échanges s'effectuent exclusivement via des canaux sécurisés.
            </p>
            <p>
              Le BPD peut refuser tout échange transmis par un canal non protégé.
            </p>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-bpd-gray/60">
              Dernière mise à jour : 2025
            </p>
          </div>
        </section>

        {/* English Column */}
        <section className="bg-white p-6 sm:p-8 border border-[#E0DAD4] space-y-5 sm:space-y-6 text-bpd-ink/80 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-bpd-ink mb-3 border-b border-gray-300 pb-2">
              English
            </h2>
          </div>
          <div>
            <p className="mb-4">
              The BPD processes only data strictly necessary for the analysis and management of requests addressed to it.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Data Collected</h3>
            <div className="space-y-1">
              <p>— Identity or pseudonym</p>
              <p>— Contact information</p>
              <p>— Level of urgency</p>
              <p>— Description of digital elements in question</p>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Processing Purposes</h3>
            <div className="space-y-1">
              <p>— Assessment of file admissibility</p>
              <p>— Development of an intervention protocol</p>
              <p>— Execution of the mission, if applicable</p>
              <p>— Compliance with applicable legal or regulatory obligations</p>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Legal Basis</h3>
            <p className="mb-2">
              Processing is based on:
            </p>
            <div className="space-y-1">
              <p>— execution of pre-contractual measures,</p>
              <p>— legitimate interest in securing operations and traceability.</p>
            </div>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Confidentiality</h3>
            <p className="mb-2">
              Access to files is strictly limited to authorized persons.
            </p>
            <p>
              No data is sold, transferred, or used for advertising purposes.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">International Transfers</h3>
            <p>
              As some infrastructures are located outside the EU, transfers may be carried out in a secure and controlled framework.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Retention Period</h3>
            <p>
              Data is retained only for the duration necessary for file processing and associated obligations.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Exercise of Rights</h3>
            <p>
              Any request regarding your data may be addressed to:
            </p>
            <p>
              <a href="mailto:privacy@bureauprotectiondigitale.fr" className="text-bpd-red hover:underline">privacy@bureauprotectiondigitale.fr</a>
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Communication Security</h3>
            <p className="mb-2">
              Exchanges are conducted exclusively via secure channels.
            </p>
            <p>
              The BPD may refuse any exchange transmitted through an unprotected channel.
            </p>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-bpd-gray/60">
              Last updated: 2025
            </p>
          </div>
        </section>
      </div>
    </div>
  </main>
);

const ConditionsIntervention = () => (
  <main className="pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 bg-bpd-paper min-h-screen">
    <div className="container mx-auto max-w-7xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold text-bpd-ink leading-[1.35] title-border-left">
          Conditions d'intervention
        </h1>
        <p className="text-[11px] sm:text-[12px] text-bpd-grey uppercase tracking-[0.05em] mt-1">
          Terms of Intervention
        </p>
      </div>
      
      {/* Bilingual Layout - French Left, English Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {/* French Column */}
        <section className="bg-white p-6 sm:p-8 border border-[#E0DAD4] space-y-5 sm:space-y-6 text-bpd-ink/80 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-bpd-ink mb-3 border-b border-gray-300 pb-2">
              Français
            </h2>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Évaluation préalable</h3>
            <p className="mb-2">
              Chaque demande fait l'objet d'une analyse de recevabilité (nature des contenus, juridictions concernées, risques associés).
            </p>
            <p>
              Le BPD peut refuser tout dossier ne relevant pas de son périmètre ou de ses exigences.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Obligation de moyens</h3>
            <p className="mb-2">
              Le BPD agit selon une obligation de moyens : mobilisation de procédures spécialisées, démarches administratives, actions techniques et réseau international.
            </p>
            <p>
              Aucune suppression n'est garantie dans toutes les juridictions.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Cadre légal</h3>
            <p className="mb-2">
              Les interventions sont menées conformément aux législations applicables et aux procédures prévues par les plateformes, hébergeurs et entités administratives.
            </p>
            <p>
              Le BPD n'intervient pas pour masquer, couvrir ou dissimuler une infraction.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Coopération du demandeur</h3>
            <p className="mb-2">
              Une coopération minimale est nécessaire.
            </p>
            <p>
              Toute information inexacte ou omise peut entraîner la suspension ou l'arrêt de la mission.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Conditions financières</h3>
            <p className="mb-2">
              Toute intervention fait l'objet d'une proposition préalable.
            </p>
            <p>
              Aucune action n'est engagée sans validation explicite.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Limitation de responsabilité</h3>
            <p className="mb-2">
              Les plateformes, hébergeurs et autorités restent décisionnaires de leurs politiques de retrait.
            </p>
            <p>
              Le BPD ne peut être tenu responsable des conséquences indirectes liées à la situation initiale ou aux décisions de tiers.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Avertissement important</h3>
            <p className="mb-2">
              Les opérations du BPD ne remplacent pas les voies judiciaires ni les démarches auprès des autorités compétentes.
            </p>
            <p>
              Aucune intervention ne constitue une garantie de résultat.
            </p>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-bpd-gray/60">
              Dernière mise à jour : 2025
            </p>
          </div>
        </section>

        {/* English Column */}
        <section className="bg-white p-6 sm:p-8 border border-[#E0DAD4] space-y-5 sm:space-y-6 text-bpd-ink/80 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-bpd-ink mb-3 border-b border-gray-300 pb-2">
              English
            </h2>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Prior Assessment</h3>
            <p className="mb-2">
              Each request is subject to an admissibility analysis (nature of content, jurisdictions concerned, associated risks).
            </p>
            <p>
              The BPD may refuse any file that does not fall within its scope or requirements.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Obligation of Means</h3>
            <p className="mb-2">
              The BPD acts according to an obligation of means: mobilization of specialized procedures, administrative steps, technical actions, and international network.
            </p>
            <p>
              No removal is guaranteed in all jurisdictions.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Legal Framework</h3>
            <p className="mb-2">
              Interventions are conducted in accordance with applicable legislation and procedures provided by platforms, hosting providers, and administrative entities.
            </p>
            <p>
              The BPD does not intervene to mask, cover, or conceal an offense.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Requester Cooperation</h3>
            <p className="mb-2">
              Minimal cooperation is necessary.
            </p>
            <p>
              Any inaccurate or omitted information may result in suspension or termination of the mission.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Financial Conditions</h3>
            <p className="mb-2">
              Any intervention is subject to a prior proposal.
            </p>
            <p>
              No action is undertaken without explicit validation.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Limitation of Liability</h3>
            <p className="mb-2">
              Platforms, hosting providers, and authorities remain decision-makers of their removal policies.
            </p>
            <p>
              The BPD cannot be held responsible for indirect consequences related to the initial situation or third-party decisions.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">Important Notice</h3>
            <p className="mb-2">
              BPD operations do not replace judicial proceedings or steps taken with competent authorities.
            </p>
            <p>
              No intervention constitutes a guarantee of result.
            </p>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-bpd-gray/60">
              Last updated: 2025
            </p>
          </div>
        </section>
      </div>
    </div>
  </main>
);

const PolitiqueCookies = () => (
  <main className="pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 bg-bpd-paper min-h-screen">
    <div className="container mx-auto max-w-7xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold text-bpd-ink leading-[1.35] title-border-left">
          Politique Cookies
        </h1>
        <p className="text-[11px] sm:text-[12px] text-bpd-grey uppercase tracking-[0.05em] mt-1">
          Cookie Policy
        </p>
      </div>
      
      {/* Bilingual Layout - French Left, English Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {/* French Column */}
        <section className="bg-white p-6 sm:p-8 border border-[#E0DAD4] space-y-5 sm:space-y-6 text-bpd-ink/80 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-bpd-ink mb-3 border-b border-gray-300 pb-2">
              Français
            </h2>
          </div>
          <div>
            <p className="mb-4">
              Le site utilise uniquement des cookies strictement nécessaires à son fonctionnement :
            </p>
            <div className="space-y-1">
              <p>— gestion de session,</p>
              <p>— sécurité,</p>
              <p>— affichage des contenus.</p>
            </div>
          </div>
          <div>
            <p className="mb-2">
              Aucun cookie publicitaire ni de suivi comportemental n'est utilisé.
            </p>
            <p>
              Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies techniques, en sachant que certaines fonctionnalités du site pourraient être affectées.
            </p>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-bpd-gray/60">
              Dernière mise à jour : 2025
            </p>
          </div>
        </section>

        {/* English Column */}
        <section className="bg-white p-6 sm:p-8 border border-[#E0DAD4] space-y-5 sm:space-y-6 text-bpd-ink/80 leading-relaxed text-sm sm:text-base">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-bpd-ink mb-3 border-b border-gray-300 pb-2">
              English
            </h2>
          </div>
          <div>
            <p className="mb-4">
              The website uses only cookies strictly necessary for its operation:
            </p>
            <div className="space-y-1">
              <p>— session management,</p>
              <p>— security,</p>
              <p>— content display.</p>
            </div>
          </div>
          <div>
            <p className="mb-2">
              No advertising cookies or behavioral tracking are used.
            </p>
            <p>
              You can configure your browser to accept or refuse technical cookies, knowing that some website features may be affected.
            </p>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-bpd-gray/60">
              Last updated: 2025
            </p>
          </div>
        </section>
      </div>
    </div>
  </main>
);

// Loading fallback for PDF pages
const PDFLoadingFallback = () => (
  <main className="pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 bg-bpd-paper min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-pulse mb-4">
        <div className="w-16 h-16 border-4 border-bpd-red border-t-transparent rounded-full mx-auto animate-spin"></div>
      </div>
      <p className="text-bpd-ink/80">Chargement du document...</p>
    </div>
  </main>
);

const App = () => {
  const { t, language } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Update HTML lang attribute based on selected language
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when navigating to legal pages
  useEffect(() => {
    if (location.pathname !== '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  // Handle hash navigation when page loads or route changes
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.substring(1); // Remove the #
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  // Handle navigation to sections - works from any page
  const handleSectionNavigation = (sectionId: string) => {
    if (location.pathname === '/') {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page with hash, then scroll after a brief delay
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const isPDFRoute = location.pathname.startsWith('/pdf/') && location.pathname !== '/pdf';

  return (
    <div className="min-h-screen bg-bpd-light">
      {/* Navigation - Ultra Institutional Governmental - Fixed Responsive */}
      {!isPDFRoute && (
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-bpd-paper border-b border-[#E0DAD4] backdrop-blur-sm' : 'bg-bpd-paper/98 backdrop-blur-sm'
      }`} role="navigation" aria-label="Navigation principale">
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${scrolled ? 'py-2' : 'py-2.5'}`}>
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <Link to="/" className="flex items-center flex-shrink-0 min-w-0" aria-label="Retour à l'accueil">
              <HeaderLogoInstitutional scrolled={scrolled} />
            </Link>
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 text-[10px] sm:text-[11px] font-medium text-bpd-ink uppercase tracking-[0.12em] flex-shrink-0">
                  <button 
                    onClick={() => handleSectionNavigation('qui')} 
                    className="hover:text-bpd-red transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer" 
                    aria-label="Mandat"
                  >
                    {location.pathname === '/' ? t('nav.mandat') : 'MANDAT'}
                  </button>
                  <button 
                    onClick={() => handleSectionNavigation('services')} 
                    className="hover:text-bpd-red transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer" 
                    aria-label="Compétences"
                  >
                    {location.pathname === '/' ? t('nav.competences') : 'COMPÉTENCES'}
                  </button>
                  <button 
                    onClick={() => handleSectionNavigation('process')} 
                    className="hover:text-bpd-red transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer" 
                    aria-label="Protocoles"
                  >
                    {location.pathname === '/' ? t('nav.protocoles') : 'PROTOCOLES'}
                  </button>
                  <button 
                    onClick={() => handleSectionNavigation('contact')} 
                    className="hover:text-bpd-red transition-colors whitespace-nowrap bg-transparent border-none cursor-pointer" 
                    aria-label="Accès sécurisé"
                  >
                    {location.pathname === '/' ? t('nav.acces') : 'ACCÈS SÉCURISÉ'}
                  </button>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <LanguageSwitcher />
              <button
                onClick={() => handleSectionNavigation('contact')}
                className="hidden md:inline-block px-3 sm:px-4 py-1.5 min-h-[44px] flex items-center bg-bpd-red text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.1em] hover:bg-bpd-red-soft active:bg-bpd-red active:scale-[0.98] transition-all duration-200 cursor-pointer whitespace-nowrap border-none"
                aria-label="Dossier confidentiel"
              >
                {location.pathname === '/' ? t('nav.dossier') : 'DOSSIER CONFIDENTIEL'}
              </button>
            </div>
          </div>
        </div>
      </nav>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/merci" element={<ThankYou />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/conditions-intervention" element={<ConditionsIntervention />} />
        <Route path="/politique-cookies" element={<PolitiqueCookies />} />
        {/* PDF Documents - Password Protected */}
        <Route path="/pdf" element={<PDFIndex />} />
        <Route 
          path="/pdf/politique-gestion-crise" 
          element={
            <Suspense fallback={<PDFLoadingFallback />}>
              <PolitiqueGestionCrise />
            </Suspense>
          } 
        />
        <Route 
          path="/pdf/accord-confidentialite" 
          element={
            <Suspense fallback={<PDFLoadingFallback />}>
              <AccordConfidentialite />
            </Suspense>
          } 
        />
        <Route 
          path="/pdf/mandat-intervention" 
          element={
            <Suspense fallback={<PDFLoadingFallback />}>
              <MandatIntervention />
            </Suspense>
          } 
        />
        <Route 
          path="/pdf/lettre-mission" 
          element={
            <Suspense fallback={<PDFLoadingFallback />}>
              <LettreMission />
            </Suspense>
          } 
        />
        <Route 
          path="/pdf/consentement-traitement" 
          element={
            <Suspense fallback={<PDFLoadingFallback />}>
              <ConsentementTraitement />
            </Suspense>
          } 
        />
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer - Ultra Institutional Governmental - Fixed Responsive */}
      {!isPDFRoute && (
      <footer className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] text-white mt-6 sm:mt-8 border-t border-gray-800" role="contentinfo">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-5 sm:mb-6">
            {/* Brand */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <FooterLogoInstitutional />
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-[8px] sm:text-[9px] font-bold text-white uppercase tracking-[0.2em] border-b border-gray-700 pb-1 mb-2 sm:mb-3">
                INFORMATIONS LÉGALES
              </h3>
              <ul className="space-y-1.5 sm:space-y-2 text-[9px] sm:text-[10px] text-gray-400">
                <li>
                  <Link to="/mentions-legales" className="hover:text-white transition-colors block min-h-[20px] flex items-center">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link to="/politique-confidentialite" className="hover:text-white transition-colors block min-h-[20px] flex items-center">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link to="/conditions-intervention" className="hover:text-white transition-colors block min-h-[20px] flex items-center">
                    Conditions d&apos;intervention
                  </Link>
                </li>
                <li>
                  <Link to="/politique-cookies" className="hover:text-white transition-colors block min-h-[20px] flex items-center">
                    Politique Cookies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Entity */}
            <div>
              <h3 className="text-[8px] sm:text-[9px] font-bold text-white uppercase tracking-[0.2em] border-b border-gray-700 pb-1 mb-2 sm:mb-3">
                ENTITÉ OPÉRATIONNELLE
              </h3>
              <div className="text-[9px] sm:text-[10px] text-gray-400 space-y-1">
                <p className="text-white font-semibold uppercase tracking-wide">Cellule technique confidentielle</p>
                <p className="pt-1.5 sm:pt-2 text-[8px] sm:text-[9px] leading-relaxed">
                  Infrastructure opérée via le système CRD — dispositif professionnel utilisé par des unités privées de protection numérique.
                </p>
              </div>
            </div>

            {/* Zones */}
            <div>
              <h3 className="text-[8px] sm:text-[9px] font-bold text-white uppercase tracking-[0.2em] border-b border-gray-700 pb-1 mb-2 sm:mb-3">
                PÉRIMÈTRE D&apos;ACTION
              </h3>
              <div className="space-y-1.5 sm:space-y-2 text-[9px] sm:text-[10px] text-gray-400">
                <p className="text-white font-medium">
                  France • Maroc • International
                </p>
                <p className="text-[8px] sm:text-[9px] leading-relaxed">
                  Interventions réalisables selon les pratiques des plateformes et hébergeurs concernés.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar - Ultra Compact - Fixed Responsive */}
          <div className="pt-3 sm:pt-4 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 text-[8px] sm:text-[9px] text-gray-500">
              <p>
                © {new Date().getFullYear()} Bureau de Protection Digitale — Tous droits réservés
              </p>
              <p className="tracking-[0.05em] text-left sm:text-right">
                Service confidentiel — Protocoles opérés au sein d&apos;une infrastructure sécurisée et supervisée.
              </p>
            </div>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
};

export default App;



