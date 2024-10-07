import { ManagementClient } from "@kontent-ai/management-sdk";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { WizardContext } from "../../WizardContext";

export const SyncTarget: React.FC = () => {
  const {
    sourceApiKey,
    sourceFile,
    targetEnvironmentId,
    setTargetEnvironmentId,
    targetApiKey,
    setTargetApiKey,
    setTargetClient,
  } = useContext(WizardContext);
  const [sameApiKey, setSameApiKey] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>();
  const [environmentName, setEnvironmentName] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sameApiKey) {
      setTargetApiKey(sourceApiKey!);
    }
  }, [sameApiKey, sourceApiKey, setTargetApiKey]);

  useEffect(() => {
    const fetchProjectInfo = async () => {
      if (targetEnvironmentId && targetApiKey) {
        setLoading(true);
        try {
          const client = new ManagementClient({
            apiKey: targetApiKey,
            environmentId: targetEnvironmentId,
          });
          const projectInfo = await client.environmentInformation().toPromise();
          const { name, environment } = projectInfo.data.project;
          setProjectName(name);
          setEnvironmentName(environment);
          setTargetClient(client);
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
  }, [targetEnvironmentId, targetApiKey, setTargetClient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/sync/entities");
  };

  const showSameApiKeyCheckbox = !sourceFile;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sync - Provide Target Information</h2>
      <div>
        <label>
          Target Environment ID:
          <input
            type="text"
            value={targetEnvironmentId || ""}
            onChange={(e) => setTargetEnvironmentId(e.target.value)}
            required
          />
        </label>
      </div>
      {showSameApiKeyCheckbox && (
        <label>
          <input
            type="checkbox"
            checked={sameApiKey}
            onChange={() => setSameApiKey(!sameApiKey)}
          />
          API key is the same as source
        </label>
      )}
      {!sameApiKey && (
        <div>
          <label>
            Target API Key:
            <input
              type="password"
              value={targetApiKey || ""}
              onChange={(e) => setTargetApiKey(e.target.value)}
              required
            />
          </label>
        </div>
      )}
      {loading ? <p>Loading project info...</p> : projectName && environmentName
        ? (
          <p>
            Project: {projectName}, Environment: {environmentName}
          </p>
        )
        : null}
      <div>
        <button type="button" onClick={() => navigate(-1)}>Back</button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};
