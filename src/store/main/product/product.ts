import type { Module } from "vuex";

import type { IProductState } from "./product.type";
import type { IRootState } from "../../index.type";
import { getPageListRequest } from "@/services/request/pageContent.service";
import capitalize from "utils/capitalize";

const systemModule: Module<IProductState, IRootState> = {
  namespaced: true,
  state() {
    return {
      goodsList: [],
      goodsCount: 0,
    };
  },
  mutations: {
    changeProductList(state, goodsList: any[]) {
      state.goodsList = goodsList;
    },
    changeProductCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
  },
  getters: {
    pageListGetters(state) {
      return (urlPrefix: string) => {
        switch (urlPrefix) {
          case "goods":
            return state.goodsList;
        }
      };
    },
    pageCountGetters(state) {
      return (urlPrefix: string) => {
        switch (urlPrefix) {
          case "goods":
            return state.goodsCount;
        }
      };
    },
  },
  actions: {
    // eslint-disable-next-line
    async getPageListAction({ commit }, payload) {
      const { urlPrefix, queryInfo } = payload;

      const pageUrl = `/${urlPrefix === "user" ? "users" : urlPrefix}/list`;
      const pageList = await getPageListRequest(pageUrl, queryInfo);

      commit(`change${capitalize(urlPrefix)}List`, pageList?.data?.list);
      commit(`change${capitalize(urlPrefix)}Count`, pageList?.data?.totalCount);
    },
  },
};

export default systemModule;
