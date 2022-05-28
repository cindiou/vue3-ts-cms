<template>
  <div class="overview">
    <dio-card title="关于">
      <div class="c-left">
        本后台管理系统是由基于
        <span>Vue3</span
        >、<span>Vuex</span>、<span>VueRouter</span>、<span>Vite</span>、
        <span>ElementPlus</span>
        、<span>TypeScript</span>、<span>Echart5</span>、<span>Vercel</span>
        等技术所组成的后台系统解决方案所实现。
      </div>
    </dio-card>
    <dio-card title="技术栈">
      <dio-text-link :text-arrs="technologyStacks" />
      <dio-descriptions
        title="生产环境依赖"
        :column="2"
        :table-datas="dependencies"
      />
      <dio-descriptions
        title="开发环境依赖"
        :column="2"
        :table-datas="devDependencies"
      />
    </dio-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import DioCard from "@/base-ui/card";
import DioTextLink from "@/base-ui/text-link";
import DioDescriptions from "@/base-ui/descriptions";

import { technologyStacks, dependencies, devDependencies } from "./config";
export default defineComponent({
  name: "overview",
  components: {
    DioCard,
    DioTextLink,
    DioDescriptions,
  },
  setup() {
    return {
      technologyStacks,
      dependencies,
      devDependencies,
    };
  },
});
</script>
<style scoped lang="scss">
.overview {
  .c-left {
    text-align: left;

    span {
      border-radius: 5px;
      background-color: #eee;
      padding: 0 5px;
    }
  }

  .el-card {
    margin-bottom: 20px;
    &:deep(.el-card__header span) {
      font-weight: 700;
    }
  }

  .description {
    &:deep(.el-descriptions__title) {
      font-weight: 400;
    }
  }
}
</style>
