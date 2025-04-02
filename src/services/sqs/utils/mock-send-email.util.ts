import { enqueueMessage, SQSQueueName } from "@shared/sqs";
import { MockSendEmailBody } from "../types";

export const enqueueMockSendEmail = (body: MockSendEmailBody) => {
  return enqueueMessage<MockSendEmailBody>({
    queueName: SQSQueueName.MOCK_SEND_EMAIL,
    body,
  });
};
