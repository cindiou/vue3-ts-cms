<template>
  <div class="login-account">
    <el-form label-width="90px" :model="account" :rules="rules" ref="formRef">
      <el-form-item label="账  号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密  码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { defineComponent, reactive, ref } from "vue";
import type { ElForm } from "element-plus";

import rules from "../config/account-config";
import cache from "utils/localCache";

export default defineComponent({
  setup() {
    const store = useStore();
    const account = reactive({
      name: cache.get("name") ?? "",
      password: cache.get("password") ?? "",
    });
    const formRef = ref<InstanceType<typeof ElForm>>();

    const loginByAccount = (payload: any) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          //1.存储登录信息到本地
          if (payload.isKeepPassword) {
            cache.set("name", account.name);
            cache.set("password", account.password);
            cache.set("isKeepPassword", true);
          } else {
            cache.delete("name");
            cache.delete("password");
            cache.delete("isKeepPassword");
          }

          //2.登录验证
          store.dispatch("login/accountLoginAction", { ...account });
        }
      });
    };

    return {
      account,
      rules,
      loginByAccount,
      formRef,
    };
  },
});
</script>

<style scoped lang="scss"></style>
