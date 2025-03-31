import {
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  ScanCommandInput,
  UpdateCommand,
  UpdateCommandInput,
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
import { getEnv } from "@utils/env";
import PromisePool from "@supercharge/promise-pool";
import { getItemsFromSegment } from "@databases/dynamodb/utils";
import { CreateUserBody } from "@services/users/types";

const docClient = getDynamoDBDocumentClient();

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
    return null;
  }

  return user as User;
};

export const getUsersFromDynamoDB = async (
  input: Omit<ScanCommandInput, "TableName" | "TotalSegments" | "Segment"> = {},
) => {
  const scanConcurrency = Number(getEnv("SCAN_CONCURRENCY"));

  const totalItems: Record<string, unknown>[] = [];
  const totalSegments = [...Array(scanConcurrency).keys()];

  await PromisePool.for(totalSegments)
    .withConcurrency(scanConcurrency)
    .process(async (index) => {
      const segmentItems = await getItemsFromSegment(
        docClient,
        DynamoDBTableNames.USERS,
        scanConcurrency,
        index,
        input,
      );
      totalItems.push(...segmentItems);
    });

  return totalItems as User[];
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
    return null;
  }

  return user as User;
};

// ** Write Operations **
export const createUserIntoDynamoDB = (
  input: Omit<PutCommandInput, "TableName"> & { Item: CreateUserBody },
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

export const updateUserIntoDynamoDB = (
  input: Omit<UpdateCommandInput, "TableName"> & { Key: UserPrimaryKey },
) => {
  const updateCommand = new UpdateCommand({
    TableName: DynamoDBTableNames.USERS,
    ConditionExpression: "attribute_exists(contact)",
    ...input,
  });

  return docClient.send(updateCommand);
};
