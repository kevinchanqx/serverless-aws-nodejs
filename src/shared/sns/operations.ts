import { PublishCommand, PublishCommandInput } from "@aws-sdk/client-sns";
import { SNSPublishMessageParams } from "./type";
import { getEnv } from "@utils/env";
import { getSnsClient } from "./client";
import { logger } from "@utils/logger";

const snsClient = getSnsClient();
const arn = `arn:aws:sns:${getEnv("AWS_SOUTHEAST_REGION")}:${getEnv("AWS_ACCOUNT_ID")}:`;

export const publishMessage = async <T>(params: SNSPublishMessageParams<T>) => {
  const input: PublishCommandInput = {
    TopicArn: `${arn}${params.topic}`,
    Message: JSON.stringify(params.body),
  };

  const publishMessageCommand: PublishCommand = new PublishCommand(input);
  await snsClient.send(publishMessageCommand);
  logger.info(
    `[publishMessage] SNS | ${params.topic} | Message published successfully!`,
  );
};
