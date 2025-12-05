import React from 'react';
import { ProtectedPDF } from '../components/ProtectedPDF';

export const PolitiqueGestionCrise: React.FC = () => {
  const content = (
    <>
      <div className="space-y-4">
        <div>
          <p className="mb-4">
            La présente Politique définit les protocoles appliqués par le Bureau de Protection Digitale (BPD) lors de situations d'urgence numérique impliquant la diffusion non autorisée de contenus, des incidents de réputation, ou toute exposition numérique mettant un individu en risque.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">1. Déclenchement d'une procédure de crise</h3>
          <p className="mb-2">
            Une procédure de crise est ouverte lorsque :
          </p>
          <div className="space-y-1">
            <p>— un contenu sensible est publié sans autorisation ;</p>
            <p>— une fuite, un doxxing ou une campagne coordonnée est détectée ;</p>
            <p>— la propagation numérique présente un risque immédiat.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">2. Analyse et cartographie</h3>
          <p className="mb-2">
            Le BPD réalise une analyse rapide incluant :
          </p>
          <div className="space-y-1">
            <p>— évaluation du niveau de criticité ;</p>
            <p>— identification des plateformes d'hébergement ;</p>
            <p>— analyse de la vitesse de propagation ;</p>
            <p>— détermination des priorités de retrait.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">3. Plan d'action</h3>
          <p className="mb-2">
            Un protocole opérationnel est établi comprenant :
          </p>
          <div className="space-y-1">
            <p>— séquence de suppression ;</p>
            <p>— transmissions techniques ;</p>
            <p>— escalades auprès d'entités spécialisées ;</p>
            <p>— actions de neutralisation de propagation.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">4. Exécution</h3>
          <p>
            Toutes les actions sont réalisées manuellement par des analystes habilités. Aucun système automatisé ne peut intervenir sans validation humaine.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">5. Rapport de crise</h3>
          <p className="mb-2">
            À la clôture :
          </p>
          <div className="space-y-1">
            <p>— éléments retirés ;</p>
            <p>— liens encore sous surveillance ;</p>
            <p>— recommandations stratégiques.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">6. Confidentialité absolue</h3>
          <p>
            Tout dossier de crise est classé comme information sensible.
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
            This Policy defines the protocols applied by the Bureau de Protection Digitale (BPD) during digital emergency situations involving unauthorized content exposure, reputation incidents, or any digital event placing an individual at risk.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">1. Triggering a Crisis Procedure</h3>
          <p className="mb-2">
            A crisis procedure is initiated when:
          </p>
          <div className="space-y-1">
            <p>— sensitive content is published without authorization;</p>
            <p>— a leak, doxxing, or coordinated attack is detected;</p>
            <p>— digital propagation presents an immediate risk.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">2. Analysis and Mapping</h3>
          <p className="mb-2">
            BPD conducts a rapid assessment including:
          </p>
          <div className="space-y-1">
            <p>— evaluation of criticality level;</p>
            <p>— identification of hosting platforms;</p>
            <p>— analysis of propagation speed;</p>
            <p>— determination of removal priorities.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">3. Action Plan</h3>
          <p className="mb-2">
            An operational protocol is established consisting of:
          </p>
          <div className="space-y-1">
            <p>— removal sequence;</p>
            <p>— technical submissions;</p>
            <p>— escalations to specialized units;</p>
            <p>— propagation-neutralization actions.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">4. Execution</h3>
          <p>
            All actions are performed manually by authorized analysts. No automated system may act without human validation.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">5. Crisis Report</h3>
          <p className="mb-2">
            Upon closure:
          </p>
          <div className="space-y-1">
            <p>— items removed;</p>
            <p>— links under continued monitoring;</p>
            <p>— strategic recommendations.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">6. Absolute Confidentiality</h3>
          <p>
            Every crisis file is classified as sensitive information.
          </p>
        </div>
      </div>
    </>
  );

  return (
    <ProtectedPDF
      title="Politique de gestion de crise"
      titleEn="Crisis Management Policy"
      content={content}
      contentEn={contentEn}
      filename="politique-gestion-crise"
    />
  );
};

