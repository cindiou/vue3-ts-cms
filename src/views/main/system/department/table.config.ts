const props = [
  { prop: "name", label: "部门名称", "min-width": 100 },
  { prop: "leader", label: "部门领导", "min-width": 100 },
  { prop: "parentId", label: "上级部门", "min-width": 100 },
  { prop: "createAt", label: "创建时间", "min-width": 200 },
  { prop: "updateAt", label: "更新时间", "min-width": 200 },
  { label: "操作", "min-width": 250, slotName: "handle" },
];

export default {
  propList: props,
  title: "部门列表",
  tableTitle: "新建部门",
};
