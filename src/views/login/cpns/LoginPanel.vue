<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" stretch v-model="curTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="warning" class="login-in" @click="unpwLogin"
      >游客登录</el-button
    >
    <el-button type="primary" class="login-in" @click="login"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
import { defineComponent, ref, watch } from "vue";
import LoginAccount from "./LoginAccount.vue";
import LoginPhone from "./LoginPhone.vue";
import cache from "utils/localCache";

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone,
  },
  setup() {
    const isKeepPassword = ref(cache.get("isKeepPassword") || false);
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const phoneRef = ref<InstanceType<typeof LoginPhone>>();
    const curTab = ref("account");

    const login = () => {
      const payload = { isKeepPassword: isKeepPassword.value };
      if (curTab.value === "account") {
        accountRef.value?.loginByAccount(payload);
      } else {
        phoneRef.value?.loginByPhone();
      }
    };

    const unpwLogin = () => {
      accountRef.value?.loginByAccount(null, true);
    };

    return {
      isKeepPassword,
      login,
      unpwLogin,
      accountRef,
      phoneRef,
      curTab,
    };
  },
});
</script>

<style scoped lang="scss">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
  }

  .login-in {
    width: 100%;
    margin-top: 10px;
  }
  .login-in + .login-in {
    margin-left: 0px;
  }
}
</style>
