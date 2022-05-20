import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "normalize.css";
import "assets/css/index.scss";
import { initStore } from "@/store";

//全局注册
/* import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
app.use(ElementPlus); */

import plugins from "./plugins";

const app = createApp(App);
app.use(store);

app.use(plugins); //安装需要用到的插件
initStore(); //根据localstorage初始化Vuex

app.use(router); //这一步将会进行路由匹配！！！！因此，必须先注册好所有的路由（包括动态路由），不然 后添加的动态路由 会被 初始化路由中404保底路由 抢先匹配成功
app.mount("#app");
