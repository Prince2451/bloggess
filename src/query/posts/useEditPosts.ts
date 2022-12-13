import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost, uploadCoverImage } from "../../services/posts";
import { Post, PostFormFields } from "../../types/elements/posts";
import postsKeys from "./keys";

function useEditPost() {
  const queryClient = useQueryClient();
  const mutation = useMutation(edit, {
    onSuccess: () => queryClient.invalidateQueries(postsKeys.all),
  });

  async function edit(payload: Partial<PostFormFields> & { id: Post["id"] }) {
    const newPost: Partial<Post> = {};
    if (payload.coverImage?.value) {
      const fd = new FormData();
      fd.append("image", payload.coverImage.value);
      const { data } = await uploadCoverImage(fd);
      newPost.coverImage = {
        base64url: data.base64Url,
        url: data.url,
      };
    }
    if (payload.categories) newPost.categories = [payload.categories];
    if (payload.title) newPost.title = payload.title;
    if (payload.description) newPost.description = payload.description;
    if (payload.tags) newPost.tags = payload.tags;
    if (payload.content) newPost.content = payload.content;
    await editPost({
      ...newPost,
      postId: payload.id,
    });
  }

  return mutation;
}

export default useEditPost;
