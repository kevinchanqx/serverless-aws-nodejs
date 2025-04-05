import { SNSTopic } from "./constant";

export type SNSPublishMessageParams<T> = {
  topic: SNSTopic;
  body: T;
};
