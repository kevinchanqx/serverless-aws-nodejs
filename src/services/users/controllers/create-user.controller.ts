import _ from "lodash";
import { catchErrorHandler } from "@utils/error-handler";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import { createUser } from "../use-cases";
import { createUserBodySchema } from "../schemas";
import { makeValidator } from "@utils/validator";
import { logger } from "@utils/logger";

export const createUserController = async (
  event: APIGatewayProxyEvent,
  context?: Context,
): Promise<APIGatewayProxyResultV2> => {
  logger.info("[createUserController] Event", event);
  logger.info("[createUserController] Context", context);

  try {
    const parsedBody = JSON.parse(event.body || "{}");
    const createUserBodyValidator = makeValidator(
      "createUserBody",
      createUserBodySchema,
    );

    const body = createUserBodyValidator.validate(parsedBody);

    await createUser(body);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User created successfully!" }),
    };
  } catch (err) {
    return catchErrorHandler(err);
  }
};
