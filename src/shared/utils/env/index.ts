import { EnvKey } from "./env.constant";

export const getEnv = (key: EnvKey) => {
  const value = process.env[key];

  if (!value || value == null) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};
