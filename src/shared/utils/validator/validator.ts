import Ajv, { JSONSchemaType } from "ajv";
import { throwError } from "../error-handler";
import { logger } from "../logger";

export const makeValidator = <T>(name: string, schema: JSONSchemaType<T>) => {
  const ajv = new Ajv({ allErrors: true });
  const validator = ajv.compile(schema);

  return {
    validate: (data: unknown): T | never => {
      const valid = validator(data);

      if (!valid) {
        const errors = validator.errors ?? [];
        const formattedErrors = errors.map((err) => ({
          message: err.message,
          field:
            err.instancePath !== ""
              ? err.instancePath.split("/")[1]
              : undefined,
        }));

        logger.info(
          `[${name}Validator] Errors:`,
          JSON.stringify(formattedErrors)
        );

        return throwError({
          statusCode: 422,
          data: formattedErrors,
          message: "Invalid data",
        });
      }

      return data as T;
    },
  };
};
