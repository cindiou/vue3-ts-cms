// const path = require("path");
let firstMenu: any = null;

import type { RouteRecordRaw } from "vue-router";
import type { IBreadcrumbItem } from "components/nav-header/src/header-breadcrump";

function collectAllUrl(wrapperMenus: any): string[] {
  const res: string[] = [];
  if (wrapperMenus.children) {
    for (const child of wrapperMenus.children) {
      if (!firstMenu && child.type === 2) {
        firstMenu = child.url;
      }
      child.url && res.push(child.url);
      if (child?.children?.length) {
        res.push(...collectAllUrl(child));
      }
    }
  } else {
    wrapperMenus.url && res.push(wrapperMenus.url);
  }

  return res;
}

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const res: RouteRecordRaw[] = [];

  //1.先加载所有的routes
  const allRoutes: Map<string, RouteRecordRaw> = new Map();
  const routeFiles = require.context("../router/main", true, /\.tsx?$/);
  routeFiles.keys().forEach((filePath) => {
    const routeModule = require(`../router/main${filePath.slice(1)}`).default;
    allRoutes.set(routeModule.path, routeModule);
  });

  //2.收集服务器返回的菜单的url集合
  const needUrls = collectAllUrl({ children: userMenus });

  //3.根据菜单加载routes中
  for (const key of needUrls) {
    if (allRoutes.has(key)) {
      res.push(<RouteRecordRaw>allRoutes.get(key));
    }
  }

  return res;
}

export { firstMenu };

export function getBreadcrumbItems(userMenus: any[], curPath: string) {
  const res: IBreadcrumbItem[] = [];
  while (userMenus.length) {
    const menu = userMenus.shift();

    res.push({
      name: menu.name,
      path: menu.url,
    });
    for (const subMenu of menu.children) {
      if (subMenu.url === curPath) {
        res.push({
          name: subMenu.name,
          path: subMenu.url,
        });
        break;
      }
    }

    if (res.length !== 2) {
      res.pop();
    } else {
      return res;
    }
  }
}

export function mapMenusToPermission(userMenus: any[]) {
  const permissions: string[] = [];

  const _recursiveGetPermissioon = (menus: any[]) => {
    for (const menu of menus) {
      //只有type=3才存在permission

      if (menu.type === 3) {
        permissions.push(menu.permission);
      } else if (menu.children instanceof Array) {
        _recursiveGetPermissioon(menu.children || []);
      }
    }
  };

  _recursiveGetPermissioon(userMenus);

  return permissions;
}

export function mapRoleListToLeafKeys(roleList: any) {
  const leafKeys: number[] = [];
  function _recursiveGetLeafKeys(roleList: any) {
    for (const role of roleList) {
      if (role.children) {
        _recursiveGetLeafKeys(role.children);
      } else {
        leafKeys.push(role.id);
      }
    }
  }
  _recursiveGetLeafKeys(roleList);
  return leafKeys;
}
