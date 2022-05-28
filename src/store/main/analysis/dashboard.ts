import { Module } from "vuex";
import { IRootState } from "@/store/index.type";
import { IDashboardState } from "./dashboard.type";

import {
  getAddressSaleRequest,
  getGoodsCountRequest,
  getGoodsFavorRequest,
  getGoodsSaleRequest,
  getAmountList,
  getGoodsSaleTop10,
} from "@/services/request/DashBoard.service";

const systemModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: [],

      topPanelDatas: null,
      goodsSaleTop10: [],
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
    changeTopPanelDatas(state, list) {
      state.topPanelDatas = list;
    },
    changeGoodsSaleTop10(state, list) {
      state.goodsSaleTop10 = list;
    },
  },
  actions: {
    async getDashBoardAction({ commit }) {
      const resultTopPanelDatas = await getAmountList();
      commit("changeTopPanelDatas", resultTopPanelDatas);

      const saleTop10 = await getGoodsSaleTop10();
      commit("changeGoodsSaleTop10", saleTop10);

      // ===============

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
