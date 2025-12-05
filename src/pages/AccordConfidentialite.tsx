import React from 'react';
import { ProtectedPDF } from '../components/ProtectedPDF';

export const AccordConfidentialite: React.FC = () => {
  const content = (
    <>
      <div className="space-y-4">
        <div>
          <p className="mb-4">
            Cet Accord lie le Bureau de Protection Digitale (BPD) et le Client dans le cadre d'un échange d'informations sensibles.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">1. Objet</h3>
          <p>
            Le Client partage des informations confidentielles nécessaires à l'analyse, au diagnostic ou à l'intervention du BPD.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">2. Engagements du BPD</h3>
          <div className="space-y-1">
            <p>— Protéger toutes les informations reçues ;</p>
            <p>— Ne jamais divulguer à des tiers non autorisés ;</p>
            <p>— Limiter l'accès aux seules personnes habilitées.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">3. Engagements du Client</h3>
          <div className="space-y-1">
            <p>— Fournir des informations exactes ;</p>
            <p>— Signaler toute évolution majeure ;</p>
            <p>— Ne pas solliciter d'intervention contraire à la loi.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">4. Exceptions</h3>
          <p className="mb-2">
            L'accord ne couvre pas les informations :
          </p>
          <div className="space-y-1">
            <p>— déjà publiques ;</p>
            <p>— obtenues légalement ailleurs.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">5. Durée</h3>
          <p>
            L'accord reste en vigueur 5 ans après la fin de la relation.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">6. Droit applicable</h3>
          <p>
            Droit de l'entité opératrice (Aoufi Ventures LLC).
          </p>
        </div>
      </div>
    </>
  );

  const contentEn = (
    <>
      <div className="space-y-4">
        <div>
          <p className="mb-4">
            This Agreement binds the Bureau de Protection Digitale (BPD) and the Client for the exchange of sensitive information.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">1. Purpose</h3>
          <p>
            The Client shares confidential information required for BPD analysis, diagnostics, or intervention.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">2. BPD Obligations</h3>
          <div className="space-y-1">
            <p>— Protect all information received;</p>
            <p>— Never disclose it to unauthorized parties;</p>
            <p>— Limit access to authorized staff only.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">3. Client Obligations</h3>
          <div className="space-y-1">
            <p>— Provide accurate information;</p>
            <p>— Report any major change;</p>
            <p>— Not request any unlawful intervention.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">4. Exceptions</h3>
          <p className="mb-2">
            This Agreement does not cover information:
          </p>
          <div className="space-y-1">
            <p>— already public;</p>
            <p>— obtained lawfully elsewhere.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">5. Duration</h3>
          <p>
            The Agreement remains effective 5 years after termination.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">6. Governing Law</h3>
          <p>
            Law applicable to the operating entity (Aoufi Ventures LLC).
          </p>
        </div>
      </div>
    </>
  );

  return (
    <ProtectedPDF
      title="Accord de confidentialité"
      titleEn="Confidentiality Agreement"
      content={content}
      contentEn={contentEn}
      filename="accord-confidentialite"
    />
  );
};
