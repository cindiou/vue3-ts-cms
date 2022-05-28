<template>
  <div class="dio-table-second">
    <div class="header">
      <slot name="header">
        <template v-if="title">
          <div class="title">{{ title }}</div>
          <div class="handler">
            <slot name="headerHandler" />
          </div>
        </template>
      </slot>
    </div>
    <el-table
      stripe
      border
      :data="tableData"
      @selection-change="handleSelectionChange"
      :="tableProps"
    >
      <el-table-column
        type="selection"
        align="center"
        v-if="showSelectionColumn"
        label="序号"
        width="60"
      />
      <el-table-column
        type="index"
        align="center"
        v-if="showIndexColumn"
        label="序号"
        width="80"
      />
      <template v-for="item in propList" :key="item.label">
        <el-table-column :="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName || item.prop" :scope="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <template v-if="showPagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.currentPage"
            :page-size="pageInfo.pageSize"
            :page-sizes="[10, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </template>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
    },
    propList: {
      type: Array,
      default: () => [],
      required: true,
    },
    tableData: {
      type: Array,
      default: () => [],
      required: true,
    },
    tableProps: {
      type: Object,
      default: () => ({}),
    },
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    showSelectionColumn: {
      type: Boolean,
      default: false,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    total: {
      type: Number,
      required: true,
    },
    pageInfo: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 }),
    },
  },
  emits: ["selectionChange", "update:pageInfo"],
  /* eslint-disable-next-line */
  setup(props, { emit }) {
    console.log("props=", props);

    const handleSelectionChange = (value: any) => {
      emit("selectionChange", value);
    };

    //侦听 分页 改变 currentPageChange
    /* const currentPage = ref(1);
    watch(currentPage, (newValue) => {
      emit("currentPageChange", newValue);
    }); */
    /* watch(props.pageInfo,(newValue)=>{
      emit("pageInfoChange",newValue)
    },{
      deep:true
    }) */
    function handleSizeChange(pageSize: number) {
      emit("update:pageInfo", {
        ...props.pageInfo,
        pageSize,
      });
    }

    function handleCurrentChange(currentPage: number) {
      emit("update:pageInfo", {
        ...props.pageInfo,
        currentPage,
      });
    }

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped lang="scss">
.dio-table-second {
  padding: 20px;
  border-top: 30px solid #f5f5f5;
  /* overflow-x: auto; */

  .header {
    display: flex;
    height: 45px;
    padding: 0 5px;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .handler {
      align-items: center;
    }
  }

  .footer {
    margin-top: 15px;
    .el-pagination {
      text-align: right;
    }
  }
}
</style>
