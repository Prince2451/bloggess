import axiosInstance from "../utils/api";
import apiUrls from "./apiUrls";

interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

function login(payload: LoginRequest) {
  return axiosInstance.post<LoginResponse>(apiUrls.auth.login, payload);
}

export { login };
