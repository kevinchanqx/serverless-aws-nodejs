export enum SQSQueueName {
  MOCK_SEND_EMAIL = "mock-send-email-queue",
}

export type SQSEnqueueMessageParams<T> = {
  queueName: SQSQueueName;
  body: T;
};
