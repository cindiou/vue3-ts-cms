import { ElLoading } from "element-plus";

import DioRequest from "./base/DioRequest";
import * as config from "./base/config";
import cache from "utils/localCache";

// let LoadingInstance: any = null;

export default new DioRequest({
  baseURL: config.BASE_URL,
  timeout: config.TIME_OUT,
  interceptors: {
    request: {
      success: (config) => {
        //携带token的拦截
        const token = cache.get("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        //超过500ms延时的网络请求，会出现遮罩;
        // timerList.add(
        //   setTimeout(() => {
        //     LoadingInstance = ElLoading.service({
        //       fullscreen: true,
        //       lock: true,
        //       text: "正在拼命加载中...",
        //       spinner: "el-icon-loading",
        //       background: "rgba(0,0,0,0.6)",
        //     });
        //   }, 500),
        // );

        return config;
      },
      fail: () => {
        // LoadingInstance?.close();
      },
    },
    response: {
      success: (data) => {
        /* setTimeout(() => {
          LoadingInstance?.close();
        }, 3000); */

        // LoadingInstance?.close();

        // console.log("data=", data);
        return data;
      },
      fail: () => {
        // LoadingInstance?.close();
      },
    },
  },
});
