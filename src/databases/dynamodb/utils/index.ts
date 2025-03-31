import _ from "lodash";
import { DynamoDBConditionExpression } from "../types/expressions.type";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  ScanCommandInput,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBTableNames } from "@databases/dynamodb/constants";

const concatExpressionString = (
  conditionExpression: string | undefined,
  addString: string,
) => {
  let newConditionExpression = conditionExpression;
  if (newConditionExpression) {
    newConditionExpression += ` AND ${addString}`;
    return newConditionExpression;
  }

  newConditionExpression = addString;
  return newConditionExpression;
};

export const makeConditionExpression = <T>(
  conditions: DynamoDBConditionExpression<T>,
): string | undefined => {
  let conditionExpression: string | undefined;

  if (conditions.attributeExists?.length) {
    conditions.attributeExists.forEach(
      (condition) =>
        (conditionExpression = concatExpressionString(
          conditionExpression,
          `attribute_exists(${condition})`,
        )),
    );
  }

  if (conditions.attributeNotExists?.length) {
    conditions.attributeNotExists.forEach(
      (condition) =>
        (conditionExpression = concatExpressionString(
          conditionExpression,
          `attribute_not_exists(${condition})`,
        )),
    );
  }

  if (conditions.customs?.length) {
    conditions.customs.forEach((condition) => {
      conditionExpression = concatExpressionString(
        conditionExpression,
        condition,
      );
    });
  }

  return conditionExpression;
};

export const makeExpressionAttributeNames = (
  fields: string[],
): Record<string, string> => {
  let expressionAttributeNames = {};

  fields.forEach((field) =>
    _.set(expressionAttributeNames, `#${field}`, field),
  );

  return expressionAttributeNames;
};

export const makeExpressionAttributeValues = (
  obj: Record<string, unknown>,
): Record<string, unknown> => {
  let expressionAttributeValues = {};

  Object.keys(obj).forEach((key) => {
    _.set(expressionAttributeValues, `:${key}`, obj[key]);
  });

  return expressionAttributeValues;
};

export const makeUpdateExpression = (obj: Record<string, unknown>): string => {
  if (_.isEmpty(obj)) {
    return "";
  }

  let updateExpression = "SET ";

  Object.keys(obj).forEach((key) => {
    updateExpression += `#${key} = :${key},`;
  });

  if (updateExpression === "SET ") {
    return "";
  }

  return updateExpression.slice(0, -1);
};

export const constructUpdateObject = <T>(
  original: T,
  update: Partial<T>,
): T => {
  const _update = _.omitBy(update, _.isUndefined);

  return {
    ...original,
    ..._update,
  };
};

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
