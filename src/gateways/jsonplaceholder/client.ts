import { getEnv } from "@shared/utils/env";
import { errorHandler, requestLog, responseLog } from "@shared/utils/logger";

import axios, { AxiosInstance } from "axios";

let client: AxiosInstance | undefined;
const gatewayName = "JsonPlaceHolder API";

export const getJsonPlaceHolderClient = () => {
  if (!client) {
    client = axios.create({ baseURL: getEnv("JSONPLACEHOLDER_BASE_URL") });
    client.interceptors.request.use(requestLog(gatewayName));
    client.interceptors.response.use(
      responseLog(gatewayName),
      errorHandler(gatewayName)
    );
    return client;
  }

  return client;
};
