import { logger } from "@utils/logger";
import { SQSEvent } from "aws-lambda";
import { mockSendEmail } from "../use-cases";

export const mockSendEmailController = async (event: SQSEvent) => {
  logger.info("[mockSendEmailController] Event", event);

  mockSendEmail();
};
