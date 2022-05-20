const props = [
  // { prop: "id", label: "id", minWidth: 80 },
  { prop: "name", label: "菜单名称", minWidth: 180 },
  { prop: "type", label: "类型", "min-width": 80 },
  { prop: "url", label: "菜单URL", "min-width": 100 },
  { prop: "icon", label: "菜单图标", "min-width": 80 },
  { prop: "permission", label: "按钮权限", "min-width": 100 },
  { prop: "createAt", label: "创建时间", "min-width": 150 },
  { prop: "updateAt", label: "更新时间", "min-width": 150 },
  { label: "操作", "min-width": 150, slotName: "handle" },
];

export default {
  propList: props,
  title: "菜单列表",
  tableProps: {
    rowKey: "id",
    treeProp: {
      children: "children",
    },
  },
  // tableTitle: "新建菜单",
  crossCpnSlots: ["icon", "type"],
  // showIndexColumn: true,
  // showSelectionColumn
  showPagination: false,
};
