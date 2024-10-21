import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { SyncEntityName, WizardContext } from "../../WizardContext";
import { StepNavigation } from "../menu/StepNavigation";

export const SyncEntities: React.FC = () => {
  const { syncModelEntities, setSyncModelEntities } = useContext(WizardContext);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/sync/diff");
  };

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
      <StepNavigation navigate={navigate} nextButtonText="Generate diff" />
    </form>
  );
};
