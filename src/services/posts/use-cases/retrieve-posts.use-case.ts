import _ from "lodash";
import { retrievePostsApi } from "@gateways/jsonplaceholder/api";

export const retrievePosts = async () => {
  const response = await retrievePostsApi();

  const posts = response.data;

  return posts;
};
