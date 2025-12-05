import React from 'react';
import { ProtectedPDF } from '../components/ProtectedPDF';

export const MandatIntervention: React.FC = () => {
  const content = (
    <>
      <div className="space-y-4">
        <div>
          <p className="mb-4">
            Le présent Mandat définit les conditions dans lesquelles le BPD intervient pour le compte du Client.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">1. Objet du mandat</h3>
          <p className="mb-2">
            Le Client autorise le BPD à :
          </p>
          <div className="space-y-1">
            <p>— analyser les contenus en cause ;</p>
            <p>— contacter les plateformes, hébergeurs et autorités ;</p>
            <p>— soumettre des demandes de suppression ;</p>
            <p>— procéder aux escalades nécessaires.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">2. Obligation de moyens</h3>
          <p>
            Le BPD agit selon une obligation de moyens renforcée, sans garantie de résultat.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">3. Limites du mandat</h3>
          <p>
            Le BPD ne peut intervenir pour dissimuler une infraction ou manipuler une procédure judiciaire.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">4. Informations requises</h3>
          <p>
            Le Client fournit les éléments nécessaires : captures, liens, descriptions.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">5. Rémunération</h3>
          <p>
            Une proposition financière est transmise avant toute action opérationnelle.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">6. Confidentialité</h3>
          <p>
            Le mandat est couvert par l'Accord de confidentialité.
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
            This Mandate defines the conditions under which BPD acts on behalf of the Client.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">1. Scope of the Mandate</h3>
          <p className="mb-2">
            The Client authorizes BPD to:
          </p>
          <div className="space-y-1">
            <p>— analyze involved content;</p>
            <p>— contact platforms, hosts, and authorities;</p>
            <p>— submit removal requests;</p>
            <p>— perform escalations as needed.</p>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">2. Best-Effort Obligation</h3>
          <p>
            BPD acts with reinforced best effort, without guarantee of result.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">3. Mandate Limitations</h3>
          <p>
            BPD cannot intervene to conceal an offence or manipulate judicial processes.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">4. Required Information</h3>
          <p>
            The Client provides all necessary material: screenshots, links, descriptions.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">5. Compensation</h3>
          <p>
            A financial proposal is provided before any operational action.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-bpd-ink mb-2">6. Confidentiality</h3>
          <p>
            The mandate is governed by the Confidentiality Agreement.
          </p>
        </div>
      </div>
    </>
  );

  return (
    <ProtectedPDF
      title="Mandat d'intervention"
      titleEn="Intervention Mandate"
      content={content}
      contentEn={contentEn}
      filename="mandat-intervention"
    />
  );
};
