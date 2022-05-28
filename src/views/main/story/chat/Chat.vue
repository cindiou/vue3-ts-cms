<template>
  <div class="chat">
    <dio-editor v-model:value="htmlString" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import DioEditor from "@/base-ui/editor";

export default defineComponent({
  name: "chat",
  components: {
    DioEditor,
  },
  setup() {
    const htmlString = ref<string>("说点什么吧……");
    return {
      htmlString,
    };
  },
});
</script>
<style scoped lang="scss">
.chat {
  margin-top: 20px;
}
</style>
