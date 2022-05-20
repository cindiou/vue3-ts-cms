<template>
  <div class="base-echarts">
    <div ref="echartsTargetRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  // eslint-disable-next-line
  ref,
  // eslint-disable-next-line
  withDefaults,
  // eslint-disable-next-line
  defineProps,
  watchEffect,
} from "vue";
import * as echarts from "echarts";
import { useEcharts } from "./useEcharts";

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<echarts.EChartsOption>,
      required: true,
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "360px",
    },
  },
  setup(props) {
    /* const props = withDefaults(
      defineProps<{
        options: echarts.EChartsCoreOption;
        width?: string;
        height?: string;
      }>(),
      {
        width: "100%",
        height: "360px",
      },
    ); */

    const echartsTargetRef = ref<HTMLElement>();

    onMounted(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { setOptions } = useEcharts(echartsTargetRef.value!);

      /* eslint-disable-next-line */
      watchEffect((_) => {
        setOptions(props.options);
      });
    });

    return {
      echartsTargetRef,
    };
  },
});
</script>

<style scoped></style>
