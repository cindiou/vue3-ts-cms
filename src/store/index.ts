import { createStore, useStore as useVuexStore } from "vuex";

import type { Store } from "vuex";
import type { IRootState, IStateInRootWhitModule } from "./index.type";

import login from "./login/login";
import system from "./main/system/system";
import analysis from "./main/analysis/dashboard";

import { getPageListRequest } from "services/request/pageContent.service";

const store = createStore<IRootState>({
  state: {
    entireRole: [],
    entireDepartment: [],
    entireMenu: [],
  },
  mutations: {
    changeEntireRole(state, entireRole: any[]) {
      state.entireRole = entireRole;
    },
    changeEntireDepartment(state, entireDeparment: any[]) {
      state.entireDepartment = entireDeparment;
    },
    changeEntireMenu(state, entireMenu: any[]) {
      state.entireMenu = entireMenu;
    },
  },
  actions: {
    async getInitialDataAction({ commit }) {
      const roleResult = await getPageListRequest("/role/list", {
        size: 1000,
        offset: 0,
      });
      const { list: roleList } = roleResult.data;
      commit("changeEntireRole", roleList);

      const departmentResult = await getPageListRequest("/department/list", {
        size: 1000,
        offset: 0,
      });
      const { list: departmentList } = departmentResult.data;
      commit("changeEntireDepartment", departmentList);

      const menuResult = await getPageListRequest("/menu/list", {
        size: 1000,
        offset: 0,
      });
      const { list: menuList } = menuResult.data;
      commit("changeEntireMenu", menuList);
    },
  },
  modules: {
    login,
    system,
    analysis,
  },
});

export default store;
export function initStore(): void {
  store.dispatch("login/loadLocalLoginData");
}

export function useStore(): Store<IStateInRootWhitModule> {
  // console.log("useVuexStore=>", useVuexStore());
  return useVuexStore();
}
