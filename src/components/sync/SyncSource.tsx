import { ManagementClient } from "@kontent-ai/management-sdk";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { WizardContext } from "../../WizardContext";
import { StepNavigation } from "../menu/StepNavigation";
import { EnvironmentForm } from "../forms/EnvironmentForm";
import { FileForm } from "../forms/FileForm";

export const SyncSource: React.FC = () => {
  const {
    sourceEnvironmentId,
    setSourceEnvironmentId,
    sourceApiKey,
    setSourceApiKey,
    sourceFile,
    setSourceFile,
    setSourceClient,
  } = useContext(WizardContext);
  const [useModelFile, setUseModelFile] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>();
  const [environmentName, setEnvironmentName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectInfo = async () => {
      if (sourceEnvironmentId && sourceApiKey && !useModelFile) {
        setLoading(true);
        try {
          const client = new ManagementClient({
            apiKey: sourceApiKey,
            environmentId: sourceEnvironmentId,
          });
          const projectInfo = await client.environmentInformation().toPromise();
          const { name, environment } = projectInfo.data.project;
          setProjectName(name);
          setEnvironmentName(environment);
          setSourceClient(client);
        } catch (error) {
          console.error("Failed to fetch project info", error);
          setProjectName(undefined);
          setEnvironmentName(undefined);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProjectInfo();
  }, [sourceEnvironmentId, sourceApiKey, useModelFile, setSourceClient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/sync/target");
  };

  const idLabelText = "Source environment ID:";
  const apiKeyLabelText = "Source API key:";

  const formProps = {
    loading,
    idLabelText,
    apiKeyLabelText,
    environmentName,
    projectName,
    environmentId: sourceEnvironmentId,
    apiKey: sourceApiKey,
    setEnvironmentId: setSourceEnvironmentId,
    setApiKey: setSourceApiKey,
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <h2>Sync - Provide Source Information</h2>
      <br />
      <label className="switch">
        <input
          type="checkbox"
          checked={useModelFile}
          onChange={() => setUseModelFile(!useModelFile)}
        />
        <span className="slider"></span>
        Sync from an existing model file
      </label>

      {useModelFile ? (
        <FileForm setFile={setSourceFile} />
      ) : (
        <EnvironmentForm {...formProps} />
      )}
      <StepNavigation navigate={navigate} />
    </form>
  );
};
