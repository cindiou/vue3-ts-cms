<template>
  <div class="user">
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
        urlPrefix="user"
        @EmitEditData="handleEditData"
        @EmitNewData="handleNewData"
      />
    </div>
    <div class="modal-control">
      <page-modal
        :modal="modalConfigRef"
        :defaultFormData="defaultFormData"
        urlPrefix="user"
        ref="pageModalRef"
      />
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent,computed } from "vue";
// import {useStore} from "@/store"

import { DioFormPlus } from "@/base-ui/form";
import { DioTableFurther } from "@/base-ui/table";
import { PageModal } from "@/base-ui/page-modal";

import * as form from "./search.config";
import tableConfig from "./table.config";
import { useListerner } from "./modal.config";

import { pageRefresh, useModalControl } from "@/hooks";

export default defineComponent({
  name: "user",
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
    const [pageModalRef, handleNewData, handleEditData,defaultFormData] = useModalControl();

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
