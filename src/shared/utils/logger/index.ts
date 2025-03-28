import { Logger } from "@aws-lambda-powertools/logger";
import { Metrics } from "@aws-lambda-powertools/metrics";
import { Tracer } from "@aws-lambda-powertools/tracer";

export * from "./api.logger";

export const logger = new Logger();
export const metrics = new Metrics();
export const tracer = new Tracer();
