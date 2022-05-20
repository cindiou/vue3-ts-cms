<template>
  <div class="login-phone">
    <el-form label-width="90px" :rules="rules" :model="phone" ref="formRef">
      <el-form-item label="手机号" prop="telephone">
        <el-input v-model="phone.telephone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="authCode">
        <div class="authCode">
          <el-input v-model="phone.authCode"></el-input>
          <el-button type="primary" class="getAuthCode">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import type { ElForm } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import rules from "../config/phone-config";

export default defineComponent({
  setup() {
    const phone = reactive({
      telephone: "",
      authCode: "",
    });
    const formRef = ref<InstanceType<typeof ElForm>>();
    const store = useStore();

    const loginByPhone = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          store.dispatch("login/phoneLoginAction", { ...phone });
        }
      });
    };
    return {
      rules,
      phone,
      loginByPhone,
      formRef,
    };
  },
});
</script>

<style scoped lang="scss">
.login-phone {
  .authCode {
    display: flex;
    /* flex: 1; */
    /* justify-content: space-between; */

    .getAuthCode {
      margin-left: 10px;
    }
  }
}
</style>
