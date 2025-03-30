import { CreateUser } from "../types";
import { logger } from "@shared/utils/logger";
import { throwError } from "@shared/utils/error-handler";
import {
  createUserIntoDynamoDB,
  getUserFromDynamoDB,
} from "@shared/dynamodb/users";
import { makeConditionExpression } from "@databases/dynamodb/utils";
import { UserPrimaryKey } from "@databases/dynamodb/types";

export const createUser = async ({
  contact,
  email,
  gender,
  name,
}: CreateUser) => {
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
