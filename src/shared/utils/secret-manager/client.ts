import { SecretsManagerClient } from "@aws-sdk/client-secrets-manager";

let secretsManagerClient: SecretsManagerClient | undefined;

export const getSecretsManagerClient = () => {
  if (!secretsManagerClient) {
    secretsManagerClient = new SecretsManagerClient({});
  }
};
