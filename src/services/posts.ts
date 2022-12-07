import { Post } from "../types/elements/posts";
import { PaginatedResponse } from "../types/utils";
import { axiosInstance } from "../utils";
import apiUrls from "./apiUrls";

interface GetPostsReq {
  page: number;
  size: number;
}
type GetPostsRes = PaginatedResponse<Post>;

type CreatePostReq = Omit<Post, "slug" | "id" | "createdAt" | "updatedAt">;
type CreatePostRes = Post;

type UploadCoverImageReq = FormData;
type UploadCoverImageRes = {
  url: string;
  base64Url: string;
};

function getPosts(payload: GetPostsReq) {
  return axiosInstance.get<GetPostsRes>(apiUrls.posts.all, {
    params: payload,
  });
}

function createPost(payload: CreatePostReq) {
  return axiosInstance.post<CreatePostRes>(apiUrls.posts.create, payload);
}

function uploadCoverImage(payload: UploadCoverImageReq) {
  return axiosInstance.post<UploadCoverImageRes>(
    apiUrls.posts.uploadCoverImage,
    payload
  );
}

export { getPosts, createPost, uploadCoverImage };
