import type { App } from "vue";
import registerElement from "./register-elementPlus";
import registerGlobalProperties from "./globalProperties";

export default {
  install(app: App): void {
    registerElement(app); //注册element中在全局用到的组件
    registerGlobalProperties(app); //注册全局属性
  },
};
