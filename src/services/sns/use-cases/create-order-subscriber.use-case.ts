import { logger } from "@utils/logger";
import { CreateOrderSubscriberPayload } from "../types";
import { v4 as uuidv4 } from "uuid";
import PromisePool from "@supercharge/promise-pool";
import { enqueueCreateOrder } from "@services/sqs/utils";

export const createOrderSubscriber = async (
  payloads: CreateOrderSubscriberPayload[],
) => {
  logger.info("[createOrderSubscriber] Executing...");

  await PromisePool.for(payloads)
    .withConcurrency(2)
    .process(async (payload) => {
      const uniqueId = uuidv4();
      const orderId = `order-${uniqueId}`;
      const { contact, orderAmount, orderName } = payload;

      await enqueueCreateOrder({
        contact,
        orderAmount,
        orderId,
        orderName,
      });

      logger.info(
        "[createOrderSubscriber] Create order message enqueued successfull!",
        orderId,
      );
    });
};
