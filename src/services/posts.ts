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

type GetPostReq = {
  postId: Post["id"];
};
type GetPostRes = Post;

type EditPostReq = Partial<Post> & {
  postId: Post["id"];
};
type EditPostRes = Post;

type DeletePostReq = { postId: Post["id"] };
type DeletePostRes = void;

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

function getPost(payload: GetPostReq) {
  return axiosInstance.get<GetPostRes>(apiUrls.posts.single, {
    pathParams: { postId: payload.postId },
  });
}

function editPost({ postId, ...payload }: EditPostReq) {
  return axiosInstance.put<EditPostRes>(apiUrls.posts.edit, payload, {
    pathParams: { postId },
  });
}

function deletePost(payload: DeletePostReq) {
  return axiosInstance.delete<DeletePostRes>(apiUrls.posts.delete, {
    pathParams: { postId: payload.postId },
  });
}

export {
  getPosts,
  createPost,
  uploadCoverImage,
  getPost,
  editPost,
  deletePost,
};
