import { logger } from "@utils/logger";
import { UpdateUserBody, UpdateUserParams } from "../types";
import {
  getUserFromDynamoDB,
  updateUserIntoDynamoDB,
} from "@databases/dynamodb/operations";
import { throwError } from "@utils/error-handler";
import {
  UserNonNullishFields,
  UserPrimaryKey,
} from "@databases/dynamodb/types";
import _ from "lodash";
import { capitalizeFirstLetter } from "@utils/string";
import {
  makeConditionExpression,
  makeExpressionAttributeNames,
  makeExpressionAttributeValues,
  makeUpdateExpression,
} from "@databases/dynamodb/utils";

export const updateUser = async (
  params: UpdateUserParams,
  body: UpdateUserBody,
) => {
  logger.info("[updateUser] Executing...");

  const { contact } = params;

  const user = await getUserFromDynamoDB({ Key: { contact } });

  if (!user) {
    return throwError({ statusCode: 404, message: "User is not found!" });
  }

  let errorMessage = "";
  const nonNullishFields: (keyof UserNonNullishFields)[] = [
    "email",
    "gender",
    "name",
  ];

  nonNullishFields.forEach((field) => {
    if (!_.isUndefined(body[field]) && _.isNull(body[field])) {
      errorMessage += `${capitalizeFirstLetter(field)} cannot be null. `;
    }
  });

  if (errorMessage !== "") {
    return throwError({
      statusCode: 422,
      message: errorMessage,
    });
  }

  await updateUserIntoDynamoDB({
    Key: { contact },
    UpdateExpression: makeUpdateExpression(body),
    ConditionExpression: makeConditionExpression<keyof UserPrimaryKey>({
      attributeExists: ["contact"],
    }),
    ExpressionAttributeNames: makeExpressionAttributeNames(Object.keys(body)),
    ExpressionAttributeValues: makeExpressionAttributeValues(body),
  });
};
