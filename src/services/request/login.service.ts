import Request from "../index";
import type { IAccount, IAccountLoginType, IDataType } from "./login.type";

enum LoginAPI {
  AccountLogin = "/login",
  loginUserInfo = "/users", //  "/users/1"
  userMenu = "/role", //  "/role/1/menu"
}

export function accountLoginRequest(account: IAccount) {
  return Request.post<IDataType<IAccountLoginType>>({
    url: LoginAPI.AccountLogin,
    data: account,
  });
}

export function getUserInfoById(id: number) {
  return Request.get({
    url: LoginAPI.loginUserInfo + "/" + id,
  });
}

export function getUserMenuById(id: number) {
  return Request.get({
    url: LoginAPI.userMenu + `/${id}/menu`,
  });
}
