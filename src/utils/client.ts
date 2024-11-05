import { ManagementClient } from "@kontent-ai/management-sdk";
import { useEffect, useState } from "react";

type ProjectInfo = {
  projectName: string;
  environmentName: string;
  client: ManagementClient;
};

const getProjectEnvironmentClient = async (
  apiKey: string,
  environmentId: string,
): Promise<ProjectInfo> => {
  const client = new ManagementClient({
    apiKey,
    environmentId,
  });
  const projectInfoResponse = await client.environmentInformation().toPromise();
  const { name: projectName, environment: environmentName } = projectInfoResponse.data.project;

  return { projectName, environmentName, client };
};

export const useEnvironmentData = (
  setClient: (client: any) => void,
  setEnvName: (name: string) => void,
  environmentId?: string,
  apiKey?: string,
) => {
  const [projectName, setProjectName] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEnvironmentData = async () => {
      if (environmentId && apiKey) {
        setLoading(true);
        try {
          const { projectName, environmentName, client } = await getProjectEnvironmentClient(apiKey, environmentId);
          setProjectName(projectName);
          setEnvName(environmentName);
          setClient(client);
        } catch (error) {
          console.error("Failed to fetch project info", error);
          setProjectName(undefined);
        } finally {
          setLoading(false);
        }
      } else {
        // Clear data if conditions are not met
        setProjectName(undefined);
      }
    };

    fetchEnvironmentData();
  }, [environmentId, apiKey, setClient]);

  return { projectName, loading };
};
