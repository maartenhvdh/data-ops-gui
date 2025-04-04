import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useEnvironmentData } from "../../utils/client";
import { WizardContext } from "../../WizardContext";
import { EnvironmentInput } from "../inputs/EnvironmentInput";
import { FileInput } from "../inputs/FileInput";
import { StepNavigation } from "../menu/StepNavigation";

export const SyncSource: React.FC = () => {
  const {
    sourceEnvironmentId,
    sourceApiKey,
    sourceEnvName,
    setSourceEnvironmentId,
    setSourceApiKey,
    setSourceEnvName,
    setSourceFile,
    setSourceClient,
  } = useContext(WizardContext);
  const [useModelFile, setUseModelFile] = useState<boolean>(false);
  const navigate = useNavigate();

  const { projectName, loading } = useEnvironmentData(
    setSourceClient,
    setSourceEnvName,
    sourceEnvironmentId,
    sourceApiKey,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/sync/target");
  };

  const idLabelText = "Source environment ID:";
  const apiKeyLabelText = "Source API key:";

  const formProps: React.ComponentProps<typeof EnvironmentInput> = {
    loading,
    idLabelText,
    apiKeyLabelText,
    projectName,
    environmentName: sourceEnvName,
    environmentId: sourceEnvironmentId,
    apiKey: sourceApiKey,
    showApiKey: true,
    setEnvironmentId: setSourceEnvironmentId,
    setApiKey: setSourceApiKey,
    setEnvironmentName: setSourceEnvName,
  };

  return (
    <form name="source" onSubmit={handleSubmit} autoComplete="off">
      <h2>Sync - Provide Source Information</h2>
      <br />
      <label className="switch disabled">
        <input
          type="checkbox"
          checked={useModelFile}
          onChange={() => setUseModelFile(!useModelFile)}
        />
        <span className="slider"></span>
        Sync from an existing snapshot
      </label>

      {useModelFile ? <FileInput setFile={setSourceFile} /> : <EnvironmentInput {...formProps} />}
      <StepNavigation navigate={navigate} />
    </form>
  );
};
