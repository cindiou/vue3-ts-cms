<template>
  <div class="category">
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
        urlPrefix="category"
        @EmitEditData="handleEditData"
        @EmitNewData="handleNewData"
      />
    </div>
    <div class="modal-control">
      <page-modal
        :modal="modalConfigRef"
        :defaultFormData="defaultFormData"
        urlPrefix="category"
        ref="pageModalRef"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { DioFormPlus } from "@/base-ui/form";
import { DioTableFurther } from "@/base-ui/table";
import { PageModal } from "@/base-ui/page-modal";

import * as form from "./search.config";
import tableConfig from "./table.config";
import { useListerner } from "./modal.config";

import { pageRefresh, useModalControl } from "@/hooks";

export default defineComponent({
  name: "category",
  components: {
    DioFormPlus,
    DioTableFurther,
    PageModal,
  },
  setup() {
    const [tableRef, handleResetEmit, handleSearchEmit] = pageRefresh();

    //监听数据的变化，重新刷新页面
    const modalConfigRef = useListerner();

    /* const newCallback = ()=>{
    }
    const editCallback = ()=>{
    } */
    const [pageModalRef, handleNewData, handleEditData, defaultFormData] =
      useModalControl();

    return {
      form,
      tableConfig,
      modalConfigRef,

      tableRef,
      handleResetEmit,
      handleSearchEmit,

      pageModalRef,
      handleNewData,
      handleEditData,
      defaultFormData,
    };
  },
});
</script>
<style scoped lang="scss"></style>
