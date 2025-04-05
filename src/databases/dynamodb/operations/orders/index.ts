import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { getDynamoDBDocumentClient } from "@databases/dynamodb/client";
import { DynamoDBTableNames } from "@databases/dynamodb/constants";
import { CreateOrderBody } from "@services/sqs/types";

const docClient = getDynamoDBDocumentClient();

// ** Write Operations **
export const createOrderIntoDynamoDB = async (
  input: Omit<PutCommandInput, "TableName"> & { Item: CreateOrderBody },
) => {
  const putCommand = new PutCommand({
    TableName: DynamoDBTableNames.ORDERS,
    Item: input.Item,
  });

  return docClient.send(putCommand);
};
