import axios, { AxiosError } from "axios";
import apiUrls from "../services/apiUrls";
import { useAuthStore } from "../stores";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    document.cookie = "";
    const token = useAuthStore.getState().authDetails?.accessToken;
    config.headers = config.headers || {};
    if (token && !config.headers["Authorization"]) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (config.pathParams && config.url) {
      Object.entries(config.pathParams).forEach(([key, value]) => {
        config.url = config.url?.replace(":" + key, value.toString());
      });
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err: AxiosError) => {
    const req = err.config;
    if (err.response?.status === 401 && req) {
      try {
        const refreshToken = useAuthStore.getState().authDetails?.refreshToken;
        if (!refreshToken) throw new Error("Refresh token doesn't exists");
        const res = await axios.post<{ token: string }>(
          apiUrls.auth.refreshToken,
          { refreshToken },
          { baseURL: process.env.NEXT_PUBLIC_API_BASE_URL }
        );

        if (res.status === 200) {
          const token = res.data.token;
          if (token) {
            useAuthStore
              .getState()
              .setAuthDetails({ accessToken: token, refreshToken });
            req.headers = req.headers || {};
            req.headers["Authorization"] = "Bearer " + token;
            return axiosInstance(req);
          }
        }
      } catch {
        useAuthStore.getState().setAuthDetails(null);
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);

export { axiosInstance };
