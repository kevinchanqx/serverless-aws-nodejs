import { getUsersFromDynamoDB } from "@databases/dynamodb/operations";
import { logger } from "@utils/logger";

export const getUsers = async () => {
  logger.info("[getUsers] Executing...");

  const users = await getUsersFromDynamoDB();

  return users;
};
