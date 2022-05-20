<template>
  <div class="goods">
    <div class="search">
      <dio-form-plus
        :form="form"
        @EmitFormReset="handleResetEmit"
        @EmitFormSearch="handleSearchEmit"
      />
    </div>
    <div class="content">
      <dio-table-further
        :tableConfig="tableConfig"
        ref="tableRef"
        urlPrefix="goods"
      >
        <template #imgUrl="{ scope }">
          <el-image
            :src="scope.imgUrl"
            fit="contain"
            :preview-src-list="[scope.imgUrl]"
            hide-on-click-modal
            style="width: 80px; height: 80px"
            :alt="scope.name"
          >
            <template #placeholder>
              <i class="el-icon-loading"></i>
            </template>
            <template #error>
              <i class="el-icon-picture-outline"></i>
            </template>
          </el-image>
        </template>

        <template #status="{ scope }">
          <el-button
            size="mini"
            :type="scope.enable == 1 ? 'success' : 'warning'"
            round
            plain
            @click="changePermission(scope)"
          >
            {{ scope.enable === 1 ? "启用" : "禁用" }}
          </el-button>
        </template>

        <template #oldPrice="{ scope }">￥{{ scope.oldPrice }} </template>
        <template #newPrice="{ scope }">￥{{ scope.newPrice }} </template>
      </dio-table-further>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { DioFormPlus } from "@/base-ui/form";
import { DioTableFurther } from "@/base-ui/table";

import * as form from "./search.config";
import tableConfig from "./table.config";

import { pageRefresh } from "@/hooks";

export default defineComponent({
  name: "goods",
  components: {
    DioFormPlus,
    DioTableFurther,
  },
  setup() {
    const [tableRef, handleResetEmit, handleSearchEmit] = pageRefresh();
    return {
      form,
      tableConfig,
      tableRef,
      handleResetEmit,
      handleSearchEmit,
    };
  },
});
</script>
<style scoped lang="scss"></style>
