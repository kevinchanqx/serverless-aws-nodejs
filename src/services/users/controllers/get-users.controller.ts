import { logger } from "@utils/logger";
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import { getUsers } from "../use-cases";

export const getUsersController = async (
  event: APIGatewayProxyEventV2,
  context: Context,
): Promise<APIGatewayProxyResultV2> => {
  logger.info("[getUsersController] Event", event);
  logger.info("[getUsersController] Context", context);

  const users = await getUsers();

  return {
    statusCode: 200,
    body: JSON.stringify(users),
  };
};
