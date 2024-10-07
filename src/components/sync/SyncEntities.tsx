import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { SyncEntityName, WizardContext } from "../../WizardContext";

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
      <p>Generating the diff is a read-only operation and will not modify your content.</p>
      <div>
        {entityOptions.map((entity) => (
          <label key={entity}>
            <input
              type="checkbox"
              value={entity}
              checked={syncModelEntities.includes(entity)}
              onChange={(e) => handleEntityChange(entity, e.target.checked)}
            />
            {entity}
          </label>
        ))}
      </div>
      <div>
        <button type="button" onClick={() => navigate(-1)}>Back</button>
        <button type="submit">Generate Diff</button>
      </div>
    </form>
  );
};
