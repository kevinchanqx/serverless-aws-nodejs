import { SNSEvent } from "aws-lambda";
import { createOrderSubscriber } from "../use-cases";
import { logger } from "@utils/logger";
import { catchErrorHandler } from "@utils/error-handler";
import { CreateOrderSubscriberPayload } from "../types";

export const createOrderSubscriberController = async (event: SNSEvent) => {
  logger.info("[createOrderSubscriber] Event", event);

  const records = event.Records;

  const payloads = records.map(
    (record) => JSON.parse(record.Sns.Message) as CreateOrderSubscriberPayload,
  );

  try {
    await createOrderSubscriber(payloads);
  } catch (err) {
    return catchErrorHandler(err);
  }
};
