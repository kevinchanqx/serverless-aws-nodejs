import { User } from "@databases/dynamodb/types";
import { GetUserByEmailQuery } from "../types";
import { logger } from "@utils/logger";
import { getUserFromDynamoDBByEmail } from "@databases/dynamodb";
import { throwError } from "@utils/error-handler";

export const getUserByEmail = async (
  queries: GetUserByEmailQuery,
): Promise<User> => {
  logger.info("[getUserByEmail] Executing...");

  const user = await getUserFromDynamoDBByEmail({ email: queries.email });

  if (!user) {
    return throwError({ statusCode: 404, message: "User not found!" });
  }

  return user;
};
