import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getPosts } from "../../services/posts";
import postsKeys from "./keys";

type Options = Parameters<typeof getPosts>[0];
export type UsePostsOptions = Options;

function usePosts(
  options: UsePostsOptions,
  config?: UseQueryOptions<
    Awaited<ReturnType<typeof getPostsData>>,
    unknown,
    Awaited<ReturnType<typeof getPostsData>>,
    typeof postsKeys.all
  >
) {
  const { data, ...rest } = useQuery(postsKeys.all, getPostsData, config);

  async function getPostsData() {
    const { data } = await getPosts(options);
    return data;
  }

  return {
    posts: data?.data || [],
    totalCount: data?.totalLength || 0,
    totalPage: data?.totalPage || 1,
    ...rest,
  };
}

export default usePosts;
