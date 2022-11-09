import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getUser } from "../../services/auth";
import authKeys from "./keys";

function useUser(
  config: UseQueryOptions<
    Awaited<ReturnType<typeof getUserData>>,
    unknown,
    Awaited<ReturnType<typeof getUserData>>,
    typeof authKeys.user
  >
) {
  const data = useQuery(authKeys.user, getUserData, config);

  async function getUserData() {
    const { data } = await getUser();
    return data;
  }

  return {
    user: data.data,
    isAuthenticated: !!data.data,
    ...data,
  };
}

export default useUser;
