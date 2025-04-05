import { publishMessage, SNSTopic } from "@shared/sns";
import { CreateOrderSubscriberPayload } from "../types";

export const publishCreateOrderMessage = async (
  payload: CreateOrderSubscriberPayload,
) => {
  return publishMessage<CreateOrderSubscriberPayload>({
    topic: SNSTopic.CREATE_ORDER,
    body: payload,
  });
};
