import { SQSEvent } from "aws-lambda";
import { createOrder } from "../use-cases";
import { CreateOrderBody } from "../types";
import { catchErrorHandler } from "@utils/error-handler";
import { logger } from "@utils/logger";

export const createOrderController = async (event: SQSEvent) => {
  logger.info("[createOrderController] Event", event);

  try {
    const records = event.Records;

    const payloads = records.map(
      (record) => JSON.parse(record.body) as CreateOrderBody,
    );

    await createOrder(payloads);
  } catch (err) {
    return catchErrorHandler(err);
  }
};
