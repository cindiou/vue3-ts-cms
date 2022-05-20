const props = [
  { prop: "name", label: "角色名", "min-width": 100 },
  { prop: "intro", label: "权限介绍", "min-width": 100 },
  { prop: "createAt", label: "创建时间", "min-width": 200 },
  { prop: "updateAt", label: "更新时间", "min-width": 200 },
  { label: "操作", "min-width": 250, slotName: "handle" },
];

export default {
  propList: props,
  title: "角色列表",
  tableTitle: "新建角色",
  // showIndexColumn
  // showSelectionColumn
  // showPagination
};
