const props = [
  { prop: "name", label: "类别名称", "min-width": 100 },
  { prop: "createAt", label: "创建时间", "min-width": 200 },
  { prop: "updateAt", label: "更新时间", "min-width": 200 },
  { label: "操作", "min-width": 250, slotName: "handle" },
];

export default {
  propList: props,
  title: "商品类别列表",
  tableTitle: "新建类别",
};
