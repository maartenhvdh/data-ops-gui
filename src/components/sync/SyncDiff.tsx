import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { WizardContext } from "../../WizardContext";
import { Loader } from "../Loader";

export const SyncDiff: React.FC = () => {
  const {
    targetEnvironmentId,
    sourceEnvironmentId,
    targetApiKey,
    sourceApiKey,
    syncModelEntities,
    sourceEnvName,
    targetEnvName,
  } = useContext(WizardContext);
  const [loading, setLoading] = useState<boolean>();
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>();
  const navigate = useNavigate();
  const location = useLocation();

  const diffResult = location.state?.diffResult;
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const runSync = async () => {
    setError(undefined);
    setLoading(true);
    try {
      const response = await fetch("/.netlify/functions/sync", {
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
      }

      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "setHeight") {
        const newHeight = event.data.height;
        if (iframeRef.current) {
          iframeRef.current.style.height = `${newHeight}px`;
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  if (loading) {
    return (
      <div className="grid loading-message">
        <div className="centered">
          <Loader
            title="Syncing Content Model"
            message="Content model synchronization in progress. Please don't close this window."
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid result-message">
        <div className="centered">
          <h2>Model sync finished with errors</h2>
          <div className="section red">{error}</div>
          <button type="button" className="button error-back-button" onClick={() => navigate("/sync/entities")}>
            Regenerate diff
          </button>
          <button type="button" className="button error-back-button secondary" onClick={() => navigate("/")}>
            Back to main menu
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="grid result-message">
        <div className="centered">
          <h2>Model sync finished successfully</h2>
          <button type="button" className="button spaced-5" onClick={() => navigate("/sync/entities")}>
            Regenerate diff
          </button>
          <button type="button" className="button spaced-5 secondary" onClick={() => navigate("/")}>
            Back to main menu
          </button>
        </div>
      </div>
    );
  }

  if (!diffResult) {
    return (
      <div>
        <h2>No Diff Available</h2>
        <p>No diff result was found. Please start the operation from the beginning.</p>
        <button className="button" onClick={() => navigate("/")}>
          Back to main menu
        </button>
      </div>
    );
  }

  return (
    <div id="syncdiff">
      <div>
        <button className="button" type="button" onClick={() => navigate(-1)}>
          Back
        </button>
        <button
          className="button secondary run-sync"
          type="button"
          onClick={() => setShowWarning(true)}
        >
          Review & Sync
        </button>
      </div>
      {showWarning && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Sync Operation</h3>
            <p>
              You're about to sync the following entities from <strong>{sourceEnvName}</strong> to{" "}
              <strong>{targetEnvName}</strong>:
            </p>
            <ul>
              {syncModelEntities.map(e => <li>{e}</li>)}
            </ul>
            <p>
              Sync operation may result in irreversible changes to the target environment. Do you want to continue?
            </p>
            <button
              className="button destructive"
              onClick={runSync}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      <iframe
        id="diffFrame"
        srcDoc={diffResult}
        title="Diff Result"
        sandbox="allow-scripts"
        ref={iframeRef}
      />
    </div>
  );
};
