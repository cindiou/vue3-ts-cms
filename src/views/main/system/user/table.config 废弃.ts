import { formatDate_UTC } from "utils/date-format";

const props = [
  { prop: "name", label: "用户名", "min-width": 100 },
  { prop: "realname", label: "真实姓名", "min-width": 100 },
  { prop: "cellphone", label: "手机号码", "min-width": 100 },
  { prop: "enable", label: "状态", "min-width": 100 },
  { prop: "createAt", label: "创建时间", "min-width": 200 },
  { prop: "updateAt", label: "更新时间", "min-width": 200 },
  { label: "操作", "min-width": 250, slotName: "handle" },
];

const tableConfig = {
  propList: props,
  title: "用户列表",
  // showIndexColumn
  // showSelectionColumn
  // showPagination
};

/* const slots = {
  headerHandler: [
    {
      is: "ElButton",
      props: {
        type: "primary",
        size: "small",
      },
      children: "新建用户",
    },
    {
      is: "ElButton",
      props: {
        type: "primary",
        size: "small",
        icon: "el-icon-refresh",
      },
      children: "刷新",
    },
  ],
  handle: [
    {
      is: "ElButton",
      props: {
        type: "text",
        size: "mini",
        icon: "el-icon-edit",
      },
      children: "编辑",
    },
    {
      is: "ElButton",
      props: {
        type: "text",
        size: "mini",
        icon: "el-icon-delete",
        style: "color: #f67878",
      },
      children: "删除",
    },
  ],
  updateAt(scope: any) {
    console.log("scope", scope);
    return formatDate_UTC(scope.updateAt);
  },
  createAt(scope: any) {
    return formatDate_UTC(scope.createAt);
  },
}; */

const slots = ["createAt", "updateAt", "enable", "handle"];

/* 

  enable:{
    is: "ElButton",
    props: {
      type: "text",
      size: "mini",
      icon: "el-icon-delete",
      style: "color: #f67878",
    },
    children: "删除",
  }
*/

const table = { tableConfig, slots };
export default table;
