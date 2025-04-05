import { catchErrorHandler } from "@utils/error-handler";
import { logger } from "@utils/logger";
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import { getUserByEmailQuerySchema } from "../schemas";
import { makeValidator } from "@utils/validator";
import { getUserByEmail } from "../use-cases/get-user-by-email.use-case";

export const getUserByEmailController = async (
  event: APIGatewayProxyEventV2,
  context?: Context,
): Promise<APIGatewayProxyResultV2> => {
  logger.info("[getUserByEmailController] Event", event);
  logger.info("[getUserByEmailController] Context", context);

  try {
    const queryParams = event.queryStringParameters ?? {};
    const queryValidator = makeValidator(
      "getUserByEmailQuery",
      getUserByEmailQuerySchema,
    );

    const queries = queryValidator.validate(queryParams);

    const user = await getUserByEmail(queries);

    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (err) {
    return catchErrorHandler(err);
  }
};
