import { SQSQueueName } from "./constant";

export type SQSEnqueueMessageParams<T> = {
  queueName: SQSQueueName;
  body: T;
};
