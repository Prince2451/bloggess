import { UsePostOptions } from "./usePost";

const postsKeys = {
  all: ["Posts"] as const,
  single: (options: UsePostOptions) => [postsKeys.all, options] as const,
};

export default postsKeys;
