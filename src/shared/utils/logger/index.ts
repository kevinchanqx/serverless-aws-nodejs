import { Logger } from "@aws-lambda-powertools/logger";
import { Metrics } from "@aws-lambda-powertools/metrics";
import { Tracer } from "@aws-lambda-powertools/tracer";

export * from "./api.logger";

const lambdaLogger = new Logger();

export const logger = {
  info: (message: string, data?: unknown) =>
    lambdaLogger.info(message, JSON.stringify(data)),
  warn: (message: string, data?: unknown) =>
    lambdaLogger.warn(message, JSON.stringify(data)),
  error: (message: string, data?: unknown) =>
    lambdaLogger.error(message, JSON.stringify(data)),
};
export const metrics = new Metrics();
export const tracer = new Tracer();
