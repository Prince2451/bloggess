import { User } from "../types/elements/auth";
import { axiosInstance } from "../utils";
import apiUrls from "./apiUrls";

interface LoginRequest {
  email: string;
  password: string;
}
interface LoginResponse {
  token: string;
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
type GetUserResponse = User;

function login(payload: LoginRequest) {
  return axiosInstance.post<LoginResponse>(apiUrls.auth.login, payload);
}

function register(payload: RegisterRequest) {
  return axiosInstance.post<RegisterResponse>(apiUrls.auth.register, payload);
}

function getUser() {
  return axiosInstance.get<GetUserResponse>(apiUrls.auth.user);
}

export { login, register, getUser };
