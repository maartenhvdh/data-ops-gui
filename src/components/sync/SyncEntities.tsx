import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DiffResponse, injectScripts, removeElementFromHtml } from "../../utils/sync";
import { SyncEntityName, WizardContext } from "../../WizardContext";
import { Loader } from "../Loader";
import { StepNavigation } from "../menu/StepNavigation";

export const SyncEntities: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const {
    syncModelEntities,
    setSyncModelEntities,
    sourceEnvironmentId,
    sourceApiKey,
    targetEnvironmentId,
    targetApiKey,
  } = useContext(WizardContext);
  const navigate = useNavigate();

  const entityOptions = [
    "taxonomies",
    "contentTypes",
    "contentTypeSnippets",
    "collections",
    "spaces",
    "webSpotlight",
    "assetFolders",
    "languages",
    "workflows",
  ] as const;

  const handleEntityChange = (entity: string, checked: boolean) => {
    if (checked) {
      setSyncModelEntities([...syncModelEntities, entity as SyncEntityName]);
    } else {
      setSyncModelEntities(syncModelEntities.filter((e) => e !== entity));
    }
  };

  const selectAllCheckboxes = () => {
    setSyncModelEntities([...entityOptions]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateDiff();
  };

  const generateDiff = async () => {
    setLoading(true);
    try {
      const response = await fetch("/.netlify/functions/diff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceEnvironmentId,
          sourceApiKey,
          targetEnvironmentId,
          targetApiKey,
          entities: syncModelEntities,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(JSON.stringify(errorData) || "Unknown error encountered.");
        return;
      }

      const data: DiffResponse = await response.json();
      const modifiedDiffHtml = injectScripts(
        removeElementFromHtml(data.html, ".title"),
      );

      navigate("/sync/diff", { state: { diffResult: modifiedDiffHtml } });
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid loading-message">
        <div className="centered">
          <Loader
            title="Generating diff"
            message="Please wait while the diff is being generated..."
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>Error generating diff</h2>
        <div className="section red">{error}</div>
        <button type="button" className="button error-back-button" onClick={() => setError(undefined)}>Back</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sync - Select Entities to Sync</h2>
      <div className="entity-columns">
        <div>
          {entityOptions.map((entity) => (
            <label className="checkbox" key={entity}>
              <input
                type="checkbox"
                value={entity}
                checked={syncModelEntities.includes(entity)}
                onChange={(e) => handleEntityChange(entity, e.target.checked)}
              />
              <span className="checkmark"></span>
              {entity}
            </label>
          ))}
        </div>
        <div className="section purple infobox">
          Generating the diff is a read-only operation. No changes to your content will be made yet.
        </div>
      </div>
      <button
        type="button"
        className="button secondary select-all"
        onClick={selectAllCheckboxes}
      >
        Select all
      </button>
      <StepNavigation navigate={navigate} nextButtonText="Generate diff" />
    </form>
  );
};
