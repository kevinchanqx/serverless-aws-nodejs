import {
  DynamoDBDocumentClient,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBTableNames } from "@databases/dynamodb/constants";

export const getItemsFromSegment = async (
  docClient: DynamoDBDocumentClient,
  tableName: DynamoDBTableNames,
  totalSegments: number,
  segmentIndex: number,
  input: Omit<ScanCommandInput, "TableName" | "TotalSegments" | "Segment">,
) => {
  const segmentItems = [];
  let exclusiveStartKey;

  const segmentParams: ScanCommandInput = {
    TableName: tableName,
    TotalSegments: totalSegments,
    Segment: segmentIndex,
    Limit: 2,
    ...input,
  };

  do {
    if (exclusiveStartKey) {
      segmentParams.ExclusiveStartKey = exclusiveStartKey;
    }

    const scanCommand = new ScanCommand(segmentParams);

    const { Items = [], LastEvaluatedKey } = await docClient.send(scanCommand);
    segmentItems.push(...Items);

    exclusiveStartKey = LastEvaluatedKey;
  } while (exclusiveStartKey);

  return segmentItems;
};
