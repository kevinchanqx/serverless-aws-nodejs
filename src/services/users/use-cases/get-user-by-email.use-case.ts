import { User } from "@databases/dynamodb/types";
import { GetUserByEmailQuery } from "../types";
import { logger } from "@utils/logger";
import { getUserFromDynamoDBByEmail } from "@databases/dynamodb/operations";

export const getUserByEmail = async (
  queries: GetUserByEmailQuery,
): Promise<User> => {
  logger.info("[getUserByEmail] Executing...");

  const user = await getUserFromDynamoDBByEmail({ email: queries.email });

  return user;
};
