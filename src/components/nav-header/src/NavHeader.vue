<template>
  <div class="nav-header">
    <i
      class="menu"
      :class="!isMenuFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleMenuFold"
    ></i>
    <div class="content">
      <header-breadcrumb :items="menuItems" />
      <div class="right">
        <i class="in-right el-icon-chat-dot-round"></i>
        <i class="in-right el-icon-collection-tag"></i>
        <i class="in-right el-icon-bell"></i>
        <header-panel />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";

import HeaderPanel from "./HeaderPanel.vue";
import HeaderBreadcrumb from "./HeaderBreadcrumb.vue";
import { getBreadcrumbItems } from "@/utils/useMenusMapper";
import type {IBreadcrumbItem} from "./header-breadcrump";
import {emitter} from "@/EventBus";

export default defineComponent({
  components: {
    HeaderPanel,
    HeaderBreadcrumb,
  },
  emits: ["handleMenuFold"],
  // eslint-disable-next-line
  setup(props,{slots,attrs,emit}) {
    const isMenuFold = ref(false);
    const route = useRoute();
    const store = useStore();

    //获取当前路径所对应的菜单数组
    const menuItems = computed(()=>{
      const userMenus = [...store.state?.login?.userMenus];
      const curPath = route.path;
      return getBreadcrumbItems(userMenus,curPath);
    })


    const handleMenuFold = () => {
      isMenuFold.value = !isMenuFold.value;
      emit("handleMenuFold", isMenuFold.value);
      // window.resizeBy(0,0);
      emitter.emit("resize");
    };
    return {
      isMenuFold,
      handleMenuFold,
      menuItems,
    };
  },
});
</script>

<style scoped lang="scss">
.nav-header {
  width: 100%;
  display: flex;
  .menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      margin: 0;
      padding: 0;
      padding-left: 10px;
    }

    .right {
      display: flex;
      align-items: center;
      i.in-right {
        cursor: pointer;
        margin-right: 15px;
      }
    }
  }
}
</style>
