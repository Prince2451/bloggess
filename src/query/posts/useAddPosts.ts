import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, uploadCoverImage } from "../../services/posts";
import { PostFormFields } from "../../types/elements/posts";
import postsKeys from "./keys";

function useAddPosts() {
  const queryClient = useQueryClient();
  const mutation = useMutation(create, {
    onSuccess: () => queryClient.invalidateQueries(postsKeys.all),
  });

  async function create(payload: PostFormFields) {
    const fd = new FormData();
    if (!payload.coverImage.value) throw new Error("Image not uploaded");
    fd.append("image", payload.coverImage.value);
    const { data } = await uploadCoverImage(fd);
    await createPost({
      title: payload.title,
      content: payload.content,
      coverImage: {
        base64url: data.base64Url,
        url: data.url,
      },
      description: payload.description,
      tags: payload.tags,
      categories: [payload.categories],
    });
  }

  return mutation;
}

export default useAddPosts;
