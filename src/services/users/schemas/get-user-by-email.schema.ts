import { JSONSchemaType } from "ajv";
import { GetUserByEmailQuery } from "../types";

export const getUserByEmailQuerySchema: JSONSchemaType<GetUserByEmailQuery> = {
  type: "object",
  properties: {
    email: { type: "string", nullable: false },
  },
  required: ["email"],
  additionalProperties: false,
};
