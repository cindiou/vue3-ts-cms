import type { ILoginState } from "./login/login.type";
import type { ISystemState } from "./main/system/system.type";
import type { IDashboardState } from "./main/analysis/dashboard.type";

export interface IRootState {
  entireRole: any[];
  entireDepartment: any[];
  entireMenu: any[];
}

export interface IModuleInRoot {
  login: ILoginState;
  system: ISystemState;
  analysis: IDashboardState;
}

export type IStateInRootWhitModule = IRootState & IModuleInRoot;
