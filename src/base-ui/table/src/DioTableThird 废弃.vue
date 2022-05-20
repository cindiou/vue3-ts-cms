<template>
  <div class="dio-table-plus">
    <!-- <dio-table-plus :tableData="userList" :="table.tableConfig">
      <template v-for="slotName in table.slots" :key="slotName">
        错误出在这里：===>
        <template v-slot:[slotName]="{ scope }">
          {{ slotName }}
        </template>
      </template>
    </dio-table-plus> -->

    <template v-for="slotName in Object.keys(table.slots)" :key="slotName">
      <!-- eslint-disable-next-line -->
        <template #[slotName]="{ scope }">
        <template v-if="$type.isPrimitive(table.slots[slotName])">
          {{ table.slots[slotName] }}
        </template>
        <template v-else-if="$type.isFunction(table.slots[slotName])">
          {{ table.slots[slotName](scope) }}
        </template>
        <template
          v-else-if="
            $type.isArray(table.slots[slotName]) ||
            $type.isObject(table.slots[slotName])
          "
        >
          <!-- 插槽是组件 -->
          <template
            v-for="(cpnItem, index) in table.slots[slotName]"
            :key="slotName + '_' + index"
          >
            <component :is="cpnItem.is" :="cpnItem.props">
              <!-- 组件内是否存在 子组件 -->
              <template v-if="$type.isPrimitive(cpnItem.children)">
                {{ cpnItem.children }}
              </template>
              <template v-else-if="$type.isArray(cpnItem.children)">
                <template
                  v-for="(child, indey) in cpnItem.children"
                  :key="indey"
                >
                  <component :is="child.is" v-bind="child.props"></component>
                </template>
              </template>
            </component>
          </template>
        </template>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@/store";

import DioTablePlus from "./DioTableSecond.vue";

export default defineComponent({
  components: {
    DioTablePlus,
  },
  props: {
    table: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    console.log("table.slots", props.table.slots);
    const store = useStore();

    //网络请求，展示table数据
    store.dispatch("system/getPageListAction", {
      pageUrl: "/users/list",
      queryInfo: {
        size: 10,
        offset: 0,
      },
    });
    const userList = computed(() => store.state.system.userList);
    const userCount = computed(() => store.state.system.userCount);
    //按钮功能
    const changePermission = (user: any): void => {
      user.enable = +!user.enable;
      //通知服务器，修改
    };

    return {
      userList,
      userCount,
      changePermission,
    };
  },
});
</script>

<style scoped></style>
