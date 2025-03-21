import { logger } from "@shared/utils/logger";
import { APIGatewayProxyEvent, Context } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent,
  context?: Context
) => {
  logger.info("Ping!");
  logger.info("Event", JSON.stringify(event, null, 2));
  logger.info("Context", JSON.stringify(context, null, 2));

  return {
    statusCode: 200,
    body: "Ping successfully!",
  };
};
