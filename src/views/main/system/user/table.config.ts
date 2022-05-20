const props = [
  { prop: "name", label: "用户名", "min-width": 100 },
  { prop: "realname", label: "真实姓名", "min-width": 100 },
  { prop: "cellphone", label: "手机号码", "min-width": 100 },
  { prop: "enable", label: "状态", "min-width": 100 },
  { prop: "createAt", label: "创建时间", "min-width": 200 },
  { prop: "updateAt", label: "更新时间", "min-width": 200 },
  { label: "操作", "min-width": 250, slotName: "handle" },
];

export default {
  propList: props,
  title: "用户列表",
  tableTitle: "新建用户",
  // crossCpnSlots:[]
  // showIndexColumn
  // showSelectionColumn
  // showPagination
};
