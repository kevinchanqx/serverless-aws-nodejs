import { logger } from "@utils/logger";
import { makeValidator } from "@utils/validator";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import { updateUserBodySchema, updateUserParamsSchema } from "../schemas";
import { catchErrorHandler } from "@utils/error-handler";
import { updateUser } from "../use-cases";
import _ from "lodash";

export const updateUserController = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResultV2> => {
  logger.info("[updateUserController] Event", event);
  logger.info("[updateUserController] Context", context);

  try {
    const paramsValidator = makeValidator(
      "updateUserParams",
      updateUserParamsSchema,
    );
    const bodyValidator = makeValidator("updateUserBody", updateUserBodySchema);

    const params = paramsValidator.validate(event.pathParameters ?? {});
    const body = bodyValidator.validate(JSON.parse(event.body || "{}"));

    if (_.isEmpty(body)) {
      return {
        statusCode: 422,
        body: JSON.stringify({ message: "Update body is empty!" }),
      };
    }

    await updateUser(params, body);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User updated successfully!" }),
    };
  } catch (err) {
    return catchErrorHandler(err);
  }
};
