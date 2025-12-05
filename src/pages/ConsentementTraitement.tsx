import React from 'react';
import { ProtectedPDF } from '../components/ProtectedPDF';

export const ConsentementTraitement: React.FC = () => {
  const content = (
    <>
      <div className="space-y-4">
        <div>
          <p className="mb-4">
            Par le présent document, le Client autorise le traitement de ses données dans le cadre de l'évaluation et de l'exécution d'une mission par le BPD.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">1. Données collectées</h3>
          <div className="space-y-1">
            <p>— Identité ou pseudonyme ;</p>
            <p>— Coordonnées ;</p>
            <p>— Contenus concernés ;</p>
            <p>— Niveau d'exposition.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">2. Finalités</h3>
          <div className="space-y-1">
            <p>— Analyse ;</p>
            <p>— Diagnostic ;</p>
            <p>— Intervention ;</p>
            <p>— Traçabilité.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">3. Base légale</h3>
          <p>
            Mesures précontractuelles + intérêt légitime.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">4. Durée de conservation</h3>
          <p>
            Durée strictement nécessaire au traitement du dossier.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">5. Droits du Client</h3>
          <p>
            Accès, rectification, suppression.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">6. Contact</h3>
          <p>
            <a href="mailto:privacy@bureauprotectiondigitale.fr" className="text-bpd-red hover:underline">privacy@bureauprotectiondigitale.fr</a>
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
            Through this document, the Client authorizes the processing of their data for evaluation and execution of a mission by BPD.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">1. Data Collected</h3>
          <div className="space-y-1">
            <p>— Identity or pseudonym;</p>
            <p>— Contact details;</p>
            <p>— Concerned content;</p>
            <p>— Exposure level.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">2. Purposes</h3>
          <div className="space-y-1">
            <p>— Analysis;</p>
            <p>— Diagnostics;</p>
            <p>— Intervention;</p>
            <p>— Traceability.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">3. Legal Basis</h3>
          <p>
            Pre-contractual measures + legitimate interest.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">4. Retention Period</h3>
          <p>
            Strictly necessary duration for handling the case.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">5. Client Rights</h3>
          <p>
            Access, rectification, deletion.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">6. Contact</h3>
          <p>
            <a href="mailto:privacy@bureauprotectiondigitale.fr" className="text-bpd-red hover:underline">privacy@bureauprotectiondigitale.fr</a>
          </p>
        </div>
      </div>
    </>
  );

  return (
    <ProtectedPDF
      title="Consentement au traitement des données"
      titleEn="Data Processing Consent"
      content={content}
      contentEn={contentEn}
      filename="consentement-traitement"
    />
  );
};
