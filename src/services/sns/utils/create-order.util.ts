import { publishMessage, SNSTopic } from "@shared/sns";
import { CreateOrderSubscriberPayload } from "../types";
import { CreateOrderBody } from "@services/sqs/types";

export const publishCreateOrderMessage = async (body: CreateOrderBody) => {
  return publishMessage<CreateOrderSubscriberPayload>({
    topic: SNSTopic.CREATE_ORDER,
    body,
  });
};
