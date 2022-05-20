import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import type { requestConfig } from "./DioRequest.type";

class DioRequest {
  private readonly instance: AxiosInstance;

  constructor(config: requestConfig) {
    let interceptors = null;
    if ((interceptors = config.interceptors)) {
      Reflect.deleteProperty(config, "interceptors");
    }
    this.instance = axios.create(config);

    //1.单个具体某个实例所特有的拦截操作
    this.instance.interceptors.request.use(
      interceptors?.request?.success,
      interceptors?.request?.fail,
    );
    this.instance.interceptors.response.use(
      interceptors?.response?.success,
      interceptors?.response?.fail,
    );

    //2.每个实例都具有的拦截操作（注意执行顺序，这个先执行，即:后添加的先执行)
    this.instance.interceptors.request.use(
      DioRequest.requestSuccess,
      DioRequest.dealError("Request"),
    );
    this.instance.interceptors.response.use(
      DioRequest.responseSuccess,
      DioRequest.dealError("Response"),
    );
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.instance.request(config);
  }

  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({
      ...config,
      method: "GET",
    });
  }

  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({
      ...config,
      method: "POST",
    });
  }

  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({
      ...config,
      method: "DELETE",
    });
  }

  patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request({
      ...config,
      method: "PATCH",
    });
  }

  private static requestSuccess(config: AxiosRequestConfig) {
    // console.log("请求成功拦截");
    // console.log("DioRequest config=>", config);
    return config;
  }

  private static responseSuccess(res: AxiosResponse) {
    // console.log("响应成功拦截");
    return res.data;
  }

  private static dealError(prefix: string) {
    return function (error: any): any {
      console.error(`${prefix}Error==start`);
      console.log(error);
      console.error(`${prefix}Error==end`);
    };
  }
}

export default DioRequest;
