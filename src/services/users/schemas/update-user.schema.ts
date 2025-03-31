import { JSONSchemaType } from "ajv";
import { UpdateUserBody, UpdateUserParams } from "../types";
import { Gender } from "@databases/dynamodb/types";

export const updateUserParamsSchema: JSONSchemaType<UpdateUserParams> = {
  type: "object",
  properties: {
    contact: { type: "string", nullable: false },
  },
  additionalProperties: false,
  required: ["contact"],
};

export const updateUserBodySchema: JSONSchemaType<UpdateUserBody> = {
  type: "object",
  properties: {
    name: { type: "string", nullable: true },
    email: { type: "string", nullable: true },
    age: { type: "number", nullable: true },
    gender: {
      type: "string",
      enum: Object.values(Gender),
      nullable: true,
    },
  },
  additionalProperties: false,
};
