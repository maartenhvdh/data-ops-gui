import React from "react";

type EnvironmentInputProps = {
  showApiKey?: boolean;
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

export const EnvironmentInput: React.FC<EnvironmentInputProps> = (props) => {
  return (
    <>
      <div>
        <label>
          <div>{props.idLabelText}</div>
          <input
            type="text"
            className="input"
            value={props.environmentId || ""}
            onChange={(e) => props.setEnvironmentId(e.target.value)}
            required
          />
        </label>
      </div>
      {props.showApiKey && (
        <div>
          <label>
            <div>{props.apiKeyLabelText}</div>
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
      )}
      {props.loading
        ? <div className="loader"></div>
        : props.projectName && props.environmentName
        ? (
          <div className="environment-info">
            <span>
              Project: <strong>{props.projectName}</strong>
            </span>
            <span>
              Environment: <strong>{props.environmentName}</strong>
            </span>
          </div>
        )
        : null}
    </>
  );
};
