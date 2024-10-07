import { ManagementClient } from "@kontent-ai/management-sdk";
import React, { createContext, useState } from "react";

const syncEntityChoices = [
  "contentTypes",
  "contentTypeSnippets",
  "taxonomies",
  "collections",
  "assetFolders",
  "spaces",
  "languages",
  "webSpotlight",
  "workflows",
] as const;

export type SyncEntityName = (typeof syncEntityChoices)[number];

interface WizardContextProps {
  action?: string;
  sourceEnvironmentId?: string;
  targetEnvironmentId?: string;
  sourceClient?: ManagementClient;
  targetClient?: ManagementClient;
  sourceFile?: File | null;
  sourceApiKey?: string;
  targetApiKey?: string;
  syncModelEntities: SyncEntityName[];
  setAction: (action: string) => void;
  setSourceEnvironmentId: (id: string) => void;
  setTargetEnvironmentId: (id: string) => void;
  setSourceClient: (client: ManagementClient) => void;
  setTargetClient: (client: ManagementClient) => void;
  setSourceFile: (file: File | null) => void;
  setSourceApiKey: (key: string) => void;
  setTargetApiKey: (key: string) => void;
  setSyncModelEntities: (entities: SyncEntityName[]) => void;
}

export const WizardContext = createContext<WizardContextProps>({} as WizardContextProps);

export const WizardProvider: React.FC<any> = ({ children }) => {
  const [action, setAction] = useState<string>();
  const [sourceEnvironmentId, setSourceEnvironmentId] = useState<string>();
  const [targetEnvironmentId, setTargetEnvironmentId] = useState<string>();
  const [sourceClient, setSourceClient] = useState<ManagementClient>();
  const [targetClient, setTargetClient] = useState<ManagementClient>();
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceApiKey, setSourceApiKey] = useState<string>();
  const [targetApiKey, setTargetApiKey] = useState<string>();
  const [syncModelEntities, setSyncModelEntities] = useState<SyncEntityName[]>([]);

  return (
    <WizardContext.Provider
      value={{
        action,
        sourceEnvironmentId,
        targetEnvironmentId,
        sourceClient,
        targetClient,
        sourceFile,
        sourceApiKey,
        targetApiKey,
        syncModelEntities,
        setAction,
        setSourceEnvironmentId,
        setTargetEnvironmentId,
        setSourceClient,
        setTargetClient,
        setSourceFile,
        setSourceApiKey,
        setTargetApiKey,
        setSyncModelEntities,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};
