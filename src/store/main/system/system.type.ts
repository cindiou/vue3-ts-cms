export interface ISystemState {
  userList: any[];
  userCount: number;
  roleList: any[];
  roleCount: number;
  menuList: any[];
  menuCount: number;
  goodsList: any[];
  goodsCount: number;

  departmentList: any[];
  departmentCount: number;
  categoryList: any[];
  categoryCount: number;

  queryData: {
    queryInfo: any;
    isInSearch: boolean;
  };
}
