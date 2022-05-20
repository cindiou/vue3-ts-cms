<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~assets/img/logo.svg" alt="logo" class="logo-img" />
      <span class="title" v-show="!isCollapse">内容管理系统</span>
    </div>

    <el-menu
      :default-active="defaultMenu"
      class="el-menu-vertical"
      background-color="#001529"
      text-color="#ccc"
      active-text-color="#fff"
      :unique-opened="true"
      :collapse="isCollapse"
      :router="true"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 由于每个一级菜单都可以展开 所以是el-submenu而不是el-menu-item -->
        <el-submenu :index="item.id + ''">
          <template #title>
            <i :class="item.icon"></i>
            <span class="menu-title">{{ item.name }}</span>
          </template>
          <template v-if="item.type === 1">
            <!-- 二级菜单：需要判断是否存在三级菜单，决定展示时是使用el-submenu还是el-menu-item -->
            <template v-for="iten in item.children" :key="iten.id">
              <template v-if="iten.type === 2">
                <el-menu-item :index="iten.url">
                  <i v-if="iten.icon" :class="iten.icon"></i>
                  <span>{{ iten.name }}</span>
                </el-menu-item>
              </template>
              <template v-else-if="iten.type === 1">
                <el-submenu :index="iten.id + ''">
                  <template #title>
                    <i v-if="iten.icon" :class="iten.icon"></i>
                    <span>{{ iten.name }}</span>
                  </template>
                  <template v-for="iteo in iten.children" :key="iteo.id">
                    <!-- 三级菜单，由于userMenus不存在四级菜单，所以终止判断 -->
                    <el-menu-item :index="iteo.url">
                      <i v-if="iteo.icon" :class="iteo.icon"></i>
                      <span>{{ iteo.name }}</span>
                    </el-menu-item>
                  </template>
                </el-submenu>
              </template>
            </template>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";
//封装vuex中的useStore，使之具备静态检测
import { useStore } from "@/store";

export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const defaultMenu = computed(() => route.path);
    const userMenus = computed(() => store.state?.login?.userMenus);
    return {
      userMenus,
      defaultMenu,
    };
  },
});
</script>

<style scoped lang="scss">
.nav-menu {
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    /* flex-direction:row;  justify-content: flex-start; */
    align-items: center;

    .logo-img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
    }
  }

  .el-menu {
    border-right: none; /* 消除ELMenu组件中默认样式边线 */
  }

  .el-menu-vertical {
    .menu-title {
      margin-left: 10px;
    }
    .el-submenu {
      background-color: #001529 !important;
      .el-menu-item {
        padding-left: 50px !important;
        background-color: #0c2153 !important;
      }
    }
    ::v-deep .el-submenu__title {
      background-color: #001529 !important;
    }
    /*:deep .el-submenu__title {
      background-color: #001529 !important;
    } */

    .el-menu-item {
      &.is-active {
        color: #fff !important;
        background-color: #0a60bd !important;
      }
      &:hover {
        color: #fff;
        /* font-weight: 500; */
      }
    }

    .el-menu-vertical:not(.el-menu--collapse) {
      width: 100%;
      height: calc(100%-48px);
    }
  }
}
</style>
