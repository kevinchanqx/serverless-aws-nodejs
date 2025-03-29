import { APIGatewayProxyResultV2 } from "aws-lambda";
import { HttpStatusCode } from "axios";
import { logger } from "../logger";

export type ThrownErrorPayload = {
  statusCode: HttpStatusCode;
  data?: Record<string, unknown> | unknown[];
  message: string;
};

export const throwError = ({
  statusCode,
  data,
  message,
}: ThrownErrorPayload) => {
  logger.error("[ThrownError]", {
    statusCode,
    data,
    message,
  });

  throw { statusCode, data, message };
};

export const isThrownError = (error: unknown): error is ThrownErrorPayload => {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    "message" in error
  );
};

export const catchErrorHandler = (err: unknown): APIGatewayProxyResultV2 => {
  if (isThrownError(err)) {
    return {
      statusCode: err.statusCode,
      body: JSON.stringify({ message: err.message, data: err.data }),
    };
  }

  if (err instanceof Error) {
    logger.error("[Error]", {
      message: err.message,
      stack: err.stack,
      name: err.name,
    });
    return {
      statusCode: 500,
      body: JSON.stringify({ message: err.message }),
    };
  }

  logger.error("[Unknown Error]", err);
  return {
    statusCode: 500,
    body: JSON.stringify({ message: "Internal Server Error" }),
  };
};
