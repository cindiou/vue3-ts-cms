<template>
  <div class="dio-table-plus">
    <dio-table-plus
      :tableData="list"
      :total="count"
      :="tableConfig"
      v-model:pageInfo="pageInfo"
    >
      <template #enable="{ scope }">
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

      <template #createAt="{ scope }">
        {{ $filters.formatUTC(scope.createAt) }}
      </template>
      <template #updateAt="{ scope }">
        {{ $filters.formatUTC(scope.updateAt) }}
      </template>
      <!-- eslint-disable-next-line -->
      <template #handle="{scope}">
        <div class="user-control">
          <el-button
            type="text"
            icon="el-icon-edit"
            size="mini"
            v-if="permission.update"
            @click="handleEditClick(scope)"
            >编辑</el-button
          >
          <span style="color: #ccc"> | </span>
          <template v-if="permission.delete">
            <el-popconfirm
              title="是否删除？"
              cancel-button-text="否"
              confirm-button-text="是"
              @confirm="handleDeleteClick(scope)"
            >
              <template #reference>
                <el-button
                  type="text"
                  icon="el-icon-delete"
                  size="mini"
                  style="color: #f67878"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </div>
      </template>

      <template #headerHandler>
        <template v-if="permission.create && tableConfig.tableTitle">
          <el-button type="primary" size="small" @click="handleNewClick">
            {{ tableConfig.tableTitle }}
          </el-button>
          <!-- <el-button icon="el-icon-refresh" type="primary" size="small" /> -->
        </template>
      </template>
      <!-- 动态插槽，跨组件插槽 -->
      <template
        v-for="slotName in tableConfig.crossCpnSlots"
        :key="slotName"
        #[slotName]="{ scope }"
      >
        <slot :name="slotName" :scope="scope"></slot>
      </template>
    </dio-table-plus>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";

import { ElMessage } from "element-plus";

import { useStore } from "@/store";
import { usePermission } from "@/hooks";

import DioTablePlus from "./DioTableSecond.vue";

export default defineComponent({
  components: {
    DioTablePlus,
  },
  props: {
    tableConfig: {
      type: Object,
      default: () => ({}),
    },
    urlPrefix: {
      type: String,
      required: true,
    },
  },
  emits: ["EmitNewData", "EmitEditData"],
  setup(props, { emit }) {
    const store = useStore();

    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10,
    });
    //监听pageInfo数据变化，重新发送网络请求
    watch(pageInfo, () => {
      getPageData();
    });

    //获取用户操作权限
    const permission = {
      create: false,
      update: false,
      delete: false,
      query: false,
    };
    for (let key of Object.keys(permission)) {
      (permission as any)[key] = usePermission(props.urlPrefix, key);
    }

    //============================网络请求
    //展示table数据
    /* eslint-disable-next-line  */
    const urlPrefix = props.urlPrefix;
    function getPageData(query: any = {}, isInSearch = false) {
      if (!permission.query) return;

      store.dispatch("system/getPageListAction", {
        urlPrefix,
        isInSearch,
        queryInfo: {
          size: pageInfo.value.pageSize,
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          ...query,
        },
      });
    }
    getPageData();

    const list = computed(() => {
      return store.getters["system/pageListGetters"](urlPrefix);
    });
    const count = computed(() => {
      return store.getters["system/pageCountGetters"](urlPrefix);
    });

    const handleDeleteClick = (info: any) => {
      const id = info.id;
      store
        .dispatch("system/deleteUserAction", {
          id,
          urlPrefix,
        })
        .then((res) => {
          const { code, data: returnInfo } = res;
          if (code < 0) {
            ElMessage({
              type: "error",
              message: returnInfo,
              // duration: 2000,
            });
          } else if (code === 0) {
            //如果删除成功，需要重新刷新 初始化数据，比如：角色/部门/角色权限
            store.dispatch("getInitialDataAction");

            ElMessage({
              type: "success",
              message: returnInfo,
              // duration: 2000,
            });
          }
        });
    };

    //====================控制部分
    //按钮功能
    const changePermission = (user: any): void => {
      user.enable = +!user.enable;
      //通知服务器，修改
    };

    const handleNewClick = () => {
      emit("EmitNewData");
    };

    const handleEditClick = (info: any) => {
      emit("EmitEditData", info);
    };

    return {
      list,
      count,
      changePermission,
      getPageData,
      pageInfo,
      permission,
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
    };
  },
});
</script>

<style scoped></style>
