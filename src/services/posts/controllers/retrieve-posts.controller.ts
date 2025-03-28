import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import { retrievePosts } from "../use-cases/retrieve-posts.use-case";
import { catchErrorHandler } from "@shared/utils/error-handler";

export const retrievePostsController = async (
  event: APIGatewayProxyEvent,
  context?: Context
): Promise<APIGatewayProxyResultV2<{ id: number; name: string }>> => {
  console.log("[retrievePostsController] Event", event);
  console.log("[retrievePostsController] Context", context);

  try {
    const posts = await retrievePosts();

    return { statusCode: 200, body: JSON.stringify(posts, null, 2) };
  } catch (err) {
    return catchErrorHandler(err);
  }
};
