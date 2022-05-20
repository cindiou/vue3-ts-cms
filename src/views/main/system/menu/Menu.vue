<template>
  <div class="menu">
    <div class="content">
      <dio-table-further :tableConfig="tableConfig" urlPrefix="menu">
        <template #icon="{ scope }">
          <i :class="scope.icon"></i>
        </template>
        <template #type="{ scope }">
          <span>
            {{ ["一", "二", "三", "四", "五", "六", "七"][scope.type - 1] }}级
          </span>
        </template>
      </dio-table-further>
      <!-- ref="tableRef" -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { DioTableFurther } from "@/base-ui/table";
import tableConfig from "./table.config";

export default defineComponent({
  name: "Menu",
  components: {
    DioTableFurther,
  },
  setup() {
    return { tableConfig };
  },
});
</script>
<style scoped lang="scss"></style>
