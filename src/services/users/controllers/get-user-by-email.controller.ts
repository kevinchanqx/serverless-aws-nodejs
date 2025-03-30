import { catchErrorHandler } from "@utils/error-handler";
import { logger } from "@utils/logger";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { getUserByEmailQuerySchema } from "../schemas";
import { makeValidator } from "@utils/validator";
import { getUserByEmail } from "../use-cases/get-user-by-email.use-case";

export const getUserByEmailController = async (
  event: APIGatewayProxyEvent,
  context?: Context,
) => {
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
      statuCode: 200,
      body: JSON.stringify(user),
    };
  } catch (err) {
    return catchErrorHandler(err);
  }
};
