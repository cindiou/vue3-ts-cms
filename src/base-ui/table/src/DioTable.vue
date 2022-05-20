<template>
  <div class="dio-table">
    <slot name="header" />
    <el-table
      stripe
      border
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
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
        <el-table-column :="item" align="center">
          <template #default="scope">
            <slot :name="item.slotName || item.prop" :scope="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <slot name="footer" />
  </div>
</template>

<script lang="ts">
/* eslint-disable-next-line */
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
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
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    showSelectionColumn: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["selectionChange"],
  /* eslint-disable-next-line */
  setup(props, { emit }) {
    // console.log("props.tableData", props.tableData);

    const handleSelectionChange = (value: any) => {
      emit("selectionChange", value);
    };
    return {
      handleSelectionChange,
    };
  },
});
</script>

<style scoped lang="scss">
.dio-table {
  border: 1px solid red;
  padding: 20px;
  border-top: 30px solid #f5f5f5;
  /* overflow-x: auto; */
}
</style>
