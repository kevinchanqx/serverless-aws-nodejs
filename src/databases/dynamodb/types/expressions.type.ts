export type DynamoDBConditionExpression<T> = {
  attributeNotExists?: T[];
  attributeExists?: T[];
  customs?: string[];
};
