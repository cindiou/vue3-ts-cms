import { Module } from "vuex";
import { IRootState } from "@/store/index.type";
import { IDashboardState } from "./dashboard.type";

import {
  getAddressSaleRequest,
  getGoodsCountRequest,
  getGoodsFavorRequest,
  getGoodsSaleRequest,
} from "@/services/request/DashBoard.service";

const systemModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: [],
    };
  },
  mutations: {
    changeCategoryGoodsCount(state, categoryGoodsCount) {
      state.categoryGoodsCount = categoryGoodsCount;
    },
    changeCategoryGoodsFavor(state, categoryGoodsFavor) {
      state.categoryGoodsFavor = categoryGoodsFavor;
    },
    changeCategoryGoodsSale(state, categoryGoodsSale) {
      state.categoryGoodsSale = categoryGoodsSale;
    },
    changeAddressGoodsSale(state, addressGoodsSale) {
      state.addressGoodsSale = addressGoodsSale;
    },
  },
  actions: {
    async getDashBoardAction({ commit }) {
      const goodsCountResult = await getGoodsCountRequest();
      commit("changeCategoryGoodsCount", goodsCountResult.data);

      const goodsSaleResult = await getGoodsSaleRequest();
      commit("changeCategoryGoodsSale", goodsSaleResult.data);

      const goodsFavorResult = await getGoodsFavorRequest();
      commit("changeCategoryGoodsFavor", goodsFavorResult.data);

      const addressSaleResult = await getAddressSaleRequest();
      commit("changeAddressGoodsSale", addressSaleResult.data);
    },
  },
  getters: {},
};

export default systemModule;
