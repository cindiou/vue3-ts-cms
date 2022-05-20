<template>
  <div class="page-modal">
    <el-dialog
      :title="title"
      v-model="visible"
      width="30%"
      destroy-on-close
      center
      modal
      close-on-click-modal
      close-on-press-escape
      custom-class="page-dialog"
      lock-scroll
    >
      <dio-form :form="formData" v-model="modelFormFields"> </dio-form>
      <template #footer>
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="handlePageModalClick"
          >确 定</el-button
        >
      </template>
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script lang="ts">
/* eslint-disable-next-line */
import { defineComponent, PropType, ref ,watch} from "vue";

import { ElMessage } from "element-plus";

import { DioForm } from "@/base-ui/form";
import { useStore } from "@/store";

export default defineComponent({
  name: "page-modal",
  components: {
    DioForm,
  },
  props: {
    modal: {
      type: Object,
      required: true,
    },
    defaultFormData: {
      type: Object,
      default: () => ({}),
    },
    urlPrefix: {
      type: String,
      required: true,
    },
    otherRequestQuery: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const visible = ref(false);
    const store = useStore();
    const title = ref(props.modal.title);
    const formData = ref(props.modal.formData);
    const modelFormFields = ref(props.modal.modelFormFields);

    //根据 组件字段 收集需要被切换 组件项
    const switchFields = ref(props.modal?.switchFields ?? []);
    const switchItems = new Set();
    formData.value?.rows.forEach((row: any) => {
      row.cols.forEach((col: any) => {
        if (switchFields.value.includes(col.itemProps.field)) {
          switchItems.add(col);
        }
      });
    });

    watch(
      () => props.defaultFormData,
      (newValue) => {
        for (const key of Object.keys(modelFormFields.value)) {
          modelFormFields.value[key] = newValue[key];
        }

        //newValue有值，正处在编辑页面
        if (Object.keys(newValue).length) {
          /* 编辑界面 */
          switchItems.forEach((item: any) => {
            item.itemFormProps.style = "display:none";
          });
        } else {
          /* 新建界面 */
          switchItems.forEach((item: any) => {
            item.itemFormProps.style = "";
          });
        }
      },
    );

    //事件控制，对应网络请求
    const handlePageModalClick = () => {
      visible.value = false;
      if (Object.keys(props.defaultFormData).length) {
        /* 编辑界面 */
        store
          .dispatch("system/editPageDataAction", {
            urlPrefix: props.urlPrefix,
            data: { ...modelFormFields.value, ...props.otherRequestQuery },
            id: props.defaultFormData?.id,
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
              //如果重新编辑成功，需要重新刷新 初始化数据，比如：角色/部门/角色权限
              store.dispatch("getInitialDataAction");

              ElMessage({
                type: "success",
                message: returnInfo,
                // duration: 2000,
              });
            }
          });
      } else {
        /* 新建界面 */
        store
          .dispatch("system/createPageDataAction", {
            urlPrefix: props.urlPrefix,
            data: { ...modelFormFields.value, ...props.otherRequestQuery },
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
              //如果创建成功，需要重新刷新 初始化数据，比如：角色/部门/角色权限
              store.dispatch("getInitialDataAction");

              ElMessage({
                type: "success",
                message: returnInfo,
                // duration: 2000,
              });
            }
          });
      }
    };

    return {
      visible,
      title,
      formData,
      modelFormFields,

      handlePageModalClick,
    };
  },
});
</script>

<style lang="scss">
.page-modal {
  .page-dialog {
    border-radius: 15px;
    /* border:1px solid red; */

    .el-form-item {
      margin-bottom: 5px;
    }
  }
}
</style>
