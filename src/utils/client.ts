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
  setSourceClient: (client: any) => void,
  environmentId?: string,
  apiKey?: string,
) => {
  const [projectName, setProjectName] = useState<string | undefined>();
  const [environmentName, setEnvironmentName] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchEnvironmentData = async () => {
      if (environmentId && apiKey) {
        setLoading(true);
        try {
          const { projectName, environmentName, client } = await getProjectEnvironmentClient(apiKey, environmentId);
          setProjectName(projectName);
          setEnvironmentName(environmentName);
          setSourceClient(client);
        } catch (error) {
          console.error("Failed to fetch project info", error);
          setProjectName(undefined);
          setEnvironmentName(undefined);
        } finally {
          setLoading(false);
        }
      } else {
        // Clear data if conditions are not met
        setProjectName(undefined);
        setEnvironmentName(undefined);
      }
    };

    fetchEnvironmentData();
  }, [environmentId, apiKey, setSourceClient]);

  return { projectName, environmentName, loading };
};
