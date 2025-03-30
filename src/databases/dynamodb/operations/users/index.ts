import {
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBTableNames } from "@databases/dynamodb/constants";
import { getDynamoDBDocumentClient } from "@databases/dynamodb/client";
import { User, UserPrimaryKey } from "@databases/dynamodb/types";

const docClient = getDynamoDBDocumentClient();

const usersTableName = DynamoDBTableNames.USERS;

export const getUserFromDynamoDB = async (
  input: Omit<GetCommandInput, "TableName"> & { Key: UserPrimaryKey },
) => {
  const getCommand = new GetCommand({
    TableName: usersTableName,
    ...input,
  });

  return (await docClient.send(getCommand)).Item;
};

export const createUserIntoDynamoDB = (
  input: Omit<PutCommandInput, "TableName"> & { Item: User },
) => {
  const item = {
    createdAt: new Date().valueOf(),
    ...input.Item,
  };
  const putCommand = new PutCommand({
    TableName: usersTableName,
    ...input,
    Item: item,
  });

  return docClient.send(putCommand);
};
