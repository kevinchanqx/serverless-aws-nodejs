import { enqueueMessage, SQSQueueName } from "@shared/sqs";
import { CreateOrderBody } from "../types";

export const enqueueCreateOrder = (body: CreateOrderBody) => {
  return enqueueMessage<CreateOrderBody>({
    queueName: SQSQueueName.CREATE_ORDER,
    body,
  });
};
