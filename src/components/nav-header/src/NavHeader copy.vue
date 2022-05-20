<template>
  <div class="nav-header">
    <i
      class="menu"
      :class="!isMenuFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleMenuFold"
    ></i>
    <div class="content">
      <h3 class="left">{{ title }}</h3>
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
import { defineComponent, ref, computed } from "vue";
import { useRoute } from "vue-router";

import getMenusHeaderTitle from "utils/menusHeaderTitle";

import HeaderPanel from "./HeaderPanel.vue";

export default defineComponent({
  components: {
    HeaderPanel,
  },
  emits: ["handleMenuFold"],
  // eslint-disable-next-line
  setup(props,{slots,attrs,emit}) {
    const isMenuFold = ref(false);
    const route = useRoute();
    const title = computed(() => {
      // console.log(typeof route.path);
      // return route.path;
      if (/^\/main\/?$/.test(route.path)) return "";
      return getMenusHeaderTitle(route.path);
    });

    // title.value = getMenusHeaderTitle(route.path);

    const handleMenuFold = () => {
      isMenuFold.value = !isMenuFold.value;
      emit("handleMenuFold", isMenuFold.value);
    };
    return {
      isMenuFold,
      handleMenuFold,
      title,
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
