import { DynamoDBConditionExpression } from "../types/expressions.type";

const concatExpressionString = (
  conditionExpression: string | undefined,
  addString: string
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
  conditions: DynamoDBConditionExpression<T>
): string | undefined => {
  let conditionExpression: string | undefined;

  if (conditions.attributeExists?.length) {
    conditions.attributeExists.forEach(
      (condition) =>
        (conditionExpression = concatExpressionString(
          conditionExpression,
          `attribute_exists(${condition})`
        ))
    );
  }

  if (conditions.attributeNotExists?.length) {
    conditions.attributeNotExists.forEach(
      (condition) =>
        (conditionExpression = concatExpressionString(
          conditionExpression,
          `attribute_not_exists(${condition})`
        ))
    );
  }

  if (conditions.customs?.length) {
    conditions.customs.forEach((condition) => {
      conditionExpression = concatExpressionString(
        conditionExpression,
        condition
      );
    });
  }

  return conditionExpression;
};
