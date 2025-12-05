import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const ThankYou: React.FC = () => {
  const { language } = useLanguage();

  const translations = {
    fr: {
      title: 'Demande transmise avec succès',
      subtitle: 'Merci pour votre confiance',
      message: 'Votre demande a été transmise avec succès. Un responsable du Bureau de Protection Digitale vous recontactera dans les plus brefs délais via le canal de communication que vous avez indiqué.',
      nextSteps: 'Prochaines étapes',
      step1: 'Un responsable BPD analysera votre demande',
      step2: 'Vous recevrez une réponse sous 24-48 heures',
      step3: 'Un pré-diagnostic confidentiel sera établi',
      backHome: 'Retour à l\'accueil',
      contact: 'Nous contacter'
    },
    en: {
      title: 'Request Successfully Submitted',
      subtitle: 'Thank you for your trust',
      message: 'Your request has been successfully submitted. A Bureau de Protection Digitale representative will contact you shortly via the communication channel you indicated.',
      nextSteps: 'Next Steps',
      step1: 'A BPD representative will analyze your request',
      step2: 'You will receive a response within 24-48 hours',
      step3: 'A confidential preliminary assessment will be established',
      backHome: 'Back to Home',
      contact: 'Contact Us'
    }
  };

  const t_page = translations[language];

  return (
    <main className="min-h-screen bg-bpd-paper flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white border border-[#E0DAD4] p-8 sm:p-10 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-bpd-ink mb-2 title-border-left">
              {t_page.title}
            </h1>
            <p className="text-bpd-grey text-sm sm:text-base">
              {t_page.subtitle}
            </p>
          </div>

          {/* Message */}
          <div className="mb-8 text-left">
            <p className="text-bpd-ink/80 leading-relaxed mb-6">
              {t_page.message}
            </p>

            <div className="bg-bpd-paper border-l-3 border-bpd-red p-4 mb-6">
              <h2 className="text-base sm:text-lg font-semibold text-bpd-ink mb-3 uppercase tracking-[0.05em]">
                {t_page.nextSteps}
              </h2>
              <ul className="space-y-2 text-sm text-bpd-ink/80">
                <li className="flex items-start">
                  <span className="text-bpd-red mr-2 font-bold">1.</span>
                  <span>{t_page.step1}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bpd-red mr-2 font-bold">2.</span>
                  <span>{t_page.step2}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bpd-red mr-2 font-bold">3.</span>
                  <span>{t_page.step3}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-bpd-red text-white font-semibold uppercase tracking-[0.1em] hover:bg-bpd-red-soft transition-colors text-center"
            >
              {t_page.backHome}
            </Link>
            <Link
              to="/#contact"
              className="px-6 py-3 border border-bpd-red text-bpd-red font-semibold uppercase tracking-[0.1em] hover:bg-bpd-red hover:text-white transition-colors text-center"
            >
              {t_page.contact}
            </Link>
          </div>

          {/* Confidential Notice */}
          <div className="mt-8 pt-6 border-t border-[#D0CAC4]">
            <p className="text-xs text-bpd-grey leading-relaxed">
              {language === 'fr' 
                ? 'Vos informations sont traitées dans un cadre strictement confidentiel. Aucun dossier n\'est ouvert sans validation explicite.'
                : 'Your information is processed in a strictly confidential framework. No file is opened without explicit validation.'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

