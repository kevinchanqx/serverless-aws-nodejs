import { CreateUser } from "../types";
import { getDynamoDBDocumentClient } from "../../../databases/dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBTableNames } from "../../../databases/dynamodb/constants";
import { logger } from "@shared/utils/logger";

export const createUser = async ({
  contact,
  email,
  gender,
  name,
}: CreateUser) => {
  logger.info("[createUser] Start");

  const docClient = getDynamoDBDocumentClient();
  const putCommand = new PutCommand({
    TableName: DynamoDBTableNames.USERS,
    Item: {
      contact,
      email,
      gender,
      name,
    },
  });

  logger.info("[createUser] Creating user...");
  await docClient.send(putCommand);

  logger.info("[createUser] User creation done!");
};
