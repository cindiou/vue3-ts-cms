<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFoldMenu ? '60px' : '210px'">
        <nav-menu :isCollapse="isFoldMenu" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @handleMenuFold="handleMenuFold" />
        </el-header>
        <el-main class="page-content">
          <div class="page-main">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { NavMenu } from "components/nav-menu";
import { NavHeader } from "components/nav-header";

export default defineComponent({
  components: {
    NavMenu,
    NavHeader,
  },
  setup() {
    const isFoldMenu = ref(false);
    const handleMenuFold = (bool: boolean) => {
      isFoldMenu.value = bool;
    };
    return {
      isFoldMenu,
      handleMenuFold,
    };
  },
});
</script>

<style scoped lang="scss">
.main {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  /* background-color: red; */
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100%-48px);
  /* overflow:visible !important; */

  .page-main {
    background-color: #fff;
    border-radius: 5px;
  }
}

.el-header {
  color: #333;
  /* text-align: center; */

  display: flex;
  /* justify-content: center; */
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  cursor: pointer;
  background-color: #001529;
  scrollbar-width: none;
  -ms-overflow-style: none;

  /* line-height: 200px; */
  color: white;
  text-align: left;
  transition: width 0.2s linear;
  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
