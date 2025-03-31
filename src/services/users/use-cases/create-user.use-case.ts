import { CreateUserBody } from "../types";
import { logger } from "@utils/logger";
import { throwError } from "@utils/error-handler";
import {
  createUserIntoDynamoDB,
  getUserFromDynamoDB,
} from "@databases/dynamodb/operations";
import { makeConditionExpression } from "@databases/dynamodb/utils";
import { UserPrimaryKey } from "@databases/dynamodb/types";

export const createUser = async ({
  contact,
  email,
  gender,
  name,
}: CreateUserBody) => {
  logger.info("[createUser] Executing...");

  const user = await getUserFromDynamoDB({ Key: { contact } });
  logger.info("[createUser] User retrieved:", user);

  if (user) {
    return throwError({
      statusCode: 400,
      message: "User with the same contact is already existed!",
    });
  }

  await createUserIntoDynamoDB({
    Item: { contact, email, gender, name },
    ConditionExpression: makeConditionExpression<keyof UserPrimaryKey>({
      attributeNotExists: ["contact"],
    }),
  });
  logger.info("[createUser] User creation done!");
};
