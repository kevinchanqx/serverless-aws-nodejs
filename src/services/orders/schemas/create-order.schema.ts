import { JSONSchemaType } from "ajv";
import { CreateOrderBody } from "../types/create-order.type";

export const createOrderBodySchema: JSONSchemaType<CreateOrderBody> = {
  type: "object",
  properties: {
    contact: {
      type: "string",
      nullable: false,
    },
    orderAmount: {
      type: "number",
      nullable: false,
    },
    orderName: {
      type: "string",
      nullable: false,
    },
  },
  required: ["contact", "orderAmount", "orderName"],
  additionalProperties: false,
};
