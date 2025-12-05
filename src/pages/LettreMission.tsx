import React from 'react';
import { ProtectedPDF } from '../components/ProtectedPDF';

export const LettreMission: React.FC = () => {
  const content = (
    <>
      <div className="space-y-4">
        <div>
          <p className="mb-4">
            La présente Lettre confirme l'acceptation par le BPD de la mission confiée par le Client.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">1. Nature de la mission</h3>
          <div className="space-y-1">
            <p>— Suppression de contenus ;</p>
            <p>— Gestion de crise ;</p>
            <p>— Protection continue ;</p>
            <p>— Surveillance numérique.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">2. Objectifs</h3>
          <p>
            Réduire l'exposition numérique du Client et neutraliser les atteintes.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">3. Modalités d'exécution</h3>
          <p>
            Actions manuelles, escalades administratives, transmissions formelles.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">4. Conditions financières</h3>
          <p>
            Le Client accepte les conditions précisées dans la proposition.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">5. Durée</h3>
          <p>
            La mission débute dès réception de l'accord et du paiement.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">6. Rapport final</h3>
          <p>
            Un document détaillant les actions réalisées est remis au Client.
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
            This Letter confirms BPD's acceptance of the mission entrusted by the Client.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">1. Nature of the Mission</h3>
          <div className="space-y-1">
            <p>— Content removal;</p>
            <p>— Crisis management;</p>
            <p>— Continuous protection;</p>
            <p>— Digital monitoring.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">2. Objectives</h3>
          <p>
            Reduce the Client's digital exposure and neutralize harms.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">3. Execution Methods</h3>
          <p>
            Manual actions, administrative escalations, formal submissions.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">4. Financial Terms</h3>
          <p>
            The Client accepts the terms specified in the proposal.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">5. Duration</h3>
          <p>
            The mission begins upon receipt of agreement and payment.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">6. Final Report</h3>
          <p>
            A detailed report of actions taken is provided to the Client.
          </p>
        </div>
      </div>
    </>
  );

  return (
    <ProtectedPDF
      title="Lettre de mission BPD"
      titleEn="BPD Mission Letter"
      content={content}
      contentEn={contentEn}
      filename="lettre-mission-bpd"
    />
  );
};
