<template>
  <div class="role">
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
        urlPrefix="role"
        ref="tableRef"
        @EmitEditData="handleEditData"
        @EmitNewData="handleNewData"
      />
    </div>
    <div class="modal-control">
      <page-modal
        :modal="modalConfigRef"
        :defaultFormData="defaultFormData"
        urlPrefix="role"
        ref="pageModalRef"
        :otherRequestQuery="otherRequestQuery"
      >
        <!-- <template #default></template> -->
        <el-scrollbar height="150px">
          <el-card header="角色权限" shadow="always">
            <el-tree
              node-key="id"
              :data="menuList"
              :props="{ children: 'children', label: 'name' }"
              show-checkbox
              @check="handleCheckChange"
              ref="elTreeRef"
            />
          </el-card>
        </el-scrollbar>
      </page-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElTree } from "element-plus";

import { DioFormPlus } from "@/base-ui/form";
import * as form from "./search.config";

import { DioTableFurther } from "@/base-ui/table";
import tableConfig from "./table.config";

import { PageModal } from "@/base-ui/page-modal";
import { useModal } from "./modal.config";

import { pageRefresh, useModalControl } from "@/hooks";

export default defineComponent({
  name: "role",
  components: {
    DioTableFurther,
    DioFormPlus,
    PageModal,
    ElTree,
  },
  setup() {
    const [tableRef, handleResetEmit, handleSearchEmit] = pageRefresh();

    //监听数据的变化，重新刷新页面
    const {
      modalConfigRef,
      menuList,
      handleCheckChange,
      otherRequestQuery,
      elTreeRef,
      editCallBack,
      newCallBack,
    } = useModal();

    const [pageModalRef, handleNewData, handleEditData, defaultFormData] =
      useModalControl(newCallBack, editCallBack);

    return {
      form,
      tableConfig,

      tableRef,
      handleResetEmit,
      handleSearchEmit,

      pageModalRef,
      handleNewData,
      handleEditData,
      defaultFormData,

      modalConfigRef,
      menuList,
      handleCheckChange,
      otherRequestQuery,
      elTreeRef,
    };
  },
});
</script>
<style scoped lang="scss">
.search-title {
  margin-top: 0;
}

.modal-control {
  .menu-tree {
    margin-left: 20px;
  }
  /* .el-form-item {
  } */
}
</style>
