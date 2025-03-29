import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, TranslateConfig } from "@aws-sdk/lib-dynamodb";
import { getEnv } from "@shared/utils/env";

let dynamoDBClient: DynamoDBClient | undefined;
const dynamoDBClientConfig: DynamoDBClientConfig = {
  region: getEnv("AWS_REGION"),
};

const getDynamoDBClient = () => {
  if (!dynamoDBClient) {
    dynamoDBClient = new DynamoDBClient(dynamoDBClientConfig);
    return dynamoDBClient;
  }

  return dynamoDBClient;
};

let dynamoDBDocClient: DynamoDBDocumentClient | undefined;
const translateConfig: TranslateConfig = {
  marshallOptions: { removeUndefinedValues: true },
};

export const getDynamoDBDocumentClient = () => {
  if (!dynamoDBDocClient) {
    const dynamoDBClient = getDynamoDBClient();
    const dynamoDBDocumentClient = DynamoDBDocumentClient.from(
      dynamoDBClient,
      translateConfig
    );
    return dynamoDBDocumentClient;
  }

  return dynamoDBDocClient;
};
