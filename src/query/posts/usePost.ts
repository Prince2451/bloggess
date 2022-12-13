import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPost } from "../../services/posts";
import postsKeys from "./keys";

type Options = Parameters<typeof getPost>[0];
export type UsePostOptions = Options;

function usePost(
  options: UsePostOptions,
  config?: UseQueryOptions<
    Awaited<ReturnType<typeof getPostData>>,
    unknown,
    Awaited<ReturnType<typeof getPostData>>,
    ReturnType<typeof postsKeys.single>
  >
) {
  const { data, ...rest } = useQuery(
    postsKeys.single(options),
    getPostData,
    config
  );

  async function getPostData() {
    const { data } = await getPost(options);
    return data;
  }

  return {
    post: data,
    ...rest,
  };
}

export default usePost;
