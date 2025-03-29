import { JSONSchemaType } from "ajv";
import { CreateUser } from "../types";

export const createUserBodySchema: JSONSchemaType<CreateUser> = {
  type: "object",
  properties: {
    contact: { type: "number", nullable: false },
    email: { type: "string", nullable: false },
    gender: { type: "string", nullable: false, enum: ["Male", "Female"] },
    name: { type: "string", nullable: false },
    age: { type: "number", nullable: true },
  },
  required: ["contact", "email", "gender", "name"],
  additionalProperties: false,
};
