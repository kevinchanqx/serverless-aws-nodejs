import { SNSClient } from "@aws-sdk/client-sns";
import { getEnv } from "@utils/env";

let snsClient: SNSClient | undefined;

export const getSnsClient = () => {
  if (!snsClient) {
    snsClient = new SNSClient({
      region: getEnv("AWS_SOUTHEAST_REGION"),
    });

    return snsClient;
  }
  return snsClient;
};
