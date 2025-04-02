import { SQSClient } from "@aws-sdk/client-sqs";
import { getEnv } from "@utils/env";

let sqsClient: SQSClient | undefined;

export const getSqsClient = () => {
  if (!sqsClient) {
    sqsClient = new SQSClient({
      region: getEnv("AWS_SOUTHEAST_REGION"),
      logger: console,
    });

    return sqsClient;
  }
  return sqsClient;
};
