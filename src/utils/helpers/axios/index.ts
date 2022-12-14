import { AxiosError } from "axios";

const getErrorMessage = (err: unknown, fallback = "Something went wrong") => {
  let errMsg = "";
  if (err instanceof AxiosError) {
    errMsg =
      err?.response?.data?.message || getErrorMessage(err?.response?.data);
  } else if (Array.isArray(err) && err.length) {
    errMsg = err[0].msg;
  } else if (typeof err === "string" || typeof err === "number") {
    errMsg = err.toString();
  }
  return errMsg || fallback;
};

export { getErrorMessage };
