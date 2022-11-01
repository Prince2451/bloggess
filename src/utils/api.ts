import axios, { AxiosError } from "axios";
import apiUrls from "../services/apiUrls";
import { useAuthStore } from "../stores";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    document.cookie = "";
    const token = useAuthStore.getState().user?.accessToken;
    config.headers = config.headers || {};
    if (token && !config.headers["Authorization"]) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (config.pathParams && config.url) {
      Object.keys(config.pathParams).forEach((key) => {
        config.url = config.url?.replace(
          ":" + key,
          config.pathParams![key].toString()
        );
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
        const refreshToken = useAuthStore.getState().user?.refreshToken;
        if (!refreshToken) throw new Error("Refresh token doesn't exists");
        const res = await axios.post<{ token: string }>(
          apiUrls.auth.refreshToken,
          {
            refreshToken,
          }
        );

        if (res.status === 200) {
          const token = res.data.token;
          if (token) {
            useAuthStore
              .getState()
              .setUser({ accessToken: token, refreshToken });
            req.headers = req.headers || {};
            req.headers["Authorization"] = "Bearer " + token;
            return axiosInstance(req);
          }
        }
      } catch {
        useAuthStore.getState().setUser(null);
        return { data: null };
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
