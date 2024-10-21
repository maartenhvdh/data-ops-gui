import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useEnvironmentData } from "../../utils/client";
import { WizardContext } from "../../WizardContext";
import { EnvironmentInput } from "../inputs/EnvironmentInput";
import { StepNavigation } from "../menu/StepNavigation";

export const SyncTarget: React.FC = () => {
  const {
    targetEnvironmentId,
    setTargetEnvironmentId,
    targetApiKey,
    setTargetApiKey,
    setTargetClient,
    sourceApiKey,
  } = useContext(WizardContext);
  const [apiKeysMatch, setApiKeysMatch] = useState<boolean>(false);
  const navigate = useNavigate();

  const matchApiKeys = () => {
    setTargetApiKey(sourceApiKey ?? "");
    setApiKeysMatch(!apiKeysMatch);
  };

  const { projectName, environmentName, loading } = useEnvironmentData(
    setTargetClient,
    targetEnvironmentId,
    targetApiKey,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/sync/entities");
  };

  const idLabelText = "Target environment ID:";
  const apiKeyLabelText = "Target API key:";

  const formProps: React.ComponentProps<typeof EnvironmentInput> = {
    loading,
    idLabelText,
    apiKeyLabelText,
    environmentName,
    projectName,
    environmentId: targetEnvironmentId,
    apiKey: targetApiKey,
    setEnvironmentId: setTargetEnvironmentId,
    setApiKey: setTargetApiKey,
    showApiKey: !apiKeysMatch,
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h2>Sync - Provide Target Information</h2>
      <br />
      <label className="switch">
        <input
          type="checkbox"
          checked={apiKeysMatch}
          onChange={matchApiKeys}
        />
        <span className="slider"></span>
        Target and source API keys are identical.
      </label>

      <EnvironmentInput {...formProps} />
      <StepNavigation navigate={navigate} />
    </form>
  );
};
