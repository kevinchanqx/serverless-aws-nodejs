import {
  SendMessageCommand,
  SendMessageCommandInput,
} from "@aws-sdk/client-sqs";
import { getSqsClient } from "./client";
import { SQSEnqueueMessageParams } from "./type";
import { getEnv } from "@utils/env";
import { logger } from "@utils/logger";

const sqsClient = getSqsClient();

export const enqueueMessage = async <T>(params: SQSEnqueueMessageParams<T>) => {
  const input: SendMessageCommandInput = {
    QueueUrl: `https://sqs.${getEnv("AWS_SOUTHEAST_REGION")}.amazonaws.com/${getEnv("AWS_ACCOUNT_ID")}/${params.queueName}`,
    MessageBody: JSON.stringify(params.body),
  };

  const sendMessageCommand = new SendMessageCommand(input);
  await sqsClient.send(sendMessageCommand);
  logger.info(
    `[enqueueMessage] SQS | ${params.queueName} | Message enqueued successfully!`,
  );
};
