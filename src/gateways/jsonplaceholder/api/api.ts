import { getJsonPlaceHolderClient } from "../client";

const client = getJsonPlaceHolderClient();

export const retrievePostsApi = () => {
  return client.get("/posts");
};
