import { AxiosError } from "axios";

const getErrorMessage = (
  err: AxiosError<any>,
  fallback: string = "Something went wrong"
) => {
  return err?.response?.data?.message || fallback;
};

export { getErrorMessage };
