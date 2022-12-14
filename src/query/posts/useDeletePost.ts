import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../services/posts";
import postsKeys from "./keys";

function useDeletePost() {
  const queryClient = useQueryClient();
  const mutation = useMutation(deletePost, {
    onSuccess: () => queryClient.invalidateQueries(postsKeys.all),
  });

  return mutation;
}

export default useDeletePost;
