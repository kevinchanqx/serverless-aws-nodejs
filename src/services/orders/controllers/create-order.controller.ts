import { logger } from "@utils/logger";
import { makeValidator } from "@utils/validator";
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";
import { createOrderBodySchema } from "../schemas";
import { catchErrorHandler } from "@utils/error-handler";
import { createOrder } from "../use-cases";

export const createOrderController = async (
  event: APIGatewayProxyEventV2,
  context: Context,
): Promise<APIGatewayProxyResultV2> => {
  logger.info("[createOrderController] Event:", event);
  logger.info("[createOrderController] Context:", context);

  try {
    const parsedBody = JSON.parse(event.body || "{}");
    const createOrderBodyValidator = makeValidator(
      "createOrderBody",
      createOrderBodySchema,
    );

    const body = createOrderBodyValidator.validate(parsedBody);

    await createOrder(body);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Order created successfully" }),
    };
  } catch (err) {
    return catchErrorHandler(err);
  }
};
