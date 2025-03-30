import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import { retrievePosts } from "../use-cases/retrieve-posts.use-case";
import { catchErrorHandler } from "@utils/error-handler";
import { logger } from "@utils/logger";

export const retrievePostsController = async (
  event: APIGatewayProxyEvent,
  context?: Context,
): Promise<APIGatewayProxyResultV2> => {
  logger.info("[retrievePostsController] Event", event);
  logger.info("[retrievePostsController] Context", context);

  try {
    const posts = await retrievePosts();

    return { statusCode: 200, body: JSON.stringify(posts) };
  } catch (err) {
    return catchErrorHandler(err);
  }
};
