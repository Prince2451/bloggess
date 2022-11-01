import { axiosInstance } from "../utils";
import apiUrls from "./apiUrls";

interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}
interface RegisterResponse {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

function login(payload: LoginRequest) {
  return axiosInstance.post<LoginResponse>(apiUrls.auth.login, payload);
}

function register(payload: RegisterRequest) {
  return axiosInstance.post<RegisterResponse>(apiUrls.auth.register, payload);
}

export { login, register };
