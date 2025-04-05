import { logger } from "@utils/logger";
import { CreateOrderBody } from "../types";
import { publishCreateOrderMessage } from "@services/sns/utils";

export const createOrder = async (body: CreateOrderBody) => {
  logger.info("[createOrder] Executing...");

  // Any kind of data massaging before sending for order creation can be done here
  const orderData = {
    ...body,
  };

  await publishCreateOrderMessage(orderData);
  logger.info("[createOrder] Order creation message published successfully!");
};
