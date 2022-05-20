import type { Module } from "vuex";
import router from "@/router";

import type { ILoginState } from "./login.type";
import type { IRootState } from "../index.type";
import type { IAccount } from "services/request/login.type";

import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenuById,
} from "services/request/login.service";
import cache from "utils/localCache";
import { mapMenusToRoutes, mapMenusToPermission } from "@/utils/useMenusMapper";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: [],
    };
  },

  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;

      //映射菜单成路由；
      const routes = mapMenusToRoutes(userMenus);
      routes.forEach((route) => {
        router.addRoute("main", route);
      });

      //根据用户菜单 =>  获取按钮权限
      const permissions = mapMenusToPermission(userMenus);
      state.permissions = permissions;
      // console.log("permissions", permissions);
    },
  },

  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      //1.根据账号，密码获取登录用户
      const { data } = await accountLoginRequest(payload);
      const { token, id } = data;
      commit("changeToken", token);
      cache.set("token", token); //保存token，方便在任何地方启用，特别是对于需要携带token的网络请求

      //在具备token后，请求登入需要用到的初始化数据，比如针对该登录用户：角色列表 或 部门列表；
      dispatch("getInitialDataAction", null, { root: true });

      //2.根据id请求用户详细信息
      const userResult = await getUserInfoById(id);
      const userInfo = userResult.data;
      commit("changeUserInfo", userInfo);
      cache.set("userInfo", userInfo);

      //3.请求用户菜单
      const roleId = userInfo.role.id;
      const userMenuResult = await getUserMenuById(roleId);
      const userMenus = userMenuResult.data;
      commit("changeUserMenus", userMenus);
      cache.set("userMenus", userMenus);

      //4.跳到首页
      router.push("/main");
    },

    loadLocalLoginData({ commit, dispatch }) {
      // 将localStorage中数据 备份到 vuex中
      dispatch("getInitialDataAction", null, { root: true });

      const keys = ["token", "userInfo", "userMenus"];
      for (const key of keys) {
        const value = cache.get(key);
        if (value) {
          const capital = key[0].toUpperCase() + key.slice(1);
          commit(`change${capital}`, value);
        }
      }
    },
  },

  getters: {},
};

export default loginModule;
