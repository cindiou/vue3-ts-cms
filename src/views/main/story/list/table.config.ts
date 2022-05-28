const props = [
  // { prop: "id", label: "id", minWidth: 80 },
  { prop: "title", label: "故事标题", minWidth: 150 },
  { prop: "content", label: "故事内容", "min-width": 200 },
  { prop: "createAt", label: "创建时间", "min-width": 150 },
  { prop: "updateAt", label: "更新时间", "min-width": 150 },
];

export default {
  propList: props,
  title: "故事列表" /* 
  tableProps: {
    rowKey: "id",
    treeProp: {
      children: "children",
    },
  }, */,
  // tableTitle: "新建菜单",
  // crossCpnSlots: ["icon", "type"],
  // showIndexColumn: true,
  // showSelectionColumn
  // showPagination: false,
};
