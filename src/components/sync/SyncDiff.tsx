import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { WizardContext } from "../../WizardContext";

export const SyncDiff: React.FC = () => {
  const { targetEnvironmentId, sourceEnvironmentId, targetApiKey, sourceApiKey, syncModelEntities } = useContext(
    WizardContext,
  );
  const [diffResult, setDiffResult] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [syncResult, setSyncResult] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    const generateDiff = async () => {
      setLoading(true);
      try {
        // TODO: diff generation goes here
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
        // const diff = await syncDiff(useContext(WizardContext))
      } catch (error) {
        console.error("Error generating diff", error);
        setDiffResult("Failed to generate diff.");
      } finally {
        setLoading(false);
      }
    };
    generateDiff();
  }, [syncModelEntities]);

  const handleSync = async () => {
    setShowModal(false);
    setSyncing(true);
    try {
      // TODO: sync trigger goes here
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSyncResult("Sync completed successfully");
    } catch (error) {
      console.error("Error during sync", error);
      setSyncResult("Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div>
        <h2>Generating diff</h2>
        <p>Generating diff, please wait...</p>
        <div className="loader"></div>
      </div>
    );
  }

  if (syncResult) {
    return (
      <div>
        <h2>Sync Result</h2>
        <p>{syncResult}</p>
        <button onClick={() => navigate("/")}>Return to Home</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Diff Result</h2>
      <div>
        <button className="button" type="button" onClick={() => navigate(-1)}>Back</button>
        <button className="button secondary" type="button" onClick={() => setShowModal(true)}>Sync</button>
      </div>
      <iframe>
      </iframe>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Sync Operation</h3>
            <p>
              Sync operation may result in irreversible changes to the target environment. Do you want to continue?
            </p>
            <button className="button destructive" onClick={handleSync}>Continue</button>
          </div>
        </div>
      )}

      {syncing && <p>Syncing, please wait...</p>}
    </div>
  );
};
