<template>
  <div class="list">
    <div class="content">
      <dio-table-further :tableConfig="tableConfig" urlPrefix="story" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { DioTableFurther } from "@/base-ui/table";
import tableConfig from "./table.config";

export default defineComponent({
  name: "list",
  components: {
    DioTableFurther,
  },
  setup() {
    return { tableConfig };
  },
});
</script>
<style scoped lang="scss"></style>
