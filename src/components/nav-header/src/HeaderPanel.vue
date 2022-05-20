<template>
  <div class="header-panel">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :src="avatarUrl" size="small"></el-avatar>
        <span class="header-panel-title">面板</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-circle-close" @click="handleExitClick"
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item divided icon="el-icon-edit-outline"
            >编辑记录</el-dropdown-item
          >
          <el-dropdown-item icon="el-icon-menu">系统设置</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import cahce from "@/utils/localCache";

export default defineComponent({
  setup() {
    const store = useStore();
    const avatarUrl = ref(
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    );
    const name = computed(() => store.state.login.userInfo.name);

    // 退出登录：清除token，路由跳转
    const router = useRouter();
    const handleExitClick = () => {
      cahce.delete("token");
      router.push("/main");
    };
    return {
      avatarUrl,
      name,
      handleExitClick,
    };
  },
});
</script>

<style scoped lang="scss">
.header-panel {
  &-title {
    /* border: 1px solid red; */
    margin: 0 15px 0 10px;
  }

  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
}
</style>
