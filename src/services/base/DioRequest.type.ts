import type { AxiosRequestConfig, AxiosResponse } from "axios";

interface Interceptable {
  interceptors?: {
    request?: {
      success?: (config: AxiosRequestConfig) => AxiosRequestConfig;
      fail?: (error: any) => any;
    };
    response?: {
      success?: (res: AxiosResponse) => AxiosResponse;
      fail?: (error: any) => any;
    };
  };
}

type requestConfig = AxiosRequestConfig & Interceptable;

export { requestConfig };
