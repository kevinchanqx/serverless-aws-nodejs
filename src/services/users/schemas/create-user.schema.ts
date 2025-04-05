import { JSONSchemaType } from "ajv";
import { CreateUserBody } from "../types";
import { Gender } from "@databases/dynamodb";

export const createUserBodySchema: JSONSchemaType<CreateUserBody> = {
  type: "object",
  properties: {
    contact: { type: "string", nullable: false },
    email: { type: "string", nullable: false },
    gender: { type: "string", nullable: false, enum: Object.values(Gender) },
    name: { type: "string", nullable: false },
    age: { type: "number", nullable: true },
  },
  required: ["contact", "gender", "email", "name"],
  additionalProperties: false,
};
