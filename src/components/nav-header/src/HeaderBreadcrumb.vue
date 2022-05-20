<template>
  <div class="header-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <template v-for="item in items" :key="item.name">
        <!-- :to="item.path" -->
        <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { IBreadcrumbItem } from "./header-breadcrump";

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<IBreadcrumbItem[]>,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.header-breadcrumb {
  margin-left: 15px;
}
</style>
