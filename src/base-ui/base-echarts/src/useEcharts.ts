import * as echarts from "echarts";
import { emitter } from "@/EventBus";

//获取地图数据
import chinaMapData from "./china.json";
echarts.registerMap("china", chinaMapData);

export function useEcharts(el: HTMLElement) {
  const instance = echarts.init(el, undefined, {
    renderer: "svg",
  });

  const setOptions = (o: echarts.EChartsOption) => {
    instance.setOption(o);
  };

  const updateSize = () => {
    instance.resize();
  };

  window.addEventListener("resize", updateSize);
  emitter.on("resize", updateSize);

  return {
    instance,
    setOptions,
    updateSize,
  };
}
