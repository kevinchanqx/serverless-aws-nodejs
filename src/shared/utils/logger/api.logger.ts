import _ from "lodash";
import {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";

type InternalClientRequestConfig = InternalAxiosRequestConfig;
type InternalClientResponseConfig = AxiosResponse;
type InternalClientErrorConfig = AxiosError | Error;

export const requestLog =
  (name: string) => async (req: InternalClientRequestConfig) => {
    console.log(`${name} Request:`, {
      baseUrl: req.baseURL,
      data: req.data,
      headers: req.headers,
      method: req.method,
      params: req.params,
      url: req.url,
    });

    return await Promise.resolve(req);
  };

export const responseLog =
  (name: string) => async (res: InternalClientResponseConfig) => {
    console.log(`${name} Response:`, {
      status: res.status,
      statusText: res.statusText,
      data: res.data,
    });
    return await Promise.resolve(res);
  };

export const errorHandler =
  (name: string) => async (err: InternalClientErrorConfig) => {
    const error = {
      name: err.name,
      message: err.message,
      stack: err.stack,
    };

    if (isAxiosError(err)) {
      _.set(error, "code", err.code);
      _.set(error, "status", err.status);
      console.error(`[${name} Axios Error]:`, error);

      return await Promise.reject(err);
    }

    console.error(`[${name} Error]:`, error);
    return await Promise.reject(err);
  };
