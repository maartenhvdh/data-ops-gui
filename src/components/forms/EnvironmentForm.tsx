import React from "react";

type EnvironmentFormProps = {
  loading?: boolean;
  idLabelText?: string;
  apiKeyLabelText?: string;
  environmentName?: string;
  projectName?: string;
  environmentId?: string;
  apiKey?: string;
  setEnvironmentId: (id: string) => void;
  setApiKey: (key: string) => void;
};

export const EnvironmentForm: React.FC<EnvironmentFormProps> = (props) => {
  return (
    <>
      <div>
        <label>
          <div>Source Environment ID:</div>
          <input
            type="text"
            className="input"
            value={props.environmentId || ""}
            onChange={(e) => props.setEnvironmentId(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          <div>Source API Key:</div>
          <input
            type="password"
            className="input"
            data-lpignore="true"
            value={props.apiKey || ""}
            onChange={(e) => props.setApiKey(e.target.value)}
            required
          />
        </label>
      </div>
      {props.loading ? (
        <div className="loader"></div>
      ) : props.projectName && props.environmentName ? (
        <div className="environment-info">
          <span>
            Project: <strong>{props.projectName}</strong>
          </span>
          <span>
            Environment: <strong>{props.environmentName}</strong>
          </span>
        </div>
      ) : null}
    </>
  );
};
