import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import { retrievePosts } from "../use-cases/retrieve-posts.use-case";

export const retrievePostsController = async (
  event: APIGatewayProxyEvent,
  context?: Context
): Promise<APIGatewayProxyResultV2> => {
  console.log("[retrievePostsController] Event", event);
  console.log("[retrievePostsController] Context", context);
  const posts = await retrievePosts();

  return { statusCode: 200, body: JSON.stringify(posts, null, 2) };
};
