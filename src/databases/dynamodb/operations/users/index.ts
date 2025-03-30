import {
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
} from "@aws-sdk/lib-dynamodb";
import {
  DynamoDBTableNames,
  DynamoDBUsersIndexes,
} from "@databases/dynamodb/constants";
import { getDynamoDBDocumentClient } from "@databases/dynamodb/client";
import {
  User,
  UserEmailIndexPrimaryKey,
  UserPrimaryKey,
} from "@databases/dynamodb/types";
import { throwError } from "@utils/error-handler";

const docClient = getDynamoDBDocumentClient();

// ** Error Handling **
const userNotFound = () =>
  throwError({ statusCode: 404, message: "User not found!" });

// ** Get Operations **
export const getUserFromDynamoDB = async (
  input: Omit<GetCommandInput, "TableName"> & { Key: UserPrimaryKey },
) => {
  const getCommand = new GetCommand({
    TableName: DynamoDBTableNames.USERS,
    ...input,
  });

  const user = (await docClient.send(getCommand)).Item;

  if (!user) {
    return userNotFound();
  }

  return user as User;
};

export const getUserFromDynamoDBByEmail = async (
  input: Omit<
    QueryCommandInput,
    | "TableName"
    | "IndexName"
    | "ExpressionAttributeNames"
    | "ExpressionAttributeValues"
    | "KeyConditionExpression"
  > &
    UserEmailIndexPrimaryKey,
) => {
  const queryCommand = new QueryCommand({
    TableName: DynamoDBTableNames.USERS,
    IndexName: DynamoDBUsersIndexes.EMAIL,
    KeyConditionExpression: "#email = :email",
    ExpressionAttributeNames: {
      "#email": "email",
    },
    ExpressionAttributeValues: {
      ":email": input.email,
    },
    ...input,
  });

  const user = (await docClient.send(queryCommand)).Items?.[0];

  if (!user) {
    return userNotFound();
  }

  return user as User;
};

// ** Write Operations **
export const createUserIntoDynamoDB = (
  input: Omit<PutCommandInput, "TableName"> & { Item: User },
) => {
  const item = {
    createdAt: new Date().valueOf(),
    ...input.Item,
  };
  const putCommand = new PutCommand({
    TableName: DynamoDBTableNames.USERS,
    ...input,
    Item: item,
  });

  return docClient.send(putCommand);
};
