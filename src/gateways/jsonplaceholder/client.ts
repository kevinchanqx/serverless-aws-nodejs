import { getEnv } from "@shared/utils/env";
import {
  apiErrorHandler,
  apiRequestLog,
  apiResponseLog,
} from "@shared/utils/logger";

import axios, { AxiosInstance } from "axios";

let client: AxiosInstance | undefined;
const gatewayName = "JsonPlaceHolder API";

export const getJsonPlaceHolderClient = () => {
  if (!client) {
    client = axios.create({ baseURL: getEnv("JSONPLACEHOLDER_BASE_URL") });
    client.interceptors.request.use(apiRequestLog(gatewayName));
    client.interceptors.response.use(
      apiResponseLog(gatewayName),
      apiErrorHandler(gatewayName)
    );
    return client;
  }

  return client;
};
