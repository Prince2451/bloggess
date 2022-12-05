import { Post } from "../types/elements/posts";
import { PaginatedResponse } from "../types/utils";
import { axiosInstance } from "../utils";
import apiUrls from "./apiUrls";

interface GetPostsReq {
  page: number;
  size: number;
}

type GetPostsRes = PaginatedResponse<Post>;

function getPosts(payload: GetPostsReq) {
  return axiosInstance.get<GetPostsRes>(apiUrls.posts.all, {
    params: payload,
  });
}

export { getPosts };
