import type { Module } from "vuex";

import type { ISystemState } from "./system.type";
import type { IRootState } from "../../index.type";
import {
  getPageListRequest,
  deleteUserRequest,
  createPageDataRequest,
  editPageDataRequest,
} from "@/services/request/pageContent.service";
import capitalize from "utils/capitalize";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      menuList: [],
      menuCount: 0,
      departmentCount: 0,
      departmentList: [],

      goodsList: [],
      goodsCount: 0,
      categoryCount: 0,
      categoryList: [],

      queryData: {
        queryInfo: {
          offset: 0,
          size: 10,
        },
        isInSearch: false,
      },
    };
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList;
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount;
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList;
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount;
    },
    changeDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList;
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount;
    },

    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList;
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    changeCategoryList(state, categoryList: any[]) {
      state.categoryList = categoryList;
    },
    changeCategoryCount(state, categoryCount: number) {
      state.categoryCount = categoryCount;
    },

    changeQueryData(state, queryData: any) {
      state.queryData = queryData;
    },
  },
  getters: {
    pageListGetters(state) {
      return (urlPrefix: string) => {
        switch (urlPrefix) {
          case "user":
            return state.userList;
          case "role":
            return state.roleList;
          case "menu":
            return state.menuList;
          case "department":
            return state.departmentList;

          case "goods":
            return state.goodsList;
          case "category":
            return state.categoryList;
        }
      };
    },
    pageCountGetters(state) {
      return (urlPrefix: string) => {
        switch (urlPrefix) {
          case "user":
            return state.userCount;
          case "role":
            return state.roleCount;
          case "menu":
            return state.menuCount;
          case "department":
            return state.departmentCount;

          case "goods":
            return state.goodsCount;
          case "category":
            return state.categoryCount;
        }
      };
    },
  },
  actions: {
    // eslint-disable-next-line
    async getPageListAction({ commit }, payload) {
      const { urlPrefix, queryInfo, isInSearch } = payload;
      //保存queryInfo，查询信息，方便删除该查询条件下的某条数据后，重新请求对应查询条件的数据，做出相应展示
      commit("changeQueryData", {
        queryInfo,
        isInSearch,
      });

      const pageUrl = `/${urlPrefix === "user" ? "users" : urlPrefix}/list`;
      const pageList = await getPageListRequest(pageUrl, queryInfo);

      commit(`change${capitalize(urlPrefix)}List`, pageList?.data?.list);

      //如果用户是在搜索中应该展现搜索的数量
      const showCount = isInSearch
        ? pageList?.data?.list.length
        : pageList?.data?.totalCount;
      commit(`change${capitalize(urlPrefix)}Count`, showCount);
    },

    async deleteUserAction({ dispatch, state }, payload) {
      const { urlPrefix, id } = payload;
      const pageUrl = `/${urlPrefix === "user" ? "users" : urlPrefix}/${id}`;
      const result = await deleteUserRequest(pageUrl);

      //重新根据对应查询条件，请求相应数据
      dispatch("getPageListAction", {
        urlPrefix,
        ...state.queryData,
      });
      return result;
    },

    async createPageDataAction({ dispatch, state }, payload) {
      const { urlPrefix, data: newInfo } = payload;
      const pageUrl = `/${urlPrefix === "user" ? "users" : urlPrefix}`;
      const result = await createPageDataRequest(pageUrl, newInfo);

      //重新根据对应查询条件，请求相应数据
      dispatch("getPageListAction", {
        urlPrefix,
        ...state.queryData,
      });

      return result;
    },

    async editPageDataAction({ dispatch, state }, payload) {
      const { urlPrefix, data: editInfo, id } = payload;
      const pageUrl = `/${urlPrefix === "user" ? "users" : urlPrefix}/${id}`;

      const result = await editPageDataRequest(pageUrl, editInfo);

      //重新根据对应查询条件，请求相应数据
      dispatch("getPageListAction", {
        urlPrefix,
        ...state.queryData,
      });

      return result;
    },
  },
};

export default systemModule;
