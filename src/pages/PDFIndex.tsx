import React from 'react';
import { Link } from 'react-router-dom';

export const PDFIndex: React.FC = () => {
  const pdfs = [
    {
      title: 'Politique de gestion de crise',
      titleEn: 'Crisis Management Policy',
      description: 'Protocoles et procédures pour la gestion des situations d\'urgence numérique',
      descriptionEn: 'Protocols and procedures for managing digital emergency situations',
      route: '/pdf/politique-gestion-crise',
    },
    {
      title: 'Accord de confidentialité',
      titleEn: 'Confidentiality Agreement',
      description: 'Conditions de confidentialité applicables aux relations entre le BPD et ses clients',
      descriptionEn: 'Confidentiality conditions applicable to relations between BPD and its clients',
      route: '/pdf/accord-confidentialite',
    },
    {
      title: 'Mandat d\'intervention',
      titleEn: 'Intervention Mandate',
      description: 'Conditions dans lesquelles le BPD intervient pour le compte du client',
      descriptionEn: 'Conditions under which BPD intervenes on behalf of the client',
      route: '/pdf/mandat-intervention',
    },
    {
      title: 'Lettre de mission BPD',
      titleEn: 'BPD Mission Letter',
      description: 'Confirmation d\'acceptation et modalités de la mission d\'intervention',
      descriptionEn: 'Confirmation of acceptance and terms of the intervention mission',
      route: '/pdf/lettre-mission',
    },
    {
      title: 'Consentement au traitement des données',
      titleEn: 'Data Processing Consent',
      description: 'Formalisation du consentement au traitement des données personnelles',
      descriptionEn: 'Formalization of consent to the processing of personal data',
      route: '/pdf/consentement-traitement',
    },
  ];

  return (
    <main className="pt-24 sm:pt-28 md:pt-36 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 bg-bpd-paper min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-8 sm:mb-10 pb-4 border-b-2 border-[#D0CAC4]">
          <h1 className="text-[22px] sm:text-[26px] lg:text-[28px] font-semibold text-bpd-ink leading-[1.35] mb-2 title-border-left">
            Documents confidentiels
          </h1>
          <p className="text-[13px] sm:text-[14px] text-bpd-grey leading-[1.5] max-w-3xl">
            Accès aux documents institutionnels du Bureau de Protection Digitale. Chaque document est protégé par mot de passe.
          </p>
        </header>

        <div className="space-y-3 sm:space-y-4">
          {pdfs.map((pdf, index) => (
            <Link
              key={index}
              to={pdf.route}
              className="block bg-white border-l-3 border-bpd-red p-5 sm:p-6 border border-[#E0DAD4] hover:border-bpd-red transition-colors group"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[16px] sm:text-[17px] font-semibold text-bpd-ink mb-1 group-hover:text-bpd-red transition-colors title-border-left">
                      {pdf.title}
                    </h2>
                    <p className="text-[11px] sm:text-[12px] text-bpd-grey uppercase tracking-[0.05em] mb-2">
                      {pdf.titleEn}
                    </p>
                    <p className="text-[13px] sm:text-[14px] text-bpd-ink/80 leading-[1.5]">
                      {pdf.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-[10px] sm:text-[11px] text-bpd-red font-semibold uppercase tracking-[0.1em] pt-1">
                    →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 pt-6 border-t border-[#D0CAC4]">
          <p className="text-[10px] sm:text-[11px] text-bpd-grey text-center leading-relaxed">
            Tous les documents sont protégés par mot de passe et accessibles uniquement aux personnes autorisées.
          </p>
        </div>
      </div>
    </main>
  );
};

