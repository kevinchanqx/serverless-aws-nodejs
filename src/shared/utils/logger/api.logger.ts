import _ from "lodash";
import {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";
import { logger } from ".";

type InternalClientRequestConfig = InternalAxiosRequestConfig;
type InternalClientResponseConfig = AxiosResponse;
type InternalClientErrorConfig = AxiosError | Error;

export const apiRequestLog =
  (name: string) => async (req: InternalClientRequestConfig) => {
    logger.info(`${name} Request:`, {
      baseUrl: req.baseURL,
      data: req.data,
      headers: req.headers,
      method: req.method,
      params: req.params,
      url: req.url,
    });

    return await Promise.resolve(req);
  };

export const apiResponseLog =
  (name: string) => async (res: InternalClientResponseConfig) => {
    logger.info(`${name} Response:`, {
      status: res.status,
      statusText: res.statusText,
      data: res.data,
    });
    return await Promise.resolve(res);
  };

export const apiErrorHandler =
  (name: string) => async (err: InternalClientErrorConfig) => {
    const error = {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };

    if (isAxiosError(err)) {
      _.set(error, "code", err.code);
      _.set(error, "status", err.status);
      logger.error(`[${name} Axios Error]:`, error);

      return await Promise.reject(err);
    }

    return await Promise.reject(err);
  };
