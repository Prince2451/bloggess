import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    pathParams?: Record<string, string | number>;
  }
}
