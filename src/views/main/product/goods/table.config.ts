const props = [
  { prop: "id", label: "id", minWidth: 100 },
  { prop: "name", label: "商品名称", minWidth: 100 },
  { prop: "oldPrice", label: "原价", "min-width": 80 },
  { prop: "newPrice", label: "现价", "min-width": 80 },
  { prop: "imgUrl", label: "样本展示", "min-width": 100 },
  { prop: "status", label: "状态", "min-width": 80 },
  { prop: "createAt", label: "创建时间", "min-width": 150 },
  { prop: "updateAt", label: "更新时间", "min-width": 150 },
  { label: "操作", "min-width": 150, slotName: "handle" },
];

export default {
  propList: props,
  title: "商品列表",
  tableTitle: "新建商品",
  //用于生成跨组件插槽
  crossCpnSlots: ["imgUrl", "status", "oldPrice", "newPrice"],
  // showIndexColumn: true,
  // showSelectionColumn
  // showPagination
};
