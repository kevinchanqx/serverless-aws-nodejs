import { JSONSchemaType } from "ajv";
import { CreateUser } from "../types";

export const createUserBodySchema: JSONSchemaType<CreateUser> = {
  type: "object",
  properties: {
    contact: { type: "string", nullable: false },
    email: { type: "string", nullable: false },
    gender: { type: "string", nullable: false, enum: ["Male", "Female"] },
    name: { type: "string", nullable: false },
    age: { type: "number", nullable: true },
  },
  required: ["contact", "gender", "email", "name"],
  additionalProperties: false,
};
