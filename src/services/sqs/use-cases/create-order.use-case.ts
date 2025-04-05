import { createOrderIntoDynamoDB } from "@databases/dynamodb";
import { logger } from "@utils/logger";
import { CreateOrderBody } from "../types";
import PromisePool from "@supercharge/promise-pool";

export const createOrder = async (payloads: CreateOrderBody[]) => {
  logger.info("[createOrder] Executing...");

  await PromisePool.for(payloads)
    .withConcurrency(2)
    .process(async (body) => {
      const { contact, orderAmount, orderId, orderName } = body;

      await createOrderIntoDynamoDB({
        Item: { contact, orderAmount, orderId, orderName },
      });

      logger.info("[createOrder] Order creation successfully!", orderId);
    });
};
