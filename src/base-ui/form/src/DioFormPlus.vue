<template>
  <div class="dio-form-plus">
    <dio-form :form="formData" v-model="modelFormFields">
      <template #header>
        <h2 class="search-title">高级检索</h2>
      </template>
      <!-- 控制部分 -->
      <template #footer>
        <el-row justify="end">
          <el-col :span="8" :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-refresh"
              round
              plain
              @click="handleFormReset"
              >重置</el-button
            >
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
              round
              plain
              @click="handleFormSearch"
              >搜索</el-button
            >
          </el-col>
        </el-row>
      </template>
    </dio-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DioForm from "./DioForm.vue";

export default defineComponent({
  components: {
    DioForm,
  },
  props: {
    form: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
  emits: ["EmitFormSearch", "EmitFormReset"],
  setup(props, { emit }) {
    const modelFormFields = ref(props.form.modelFormFields);
    const formData = ref(props.form.formData);
    const handleFormReset = () => {
      // 重置form表格
      for (const key of Object.keys(modelFormFields.value)) {
        modelFormFields.value[key] = "";
      }
      //通知上层组件 重置
      emit("EmitFormReset");
    };

    const handleFormSearch = () => {
      emit("EmitFormSearch", modelFormFields.value);
    };

    return {
      modelFormFields,
      formData,
      handleFormReset,
      handleFormSearch,
    };
  },
});
</script>

<style scoped>
.search-title {
  margin-top: 0;
}
</style>
